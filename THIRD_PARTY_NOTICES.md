# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts`依据OMP18.20.0官方英文完整注册图独立复核：458UI；新增`encourageEdits`、`find.verifyModel`两项译文，复核`model.toolCallLoopGuard.exemptTools`的write分发xd://设备名说明，其余455项不重译。仅翻译显示，不改变默认值、原value、保存、凭据或项目授权，不复用第三方中文译文。

`src/translations/slash-commands.ts`保存官方OMP18.20.0的89说明/98标识/9别名/27动态回调；相对18.19.0的30个命令文件逐字节不变。官方provider的技能名中段排序修复仍由官方执行，不改变候选数据、匹配排序、参数或原生插入执行。

`src/stats/translations.ts`审阅基线为官方`@oh-my-pi/omp-stats@18.20.0`；119源码中4份Spotlight服务端文件变化，95客户端逐字节不变。898键、151通用严格模板＋9作用域属性模板，另有6个仅用于失败原因列的原因标签；browser/mutations/preload不改。npm仅作审阅来源，实际运行时是官方compiled，在原监听器同源注入，不重新分发Stats实现或二进制；18.20.0真实Web门禁未重验。

固定官方Git树commit `c308970263ae13744ea15ab67302e3dac840e266`（v18.20.0）的源码与npm全部1962份coding-agent、130份utils、119份Stats、463份TUI源码Git blob一致；4个HTML源由package.files排除，不补造包内来源。冷摄取[Issue #17754](https://github.com/can1357/oh-my-pi/issues/17754)/[PR #17758](https://github.com/can1357/oh-my-pi/pull/17758)已由上游合并且为当前tag祖先；当前compiled冷摄取仍须真实Web验收。不以局部源码、自编译或第三方构建代替官方制品。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.20.0 (c308970263ae13744ea15ab67302e3dac840e266)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

