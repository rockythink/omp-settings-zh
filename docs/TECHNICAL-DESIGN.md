# omp-settings-zh 技术设计

- 实现版本：18.8.8（未发布候选）
- 目标验证基线：OMP 18.8.8（内嵌 Bun 1.4.3）；完整发布门禁尚未完成
- 核心约束：不分叉、不重写设置面板、不修改设置语义

## 1. 运行边界

插件继续使用官方 `/settings`。仅覆盖设置项 UI 的 `label`、`description`、`warning` 和静态选项显示文案；不修改路径、类型、默认值、枚举值、条件、凭据标记或保存逻辑。

当前仍保留官方页签、分组标题和操作提示。18.4.4 的真实 TUI 探针曾验证磁盘 UI 模块副本与编译宿主不共享；不得把源码模式中修改副本成功当作编译版兼容，也不扩大已确认的设置项汉化范围。

热插拔范围为汉化效果：运行中挂载中文或恢复原文。原生 Plugin 安装、禁用、卸载及 `/reload-plugins` 不负责卸载当前 Extension；插件不劫持这些命令。

## 2. 宿主适配

`src/host-adapter.ts` 是 Settings 元数据的唯一导入边界。`getHostMetadata()` 异步、动态加载：

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

静态选项数组可能引用命令补全也读取的思考元数据。仅复制有显示变化的选项（保留原型/属性描述符）并挂载到该设置的 `ui.options`，不改共享原选项。选项字段先逆序恢复；显示数组成员/描述符仍由插件拥有时才恢复原数组，后续外部编辑、属性新增、成员替换或追加均保留。预检仍覆盖数组属性及显示字段可写性，失败关闭。

## 5. Extension 生命周期与语言命令

`src/index.ts` 在 `session_start` 的主会话中默认应用中文。宿主模块加载错误在动态调用边界内捕获，转换成兼容性提示，不让入口导入错误阻止会话启动。

`/settings-language` 打开语言选择器；`/settings-language zh` 应用中文，`/settings-language en` 调用撤销。语言转换串行执行，防止重叠请求保存错误的原文快照。当前模式仅保留在该进程中，不写配置；再次启动默认中文。

子会话共享设置注册表，因此不能应用、撤销或改变主会话语言。主会话 `session_shutdown` 负责撤销其修改；子会话关闭不触碰这些对象。插件不注册同名 `settings` 命令。

## 内置命令补全显示适配

`src/slash-autocomplete.ts` 使用公共 `context.ui.addAutocompleteProvider(factory)`，主会话仅注册一次，宿主重建补全时重新包装原 provider。中文开关跟随设置应用状态；不导入或修改宿主命令注册表，不注册内置同名命令。

`src/translations/slash-commands.ts` 保存 OMP 18.8.8 的 85 条官方英文、93 个命令名／别名。相对 18.8.4 静态原文、别名、27 个动态状态回调、同步／异步／partial／AbortSignal 及可选能力接口均未变；switch 仍使用 session.effectiveServiceTier(model)，effort 取当前 selector 与宿主键位。官方 18.8.8 为 /jobs 增加 kill <id>|all、/dump 增加 anon，均属参数与执行层，显示层不改译。原 provider 继续负责匹配、排…

显示副本通过 WeakMap 对应原 item，接受补全时交回原 provider，保留对象身份、this、光标与插入行为。其它可选能力按原 provider 的存在性和绑定透传。参数／文件补全、第三方覆盖、技能说明和未知原文不修改；`skill:` 只翻译数量。切回英文直接返回原结果，无共享对象撤销问题。
开发门禁 `scripts/check-slash-commands.ts` 从锁定官方依赖读取 `BUILTIN_SLASH_COMMAND_DEFS`，通过 `scripts/slash-report.ts` 检测新增/删除、空译文、原文/别名漂移和标识冲突；仅 switch／loop 键位例外复用 `staticText`，其它静态原文精确匹配，不因显示层支持 effort 的动态键位而放宽门禁。只在开发脚本导入注册表，不改变插件运行时的宿主边界。动态状态生成逻辑与接口须独立源码审查和真实交互验证。

## Stats Web 显示适配

- `src/index.ts` 异步 ExtensionFactory 默认等待 `installLauncher()`：官方 GitHub/npm 安装验证会 await factory，每次扩展加载也幂等维护。无 Stats 启用命令；本地 link 在首次扩展加载时自动接入。
- `src/cli/install.ts` 在独立目录生成启动器、私有安装状态与可撤销的 zsh/Bash PATH 块。记录实际写出的 wrapper，以允许未来代码升级但拒绝覆盖用户改动；稳定的逻辑包路径不绑定 Git 缓存。无 SHELL 时读取账户登录 shell；macOS 的 Bun 在 USER／LOGNAME 缺失时会报告 unknown 名称，此时用 id 按真实 UID 解析后查询 dscl，Linux 按 UID 查询 getent，不猜测 shell。非 Stats、JSON、摘要和帮助直接 exec 原 OMP；只有本插件的原生 uninstall 经 main 预检所有权、执行原命令并清理自己的 PATH，dry-run 不清理。
- 安装阶段动态导入官方 `pi-utils.getPluginsNodeModules()`，与官方插件管理器使用同一活动 Profile／XDG 目录解析，恢复稳定 package link；只有该路径 realpath 与当前模块一致才使用，不复制目录业务逻辑。卸载阶段不加载此依赖。
- 官方 `update` 按 PATH 中 `omp` 的位置选择二进制替换目标；启动器只在透传 update 前将已记录官方二进制目录置于 PATH 最前，再 exec 原二进制，保留 argv/stdio。不得将受管 wrapper 作为官方更新目标。
- `main.ts` / `run.ts` 运行实际官方 `omp stats`，不导入固定 Stats 包。Web 预先构建 browser.ts 并生成私有 CJS，以合并的 `BUN_OPTIONS --preload` 加载；原 argv、cwd、Profile、stdio、port/host、浏览器打开和独立 judge 保持。没有额外代理、打开器替换或第二个 URL；信号与守护清理子进程和临时文件。
- `src/stats/preload.ts` 生成自包含启动 Hook，包装 `Bun.serve(options.fetch)`，先执行原 handler；只有成功 HTML 且有官方 Stats 身份标记才注入 `/__omp-settings-zh.js`，同一监听器提供脚本。非 Stats 服务、API/SSE、拒绝/错误、方法、Host/Origin 与 CORS 行为保持。身份头不是授权；修改后的 HTML/脚本 no-store，不保留失效长度或 ETag。Bun 不可靠解析预加载的引号/空格路径，使用安全字符的私有临时路径；不改用户其它预加载参数。
- `browser.ts` 使用官方 DOM 类白名单与数据区域排除规则，译文来自 translations.ts；只修改文本节点和显示属性。WeakMap 记录原文，MutationObserver 跟随异步渲染/节点复用，切回 English 恢复。自有写入在 observer 断开期间完成；`mutations.ts` 在处理外部整批写入前失效对应来源，即使真实数据与上次中文显示相同也不恢复旧英文。表头变化重扫整表，stat 标签／chart 模式变化重扫其邻接区域；追踪 Minimap 仅翻译固定 aria-label，canvas 像素不改。
- localStorage key 为 `omp-settings-zh.stats.language`，首次默认中文；同 origin 跨刷新、路由和服务重启保留，地址改变则使用新 origin 的偏好。未知文案、API 原文、数据标识、错误与 canvas 保留。
- `/settings-language` 与网页语言独立；会话 `/stats` 保留官方行为。同数据目录下 `/stats` 与 `omp stats` 均扫描多个项目和会话，区别在独立 CLI 与会话绑定的 judge / 费用上下文，不是统计范围。
- 18.8.0 独立源码审查：query-store 及 useSyncExternalStore 替换全局重绘，最后等待者离开时取消请求，ETag 304 复用对象；追踪 canvas 新增空的 aria-hidden hover／selection overlay，既有 UI 类名、文字与数据身份不变。服务新增 serviceTier／premiumRequests 聚合及 trace 指纹缓存，原官方 API／SSE 原样复用，不在插件复制计算。
- 18.8.7 独立审查：相对 18.8.4 的 Stats 90 个源码、72 个客户端文件逐字不变，609 个键与 105 个严格模板保留。官方共享目录新增两个 CoralBricks 模型，共同 bundled cost 不变，但 Cursor／Copilot Haiku 5.5 价格兼容规则有变化；不复制计算。真实编译 CLI 的全页、API／SSE、数据边界、单监听器及生命周期须另验，源码相同不代表发布通过。
- 18.8.8 独立审查：相对 18.8.7 Stats 源码与客户端逐字不变；npm 与 GitHub 标签相互一致。官方共享目录新增 connectionBoundNativeHistory 兼容字段，formatDuration 边界取整与 Devin/Cursor 默认模型解析变化由官方运行时计算；显示层不复制。真实编译 CLI 的全页、API／SSE、数据边界、单监听器及生命周期须另验，源码相同不代表发布通过。

## 6. 检查与真实验证

- 类型检查：`bun run typecheck`。
- 单元/行为测试：翻译、未收录项回退、结构拒绝、原子回滚、共享对象冲突、可逆恢复、动态 getter。
- 宿主契约：用真实 `createSettingsHost()` 和 `getAllSettingDefs()` 证明新面板随语言变化，且控件类型、分组、默认值、条件和选项值不变。
- 设置覆盖/漂移：`bun run coverage:check`、`bun run drift:check`；命令完整覆盖/漂移：`bun run commands:check`，三者均纳入 `bun run check`。
- 冒烟：`bun run smoke` 对真实宿主进行三轮应用/撤销，检查原始 UI 恢复和零网络请求。
- 发布前：实际运行官方编译版，检查插件加载、中文搜索、原生编辑、语言选择器和同进程原版恢复。源码契约不能替代这一步。
- Commands：实际官方编译版检查顶层补全及别名、动态状态/键位、中英文恢复、参数/文件/第三方边界与 Tab/Enter 插入和原命令执行；静态门禁不能代替动态模板和交互证明。
- Stats：真实编译版验证 BUN_OPTIONS 预加载、现有参数合并与安全临时路径；从新 shell 直接 `omp stats` 确认仅原服务一个监听器，测试语言/路由/刷新/同地址重启、原 API/SSE、原授权/静态请求行为、JSON/summary、port/host、退出及默认安装/卸载。不使用源码运行代替编译版，也不触发付费评估。
- 验收资源：先登记 run、页面身份基线、专属浏览器 Profile/PID、服务 PID/port、临时路径及清理入口。复用一个主标签，默认 headless；官方自动开页也计入归属。测试专属 opener 必须真实交付 URL 并观察页面，默认 `/usr/bin/open` 另记录真实调用/URL/新增页数；不假设 BROWSER 或不存在的 --no-open。登录 shell 的 path_helper 之后在同一子命令断言 command -v open。try/finally 逐阶段先关自有页面、再停止服务并验证端口、最后回收临时目录；正常及人为断言失败分支先实测，残留阻止发布。

## 7. 发布边界

从 18.4.6 起，宿主适配以目标 OMP 稳定版编号为基线；独立功能或修复递增插件补丁号并注明实际宿主，已用编号不得复用。当前工作区候选为 18.8.8，开发依赖锁定 18.8.8，宿主范围为 `>=18.8.8 <19`；最新已发布为 18.8.4。同主版本不保证内部结构稳定；Settings 保留预检，Commands 核验原文／别名、动态生成逻辑与公共补全接口，Stats 按真实 CLI 与浏览器验证，不以固定依赖通过冒充宿主兼…

每次适配先对齐开发依赖与实际宿主，独立审查 Settings、Commands、Stats；检查设置路径/原文/选项、全量命令/别名/静态原文/动态生成逻辑/接口、Stats 实际运行时变化，再复核译文并执行自动门禁和真实编译版验证，更新 README、CHANGELOG 与第三方来源说明。沿用现有 Orca 任务（Settings + Commands + Stats），三部分独立报告；保持每日 23:00 Asia/Shanghai、原工作区及既有授权，不新增仓库调度器。无变化不空提交或空发布；任一部分未验证不得发布。

上游没有设置变更时复用现有实现和译文，仍检查导入边界、行为契约、原文哈希及实际编译版，再发布对齐版本与兼容说明。有变更则先补译或复核。旧版本与标签不重写；自动检查或实际验证失败不得发布。

长期应推动上游提供正式设置 Locale API 和 Extension 卸载回调；接口可用后迁移并删除内部对象修改，不保留双轨实现。
