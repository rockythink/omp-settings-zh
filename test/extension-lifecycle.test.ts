import { expect, mock, test } from "bun:test";
import { getHostMetadata } from "../src/host-adapter";
import { copyFile, mkdtemp, mkdir, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import type { UserPath, WindowsPathStore } from "../src/cli/windows";
import type { LauncherInstallOptions } from "../src/cli/install";

type Context = {
  agent: { kind: "main" | "sub" };
  ui: { notify: (message: string) => void; select: () => Promise<undefined>; addAutocompleteProvider: () => void };
};
type Handler = (event: unknown, context: Context) => void | Promise<void>;
type Command = (args: string, context: Context) => void | Promise<void>;

if (process.env.OMP_SETTINGS_ZH_LIFECYCLE_CHILD !== "1") {
  test("settings lifecycle runs without touching the real HOME", async () => {
    const home = await mkdtemp(join(tmpdir(), "omp-settings-lifecycle-"));
    try {
      const bin = join(home, "bin");
      await mkdir(bin);
      // Settings assertions never invoke CLI Stats; isolate its installation boundary.
      if (process.platform === "win32") await copyFile(process.execPath, join(bin, "omp.exe"));
      else await symlink("/usr/bin/true", join(bin, "omp"));
      const env: NodeJS.ProcessEnv = { ...process.env, HOME: home, USERPROFILE: home, LOCALAPPDATA: join(home, "AppData", "Local"),
        ZDOTDIR: home, SHELL: "/bin/bash", PATH: bin + delimiter + (process.env.PATH ?? ""), OMP_SETTINGS_ZH_LIFECYCLE_CHILD: "1" };
      for (const key of Object.keys(env)) if (key !== "PATH" && key.toUpperCase() === "PATH") delete env[key];
      const child = Bun.spawn([process.execPath, "test", import.meta.path], {
        env,
        stdout: "pipe", stderr: "pipe",
      });
      const [code, stdout, stderr] = await Promise.all([child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()]);
      if (code !== 0) throw new Error(stdout + stderr);
      expect(code).toBe(0);
    } finally { await rm(home, { recursive: true, force: true }); }
  }, 30_000);
} else test("child shutdown cannot undo main localization; overlapping language commands leave no ghost translation", async () => {
  if (process.platform === "win32") {
    // Keep the real Windows file/launcher lifecycle; isolate only persistent HKCU PATH.
    const windows = await import("../src/cli/windows");
    const manageWindowsLauncher = windows.manageWindowsLauncher;
    let path: UserPath = { value: null, kind: "String" };
    const store: WindowsPathStore = {
      async read() { return { ...path }; },
      async replace(before, after) {
        if (!Bun.deepEquals(path, before)) throw new Error("PATH changed concurrently");
        path = { ...after };
      },
    };
    mock.module("../src/cli/windows", () => ({
      ...windows,
      manageWindowsLauncher: (command: "install" | "uninstall", options: LauncherInstallOptions, entry: string, checkOnly = false) =>
        manageWindowsLauncher(command, options, entry, checkOnly, store),
    }));
  }
  const { default: extension } = await import("../src/index");
  const host = await getHostMetadata();
  const ui = host.schema.autoResume!.ui!;
  const before = Object.getOwnPropertyDescriptors(ui);
  const events = new Map<string, Handler>();
  const commands = new Map<string, Command>();
  await extension({
    on: (name: string, handler: Handler) => events.set(name, handler),
    registerCommand: (name: string, options: { handler: Command }) => commands.set(name, options.handler),
  } as never);
  const main: Context = { agent: { kind: "main" }, ui: { notify: () => {}, select: async () => undefined, addAutocompleteProvider: () => {} } };
  const child: Context = { ...main, agent: { kind: "sub" } };
  const start = events.get("session_start")!;
  const stop = events.get("session_shutdown")!;
  const language = commands.get("settings-language")!;
  try {
    await start({}, main);
    expect(ui.label).toBe("自动恢复");
    await stop({}, child);
    expect(ui.label).toBe("自动恢复");
    await Promise.all([language("en", main), language("zh", main), language("en", main)]);
    expect(Object.getOwnPropertyDescriptors(ui)).toEqual(before);
    await language("zh", main);
    expect(ui.label).toBe("自动恢复");
    await stop({}, main);
    expect(Object.getOwnPropertyDescriptors(ui)).toEqual(before);
  } finally {
    await stop({}, main);
  }
}, 30_000);
