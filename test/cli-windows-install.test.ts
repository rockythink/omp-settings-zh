import { expect, test } from "bun:test";
import { mkdtemp, mkdir, readFile, realpath, readdir, rm, writeFile, copyFile } from "node:fs/promises";
import { delimiter, dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { changeWindowsPath, windowsHome, windowsInstallDirectory, WINDOWS_LAUNCHER_MARKER } from "../src/cli/windows";

const source = resolve("src/cli/windows-launcher.ts");
const installer = resolve("src/cli/install.ts");
const windowsModule = resolve("src/cli/windows.ts");

test("Windows locations honor USERPROFILE/HOME and LOCALAPPDATA without POSIX paths", () => {
  expect(windowsHome({ HOME: "C:\\home", USERPROFILE: "D:\\用户" })).toBe("D:\\用户");
  expect(windowsHome({ HOME: "C:\\home" })).toBe("C:\\home");
  expect(windowsInstallDirectory({ USERPROFILE: "C:\\Users\\a b" })).toBe("C:\\Users\\a b\\AppData\\Local\\omp-settings-zh");
  expect(windowsInstallDirectory({ USERPROFILE: "C:\\Users\\a", LOCALAPPDATA: "D:\\App Data" })).toBe("D:\\App Data\\omp-settings-zh");
  expect(() => windowsHome({})).toThrow();
  expect(() => windowsInstallDirectory({ HOME: "C:\\a", LOCALAPPDATA: "relative" })).toThrow();
});

test("User PATH edits are case-insensitive, idempotent, non-destructive and preserve expansion tokens", () => {
  const bin = "C:\\Users\\a b\\AppData\\Local\\omp-settings-zh\\bin";
  const value = "%MY_TOOLS%;D:\\Tools;;";
  const installed = changeWindowsPath(value, bin, true);
  expect(installed).toBe(bin + ";" + value);
  expect(changeWindowsPath(installed, bin, true)).toBe(installed);
  expect(changeWindowsPath(installed + ";E:\\later", bin, false)).toBe(value + ";E:\\later");
  expect(changeWindowsPath('"' + bin.toUpperCase() + '\\";D:\\keep', bin, false)).toBe("D:\\keep");
  expect(changeWindowsPath("D:\\first;" + bin + ";E:\\last", bin, true)).toBe(bin + ";D:\\first;E:\\last");
  expect(changeWindowsPath(null, bin, true)).toBe(bin);
  expect(changeWindowsPath(bin + ";", bin, false)).toBe("");
  expect(changeWindowsPath(";" + bin, bin, true)).toBe(bin + ";");
  const longPath = Array.from({ length: 1500 }, (_, index) => "D:\\tool-" + index).join(";");
  expect(changeWindowsPath(changeWindowsPath(longPath, bin, true), bin, false)).toBe(longPath);
  expect(changeWindowsPath(bin, bin, false)).toBeNull();
  expect(() => changeWindowsPath(bin + ";" + bin.toUpperCase(), bin, false)).toThrow("重复");
  expect(() => changeWindowsPath(null, "C:\\bad;entry", true)).toThrow();
});

test("the production compiled trampoline preserves argv, cwd, stdio and exit, and protects update PATH", async () => {
  const root = await realpath(await mkdtemp(join(tmpdir(), "omp thin exe ' 中文 ")));
  const buildRoot = await mkdtemp(join(tmpdir(), "omp-thin-build-"));
  try {
    const main = join(root, "main.ts");
    const emit = join(root, "emit.ts");
    await writeFile(main, `const [official,...args]=Bun.argv.slice(2);const child=Bun.spawn([official,${JSON.stringify(emit)},...args],{stdin:'inherit',stdout:'inherit',stderr:'inherit'});process.exitCode=await child.exited;`);
    await writeFile(emit, `console.log(JSON.stringify({args:Bun.argv.slice(2),cwd:process.cwd(),path:process.env.PATH,stdin:await Bun.stdin.text()}));console.error('official-stderr');process.exitCode=23;`);
    const outfile = join(root, process.platform === "win32" ? "omp.exe" : "omp");
    const buildFile = join(buildRoot, process.platform === "win32" ? "omp.exe" : "omp");
    const config = { bun: process.execPath, main, omp: process.execPath };
    const built = Bun.spawnSync([process.execPath, "build", source, "--compile", "--outfile", buildFile,
      "--no-compile-autoload-dotenv", "--no-compile-autoload-bunfig", "--no-compile-autoload-tsconfig", "--no-compile-autoload-package-json",
      "--define=OMP_WINDOWS_LAUNCHER_CONFIG=" + JSON.stringify(config)], {
        env: { ...process.env, ...(process.platform === "darwin" ? { BUN_NO_CODESIGN_MACHO_BINARY: "1" } : {}) }, stdout: "pipe", stderr: "pipe" });
    if (built.exitCode !== 0) throw new Error(built.stderr.toString());
    if (process.platform === "darwin") {
      const sign = Bun.spawnSync(["/usr/bin/codesign", "--force", "--sign", "-", "--entitlements", resolve("test/fixtures/bun-entitlements.plist"), buildFile], { stdout: "pipe", stderr: "pipe" });
      if (sign.exitCode !== 0) throw new Error(sign.stderr.toString());
    }
    await copyFile(buildFile, outfile);
    const childEnv: NodeJS.ProcessEnv = { ...process.env, PATH: root };
    for (const key of Object.keys(childEnv)) if (key !== "PATH" && key.toUpperCase() === "PATH") delete childEnv[key];
    const args = ["", "a b", 'quote"inside', "C:\\folder\\", "&|<>^%PATH%", "中文"];
    for (const argv of [args, ["update", ...args]]) {
      const child = Bun.spawn([outfile, ...argv], { cwd: root, env: childEnv,
        stdin: new TextEncoder().encode("stdin-data\n"), stdout: "pipe", stderr: "pipe" });
      const [code, out, err] = await Promise.all([child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()]);
      expect(code).toBe(23);
      expect(err).toBe("official-stderr\n");
      const value = JSON.parse(out);
      expect(value.args).toEqual(argv);
      expect(value.cwd).toBe(root);
      expect(value.stdin).toBe("stdin-data\n");
      expect(value.path).toBe(argv[0] === "update" ? dirname(process.execPath) + delimiter + root : root);
    }
    // A cross-compiled PE proves build/embedding, not execution on Windows.
    if (process.platform !== "win32") {
      const pe = join(root, "windows-omp.exe");
      const windows = Bun.spawnSync([process.execPath, "build", source, "--compile", "--target=bun-windows-x64", "--outfile", pe,
        "--no-compile-autoload-dotenv", "--no-compile-autoload-bunfig", "--no-compile-autoload-tsconfig", "--no-compile-autoload-package-json",
        "--define=OMP_WINDOWS_LAUNCHER_CONFIG=" + JSON.stringify(config)], { stdout: "pipe", stderr: "pipe" });
      if (windows.exitCode !== 0) throw new Error(windows.stderr.toString());
      const bytes = await readFile(pe);
      expect(bytes.subarray(0, 2).toString()).toBe("MZ");
      expect(bytes.includes(Buffer.from(WINDOWS_LAUNCHER_MARKER))).toBe(true);
    }
  } finally { await rm(root, { recursive: true, force: true }); await rm(buildRoot, { recursive: true, force: true }); }
}, 120_000);

const nativeTest = process.platform === "win32" ? test : test.skip;
nativeTest("native Windows installer lifecycle uses an isolated explicit PATH store, never the test account registry", async () => {
  const home = await mkdtemp(join(tmpdir(), "omp native 用户 ' "));
  try {
    const original = join(home, "original bin");
    await mkdir(original);
    const omp = join(original, "omp.exe");
    await copyFile(process.execPath, omp); // Real PE, no .cmd/script masquerading as an executable.
    const env: NodeJS.ProcessEnv = { ...process.env, HOME: home, USERPROFILE: home, LOCALAPPDATA: join(home, "Local App Data"), PATH: original };
    for (const key of Object.keys(env)) if (key !== "PATH" && key.toUpperCase() === "PATH") delete env[key];
    const childSource = `import {expect} from 'bun:test';
import {readFile,writeFile,mkdir,copyFile,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {manageWindowsLauncher,windowsInstallDirectory} from ${JSON.stringify(windowsModule)};
const root=windowsInstallDirectory(process.env),bin=join(root,'bin'),wrapper=join(bin,'omp.exe'),state=join(root,'state.json');
let path={value:'%TOOLS%;C:\\\\unrelated;;',kind:'ExpandString'};let writes=0,fail=false;
const store={read:async()=>({...path}),replace:async(before,after)=>{expect(path).toEqual(before);if(fail)throw Error('injected PATH failure');path={...after};writes++}};
const manage=(action,options={},check=false)=>manageWindowsLauncher(action,options,${JSON.stringify(installer)},check,store);
const options={omp:${JSON.stringify(omp)},bun:process.execPath};
await manage('install',options);let installed=await readFile(wrapper),saved=await readFile(state);expect(path.value).toBe(bin+';%TOOLS%;C:\\\\unrelated;;');expect(writes).toBe(1);
await manage('install');expect((await readFile(wrapper)).equals(installed)).toBe(true);expect((await readFile(state)).equals(saved)).toBe(true);expect(writes).toBe(1);
for(const field of ['bunVersion','launcherSourceHash']){const stale=JSON.parse(saved.toString());stale[field]=field==='bunVersion'?'outdated-runtime':'0'.repeat(64);await writeFile(state,JSON.stringify(stale));await manage('install');const refreshed=JSON.parse((await readFile(state)).toString());expect(refreshed[field]).not.toBe(stale[field]);installed=await readFile(wrapper);saved=await readFile(state)};
await expect(manage('install',{...options,omp:wrapper})).rejects.toThrow();
const copied=join(root,'copied.exe');await copyFile(wrapper,copied);await expect(manage('install',{...options,omp:copied})).rejects.toThrow('副本');await rm(copied);
const cmd=join(root,'omp.cmd');await writeFile(cmd,'@echo nope');await expect(manage('install',{...options,omp:cmd})).rejects.toThrow('.exe');await rm(cmd);
path.value+=';D:\\\\later';await manage('uninstall',{},true);expect((await readFile(state)).equals(saved)).toBe(true);expect(writes).toBe(1);
await writeFile(wrapper,'user-modified');for(const action of ['install','uninstall'])await expect(manage(action,options)).rejects.toThrow('修改');await expect(manage('uninstall',{},true)).rejects.toThrow('修改');expect(writes).toBe(1);await writeFile(wrapper,installed);
fail=true;await expect(manage('uninstall')).rejects.toThrow('PATH failure');expect((await readFile(wrapper)).equals(installed)).toBe(true);expect((await readFile(state)).equals(saved)).toBe(true);fail=false;
const keep=join(root,'keep.txt');await writeFile(keep,'keep');await manage('uninstall');expect(path.value).toBe('%TOOLS%;C:\\\\unrelated;;;D:\\\\later');expect(await Bun.file(wrapper).exists()).toBe(false);expect(await Bun.file(state).exists()).toBe(false);expect(await readFile(keep,'utf8')).toBe('keep');expect(await Bun.file(${JSON.stringify(omp)}).exists()).toBe(true);
await rm(keep);await rm(root,{recursive:true,force:true});
fail=true;await expect(manage('install',options)).rejects.toThrow('PATH failure');expect(await Bun.file(wrapper).exists()).toBe(false);expect(await Bun.file(state).exists()).toBe(false);fail=false;
path={value:bin,kind:'String'};await expect(manage('install',options)).rejects.toThrow('未受');
console.log('native Windows isolated lifecycle passed');`;
    const child = Bun.spawn([process.execPath, "-e", childSource], { env, cwd: resolve("."), stdout: "pipe", stderr: "pipe" });
    const [code, out, err] = await Promise.all([child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()]);
    if (code !== 0) throw new Error(out + err);
    expect(out).toContain("native Windows isolated lifecycle passed");
  } finally { await rm(home, { recursive: true, force: true }); }
}, 120_000);
