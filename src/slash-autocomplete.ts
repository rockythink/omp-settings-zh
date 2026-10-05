import type { ExtensionContext } from "@oh-my-pi/pi-coding-agent";
import { slashCommandTranslations } from "./translations/slash-commands";

type Provider = Parameters<Parameters<ExtensionContext["ui"]["addAutocompleteProvider"]>[0]>[0];
type Suggestions = NonNullable<Awaited<ReturnType<Provider["getSuggestions"]>>>;
type Item = Suggestions["items"][number];
type Translation = { name: string; aliases?: readonly string[]; en: string; zh: string };
const translations = new Map<string, Translation>();
for (const entry of slashCommandTranslations) {
  translations.set(entry.name, entry);
  if ("aliases" in entry) for (const alias of entry.aliases) translations.set(alias, entry);
}

const liveLabels: Record<string, readonly [string, string]> = {
  plan: ["Plan", "计划"], "plan-review": ["Plan review", "计划审核"], vibe: ["Vibe", "Vibe"],
  goal: ["Goal", "目标"], loop: ["Loop", "循环"], model: ["Model", "模型"], switch: ["Model", "模型"],
  fast: ["Fast", "快速服务"], slow: ["Slow mode", "慢速模式"], skillful: ["Skill listing", "技能列表"],
  "extended-context": ["Extended context", "扩展上下文"], computer: ["Computer", "电脑控制"],
  modelpreset: ["Presets", "预设"], effort: ["Thinking", "思考"], advisor: ["Advisor", "顾问"],
  collab: ["Collab", "协作"], leave: ["Leave collab", "离开协作"], browser: ["Browser", "浏览器"],
  login: ["Login", "登录"], force: ["Force", "强制工具"], fresh: ["Fresh", "流状态重置"],
  clear: ["Clear", "清空上下文"], compact: ["Compact", "上下文压缩"], todo: ["Todos", "待办"],
  jobs: ["Jobs", "后台任务"], tools: ["Tools", "工具"], context: ["Context", "上下文"],
};
const states: Record<string, string> = {
  on: "开启", off: "关闭", ultra: "超快", paused: "已暂停", "disabled in settings": "已在设置中禁用",
  "blocked by goal mode": "目标模式启用中，无法开启", "blocked by plan mode": "计划模式启用中，无法开启",
  available: "可用", "plan mode inactive": "计划模式未启用", "none selected": "未选择",
  "none saved": "尚未保存", "model default": "模型默认", "configured, no model": "已配置，未选择模型",
  "read-only guest": "只读访客", guest: "访客", hosting: "主持中", "not in collab": "未加入协作",
  disabled: "已禁用", headless: "无头", visible: "可见", "choose provider": "选择提供商",
  "no active tools": "无启用的工具", "unavailable while streaming": "流式输出期间不可用", ready: "就绪",
  "drop context, keep session": "清空上下文，保留会话", "context unavailable": "上下文不可用",
  none: "无", "none available": "无可用工具", unavailable: "不可用",
};
const goalStates: Record<string, string> = { active: "进行中", paused: "已暂停", "budget-limited": "预算受限", complete: "已完成", dropped: "已放弃" };
const keySources: Record<string, string> = { switch: "Option+P", loop: "Esc", effort: "Shift+Tab" };

export function staticText(text: string | undefined, entry: Translation): { prefix: string; translated: string } | undefined {
  if (text === undefined) return;
  if (text === entry.en || text.endsWith(" - " + entry.en)) {
    const prefix = text.slice(0, -entry.en.length);
    return { prefix, translated: prefix + entry.zh };
  }
  const keySource = keySources[entry.name];
  if (!keySource) return;
  const keyOffset = entry.en.indexOf(keySource);
  const before = entry.en.slice(0, keyOffset);
  const after = entry.en.slice(keyOffset + keySource.length);
  const start = text.indexOf(before);
  if (start < 0 || (start > 0 && !text.slice(0, start).endsWith(" - ")) || !text.endsWith(after)) return;
  const key = text.slice(start + before.length, -after.length);
  if (!key || key.includes("\n")) return;
  const prefix = text.slice(0, start);
  return { prefix, translated: prefix + entry.zh.replace(keySource, key) };
}

function translateState(command: string, state: string): string {
  // Effort selectors are official configuration values, including the literal `off`.
  if (command === "effort" && state !== "model default") return state;
  if (Object.hasOwn(states, state)) return states[state]!;
  if (command === "goal") {
    const match = /^(active|paused|budget-limited|complete|dropped) (\(.*\))$/.exec(state);
    if (match) {
      return goalStates[match[1]!] + " " + match[2]!;
    }
  }
  if (command === "plan" || command === "loop" || command === "advisor") {
    const match = /^on \((.*)\)$/.exec(state);
    if (match) {
      let detail = match[1]!;
      if (command === "loop") {
        if (detail === "repeating prompt") detail = "重复提示";
        else if (detail === "waiting for next prompt") detail = "等待下一条提示";
        else detail = detail
          .replace(/^(\d+) of (\d+) iterations? remaining/, "共 $2 轮，剩余 $1 轮")
          .replace(/^(\d+(?:\.\d+)?) (hours?|minutes?|seconds?) limit/, (_, count: string, unit: string) => "限时 " + count + (unit.startsWith("hour") ? " 小时" : unit.startsWith("minute") ? " 分钟" : " 秒"))
          .replace(/(?:^|, )(until|while) (.*) succeeds$/, (_, mode: string, command: string) => (detail.startsWith(mode) ? "" : "，") + (mode === "until" ? "直到命令成功：" : "命令成功时继续：") + command);
      } else if (command === "advisor") detail = detail.replace(/^(\d+) advisors$/, "$1 位顾问");
      return "开启（" + detail + "）";
    }
  }
  if (command === "modelpreset") return state.replace(/^(\d+) saved$/, "已保存 $1 项");
  if (command === "collab") return state.replace(/^hosting \((\d+) guests\)$/, "主持中（$1 位访客）");
  if (command === "login") return state.replace(/^waiting for (.+) callback$/, "等待 $1 回调");
  if (command === "force") return state.replace(/^(\d+) active tools$/, "$1 个启用的工具");
  if (command === "compact") return state.replace(/^context (\d+)% used$/, "上下文已使用 $1%");
  if (command === "todo") return state.replace(/^(\d+) open \((\d+) in progress, (\d+) done\)$/, "$1 项未完成（$2 项进行中，$3 项已完成）");
  if (command === "jobs") return state.replace(/^(\d+) running, (\d+) recent$/, "$1 项运行中，$2 项最近任务");
  if (command === "tools") return state.replace(/^(\d+) active \/ (\d+) available$/, "$1 个启用 / $2 个可用");
  return state; // Model IDs, effort selectors and objectives stay literal.
}

function translateItem(item: Item): Item {
  if (item.value === "skill:" && item.description && /^\d+ skills?$/.test(item.description)) {
    return { ...item, description: item.description.replace(/^(\d+) skills?$/, "$1 项技能") };
  }
  const entry = translations.get(item.value);
  if (!entry) return item;
  let description = item.description;
  let nativeDetail = item.nativeDetail;
  let state = item.state;
  // Official text must match outside the known dynamic key-hint placeholders.
  const staticDetail = staticText(nativeDetail, entry);
  description = staticText(description, entry)?.translated ?? description;
  if (staticDetail) nativeDetail = staticDetail.translated;
  const labels = liveLabels[entry.name];
  const livePrefix = (staticDetail?.prefix ?? "") + (labels?.[0] ?? "") + ": ";
  if (staticDetail && labels && description?.startsWith(livePrefix)) {
    description = staticDetail.prefix + labels[1] + "：" + translateState(entry.name, description.slice(livePrefix.length));
    if (state !== undefined) state = translateState(entry.name, state);
  }
  if (description === item.description && nativeDetail === item.nativeDetail && state === item.state) return item;
  return { ...item, ...(description !== undefined && { description }),
    ...(nativeDetail !== undefined && { nativeDetail }), ...(state !== undefined && { state }) };
}

/** Wrap only display results; the underlying provider still owns matching and insertion. */
export function localizeSlashAutocomplete(current: Provider, isChinese: () => boolean): Provider {
  const originals = new WeakMap<Item, Item>();
  const localize = (result: Suggestions | null): Suggestions | null => {
    if (!result || !isChinese() || !/^\s*\/[^\s/]*$/.test(result.prefix)) return result;
    let items: Item[] | undefined;
    for (let index = 0; index < result.items.length; index++) {
      const item = result.items[index]!;
      const translated = translateItem(item);
      if (translated === item) continue;
      originals.set(translated, item);
      items ??= result.items.slice();
      items[index] = translated;
    }
    return items ? { ...result, items } : result;
  };
  return {
    getSuggestions: async (lines, row, col, signal, onPartial) => localize(await current.getSuggestions(
      lines, row, col, signal, onPartial ? result => onPartial(localize(result)!) : undefined,
    )),
    applyCompletion: (lines, row, col, item, prefix) => current.applyCompletion(lines, row, col, originals.get(item) ?? item, prefix),
    ...(current.trySyncSlashCompletion && { trySyncSlashCompletion: text => localize(current.trySyncSlashCompletion!(text)) }),
    ...(current.getInlineHint && { getInlineHint: current.getInlineHint.bind(current) }),
    ...(current.trySyncInlineReplace && { trySyncInlineReplace: current.trySyncInlineReplace.bind(current) }),
    ...(current.getForceFileSuggestions && { getForceFileSuggestions: current.getForceFileSuggestions.bind(current) }),
    ...(current.shouldTriggerFileCompletion && { shouldTriggerFileCompletion: current.shouldTriggerFileCompletion.bind(current) }),
  };
}
