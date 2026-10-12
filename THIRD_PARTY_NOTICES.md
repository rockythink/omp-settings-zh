# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 依据 OMP 18.10.2 官方英文元数据独立复核。相对 18.9.1 UI 413→414：新增 task.structured；task.softRequestBudget 说明将 yield 改为 hand back，独立复核原文与哈希。既有译文、选项与动态 getter 不重复改译，配置专用路径不纳入 UI 覆盖。未复制第三方中文分支或功能实现。

`src/translations/slash-commands.ts` 保存官方 OMP 18.10.2 的 85 条英文说明及 93 个名称/别名；相对 18.9.1 完整注册表、静态原文、别名、27 个动态回调与公共 provider 接口逐字未变。中文不翻译名称/ID/路径/目标或参数提示，不复制命令实现；静态合同不替代动态状态或实际编译版交互。

`src/stats/translations.ts` 的英文键/模板独立审阅基线为官方 `@oh-my-pi/omp-stats@18.10.2`；全部 92 个源码/73 个客户端文件相对 18.9.1 逐字未变。609 键/105 严格模板保留；中文独立生成，不复制第三方中文或业务实现。审阅 npm 包不是替代运行时；真实官方编译 CLI 原监听器使用同源 Bun preload 注入显示脚本，不重新分发 Stats 实现或二进制。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.10.2 (c8913466dd7bf92040de911f8e00e30b8f4e48a2)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

