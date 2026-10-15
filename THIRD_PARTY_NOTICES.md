# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 依据 OMP 18.11.1 官方英文元数据独立复核。相对 18.10.3，UI 414→412：删除两项 Codex Code Mode，复核 contextPromotion.enabled、retry.modelFallback、task.structured 三项说明/哈希；18.11.0→18.11.1 设置域源码无变化。gc.compress / gc.compressAfterDays 不计 UI；未变化译文、126 组静态选项及 8 个动态 getter 保留，不复制第三方中文或功能实现。

`src/translations/slash-commands.ts` 保存官方 OMP 18.11.1 的 85 条英文说明及 93 个名称/别名；顶层静态原文、别名、27 个动态回调与公共 provider 接口未变。独立审查双引号 @ 文件补全、/session pin、/jobs、/plugins 和 /new 执行变化，参数说明及正文仍保留英文；不复制命令实现，不以静态门禁冒称覆盖动态状态。

`src/stats/translations.ts` 独立审阅基线为官方 `@oh-my-pi/omp-stats@18.11.1`。73 个客户端文件相对 18.10.3 未变；18.11.0 的 6 个服务端文件涉及定价/扫描/窗口分组，18.11.1 的 179 个包文件仅 package.json 不同。保留 609 键/105 严格模板，负数节省百分比仅补显示匹配，不改变数值或计算。npm 包仅作审阅来源；真实官方编译 CLI 原监听器通过同源 Bun preload 注入，不重新分发 Stats 实现或二进制。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.11.1 (7cc912940b107eb2d771b0d106c640a8eddc9edf)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

