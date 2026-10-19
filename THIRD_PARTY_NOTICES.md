# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 依据 OMP18.12.2 官方英文分领域注册表独立复核。相对18.12.1，UI416→418，新增tui.completeScrollback、computer.backgroundFallback，复核compaction.idleTimeoutSeconds的一小时缓存例外；无删除，未变译文、动态getter和选项原值保留。无UI配置不补造译文，不复制第三方中文或功能实现。

`src/translations/slash-commands.ts` 保存官方 OMP18.12.2 的86条英文说明、94个名称/别名。相对18.12.1，完整定义、27动态回调、switch有效层级、effort selector及公共provider接口不变；原生/computer status正文新增backgroundFallback不属于补全翻译范围。保留参数、会话/路径/模型ID，不复制或执行命令逻辑，动态状态独立验收。

`src/stats/translations.ts` 的独立审阅基线为官方 `@oh-my-pi/omp-stats@18.12.2`。相对18.12.1，npm179包文件仅package.json变化，92源码/73客户端逐字不变；catalog及默认judge变化由官方运行时处理。609键/105严格模板、UI白名单与数据排除保持。npm包只是审阅来源；实际官方编译CLI在原监听器通过同源Bun preload注入，不重新分发Stats实现或二进制。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.12.2 (1d5aff90b057ce7dbfe32ea557a527c1b3144b72)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

