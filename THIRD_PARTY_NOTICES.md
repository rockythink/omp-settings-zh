# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts`依据OMP19.2.1官方英文完整注册图独立复核：648定义/487UI；新增 `bash.reapBackground`（回收后台进程），其余486项/9动态getter不重译。19.2.0曾新增三项Vim设置、escalate选项并复核六项原文及九项键位哈希。仅翻译显示，不改变默认值、原value、保存、进程回收、凭据或项目授权，不复用第三方中文译文。

`src/translations/slash-commands.ts`保存官方OMP19.2.1的89说明/98标识/9别名/27动态回调；19.2.1注册表与补全接口逐字节不变，命令侧主要共用 `errorMessage`；19.2.0曾改译 `/branch` 说明并随官方迁移测试导入。不改变候选数据、匹配排序、参数或原生插入执行。

`src/stats/translations.ts`审阅基线为官方 `@oh-my-pi/omp-stats@19.2.1`；121源码中仅Frustration客户端/服务端共用 `errorMessage`，文案与DOM不变。946键（含按8个官方范围展开的范围说明）、156通用严格模板＋9作用域属性模板，另有6个仅用于失败原因列的原因标签与2个仅用于Gain来源列的来源标签；browser/mutations/preload不改。npm仅作审阅来源，实际运行时是官方compiled，在原监听器同源注入，不重新分发Stats实现或二进制；19.2.1真实Web完整门禁未完成。

固定官方Git树commit `b55cd1bb664d8ab46ddc77f2a34eb47555dbf1ac`（v19.2.1，完整树13006项未截断）与npm源码按Git blob比较：coding-agent 2794/2795份一致，唯一例外是发布时生成、不在Git树中的 `tools/browser/relay/extension.generated.json`（Browser Relay扩展打包产物，与三面无关）；utils152、Stats121、TUI163份全同。冷摄取[Issue #17754](https://github.com/can1357/oh-my-pi/issues/17754)/[PR #17758](https://github.com/can1357/oh-my-pi/pull/17758)已由上游合并且为当前tag祖先（ahead6487、behind0）；当前compiled冷摄取仍须真实Web验收。不以局部源码、自编译或第三方构建代替官方制品。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v19.2.1 (b55cd1bb664d8ab46ddc77f2a34eb47555dbf1ac)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

