import { copyFile, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { delimiter, dirname, join, resolve } from "node:path";
import { VERSION } from "@oh-my-pi/pi-utils";

// Explicit real official binary; never substitute a fixture or an npm Stats server.
const input = Bun.argv[2];
if (!input) throw new Error("Usage: bun run scripts/smoke-cli.ts <official omp executable>");
const windows = process.platform === "win32";
const root = await mkdtemp(join(tmpdir(), "omp native smoke 空格 "));
const home = join(root, "home");
const originalBin = join(root, "official bin");
const localAppData = join(home, "AppData", "Local");
const cwd = join(root, "project");
const temporary = join(root, "temp 中文 空格");
await Promise.all([mkdir(originalBin), mkdir(cwd), mkdir(localAppData, { recursive: true }), mkdir(temporary)]);
const official = join(originalBin, windows ? "omp.exe" : "omp");
await copyFile(resolve(input), official);
const env: Record<string, string | undefined> = {
  ...process.env, HOME: home, USERPROFILE: home, LOCALAPPDATA: localAppData,
  ...(windows ? { TMPDIR: temporary, TMP: temporary, TEMP: temporary } : {}),
  SHELL: "/bin/bash", ZDOTDIR: home,
  PATH: originalBin + delimiter + (process.env.PATH ?? Object.entries(process.env).find(([key]) => key.toUpperCase() === "PATH")?.[1] ?? ""),
  PI_CODING_AGENT_DIR: join(home, ".omp", "agent"),
  XDG_CONFIG_HOME: "", XDG_DATA_HOME: "", XDG_STATE_HOME: "", XDG_CACHE_HOME: "",
  OMP_PROFILE: "", PI_PROFILE: "", BUN_OPTIONS: "",
};
for (const key of Object.keys(env)) if (key !== "PATH" && key.toUpperCase() === "PATH") delete env[key];
const repo = resolve(import.meta.dir, "..");
const wrapper = windows
  ? join(localAppData, "omp-settings-zh", "bin", "omp.exe")
  : join(home, ".local", "share", "omp-settings-zh", "bin", "omp");
let service: Bun.Subprocess<"ignore", "pipe", "pipe"> | undefined;
let installed = false;

async function command(binary: string, args: string[]) {
  const child = Bun.spawn([binary, ...args], { cwd, env, stdin: "ignore", stdout: "pipe", stderr: "pipe" });
  const [code, stdout, stderr] = await Promise.all([child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()]);
  if (code !== 0) throw new Error(`${binary} ${args.join(" ")} exited ${code}\n${stdout}\n${stderr}`);
  return stdout;
}
async function until<T>(check: () => Promise<T | undefined>, description: string): Promise<T> {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    const result = await check();
    if (result !== undefined) return result;
    await Bun.sleep(100);
  }
  throw new Error("Timed out: " + description);
}

try {
  const version = (await command(official, ["--version"])).trim();
  if (version !== "omp/" + VERSION) throw new Error("Unexpected official host: " + version);
  await command(official, ["plugin", "link", repo]);
  const marker = join(root, "native-settings.json");
  const probe = join(root, "native-probe.ts");
  await writeFile(probe, `import { orderedSettings } from "@oh-my-pi/pi-coding-agent/config/all-settings";
import { VERSION } from "@oh-my-pi/pi-utils";
export default function (pi) {
  pi.on("session_start", () => {
    setTimeout(async () => {
      try {
        const label = orderedSettings().find(setting => setting.id === "autoResume").definition.ui.label;
        if (label !== "自动恢复") throw new Error("Compiled host did not share translated metadata: " + label);
        await Bun.write(${JSON.stringify(marker)}, JSON.stringify({ version: VERSION, platform: process.platform, label }));
        process.exit(0);
      } catch (error) { console.error(error); process.exit(1); }
    }, 0);
  });
}
`);
  const session = Bun.spawn([official, "--mode", "rpc", "--no-ui", "--no-tools", "--no-skills", "--no-rules", "--no-session", "--no-title", "-e", probe], {
    // Catalog registration only; stdin never sends a prompt and the probe exits
    // on session_start. No real credential or model request is required.
    cwd, env: { ...env, ANTHROPIC_API_KEY: "omp-settings-zh-smoke-not-a-credential" }, stdin: "pipe", stdout: "pipe", stderr: "pipe",
  });
  const output = new Response(session.stdout).text();
  const errors = new Response(session.stderr).text();
  try {
    await until(async () => {
      if (await Bun.file(marker).exists()) return true;
      if (session.exitCode !== null) throw new Error(`Host probe exited ${session.exitCode}\n${await output}\n${await errors}`);
    }, "real extension initialization");
    if (await session.exited !== 0) throw new Error(await errors);
  } finally { if (session.exitCode === null) { session.kill(); await session.exited; } }
  installed = await Bun.file(wrapper).exists();
  if (!installed) throw new Error("Default extension load did not install its launcher: " + wrapper);
  console.log("Compiled Settings:", await readFile(marker, "utf8"));
  env.PATH = dirname(wrapper) + delimiter + env.PATH;
  await command(wrapper, ["plugin", "doctor"]);
  const direct = JSON.parse(await command(official, ["stats", "--json"]));
  const localized = JSON.parse(await command(wrapper, ["stats", "--json"]));
  if (!Bun.deepEquals(direct, localized)) throw new Error("Stats JSON changed through launcher");
  const reserve = Bun.serve({ hostname: "127.0.0.1", port: 0, fetch: () => new Response() });
  const port = reserve.port;
  reserve.stop(true);
  const url = `http://127.0.0.1:${port}`;
  const statsArgs = ["stats", "--port", String(port), "--host", "127.0.0.1"];
  const consoleReady = join(root, "console-ready.json");
  if (windows) {
    // The helper creates a new console before broadcasting the real native
    // Ctrl+C event, so neither Bun tests nor the CI runner can be interrupted.
    const consoleCommand = [wrapper, ...statsArgs].map(arg =>
      `"${arg.replace(/(\\*)"/g, '$1$1\\"').replace(/\\+$/g, '$&$&')}"`).join(" ");
    const powershell = join(process.env.SystemRoot!, "System32", "WindowsPowerShell", "v1.0", "powershell.exe");
    service = Bun.spawn([powershell, "-NoProfile", "-NonInteractive", "-File", join(repo, "test/fixtures/windows-ctrlc.ps1")], {
      cwd, env: { ...env, OMP_RUNNER_TEST_BUN: wrapper, OMP_RUNNER_TEST_COMMAND: consoleCommand,
        OMP_RUNNER_TEST_CWD: cwd, OMP_RUNNER_TEST_READY_FILE: consoleReady },
      stdin: "ignore", stdout: "pipe", stderr: "pipe",
    });
  } else {
    service = Bun.spawn([wrapper, ...statsArgs], { cwd, env, stdin: "ignore", stdout: "pipe", stderr: "pipe" });
  }
  const serviceOut = new Response(service.stdout).text();
  const serviceErrors = new Response(service.stderr).text();
  await until(async () => {
    if (service!.exitCode !== null) throw new Error(`Stats exited ${service!.exitCode}\n${await serviceOut}\n${await serviceErrors}`);
    try { const page = await fetch(url); return page.ok ? await page.text() : undefined; } catch { return undefined; }
  }, "official Stats listener").then(html => {
    if (!html.includes('/__omp-settings-zh.js')) throw new Error("Official Stats HTML has no language script");
  });
  const script = await fetch(url + "/__omp-settings-zh.js");
  if (!script.ok || !(await script.text()).includes("English")) throw new Error("Language script missing on official origin");
  console.log("Official Stats: same-origin script, unchanged JSON, preserved host/port, spaced HOME and cwd");
  if (windows) {
    // Signal only after the actual official listener and translation script
    // are verified. The helper requires its thin-exe child to return zero.
    await writeFile(consoleReady, "ready");
  } else {
    service.kill("SIGINT");
  }
  const statsExit = await service.exited;
  if (statsExit !== 0) throw new Error(`Official Stats Ctrl+C exited ${statsExit}\n${await serviceOut}\n${await serviceErrors}`);
  service = undefined;
  await until(async () => { try { await fetch(url); return undefined; } catch { return true; } }, "Stats listener shutdown");
  if (windows && (await readdir(temporary)).length !== 0) throw new Error("Ctrl+C left native compiler or Stats preload temporary files");
  console.log("Official Stats Ctrl+C: zero exit, closed listener and cleaned temporary files");
  await command(wrapper, ["plugin", "uninstall", "omp-settings-zh", "--dry-run"]);
  if (!(await Bun.file(wrapper).exists())) throw new Error("Dry-run removed launcher");
  await command(wrapper, ["plugin", "uninstall", "omp-settings-zh"]);
  await until(async () => await Bun.file(wrapper).exists() ? undefined : true, "owned launcher removal");
  installed = false;
  if ((await command(official, ["--version"])).trim() !== version) throw new Error("Official executable changed");
  if (windows && (await readdir(temporary)).length !== 0) throw new Error("User PATH updater left native compiler temporary files");
  console.log("Native smoke passed: default install, doctor, Settings, Stats, dry-run and owned uninstall");
} finally {
  if (service) {
    // Let the Windows driver run its bounded wait and native child cleanup;
    // killing the driver first would strand the separate console process.
    if (!windows) service.kill();
    await service.exited;
  }
  // Preserve unrelated user PATH entries: cleanup through the installer, never restore a whole snapshot.
  if (installed || await Bun.file(wrapper).exists()) {
    await command(process.execPath, [join(repo, "src/cli/install.ts"), "uninstall"]);
  }
  await rm(root, { recursive: true, force: true });
}
