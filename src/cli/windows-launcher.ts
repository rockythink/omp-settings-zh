import { delimiter, dirname } from "node:path";

// Replaced at compile time; no package code or shell is bundled into this trampoline.
declare const OMP_WINDOWS_LAUNCHER_CONFIG: { bun: string; main: string; omp: string };
const config = OMP_WINDOWS_LAUNCHER_CONFIG;
const argv = Bun.argv.slice(2);
const env: NodeJS.ProcessEnv = { ...process.env, OMP_SETTINGS_ZH_LAUNCHER_PID: String(process.pid),
  OMP_SETTINGS_ZH_LAUNCHER_MARKER: "omp-settings-zh managed Windows launcher v1" };
const inheritedPath = process.env.PATH ?? Object.entries(process.env).find(([key]) => key.toUpperCase() === "PATH")?.[1] ?? "";
for (const key of Object.keys(env)) if (key !== "PATH" && key.toUpperCase() === "PATH") delete env[key];
env.PATH = argv[0] === "update" ? dirname(config.omp) + delimiter + inheritedPath : inheritedPath;
// Windows delivers a console Ctrl+C to every attached process. Consume our copy
// instead of exiting ahead of the child or generating a second child interrupt.
if (process.platform === "win32") process.on("SIGINT", () => {});
try {
  const child = Bun.spawn([config.bun, config.main, config.omp, ...argv], {
    env, cwd: process.cwd(), stdin: "inherit", stdout: "inherit", stderr: "inherit",
  });
  process.exitCode = await child.exited;
} catch (error) {
  console.error(`omp-settings-zh: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
