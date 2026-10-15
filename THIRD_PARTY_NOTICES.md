# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 依据 OMP 18.11.0 官方英文元数据独立复核。相对 18.10.3，UI 414→412：删除两项 Codex Code Mode，复核 contextPromotion.enabled、retry.modelFallback、task.structured 三项说明/哈希。配置专用 gc.compress / gc.compressAfterDays 不纳入 UI；未变化译文、选项与 8 个动态 getter 保留，不复制第三方中文分支或功能实现。

`src/translations/slash-commands.ts` 保存官方 OMP 18.11.0 的 85 条英文说明及 93 个名称/别名；相对 18.10.3 顶层静态原文、别名、27 个动态回调与公共 provider 接口未变。/plugins 的 enable/disable 参数说明和 `<plugin>` 提示继续保持英文；/new 复用新版原生执行。中文不翻译名称/ID/路径/目标或参数提示，不复制命令实现；静态门禁不冒称覆盖动态状态。

`src/stats/translations.ts` 的英文键/模板独立审阅基线为官方 `@oh-my-pi/omp-stats@18.11.0`；73 个客户端文件相对 18.10.3 逐字未变，92 个源码中 6 个服务端文件涉及定价、扫描和窗口分组变化。609 键/105 严格模板保留；中文独立生成，不复制第三方中文或业务实现。审阅 npm 包不是替代运行时；真实官方编译 CLI 原监听器使用同源 Bun preload 注入显示脚本，不重新分发 Stats 实现或二进制。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.11.0 (c2cb79e4c227aa4b22c4ccb933ff72fd88bceba4)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

