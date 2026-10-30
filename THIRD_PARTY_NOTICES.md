# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 依据OMP18.14.0官方英文完整37个注册域及导入选项独立复核。426→431项UI：新增prewalk.from/prewalk.into/out.enabled/task.file/extensionRenderers.assistantText，复核tui.autoGraph/tui.mouse/bash.gitGuard三项；其余423项不重译。8动态getter仅mouse说明变化；默认值、原value/group/凭据/保存由官方实现保持。

`src/translations/slash-commands.ts` 保存官方OMP18.14.0的88条说明、97个名称/别名。相对18.13.3，静态原文、9别名及27动态回调逐字一致；完整30命令文件仅builtin-modes变化，prewalk restart的模型参数与hint由原provider处理。viewSession、effectiveServiceTier、effort键位、descriptionMatch与原provider插入执行保持，静态门禁未放宽。

`src/stats/translations.ts` 的独立审阅基线为官方`@oh-my-pi/omp-stats@18.14.0`；94源码/74客户端，12既有源码变化、2新增。新增Search spans、Filter及追踪空态三条文案，612键/105模板；browser仅扩展对应DOM入口，数据排除及React异步处理保持。npm仅作审阅来源，运行时仍是实际官方编译CLI，在原监听器同源注入，不重新分发Stats实现或二进制。固定commit与npm的1826份coding-agent源码、127份utils、94份Stats、440份TUI源码全部逐字节一致；官方另四个HTML源码由package.files明确排除，不补造npm同源文件。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.14.0 (31147f9d1a76608549821c3759f8487b4d66c72d)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

