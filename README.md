# omp-settings-zh

让官方 [Oh My Pi（OMP）](https://github.com/can1357/oh-my-pi) 的原生 `/settings` 设置项显示简体中文，并可在运行中切回原版。无需中文分支，不替换官方二进制，不改变设置行为。

- 当前源码版本：`18.6.0`（版本号与目标 OMP 稳定版对齐）
- 已验证宿主：OMP `18.6.0`（官方编译版与宿主源码元数据）
- 翻译覆盖：398/398 项含 UI 元数据的设置名称、说明、风险警告和静态选项
- 运行时：离线，无网络请求和遥测；不读取当前设置值或凭据，不写 `config.yml`

## 兼容范围与限制

| 插件 | 已验证 OMP | 声明的宿主范围 |
|---|---|---|
| 0.2.0 | 18.4.4 | >=18.4.4 <19 |
| 18.4.6 | 18.4.6 | >=18.4.6 <19 |
| 18.5.0 | 18.5.0 | >=18.5.0 <19 |
| 18.5.1 | 18.5.1 | >=18.5.1 <19 |
| 18.6.0 | 18.6.0 | >=18.6.0 <19 |

声明范围不等于所有版本都经过验证。内部模块或元数据结构不兼容时，插件报告兼容性错误，不冒险继续覆盖。

从 18.4.6 起，插件发布号对齐目标 OMP 稳定版。上游无设置变更时复用已有译文，但仍验证接口、完整检查和实际编译版，更新版本及兼容说明后发布。检测到设置变化时先补译或复核；检查失败不发布。历史版本和标签不覆盖。

**当前版本保留官方页签、分组标题、面板标题和操作提示。** 本插件只翻译设置项，不修改分组标识、排序或面板实现。从磁盘导入 UI 副本不能证明已修改编译宿主的共享对象；18.4.4 适配时已实测发现这种差异。

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

- `bun test`：应用、英文回退、恢复、动态说明和原生面板行为契约。
- `bun run typecheck`：TypeScript 类型检查。
- `bun run coverage:check`：设置项翻译完整性。
- `bun run drift:check`：设置路径、选项值和英文原文哈希漂移。
- `bun run smoke`：真实宿主元数据的三轮应用/撤销、原生面板派生、行为元数据不变和零网络请求检查。

面板或宿主适配变化还必须在**实际使用的官方编译版**中验证加载、中文搜索、设置编辑和同进程语言切换。源码模式通过不代表编译版共享对象可用。

## 翻译贡献

翻译按完整 setting path 和 option value 绑定，禁止按英文字符串全局替换；活动译文仅依据目标 OMP 的官方英文元数据独立生成与复核。

详见 [项目上下文](CONTEXT.md)、[产品需求](docs/PRD.md)、[技术设计](docs/TECHNICAL-DESIGN.md)、[翻译规范](docs/TRANSLATION-GUIDE.md)、[贡献指南](CONTRIBUTING.md) 和 [第三方声明](THIRD_PARTY_NOTICES.md)。

## 与上游的关系

本项目不是 Oh My Pi 官方项目。OMP 名称、源码和产品归其原作者及贡献者所有。本项目仅提供独立的简体中文设置显示元数据扩展。

## License

[MIT](LICENSE)
