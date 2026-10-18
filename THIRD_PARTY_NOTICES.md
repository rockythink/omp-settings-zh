# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 依据 OMP 18.11.3 官方英文元数据独立复核。相对18.11.1，UI412→415：新增prewalk.auto、prewalk.autoTarget、lsp.requestTimeout，复核lsp.shared与task.isolation.enabled，无删除。未变化译文与动态getter保留，不复制第三方中文或功能实现。

`src/translations/slash-commands.ts` 保存官方 OMP18.11.3 的86条英文说明、94个名称/别名；新增seance只读咨询说明，保留会话/路径/模型参数，未复制或执行咨询逻辑。原27动态回调、switch有效层级、effort selector及公共provider接口不变，动态状态独立验收。

`src/stats/translations.ts` 的独立审阅基线为官方 `@oh-my-pi/omp-stats@18.11.3`。相对18.11.1，179包文件仅package.json不同，92源码/73客户端无变化。609键/105严格模板、UI白名单与数据排除保持。npm包只是审阅来源；实际官方编译CLI在原监听器通过同源Bun preload注入，不重新分发Stats实现或二进制。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.11.3 (96894a6147d8cc64b7e00ad3a7d7178fd93b9531)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

