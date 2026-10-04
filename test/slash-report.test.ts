import { expect, test } from "bun:test";
import { buildSlashCommandReport, hasSlashCommandDrift } from "../scripts/slash-report";
import { slashCommandTranslations } from "../src/translations/slash-commands";

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

test("switch and loop dynamic key glyphs are compatible but surrounding prose and synthetic hints are not", () => {
  for (const name of ["switch", "loop"]) {
    const translation = slashCommandTranslations.find(entry => entry.name === name)!;
    const source = { name, description: translation.en.replace(name === "switch" ? "Option+P" : "Esc", name === "switch" ? "⌥P" : "⎋") };
    expect(hasSlashCommandDrift(buildSlashCommandReport([source], [translation]))).toBe(false);
    for (const description of ["changed behavior; " + source.description, source.description + "; changed behavior", "[custom] - " + source.description]) {
      const report = buildSlashCommandReport([{ ...source, description }], [translation]);
      expect(report.sourceMismatches).toEqual([name]);
      expect(hasSlashCommandDrift(report)).toBe(true);
    }
  }
});

test("effort and every other static registry description reject altered keys as consumer-visible source drift", () => {
  for (const translation of slashCommandTranslations) {
    if (translation.name === "switch" || translation.name === "loop") continue;
    const source: { name: string; aliases?: readonly string[]; description: string } = {
      name: translation.name, ...("aliases" in translation ? { aliases: translation.aliases } : {}), description: translation.en,
    };
    expect(hasSlashCommandDrift(buildSlashCommandReport([source], [translation]))).toBe(false);
    source.description = translation.name === "effort" ? translation.en.replace("Shift+Tab", "⇧⇥") : translation.en + " (⌘K)";
    const report = buildSlashCommandReport([source], [translation]);
    expect(report.sourceMismatches).toEqual([translation.name]);
    expect(report.completeCommands).toBe(0);
    expect(hasSlashCommandDrift(report)).toBe(true);
  }
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
