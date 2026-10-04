import { expect, test } from "bun:test";
import { buildSlashCommandReport, hasSlashCommandDrift } from "../scripts/slash-report";

const locale = [
  { name: "new", en: "Start a new session", zh: "开始新会话" },
  { name: "setup", aliases: ["providers"], en: "Open provider setup", zh: "打开提供商配置" },
];

test("new and removed upstream commands block the gate with actionable identifiers", () => {
  const report = buildSlashCommandReport([
    { name: "new", description: "Start a new session" },
    { name: "future", description: "A new command" },
  ], locale);
  expect(report.untranslatedCommands).toEqual(["future"]);
  expect(report.staleCommands).toEqual(["setup"]);
  expect(hasSlashCommandDrift(report)).toBe(true);
});

test("changed descriptions, aliases and missing Chinese text independently invalidate coverage", () => {
  const report = buildSlashCommandReport([
    { name: "new", description: "Start a new session with changed behavior" },
    { name: "setup", aliases: ["provider"], description: "Open provider setup" },
    { name: "copy", description: "Copy text" },
  ], [...locale, { name: "copy", en: "Copy text", zh: " " }]);
  expect(report.sourceMismatches).toEqual(["new"]);
  expect(report.aliasMismatches).toEqual([{ command: "setup", expected: ["provider"], actual: ["providers"] }]);
  expect(report.incompleteCommands).toEqual(["copy"]);
  expect(report.completeCommands).toBe(0);
  expect(hasSlashCommandDrift(report)).toBe(true);
});

test("dynamic key glyphs are compatible but prose changes and synthetic hints are not", () => {
  const translation = { name: "switch", en: "Switch model for this session (same as Option+P); accepts fuzzy ids, provider/id, @role, :level", zh: "切换模型（同 Option+P）" };
  const source = { name: "switch", description: translation.en.replace("Option+P", "⌥P") };
  expect(hasSlashCommandDrift(buildSlashCommandReport([source], [translation]))).toBe(false);
  source.description += "; changed behavior";
  expect(buildSlashCommandReport([source], [translation]).sourceMismatches).toEqual(["switch"]);
  source.description = "[custom] - " + translation.en;
  expect(buildSlashCommandReport([source], [translation]).sourceMismatches).toEqual(["switch"]);
});

test("command/alias collisions and duplicate translations cannot be hidden by map replacement", () => {
  const source = [
    { name: "new", description: "Start a new session" },
    { name: "setup", aliases: ["new"], description: "Open provider setup" },
  ];
  const report = buildSlashCommandReport(source, [locale[0]!, locale[0]!, { ...locale[1]!, aliases: ["new"] }]);
  expect(report.duplicateIdentifiers).toEqual(["source:new", "translation:new", "translation:new"]);
  expect(hasSlashCommandDrift(report)).toBe(true);
});
