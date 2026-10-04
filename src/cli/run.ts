/// <reference lib="es2024.promise" />
import { spawn, type ChildProcess } from "node:child_process";
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
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

/** Real OMP owns parsing, binding, profiles, data, judge, browser opening and terminal streams. */
export async function runOfficialCommand(official: string, argv: string[]): Promise<number> {
  const web = isStatsWeb(argv) && (process.platform === "darwin" || process.platform === "linux");
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
      child.kill(signal);
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
  const parentWatch = setInterval(() => { if (process.ppid !== parent) stop("SIGHUP"); }, 1000);
  try {
    const env = { ...process.env };
    if (web) {
      const result = await Bun.build({ entrypoints: [fileURLToPath(new URL("../stats/browser.ts", import.meta.url))], target: "browser", minify: true });
      if (!result.success || !result.outputs[0]) throw new Error("Stats 页面语言脚本构建失败：" + result.logs.join("\n"));
      const script = await result.outputs[0].text();
      if (stopping) return finish({ code: null, signal: receivedSignal ?? null });
      // Compiled Bun splits BUN_OPTIONS on whitespace without shell quoting. Use a safe
      // absolute temp path even when TMPDIR or the installed plugin path contains spaces.
      const temporaryRoot = tmpdir();
      directory = mkdtempSync(join(/^[A-Za-z0-9_./-]+$/.test(temporaryRoot) ? temporaryRoot : "/tmp", "omp-stats-zh-"));
      chmodSync(directory, 0o700);
      const preload = join(directory, "preload.cjs");
      writeFileSync(preload, createStatsPreload(script), { mode: 0o600 });
      env.BUN_OPTIONS = `${env.BUN_OPTIONS ?? ""} --preload=${preload}`;
    }
    child = spawn(official, argv, { cwd: process.cwd(), env, stdio: "inherit" });
    const { promise: exited, resolve, reject } = Promise.withResolvers<{ code: number | null; signal: NodeJS.Signals | null }>();
    child.once("error", reject);
    child.once("exit", (code, signal) => resolve({ code, signal }));
    if (web && child.pid && directory) {
      // Detached and independent of the launcher's event loop; no inherited stdio or sensitive env.
      guard = spawn("/bin/sh", ["-c", 'while kill -0 "$2" 2>/dev/null; do\n  if ! kill -0 "$1" 2>/dev/null; then\n    kill -TERM "$2" 2>/dev/null\n    sleep 3\n    kill -KILL "$2" 2>/dev/null\n    /bin/rm -rf -- "$3"\n    exit\n  fi\n  sleep 1\ndone\n/bin/rm -rf -- "$3"', "omp-stats-guard", String(process.pid), String(child.pid), directory], {
        detached: true, stdio: "ignore", env: { PATH: "/usr/bin:/bin" },
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
    const signal = result.signal ?? (receivedSignal === "SIGINT" && result.code === 0 ? undefined : receivedSignal);
    if (signal) {
      // Re-raise after finally removes listeners, preserving shell signal exit semantics.
      setTimeout(() => process.kill(process.pid, signal), 0);
      return 1;
    }
    return result.code ?? 1;
  }
}
