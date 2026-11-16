# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts`依据OMP18.20.3官方英文完整注册图独立复核：465UI；18.20.3新增`mnemopi.recallRelevance`、`mnemopi.embeddingQueryPrefix`、`mnemopi.embeddingInputType`三项译文，其余462项不重译。仅翻译显示，不改变默认值、原value、保存、凭据或项目授权，不复用第三方中文译文。

`src/translations/slash-commands.ts`保存官方OMP18.20.3的89说明/98标识/9别名/27动态回调；官方删除`/seance`，移除其译文，其余命令说明与动态回调源码相对18.20.2不变。不改变候选数据、匹配排序、参数或原生插入执行。

`src/stats/translations.ts`审阅基线为官方`@oh-my-pi/omp-stats@18.20.3`；120源码相对18.20.2逐字节不变。898键、151通用严格模板＋9作用域属性模板，另有6个仅用于失败原因列的原因标签；browser/mutations/preload不改。npm仅作审阅来源，实际运行时是官方compiled，在原监听器同源注入，不重新分发Stats实现或二进制；18.20.3真实Web完整门禁未重验。

固定官方Git树commit `90935366da0c368a437da4343ae748b03a2ffe97`（v18.20.3）的源码与npm全部1977份coding-agent、130份utils、120份Stats、463份TUI源码逐字节一致；4个导出模板源由package.files排除，不补造包内来源。冷摄取[Issue #17754](https://github.com/can1357/oh-my-pi/issues/17754)/[PR #17758](https://github.com/can1357/oh-my-pi/pull/17758)已由上游合并且为当前tag祖先；当前compiled冷摄取仍须真实Web验收。不以局部源码、自编译或第三方构建代替官方制品。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.20.3 (90935366da0c368a437da4343ae748b03a2ffe97)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

