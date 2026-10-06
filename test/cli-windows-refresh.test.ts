import { expect, test } from "bun:test";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile, copyFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { windowsInstallDirectory } from "../src/cli/windows";

const windowsModule = resolve("src/cli/windows.ts");
const nativeTest = process.platform === "win32" ? test : test.skip;

nativeTest("a real running Windows thin exe queues refresh once, preserves failed stage for retry, and commits after parent exit", async () => {
  const home = await mkdtemp(join(tmpdir(), "omp locked refresh 中文 "));
  const children: Bun.Subprocess<"pipe", "pipe", "pipe">[] = [];
  try {
    const app = join(home, "package", "cli");
    await mkdir(app, { recursive: true });
    const entry = join(app, "install.ts");
    const official = join(home, "official.exe");
    const nextBun = join(home, "next bun.exe");
    await copyFile(process.execPath, official);
    await copyFile(process.execPath, nextBun);
    const env: NodeJS.ProcessEnv = { ...process.env, HOME: home, USERPROFILE: home, LOCALAPPDATA: join(home, "Local App Data") };
    const root = windowsInstallDirectory(env);
    const statePath = join(root, "state.json");
    const wrapper = join(root, "bin", "omp.exe");
    // Explicit per-process store: this native lock/PowerShell test never modifies HKCU.
    const storeSource = `let path={value:null,kind:'String'};const store={read:async()=>({...path}),replace:async(before,after)=>{path={...after}}};`;
    await writeFile(join(app, "main.ts"), `import {readFile} from 'node:fs/promises';
import {manageWindowsLauncher} from ${JSON.stringify(windowsModule)};
${storeSource}
const entry=${JSON.stringify(entry)},statePath=${JSON.stringify(statePath)};
const options={omp:${JSON.stringify(official)},bun:${JSON.stringify(nextBun)}};
const first=await manageWindowsLauncher('install',options,entry,false,store);
const pending=JSON.parse(await readFile(statePath,'utf8')).pending;
const second=await manageWindowsLauncher('install',options,entry,false,store);
if(!pending||JSON.parse(await readFile(statePath,'utf8')).pending.id!==pending.id)throw Error('pending refresh was not idempotent');
if(Bun.argv.at(-1)==='cancel')await manageWindowsLauncher('uninstall',{},entry,false,store);
console.log(JSON.stringify({first,second,pending}));await Bun.stdin.text();`);
    const install = Bun.spawn([process.execPath, "-e", `import {manageWindowsLauncher} from ${JSON.stringify(windowsModule)};${storeSource}await manageWindowsLauncher('install',{omp:${JSON.stringify(official)},bun:process.execPath},${JSON.stringify(entry)},false,store);`], { env, stdin: "ignore", stdout: "pipe", stderr: "pipe" });
    const [installCode, installOut, installErr] = await Promise.all([install.exited, new Response(install.stdout).text(), new Response(install.stderr).text()]);
    if (installCode !== 0) throw new Error(installOut + installErr);

    const launch = async (mode: string) => {
      const child = Bun.spawn([wrapper, mode], { env, stdin: "pipe", stdout: "pipe", stderr: "pipe" });
      children.push(child);
      const stderr = new Response(child.stderr).text();
      const reader = child.stdout.getReader();
      const decoder = new TextDecoder();
      let line = "";
      while (!line.includes("\n")) { const part = await reader.read(); if (part.done) throw new Error(await stderr); line += decoder.decode(part.value); }
      await reader.cancel();
      const value = JSON.parse(line) as { first: string; second: string; pending: { id: string; file: string; next: { wrapperHash: string } } };
      expect(value.first).toContain("排队");
      expect(value.second).toContain("排队");
      return { child, stderr, pending: value.pending };
    };
    const failed = await launch("refresh");
    const stage = await readFile(failed.pending.file);
    await writeFile(failed.pending.file, "changed after helper handshake");
    failed.child.stdin.end();
    expect(await failed.child.exited).toBe(0);
    expect(await failed.stderr).toContain("ownership changed");
    expect(JSON.parse(await readFile(statePath, "utf8")).pending.id).toBe(failed.pending.id);
    await writeFile(failed.pending.file, stage);

    const retry = await launch("refresh");
    expect(retry.pending.id).toBe(failed.pending.id);
    retry.child.stdin.end();
    expect(await retry.child.exited).toBe(0);
    expect(await retry.stderr).toBe("");
    const state = JSON.parse(await readFile(statePath, "utf8"));
    expect(state.pending).toBeUndefined();
    expect(state.bun).toBe(nextBun);
    expect(createHash("sha256").update(await readFile(wrapper)).digest("hex")).toBe(retry.pending.next.wrapperHash);
    expect((await readdir(root)).some(name => name.startsWith("pending-"))).toBe(false);

    // Force another real config change while the managed parent is alive, then
    // cancel it through uninstall. The waiting refresh must not resurrect files.
    const alternateBun = join(home, "alternate bun.exe");
    await copyFile(process.execPath, alternateBun);
    await writeFile(join(app, "main.ts"), (await readFile(join(app, "main.ts"), "utf8")).replaceAll(JSON.stringify(nextBun), JSON.stringify(alternateBun)));
    const cancelled = await launch("cancel");
    cancelled.child.stdin.end();
    expect(await cancelled.child.exited).toBe(0);
    expect(await cancelled.stderr).toBe("");
    expect(await Bun.file(wrapper).exists()).toBe(false);
    expect(await Bun.file(statePath).exists()).toBe(false);
    expect(await Bun.file(cancelled.pending.file).exists()).toBe(false);
  } finally {
    for (const child of children) if (child.exitCode === null) { child.stdin.end(); child.kill(); await child.exited; }
    await rm(home, { recursive: true, force: true });
  }
}, 120_000);
