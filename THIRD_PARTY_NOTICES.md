# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 依据OMP18.13.3官方英文完整37个注册域及导入选项独立复核。421→426项UI：新增display.advisorCollapsedLines、session.worktreeScope、retry.rateLimitWalksChain、tools.xdevNotices、extensionHandlers.modeControl，复核autoResume说明。其余420项及8动态getter不重译；无UI的gc.autoCompress不补造译文，原value/default/group/保存保持。

`src/translations/slash-commands.ts` 保存官方OMP18.13.3的88条说明、97个名称/别名。context/hub两条静态说明变化，新增subagents别名，其余86条、原8别名和全部27动态回调不变；完整30命令文件仅session/lifecycle两份变化，原生resume continuation不由插件复制。viewSession、effectiveServiceTier、effort键位、descriptionMatch与原provider插入执行保持，静态门禁未放宽。

`src/stats/translations.ts` 的独立审阅基线为官方`@oh-my-pi/omp-stats@18.13.3`。相对18.13.1，179包文件仅package.json/CHANGELOG变化，92源码/73客户端逐字节不变；609键/105模板、UI白名单、数据排除及React异步处理保持。npm仅作审阅来源，运行时仍是实际官方编译CLI，在原监听器同源注入，不重新分发Stats实现或二进制。全部92份Stats源码及26份运行边界与固定官方提交逐字节一致；coding-agent其余1831份源码、utils127份、TUI537份亦相同，npm生成的tool-views.generated.js不冒称Git同源文件。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.13.3 (413d278a87a69b453efabf8d1fedb9940385e8c6)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

