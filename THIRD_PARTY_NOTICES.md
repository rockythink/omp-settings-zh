# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts`依据OMP18.22.0官方英文完整注册图独立复核：629定义/468UI；18.22.0新增`tui.renderEmbeds`、`disassembler.backend`/`maxOpen`/`idleCloseSec`、`ghidra.installDir`/`python`六项译文，删除官方移除的`ida.enabled`/`maxOpen`/`idleCloseSec`，改译`tts.localVoice`/`localSpeed`、`speech.voice`/`speed`、`speechgen.enabled`与`worktree.onExit`六项，其余456项不重译。仅翻译显示，不改变默认值、原value、保存、凭据或项目授权，不复用第三方中文译文。

`src/translations/slash-commands.ts`保存官方OMP18.22.0的89说明/98标识/9别名/27动态回调；命令说明、别名、动态回调与补全接口源码相对18.20.3不变。不改变候选数据、匹配排序、参数或原生插入执行。

`src/stats/translations.ts`审阅基线为官方`@oh-my-pi/omp-stats@18.22.0`；120源码相对18.20.3逐字节不变。898键、151通用严格模板＋9作用域属性模板，另有6个仅用于失败原因列的原因标签；browser/mutations/preload不改。npm仅作审阅来源，实际运行时是官方compiled，在原监听器同源注入，不重新分发Stats实现或二进制；18.22.0真实Web完整门禁未重验。

固定官方Git树commit `3e8cff3b7ce19a805c11a26a6dd1703066435851`（v18.22.0）的源码与npm全部2000份coding-agent、130份utils、120份Stats、470份TUI源码逐字节一致；4个导出模板源由package.files排除，不补造包内来源。冷摄取[Issue #17754](https://github.com/can1357/oh-my-pi/issues/17754)/[PR #17758](https://github.com/can1357/oh-my-pi/pull/17758)已由上游合并且为当前tag祖先；当前compiled冷摄取仍须真实Web验收。不以局部源码、自编译或第三方构建代替官方制品。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.22.0 (3e8cff3b7ce19a805c11a26a6dd1703066435851)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

