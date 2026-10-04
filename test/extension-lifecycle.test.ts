import { expect, test } from "bun:test";
import extension from "../src/index";
import { getHostMetadata } from "../src/host-adapter";
import { mkdtemp, mkdir, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

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
      await symlink("/usr/bin/true", join(bin, "omp"));
      const child = Bun.spawn([process.execPath, "test", import.meta.path], {
        env: { ...process.env, HOME: home, ZDOTDIR: home, SHELL: "/bin/bash",
          PATH: bin + ":" + process.env.PATH, OMP_SETTINGS_ZH_LIFECYCLE_CHILD: "1" },
        stdout: "pipe", stderr: "pipe",
      });
      const [code, stdout, stderr] = await Promise.all([child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()]);
      if (code !== 0) throw new Error(stdout + stderr);
      expect(code).toBe(0);
    } finally { await rm(home, { recursive: true, force: true }); }
  });
} else test("child shutdown cannot undo main localization; overlapping language commands leave no ghost translation", async () => {
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
});
