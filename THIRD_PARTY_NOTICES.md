# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts`依据OMP18.14.1官方英文完整注册图独立复核：37领域及导入模块共576定义/433UI，新增providers.openai-codex.daybreak和utils/title-settings.ts中的title.refreshAfterPrompts，其余431项不重译。8动态getter、原选项/默认值/凭据/保存由宿主保持；不复用第三方中文译文。

`src/translations/slash-commands.ts`保存官方OMP18.14.1的88条说明、97个名称/别名；9别名及27动态回调相对18.14.0保持，不重译。完整30命令文件仅builtin-lifecycle/types的compact follow-up队列变化，执行逻辑不复制。viewSession、effectiveServiceTier、effort键位、descriptionMatch与原provider插入执行保持，静态门禁未放宽。

`src/stats/translations.ts`审阅基线为官方`@oh-my-pi/omp-stats@18.14.1`；94源码/74客户端与18.14.0逐字不变，612键/105模板保持，browser白名单/数据排除及React异步处理不改。npm仅作审阅来源，运行时仍为实际官方编译CLI，在原监听器同源注入。固定官方Git树blob身份与npm全部1830份coding-agent、127份utils、94份Stats、440份TUI源码匹配；另4个HTML源由package.files排除，不补造npm来源。不重新分发Stats实现或二进制。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.14.1 (c29f7c56f5530d805bb2887ade964aa55970d8e1)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

