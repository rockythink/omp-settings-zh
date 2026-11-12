# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts`依据OMP18.19.0官方英文完整注册图独立复核：456UI；新增`task.autoParallel`、`task.steps`、`browser.webkit`、`browser.webkitPath`四项独立译文，删除官方已移除的`task.file`译文，复核`ask.timeout`与5项浏览器设置原文，其余446项不重译。仅翻译显示，不改变默认值、原value、保存、凭据或项目授权，不复用第三方中文译文。

`src/translations/slash-commands.ts`保存官方OMP18.19.0的89说明/98标识/9别名/27动态回调；相对18.18.8注册表、动态回调与补全接口无变化。不改变候选数据、匹配排序、参数或原生插入执行。

`src/stats/translations.ts`审阅基线为官方`@oh-my-pi/omp-stats@18.19.0`；119源码，客户端仅Spotlight `Overhead.tsx`变化（失败原因列与Stencil未登录提示）。898键、151通用严格模板＋9作用域属性模板，另有6个仅用于失败原因列的原因标签；mutations/preload不改。npm仅作审阅来源，实际运行时是官方compiled，在原监听器同源注入，不重新分发Stats实现或二进制。

固定官方Git树commit `04cd1a7549a02d62ad1d24826198d52507595683`（v18.19.0）的源码与npm全部1955份coding-agent、130份utils、119份Stats、463份TUI源码逐字节一致；4个HTML源由package.files排除，不补造包内来源。冷摄取[Issue #17754](https://github.com/can1357/oh-my-pi/issues/17754)/[PR #17758](https://github.com/can1357/oh-my-pi/pull/17758)已由上游合并。不以局部源码、自编译或第三方构建代替官方制品。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.19.0 (04cd1a7549a02d62ad1d24826198d52507595683)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

