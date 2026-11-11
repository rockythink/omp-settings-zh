import { access, chmod, lstat, mkdir, readFile, realpath, rmdir, stat, unlink, writeFile } from "node:fs/promises";
import { constants, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { userInfo } from "node:os";

const BEGIN = "# >>> omp-settings-zh PATH >>>";
const END = "# <<< omp-settings-zh PATH <<<";
const WRAPPER = "# omp-settings-zh managed launcher v1";

interface ConfigBlock {
  path: string;
  insertion: string;
  created: boolean;
}
interface InstallState {
  version: 1;
  omp: string;
  bun: string;
  main: string;
  configs: ConfigBlock[];
  writtenWrapper: string;
}
interface Change {
  path: string;
  before: string | null;
  after: string | null;
  mode?: number;
}
export interface LauncherInstallOptions {
  omp?: string;
  bun?: string;
}

/** First line of the install status when an official update had replaced the launcher. */
export const LAUNCHER_RECOVERED = "已恢复被官方更新替换的 PATH 启动器";

/** The managed launcher directory; it holds only `omp`. */
export function launcherBinDirectory(home: string): string {
  return join(resolve(home), ".local", "share", "omp-settings-zh", "bin");
}

function identity(path: string): string | null {
  try { const info = statSync(path); return `${info.dev}:${info.ino}`; }
  catch { return null; }
}

/**
 * PATH without the launcher directory, so official updates resolve the real OMP.
 * Entries are matched by the `omp` they provide, so `//`, trailing-slash and symlinked forms also go.
 */
export function withoutLauncherPath(path: string, bin: string): string {
  const launcher = identity(join(bin, "omp"));
  return path.split(":").filter(entry =>
    !(entry && resolve(entry) === bin) && (launcher === null || identity(join(entry || ".", "omp")) !== launcher),
  ).join(":");
}

/** Idempotent lifecycle entry; returns user-facing status without writing stdout. */
export function installLauncher(options: LauncherInstallOptions = {}): Promise<string> {
  return manageLauncher("install", options);
}

/** Removes only unmodified owned files/blocks; absent installation is harmless. */
export function uninstallLauncher(): Promise<string> {
  return manageLauncher("uninstall", {});
}

/** Refuse destructive plugin removal before it can strand modified managed files. */
export async function checkLauncherUninstall(): Promise<void> {
  await manageLauncher("uninstall", {}, true);
}


function quote(value: string): string {
  return `'${value.replaceAll("'", "'\\''")}'`;
}

function launcher(state: InstallState, binDirectory: string): string {
  const official = `exec ${quote(state.omp)} "$@"`;
  const wrapper = quote(join(binDirectory, "omp"));
  return `#!/bin/sh
${WRAPPER}
if [ "\${1-}" = plugin ] && [ "\${2-}" = uninstall ]; then
  skip_value=no
  for arg do
    if [ "$skip_value" = yes ]; then skip_value=no; continue; fi
    case "$arg" in
      --scope|--enable|--disable|--set) skip_value=yes; continue ;;
    esac
    if [ "$arg" = omp-settings-zh ]; then
      exec ${quote(state.bun)} ${quote(state.main)} ${quote(state.omp)} "$@"
    fi
  done
fi
omp_settings_zh_direct() {
  # Official updates, including the background update.auto worker, replace PATH's
  # first omp; drop this launcher's directory so they target the official binary.
  if [ -n "\${PATH+x}" ]; then
    omp_settings_zh_rest=$PATH
    PATH=
    omp_settings_zh_first=yes
    while :; do
      case $omp_settings_zh_rest in
        *:*) omp_settings_zh_entry=\${omp_settings_zh_rest%%:*}; omp_settings_zh_rest=\${omp_settings_zh_rest#*:}; omp_settings_zh_more=yes ;;
        *) omp_settings_zh_entry=$omp_settings_zh_rest; omp_settings_zh_more=no ;;
      esac
      if [ ! "$omp_settings_zh_entry/omp" -ef ${wrapper} ]; then
        if [ "$omp_settings_zh_first" = yes ]; then PATH=$omp_settings_zh_entry; omp_settings_zh_first=no
        else PATH=$PATH:$omp_settings_zh_entry; fi
      fi
      [ "$omp_settings_zh_more" = yes ] || break
    done
    export PATH
  fi
  if [ "\${1-}" = update ]; then
    # Explicit update must reach the recorded official binary even if its directory is not on PATH.
    export PATH=${quote(dirname(state.omp))}:"$PATH"
  fi
  ${official}
}
if [ "\${1-}" != stats ]; then
  omp_settings_zh_direct "$@"
fi
for arg do
  case "$arg" in
    --json|--json=*|--summary|--summary=*|--help|--help=*) omp_settings_zh_direct "$@" ;;
    --*) ;;
    -*[jsh]*) omp_settings_zh_direct "$@" ;;
  esac
done
exec ${quote(state.bun)} ${quote(state.main)} ${quote(state.omp)} "$@"
`;
}

async function readOptional(path: string): Promise<string | null> {
  try { return await readFile(path, "utf8"); }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

async function metadata(path: string) {
  try { return await lstat(path); }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

async function privateDirectory(path: string): Promise<void> {
  const info = await metadata(path);
  if (info && (!info.isDirectory() || info.isSymbolicLink() || (process.getuid && info.uid !== process.getuid()))) {
    throw new Error(`拒绝使用非当前用户的真实目录：${path}`);
  }
  if (info && (info.mode & 0o077) !== 0) throw new Error(`安装目录必须为私有权限（700）：${path}`);
}

async function ownedFile(path: string): Promise<string | null> {
  const info = await metadata(path);
  if (!info) return null;
  if (!info.isFile() || info.isSymbolicLink() || (process.getuid && info.uid !== process.getuid())) {
    throw new Error(`拒绝覆盖非本插件普通文件：${path}`);
  }
  return readFile(path, "utf8");
}

/** A native executable the official updater wrote over the launcher, which it found first on PATH. */
async function displacedExecutable(path: string): Promise<boolean> {
  const info = await metadata(path);
  if (!info || !info.isFile() || info.isSymbolicLink() || info.size < 65536 ||
      (process.getuid && info.uid !== process.getuid())) return false;
  const head = new Uint8Array(await Bun.file(path).slice(0, 4).arrayBuffer());
  if (head.length < 4) return false;
  const magic = new DataView(head.buffer).getUint32(0, false);
  // ELF, Mach-O 32/64 in either byte order, and universal Mach-O.
  return [0x7f454c46, 0xfeedface, 0xfeedfacf, 0xcefaedfe, 0xcffaedfe, 0xcafebabe].includes(magic);
}

async function executable(path: string): Promise<string> {
  const absolute = resolve(path);
  await access(absolute, constants.X_OK);
  if (!(await stat(absolute)).isFile()) throw new Error(`不是可执行文件：${absolute}`);
  return absolute;
}

async function findExecutable(name: string, explicit: string | undefined, wrapper: string, old: InstallState | null): Promise<string> {
  const candidates = explicit ? [explicit] : [
    ...(old ? [name === "omp" ? old.omp : old.bun] : []),
    ...(process.env.PATH ?? "").split(":").map(directory => join(directory || ".", name)),
    ...(name === "bun" && (process.execPath.endsWith("/bun") || process.execPath.endsWith("/bun-debug")) ? [process.execPath] : []),
  ];
  for (const candidate of candidates) {
    try {
      const path = await executable(candidate);
      if (resolve(path) === wrapper) {
        if (explicit) throw new Error("--omp 不能指向本插件启动器");
        continue;
      }
      const physical = await realpath(path);
      if (await metadata(wrapper) && physical === await realpath(wrapper)) {
        if (explicit) throw new Error("不能选择本插件启动器的符号链接");
        continue;
      }
      // A copied managed launcher is also not an official OMP executable.
      if (name === "omp") {
        const file = Bun.file(path);
        if (file.size < 65536 && (await file.text()).includes(WRAPPER)) {
          if (explicit) throw new Error("--omp 不能指向本插件启动器");
          continue;
        }
      }
      return path;
    } catch (error) {
      if (explicit) throw error;
    }
  }
  throw new Error(`找不到原始 ${name} 可执行文件；请指定 --${name} <路径>`);
}

async function loadState(path: string): Promise<InstallState | null> {
  const text = await ownedFile(path);
  if (text === null) return null;
  const state = JSON.parse(text) as InstallState;
  if (state.version !== 1 || typeof state.omp !== "string" || typeof state.bun !== "string" ||
      typeof state.main !== "string" || typeof state.writtenWrapper !== "string" || !Array.isArray(state.configs) ||
      state.configs.some(config => typeof config.path !== "string" || typeof config.insertion !== "string" ||
        typeof config.created !== "boolean" || !config.insertion.includes(BEGIN) || !config.insertion.includes(END))) {
    throw new Error(`不支持或损坏的安装状态：${path}`);
  }
  return state;
}

function locateBlock(content: string, config: ConfigBlock): number {
  const index = content.indexOf(config.insertion);
  if (index < 0 || content.indexOf(config.insertion, index + 1) >= 0 ||
      content.indexOf(BEGIN) !== index + config.insertion.indexOf(BEGIN) ||
      content.indexOf(END) !== index + config.insertion.indexOf(END) ||
      content.indexOf(BEGIN, content.indexOf(BEGIN) + BEGIN.length) >= 0 ||
      content.indexOf(END, content.indexOf(END) + END.length) >= 0) {
    throw new Error(`受管 PATH 块已修改或重复，未改动该文件：${config.path}`);
  }
  return index;
}

async function accountShell(): Promise<string> {
  if (process.env.SHELL) return process.env.SHELL;
  const account = userInfo();
  if (account.shell && account.shell !== "unknown") return account.shell;
  // Bun can omit account names with USER/LOGNAME absent; resolve the real UID.
  let username = account.username;
  if (process.platform === "darwin" && (!username || username === "unknown")) {
    const identity = Bun.spawn(["/usr/bin/id", "-nu", String(account.uid)], { stdin: "ignore", stdout: "pipe", stderr: "pipe" });
    const [code, stdout, stderr] = await Promise.all([identity.exited, new Response(identity.stdout).text(), new Response(identity.stderr).text()]);
    if (code !== 0 || !stdout.trim()) throw new Error("无法读取账户名称：" + stderr.trim());
    username = stdout.trim();
  }
  const command = process.platform === "darwin"
    ? ["/usr/bin/dscl", ".", "-read", "/Users/" + username, "UserShell"]
    : ["getent", "passwd", String(account.uid)];
  const child = Bun.spawn(command, { stdin: "ignore", stdout: "pipe", stderr: "pipe" });
  const [code, stdout, stderr] = await Promise.all([child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()]);
  if (code !== 0) throw new Error(`无法读取账户登录 shell：${stderr.trim()}`);
  const shell = process.platform === "darwin" ? stdout.match(/^UserShell:\s*(\S+)/m)?.[1] : stdout.trim().split(":").at(-1);
  if (!shell) throw new Error("账户没有可识别的登录 shell");
  return shell;
}

async function configPaths(home: string): Promise<string[]> {
  const shell = (await accountShell()).split("/").pop();
  if (shell === "zsh") {
    const zdot = resolve(process.env.ZDOTDIR || home);
    return [join(zdot, ".zprofile"), join(zdot, ".zshrc")];
  }
  if (shell !== "bash") throw new Error("仅支持 zsh 或 Bash；请设置 SHELL 为对应 shell 可执行路径");
  let login = join(home, ".profile");
  for (const name of [".bash_profile", ".bash_login", ".profile"]) {
    const path = join(home, name);
    if (await metadata(path)) { login = path; break; }
  }
  return [join(home, ".bashrc"), login];
}

async function apply(changes: Change[]): Promise<void> {
  const applied: Change[] = [];
  try {
    for (const change of changes) {
      applied.push(change);
      if (change.after === null) await unlink(change.path);
      else {
        await writeFile(change.path, change.after, change.mode === undefined ? undefined : { mode: change.mode });
        if (change.mode !== undefined) await chmod(change.path, change.mode);
      }
    }
  } catch (error) {
    const failures: string[] = [];
    for (const change of applied.reverse()) {
      try {
        if (change.before === null) { if (await metadata(change.path)) await unlink(change.path); }
        else {
          await writeFile(change.path, change.before);
          if (change.mode !== undefined) await chmod(change.path, change.mode);
        }
      } catch (rollback) { failures.push(`${change.path}: ${String(rollback)}`); }
    }
    if (failures.length) throw new Error(`${String(error)}；回滚失败：${failures.join("；")}`);
    throw error;
  }
}

async function manageLauncher(command: "install" | "uninstall", options: LauncherInstallOptions, checkOnly = false): Promise<string> {
  if (!process.env.HOME) throw new Error("需要 HOME 环境变量");
  const home = resolve(process.env.HOME);
  const bin = launcherBinDirectory(home);
  const directory = dirname(bin);
  const wrapper = join(bin, "omp");
  const statePath = join(directory, "state.json");
  await privateDirectory(directory);
  await privateDirectory(bin);
  const old = await loadState(statePath);
  // Only a launcher this state recorded can have been displaced; a fresh install never removes a binary.
  const displaced = old !== null && await displacedExecutable(wrapper);
  const previousWrapper = displaced ? null : await ownedFile(wrapper);
  if (previousWrapper !== null && (!old || previousWrapper !== old.writtenWrapper)) {
    throw new Error(`启动器不是本插件文件或已被修改，拒绝覆盖：${wrapper}`);
  }
  if (command === "uninstall" && !old) return "未安装 PATH 启动器。";
  const configs: ConfigBlock[] = [];
  const changes: Change[] = [];
  const targets = command === "install" ? await configPaths(home) : [];
  for (const config of old?.configs ?? []) {
    const content = await readOptional(config.path);
    if (content === null) continue;
    const index = locateBlock(content, config);
    if (command === "install") configs.push(config);
    else {
      const suffix = content.slice(index + config.insertion.length);
      // Keep a line separator if user content was appended after our block.
      const after = content.slice(0, index) + (suffix && config.insertion.startsWith("\n") ? "\n" : "") + suffix;
      const mode = (await stat(config.path)).mode & 0o777;
      changes.push({ path: config.path, before: content, after: config.created && !after ? null : after, mode });
    }
  }
  if (command === "uninstall") {
    if (previousWrapper !== null) changes.push({ path: wrapper, before: previousWrapper, after: null, mode: 0o755 });
    else if (displaced) changes.push({ path: wrapper, before: null, after: null });
    changes.push({ path: statePath, before: await readFile(statePath, "utf8"), after: null, mode: 0o600 });
    if (checkOnly) return "卸载预检通过。";
    await apply(changes);
    // Empty owned directories only; never remove unrelated files.
    for (const path of [bin, directory]) {
      try { await rmdir(path); }
      catch (error) { if (!["ENOTEMPTY", "ENOENT", "EEXIST"].includes((error as NodeJS.ErrnoException).code ?? "")) throw error; }
    }
    return "已卸载 PATH 启动器；请重新打开终端。原始 OMP 未改动。";
  }
  const { getPluginsNodeModules } = await import("@oh-my-pi/pi-utils");
  const installedEntry = join(getPluginsNodeModules(), "omp-settings-zh/src/cli/install.ts");
  let entry = import.meta.path;
  // Recover the active Profile/XDG package link, not a versioned Bun-cache target.
  if (await metadata(installedEntry) && await realpath(installedEntry) === await realpath(entry)) entry = installedEntry;
  const state: InstallState = {
    version: 1,
    omp: await findExecutable("omp", options.omp, wrapper, old),
    bun: await findExecutable("bun", options.bun, wrapper, old),
    main: join(dirname(entry), "main.ts"),
    configs,
    writtenWrapper: "",
  };
  for (const path of targets) {
    if (configs.some(config => config.path === path)) continue;
    const content = await readOptional(path);
    if (content?.includes(BEGIN) || content?.includes(END)) throw new Error(`发现未受本安装状态管理的 PATH 块：${path}`);
    // Prepend even if already later in PATH (e.g. macOS path_helper).
    const insertion = (content && !content.endsWith("\n") ? "\n" : "") +
      `${BEGIN}\ncase "$PATH" in\n  ${quote(bin)}:*) ;;\n  *) export PATH=${quote(bin)}:"$PATH" ;;\nesac\n${END}\n`;
    configs.push({ path, insertion, created: content === null });
    changes.push({ path, before: content, after: (content ?? "") + insertion });
  }
  // All ownership/block checks finish before any write.
  await mkdir(bin, { recursive: true, mode: 0o700 });
  await chmod(directory, 0o700);
  for (const path of targets) await mkdir(dirname(path), { recursive: true });
  const nextWrapper = launcher(state, bin);
  state.writtenWrapper = nextWrapper;
  if (previousWrapper !== nextWrapper) changes.unshift({ path: wrapper, before: previousWrapper, after: nextWrapper, mode: 0o755 });
  // Unlink first: rewriting the displaced binary in place could corrupt a running omp.
  if (displaced) changes.unshift({ path: wrapper, before: null, after: null });
  const oldText = await readOptional(statePath);
  const newText = JSON.stringify(state, null, 2) + "\n";
  if (oldText !== newText) changes.push({ path: statePath, before: oldText, after: newText, mode: 0o600 });
  await apply(changes);
  const status = `已安装：${wrapper}\n原始 OMP：${state.omp}\n请重新打开终端，或在当前终端执行：export PATH=${quote(bin)}:"$PATH"`;
  return displaced ? `${LAUNCHER_RECOVERED}；被替换的二进制已移除，原始 OMP 保持不变。\n${status}` : status;
}

async function run(args: string[]): Promise<void> {
  const [command, ...flags] = args;
  if (command === "--help" || command === "-h" || flags.includes("--help") || flags.includes("-h")) {
    console.log("用法：bun <包路径>/src/cli/install.ts install [--omp <原始OMP>] [--bun <Bun>]\n      bun <包路径>/src/cli/install.ts uninstall");
    return;
  }
  if (command !== "install" && command !== "uninstall") throw new Error("请指定 install 或 uninstall（--help 查看用法）");
  const options: LauncherInstallOptions = {};
  for (let index = 0; index < flags.length; index++) {
    const flag = flags[index];
    if (command !== "install" || (flag !== "--omp" && flag !== "--bun") || !flags[index + 1] || flags[index + 1]!.startsWith("--")) {
      throw new Error(`无效参数：${flag}`);
    }
    options[flag.slice(2) as "omp" | "bun"] = flags[++index]!;
  }
  console.log(await (command === "install" ? installLauncher(options) : uninstallLauncher()));
}

if (import.meta.main) {
  try { await run(Bun.argv.slice(2)); }
  catch (error) { console.error(`omp-settings-zh: ${error instanceof Error ? error.message : String(error)}`); process.exitCode = 1; }
}
