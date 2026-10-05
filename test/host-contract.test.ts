import { expect, test } from "bun:test";
import { createSettingsHost } from "@oh-my-pi/pi-coding-agent/config/settings-ui";
import { getAllSettingDefs, type SettingDef } from "@oh-my-pi/pi-tui/overlays/settings-defs";
import { buildEffortArgumentCompletions } from "@oh-my-pi/pi-coding-agent/slash-commands/builtin-completions";
import type { TuiSlashCommandRuntime } from "@oh-my-pi/pi-coding-agent/slash-commands/types";
import { applyTranslations } from "../src/apply-translations";
import { getHostMetadata } from "../src/host-adapter";
import { zhCN } from "../src/translations/zh-CN";

function controls(defs: SettingDef[]) {
  return defs.map(({ label, description, warning, ...behavior }) => {
    if ("options" in behavior) return { ...behavior, options: behavior.options.map(option => option.value) };
    return behavior;
  });
}

test("new native panels follow language changes without changing controls or setting semantics", async () => {
  const host = await getHostMetadata();
  const before = getAllSettingDefs(createSettingsHost().entries);
  const result = applyTranslations(host, zhCN);
  if (result.status !== "applied") throw new Error(result.reason);
  try {
    const translated = getAllSettingDefs(createSettingsHost().entries);
    expect(translated.find(def => def.path === "autoResume")?.label).toBe("自动恢复");
    expect(controls(translated)).toEqual(controls(before));
  } finally {
    expect(result.restore()).toEqual([]);
  }
  expect(getAllSettingDefs(createSettingsHost().entries)).toEqual(before);
});

test("Chinese settings do not change official effort argument descriptions", async () => {
  // This official completion factory reads only these two session selectors.
  const runtime = { ctx: { session: {
    configuredThinkingLevel: () => "high",
    getAvailableEffortSelectors: () => ["off", "auto", "low", "medium", "high", "xhigh"],
  } } } as unknown as TuiSlashCommandRuntime;
  const complete = buildEffortArgumentCompletions(runtime);
  const original = complete("");
  const host = await getHostMetadata();
  const result = applyTranslations(host, zhCN);
  if (result.status !== "applied") throw new Error(result.reason);
  try {
    expect(complete("")).toEqual(original);
    const options = host.schema.defaultThinkingLevel?.ui?.options;
    if (!Array.isArray(options)) throw new Error("expected thinking level options");
    expect(options.find(option => option.value === "low")?.description).toBe("轻量推理（约 2k token）");
  } finally { expect(result.restore()).toEqual([]); }
  expect(complete("")).toEqual(original);
});

