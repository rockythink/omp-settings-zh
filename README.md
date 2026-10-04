# omp-settings-zh

让官方 [Oh My Pi（OMP）](https://github.com/can1357/oh-my-pi) 的原生 `/settings` 设置项显示简体中文，并通过 `/stats-zh` 打开可中英文切换的官方 Stats 网页。无需中文分支，不替换官方二进制，不改变设置或统计计算行为。

- 当前源码版本：`18.6.1`（插件增量版本；宿主基线仍为 OMP 18.6.0）
- 已验证宿主：OMP `18.6.0`（官方编译版与宿主源码元数据）
- 翻译覆盖：398/398 项含 UI 元数据的设置名称、说明、风险警告和静态选项
- 设置汉化：离线，无网络请求和遥测；不读取当前设置值或凭据，不写 `config.yml`
- Stats：仅按需启动本地回环服务；由固定版本的官方 Stats 包读取会话和统计数据，保留其原有付费评估行为

## 兼容范围与限制

| 插件 | 已验证 OMP | 声明的宿主范围 |
|---|---|---|
| 0.2.0 | 18.4.4 | >=18.4.4 <19 |
| 18.4.6 | 18.4.6 | >=18.4.6 <19 |
| 18.5.0 | 18.5.0 | >=18.5.0 <19 |
| 18.5.1 | 18.5.1 | >=18.5.1 <19 |
| 18.6.0 | 18.6.0 | >=18.6.0 <19 |
| 18.6.1 | 18.6.0 | >=18.6.0 <19 |

声明范围不等于所有版本都经过验证。内部模块或元数据结构不兼容时，插件报告兼容性错误，不冒险继续覆盖。

从 18.4.6 起，宿主适配发布以目标 OMP 稳定版编号为基线；同一宿主基线上的独立功能或修复递增插件补丁号，不代表上游出现同号版本。已用编号不复用，实际宿主以兼容表为准。上游无设置变更时复用已有译文，但仍验证接口、完整检查和实际编译版；变化需先补译或复核，检查失败不发布。历史版本和标签不覆盖。

**设置面板保留官方页签、分组标题、面板标题和操作提示。** 设置汉化不修改分组标识、排序或面板实现。从磁盘导入 UI 副本不能证明已修改编译宿主的共享对象；18.4.4 适配时已实测发现这种差异。

Advisor、Prewalk、Mnemopi、Snapcompact、Archive、MCP、LSP、API、eval、工具名、模型名和提供商名等保留更清楚的英文形式。Archive 指 Agent 在 eval 中浏览提示词历史、项目、会话和回顾的只读能力，不是压缩包或归档操作。动态快捷键说明沿用宿主 getter 的实际键位图标；切回原版会恢复原始属性描述符。

## 安装

要求官方 OMP `>=18.6.0 <19`：

```sh
omp plugin install github:rockythink/omp-settings-zh
```

安装后重新启动 OMP，然后照常输入 `/settings`。启动默认应用中文，正常应用时保持安静。

## 运行中切换语言

```text
/settings-language       # 打开原版 / 简体中文选择器
/settings-language zh    # 挂载中文显示元数据
/settings-language en    # 撤销汉化，恢复宿主原始文案
```

无需重启；切换后重新打开 `/settings` 即可。这两个模式只影响设置文案，不控制模型回复语言。选择保留在当前进程内，下次启动默认中文，不写入用户配置。

这里的热插拔指**汉化效果即时挂载和撤销**。OMP 的原生插件安装、禁用、卸载和 `/reload-plugins` 生命周期不由本插件改写；在当前 OMP 中不能把禁用或 `/reload-plugins` 当作已加载 Extension 的即时卸载。想立即恢复原版，先执行 `/settings-language en`，再按需禁用或卸载插件。

## Stats 网页语言切换

```text
/stats-zh         # 启动或复用本地 Stats 服务并打开网页
/stats-zh stop    # 关闭插件启动的网页服务与统计工作进程
```

网页顶部提供 **中文 / English** 按钮，默认中文，切换即时生效。选择保存在该网页地址的浏览器 localStorage 中，刷新与路由切换保留；关闭服务后重新启动会分配新端口，默认中文。网页语言与 `/settings-language` 相互独立。

OMP 18.6.0 的 `omp stats` 独立启动、不加载插件；因此原命令和原始网页仍保持英文。`/stats-zh` 使用固定的 `@oh-my-pi/omp-stats@18.6.0` 官方包和额外本地显示代理，不修改官方安装文件或复制统计计算。两项服务只监听 `127.0.0.1`，退出主会话自动关闭。

译文仅覆盖已识别的界面标题、导航、说明、控件、空态和显示属性。模型、提供商、工具与项目名称、路径、请求和会话正文、原始错误、统计数值及 API 返回内容保留原文；未知文案与 canvas 内绘制的文字也保留原文，不宣称完整 Web 汉化。Frustration 的评估和费用确认继续使用官方流程，语言按钮不会发起评估。

首次启动可能由官方 Stats 包构建网页资源，需要可用的 Bun（符合项目 engines）。启动失败会显示错误；浏览器未能自动打开时可复制命令输出的本地 URL。

## 管理

```sh
omp plugin list --json
omp plugin doctor omp-settings-zh --json
omp plugin upgrade omp-settings-zh
omp plugin disable omp-settings-zh
omp plugin enable omp-settings-zh
omp plugin uninstall omp-settings-zh
```

升级、启用或禁用后重新启动 OMP，以加载新的 Extension 状态。卸载无需迁移或清理用户设置。

当前 OMP 支持按插件名更新 GitHub/npm 安装的插件：`omp plugin upgrade omp-settings-zh`。GitHub 插件重新解析安装时记录的分支或标签；固定标签不会自动跳到新标签。也可以使用 `omp plugin install github:rockythink/omp-settings-zh --force` 重新安装仓库默认分支。npm 插件更新到最新发布版本，本地 link 插件直接使用源目录文件，无需 upgrade。

`omp plugin upgrade` 不带插件名时仅更新 marketplace 插件，不会遍历 GitHub/npm 插件。当前实现的 upgrade 不处理 `--dry-run`，不要用它预览更新；需要预览重新安装时使用 `omp plugin install github:rockythink/omp-settings-zh --force --dry-run`。

## 开发与验证

```sh
bun install --frozen-lockfile
bun run check
omp plugin link . --scope project
```

- `bun test`：设置应用、英文回退、恢复、动态说明和原生面板契约；Stats 回环代理的同源安全边界与 SSE 流式透传。
- `bun run typecheck`：TypeScript 类型检查。
- `bun run coverage:check`：设置项翻译完整性。
- `bun run drift:check`：设置路径、选项值和英文原文哈希漂移。
- `bun run smoke`：真实宿主元数据的三轮应用/撤销、原生面板派生、行为元数据不变和零网络请求检查。

面板或宿主适配变化还必须在**实际使用的官方编译版**中验证加载、中文搜索、设置编辑和同进程语言切换。源码模式通过不代表编译版共享对象可用。

## 翻译贡献

翻译按完整 setting path 和 option value 绑定，禁止按英文字符串全局替换；活动译文仅依据目标 OMP 的官方英文元数据独立生成与复核。

详见 [项目上下文](CONTEXT.md)、[产品需求](docs/PRD.md)、[技术设计](docs/TECHNICAL-DESIGN.md)、[翻译规范](docs/TRANSLATION-GUIDE.md)、[贡献指南](CONTRIBUTING.md) 和 [第三方声明](THIRD_PARTY_NOTICES.md)。

## 与上游的关系

本项目不是 Oh My Pi 官方项目。OMP 名称、源码和产品归其原作者及贡献者所有。本项目提供独立的简体中文设置显示元数据与 Stats 网页显示适配。

## License

[MIT](LICENSE)
