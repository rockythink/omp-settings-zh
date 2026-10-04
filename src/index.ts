import type { ExtensionFactory } from "@oh-my-pi/pi-coding-agent";
import { applyTranslations } from "./apply-translations";
import type { ApplyTranslationsResult } from "./apply-translations";
import { getHostMetadata } from "./host-adapter";
import type { HostMetadata } from "./compatibility";
import { zhCN } from "./translations/zh-CN";
import type { StatsDashboard } from "./stats/dashboard";

const extension: ExtensionFactory = (pi) => {
  let host: HostMetadata | undefined;
  let active: Extract<ApplyTranslationsResult, { status: "applied" }> | undefined;
  let restoreError: string | undefined;
  let transition = Promise.resolve<string | undefined>(undefined);
  let stats: StatsDashboard | undefined;
  let statsTransition = Promise.resolve();

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

  pi.registerCommand("stats-zh", {
    description: "打开官方 Stats 中文网页（网页内切换中文 / English）；stop 关闭服务",
    handler: async (args, context) => {
      if (context.agent.kind !== "main") {
        context.ui.notify("Stats 服务由主会话管理。", "warning");
        return;
      }
      if (args.trim() && args.trim() !== "stop") {
        context.ui.notify("用法：/stats-zh [stop]", "warning");
        return;
      }
      statsTransition = statsTransition.then(async () => {
        try {
          if (args.trim() === "stop") {
            await stats?.stop();
            stats = undefined;
            context.ui.notify("Stats 中文服务已关闭。", "info");
            return;
          }
          if (!stats?.isRunning()) {
            await stats?.stop();
            const { startStatsDashboard } = await import("./stats/dashboard");
            stats = await startStatsDashboard(context.cwd);
          }
          const { openPath } = await import("@oh-my-pi/pi-coding-agent/utils/open");
          openPath(stats.url);
          context.ui.notify("Stats：" + stats.url + "（网页内切换语言；/stats-zh stop 关闭）", "info");
        } catch (error) {
          context.ui.notify("Stats 中文服务启动失败：" + (error instanceof Error ? error.message : String(error)), "warning");
        }
      });
      await statsTransition;
    },
  });

  pi.on("session_shutdown", async (_event, context) => {
    if (context.agent.kind !== "main") return;
    await statsTransition;
    await stats?.stop();
    stats = undefined;
    if (!active) return;
    const errors = active.restore();
    if (errors.length > 0) context.ui.notify("设置原文恢复失败：" + errors.join("；"), "warning");
    else active = undefined;
  });
};

export default extension;
