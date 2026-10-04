# omp-settings-zh 技术设计

- 实现版本：18.6.1
- 验证基线：OMP 18.6.0
- 核心约束：不分叉、不重写设置面板、不修改设置语义

## 1. 运行边界

插件继续使用官方 `/settings`。仅覆盖设置项 UI 的 `label`、`description`、`warning` 和静态选项显示文案；不修改路径、类型、默认值、枚举值、条件、凭据标记或保存逻辑。

当前仍保留官方页签、分组标题和操作提示。18.4.4 的真实 TUI 探针曾验证磁盘 UI 模块副本与编译宿主不共享；不得把源码模式中修改副本成功当作编译版兼容，也不扩大已确认的设置项汉化范围。

热插拔范围为汉化效果：运行中挂载中文或恢复原文。原生 Plugin 安装、禁用、卸载及 `/reload-plugins` 不负责卸载当前 Extension；插件不劫持这些命令。

## 2. 宿主适配

`src/host-adapter.ts` 是运行代码中唯一的宿主元数据导入边界。`getHostMetadata()` 异步、动态加载：

- `@oh-my-pi/pi-utils` 的原始 `VERSION`（coding-agent 包根重导出的同一常量）；
- `@oh-my-pi/pi-coding-agent/config/all-settings` 的 `orderedSettings()`。

18.4.6 npm 源码包的完整 SDK 根导入曾因 `createRatchetPrelude` 导出失效而失败。插件无需该 SDK，使用原始版本导出与设置子模块作为真实依赖边界；不修改依赖源码、不捕获后伪造版本，也不把失败检查当作通过。

每个设置由领域模块调用 `config/registry.register()` 注册。适配器按 `setting.id` 建立索引，保存原始 `setting.definition` 引用，不复制 UI、不读取当前配置值。重复 ID 视为宿主错误。
宿主接口同时记录 `process.platform`，使翻译应用与漂移报告使用相同的平台身份。

原生 `config/settings-ui.createSettingsHost()` 每次打开面板从注册表读取 UI；TUI 的 `getAllSettingDefs(entries)` 按 entries 身份缓存派生定义。插件不维护或修改这些缓存，只要求切换后重新打开面板。

## 3. 翻译数据

`LocalePack` 包含 `locale`、`sourceOmpVersion` 和按完整 setting path 索引的 `settings`。静态选项按原始 `value` 匹配。

每条设置保存官方英文元数据的 SHA-256 `sourceHash`。开发检查将页签 ID、分组标识、名称、说明、警告和静态选项一并纳入原文哈希；这里只检测分组移动，不翻译分组。

有平台限定选项的设置可提供 `byPlatform` 完整数据变体，每个变体独立绑定原文哈希和选项译文。`translations/resolve.ts` 按宿主平台返回匹配变体，未指定平台使用基础记录，不复制整个词典。应用和报告复用同一选择逻辑；不能忽略平台外选项或放宽真正的删除/原文变更检查。当前单词补全基础记录面向非 macOS，Darwin 变体包含官方 Apple 词典选项。

动态说明使用纯数据模板：中文 `description` 和官方英文 `descriptionSource` 共享具名占位符（例如 `{escape}`）。应用时保存原始 getter，读取其当前返回值并按英文模板捕获实际键位图标，再插入中文模板。不导入另一份 TUI 键位格式器，不复制宿主按键逻辑。

英文模板无法匹配时保留当前官方说明，避免猜测键位。模板不包含执行代码；普通静态说明没有渲染时查表。

## 4. 应用与撤销

`applyTranslations()`：

1. 检查宿主主版本、注册表、UI 和静态选项结构。
2. 构建完整 Mutation Plan，只定位设置项显示字段。
3. 合并共享对象上的重复写入；译文冲突则停止。
4. 检查属性可写性；动态 getter 必须可配置，冻结对象失败关闭。
5. 保存字段原值和原始属性描述符。
6. 应用并验证每项写入；中途失败则逆序回滚，并报告恢复错误。
7. 成功返回 `restore()`，用于显式撤销和会话关闭清理。

撤销恢复原始 getter 或数据属性，并删除原来不存在的属性。重复撤销不重复写入；另一扩展后续改成不同文案时，不覆盖其编辑。恢复被宿主拒绝时必须明确提示错误，不宣称已经恢复。

## 5. Extension 生命周期与语言命令

`src/index.ts` 在 `session_start` 的主会话中默认应用中文。宿主模块加载错误在动态调用边界内捕获，转换成兼容性提示，不让入口导入错误阻止会话启动。

`/settings-language` 打开语言选择器；`/settings-language zh` 应用中文，`/settings-language en` 调用撤销。语言转换串行执行，防止重叠请求保存错误的原文快照。当前模式仅保留在该进程中，不写配置；再次启动默认中文。

子会话共享设置注册表，因此不能应用、撤销或改变主会话语言。主会话 `session_shutdown` 负责撤销其修改；子会话关闭不触碰这些对象。插件不注册同名 `settings` 命令。

## Stats Web 显示适配

- `src/index.ts` 异步 ExtensionFactory 默认等待 `installLauncher()`：官方 GitHub/npm 安装验证会 await factory，每次扩展加载也幂等维护。无 Stats 启用命令；本地 link 在首次扩展加载时自动接入。
- `src/cli/install.ts` 在独立目录生成启动器、私有安装状态与可撤销的 zsh/Bash PATH 块。记录实际写出的 wrapper，以允许未来代码升级但拒绝覆盖用户改动；稳定的逻辑包路径不绑定 Git 缓存。非 Stats、JSON、摘要和帮助直接 exec 原 OMP；只有本插件的原生 uninstall 经 main 预检所有权、执行原命令并清理自己的 PATH，dry-run 不清理。
- `main.ts` / `run.ts` 运行实际官方 `omp stats`，不导入固定 Stats 包。Web 预先构建 browser.ts 并生成私有 CJS，以合并的 `BUN_OPTIONS --preload` 加载；原 argv、cwd、Profile、stdio、port/host、浏览器打开和独立 judge 保持。没有额外代理、打开器替换或第二个 URL；信号与守护清理子进程和临时文件。
- `src/stats/preload.ts` 生成自包含启动 Hook，包装 `Bun.serve(options.fetch)`，先执行原 handler；只有成功 HTML 且有官方 Stats 身份标记才注入 `/__omp-settings-zh.js`，同一监听器提供脚本。非 Stats 服务、API/SSE、拒绝/错误、方法、Host/Origin 与 CORS 行为保持。身份头不是授权；修改后的 HTML/脚本 no-store，不保留失效长度或 ETag。Bun 不可靠解析预加载的引号/空格路径，使用安全字符的私有临时路径；不改用户其它预加载参数。
- `browser.ts` 使用官方 DOM 类白名单与数据区域排除规则，译文来自 translations.ts；只修改文本节点和显示属性。WeakMap 记录原文，MutationObserver 跟随异步渲染/节点复用，切回 English 恢复。
- localStorage key 为 `omp-settings-zh.stats.language`，首次默认中文；同 origin 跨刷新、路由和服务重启保留，地址改变则使用新 origin 的偏好。未知文案、API 原文、数据标识、错误与 canvas 保留。
- `/settings-language` 与网页语言独立；会话 `/stats` 保留官方行为。同数据目录下 `/stats` 与 `omp stats` 均扫描多个项目和会话，区别在独立 CLI 与会话绑定的 judge / 费用上下文，不是统计范围。

## 6. 检查与真实验证

- 类型检查：`bun run typecheck`。
- 单元/行为测试：翻译、未收录项回退、结构拒绝、原子回滚、共享对象冲突、可逆恢复、动态 getter。
- 宿主契约：用真实 `createSettingsHost()` 和 `getAllSettingDefs()` 证明新面板随语言变化，且控件类型、分组、默认值、条件和选项值不变。
- 覆盖/漂移：`bun run coverage:check`、`bun run drift:check`。
- 冒烟：`bun run smoke` 对真实宿主进行三轮应用/撤销，检查原始 UI 恢复和零网络请求。
- 发布前：实际运行官方编译版，检查插件加载、中文搜索、原生编辑、语言选择器和同进程原版恢复。源码契约不能替代这一步。
- Stats：真实编译版验证 BUN_OPTIONS 预加载、现有参数合并与安全临时路径；从新 shell 直接 `omp stats` 确认仅原服务一个监听器，测试语言/路由/刷新/同地址重启、原 API/SSE、原授权/静态请求行为、JSON/summary、port/host、退出及默认安装/卸载。不使用源码运行代替编译版，也不触发付费评估。

## 7. 发布边界

从 18.4.6 起，宿主适配以目标 OMP 稳定版编号为基线；独立功能或修复递增补丁号并注明实际宿主，已用编号不得复用。当前版本为 18.6.2，开发依赖锁定 18.6.0，宿主范围为 `>=18.6.0 <19`。同主版本不保证内部结构稳定；Settings 保留预检，Stats 按真实 CLI 与浏览器验证，不以固定依赖通过冒充宿主兼容。

每次适配先更新开发依赖，检查路径/原文/选项差异，独立复核翻译，运行自动检查和实际编译版，再更新 README、CHANGELOG 与第三方来源说明。定时巡检使用现有 Orca 外部任务；本次仅同步单服务验证合同，不新增仓库调度器、修改计划或扩大发布授权。

上游没有设置变更时复用现有实现和译文，仍检查导入边界、行为契约、原文哈希及实际编译版，再发布对齐版本与兼容说明。有变更则先补译或复核。旧版本与标签不重写；自动检查或实际验证失败不得发布。

长期应推动上游提供正式设置 Locale API 和 Extension 卸载回调；接口可用后迁移并删除内部对象修改，不保留双轨实现。
