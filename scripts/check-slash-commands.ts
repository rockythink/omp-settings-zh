import { BUILTIN_SLASH_COMMAND_DEFS } from "@oh-my-pi/pi-coding-agent/slash-commands/builtin-registry";
import { VERSION } from "@oh-my-pi/pi-utils";
import { loadThemeSync } from "@oh-my-pi/pi-tui/theme/loader";
import { setCurrentTheme } from "@oh-my-pi/pi-tui/theme/runtime";
import { slashCommandTranslations } from "../src/translations/slash-commands";
import { buildSlashCommandReport, hasSlashCommandDrift } from "./slash-report";

// Registry getters render key hints in the active theme (OMP 19.2 defaults to glyphs such as ⇧⇥).
// Review the ASCII rendering, which spells keys as the reviewed English does, so effort stays exact.
setCurrentTheme(loadThemeSync("dark", { symbolPreset: "ascii" }));
const report = buildSlashCommandReport(BUILTIN_SLASH_COMMAND_DEFS, slashCommandTranslations);
console.log(`OMP ${VERSION} 内置命令翻译：${report.completeCommands}/${report.totalCommands} 完整，${report.totalIdentifiers} 个命令名/别名`);
if (hasSlashCommandDrift(report)) {
  console.error(JSON.stringify(report, null, 2));
  process.exitCode = 1;
} else {
  console.log("内置命令新增/删除、原文与别名漂移：0");
}
