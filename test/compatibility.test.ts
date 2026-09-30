import { describe, expect, test } from "bun:test";
import { checkHostCompatibility } from "../src/compatibility";
import { createFakeHost } from "./fixtures/fake-host";

describe("checkHostCompatibility", () => {
  test("accepts the supported host structure", () => {
    expect(checkHostCompatibility(createFakeHost())).toEqual({ compatible: true });
  });

  test("fails closed on an unsupported major version", () => {
    const host = createFakeHost();
    host.version = "19.0.0";

    const result = checkHostCompatibility(host);

    expect(result.compatible).toBeFalse();
    if (!result.compatible) expect(result.reason).toContain("19.0.0");
  });

  test("rejects malformed setting metadata", () => {
    const host = createFakeHost();
    host.schema.autoResume!.ui!.label = 42 as never;
    expect(checkHostCompatibility(host).compatible).toBeFalse();
  });

  test("allows number and array settings intentionally excluded from the panel", () => {
    const host = createFakeHost();
    host.schema.hiddenNumber = {
      type: "number",
      default: 10,
      ui: {
        tab: "interaction",
        label: "Hidden number",
        description: "Edited in config only",
      },
    };
    host.schema.hiddenArray = {
      type: "array",
      default: [],
      ui: {
        tab: "interaction",
        label: "Hidden array",
        description: "Edited in config only",
      },
    };

    expect(checkHostCompatibility(host)).toEqual({ compatible: true });
  });
});
