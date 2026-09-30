import { expect, test } from "bun:test";
import { applyTranslations } from "../src/apply-translations";
import type { LocalePack } from "../src/translations/types";
import { createFakeHost } from "./fixtures/fake-host";
import { minimalLocale } from "./fixtures/minimal-locale";

test("conflicting translations for a shared host option fail before any write", () => {
  const host = createFakeHost();
  const sleepDefinition = host.schema["power.sleepPrevention"]!;
  const sharedSchemaOptions = sleepDefinition.ui?.options;
  if (!Array.isArray(sharedSchemaOptions)) {
    throw new Error("expected shared static options");
  }
  host.schema.sharedSleepSetting = {
    type: "enum",
    default: "off",
    ui: {
      tab: "interaction",
      group: "Power (macOS)",
      label: "Shared sleep setting",
      description: "Uses the same option metadata objects",
      options: sharedSchemaOptions,
    },
  };
  const locale = structuredClone(minimalLocale) as LocalePack;
  Object.assign(locale.settings, {
    sharedSleepSetting: {
      sourceHash: "fixture",
      label: "共享睡眠设置",
      description: "复用相同的选项元数据对象",
      options: {
        off: { label: "停用" },
      },
    },
  });
  const before = structuredClone(host);

  const result = applyTranslations(host, locale);

  expect(result.status).toBe("skipped");
  expect(host).toEqual(before);
});
