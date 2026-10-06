import { afterAll, beforeAll, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readdir, readFile, realpath, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { isStatsWeb } from "../src/cli/run";

test("only Stats Web arguments select the original-server preload", () => {
  for (const argv of [
    ["stats"],
    ["stats", "--port", "0", "--host", "localhost"],
    ["stats", "--port=8847", "--host=::1"],
    ["stats", "-p", "8847"],
    ["stats", "-p8847"],
    ["stats", "-p=8847", "--host", "0.0.0.0"],
    ["stats", "--host", "192.0.2.1"],
    ["stats", "--host=stats.example.test"],
  ]) expect(isStatsWeb(argv)).toBe(true);
});

test("reports, help and invalid or unknown forms retain the official command path", () => {
  for (const argv of [
    [], ["--version"], ["help", "stats"], ["stats", "--help"], ["stats", "-h"],
    ["stats", "--json"], ["stats", "-j"], ["stats", "--summary"], ["stats", "-s"],
    ["stats", "-js"], ["stats", "--json=false"], ["stats", "--unknown"],
    ["stats", "--port"], ["stats", "--host"], ["stats", "--port", "--help"],
    ["stats", "--port", "-1"], ["stats", "--"], ["stats", "unexpected"],
  ]) expect(isStatsWeb(argv)).toBe(false);
});

const fixture = (name: string) => fileURLToPath(new URL(`./fixtures/${name}`, import.meta.url));
let root: string;
let official: string;
beforeAll(async () => {
  root = await realpath(await mkdtemp(join(tmpdir(), "omp runner tests 中文-")));
  official = join(root, process.platform === "win32" ? "official.exe" : "official");
  const compile = Bun.spawn([process.execPath, "build", fixture("stats-official.ts"), "--compile", "--outfile", official], {
    // Match upstream compile-binary.ts: disable Bun's built-in Mach-O signing
    // before applying a valid ad-hoc signature to the fresh compiled fixture.
    env: { ...process.env, ...(process.platform === "darwin" ? { BUN_NO_CODESIGN_MACHO_BINARY: "1" } : {}) },
    stdout: "pipe", stderr: "pipe",
  });
  const diagnostics = Promise.all([new Response(compile.stdout).text(), new Response(compile.stderr).text()]);
  if (await compile.exited !== 0) throw new Error((await diagnostics).join("\n"));
  await diagnostics;
  if (process.platform === "darwin") {
    const sign = Bun.spawn(["codesign", "--force", "--sign", "-", "--entitlements", fixture("bun-entitlements.plist"), official], { stdout: "pipe", stderr: "pipe" });
    const signingOutput = Promise.all([new Response(sign.stdout).text(), new Response(sign.stderr).text()]);
    if (await sign.exited !== 0) throw new Error((await signingOutput).join("\n"));
    await signingOutput;
  }
}, 30000);
afterAll(async () => { if (root) await rm(root, { recursive: true, force: true }); });

type Runner = Bun.Subprocess<"ignore", "pipe", "pipe">;
type Ready = { url: string; pid: number; cwd: string; argv: string[]; options: string };
async function readiness(child: Runner): Promise<Ready> {
  const reader = child.stdout.getReader();
  let line = "";
  const decoder = new TextDecoder();
  try {
    while (!line.includes("\n")) {
      const chunk = await reader.read();
      if (chunk.done) throw new Error(`runner exited before readiness: ${await new Response(child.stderr).text()}`);
      line += decoder.decode(chunk.value, { stream: true });
    }
  } finally { reader.releaseLock(); }
  const value: unknown = JSON.parse(line.slice(0, line.indexOf("\n")));
  if (!value || typeof value !== "object" || !("url" in value) || typeof value.url !== "string"
    || !("pid" in value) || typeof value.pid !== "number" || !("cwd" in value) || typeof value.cwd !== "string"
    || !("options" in value) || typeof value.options !== "string" || !("argv" in value)
    || !Array.isArray(value.argv) || !value.argv.every(arg => typeof arg === "string")) throw new Error("invalid readiness metadata");
  return { url: value.url, pid: value.pid, cwd: value.cwd, argv: value.argv, options: value.options };
}
async function until(predicate: () => boolean | Promise<boolean>) {
  const deadline = Date.now() + 10000;
  while (!(await predicate())) {
    if (Date.now() > deadline) throw new Error("lifecycle cleanup did not complete");
    await Bun.sleep(50);
  }
}
async function closed(url: string) {
  try { await fetch(url, { signal: AbortSignal.timeout(300) }); return false; } catch { return true; }
}
async function withRunner(run: (child: Runner, ready: Ready, temporary: string, cwd: string) => Promise<void>, ancestor = false) {
  const directory = await mkdtemp(join(root, "case-"));
  const temporary = join(directory, "temporary 中文 with spaces");
  const cwd = join(directory, "original cwd 中文");
  await Promise.all([mkdir(temporary), mkdir(cwd)]);
  // This preload is intentionally safe for the real child and detects any
  // accidental BUN_OPTIONS inheritance by the independent guard.
  const marker = join(directory, "leaked-guard-env");
  const sentinel = join(directory, "sentinel.cjs");
  await writeFile(sentinel, `if (!process.env.OMP_RUNNER_TEST_SECRET) require("node:fs").writeFileSync(${JSON.stringify(marker)}, "leak");`);
  const options = `--preload=data:text/javascript;base64,${Buffer.from(`require(${JSON.stringify(sentinel)});`).toString("base64")}`;
  const args = [fixture("cli-runner.ts"), official, "stats", "--port", "0"];
  const child = Bun.spawn([process.execPath, ...(ancestor ? [fixture("cli-runner-parent.ts")] : []), ...args], {
    cwd, env: { ...process.env, TMPDIR: temporary, TMP: temporary, TEMP: temporary, BUN_OPTIONS: options, OMP_RUNNER_TEST_SECRET: "private-value" },
    stdin: "ignore", stdout: "pipe", stderr: "pipe",
  });
  let ready: Ready | undefined;
  try {
    ready = await readiness(child);
    expect(ready.argv).toEqual(["stats", "--port", "0"]);
    expect(ready.cwd).toBe(cwd);
    expect(ready.options.startsWith(options + " --preload=data:")).toBe(true);
    expect(await readdir(cwd)).toEqual([]);
    expect((await readdir(temporary)).filter(name => name.startsWith("omp-stats-zh-"))).toHaveLength(1);
    // Allow the guard to boot before exercising uncatchable deaths.
    await Bun.sleep(500);
    await run(child, ready, temporary, cwd);
    await until(async () => (await readdir(temporary)).length === 0 && await closed(ready!.url));
    expect(existsSync(marker)).toBe(false);
  } finally {
    if (child.exitCode === null) child.kill("SIGKILL");
    await child.exited;
    if (ready) { try { process.kill(ready.pid, "SIGKILL"); } catch {} }
    await rm(directory, { recursive: true, force: true });
  }
}

test("compiled Bun Stats-compatible fixture loads a spaced absolute preload without changing cwd, argv or API", async () => {
  await withRunner(async (child, ready) => {
    expect(await (await fetch(ready.url)).text()).toContain("/__omp-settings-zh.js");
    expect(await (await fetch(ready.url + "/__omp-settings-zh.js")).text()).toContain("语言");
    expect(await (await fetch(ready.url + "/api/data")).json()).toEqual({ official: true });
    await fetch(ready.url + "/exit");
    expect(await child.exited).toBe(17);
  });
}, 20000);

test("independent Bun guard reaps Stats after an uncatchable launcher death", async () => {
  await withRunner(async child => { child.kill("SIGKILL"); await child.exited; });
}, 20000);

test("independent Bun guard reaps Stats after the launcher parent disappears", async () => {
  await withRunner(async child => { child.kill("SIGKILL"); await child.exited; }, true);
}, 20000);

test.skipIf(process.platform === "win32")("Unix Ctrl+C retains a compiled Stats fixture's graceful zero exit and removes preload", async () => {
  await withRunner(async child => { process.kill(child.pid, "SIGINT"); expect(await child.exited).toBe(0); });
}, 20000);

test.skipIf(process.platform !== "win32")("Windows real console Ctrl+C preserves a compiled Stats fixture's zero exit and clears Stats", async () => {
  const directory = await mkdtemp(join(root, "console 中文-"));
  const temporary = join(directory, "temp with spaces");
  const readyFile = join(directory, "ready.json");
  await mkdir(temporary);
  // Quote according to CreateProcess/MS CRT rules, not cmd.exe syntax.
  const command = [process.execPath, fixture("cli-runner.ts"), official, "stats"].map(arg =>
    `"${arg.replace(/(\\*)"/g, '$1$1\\"').replace(/\\+$/g, '$&$&')}"`).join(" ");
  const helper = Bun.spawn(["powershell.exe", "-NoProfile", "-NonInteractive", "-File", fixture("windows-ctrlc.ps1")], {
    env: { ...process.env, BUN_OPTIONS: "", TMPDIR: temporary, TMP: temporary, TEMP: temporary,
      OMP_RUNNER_TEST_BUN: process.execPath, OMP_RUNNER_TEST_COMMAND: command, OMP_RUNNER_TEST_CWD: directory, OMP_RUNNER_TEST_READY_FILE: readyFile },
    stdin: "ignore", stdout: "pipe", stderr: "pipe",
  });
  const diagnostics = Promise.all([new Response(helper.stdout).text(), new Response(helper.stderr).text()]);
  try {
    const code = await helper.exited;
    if (code !== 0) throw new Error((await diagnostics).join("\n"));
    await diagnostics;
    const value: unknown = JSON.parse(await readFile(readyFile, "utf8"));
    if (!value || typeof value !== "object" || !("url" in value) || typeof value.url !== "string") throw new Error("invalid console fixture readiness");
    const url = value.url;
    await until(async () => (await readdir(temporary)).length === 0 && await closed(url));
  } finally {
    if (helper.exitCode === null) helper.kill("SIGKILL");
    await helper.exited;
    await rm(directory, { recursive: true, force: true });
  }
}, 40000);

test("non-Web command retains every argument, stderr, cwd, options and official exit status", async () => {
  const argv = ["stats", "--help", "中文 空格", "a\"b", "x&y", "%PATH%", "trailing\\"];
  const child = Bun.spawn([process.execPath, fixture("cli-runner.ts"), official, ...argv], {
    cwd: root, env: { ...process.env, BUN_OPTIONS: "--smol" }, stdin: "ignore", stdout: "pipe", stderr: "pipe",
  });
  const stdout = new Response(child.stdout).text();
  const stderr = new Response(child.stderr).text();
  expect(await child.exited).toBe(23);
  expect(JSON.parse(await stdout)).toEqual({ argv, cwd: root, options: "--smol" });
  expect(await stderr).toBe("official stderr\n");
}, 20000);
