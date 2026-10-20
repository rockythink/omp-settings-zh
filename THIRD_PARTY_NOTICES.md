# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 依据 OMP18.12.3 官方英文分领域注册表独立复核。相对18.12.2，UI418→419，新增async.widgets，复核tools.approvalMode的always-ask-cached选项及说明。保留每任务首次生成规格需要widget模型角色、后续更新无需模型调用，以及文件/文件夹授权的当前会话/跨会话范围和exec仍需确认；未变译文不重写，无UI配置不补造译文。

`src/translations/slash-commands.ts` 保存官方 OMP18.12.3 的87条英文说明、95个名称/别名。相对18.12.2新增forget-approvals，既有静态原文与8个别名不变；27动态回调中model/switch/effort改读viewSession，switch仍使用宿主effectiveServiceTier。新增descriptionMatch由原provider/编辑器负责，显示包装保留原item身份与执行；不复制或执行命令逻辑。

`src/stats/translations.ts` 的独立审阅基线为官方 `@oh-my-pi/omp-stats@18.12.3`。相对18.12.2，npm179包文件仅package.json版本与官方依赖变化，92源码/73客户端逐字不变。609键/105严格模板、UI白名单与数据排除保持。npm包只是审阅来源；实际官方编译CLI在原监听器通过同源Bun preload注入，不重新分发Stats实现或二进制。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.12.3 (53a0377db6845e0dae606146130766ec92d407fd)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

