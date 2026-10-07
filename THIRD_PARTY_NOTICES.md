# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 依据 OMP 18.8.0 官方英文元数据独立复核，新增 4 项并更新 5 项原文哈希与说明，未变译文保留。未复制第三方中文分支。少量官方英文动态说明模板仅匹配 getter 键位，不含功能实现。

`src/translations/slash-commands.ts` 保存 OMP 18.8.0 官方 85 条英文说明及 93 个命令名／别名；相对 18.6.3 仅 prewalk 静态说明变化，27 个动态回调和接口未变。另审查官方裸 `/` 与 `/skill:` 同步补全新路径并进行行为回归。中文独立生成，保留实际键位、模型、路径和目标数据，不复制命令实现。

`src/stats/translations.ts` 的英文键与模板依据官方 `@oh-my-pi/omp-stats@18.8.0` Web 源码独立复核：源码 89→90 个（客户端 71→72），32 个变化、新增 query-store 1 个，UI 文案／609 个键／105 个严格模板未变。保留既有译文，不复制第三方中文或业务实现。18.8.0 是审阅基线，不是替代运行时；实际官方编译 CLI 同源 Bun preload 注入显示脚本，不重新分发 Stats 实现或二进制。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.8.0
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

