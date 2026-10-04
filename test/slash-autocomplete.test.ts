import { expect, test } from "bun:test";
import { CombinedAutocompleteProvider, type AutocompleteProvider } from "@oh-my-pi/pi-tui";
import { BUILTIN_SLASH_COMMAND_DEFS, buildTuiBuiltinSlashCommands } from "@oh-my-pi/pi-coding-agent/slash-commands/builtin-registry";
import type { TuiSlashCommandRuntime } from "@oh-my-pi/pi-coding-agent/slash-commands/types";
import { Settings } from "@oh-my-pi/pi-coding-agent/config/settings";
import { cfgPlanEnabled } from "@oh-my-pi/pi-coding-agent/plan-mode/settings";
import { cfgGoalEnabled } from "@oh-my-pi/pi-coding-agent/goals/settings";
import { cfgSkillful } from "@oh-my-pi/pi-coding-agent/session/settings";
import { cfgExtendedContext } from "@oh-my-pi/pi-coding-agent/session/context-settings";
import { cfgComputerEnabled } from "@oh-my-pi/pi-coding-agent/tools/settings";
import { cfgBrowserEnabled, cfgBrowserHeadless } from "@oh-my-pi/pi-coding-agent/tools/browser/settings";
import { cfgModelPresets } from "@oh-my-pi/pi-coding-agent/config/model-settings";
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

test("effort key glyphs preserve the shortcut, effort selector and English restore", async () => {
  let chinese = true;
  const native = new CombinedAutocompleteProvider([
    { name: "effort", description: "Set reasoning effort (thinking level, intelligence) for this session; ⇧⇥ cycles levels", getAutocompleteDescription: () => "Thinking: high" },
  ]);
  const provider = localizeSlashAutocomplete(native, () => chinese);
  const sync = provider.trySyncSlashCompletion!("/effort")!.items[0]!;
  expect(sync.description).toBe("思考：high");
  expect(sync.nativeDetail).toBe("设置当前会话的推理强度（思考级别、智能程度）；⇧⇥ 循环切换级别");
  expect(sync.state).toBe("high");
  expect((await provider.getSuggestions(["/effort"], 0, 7))!.items[0]).toEqual(sync);
  expect(provider.applyCompletion(["/eff"], 0, 4, sync, "/eff")).toEqual(native.applyCompletion(["/eff"], 0, 4, native.trySyncSlashCompletion("/effort")!.items[0]!, "/eff"));
  chinese = false;
  expect(provider.trySyncSlashCompletion!("/effort")).toEqual(native.trySyncSlashCompletion("/effort"));
});


test("official live callbacks cover every state family without changing matching or insertion", async () => {
  const settings = Settings.isolated();
  let goal: { goal: { status: string; objective: string } } | undefined;
  let model: { provider: string; id: string } | undefined;
  let fast = false, ultra = false, slow = false;
  let effort: string | undefined;
  const advisors: { active: boolean; configured: boolean; advisors: string[]; model: { provider: string; id: string } | undefined } = { active: false, configured: false, advisors: [], model };
  let tools: string[] = [], allTools: string[] = [];
  let usage: { percent: number; tokens: number; contextWindow: number } | undefined;
  let jobs: { running: string[]; recent: string[] } | undefined;
  let pendingLogin = false, loginProvider: string | undefined;
  const ctx = {
    settings, planModeEnabled: false, goalModeEnabled: false, vibeModeEnabled: false,
    planModePlanFilePath: undefined as string | undefined,
    loopModeEnabled: false, loopModePaused: false, loopPrompt: undefined as string | undefined,
    loopLimit: undefined as { kind: "iterations"; remaining: number; initial: number } | { kind: "duration"; durationMs: number; deadlineMs: number } | undefined,
    loopCondition: undefined as { until: boolean; command: string } | undefined,
    collabController: { host: undefined as { participants: string[] } | undefined },
    collabGuest: undefined as { readOnly: boolean } | undefined,
    todoPhases: [] as { tasks: { status: string }[] }[],
    oauthManualInput: { hasPending: () => pendingLogin, get pendingProviderId() { return loginProvider; } },
    session: {
      settings, get model() { return model; }, isStreaming: false,
      getGoalModeState: () => goal, isFastModeEnabled: () => fast, isUltrafastModeEnabled: () => ultra,
      isSlowModeEnabled: () => slow, configuredThinkingLevel: () => effort, getAdvisorStats: () => advisors,
      getActiveToolNames: () => tools, getAllToolNames: () => allTools,
      getContextUsage: () => usage, getAsyncJobSnapshot: () => jobs,
    },
  };
  const native = new CombinedAutocompleteProvider([...buildTuiBuiltinSlashCommands({ ctx } as unknown as TuiSlashCommandRuntime)]);
  let chinese = true;
  const provider = localizeSlashAutocomplete(native, () => chinese);
  const covered = new Set<string>();
  const check = async (name: string, englishState: string, chineseState: string) => {
    covered.add(name);
    const text = "/" + name;
    const original = native.trySyncSlashCompletion(text)!.items.find(item => item.value === name)!;
    expect(original.state).toBe(englishState);
    const sync = provider.trySyncSlashCompletion!(text)!.items.find(item => item.value === name)!;
    const asyncItem = (await provider.getSuggestions([text], 0, text.length))!.items.find(item => item.value === name)!;
    expect(sync.state).toBe(chineseState);
    expect(asyncItem).toEqual(sync);
    expect(sync.description).not.toBe(original.description);
    expect(sync.value).toBe(original.value);
    expect(provider.applyCompletion([text], 0, text.length, sync, text)).toEqual(native.applyCompletion([text], 0, text.length, original, text));
    chinese = false;
    expect(provider.trySyncSlashCompletion!(text)).toEqual(native.trySyncSlashCompletion(text));
    chinese = true;
  };
  cfgPlanEnabled.override(settings, false);
  await check("plan", "disabled in settings", "已在设置中禁用");
  cfgPlanEnabled.override(settings, true);
  await check("plan", "off", "关闭");
  ctx.goalModeEnabled = true;
  await check("plan", "blocked by goal mode", "目标模式启用中，无法开启");
  ctx.goalModeEnabled = false; ctx.planModeEnabled = true;
  await check("plan", "on", "开启");
  ctx.planModePlanFilePath = "/tmp/do-not-translate.md";
  await check("plan", "on (do-not-translate.md)", "开启（do-not-translate.md）");
  await check("plan-review", "available", "可用");
  await check("vibe", "blocked by plan mode", "计划模式启用中，无法开启");
  cfgGoalEnabled.override(settings, false);
  await check("goal", "disabled in settings", "已在设置中禁用");
  cfgGoalEnabled.override(settings, true);
  await check("goal", "blocked by plan mode", "计划模式启用中，无法开启");
  ctx.planModeEnabled = false;
  await check("plan-review", "plan mode inactive", "计划模式未启用");
  await check("vibe", "off", "关闭");
  ctx.goalModeEnabled = true;
  await check("vibe", "blocked by goal mode", "目标模式启用中，无法开启");
  ctx.vibeModeEnabled = true;
  await check("vibe", "on", "开启");
  await check("goal", "off", "关闭");
  for (const [status, zh] of [["active", "进行中"], ["paused", "已暂停"], ["budget-limited", "预算受限"], ["complete", "已完成"], ["dropped", "已放弃"]]) {
    goal = { goal: { status: status!, objective: "Literal objective" } };
    await check("goal", status + " (Literal objective)", zh + " (Literal objective)");
  }
  await check("loop", "off", "关闭");
  ctx.loopModeEnabled = true; ctx.loopModePaused = true;
  await check("loop", "paused", "已暂停");
  ctx.loopModePaused = false;
  await check("loop", "on (waiting for next prompt)", "开启（等待下一条提示）");
  ctx.loopPrompt = "literal prompt";
  await check("loop", "on (repeating prompt)", "开启（重复提示）");
  ctx.loopLimit = { kind: "iterations", remaining: 1, initial: 1 };
  await check("loop", "on (1 of 1 iteration remaining)", "开启（共 1 轮，剩余 1 轮）");
  ctx.loopLimit = { kind: "iterations", remaining: 2, initial: 5 };
  await check("loop", "on (2 of 5 iterations remaining)", "开启（共 5 轮，剩余 2 轮）");
  for (const [durationMs, english, zh] of [[3600000, "1 hour", "1 小时"], [7200000, "2 hours", "2 小时"], [60000, "1 minute", "1 分钟"], [120000, "2 minutes", "2 分钟"], [1000, "1 second", "1 秒"], [1500, "1.5 seconds", "1.5 秒"]] as const) {
    ctx.loopLimit = { kind: "duration", durationMs, deadlineMs: 0 };
    await check("loop", "on (" + english + " limit)", "开启（限时 " + zh + "）");
  }
  ctx.loopLimit = undefined;
  for (const until of [true, false]) {
    ctx.loopCondition = { until, command: "echo literal" };
    const condition = (until ? "until" : "while") + " `echo literal` succeeds";
    const zh = (until ? "直到命令成功：" : "命令成功时继续：") + "`echo literal`";
    await check("loop", "on (" + condition + ")", "开启（" + zh + "）");
    ctx.loopLimit = { kind: "iterations", remaining: 2, initial: 5 };
    await check("loop", "on (2 of 5 iterations remaining, " + condition + ")", "开启（共 5 轮，剩余 2 轮，" + zh + "）");
    ctx.loopLimit = { kind: "duration", durationMs: 1500, deadlineMs: 0 };
    await check("loop", "on (1.5 seconds limit, " + condition + ")", "开启（限时 1.5 秒，" + zh + "）");
    ctx.loopLimit = undefined;
  }
  for (const name of ["model", "switch"]) {
    model = undefined; await check(name, "none selected", "未选择");
    model = { provider: "openai", id: "literal-id:high" }; await check(name, "openai/literal-id:high", "openai/literal-id:high");
  }
  await check("fast", "off", "关闭"); fast = true;
  await check("fast", "on", "开启"); ultra = true;
  await check("fast", "ultra", "超快");
  await check("slow", "off", "关闭"); slow = true; await check("slow", "on", "开启");
  for (const [handle, name] of [[cfgSkillful, "skillful"], [cfgExtendedContext, "extended-context"], [cfgComputerEnabled, "computer"]] as const) {
    handle.override(settings, false); await check(name, "off", "关闭");
    handle.override(settings, true); await check(name, "on", "开启");
  }
  await check("modelpreset", "none saved", "尚未保存");
  cfgModelPresets.override(settings, { demo: { modelRoles: {} }, other: { modelRoles: {} } });
  await check("modelpreset", "2 saved", "已保存 2 项");
  await check("effort", "model default", "模型默认");
  for (const value of ["auto", "minimal", "low", "medium", "high", "xhigh", "max"]) {
    effort = value; await check("effort", value, value);
  }
  await check("advisor", "off", "关闭"); advisors.configured = true;
  await check("advisor", "configured, no model", "已配置，未选择模型");
  advisors.active = true; advisors.model = model;
  await check("advisor", "on (openai/literal-id:high)", "开启（openai/literal-id:high）");
  advisors.advisors = ["one", "two"]; await check("advisor", "on (2 advisors)", "开启（2 位顾问）");
  await check("collab", "off", "关闭"); await check("leave", "not in collab", "未加入协作");
  ctx.collabGuest = { readOnly: true }; await check("collab", "read-only guest", "只读访客");
  await check("leave", "guest", "访客"); ctx.collabGuest.readOnly = false; await check("collab", "guest", "访客");
  ctx.collabController.host = { participants: ["host", "guest"] };
  await check("collab", "hosting (1 guests)", "主持中（1 位访客）"); await check("leave", "hosting", "主持中");
  cfgBrowserEnabled.override(settings, false); await check("browser", "disabled", "已禁用");
  cfgBrowserEnabled.override(settings, true); cfgBrowserHeadless.override(settings, true); await check("browser", "headless", "无头");
  cfgBrowserHeadless.override(settings, false); await check("browser", "visible", "可见");
  await check("login", "choose provider", "选择提供商"); pendingLogin = true;
  await check("login", "waiting for OAuth callback", "等待 OAuth 回调"); loginProvider = "literal-provider";
  await check("login", "waiting for literal-provider callback", "等待 literal-provider 回调");
  await check("force", "no active tools", "无启用的工具"); tools = ["read", "bash"]; await check("force", "2 active tools", "2 个启用的工具");
  await check("fresh", "ready", "就绪"); await check("clear", "drop context, keep session", "清空上下文，保留会话");
  ctx.session.isStreaming = true;
  await check("fresh", "unavailable while streaming", "流式输出期间不可用"); await check("clear", "unavailable while streaming", "流式输出期间不可用");
  await check("compact", "context unavailable", "上下文不可用"); await check("context", "unavailable", "不可用");
  usage = { percent: 42.4, tokens: 424, contextWindow: 1000 };
  await check("compact", "context 42% used", "上下文已使用 42%");
  await check("context", "42% (424/1,000)", "42% (424/1,000)");
  await check("todo", "none", "无"); ctx.todoPhases = [{ tasks: [{ status: "pending" }, { status: "in_progress" }, { status: "completed" }] }];
  await check("todo", "2 open (1 in progress, 1 done)", "2 项未完成（1 项进行中，1 项已完成）");
  await check("jobs", "none", "无"); jobs = { running: [], recent: [] }; await check("jobs", "none", "无");
  jobs = { running: ["literal-job"], recent: ["previous", "other"] }; await check("jobs", "1 running, 2 recent", "1 项运行中，2 项最近任务");
  await check("tools", "none available", "无可用工具"); allTools = ["read", "bash", "edit"]; await check("tools", "2 active / 3 available", "2 个启用 / 3 个可用");
  expect([...covered].sort()).toEqual(BUILTIN_SLASH_COMMAND_DEFS.filter(command => command.getTuiAutocompleteDescription).map(command => command.name).sort());
});

test("partial results, cancellation, original item identity and optional provider capabilities are transparent", async () => {
  const native = new CombinedAutocompleteProvider([{ name: "plan", description: planDescription, getAutocompleteDescription: () => "Plan: off" }]);
  const result = native.trySyncSlashCompletion("/plan")!;
  const applied = { lines: ["native"], cursorLine: 0, cursorCol: 6, onApplied: () => {} };
  const lines = ["/plan"];
  const controller = new AbortController();
  const fileResult = { items: [{ value: "plan", label: "file", description: planDescription }], prefix: "./" };
  let chinese = true;
  let receivedPartial: typeof result | undefined;
  const current: AutocompleteProvider = {
    async getSuggestions(receivedLines, row, col, signal, onPartial) {
      expect(this).toBe(current); expect(receivedLines).toBe(lines);
      expect([row, col]).toEqual([0, 5]); expect(signal).toBe(controller.signal);
      if (signal!.aborted) return null;
      onPartial?.(result);
      await new Promise<void>(resolve => signal!.addEventListener("abort", () => resolve(), { once: true }));
      return null;
    },
    applyCompletion(receivedLines, row, col, item, prefix) {
      expect(this).toBe(current); expect(receivedLines).toBe(lines);
      expect([row, col, prefix]).toEqual([0, 5, "/plan"]); expect(item).toBe(result.items[0]!);
      return applied;
    },
    trySyncSlashCompletion(text) { expect(this).toBe(current); expect(text).toBe("/plan"); return result; },
    getInlineHint(receivedLines, row, col) { expect(this).toBe(current); expect(receivedLines).toBe(lines); expect([row, col]).toEqual([0, 5]); return "literal hint"; },
    trySyncInlineReplace(text) { expect(this).toBe(current); expect(text).toBe("literal"); return { replaceLen: 7, insert: "replacement" }; },
    async getForceFileSuggestions(receivedLines, row, col, signal) { expect(this).toBe(current); expect(receivedLines).toBe(lines); expect([row, col]).toEqual([0, 5]); expect(signal).toBe(controller.signal); return fileResult; },
    shouldTriggerFileCompletion(receivedLines, row, col) { expect(this).toBe(current); expect(receivedLines).toBe(lines); expect([row, col]).toEqual([0, 5]); return true; },
  };
  const provider = localizeSlashAutocomplete(current, () => chinese);
  const pending = provider.getSuggestions(lines, 0, 5, controller.signal, partial => { receivedPartial = partial; });
  expect(receivedPartial!.items[0]!.state).toBe("关闭");
  expect(provider.applyCompletion(lines, 0, 5, receivedPartial!.items[0]!, "/plan")).toBe(applied);
  chinese = false;
  expect(provider.trySyncSlashCompletion!("/plan")).toBe(result);
  expect(provider.applyCompletion(lines, 0, 5, receivedPartial!.items[0]!, "/plan")).toBe(applied);
  expect(provider.getInlineHint!(lines, 0, 5)).toBe("literal hint");
  expect(provider.trySyncInlineReplace!("literal")).toEqual({ replaceLen: 7, insert: "replacement" });
  expect(await provider.getForceFileSuggestions!(lines, 0, 5, controller.signal)).toBe(fileResult);
  expect(provider.shouldTriggerFileCompletion!(lines, 0, 5)).toBe(true);
  controller.abort(); expect(await pending).toBeNull();
  expect(await provider.getSuggestions(lines, 0, 5, controller.signal)).toBeNull();
  const bare = localizeSlashAutocomplete({ getSuggestions: current.getSuggestions, applyCompletion: current.applyCompletion }, () => true);
  for (const capability of ["trySyncSlashCompletion", "getInlineHint", "trySyncInlineReplace", "getForceFileSuggestions", "shouldTriggerFileCompletion"] as const) expect(capability in bare).toBe(false);
});


test("all official commands and aliases preserve ranking and completion in both languages", async () => {
  // Static inventory uses no live runtime; the official registry retains descriptions and aliases.
  const staticNative = new CombinedAutocompleteProvider([...BUILTIN_SLASH_COMMAND_DEFS]);
  let chinese = true;
  const provider = localizeSlashAutocomplete(staticNative, () => chinese);
  const original = (await staticNative.getSuggestions(["/"], 0, 1))!;
  const localized = (await provider.getSuggestions(["/"], 0, 1))!;
  expect(localized.items.map(item => item.value)).toEqual(original.items.map(item => item.value));
  const identifiers = BUILTIN_SLASH_COMMAND_DEFS.flatMap(command => [command.name, ...(command.aliases ?? [])]);
  expect(identifiers).toHaveLength(93);
  for (const name of identifiers) {
    const text = "/" + name;
    const originalItem = staticNative.trySyncSlashCompletion(text)!.items.find(item => item.value === name)!;
    const sync = provider.trySyncSlashCompletion!(text)!.items.find(item => item.value === name)!;
    const asyncItem = (await provider.getSuggestions([text], 0, text.length))!.items.find(item => item.value === name)!;
    expect(sync.description).not.toBe(originalItem.description);
    expect(asyncItem).toEqual(sync);
    expect(sync.label).toBe(originalItem.label);
    expect(sync.icon).toBe(originalItem.icon);
    expect(sync.iconName).toBe(originalItem.iconName);
    expect(provider.applyCompletion([text], 0, text.length, sync, text)).toEqual(staticNative.applyCompletion([text], 0, text.length, originalItem, text));
  }
  chinese = false;
  expect(await provider.getSuggestions(["/"], 0, 1)).toEqual(original);
});

test("known shortcuts may vary but changed surrounding prose and third-party descriptions remain English", async () => {
  for (const name of ["switch", "loop", "effort"]) {
    const command = BUILTIN_SLASH_COMMAND_DEFS.find(command => command.name === name)!;
    const key = name === "switch" ? "Option+P" : name === "loop" ? "Esc" : "Shift+Tab";
    const base = command.description!;
    for (const description of [base.replace(key, "CustomKey"), "Changed " + base, base + " Changed", base.replace(key, "CustomKey") + " Changed"]) {
      const native = new CombinedAutocompleteProvider([{ name, description, getAutocompleteDescription: () => name === "switch" ? "Model: provider/id" : name === "loop" ? "Loop: off" : "Thinking: high" }]);
      const provider = localizeSlashAutocomplete(native, () => true);
      const text = "/" + name;
      const english = native.trySyncSlashCompletion(text)!;
      const translated = provider.trySyncSlashCompletion!(text)!;
      if (description === base.replace(key, "CustomKey")) {
        expect(translated.items[0]!.nativeDetail).toContain("CustomKey");
        expect(translated.items[0]!.nativeDetail).not.toBe(english.items[0]!.nativeDetail);
      } else expect(translated).toEqual(english);
      expect(await provider.getSuggestions([text], 0, text.length)).toEqual(translated);
    }
  }
  const native = new CombinedAutocompleteProvider([
    { name: "skill:first", description: "literal first skill" }, { name: "skill:second", description: "literal second skill" },
  ]);
  const provider = localizeSlashAutocomplete(native, () => true);
  expect((await provider.getSuggestions(["/"], 0, 1))!.items.find(item => item.value === "skill:")!.description).toBe("2 项技能");
  expect(provider.trySyncSlashCompletion!("/skill:first")).toEqual(native.trySyncSlashCompletion("/skill:first"));
});

