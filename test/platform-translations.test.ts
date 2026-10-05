import { expect, test } from "bun:test";
import { applyTranslations } from "../src/apply-translations";
import { getHostMetadata } from "../src/host-adapter";
import type { HostOption, HostMetadata } from "../src/compatibility";
import { buildCoverageReport } from "../src/report";
import { zhCN } from "../src/translations/zh-CN";

const path = "spelling.autocomplete";
const locale = { ...zhCN, settings: { [path]: zhCN.settings[path] } };

async function autocompleteHost(platform: string): Promise<HostMetadata> {
  const upstream = await getHostMetadata();
  const definition = upstream.schema[path]!;
  const ui = definition.ui!;
  if (!Array.isArray(ui.options)) throw new Error("expected static options");
  const options: HostOption[] = ui.options.filter(option => option.value !== "apple").map(option => ({ ...option }));
  // Official 18.4.4 registry includes this choice only on macOS.
  if (platform === "darwin") options.push({ value: "apple", label: "Apple", description: "macOS dictionary completions" });
  return { ...upstream, platform, schema: { [path]: { ...definition, ui: { ...ui, options } } } };
}

for (const platform of ["darwin", "linux"]) {
  test("platform-specific autocomplete choices stay native and fully translated on " + platform, async () => {
    const host = await autocompleteHost(platform);
    const ui = host.schema[path]!.ui!;
    const options = ui.options as HostOption[];
    const values = options.map(option => option.value);
    const report = buildCoverageReport(host, locale);
    expect(report.completeSettings).toBe(1);
    expect(report.optionMismatches).toEqual([]);
    expect(report.sourceHashMismatches).toEqual([]);
    const result = applyTranslations(host, locale);
    if (result.status !== "applied") throw new Error(result.reason);
    const displayed = ui.options as HostOption[];
    expect(displayed.map(option => option.value)).toEqual(values);
    expect(displayed.some(option => option.value === "apple")).toBe(platform === "darwin");
    expect(result.restore()).toEqual([]);
    expect(ui.options).toBe(options);
  });
}

test("a platform variant still detects an unreviewed removed option", async () => {
  const host = await autocompleteHost("linux");
  const ui = host.schema[path]!.ui!;
  if (!Array.isArray(ui.options)) throw new Error("expected static options");
  ui.options = ui.options.filter(option => option.value !== "smollm");
  const report = buildCoverageReport(host, locale);
  expect(report.completeSettings).toBe(0);
  expect(report.sourceHashMismatches).toEqual([path]);
  expect(report.optionMismatches).toEqual([{ path, missingValues: [], staleValues: ["smollm"] }]);
});
