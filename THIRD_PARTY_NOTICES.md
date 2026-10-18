# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 依据 OMP 18.12.1 官方英文元数据独立复核。相对18.11.3，UI415→416，仅新增advisor.continueSeverity；无删除，其余译文、动态getter和选项原值保留，不复制第三方中文或功能实现。无UI的配置项不补造译文。

`src/translations/slash-commands.ts` 保存官方 OMP18.12.1 的86条英文说明、94个名称/别名。相对18.11.3，整个命令注册表、27个动态回调、switch有效层级、effort selector及公共provider接口不变；保留参数、会话/路径/模型ID，不复制或执行命令逻辑，动态状态独立验收。

`src/stats/translations.ts` 的独立审阅基线为官方 `@oh-my-pi/omp-stats@18.12.1`。相对18.11.3，179包文件中的package.json、CHANGELOG、db.ts、trace.ts变化，73客户端文件不变；价格peer解析保留官方实现。609键/105严格模板、UI白名单与数据排除保持。npm包只是审阅来源；实际官方编译CLI在原监听器通过同源Bun preload注入，不重新分发Stats实现或二进制。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.12.1 (291e055836c210f314af3f73f53244e8e9d09de8)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

