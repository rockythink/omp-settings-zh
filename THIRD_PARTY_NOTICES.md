# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts`依据OMP19.0.1官方英文完整注册图独立复核：638定义/477UI；19.0.1相对19.0.0无设置变化。19.0.0新增缓存保温策略、两项缓存衔接压缩阈值、`task.crossInstance`、`mcp.evalNamespaces`、`mcp.builtinTransforms`六项译文，改译`providers.cacheWarming`、`tools.intentTracing`、`isolation.backend`、`ovnfs.path`、`task.enableLsp`五项，其余466项不重译。仅翻译显示，不改变默认值、原value、保存、凭据或项目授权，不复用第三方中文译文。

`src/translations/slash-commands.ts`保存官方OMP19.0.1的89说明/98标识/9别名/27动态回调；19.0.1仅执行侧`/copy local`变化，说明、别名、动态回调与补全接口源码不变（19.0.0曾改`/handoff`说明）。不改变候选数据、匹配排序、参数或原生插入执行。

`src/stats/translations.ts`审阅基线为官方`@oh-my-pi/omp-stats@19.0.1`；121源码中客户端仅Shell/TimeChart/range/types相对19.0.0变化（新增2d/3d时间范围、快捷键1–8、跨日刻度）。947键（含按8个官方范围展开的范围说明）、155通用严格模板＋9作用域属性模板，另有6个仅用于失败原因列的原因标签与2个仅用于Gain来源列的来源标签；browser/mutations/preload不改。npm仅作审阅来源，实际运行时是官方compiled，在原监听器同源注入，不重新分发Stats实现或二进制；19.0.1真实Web完整门禁未重验。

固定官方Git树commit `f40f335845f0b136453d12fec8d6057011082766`（v19.0.1）的源码与npm全部2047份coding-agent、133份utils、121份Stats、473份TUI源码逐字节一致；4个导出模板源由package.files排除，不补造包内来源。冷摄取[Issue #17754](https://github.com/can1357/oh-my-pi/issues/17754)/[PR #17758](https://github.com/can1357/oh-my-pi/pull/17758)已由上游合并且为当前tag祖先；当前compiled冷摄取仍须真实Web验收。不以局部源码、自编译或第三方构建代替官方制品。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v19.0.1 (f40f335845f0b136453d12fec8d6057011082766)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

