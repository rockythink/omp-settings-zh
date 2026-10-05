import { expect, test } from "bun:test";
import { applyTranslations } from "../src/apply-translations";
import type { LocalePack } from "../src/translations/types";
import { createFakeHost } from "./fixtures/fake-host";
import { minimalLocale } from "./fixtures/minimal-locale";

test("settings sharing option sources localize independently without changing other consumers", () => {
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

  if (result.status !== "applied") throw new Error(result.reason);
  const first = sleepDefinition.ui!.options;
  const second = host.schema.sharedSleepSetting!.ui!.options;
  if (!Array.isArray(first) || !Array.isArray(second)) throw new Error("expected display options");
  expect(first[0]!.label).toBe("关闭");
  expect(second[0]!.label).toBe("停用");
  expect(sharedSchemaOptions[0]!.label).toBe("Off");
  expect(first.map(option => option.value)).toEqual(sharedSchemaOptions.map(option => option.value));
  expect(second.map(option => option.value)).toEqual(sharedSchemaOptions.map(option => option.value));
  expect(result.restore()).toEqual([]);
  expect(host).toEqual(before);
  expect(sleepDefinition.ui!.options).toBe(sharedSchemaOptions);
  expect(host.schema.sharedSleepSetting!.ui!.options).toBe(sharedSchemaOptions);
});


test("option detachment retains later extension edits while restoring its own fields", () => {
  for (const edit of ["label", "new-field", "replace", "append"] as const) {
    const host = createFakeHost();
    const ui = host.schema["power.sleepPrevention"]!.ui!;
    const original = ui.options;
    if (!Array.isArray(original)) throw new Error("expected source options");
    const before = structuredClone(original);
    const result = applyTranslations(host, minimalLocale);
    if (result.status !== "applied") throw new Error(result.reason);
    const displayed = ui.options;
    if (!Array.isArray(displayed)) throw new Error("expected display options");
    if (edit === "label") displayed[0]!.label = "External label";
    if (edit === "new-field") Object.defineProperty(displayed[0], "external", {value: "External metadata"});
    if (edit === "replace") displayed[0] = { value: "off", label: "External replacement" };
    if (edit === "append") displayed.push({ value: "extra", label: "External option" });
    expect(result.restore()).toEqual([]);
    expect(ui.options).toBe(displayed);
    expect(original).toEqual(before);
    if (edit === "label") expect(displayed[0]!.label).toBe("External label");
    if (edit === "new-field") expect(Reflect.get(displayed[0]!, "external")).toBe("External metadata");
    if (edit === "replace") expect(displayed[0]!.label).toBe("External replacement");
    if (edit === "append") expect(displayed.at(-1)!.label).toBe("External option");
    expect(displayed[1]!.label).toBe("Prevent Idle Sleep");
    expect(displayed[1]!.description).toBe(before[1]!.description);
  }
});

test("an unwritable option array fails before translating any setting", () => {
  const host = createFakeHost();
  const before = structuredClone(host);
  const ui = host.schema["power.sleepPrevention"]!.ui!;
  Object.defineProperty(ui, "options", { writable: false });
  expect(applyTranslations(host, minimalLocale).status).toBe("skipped");
  expect(host).toEqual(before);
});

