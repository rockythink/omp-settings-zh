/// <reference lib="es2024.promise" />
import { spawn, type ChildProcess } from "node:child_process";
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import { createStatsPreload } from "../stats/preload";

/** Only known Web forms opt in; everything else retains the official parser and errors. */
export function isStatsWeb(argv: readonly string[]): boolean {
  if (argv[0] !== "stats") return false;
  for (let index = 1; index < argv.length; index++) {
    const arg = argv[index]!;
    if (arg === "--port" || arg === "-p" || arg === "--host") {
      if (!argv[++index] || argv[index]!.startsWith("-")) return false;
    } else if (!/^--(?:port|host)=.+$/.test(arg) && !/^-p=?\d+$/.test(arg)) return false;
  }
  return true;
}

const alive = (child: ChildProcess) => child.exitCode === null && child.signalCode === null;
const pidAlive = (pid: number) => {
  try { process.kill(pid, 0); return true; } catch { return false; }
};

// Runtime-only Bun program: no shell, imports from the package, inherited
// credentials or BUN_OPTIONS. It survives an uncatchable launcher death.
const guardSource = String.raw`
const [launcher, parent, child, directory] = Bun.argv.slice(1);
const alive = pid => { try { process.kill(Number(pid), 0); return true; } catch { return false; } };
const kill = signal => { try { process.kill(Number(child), signal); } catch {} };
while (alive(child)) {
  if (!alive(launcher) || !alive(parent)) {
    kill("SIGTERM");
    for (let i = 0; i < 30 && alive(child); i++) await Bun.sleep(100);
    if (alive(child)) kill("SIGKILL");
    break;
  }
  await Bun.sleep(250);
}
require("node:fs").rmSync(directory, { recursive: true, force: true });
`;

/** Real OMP owns parsing, binding, profiles, data, judge, browser opening and terminal streams. */
export async function runOfficialCommand(official: string, argv: string[]): Promise<number> {
  const windows = process.platform === "win32";
  const web = isStatsWeb(argv) && (windows || process.platform === "darwin" || process.platform === "linux");
  let directory: string | undefined;
  let child: ChildProcess | undefined;
  let guard: ChildProcess | undefined;
  let stopping = false;
  let stopTimer: NodeJS.Timeout | undefined;
  let receivedSignal: NodeJS.Signals | undefined;
  const parent = process.ppid;
  const cleanup = () => {
    if (guard && alive(guard)) guard.kill("SIGTERM");
    if (directory) rmSync(directory, { recursive: true, force: true });
  };
  const stop = (signal: NodeJS.Signals) => {
    if (stopping) return;
    stopping = true;
    receivedSignal = signal;
    if (child && alive(child)) {
      // Windows console Ctrl+C already reaches the inherited child console.
      // kill(SIGINT) there is forced termination, not a console control event.
      if (!windows || signal !== "SIGINT") child.kill(signal);
      stopTimer = setTimeout(() => { if (child && alive(child)) child.kill("SIGKILL"); }, 3000);
    }
  };
  const onInt = () => stop("SIGINT");
  const onTerm = () => stop("SIGTERM");
  const onHup = () => stop("SIGHUP");
  const onExit = () => {
    // The independent guard also handles an uncatchable launcher crash/SIGKILL.
    if (child && alive(child)) child.kill("SIGKILL");
    cleanup();
  };
  process.on("SIGINT", onInt);
  process.on("SIGTERM", onTerm);
  process.on("SIGHUP", onHup);
  process.on("exit", onExit);
  const parentWatch = setInterval(() => {
    if (windows ? !pidAlive(parent) : process.ppid !== parent) stop(windows ? "SIGTERM" : "SIGHUP");
  }, 1000);
  try {
    const env = { ...process.env };
    if (web) {
      const result = await Bun.build({ entrypoints: [fileURLToPath(new URL("../stats/browser.ts", import.meta.url))], target: "browser", minify: true });
      if (!result.success || !result.outputs[0]) throw new Error("Stats 页面语言脚本构建失败：" + result.logs.join("\n"));
      const script = await result.outputs[0].text();
      if (stopping) return finish({ code: null, signal: receivedSignal ?? null });
      directory = mkdtempSync(join(tmpdir(), "omp-stats-zh-"));
      if (!windows) chmodSync(directory, 0o700);
      const preload = join(directory, "preload.cjs");
      writeFileSync(preload, createStatsPreload(script), { mode: 0o600 });
      // Compiled Bun splits BUN_OPTIONS on whitespace without interpreting
      // quotes. A short data-URL thunk encodes just the absolute filename, not
      // the browser bundle. Spaces, backslashes and Unicode need no shell or
      // 8dot3 alias; the official process keeps its original cwd and argv.
      const thunk = Buffer.from(`require(${JSON.stringify(preload)});`).toString("base64");
      env.BUN_OPTIONS = `${env.BUN_OPTIONS ?? ""} --preload=data:text/javascript;base64,${thunk}`;
    }
    child = spawn(official, argv, { cwd: process.cwd(), env, stdio: "inherit" });
    const { promise: exited, resolve, reject } = Promise.withResolvers<{ code: number | null; signal: NodeJS.Signals | null }>();
    child.once("error", reject);
    child.once("exit", (code, signal) => resolve({ code, signal }));
    if (web && child.pid && directory) {
      // Detached and independent of the launcher's event loop; no inherited stdio or sensitive env.
      const guardEnv: NodeJS.ProcessEnv = {};
      if (windows && process.env.SystemRoot) guardEnv.SystemRoot = process.env.SystemRoot;
      guard = spawn(process.execPath, ["--no-env-file", "--no-compile-autoload-bunfig", "-e", guardSource, String(process.pid), String(parent), String(child.pid), directory], {
        // Never hold the temporary directory as cwd: Windows would lock its removal.
        detached: true, stdio: "ignore", env: guardEnv, cwd: parse(directory).root,
      });
      guard.on("error", error => { console.error(`Stats 生命周期守护启动失败：${error.message}`); stop("SIGTERM"); });
      guard.unref();
    }
    return finish(await exited);
  } finally {
    stopping = true;
    clearInterval(parentWatch);
    clearTimeout(stopTimer);
    if (child && alive(child)) {
      child.kill("SIGTERM");
      const { promise, resolve } = Promise.withResolvers<void>();
      const timer = setTimeout(() => { child?.kill("SIGKILL"); resolve(); }, 3000);
      child.once("exit", () => { clearTimeout(timer); resolve(); });
      await promise;
    }
    cleanup();
    process.off("SIGINT", onInt);
    process.off("SIGTERM", onTerm);
    process.off("SIGHUP", onHup);
    process.off("exit", onExit);
  }

  function finish(result: { code: number | null; signal: NodeJS.Signals | null }): number {
    // Windows has exit statuses, not POSIX shell signal re-raising. Preserve
    // the official status, including a handled Ctrl+C returning zero.
    if (windows) return result.code ?? (receivedSignal === "SIGINT" ? 130 : 1);
    const signal = result.signal ?? (receivedSignal === "SIGINT" && result.code === 0 ? undefined : receivedSignal);
    if (signal) {
      // Re-raise after finally removes listeners, preserving shell signal exit semantics.
      setTimeout(() => process.kill(process.pid, signal), 0);
      return 1;
    }
    return result.code ?? 1;
  }
}
