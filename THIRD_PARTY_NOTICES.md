# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts`依据OMP19.1.1官方英文完整注册图独立复核：644定义/483UI；19.1.1新增`todo.backend`译文，官方把`computer.backgroundFallback`改为`computer.takeover`（新增foreground/always选项，按新原文独立翻译），删除旧译文，其余481项不重译。19.1.0曾新增`tools.commands*`等十项、改译12项。仅翻译显示，不改变默认值、原value、保存、旧设置迁移、凭据或项目授权，不复用第三方中文译文。

`src/translations/slash-commands.ts`保存官方OMP19.1.1的89说明/98标识/9别名/27动态回调；19.1.1的`builtin-registry.ts`逐字节不变，`/wt`工作树Hook警告与`/computer`状态行仅执行侧变化（19.0.0曾改`/handoff`说明）。不改变候选数据、匹配排序、参数或原生插入执行。

`src/stats/translations.ts`审阅基线为官方`@oh-my-pi/omp-stats@19.1.1`；121源码中客户端仅`spotlight/Hero.tsx`、`Savings.tsx`、`Steps.tsx`说明文案变化，服务端db/shared-types/spotlight-aggregator/spotlight-measures按“plain是否限制了该结果”分开计算回取基线。946键（含按8个官方范围展开的范围说明）、156通用严格模板＋9作用域属性模板，另有6个仅用于失败原因列的原因标签与2个仅用于Gain来源列的来源标签；browser/mutations/preload不改。npm仅作审阅来源，实际运行时是官方compiled，在原监听器同源注入，不重新分发Stats实现或二进制；19.1.1真实Web完整门禁未重验。

固定官方Git树commit `31ffee513f27a01bba7d4dfbe12bae239cdc646a`（v19.1.1，完整树12090项未截断）与npm源码按Git blob比较：coding-agent 2096/2097份一致，唯一例外是发布时生成、不在Git树中的`tools/browser/relay/extension.generated.json`（Browser Relay扩展打包产物，与三面无关）；utils151、Stats121、TUI475份全同。冷摄取[Issue #17754](https://github.com/can1357/oh-my-pi/issues/17754)/[PR #17758](https://github.com/can1357/oh-my-pi/pull/17758)已由上游合并且为当前tag祖先（ahead 5844、behind 0）；当前compiled冷摄取仍须真实Web验收。不以局部源码、自编译或第三方构建代替官方制品。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v19.1.1 (31ffee513f27a01bba7d4dfbe12bae239cdc646a)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

