import { expect, test } from "bun:test";
import { CombinedAutocompleteProvider } from "@oh-my-pi/pi-tui";
import { localizeSlashAutocomplete } from "../src/slash-autocomplete";

const planDescription = "Toggle plan mode (agent plans before executing)";

test("live slash state updates in both completion paths and English restores the original display", async () => {
  let chinese = true;
  let plan = "off";
  const native = new CombinedAutocompleteProvider([
    { name: "plan", description: planDescription, argumentHint: "[on|off]", getAutocompleteDescription: () => "Plan: " + plan },
    { name: "settings", description: "Open settings menu" },
  ]);
  const provider = localizeSlashAutocomplete(native, () => chinese);
  const first = await provider.getSuggestions(["/plan"], 0, 5);
  expect(first!.items[0]!.description).toBe("[on|off] - 计划：关闭");
  expect(first!.items[0]!.nativeDetail).toBe("[on|off] - 切换计划模式（智能体先规划，再执行）");
  expect(first!.items[0]!.state).toBe("关闭");
  plan = "on (draft.md)";
  expect(provider.trySyncSlashCompletion!("  /plan")!.items[0]!.description).toBe("[on|off] - 计划：开启（draft.md）");
  const completion = provider.applyCompletion(["  /pl"], 0, 5, first!.items[0]!, "  /pl");
  expect(completion.lines).toEqual(["  /plan "]);
  chinese = false;
  const original = provider.trySyncSlashCompletion!("/plan")!.items[0]!;
  expect(original.description).toBe("[on|off] - Plan: on (draft.md)");
  expect(original.state).toBe("on (draft.md)");
  expect(original.nativeDetail).toBe("[on|off] - " + planDescription);
});

test("command aliases translate but arguments, unknown commands and third-party overrides do not", async () => {
  const native = new CombinedAutocompleteProvider([
    { name: "setup", aliases: ["providers"], description: "Open provider setup" },
    { name: "custom", description: "Open settings menu" },
    { name: "plan", description: "My custom plan", getAutocompleteDescription: () => "Plan: off" },
    { name: "settings", description: "Open settings menu", getArgumentCompletions: () => [{ value: "new", label: "new", description: "Start a new session" }] },
    { name: "skill:custom", description: "My custom skill" },
  ]);
  const provider = localizeSlashAutocomplete(native, () => true);
  expect(provider.trySyncSlashCompletion!("/providers")!.items[0]!.description).toBe("打开提供商配置");
  expect(provider.trySyncSlashCompletion!("/custom")!.items[0]!.description).toBe("Open settings menu");
  expect(provider.trySyncSlashCompletion!("/plan")!.items[0]!.description).toBe("Plan: off");
  const args = await provider.getSuggestions(["/settings n"], 0, 11);
  expect(args!.items[0]!.description).toBe("Start a new session");
  const skills = await provider.getSuggestions(["/skill:custom"], 0, 13);
  expect(skills!.items[0]!.description).toBe("My custom skill");
  const root = await provider.getSuggestions(["/"], 0, 1);
  expect(root!.items.find(item => item.value === "skill:")!.description).toBe("1 项技能");
});

test("key glyph changes in official descriptions preserve the key and do not disable live translation", async () => {
  let key = "⌥P";
  const native = new CombinedAutocompleteProvider([
    { name: "switch", get description() { return `Switch model for this session (same as ${key}); accepts fuzzy ids, provider/id, @role, :level`; }, getAutocompleteDescription: () => "Model: openai/demo" },
  ]);
  const provider = localizeSlashAutocomplete(native, () => true);
  const first = provider.trySyncSlashCompletion!("/switch")!.items[0]!;
  expect(first.description).toBe("模型：openai/demo");
  expect(first.nativeDetail).toBe("切换当前会话的模型（同 ⌥P）；支持模糊 ID、provider/id、@role、:level");
  key = "Alt+P";
  const second = (await provider.getSuggestions(["/switch"], 0, 7))!.items[0]!;
  expect(second.nativeDetail).toBe("切换当前会话的模型（同 Alt+P）；支持模糊 ID、provider/id、@role、:level");
});
