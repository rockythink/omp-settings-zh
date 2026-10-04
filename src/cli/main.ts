import { checkLauncherUninstall, uninstallLauncher } from "./install";
import { runOfficialCommand } from "./run";

// Installer contract: bun <stable package>/src/cli/main.ts <real omp> <original argv...>.
const [official, ...argv] = Bun.argv.slice(2);
let removesPlugin = false;
if (argv[0] === "plugin" && argv[1] === "uninstall" && !argv.some(arg => /^(?:--(?:dry-run|help)(?:=.*)?|-h)$/.test(arg))) {
  for (let index = 2; index < argv.length; index++) {
    if (/^--(?:scope|enable|disable|set)$/.test(argv[index]!)) { index++; continue; }
    if (argv[index] === "omp-settings-zh") { removesPlugin = true; break; }
  }
}
if (!official) {
  console.error("缺少官方 OMP 可执行文件路径");
  process.exitCode = 1;
} else {
  try {
    // Load the cleanup code before native uninstall removes the installed package.
    if (removesPlugin) await checkLauncherUninstall();
    const code = await runOfficialCommand(official, argv);
    if (code === 0 && removesPlugin) await uninstallLauncher();
    process.exitCode = code;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
