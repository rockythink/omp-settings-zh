# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts`依据OMP18.16.0官方英文完整注册图独立复核：37领域，582定义/438UI；新增btw.inject、composer.predictionAlternatives、hindsight.globalScope，原435项元数据/选项保持，动态getter8→9。92条非纯类型依赖边/48来源独立审阅；只翻译显示，保留真实Tab键位、预测输出Token费用与跨项目记忆限制，不复用第三方中文译文。

`src/translations/slash-commands.ts`保存官方OMP18.16.0的88说明/97标识/9别名/27动态回调；相对18.15.0全部30命令文件逐字节不变，另审25份接口/导入来源，8份相邻变化不改原provider、viewSession/有效层级、动态键位、排序/插入/执行。未变译文不重译。

`src/stats/translations.ts`审阅基线为官方`@oh-my-pi/omp-stats@18.16.0`；97源码/77客户端仅query与SpanDrawer变化，服务端/文案/DOM不变，613键/105模板保持，不改browser白名单/数据排除或React异步处理。npm仅作审阅来源，实际运行时是官方compiled，在原监听器同源注入，不重新分发Stats实现或二进制。

固定官方Git树commit `650f3a108229ee11bf68ba3377f4e8c3391cd424`的blob身份与npm全部1839份coding-agent、130份utils、97份Stats、441份TUI源码匹配；4个HTML源由package.files排除，不补造包内来源。冷摄取[Issue #17754](https://github.com/can1357/oh-my-pi/issues/17754)/[PR #17758](https://github.com/can1357/oh-my-pi/pull/17758)已由上游合并，18.16.0官方compiled原/包装冷启动实际验证修复；不将局部源码或自编译产物用于替代验收/分发。遵守上游人工审阅要求，不冒充维护者亲自验证。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.16.0 (650f3a108229ee11bf68ba3377f4e8c3391cd424)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

