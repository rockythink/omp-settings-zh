# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts`依据OMP18.17.0官方英文完整注册图独立复核：602定义/450UI，新增12项、复核7项，原431项不重译、9动态getter保持。112条非类型相对导入边/63来源（含提示资源）；仅翻译显示，不改变默认值、原value、保存、凭据或项目授权，不复用第三方中文译文。

`src/translations/slash-commands.ts`保存官方OMP18.17.0的89说明/98标识/9别名/27动态回调；新增unpin，原88项静态文案及动态模板保持。透明保留新增同步模型提及补全能力，不改变候选数据、匹配排序、参数或原生插入执行。

`src/stats/translations.ts`审阅基线为官方`@oh-my-pi/omp-stats@18.17.0`；119源码/95客户端，新增Spotlight导航、页面与诊断。893键、150通用严格模板＋9作用域属性模板；仅调整审阅DOM/数据边界，mutations/preload不改。npm仅作审阅来源，实际运行时是官方compiled，在原监听器同源注入，不重新分发Stats实现或二进制。

固定官方Git树commit `75e7801e247d4e3263439d4cc08ccad60dc64bdd`的blob身份与npm全部1928份coding-agent、130份utils、119份Stats、457份TUI源码匹配；4个HTML源由package.files排除，不补造包内来源。冷摄取[Issue #17754](https://github.com/can1357/oh-my-pi/issues/17754)/[PR #17758](https://github.com/can1357/oh-my-pi/pull/17758)已由上游合并，18.17.0包含合并提交且查询修复源码保持；18.16.0官方compiled实际修复证据保留，但不替代新版完整验收。不以局部源码、自编译或第三方构建代替官方制品。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.17.0 (75e7801e247d4e3263439d4cc08ccad60dc64bdd)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

