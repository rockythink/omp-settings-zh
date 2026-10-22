# Third-Party Notices

## 当前状态

`src/translations/zh-CN.ts` 依据OMP18.12.6官方英文完整37个注册域及导入选项来源独立复核。相对18.12.5，419项UI路径、原文哈希、选项及8个动态getter均无变化；82份相关来源文件逐字相同。未变译文不重写，原value/default/group/保存保持。

`src/translations/slash-commands.ts` 保存官方OMP18.12.6的87条英文说明、95个名称/别名。相对18.12.5，8别名、静态说明、27动态回调及模板不变；30命令文件中6份实现变化经独立审查，不复制命令逻辑。viewSession、effectiveServiceTier、effort键位、descriptionMatch与原provider插入执行保持。

`src/stats/translations.ts` 的独立审阅基线为官方`@oh-my-pi/omp-stats@18.12.6`。相对18.12.5，179包文件仅package.json版本/官方依赖变化，92源码/73客户端逐字不变；609键/105模板、UI白名单、数据排除及React异步处理保持。npm仅作审阅来源，运行时仍是实际官方编译CLI，在原监听器同源注入，不重新分发Stats实现或二进制。

## Oh My Pi

本项目面向并依赖 Oh My Pi，但不计划重新分发其二进制或功能源码。

- Project: Oh My Pi
- Repository: https://github.com/can1357/oh-my-pi
- License: MIT
- Baseline reviewed: v18.12.6 (45c35e40c46166dc726ccc52f5d27f40f2449f99)
- Copyright notices in the reviewed upstream license:
  - Copyright (c) 2025 Mario Zechner
  - Copyright (c) 2025-2026 Can Bölük
  - Copyright (c) 2026 Stencil Labs, Inc.

OMP 名称和项目归其原作者及贡献者所有。`omp-settings-zh` 不是 OMP 官方项目。

