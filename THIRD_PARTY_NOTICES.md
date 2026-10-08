# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 依据 OMP 18.8.4 官方英文元数据独立复核；相对 18.8.0 仅 title.icons 说明变化 1 项，更新对应中文与原文哈希，其余译文保留。配置专用新增路径不纳入 UI 覆盖。未复制第三方中文分支；动态模板只匹配 getter 显示键位，不含功能实现。

`src/translations/slash-commands.ts` 保存 OMP 18.8.4 官方 85 条英文说明及 93 个命令名／别名；相对 18.8.0 静态原文、别名、27 个动态回调及公共 provider 接口均未变。裸 `/` 与折叠 `/skill:` 同步补全另经行为回归；中文独立生成，保留真实键位、模型、路径和目标数据，不复制命令实现。

`src/stats/translations.ts` 的英文键与模板依据官方 `@oh-my-pi/omp-stats@18.8.4` Web 源码独立复核：相对 18.8.0，90 个源码／72 个客户端文件无直接变化，609 个键与 105 个严格模板保留。中文独立生成，不复制第三方中文或业务实现。18.8.4 是审阅基线，不是替代运行时；实际官方编译 CLI 同源 Bun preload 注入显示脚本，不重新分发 Stats 实现或二进制。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.8.4 (40e9368ef0458fd9073329cdff4174895f91bc6b)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

