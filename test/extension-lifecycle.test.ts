import { expect, test } from "bun:test";
import extension from "../src/index";
import { getHostMetadata } from "../src/host-adapter";

type Context = {
  agent: { kind: "main" | "sub" };
  ui: { notify: (message: string) => void; select: () => Promise<undefined> };
};
type Handler = (event: unknown, context: Context) => void | Promise<void>;
type Command = (args: string, context: Context) => void | Promise<void>;

test("child shutdown cannot undo main localization; overlapping language commands leave no ghost translation", async () => {
  const host = await getHostMetadata();
  const ui = host.schema.autoResume!.ui!;
  const before = Object.getOwnPropertyDescriptors(ui);
  const events = new Map<string, Handler>();
  const commands = new Map<string, Command>();
  await extension({
    on: (name: string, handler: Handler) => events.set(name, handler),
    registerCommand: (name: string, options: { handler: Command }) => commands.set(name, options.handler),
  } as never);
  const main: Context = { agent: { kind: "main" }, ui: { notify: () => {}, select: async () => undefined } };
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
