import type { ExtensionFactory } from "@oh-my-pi/pi-coding-agent";
import { applyTranslations, type ApplyTranslationsResult } from "./apply-translations";
import { getHostMetadata } from "./host-adapter";
import type { HostMetadata } from "./compatibility";
import { zhCN } from "./translations/zh-CN";

const extension: ExtensionFactory = (pi) => {
  let host: HostMetadata | undefined;
  let active: Extract<ApplyTranslationsResult, { status: "applied" }> | undefined;
  let restoreError: string | undefined;
  let transition = Promise.resolve<string | undefined>(undefined);

  const changeLanguage = async (language: "en" | "zh"): Promise<string | undefined> => {
    if (language === "en") {
      if (!active) return;
      const errors = active.restore();
      if (errors.length > 0) return restoreError = errors.join("；");
      active = undefined;
      restoreError = undefined;
      return;
    }
    if (active) return restoreError;
    try {
      host ??= await getHostMetadata();
      const result = applyTranslations(host, zhCN);
      if (result.status !== "applied") {
        return result.status === "rolled-back" && result.rollbackErrors.length > 0
          ? result.reason + "；回滚错误：" + result.rollbackErrors.join("；")
          : result.reason;
      }
      active = result;
    } catch (error) {
      return "宿主接口加载失败：" + (error instanceof Error ? error.message : String(error));
    }
  };

  const setLanguage = (language: "en" | "zh") => {
    transition = transition.then(() => changeLanguage(language));
    return transition;
  };

  pi.on("session_start", async (_event, context) => {
    // Child sessions share the registry; they must not own or undo the parent's localization.
    if (context.agent.kind !== "main") return;
    const reason = await setLanguage("zh");
    if (reason) context.ui.notify("omp-settings-zh 设置汉化失败：" + reason, "warning");
  });

  pi.registerCommand("settings-language", {
    description: "切换 /settings 显示语言：zh（中文）或 en（原版）",
    handler: async (args, context) => {
      if (context.agent.kind !== "main") {
        context.ui.notify("设置语言由主会话管理。", "warning");
        return;
      }
      let language = args.trim();
      if (!language) {
        const choice = await context.ui.select(
          "Settings language / 设置语言（当前：" + (restoreError ? "恢复未完成" : active ? "中文" : "原版") + "）",
          ["简体中文", "Original（原版）"],
        );
        if (!choice) return;
        language = choice === "简体中文" ? "zh" : "en";
      }
      if (language !== "en" && language !== "zh") {
        context.ui.notify("用法：/settings-language [zh|en]", "warning");
        return;
      }
      const reason = await setLanguage(language);
      context.ui.notify(reason
        ? "设置语言切换失败：" + reason
        : "设置已切换为" + (language === "zh" ? "中文" : "原版") + "，重新打开 /settings 即可。",
        reason ? "warning" : "info");
    },
  });

  pi.on("session_shutdown", (_event, context) => {
    if (context.agent.kind !== "main" || !active) return;
    const errors = active.restore();
    if (errors.length > 0) context.ui.notify("设置原文恢复失败：" + errors.join("；"), "warning");
    else active = undefined;
  });
};

export default extension;
