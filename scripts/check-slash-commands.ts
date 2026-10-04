import { BUILTIN_SLASH_COMMAND_DEFS } from "@oh-my-pi/pi-coding-agent/slash-commands/builtin-registry";
import { VERSION } from "@oh-my-pi/pi-utils";
import { slashCommandTranslations } from "../src/translations/slash-commands";
import { buildSlashCommandReport, hasSlashCommandDrift } from "./slash-report";

const report = buildSlashCommandReport(BUILTIN_SLASH_COMMAND_DEFS, slashCommandTranslations);
console.log(`OMP ${VERSION} 内置命令翻译：${report.completeCommands}/${report.totalCommands} 完整，${report.totalIdentifiers} 个命令名/别名`);
if (hasSlashCommandDrift(report)) {
  console.error(JSON.stringify(report, null, 2));
  process.exitCode = 1;
} else {
  console.log("内置命令新增/删除、原文与别名漂移：0");
}
