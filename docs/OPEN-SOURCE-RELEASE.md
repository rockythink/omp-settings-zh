# 开源发布要求

## 1. 目标仓库

- GitHub owner：`rockythink`
- Repository：`omp-settings-zh`
- 计划地址：https://github.com/rockythink/omp-settings-zh
- 可见性：Public
- License：MIT
- 默认分支：`main`

建议仓库描述：

> Simplified Chinese settings localization for official Oh My Pi — no fork, no binary patch.

建议 Topics：

- `oh-my-pi`
- `omp`
- `i18n`
- `localization`
- `chinese`
- `typescript`
- `developer-tools`

## 2. 发布原则

- 在插件入口、测试和真实 OMP 验证完成前，可以公开规划仓库，但不得发布可安装版本或宣称插件可用。
- 当前版本为 `18.5.0`，发布号对齐目标 OMP 稳定版；每个版本必须通过对应宿主核验，不能沿用旧版兼容结论。
- GitHub Release、Git tag 和 `package.json` 版本必须一致。
- 上游无设置变更也要验证依赖入口、自动检查和实际编译版，才可发布对齐版本；无需重复翻译。检测到变化先补译，任一检查失败不发布；不得重写旧标签。
- 不上传修改后的 OMP 二进制、完整 OMP 源码或第三方构建产物。
- 不在仓库中保存用户配置、凭据、会话、日志或本机绝对路径。

## 3. 首发前仓库文件

首个 Release 前至少包含：

- `README.md`
- `LICENSE`
- `CONTRIBUTING.md`
- `THIRD_PARTY_NOTICES.md`
- `package.json`
- 插件源码与翻译数据
- 单元与契约测试
- 覆盖率/漂移检查脚本
- GitHub CI 工作流
- Issue 模板：Bug、误译、OMP 兼容性
- Pull Request 模板
- `SECURITY.md`
- `CHANGELOG.md`

不为了形式创建空文件。每个文件必须包含真实可执行流程或明确项目政策。

## 4. 发布质量门禁

发布当前版本前必须：

1. `bun test` 通过；
2. `bun run check` 通过；
3. `bun run coverage:check` 显示 P0 翻译 100%；
4. 对目标 OMP 版本完成契约测试；
5. 使用真实 `omp plugin link` 安装；
6. 在真实交互式 OMP 中打开 `/settings`；
7. 验证中文搜索与原生设置编辑，源码行为契约检查覆盖六类控件语义；
8. 同一进程通过 `/settings-language` 切回原版和中文；原生禁用/卸载的生效时机必须如实说明；
9. 确认用户配置值未被翻译层修改；
10. 确认运行时没有网络请求；
11. 在实际官方编译版验证模块共享，不把源码运行成功当作编译版兼容；
12. 更新第三方来源的固定版本和许可证；
13. 从干净目录按 README 重走安装流程。

任一门禁失败不得发布。

## 5. 安装契约

仓库公开且实现完成后，README 应给出以下正式安装方式：

```sh
omp plugin install github:rockythink/omp-settings-zh
```

开发者本地验证：

```sh
omp plugin link .
```

还必须给出：

- 查看已安装插件；
- 禁用和启用插件；
- 卸载插件；
- 当前兼容 OMP 版本；
- 兼容失败时如何获取诊断信息。

命令必须在发布目标 OMP 版本上实际执行后才能进入 README。

## 6. GitHub 设置

公开后建议启用：

- Issues；
- Discussions（社区形成后再启用，首发非必需）；
- Private vulnerability reporting；
- `main` 分支合并前 CI 必须通过；
- 自动删除已合并分支；
- Dependabot 或 Renovate，仅追踪开发依赖和目标 OMP 版本；
- Release notes。

不要求复杂的多环境矩阵。首发 CI 至少覆盖 macOS 和 Linux 中一个真实 OMP 可运行环境，并对另一个平台完成类型与单元测试。

## 7. Issue 分类

建议 Labels：

- `bug`
- `translation`
- `compatibility`
- `upstream-change`
- `documentation`
- `security`
- `good first issue`
- `help wanted`

兼容性 Issue 必须附：

- OMP 版本；
- 插件版本；
- 安装方式；
- 兼容提示或日志；
- 是否仍能打开官方英文 `/settings`。

不得要求用户粘贴完整 `config.yml`。需要配置结构时使用脱敏最小片段。

## 8. Release 内容

每个 Release 说明至少包含：

- 支持的 OMP 版本；
- 翻译覆盖率；
- 新增或复核的设置路径数量；
- 设置项汉化、页签/分组保留原文的实际范围；
- `/settings-language` 使用方式与进程内语言状态说明；
- 已知英文回退项；
- 兼容层变化；
- 安装和升级命令；
- 上游版本适配说明。

不发布独立 OMP 可执行文件。插件以 Git 仓库安装为首选；是否发布 npm 包由后续实际需求决定，不作为 0.1.0 前置条件。

## 9. 对外表述边界

可以表述：

- “让官方 OMP 的设置界面显示简体中文”；
- “无需使用中文分支”；
- “未翻译项自动回退英文”；
- “运行时离线，不读取配置值”。

不得表述：

- “OMP 官方中文插件”；
- “OMP 全量汉化”；
- “兼容所有未来版本”；
- “绝不会影响 OMP”；
- 在没有真实验证时宣称某版本已兼容。
