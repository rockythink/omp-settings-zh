import type { LocalePack } from "../../src/translations/types";

export const minimalLocale: LocalePack = {
  locale: "zh-CN",
  sourceOmpVersion: "18.4.6",
  settings: {
    autoResume: {
      sourceHash: "0acb3a94cdc9ddbf65f3529da5f5779ebc8ef1b1c99b7d1c29f1731edacfd300",
      label: "自动恢复",
      description: "自动恢复当前目录中最近的会话",
    },
    "power.sleepPrevention": {
      sourceHash: "5982e5a475f856ca91337764ad0406d6e0bf06391934f64557e86a8f69aa0c0d",
      label: "防止睡眠",
      description: "在活跃会话期间阻止 macOS 睡眠；每一级都会叠加所有更低级别的行为",
      options: {
        off: { label: "关闭", description: "不阻止任何睡眠" },
        idle: { label: "防止空闲睡眠", description: "会话打开时保持系统唤醒（caffeinate -i）" },
        display: {
          label: "防止显示器睡眠",
          description: "同时阻止显示器因空闲而睡眠（caffeinate -i -d）",
        },
        system: {
          label: "防止系统睡眠",
          description: "接通电源时同时阻止所有系统睡眠，并声明用户处于活动状态（caffeinate -i -d -s -u）",
        },
      },
    },
  },
};
