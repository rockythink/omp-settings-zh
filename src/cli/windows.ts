import { createHash, randomUUID } from "node:crypto";
import { copyFile, lstat, mkdir, readFile, realpath, rmdir, unlink, writeFile, mkdtemp, rm } from "node:fs/promises";
import { dirname, join, resolve, win32 } from "node:path";
import { tmpdir } from "node:os";
import type { LauncherInstallOptions } from "./install";

export const WINDOWS_LAUNCHER_MARKER = "omp-settings-zh managed Windows launcher v1";
export interface UserPath { value: string | null; kind: "String" | "ExpandString" }
export interface WindowsPathStore {
  read(): Promise<UserPath>;
  replace(before: UserPath, after: UserPath): Promise<void>;
}
interface WindowsState {
  version: 2;
  platform: "win32";
  omp: string;
  bun: string;
  main: string;
  wrapperHash: string;
  pathEntry: string;
  initialPathEmpty: boolean;
  launcherSourceHash: string;
  bunVersion: string;
  pending?: { id: string; file: string; next: WindowsState };
}
interface FileChange { path: string; before: Buffer | null; after: Buffer | null }

export function windowsHome(env: NodeJS.ProcessEnv): string {
  const home = env.USERPROFILE || env.HOME;
  if (!home || !win32.isAbsolute(home)) throw new Error("需要绝对路径 USERPROFILE 或 HOME 环境变量");
  return win32.normalize(home);
}
export function windowsInstallDirectory(env: NodeJS.ProcessEnv): string {
  const home = windowsHome(env);
  const base = env.LOCALAPPDATA || win32.join(home, "AppData", "Local");
  if (!win32.isAbsolute(base)) throw new Error("LOCALAPPDATA 必须为绝对路径");
  return win32.join(base, "omp-settings-zh");
}
function pathKey(path: string): string {
  return win32.normalize(path.trim().replace(/^"(.*)"$/, "$1")).replace(/[\\/]+$/, "").toLowerCase();
}
export function changeWindowsPath(value: string | null, entry: string, install: boolean): string | null {
  if (entry.includes(";") || /[\r\n\0]/.test(entry)) throw new Error("启动器目录不能包含 PATH 分隔符或控制字符");
  if (value === null) return install ? entry : null;
  const entries = value.split(";");
  const matches = entries.filter(item => pathKey(item) === pathKey(entry));
  if (matches.length > 1) throw new Error("受管 User PATH 条目重复，拒绝改动");
  if (install) {
    if (matches.length && pathKey(entries[0]!) === pathKey(entry)) return value;
    const unrelated = entries.filter(item => pathKey(item) !== pathKey(entry));
    return entry + (unrelated.length && value !== "" ? ";" + unrelated.join(";") : "");
  }
  if (!matches.length) return value;
  const unrelated = entries.filter(item => pathKey(item) !== pathKey(entry));
  return unrelated.length ? unrelated.join(";") : null;
}
function hash(bytes: Buffer): string { return createHash("sha256").update(bytes).digest("hex"); }
async function info(path: string) {
  try { return await lstat(path); }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return null; throw error; }
}
async function ownedFile(path: string): Promise<Buffer | null> {
  const value = await info(path);
  if (!value) return null;
  if (!value.isFile() || value.isSymbolicLink()) throw new Error(`拒绝覆盖非本插件普通文件：${path}`);
  return readFile(path);
}
async function directory(path: string): Promise<void> {
  const value = await info(path);
  if (value && (!value.isDirectory() || value.isSymbolicLink())) throw new Error(`拒绝使用重定向或非真实目录：${path}`);
}
function powershell(): string {
  if (!process.env.SystemRoot) throw new Error("需要 SystemRoot 定位系统 Windows PowerShell");
  return join(process.env.SystemRoot, "System32", "WindowsPowerShell", "v1.0", "powershell.exe");
}
function powershellArgs(script: string): string[] {
  return [powershell(), "-NoLogo", "-NoProfile", "-NonInteractive", "-EncodedCommand", Buffer.from(script, "utf16le").toString("base64")];
}
async function runPowerShell(script: string): Promise<string> {
  // Stream the trusted script instead of putting the entire PATH snapshot on the
  // Windows command line (whose limit is much smaller than two PATH values).
  const bootstrap = "[Console]::InputEncoding=[Text.UTF8Encoding]::new($false); & ([ScriptBlock]::Create([Console]::In.ReadToEnd()))";
  const input = "$ErrorActionPreference='Stop';[Console]::OutputEncoding=[Text.UTF8Encoding]::new($false);$OutputEncoding=[Console]::OutputEncoding;" + script;
  const child = Bun.spawn(powershellArgs(bootstrap), { stdin: new TextEncoder().encode(input), stdout: "pipe", stderr: "pipe" });
  const [code, out, err] = await Promise.all([child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()]);
  if (code !== 0) throw new Error(`User PATH 操作失败：${err.trim()}`);
  return out.trim();
}
const readRegistry = `$key=[Microsoft.Win32.Registry]::CurrentUser.OpenSubKey('Environment',$false);
$v=$null;$kind='String';if($key -and $key.GetValueNames() -contains 'Path') {
$v=$key.GetValue('Path',$null,[Microsoft.Win32.RegistryValueOptions]::DoNotExpandEnvironmentNames);$kind=$key.GetValueKind('Path').ToString()};`;
export function windowsUserPathStore(): WindowsPathStore {
  return {
    async read() { return JSON.parse(await runPowerShell(readRegistry + "@{value=$v;kind=$kind}|ConvertTo-Json -Compress")) as UserPath; },
    async replace(before, after) {
      const payload = Buffer.from(JSON.stringify({ before, after })).toString("base64");
      await runPowerShell(`$p=[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${payload}'))|ConvertFrom-Json;
& ([ScriptBlock]::Create([IO.File]::ReadAllText('${join(dirname(import.meta.path), "windows-native.ps1").replace(/'/g, "''")}'))) -Source 'using System; using System.Runtime.InteropServices; public static class OmpEnvironment { [DllImport("user32.dll", CharSet=CharSet.Unicode, SetLastError=true)] public static extern IntPtr SendMessageTimeout(IntPtr h, uint m, UIntPtr w, string l, uint f, uint t, out UIntPtr r); }';
$m=[Threading.Mutex]::new($false,'Local\\omp-settings-zh-UserPath-'+[Security.Principal.WindowsIdentity]::GetCurrent().User.Value);
$locked=$false;try {try{$locked=$m.WaitOne(30000)}catch [Threading.AbandonedMutexException]{$locked=$true};if(!$locked){throw 'User PATH lock timeout'};
${readRegistry}
if($v -cne $p.before.value -or $kind -cne $p.before.kind){throw 'User PATH changed concurrently; retry the operation'};
if($key){$key.Close()};$key=[Microsoft.Win32.Registry]::CurrentUser.CreateSubKey('Environment');
if($null -eq $p.after.value){$key.DeleteValue('Path',$false)}else{$key.SetValue('Path',[string]$p.after.value,[Microsoft.Win32.RegistryValueKind]$p.after.kind)};
$key.Close();
}finally{if($locked){$m.ReleaseMutex()};$m.Dispose()};
$r=[UIntPtr]::Zero;[void][OmpEnvironment]::SendMessageTimeout([IntPtr]0xffff,0x1a,[UIntPtr]::Zero,'Environment',2,5000,[ref]$r);`);
    },
  };
}
async function findExecutable(name: "omp" | "bun", explicit: string | undefined, wrapper: string, old: WindowsState | null): Promise<string> {
  const candidates = explicit ? [explicit] : [
    ...(old ? [...(old.pending ? [old.pending.next[name]] : []), old[name]] : []),
    ...(process.env.PATH ?? "").split(";").filter(Boolean).map(path => join(path.replace(/^"(.*)"$/, "$1"), name + ".exe")),
    ...(name === "bun" && /[\\/]bun(?:-debug)?\.exe$/i.test(process.execPath) ? [process.execPath] : []),
  ];
  const marker = Buffer.from(WINDOWS_LAUNCHER_MARKER);
  const boundary = Buffer.allocUnsafe(marker.length * 2);
  for (const candidate of candidates) {
    try {
      const path = resolve(candidate);
      if (!/\.exe$/i.test(path) || pathKey(path) === pathKey(wrapper)) throw new Error(`--${name} 必须指向原始 .exe，不能使用脚本或受管启动器`);
      const physical = await realpath(path);
      if (await info(wrapper) && pathKey(physical) === pathKey(await realpath(wrapper))) throw new Error("不能选择本插件启动器的链接");
      if (!(await lstat(physical)).isFile()) throw new Error(`不是可执行文件：${path}`);
      const file = Bun.file(path);
      const header = Buffer.from(await file.slice(0, 64).arrayBuffer());
      const peOffset = header.length >= 64 ? header.readUInt32LE(0x3c) : file.size;
      if (header[0] !== 0x4d || header[1] !== 0x5a || peOffset + 4 > file.size ||
        Buffer.from(await file.slice(peOffset, peOffset + 4).arrayBuffer()).readUInt32LE(0) !== 0x00004550) throw new Error(`不是 Windows PE 可执行文件：${path}`);
      // Inspect copied launchers without materializing another full Bun/OMP image.
      const reader = file.stream().getReader();
      let tailLength = 0;
      try {
        while (true) {
          const part = await reader.read();
          if (part.done) break;
          const chunk = Buffer.from(part.value.buffer, part.value.byteOffset, part.value.byteLength);
          const prefix = Math.min(marker.length - 1, chunk.length);
          chunk.copy(boundary, tailLength, 0, prefix);
          const combined = tailLength + prefix;
          if (chunk.includes(marker) || boundary.subarray(0, combined).includes(marker)) throw new Error("不能选择本插件启动器的副本");
          tailLength = Math.min(marker.length - 1, tailLength + chunk.length);
          if (chunk.length >= tailLength) chunk.copy(boundary, 0, chunk.length - tailLength);
          else boundary.copy(boundary, 0, combined - tailLength, combined);
        }
      } finally { await reader.cancel(); }
      return path;
    } catch (error) { if (explicit) throw error; }
  }
  throw new Error(`找不到原始 ${name}.exe；请指定 --${name} <路径>`);
}
async function compileLauncher(config: Pick<WindowsState, "bun" | "main" | "omp">): Promise<Buffer> {
  const temporary = await mkdtemp(join(tmpdir(), "omp-zh-build-"));
  try {
    const outfile = join(temporary, "omp.exe");
    // Bun 1.4.0 widens UTF-8 bytes instead of decoding them before CopyFileW
    // copies the compiler template. Keep that argument ASCII and relative;
    // the selected runtime, cwd and embedded launcher paths remain Unicode.
    let template = config.bun;
    if (process.platform === "win32" && /[^\x00-\x7f]/.test(template)) {
      template = "compiler.exe";
      await copyFile(config.bun, join(temporary, template));
    }
    const child = Bun.spawn([config.bun, "build", join(dirname(import.meta.path), "windows-launcher.ts"), "--compile", "--outfile", "omp.exe",
      "--compile-executable-path", template,
      "--no-compile-autoload-dotenv", "--no-compile-autoload-bunfig", "--no-compile-autoload-tsconfig", "--no-compile-autoload-package-json",
      "--define=OMP_WINDOWS_LAUNCHER_CONFIG=" + JSON.stringify(config)], { cwd: temporary, stdin: "ignore", stdout: "pipe", stderr: "pipe" });
    const [code, out, err] = await Promise.all([child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()]);
    if (code !== 0) throw new Error("编译 Windows 启动器失败：" + out + err);
    return await readFile(outfile);
  } finally { await rm(temporary, { recursive: true, force: true }); }
}
async function startOwnedWindowsHelper(script: string): Promise<void> {
  const bootstrap = "$r=[IO.StreamReader]::new([Console]::OpenStandardInput(),[Text.UTF8Encoding]::new($false));try{$s=$r.ReadToEnd()}finally{$r.Dispose()}; & ([ScriptBlock]::Create($s))";
  // Detached Windows PowerShell 5 exits before running its command. A detached
  // Bun owns the ordinary PowerShell child and stays alive until maintenance ends.
  const worker = "const script=await Bun.stdin.text();const child=Bun.spawn(" + JSON.stringify(powershellArgs(bootstrap)) +
    ",{stdin:new TextEncoder().encode(script),stdout:'pipe',stderr:'inherit'});for await(const bytes of child.stdout){process.stdout.write(bytes)}process.exit(await child.exited)";
  const child = Bun.spawn([process.execPath, "--no-env-file", "--no-compile-autoload-bunfig", "-e", worker], {
    detached: true, cwd: win32.parse(process.execPath).root, env: { ...process.env, BUN_OPTIONS: "" },
    stdin: new TextEncoder().encode(script), stdout: "pipe", stderr: "inherit",
  });
  const reader = child.stdout.getReader();
  const decoder = new TextDecoder();
  let timer: Timer | undefined;
  try {
    const ready = await Promise.race([(async () => {
      let line = "";
      while (!line.includes("\n")) { const chunk = await reader.read(); if (chunk.done) break; line += decoder.decode(chunk.value); }
      return line.trim();
    })(), new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("启动器维护进程未确认启动")), 10_000); })]);
    if (ready !== "READY" && ready !== "ACTIVE") throw new Error("启动器维护进程未确认所有权，已保留安装状态");
    child.unref();
  } catch (error) { child.kill(); throw error; }
  finally { if (timer) clearTimeout(timer); await reader.cancel(); }
}

// Windows PowerShell may inherit a newer shell's module search path. Use
// framework file hashing without changing that environment or hiding stderr.
const maintenanceFileHash = `function Get-OwnedFileHash([string]$path) {
$file=$null;$sha=$null;try {
$file=[IO.File]::OpenRead($path);$sha=[Security.Cryptography.SHA256]::Create();
return [BitConverter]::ToString($sha.ComputeHash($file)).Replace('-','');
}finally{if($sha){$sha.Dispose()};if($file){$file.Dispose()}}
};`;

async function queueRunningLauncherUpdate(wrapper: string, statePath: string, state: WindowsState, stateText: Buffer): Promise<void> {
  const pending = state.pending!;
  const payload = Buffer.from(JSON.stringify({ wrapper, statePath, oldHash: state.wrapperHash,
    stateHash: hash(stateText), stage: pending.file, stageHash: pending.next.wrapperHash,
    id: pending.id, pid: Number(process.env.OMP_SETTINGS_ZH_LAUNCHER_PID), nextState: Buffer.from(JSON.stringify(pending.next, null, 2) + "\n").toString("base64") })).toString("base64");
  await startOwnedWindowsHelper(`$ErrorActionPreference='Stop';
${maintenanceFileHash}
$p=[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${payload}'))|ConvertFrom-Json;
$owner=[Diagnostics.Process]::GetProcessById($p.pid);try {
if(![string]::Equals([IO.Path]::GetFullPath($owner.MainModule.FileName),[IO.Path]::GetFullPath($p.wrapper),[StringComparison]::OrdinalIgnoreCase)){throw 'Launcher PID does not own the managed executable'};
if((Get-OwnedFileHash $p.wrapper) -ine $p.oldHash -or (Get-OwnedFileHash $p.statePath) -ine $p.stateHash -or (Get-OwnedFileHash $p.stage) -ine $p.stageHash){throw 'Pending update ownership changed'};
$mutex=[Threading.Mutex]::new($false,'Local\\omp-settings-zh-refresh-'+$p.id);$held=$false;$stream=$null;
try {
try{$held=$mutex.WaitOne(0)}catch [Threading.AbandonedMutexException]{$held=$true};if(!$held){[Console]::WriteLine('ACTIVE');[Console]::Out.Flush();exit 0};
[Console]::WriteLine('READY');[Console]::Out.Flush();$owner.WaitForExit();
if(!([IO.File]::Exists($p.statePath) -or [IO.Directory]::Exists($p.statePath))){exit 0};
$current=[IO.File]::ReadAllText($p.statePath)|ConvertFrom-Json;if(!$current.pending -or $current.pending.id -cne $p.id){exit 0};
$stream=[IO.File]::Open($p.statePath,[IO.FileMode]::Open,[IO.FileAccess]::ReadWrite,[IO.FileShare]::None);
$oldBytes=[byte[]]::new($stream.Length);$offset=0;while($offset -lt $oldBytes.Length){$n=$stream.Read($oldBytes,$offset,$oldBytes.Length-$offset);if($n -eq 0){throw 'Unexpected end of installation state'};$offset+=$n};
$sha=[Security.Cryptography.SHA256]::Create();try{$actual=[BitConverter]::ToString($sha.ComputeHash($oldBytes)).Replace('-','')}finally{$sha.Dispose()};
if($actual -ine $p.stateHash -or (Get-OwnedFileHash $p.wrapper) -ine $p.oldHash -or (Get-OwnedFileHash $p.stage) -ine $p.stageHash){throw 'Pending update ownership changed'};
$backup=$p.stage+'.backup';if([IO.File]::Exists($backup) -or [IO.Directory]::Exists($backup)){throw 'Unowned update backup exists'};
$replaced=$false;
try {
[IO.File]::Replace($p.stage,$p.wrapper,$backup);$replaced=$true;
$next=[Convert]::FromBase64String($p.nextState);$stream.Position=0;$stream.SetLength(0);$stream.Write($next,0,$next.Length);$stream.Flush($true);
if((Get-OwnedFileHash $backup) -ine $p.oldHash){throw 'Backup ownership changed'};[IO.File]::Delete($backup);
}catch {
if($replaced){if((Get-OwnedFileHash $backup) -ine $p.oldHash -or (Get-OwnedFileHash $p.wrapper) -ine $p.stageHash){throw 'Update rollback ownership changed'};[IO.File]::Replace($backup,$p.wrapper,$p.stage);$stream.Position=0;$stream.SetLength(0);$stream.Write($oldBytes,0,$oldBytes.Length);$stream.Flush($true)};
throw;
};
$stream.Dispose();$stream=$null;
}finally{if($stream){$stream.Dispose()};if($held){$mutex.ReleaseMutex()};$mutex.Dispose()};
}finally{$owner.Dispose()};`);
}

function validWindowsState(state: WindowsState, bin: string): boolean {
  return Boolean(state && state.version === 2 && state.platform === "win32" && typeof state.omp === "string" && typeof state.bun === "string" &&
    typeof state.main === "string" && /^[a-f0-9]{64}$/.test(state.wrapperHash) && state.pathEntry === bin && typeof state.initialPathEmpty === "boolean" &&
    /^[a-f0-9]{64}$/.test(state.launcherSourceHash) && typeof state.bunVersion === "string");
}

async function deferRunningLauncherRemoval(path: string, bytes: Buffer, statePath: string, stateText: Buffer): Promise<boolean> {
  const pid = process.env.OMP_SETTINGS_ZH_LAUNCHER_PID;
  if (process.env.OMP_SETTINGS_ZH_LAUNCHER_MARKER !== WINDOWS_LAUNCHER_MARKER || !pid || !/^\d+$/.test(pid) || Number(pid) === process.pid) return false;
  const payload = Buffer.from(JSON.stringify({ path, digest: hash(bytes), statePath, stateDigest: hash(stateText), pid: Number(pid) })).toString("base64");
  // The helper owns only the verified executable. It waits for the parent trampoline,
  // not this Bun process; it never removes a replacement file or a directory.
  const script = `$ErrorActionPreference='Stop';${maintenanceFileHash}
$p=[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${payload}'))|ConvertFrom-Json;
$owner=[Diagnostics.Process]::GetProcessById($p.pid);try {
if(![string]::Equals([IO.Path]::GetFullPath($owner.MainModule.FileName),[IO.Path]::GetFullPath($p.path),[StringComparison]::OrdinalIgnoreCase)){throw 'Launcher PID does not own the managed executable'};
if((Get-OwnedFileHash $p.path) -ine $p.digest){throw 'Launcher ownership changed'};
if((Get-OwnedFileHash $p.statePath) -ine $p.stateDigest){throw 'Installation ownership changed'};
[Console]::WriteLine('READY');[Console]::Out.Flush();
$owner.WaitForExit();
if((Get-OwnedFileHash $p.statePath) -ine $p.stateDigest){throw 'Installation ownership changed'};
if([IO.File]::Exists($p.path) -or [IO.Directory]::Exists($p.path)){if((Get-OwnedFileHash $p.path) -ine $p.digest){throw 'Launcher ownership changed'};[IO.File]::Delete($p.path)};
[IO.File]::Delete($p.statePath);
foreach($d in @([IO.Path]::GetDirectoryName($p.path),[IO.Path]::GetDirectoryName($p.statePath))){if([IO.Directory]::Exists($d)){$entries=[IO.Directory]::EnumerateFileSystemEntries($d).GetEnumerator();try{$empty=!$entries.MoveNext()}finally{$entries.Dispose()};if($empty){[IO.Directory]::Delete($d)}}};
}finally{$owner.Dispose()};`;
  await startOwnedWindowsHelper(script);
  return true;
}

/** Same lifecycle as POSIX; the explicit store parameter isolates tests from HKCU. */
export async function manageWindowsLauncher(command: "install" | "uninstall", options: LauncherInstallOptions, entry: string,
  checkOnly = false, store: WindowsPathStore = windowsUserPathStore()): Promise<string> {
  const home = windowsHome(process.env);
  const root = windowsInstallDirectory(process.env);
  const bin = join(root, "bin");
  const wrapper = join(bin, "omp.exe");
  const statePath = join(root, "state.json");
  await directory(root); await directory(bin);
  const rootExisted = Boolean(await info(root));
  const binExisted = Boolean(await info(bin));
  const oldText = await ownedFile(statePath);
  const old = oldText ? JSON.parse(oldText.toString()) as WindowsState : null;
  if (oldText && !validWindowsState(old!, bin)) throw new Error("不支持或损坏的 Windows 安装状态");
  let previousStage: Buffer | null = null;
  if (old?.pending) {
    const pending = old.pending;
    if (!/^[a-f0-9-]{36}$/.test(pending.id) || pending.file !== join(root, "pending-" + pending.id + ".exe") ||
      !validWindowsState(pending.next, bin) || pending.next.pending) throw new Error("不支持或损坏的待更新安装状态");
    previousStage = await ownedFile(pending.file);
    if (!previousStage || hash(previousStage) !== pending.next.wrapperHash) throw new Error("待更新启动器已修改或丢失，拒绝改动");
  }
  const previous = await ownedFile(wrapper);
  if (previous && (!old || hash(previous) !== old.wrapperHash)) throw new Error(`启动器不是本插件文件或已被修改，拒绝覆盖：${wrapper}`);
  if (command === "uninstall" && !old) return "未安装 PATH 启动器。";
  const beforePath = await store.read();
  if (!["String", "ExpandString"].includes(beforePath.kind) || (beforePath.value !== null && typeof beforePath.value !== "string")) throw new Error("不支持的 User PATH 注册表值");
  if (!old && beforePath.value?.split(";").some(item => pathKey(item) === pathKey(bin))) throw new Error("发现未受本安装状态管理的 User PATH 条目");
  const afterPath = { ...beforePath, value: changeWindowsPath(beforePath.value, bin, command === "install") };
  if (command === "uninstall" && afterPath.value === null && old?.initialPathEmpty) afterPath.value = "";
  if (checkOnly) return "卸载预检通过。";
  const changes: FileChange[] = [];
  let selectedOfficial = old?.omp;
  let queuedState: WindowsState | undefined;
  let queuedText: Buffer | undefined;
  let removalStateText = oldText;
  if (command === "install") {
    const logical = join(home, ".omp", "plugins", "node_modules", "omp-settings-zh", "src", "cli", "install.ts");
    if (await info(logical) && pathKey(await realpath(logical)) === pathKey(await realpath(entry))) entry = logical;
    const config = { omp: await findExecutable("omp", options.omp, wrapper, old), bun: await findExecutable("bun", options.bun, wrapper, old), main: join(dirname(entry), "main.ts") };
    selectedOfficial = config.omp;
    const launcherSourceHash = hash(await readFile(join(dirname(import.meta.path), "windows-launcher.ts")));
    const runtime = Bun.spawn([config.bun, "--version"], { stdin: "ignore", stdout: "pipe", stderr: "pipe" });
    const [runtimeCode, version, runtimeError] = await Promise.all([runtime.exited, new Response(runtime.stdout).text(), new Response(runtime.stderr).text()]);
    if (runtimeCode !== 0 || !version.trim()) throw new Error("无法读取 Bun 版本：" + runtimeError);
    const bunVersion = version.trim();
    const unchanged = old && previous && old.omp === config.omp && old.bun === config.bun && old.main === config.main &&
      old.launcherSourceHash === launcherSourceHash && old.bunVersion === bunVersion;
    const pending = old?.pending;
    const pendingMatches = pending && pending.next.omp === config.omp && pending.next.bun === config.bun && pending.next.main === config.main &&
      pending.next.launcherSourceHash === launcherSourceHash && pending.next.bunVersion === bunVersion;
    const next = unchanged ? previous : pendingMatches ? previousStage! : await compileLauncher(config);
    const state: WindowsState = { version: 2, platform: "win32", ...config, wrapperHash: hash(next), pathEntry: bin, initialPathEmpty: old?.initialPathEmpty ?? beforePath.value === "", launcherSourceHash, bunVersion };
    const parent = process.env.OMP_SETTINGS_ZH_LAUNCHER_PID;
    if (!unchanged && old && previous && process.env.OMP_SETTINGS_ZH_LAUNCHER_MARKER === WINDOWS_LAUNCHER_MARKER && parent && /^\d+$/.test(parent) && Number(parent) !== process.pid) {
      const id = pendingMatches ? pending.id : randomUUID();
      const file = join(root, "pending-" + id + ".exe");
      queuedState = { ...old, pending: { id, file, next: state } };
      if (!pendingMatches) changes.push({ path: file, before: null, after: next });
      queuedText = Buffer.from(JSON.stringify(queuedState, null, 2) + "\n");
      if (!oldText?.equals(queuedText)) changes.push({ path: statePath, before: oldText, after: queuedText });
    } else {
      if (!unchanged) changes.push({ path: wrapper, before: previous, after: next });
      const nextState = Buffer.from(JSON.stringify(state, null, 2) + "\n");
      if (!oldText?.equals(nextState)) changes.push({ path: statePath, before: oldText, after: nextState });
    }
    if (pending && (!queuedState || queuedState.pending!.file !== pending.file)) changes.push({ path: pending.file, before: previousStage, after: null });
    await mkdir(bin, { recursive: true });
  } else {
    if (old?.pending) {
      const { pending: cancelled, ...activeState } = old;
      removalStateText = Buffer.from(JSON.stringify(activeState, null, 2) + "\n");
      changes.push({ path: statePath, before: oldText, after: removalStateText });
      changes.push({ path: cancelled.file, before: previousStage, after: null });
    }
    if (previous) changes.push({ path: wrapper, before: previous, after: null });
    changes.push({ path: statePath, before: removalStateText, after: null });
  }
  const applied: FileChange[] = [];
  let pathWritten = false;
  let deferred = false;
  let queueCommitted = false;
  try {
    // PATH first on removal, last on install. A failure restores only our snapshot,
    // with a compare-and-swap so later unrelated edits are never overwritten.
    if (command === "uninstall" && beforePath.value !== afterPath.value) { await store.replace(beforePath, afterPath); pathWritten = true; }
    for (const change of changes) {
      applied.push(change);
      if (change.after) await writeFile(change.path, change.after);
      else {
        if (deferred && change.path === statePath) continue;
        try { await unlink(change.path); }
        catch (error) {
          if (change.path !== wrapper || !change.before || !["EPERM", "EBUSY", "EACCES"].includes((error as NodeJS.ErrnoException).code ?? "")) throw error;
          // Start the deferred helper only after all other fallible writes complete.
          deferred = true;
        }
      }
    }
    if (command === "install" && beforePath.value !== afterPath.value) { await store.replace(beforePath, afterPath); pathWritten = true; }
    if (deferred && !(await deferRunningLauncherRemoval(wrapper, previous!, statePath, removalStateText!))) throw new Error("启动器正被其它进程使用；请关闭该进程后重试卸载");
    if (queuedState) { queueCommitted = true; await queueRunningLauncherUpdate(wrapper, statePath, queuedState, queuedText!); }
  } catch (error) {
    if (queueCommitted) throw error; // Keep the verified stage/state so a later call can retry without recompiling.
    const failures: string[] = [];
    for (const change of applied.reverse()) {
      if (deferred && change.path === wrapper) continue;
      try { if (change.before) await writeFile(change.path, change.before); else if (await info(change.path)) await unlink(change.path); }
      catch (rollback) { failures.push(String(rollback)); }
    }
    if (pathWritten) { try { await store.replace(afterPath, beforePath); } catch (rollback) { failures.push(String(rollback)); } }
    if (command === "install") for (const [path, existed] of [[bin, binExisted], [root, rootExisted]] as const) {
      if (existed) continue;
      try { await rmdir(path); } catch (rollback) { if ((rollback as NodeJS.ErrnoException).code !== "ENOENT") failures.push(String(rollback)); }
    }
    if (failures.length) throw new Error(`${String(error)}；回滚失败：${failures.join("；")}`);
    throw error;
  }
  if (command === "uninstall") {
    for (const path of [bin, root]) {
      try { await rmdir(path); }
      catch (error) { if (!["ENOTEMPTY", "ENOENT", "EEXIST"].includes((error as NodeJS.ErrnoException).code ?? "")) throw error; }
    }
    return "已卸载 User PATH 启动器；请重新打开终端。原始 OMP 未改动。" + (deferred ? "运行中的 omp.exe 将在本次命令退出后删除。" : "");
  }
  return queuedState ? `已排队更新：${wrapper}\n本次命令继续使用原薄启动器；当前父进程退出后切换至 Bun：${queuedState.pending!.next.bun}\n目标入口：${queuedState.pending!.next.main}\nUser PATH 已保持，机器级 PATH 未改动。` :
    `已安装：${wrapper}\n原始 OMP：${selectedOfficial}\n已更新 User PATH，请重新打开终端（机器级 PATH 未改动）。`;
}
