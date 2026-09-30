import { expect, test } from "bun:test";
import { applyTranslations } from "../src/apply-translations";
import { createFakeHost } from "./fixtures/fake-host";
import { minimalLocale } from "./fixtures/minimal-locale";

function apply(host: ReturnType<typeof createFakeHost>, locale = minimalLocale) {
  const result = applyTranslations(host, locale);
  if (result.status !== "applied") throw new Error(result.reason);
  return result;
}

test("detaching restores original objects and absent properties across repeated mounts", () => {
  const host = createFakeHost();
  const before = structuredClone(host);
  const locale = structuredClone(minimalLocale);
  Object.assign(locale.settings.autoResume!, { warning: "测试警告" });
  for (let cycle = 0; cycle < 3; cycle += 1) {
    const result = apply(host, locale);
    expect(host.schema.autoResume!.ui!.label).toBe("自动恢复");
    expect(result.restore()).toEqual([]);
    expect(result.restore()).toEqual([]);
    expect(host).toEqual(before);
    expect(Object.hasOwn(host.schema.autoResume!.ui!, "warning")).toBeFalse();
  }
});

test("dynamic descriptions follow key hints and detaching restores the upstream getter", () => {
  const host = createFakeHost();
  let escapeHint = "Esc";
  const ui = host.schema.autoResume!.ui!;
  Object.defineProperty(ui, "description", { configurable: true, enumerable: true, get: () => "Press " + escapeHint });
  const descriptor = Object.getOwnPropertyDescriptor(ui, "description");
  const locale = structuredClone(minimalLocale);
  Object.assign(locale.settings.autoResume!, { description: "按 {escape}", descriptionSource: "Press {escape}" });
  const result = apply(host, locale);
  expect(ui.description).toBe("按 Esc");
  escapeHint = "⎋";
  expect(ui.description).toBe("按 ⎋");
  expect(result.restore()).toEqual([]);
  expect(ui.description).toBe("Press ⎋");
  expect(Object.getOwnPropertyDescriptor(ui, "description")).toEqual(descriptor);
});

test("detaching does not erase another extension's later metadata edit", () => {
  const host = createFakeHost();
  const result = apply(host);
  host.schema.autoResume!.ui!.label = "Other extension";
  expect(result.restore()).toEqual([]);
  expect(host.schema.autoResume!.ui!.label).toBe("Other extension");
  expect(host.schema.autoResume!.ui!.description).toBe("Automatically resume the most recent session in the current directory");
});
