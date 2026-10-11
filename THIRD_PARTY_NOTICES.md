# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 依据 OMP 18.9.1 官方英文元数据独立复核。相对 18.8.8 UI 410→413：composer.predictions、retry.fallbackOn 和已有 contextFiles.extra 新增 UI；另复核 tui.autoGraph、ask.timeout、codexResets.autoRedeem、claudeResets.autoRedeem 四项原文与哈希。已有译文不重复改译，配置专用路径不纳入 UI 覆盖。未复制第三方中文分支或功能实现。

`src/translations/slash-commands.ts` 保存官方 OMP 18.9.1 的 85 条英文说明及 93 个名称/别名；仅 /fork 静态说明变化，独立翻译会话分叉或终端复用器窗格/窗口语义。27 个动态回调与公共 provider 接口未变，pane/window/tab 参数保持英文。中文不翻译名称/ID/路径/目标，不复制命令实现；静态合同不替代动态状态或实际编译版交互。

`src/stats/translations.ts` 的英文键/模板独立审阅基线为官方 `@oh-my-pi/omp-stats@18.9.1`；既有 72 个客户端文件逐字未变，仅新增 favicon，评判问题迁移到官方 JSON 而内容不变。609 键/105 严格模板保留；中文独立生成，不复制第三方中文或业务实现。审阅 npm 包不是替代运行时；真实官方编译 CLI 原监听器使用同源 Bun preload 注入显示脚本，不重新分发 Stats 实现或二进制。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.9.1 (a4d6f0adc63dda4ccdf4d25c26422219820f865b)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

