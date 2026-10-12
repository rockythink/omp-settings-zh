import { copyFile, mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
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
interface PageResource { targetId: string; url: string; closed: boolean }
const owned = {
  run: root, browserPid: 0, browserExecutable, browserProfile: join(root, "browser-profile"), browserClosed: false,
  baselinePages: [] as string[], pagesCreated: 0, pagesClosed: 0, pages: [] as PageResource[],
  services: [] as { pid: number; nativePid?: number; port: number; closed: boolean; preload?: string }[],
  bridge: undefined as { pid: number; port: number; closed: boolean } | undefined,
  temporaryPaths: [root, home, cwd, temporary, dirname(official), openerDir],
};
const pageResources = new WeakMap<Page, PageResource>();
const ledger = () => writeFile(join(root, "resources.json"), JSON.stringify(owned));
async function recordPage(target: Page) {
  const client = await target.createCDPSession();
  try {
    const { targetInfo } = await client.send("Target.getTargetInfo");
    const resource = { targetId: targetInfo.targetId, url: target.url(), closed: false };
    pageResources.set(target, resource); owned.pages.push(resource); owned.pagesCreated++;
    await ledger();
  } finally { await client.detach(); }
}
async function closePage(target: Page) {
  if (!target.isClosed()) await target.close();
  const resource = pageResources.get(target);
  if (resource && !resource.closed) { resource.closed = true; owned.pagesClosed++; }
}
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
  try { if (page) await closePage(page); } catch (error) { errors.push(error); }
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
    const resource = owned.services.at(-1);
    if (resource) {
      if (resource.preload) {
        try { await stat(resource.preload); throw new Error("Owned private preload directory survived Stats exit"); }
        catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
      }
      resource.closed = true;
    }
    await ledger();
  } catch (error) { errors.push(error); }
  if (errors.length) throw new AggregateError(errors, "Stage resource cleanup failed");
}
try {
  await Promise.all([mkdir(home), mkdir(cwd), mkdir(temporary), mkdir(dirname(official)), mkdir(openerDir)]);
  await copyFile(resolve(input), official);
  env.PATH = dirname(official) + ":" + (process.env.PATH ?? "");
  await ledger(); // Ownership exists before any command capable of opening a page.
  browser = await puppeteer.launch({ executablePath: browserExecutable, headless: true, userDataDir: owned.browserProfile, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  owned.browserPid = browser.process()?.pid ?? 0;
  const initialPages = await browser.pages();
  // This browser/profile belongs exclusively to this run, including its initial blank page.
  for (const initial of initialPages) { await recordPage(initial); await closePage(initial); }
  await ledger();
  bridge = Bun.serve({ hostname: "127.0.0.1", port: 0, async fetch(request) {
    const url = await request.text();
    if (request.method !== "POST" || url.replace(/\/$/, "") !== expectedUrl || !page) return new Response("unowned URL", { status: 400 });
    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForSelector("#omp-stats-language");
      pageResources.get(page)!.url = url; await ledger(); opened = true;
      return new Response("page-observed");
    } catch (error) { return new Response(String(error), { status: 500 }); }
  } });
  owned.bridge = { pid: process.pid, port: bridge.port!, closed: false }; await ledger();
  const opener = "#!" + process.execPath + "\nconst r=await fetch(" + JSON.stringify("http://127.0.0.1:" + bridge.port) + ",{method:'POST',body:Bun.argv[2],signal:AbortSignal.timeout(60000)});if(!r.ok||await r.text()!=='page-observed')process.exit(1);\n";
  await writeFile(join(openerDir, process.platform === "darwin" ? "open" : "xdg-open"), opener, { mode: 0o700 });
  env.PATH = openerDir + ":" + env.PATH;
  const hostMarker = join(root, "compiled-bun.json");
  const userPreload = join(root, "user-preload.cjs");
  const fetchAudit = join(root, "compiled-fetch.jsonl");
  await writeFile(userPreload, `const fs=require('node:fs');if(fs.realpathSync(process.execPath)===fs.realpathSync(${JSON.stringify(official)})){
fs.writeFileSync(${JSON.stringify(hostMarker)},JSON.stringify({pid:process.pid,bun:Bun.version,argv:Bun.argv,options:process.env.BUN_OPTIONS}));
globalThis.fetch=async(input,init)=>{const url=String(typeof input==='string'||input instanceof URL?input:input.url);const method=init?.method||(typeof input==='object'&&input.method)||'GET';fs.appendFileSync(${JSON.stringify(fetchAudit)},JSON.stringify({pid:process.pid,url,method})+'\\n');throw new Error('Test subprocess fetch dispatch disabled');};
}`);
  env.BUN_OPTIONS = "--smol --preload=" + userPreload;
  owned.temporaryPaths.push(userPreload, hostMarker, fetchAudit); await ledger();
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
    page = await browser.newPage(); await recordPage(page);
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
      const resource = owned.services.at(-1)!; resource.nativePid = Number(nativePid);
      const childPids = (await command("pgrep", ["-P", String(service!.pid)])).trim().split(/\s+/);
      const processArgs = await command("ps", ["-ww", "-p", childPids.join(","), "-o", "args="]);
      const privateDirectory = processArgs.match(/omp-stats-guard \d+ \d+ (\S+)$/m)?.[1];
      if (!privateDirectory) throw new Error("Cannot identify owned private preload directory");
      resource.preload = privateDirectory; owned.temporaryPaths.push(privateDirectory); await ledger();
      if (((await stat(privateDirectory)).mode & 0o777) !== 0o700 || ((await stat(join(privateDirectory, "preload.cjs"))).mode & 0o777) !== 0o600) throw new Error("Private preload permissions changed");
      const compiled = JSON.parse(await readFile(hostMarker, "utf8"));
      if (compiled.pid !== Number(nativePid) || !compiled.options.startsWith(env.BUN_OPTIONS)) throw new Error("Actual compiled Bun did not retain and execute user preload/flags");
      console.log("Official process", nativePid, "single listener", allListeners[0], "compiled Bun", compiled.bun, "merged user preload", compiled.options);
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
  const attempts = (await readFile(fetchAudit, "utf8").catch((error: NodeJS.ErrnoException) => { if (error.code === "ENOENT") return ""; throw error; })).trim().split("\n").filter(Boolean).map(line => JSON.parse(line) as { pid: number; url: string; method: string });
  if (attempts.some(item => item.method !== "GET" || !/\/(?:models(?:\.json\.zstd)?|tags|props)$/.test(new URL(item.url).pathname))) throw new Error("Unexpected non-catalogue fetch attempt: " + JSON.stringify(attempts));
  console.log("Compiled fetch audit:", attempts.length, "catalogue GET attempts blocked before dispatch; no inference attempts", JSON.stringify(attempts));
  console.log("Native macOS/Linux smoke passed; test-only opener forwarding is not the system-default opener contract.");
} finally {
  const errors: unknown[] = [];
  try { await closeStage(); } catch (error) { errors.push(error); }
  try { bridge?.stop(true); if (owned.bridge) owned.bridge.closed = true; await ledger(); } catch (error) { errors.push(error); }
  try { await browser?.close(); owned.browserClosed = true; for (const resource of owned.pages) if (!resource.closed) { resource.closed = true; owned.pagesClosed++; } await ledger(); } catch (error) { errors.push(error); }
  try { if (installed || await Bun.file(wrapper).exists()) await command(process.execPath, [join(repo, "src/cli/install.ts"), "uninstall"]); } catch (error) { errors.push(error); }
  if (!errors.length) { console.log("Resource cleanup:", JSON.stringify(owned)); await rm(root, { recursive: true, force: true }); }
  else throw new AggregateError(errors, "Owned resources retained with ledger at " + root);
}
