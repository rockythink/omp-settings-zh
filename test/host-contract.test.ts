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
    expect(translated.find(def => def.path === "autoResume")?.label).not.toBe(before.find(def => def.path === "autoResume")?.label);
    expect(controls(translated)).toEqual(controls(before));
  } finally {
    expect(result.restore()).toEqual([]);
  }
  expect(getAllSettingDefs(createSettingsHost().entries)).toEqual(before);
});

test("Chinese settings do not change official effort argument descriptions", async () => {
  // The official completion factory reads the viewed session's selectors.
  const runtime = { ctx: { viewSession: {
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
    expect(options.find(option => option.value === "low")?.description).toMatch(/\p{Script=Han}/u);
  } finally { expect(result.restore()).toEqual([]); }
  expect(complete("")).toEqual(original);
});



test("composer prediction hints remain live and fall back on unknown source", async () => {
  const upstream = await getHostMetadata();
  const definition = upstream.schema["composer.predictions"]!;
  const ui = Object.create(Object.getPrototypeOf(definition.ui), Object.getOwnPropertyDescriptors(definition.ui!));
  const officialDescriptor = Object.getOwnPropertyDescriptor(ui, "description")!;

  let source: string = ui.description;
  const officialSource = source;
  const hintPattern = /composer; (.*?) or (.*?) inserts it without sending/;
  if (!hintPattern.test(source)) throw new Error("Upstream prediction hint template changed");
  // Isolate changing key hints without mutating the process-wide theme or live registry.
  Object.defineProperty(ui, "description", { ...officialDescriptor, get: () => source });
  const originalDescriptor = Object.getOwnPropertyDescriptor(ui, "description");
  const host = { ...upstream, schema: { "composer.predictions": { ...definition, ui } } };
  const result = applyTranslations(host, zhCN);
  if (result.status !== "applied") throw new Error(result.reason);
  try {

    source = officialSource.replace(hintPattern, "composer; ⇥ or → inserts it without sending");
    expect(ui.description).toContain("⇥");
    expect(ui.description).toContain("→");
    source = officialSource.replace(hintPattern, "composer; Tab or Right inserts it without sending");
    expect(ui.description).toContain("Tab");
    expect(ui.description).toContain("Right");
    source += " Unknown upstream semantics.";
    expect(ui.description).toBe(source);
  } finally { expect(result.restore()).toEqual([]); }
  expect(Object.getOwnPropertyDescriptor(ui, "description")).toEqual(originalDescriptor);
  expect(ui.description).toBe(source);
  expect(Object.getOwnPropertyDescriptor(definition.ui!, "description")).toEqual(officialDescriptor);
});
