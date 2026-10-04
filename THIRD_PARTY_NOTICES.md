# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 仅依据 OMP 18.6.0 官方英文设置注册表元数据，由本项目使用自己的 LLM 能力独立生成和复核；未复制或改写第三方中文分支译文。文件保留少量官方英文动态说明模板，用于匹配原始 getter 的快捷键占位符，不包含 OMP 功能实现。

`src/translations/slash-commands.ts` 保存 OMP 18.6.0 官方 `BUILTIN_SLASH_COMMAND_DEFS` 的 85 条英文说明与别名，作为显示匹配来源；中文译文独立生成与复核。动态状态依据对应官方生成逻辑适配，保留宿主实际快捷键及模型、路径、目标等数据，不复制命令实现。

`src/stats/translations.ts` 的英文键与模板来自官方 `@oh-my-pi/omp-stats@18.6.0` Web 源码；中文译文独立生成，不复制第三方中文分支。18.6.0 是译文审阅基线，不是固定运行时：启动器执行实际官方 OMP，使用 Bun 预加载在其原服务注入页面脚本，不重新分发 Stats 实现或二进制。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.6.0
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

