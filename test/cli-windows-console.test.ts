import { expect, test } from "bun:test";
import { mkdtemp, mkdir, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

// Native console events are not equivalent to kill(pid, 'SIGINT') on Windows.
test.skipIf(process.platform !== "win32")("Windows Ctrl+C reaches the official Stats child through the production thin exe and retains its zero exit", async () => {
  const root = await mkdtemp(join(tmpdir(), "omp trampoline console 中文 "));
  let helper: Bun.Subprocess<"ignore", "pipe", "pipe"> | undefined;
  try {
    const temporary = join(root, "temp with spaces");
    const readyFile = join(root, "ready.json");
    const official = join(root, "official.exe");
    const launcher = join(root, "omp.exe");
    await mkdir(temporary);
    const officialBuild = Bun.spawnSync([process.execPath, "build", resolve("test/fixtures/stats-official.ts"), "--compile", "--outfile", official], { stdout: "pipe", stderr: "pipe" });
    if (officialBuild.exitCode !== 0) throw new Error(officialBuild.stderr.toString());
    const config = { bun: process.execPath, main: resolve("src/cli/main.ts"), omp: official };
    const build = Bun.spawnSync([process.execPath, "build", resolve("src/cli/windows-launcher.ts"), "--compile", "--outfile", launcher,
      "--no-compile-autoload-dotenv", "--no-compile-autoload-bunfig", "--no-compile-autoload-tsconfig", "--no-compile-autoload-package-json",
      "--define=OMP_WINDOWS_LAUNCHER_CONFIG=" + JSON.stringify(config)], { stdout: "pipe", stderr: "pipe" });
    if (build.exitCode !== 0) throw new Error(build.stderr.toString());
    const command = [launcher, "stats"].map(arg => `"${arg.replace(/(\\*)"/g, '$1$1\\"').replace(/\\+$/g, '$&$&')}"`).join(" ");
    const env: NodeJS.ProcessEnv = { ...process.env, HOME: root, USERPROFILE: root, LOCALAPPDATA: join(root, "Local App Data"),
      BUN_OPTIONS: "", TMPDIR: temporary, TMP: temporary, TEMP: temporary,
      OMP_RUNNER_TEST_BUN: launcher, OMP_RUNNER_TEST_COMMAND: command, OMP_RUNNER_TEST_CWD: root, OMP_RUNNER_TEST_READY_FILE: readyFile };
    const powershell = join(process.env.SystemRoot!, "System32", "WindowsPowerShell", "v1.0", "powershell.exe");
    helper = Bun.spawn([powershell, "-NoProfile", "-NonInteractive", "-File", resolve("test/fixtures/windows-ctrlc.ps1")], {
      env, stdin: "ignore", stdout: "pipe", stderr: "pipe",
    });
    const [code, out, err] = await Promise.all([helper.exited, new Response(helper.stdout).text(), new Response(helper.stderr).text()]);
    if (code !== 0) throw new Error(out + err);
    const ready = JSON.parse(await readFile(readyFile, "utf8")) as { url: string };
    expect(await readdir(temporary)).toEqual([]);
    await expect(fetch(ready.url, { signal: AbortSignal.timeout(1000) })).rejects.toThrow();
  } finally {
    if (helper && helper.exitCode === null) { helper.kill(); await helper.exited; }
    await rm(root, { recursive: true, force: true });
  }
}, 60_000);
