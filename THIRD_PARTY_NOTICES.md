# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts`依据OMP18.15.0官方英文完整注册图独立复核：37领域及递归导入图共59文件，579定义/435UI。新增task.perCallModel和task.perCallModelAllow，复核async.widgets、task.maxEffort与tier.openai的ultrafast/relay说明；其余430项不重译，8动态getter不变。无UI的judgment.attemptTimeoutMs不补译。模型授权、原选项/默认值/凭据/保存由宿主保持；不复用第三方中文译文。

`src/translations/slash-commands.ts`保存官方OMP18.15.0的88条说明、97个名称/别名；9别名及27动态回调相对18.14.1保持，不重译。30命令文件3改：fast ultra英文参数扩展relay、jobs full请求caption、会话Stats/trace优先Tern。执行逻辑不复制，viewSession、有效层级、effort键位、descriptionMatch及原provider插入执行边界保持。

`src/stats/translations.ts`审阅基线为官方`@oh-my-pi/omp-stats@18.15.0`；94→97源码/74→77客户端，新增Close tooltip译文，613键/105模板，browser白名单/数据排除及React异步处理不改。新增关闭API/Tern及parser/db修正仍归官方；源码审阅不等于新Tern真实验收。npm仅作审阅来源，运行时仍为实际官方编译CLI，在原监听器同源注入。固定官方Git树blob身份与npm全部1836份coding-agent、127份utils、97份Stats、440份TUI源码匹配；另4个HTML源由package.files排除，不补造npm来源。不重新分发Stats实现或二进制。

冷摄取问题另以官方main `686b5e2fb542848dc3ff1a9e36a42a8fefdd2278`进行源码级诊断，跟踪[Issue #17754](https://github.com/can1357/oh-my-pi/issues/17754)与[PR #17758](https://github.com/can1357/oh-my-pi/pull/17758)。诊断及局部修复不替代上述翻译来源/官方运行基线，不作为插件源码或第三方构建产物分发；上游贡献遵守其人工审阅要求，不由代理冒充维护者亲自验证。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.15.0 (3fedf8d53267e32a6d7521ce725fdcc4a36fdc67)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

