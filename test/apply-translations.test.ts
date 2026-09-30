import { describe, expect, test } from "bun:test";
import { applyTranslations } from "../src/apply-translations";
import { createFakeHost } from "./fixtures/fake-host";
import { minimalLocale } from "./fixtures/minimal-locale";

describe("applyTranslations", () => {
  test("translates matched metadata while preserving behavior and English fallback", () => {
    const host = createFakeHost();
    const originalDefault = host.schema["power.sleepPrevention"]!.default;
    const originalValues = host.schema["power.sleepPrevention"]!.values;
    const originalGroup = host.schema.autoResume!.ui!.group;

    const result = applyTranslations(host, minimalLocale);

    expect(result.status).toBe("applied");
    expect(host.schema.autoResume!.ui!.label).toBe("自动恢复");
    expect(host.schema.autoResume!.ui!.group).toBe(originalGroup);
    const translatedOptions = host.schema["power.sleepPrevention"]!.ui!.options;
    expect(Array.isArray(translatedOptions)).toBeTrue();
    if (!Array.isArray(translatedOptions)) throw new Error("expected static schema options");
    expect(translatedOptions[1]!.label).toBe("防止空闲睡眠");
    expect(host.schema.unlistedSetting!.ui!.label).toBe("Upstream Addition");
    expect(host.schema["power.sleepPrevention"]!.default).toBe(originalDefault);
    expect(host.schema["power.sleepPrevention"]!.values).toBe(originalValues);
  });

  test("is idempotent", () => {
    const host = createFakeHost();

    const first = applyTranslations(host, minimalLocale);
    const afterFirst = structuredClone(host);
    const second = applyTranslations(host, minimalLocale);

    expect(first.status).toBe("applied");
    expect(second.status).toBe("applied");
    expect(host).toEqual(afterFirst);
  });

  test("does not write anything when preflight finds a frozen target", () => {
    const host = createFakeHost();
    const before = structuredClone(host);
    Object.freeze(host.schema.autoResume!.ui);

    const result = applyTranslations(host, minimalLocale);

    expect(result.status).toBe("skipped");
    expect(host.schema).toEqual(before.schema);
  });

  test("rolls back every successful write after an apply-time exception", () => {
    const host = createFakeHost();
    const before = structuredClone(host);
    let description = host.schema.autoResume!.ui!.description;
    Object.defineProperty(host.schema.autoResume!.ui!, "description", {
      configurable: true,
      enumerable: true,
      get: () => description,
      set: (value: string) => {
        if (value === "自动恢复当前目录中最近的会话") throw new Error("synthetic setter failure");
        description = value;
      },
    });

    const result = applyTranslations(host, minimalLocale);

    expect(result.status).toBe("rolled-back");
    expect(host.schema).toEqual(before.schema);
  });

  test("ignores stale paths and removed option values without guessing", () => {
    const host = createFakeHost();
    const locale = structuredClone(minimalLocale);
    Object.assign(locale.settings, {
      removedSetting: {
        sourceHash: "stale",
        label: "已删除",
      },
    });
    const remainingOptions = host.schema["power.sleepPrevention"]!.ui!.options;
    if (!Array.isArray(remainingOptions)) throw new Error("expected static schema options");
    remainingOptions.length = 3;

    const result = applyTranslations(host, locale);

    expect(result.status).toBe("applied");
    expect(remainingOptions).toHaveLength(3);
    expect(remainingOptions[2]!.value).toBe("display");
  });
});
