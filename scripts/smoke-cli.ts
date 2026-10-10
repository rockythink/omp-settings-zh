import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import puppeteer, { type Browser, type Page } from "puppeteer-core";
import { VERSION } from "@oh-my-pi/pi-utils";

// Explicit official compiled executable; npm/source imports are not the runtime.
const input = Bun.argv[2];
const browserExecutable = process.env.OMP_SMOKE_BROWSER;
if (!input || !browserExecutable) throw new Error("Usage: OMP_SMOKE_BROWSER=<Chrome executable> bun scripts/smoke-cli.ts <official omp absolute path>");
if (process.platform !== "darwin" && process.platform !== "linux") throw new Error("Main release gate supports macOS/Linux only; Windows remains a separate draft.");
const root = await mkdtemp(join(tmpdir(), "omp-native-posix-"));
const home = join(root, "home 空格");
const cwd = join(root, "project 空格");
const temporary = join(root, "temp 空格");
const official = join(root, "official bin 空格", "omp");
const openerDir = join(root, "opener");
const wrapper = join(home, ".local/share/omp-settings-zh/bin/omp");
const repo = resolve(import.meta.dir, "..");
const owned = { run: root, browserPid: 0, pagesCreated: 0, pagesClosed: 0, services: [] as { pid: number; port: number; closed: boolean }[] };
const ledger = () => writeFile(join(root, "resources.json"), JSON.stringify(owned));
let browser: Browser | undefined;
let page: Page | undefined;
let service: Bun.Subprocess<"ignore", "pipe", "pipe"> | undefined;
let expectedUrl = "";
let opened = false;
let installed = false;
let bridge: Bun.Server<undefined> | undefined;
const env: Record<string, string | undefined> = { ...process.env, HOME: home, ZDOTDIR: home, SHELL: "/bin/bash", PI_CODING_AGENT_DIR: join(home, ".omp/agent"), XDG_CONFIG_HOME: "", XDG_DATA_HOME: "", XDG_STATE_HOME: "", XDG_CACHE_HOME: "", OMP_PROFILE: "", PI_PROFILE: "", BUN_OPTIONS: "", TMPDIR: temporary };
for (const key of Object.keys(env)) if (/API_KEY|TOKEN|SECRET|CREDENTIAL/i.test(key)) delete env[key];
async function command(binary: string, args: string[]) {
  const child = Bun.spawn([binary, ...args], { cwd, env, stdin: "ignore", stdout: "pipe", stderr: "pipe" });
  const [code, out, error] = await Promise.all([child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()]);
  if (code !== 0) throw new Error(`${binary} ${args.join(" ")} exited ${code}: ${out}\n${error}`);
  return out;
}
async function until<T>(check: () => Promise<T | undefined>, description: string) {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) { const result = await check(); if (result !== undefined) return result; await Bun.sleep(100); }
  throw new Error("Timed out: " + description);
}
async function closeStage() {
  const errors: unknown[] = [];
  try { if (page && !page.isClosed()) { await page.close(); owned.pagesClosed++; } } catch (error) { errors.push(error); }
  page = undefined;
  try {
    if (service) {
      if (service.exitCode === null) service.kill("SIGINT");
      const code = await service.exited;
      if (code !== 0) throw new Error("Stats SIGINT exit " + code);
      service = undefined;
    }
  } catch (error) { errors.push(error); }
  try {
    if (expectedUrl) await until(async () => { try { await fetch(expectedUrl, { signal: AbortSignal.timeout(1000) }); } catch { return true; } }, "owned Stats port closed");
    const resource = owned.services.at(-1); if (resource) resource.closed = true;
    await ledger();
  } catch (error) { errors.push(error); }
  if (errors.length) throw new AggregateError(errors, "Stage resource cleanup failed");
}
try {
  await Promise.all([mkdir(home), mkdir(cwd), mkdir(temporary), mkdir(dirname(official)), mkdir(openerDir)]);
  await copyFile(resolve(input), official);
  env.PATH = dirname(official) + ":" + (process.env.PATH ?? "");
  await ledger(); // Ownership exists before any command capable of opening a page.
  browser = await puppeteer.launch({ executablePath: browserExecutable, headless: true, userDataDir: join(root, "browser-profile"), args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  owned.browserPid = browser.process()?.pid ?? 0;
  const initialPages = await browser.pages();
  // This browser/profile belongs exclusively to this run, including its initial blank page.
  for (const initial of initialPages) { owned.pagesCreated++; await initial.close(); owned.pagesClosed++; }
  await ledger();
  bridge = Bun.serve({ hostname: "127.0.0.1", port: 0, async fetch(request) {
    const url = await request.text();
    if (request.method !== "POST" || url.replace(/\/$/, "") !== expectedUrl || !page) return new Response("unowned URL", { status: 400 });
    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForSelector("#omp-stats-language");
      opened = true;
      return new Response("page-observed");
    } catch (error) { return new Response(String(error), { status: 500 }); }
  } });
  const opener = `#!${process.execPath}\nconst r=await fetch('http://127.0.0.1:${bridge.port}',{method:'POST',body:Bun.argv[2],signal:AbortSignal.timeout(60000)});if(!r.ok||await r.text()!=='page-observed')process.exit(1);\n`;
  await writeFile(join(openerDir, process.platform === "darwin" ? "open" : "xdg-open"), opener, { mode: 0o700 });
  env.PATH = openerDir + ":" + env.PATH;
  if ((await command(official, ["--version"])).trim() !== "omp/" + VERSION) throw new Error("Actual host differs from locked development dependency");
  await command(official, ["plugin", "link", repo]);
  const marker = join(root, "settings.json");
  const probe = join(root, "probe.ts");
  await writeFile(probe, `import {orderedSettings} from '@oh-my-pi/pi-coding-agent/config/all-settings';import {VERSION,getPluginsNodeModules} from '@oh-my-pi/pi-utils';export default function(pi){pi.on('session_start',()=>{setTimeout(async()=>{const s=orderedSettings();const label=s.find(x=>x.id==='autoResume').definition.ui.label;const option=s.find(x=>x.id==='tui.vimModeDisplay').definition.ui.options.find(x=>x.value==='text');await Bun.write(${JSON.stringify(marker)},JSON.stringify({version:VERSION,label,option,plugins:getPluginsNodeModules()}));process.exit(label==='自动恢复'&&option.description==='完整模式名称：NORMAL、INSERT、VISUAL、V-LINE、REPLACE'?0:1);},0);});}`);
  env.ANTHROPIC_API_KEY = "omp-native-smoke-not-a-credential";
  await command(official, ["--mode", "rpc", "--no-ui", "--no-tools", "--no-skills", "--no-rules", "--no-session", "--no-title", "-e", probe]);
  delete env.ANTHROPIC_API_KEY;
  installed = await Bun.file(wrapper).exists();
  if (!installed) throw new Error("Default extension load did not install launcher");
  console.log("Compiled Settings:", await readFile(marker, "utf8"));
  console.log(await command(wrapper, ["plugin", "doctor"]));
  const raw = JSON.parse(await command(official, ["stats", "--json"]));
  const translated = JSON.parse(await command(wrapper, ["stats", "--json"]));
  if (!Bun.deepEquals(raw, translated)) throw new Error("Launcher changed Stats JSON");
  for (const failure of [true, false]) {
    const reserve = Bun.serve({ hostname: "127.0.0.1", port: 0, fetch: () => new Response() });
    const port = reserve.port!; reserve.stop(true);
    expectedUrl = `http://127.0.0.1:${port}`; opened = false;
    page = await browser.newPage(); owned.pagesCreated++; await ledger();
    service = Bun.spawn([wrapper, "stats", "--port", String(port), "--host", "127.0.0.1"], { cwd, env, stdin: "ignore", stdout: "pipe", stderr: "pipe" });
    owned.services.push({ pid: service.pid, port, closed: false }); await ledger();
    const stdout = new Response(service.stdout).text(); const stderr = new Response(service.stderr).text();
    let intentional = false;
    try {
      await until(async () => { if (service!.exitCode !== null) throw new Error(await stderr); return opened ? true : undefined; }, "official automatic URL observed in owned page");
      const listeners = (await command("lsof", ["-nP", "-iTCP:" + port, "-sTCP:LISTEN", "-Fp"])).split("\n").filter(line => line.startsWith("p"));
      if (listeners.length !== 1) throw new Error("Expected exactly one official Stats listener");
      const nativePid = listeners[0]!.slice(1);
      const allListeners = (await command("lsof", ["-nP", "-a", "-p", nativePid, "-iTCP", "-sTCP:LISTEN", "-Fn"])).split("\n").filter(line => line.startsWith("n"));
      if (allListeners.length !== 1 || !allListeners[0]!.endsWith(":" + port)) throw new Error("Official Stats process has unexpected listener");
      console.log("Official process", nativePid, "single listener", allListeners[0]);
      if (failure) { intentional = true; throw new Error("intentional cleanup assertion"); }
      if (await page.$eval("html", node => node.lang) !== "zh-CN") throw new Error("Cold Stats not Chinese");
      await page.click("#omp-stats-language button:nth-child(2)");
      await page.waitForFunction(() => document.documentElement.lang === "en");
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => document.documentElement.lang === "en" && !!document.querySelector("#omp-stats-language"));
      await page.click("#omp-stats-language button:nth-child(1)");
      await page.waitForFunction(() => document.documentElement.lang === "zh-CN");
      const originalApi = await fetch(expectedUrl + "/api/stats/recent");
      if (!originalApi.ok || !originalApi.headers.get("content-type")?.includes("json")) throw new Error("Official API unavailable");
      console.log("Compiled Stats: automatic opener URL, Chinese/English, refresh, same-origin API and original host/port", expectedUrl);
    } catch (error) { if (!intentional || !(error instanceof Error) || error.message !== "intentional cleanup assertion") throw error; }
    finally { await closeStage(); await Promise.all([stdout, stderr]); }
    if ((await browser.pages()).length !== 0) throw new Error("Owned page did not return to baseline");
    console.log(failure ? "Assertion-failure cleanup passed" : "Success cleanup passed", JSON.stringify(owned));
  }
  await command(wrapper, ["plugin", "uninstall", "omp-settings-zh", "--dry-run"]);
  if (!(await Bun.file(wrapper).exists())) throw new Error("Dry-run removed launcher");
  await command(wrapper, ["plugin", "uninstall", "omp-settings-zh"]);
  if (await Bun.file(wrapper).exists()) throw new Error("Standard uninstall left launcher");
  installed = false;
  if ((await command(official, ["--version"])).trim() !== "omp/" + VERSION) throw new Error("Official executable changed");
  console.log("Native macOS/Linux smoke passed; test-only opener forwarding is not the system-default opener contract.");
} finally {
  const errors: unknown[] = [];
  try { await closeStage(); } catch (error) { errors.push(error); }
  try { bridge?.stop(true); } catch (error) { errors.push(error); }
  try { await browser?.close(); } catch (error) { errors.push(error); }
  try { if (installed || await Bun.file(wrapper).exists()) await command(process.execPath, [join(repo, "src/cli/install.ts"), "uninstall"]); } catch (error) { errors.push(error); }
  if (!errors.length) { console.log("Resource cleanup:", JSON.stringify(owned)); await rm(root, { recursive: true, force: true }); }
  else throw new AggregateError(errors, "Owned resources retained with ledger at " + root);
}
