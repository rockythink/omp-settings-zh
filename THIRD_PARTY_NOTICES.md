# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 依据 OMP 18.6.3 官方英文元数据独立复核，新增 2 项并更新 5 项原文哈希与说明，未变译文保留。未复制第三方中文分支。少量官方英文动态说明模板仅匹配 getter 键位，不含功能实现。

`src/translations/slash-commands.ts` 保存 OMP 18.6.3 官方 85 条英文说明与别名；静态文案和 27 个动态回调相对 18.6.1 未变。中文译文独立复核，保留宿主实际键位及模型、路径、目标数据，不复制命令实现。

`src/stats/translations.ts` 的英文键与模板依据官方 `@oh-my-pi/omp-stats@18.6.3` Web 源码复核；89 个源码文件相对 18.6.1 无变化。保留独立生成的既有译文，未复制第三方中文分支或业务实现。18.6.3 为审阅基线，不固定运行时：实际官方 CLI 同源 Bun preload 注入显示脚本，不重新分发 Stats 实现或二进制。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.6.3
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

