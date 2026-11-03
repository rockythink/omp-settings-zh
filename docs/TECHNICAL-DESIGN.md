# omp-settings-zh 技术设计

- 实现候选：18.16.0；最新正式Release仍为18.12.6，main与源码编号不是发布证据
- 目标基线：官方OMP18.16.0/内嵌Bun1.4.4、外部Bun最低1.4.4；官方冷摄取修复已实际compiled验证，当前驱动资源回收未过，未发布；Tern可选未验证
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

18.13.1新增`tools.restrictedFolders`和`async.printWake`，睡眠说明改为仅执行轮次保持唤醒；官方Settings新增`restrictedFoldersNotProject`条件，项目级受限列表不得提升全局。翻译仍只覆盖元数据并沿用原生条件/保存，不复制审批、后台唤醒或睡眠实现；8动态getter和选项隔离不变。

18.13.3新增五项UI，复核autoResume在模型恢复失败且禁止回退时不加载旧历史的说明；其余420项/8动态getter不重译。worktreeScope默认repo，rateLimitWalksChain默认false，modeControl关闭后仍可读模式；默认值、values与原生保存不修改。新增无UI的gc.autoCompress不补造面板内容。上游五包最低Bun同步至1.4.4，必须分别验证外部启动器Bun与compiled内嵌Bun。

18.14.0新增prewalk.from/prewalk.into/out.enabled/task.file/extensionRenderers.assistantText五项UI；复核autoGraph的auto选项、mouse扩展自有链接动态说明、gitGuard主checkout与linked worktree边界。574定义/431UI，37域7文件变化，8动态getter仅mouse原文变化；官方autoGraph和openaiLiveSteering默认值变化不由插件复制。registry/all-settings和原生面板合同保持，Settings显示选项仍与effort共享原文隔离。

18.15.0完整注册图579定义/435UI：新增task.perCallModel（enum off/eval/on，默认off）与task.perCallModelAllow（array，默认[]）；复核async.widgets、task.maxEffort及导入service-tier后的tier.openai ultrafast/relay说明，其余430项不重译。37直接域递归59文件，all-settings/registry未变不能替代导入审查；8动态getter、六类控件、JSON编辑、凭据与原生保存边界保持。无UI的judgment.attemptTimeoutMs不补译。项目来源允许列表隐藏，避免提升为全局授权；插件不复制grantAuthority或模型审批。

18.16.0为582定义/438UI，新增btw.inject、composer.predictionAlternatives、hindsight.globalScope，原435项元数据/选项不变；动态getter8→9，新增Tab模板沿用原getter，不自行计算键位。新增composerPredictionsEnabled显示条件仍由原生面板判断；预测候选默认关闭，与单选同一模型请求但可能使用额外输出Token，Hindsight跨项目无标签记忆默认关闭且不覆盖项目隔离约束。注册图92条非纯类型依赖边/48来源独立复核，不改凭据/配置/保存或共享effort显示副本隔离。

## 5. Extension 生命周期与语言命令

`src/index.ts` 在 `session_start` 的主会话中默认应用中文。宿主模块加载错误在动态调用边界内捕获，转换成兼容性提示，不让入口导入错误阻止会话启动。

`/settings-language` 打开语言选择器；`/settings-language zh` 应用中文，`/settings-language en` 调用撤销。语言转换串行执行，防止重叠请求保存错误的原文快照。当前模式仅保留在该进程中，不写配置；再次启动默认中文。

子会话共享设置注册表，因此不能应用、撤销或改变主会话语言。主会话 `session_shutdown` 先设置终态 `shuttingDown`，再通过既有语言串行链等待英文恢复；排队/新到的中文请求以及等待宿主导入的启动续体不得在关闭后挂载。重复关闭仍可恢复失败重试；子会话关闭不改变终态。插件不注册同名 `settings` 命令。

18.12.6官方可延迟加载已缓存为startup-safe的扩展，晚到扩展会重放session_start；正常提交输入先等待延迟扩展完成。插件不伪造provider/快捷键注册强迫eager加载，也不添加定时等待；冷/暖首帧补全和即时/settings需真实compiled另验。已确定性复现“元数据导入等待→主关闭→导入完成”后遗留中文，修复后描述符恢复，永久回归覆盖关闭终态与迟到请求。

## 内置命令补全显示适配

`src/slash-autocomplete.ts` 使用公共 `context.ui.addAutocompleteProvider(factory)`，主会话仅注册一次，宿主重建补全时重新包装原 provider。中文开关跟随设置应用状态；不导入或修改宿主命令注册表，不注册内置同名命令。

`src/translations/slash-commands.ts`保存OMP18.16.0的88条官方说明/97名称别名；相对18.15.0全部30命令文件、9别名及27动态回调逐字节保持，不重译。另审25份接口/导入来源，8份相邻变化不改变公共provider、裸/和折叠skill同步、async/partial/AbortSignal/可选能力、descriptionMatch、viewSession、model/switch有效层级与effort实际键位。静态例外仍仅switch/loop；参数/路径/模型ID保留原文。预测候选生成需模型完成，不为验收发送请求。

显示副本通过 WeakMap 对应原 item，接受补全时交回原 provider，保留对象身份、this、光标与插入行为。其它可选能力按原 provider 的存在性和绑定透传。参数／文件补全、第三方覆盖、技能说明和未知原文不修改；`skill:` 只翻译数量。切回英文直接返回原结果，无共享对象撤销问题。
开发门禁 `scripts/check-slash-commands.ts` 从锁定官方依赖读取 `BUILTIN_SLASH_COMMAND_DEFS`，通过 `scripts/slash-report.ts` 检测新增/删除、空译文、原文/别名漂移和标识冲突；仅 switch／loop 键位例外复用 `staticText`，其它静态原文精确匹配，不因显示层支持 effort 的动态键位而放宽门禁。只在开发脚本导入注册表，不改变插件运行时的宿主边界。动态状态生成逻辑与接口须独立源码审查和真实交互验证。

18.15.0的30个命令文件27份字节不变，仅builtin-modes/builtin-session/helpers/stats-dashboard变化：`/fast ultra`参数说明扩展Codex及relay，必须保持英文；`/jobs full`调用requestJobCaptions，可能发起模型工作，不用于零请求验收；会话`/stats`、`/trace`优先openTernPage beside并断开客户端，失败回退openPath。注册表、动态回调、provider接口、裸/与折叠skill同步路径及原生补全保持。显示层不介入执行、模型选择或页面生命周期。

## Stats Web 显示适配

- `src/index.ts` 异步 ExtensionFactory 默认等待 `installLauncher()`：官方 GitHub/npm 安装验证会 await factory，每次扩展加载也幂等维护。无 Stats 启用命令；本地 link 在首次扩展加载时自动接入。
- `src/cli/install.ts` 在独立目录生成启动器、私有安装状态与可撤销的 zsh/Bash PATH 块。记录实际写出的 wrapper，以允许未来代码升级但拒绝覆盖用户改动；稳定的逻辑包路径不绑定 Git 缓存。无 SHELL 时读取账户登录 shell；macOS 的 Bun 在 USER／LOGNAME 缺失时会报告 unknown 名称，此时用 id 按真实 UID 解析后查询 dscl，Linux 按 UID 查询 getent，不猜测 shell。非 Stats、JSON、摘要和帮助直接 exec 原 OMP；只有本插件的原生 uninstall 经 main 预检所有权、执行原命令并清理自己的 PATH，dry-run 不清理。
- 安装阶段动态导入官方 `pi-utils.getPluginsNodeModules()`，与官方插件管理器使用同一活动 Profile／XDG 目录解析，恢复稳定 package link；只有该路径 realpath 与当前模块一致才使用，不复制目录业务逻辑。卸载阶段不加载此依赖。
- 官方 `update` 按 PATH 中 `omp` 的位置选择二进制替换目标；启动器只在透传 update 前将已记录官方二进制目录置于 PATH 最前，再 exec 原二进制，保留 argv/stdio。不得将受管 wrapper 作为官方更新目标。
- `main.ts` / `run.ts` 运行实际官方 `omp stats`，不导入固定 Stats 包。Web 预先构建 browser.ts 并生成私有 CJS，以合并的 `BUN_OPTIONS --preload` 加载；原 argv、cwd、Profile、stdio、port/host、官方打开策略和独立 judge 保持。没有额外代理、打开器替换或第二个 URL；信号与守护清理子进程和临时文件。18.15.0官方CLI优先Tern over，失败才用原系统opener；现有3秒强制终止与Tern5秒关闭时限的交错仅是源码推断，未动态复现，不据此修改run.ts。
- `src/stats/preload.ts` 生成自包含启动 Hook，包装 `Bun.serve(options.fetch)`，先执行原 handler；只有成功 HTML 且有官方 Stats 身份标记才注入 `/__omp-settings-zh.js`，同一监听器提供脚本。非 Stats 服务、API/SSE、拒绝/错误、方法、Host/Origin 与 CORS 行为保持。身份头不是授权；修改后的 HTML/脚本 no-store，不保留失效长度或 ETag。Bun 不可靠解析预加载的引号/空格路径，使用安全字符的私有临时路径；不改用户其它预加载参数。
- `browser.ts` 使用官方 DOM 类白名单与数据区域排除规则，译文来自 translations.ts；只修改文本节点和显示属性。WeakMap 记录原文，MutationObserver 跟随异步渲染/节点复用，切回 English 恢复。自有写入在 observer 断开期间完成；`mutations.ts` 在处理外部整批写入前失效对应来源，即使真实数据与上次中文显示相同也不恢复旧英文。表头变化重扫整表，stat 标签／chart 模式变化重扫其邻接区域；追踪 Minimap 仅翻译固定 aria-label，canvas 像素不改。
- localStorage key 为 `omp-settings-zh.stats.language`，首次默认中文；同 origin 跨刷新、路由和服务重启保留，地址改变则使用新 origin 的偏好。未知文案、API 原文、数据标识、错误与 canvas 保留。
- `/settings-language` 与网页语言独立；会话 `/stats` 保留官方行为。同数据目录下 `/stats` 与 `omp stats` 均扫描多个项目和会话，区别在独立 CLI 与会话绑定的 judge / 费用上下文，不是统计范围。
- 18.8.0 独立源码审查：query-store 及 useSyncExternalStore 替换全局重绘，最后等待者离开时取消请求，ETag 304 复用对象；追踪 canvas 新增空的 aria-hidden hover／selection overlay，既有 UI 类名、文字与数据身份不变。服务新增 serviceTier／premiumRequests 聚合及 trace 指纹缓存，原官方 API／SSE 原样复用，不在插件复制计算。
- 18.8.7 独立审查：相对 18.8.4 的 Stats 90 个源码、72 个客户端文件逐字不变，609 个键与 105 个严格模板保留。官方共享目录新增两个 CoralBricks 模型，共同 bundled cost 不变，但 Cursor／Copilot Haiku 5.5 价格兼容规则有变化；不复制计算。真实编译 CLI 的全页、API／SSE、数据边界、单监听器及生命周期须另验，源码相同不代表发布通过。
- 18.8.8 独立审查：相对 18.8.7 Stats 源码与客户端逐字不变；npm 与 GitHub 标签相互一致。官方共享目录新增 connectionBoundNativeHistory 兼容字段，formatDuration 边界取整与 Devin/Cursor 默认模型解析变化由官方运行时计算；显示层不复制。真实编译 CLI 的全页、API／SSE、数据边界、单监听器及生命周期须另验，源码相同不代表发布通过。
- 18.9.1 独立审查：既有 72 个客户端文件逐字未变，新增 favicon；frustration 的问题改从官方 prompts/judge/frustration.json 读取，原问题与开销常量不变。609 键/105 严格模板、UI 白名单、数据排除及异步节点复用处理保持。真实编译 Bun 1.4.3 的原与包装服务逐项比较：静态 POST/跨 Host/Origin 允许，OPTIONS 200 无 CORS 授权；judge 方法与操作头拒绝、原 API/SSE 不变，身份头不作为授权。
- 18.10.2 独立审查：全部92个Stats源码/73个客户端文件相对18.9.1逐字未变，609键/105模板保持。
- 18.10.3 独立审查：全部92源码/73客户端相对18.10.2逐字未变；stats-cli/openPath/utils及Bun调用合同也未变。真实编译Bun1.4.3单原监听器提供同源脚本，语言/11页/抽屉/追踪/图表/异步数据/窄屏/键盘与同origin重启另验；同名UI键的数据保持原文，不复制计算或放宽静态权限。
- 18.11.0 独立审查：全部 73 个客户端文件逐字未变，92 个 Stats 源码中 6 个服务端文件变化：recurring tariff 与 dated rate card 定价、Frustration 有效费率、初始扫描及 watcher 排除 `.omp-gc-compress-*`、Codex positional quota slot 按 family/windowLabel 分组，以及共享类型注释。原计算由官方编译版执行，不复制业务；609 键/105 模板保持。实际 API 验证 7d 跨账户合并、5h/Spark 隔离、无 windowLabel 保留 raw ID，常规会话 SSE 更新且压缩暂存不计入。
- 18.11.1 独立审查：179 个 Stats 包文件仅 package.json 不同，92 源码/73 客户端逐字不变。实际编译版发现负百分比 saved 文案未匹配，严格模板允许负号且保持符号/数值不变，609 键/105 模板数量不变；未知及数据区边界不放宽。实际 11 页、请求/Span、费用估算取消、6→7 异步渲染和同 origin 重启另验。
- 18.11.3独立审查：相对18.11.1的179包文件仅package.json变化，92源码/73客户端、stats-cli与openPath逐字不变。609键/105模板及浏览器白名单/数据排除/React整批来源失效保持，不重复改译。目标编译版另验11路由、抽屉/追踪/图表/窄屏/键盘、双项目异步4→5、原/包装HTTP/SSE与进程生命周期；原静态跨Host/Origin允许不冒称拦截。
- 18.12.1独立审查：179包文件中仅package.json、CHANGELOG、db.ts、trace.ts变化；73客户端、stats-cli与openPath不变。db与trace共享pricingPeerFor的价格peer规则，不能用客户端未变推断服务计算未变。插件不复制或修正官方费用计算；原/包装API逐值比较及价格边界观察独立记录。
- 18.12.2独立审查：Stats92源码/73客户端、stats-cli/openPath/服务handler均与18.12.1逐字不变，npm179文件仅package.json变化。官方catalog新增171/删除6行、1232既有行变化，376行cost对象变化含浮点表示差异；默认judge更新为固定版本。实际compiled的11API/4完整trace/16请求详情逐值等价与自然SSE16→17另验，插件不复制定价。网页跨Eval回调工具失败改用测试驱动纯URL队列，不改产品opener。
- 18.12.3独立审查：179个Stats包文件仅package.json版本与官方依赖变化，92源码/73客户端、stats-cli/openPath及handler均与18.12.2逐字不变。utils的路径归一化新增可选throughMissing，默认行为不变，Stats未调用；609键/105模板和browser/mutations保持。固定官方tag的7个关键运行入口与npm逐字一致；实际compiled验证仍不可省略。
- 18.12.5独立审查：Stats179包文件仅package.json变化，92源码/73客户端保持；Stats CLI、openPath、handler/API/SSE合同不变。utils抽取test-runtime与测试日志目录，不改变普通Profile/XDG/Bun启动。实际compiled十一页、双项目16→17自然SSE/React、真实heartbeat、31/34份完整API对照、12项HTTP边界、真实PTY与SIGKILL/父消失清理独立实测；测试opener转交不是默认opener验收。
- 18.12.6独立审查：179包文件仅package.json变化，92源码/73客户端保持，23份固定commit/npm运行边界来源逐字相同。catalog5900→5901模型、3增2删、保留模型价格不变；Codex持久缓存轴由官方处理，不复制计算。真实compiled十一页双语、请求/工具追踪、图表/390px/键盘、同origin重启、自然17→18更新与heartbeat、37份完整API/12项HTTP对照、PTY及崩溃清理另验；解锁后的独立run已补验真实默认/usr/bin/open的原始URL/次数、单监听器、语言刷新及正常/故意断言失败回收。
- 18.13.1独立审查：179包文件仅package.json变化，92源码/73客户端保持，118份固定commit/npm来源逐字相同。23运行边界中5份变化不改变既有Stats/openPath调用；catalog5948模型的价格仍由官方计算。真实Bun1.4.4的单原监听器与已有flags/preload合并、十一页双语/抽屉/工具Span/图表/390px/键盘、同origin重启及自然16→17更新、34/36份完整API对照实测；默认opener锁屏门禁单独阻塞，不拿受管URL转交替代。
- 18.13.3独立审查：179包文件仅package.json/CHANGELOG变化，92源码/73客户端逐字节不变；92份Stats源码及26运行边界与官方固定commit一致。最低外部Bun升至1.4.4，utils postmortem新增可延长cleanup与SIGTERM恢复提示、TUI退出DA1 drain独立验收，不用旧退出时限或尾字节假设。真实compiled十一页双语/请求与工具Span/三图表/390px与键盘、English刷新和同origin重启、自然16→17更新、36份完整API与原版逐值一致及15秒SSE心跳实测；真实默认opener仍因实时控制确认未获回应单独阻塞。catalog5948→5947、保留模型cost对象无变化，计算归官方。
- 18.13.3首次摄取未过项：原版/包装真实compiled的CDP均记录SSE版本1→2先于首次overview旧结果0完成；18秒后UI0/API16。官方query.ts的run在同键in-flight时返回，版本effect不因旧响应结束重跑，可能错过本次失效；这是官方客户端的查询/实时交错，不由插件重写、轮询或强制刷新规避。源码相同与已有数据/自然后续更新通过均不能证明冷启动门禁通过。
- 18.14.0独立审查：94源码/74客户端，12既有源码变化与2新增，其中客户端5改1增；新增Search spans/Filter/追踪空态三键，612键/105严格模板，仅新增搜索aria-label与追踪空态的对应DOM入口。server/port-conflict变更启动与端口争用处理，探针500→3000ms；未确认/无响应/无法停止的holder不擅杀，fallback临时端口，缓存requested/bound两键复用原listener。原handler/API/SSE及live摄取不变；trace离线snapshot共享组装及ETag版本3→4、parser/db变化仍归官方。query/query-store及客户端/服务live源码与18.13.3逐字相同，首次摄取失效丢失机制未修复，不重跑旧失败求确认、也不在插件强刷/轮询规避。完整网页/API/SSE/生命周期与单监听器仍各自实测，不借源码相同代证。
- 18.14.1独立审查：94份Stats源码（含74客户端）与18.14.0逐字节一致；stats-cli/openPath/commands stats保持，612键/105模板及DOM/数据边界不改。utils仅新增非获取式锁探测，plugin manager的变更不改变getPluginsNodeModules稳定目录及标准卸载边界。固定官方Git树的blob身份与npm全部1830份coding-agent、127份utils、94份Stats、440份TUI源码匹配，4个HTML源由package.files排除。query/query-store/live机制未修，原官方冷摄取门禁仍阻塞；真实编译版单监听器、原/包装API/HTTP/SSE、多页双语、抽屉/追踪/图表及资源回收另验。
- 18.15.0独立审查：97源码/77客户端，既有10改、新增CloseButton/keys/react-css类型；页面路由、10个route及追踪实现字节不变。新增关闭tooltip，613键/105模板；Card/Drawer/Stat/TranscriptList仅去CSS类型断言，不新增白名单或数据排除。browser/mutations/preload保持。
- 官方新增GET/POST `/api/close`：closable布尔、非GET/POST405、缺/错操作头403、无handler404、调用handler后202；身份头不能替代`X-Omp-Stats-Action:1`。parser排除synthetic且未执行的工具错误，db回填v2→v3，计算仍归官方。query/query-store/live逐字节未修，冷摄取门禁保持。
- Tern只认`TERN_PANE_SOCKET`+数字`TERN_PANE`，不读`PI_BROWSER_TERN`或`browser.tern`；测试opener bridge不能拦截Tern。CLI over管理关闭，会话beside成功后断开且页面归用户；两者不得混用回收规则。源码推断的注册窗口、迟到block及3秒wrapper/5秒close差异不是复现，不添加产品shim。真实compiled页面、API、信号130与block回收另验。
- 18.16.0：97源码/77客户端仅query.ts与SpanDrawer.tsx变化，服务端、DOM、导航与文案保持，613键/105模板不改。query成功结算时重检最新live版本并沿用原节流；官方#17758已进入固定tag和checksum匹配编译制品，原/包装分别确认HOME/.omp/stats.db不存在后真实GET0/SSE2交错→自动GET16、UI/API16，未强刷/切页/轮询；这是实际嵌入客户端证明，不仅是源码导入。

## 6. 检查与真实验证

- 类型检查：`bun run typecheck`。
- 单元/行为测试：翻译、未收录项回退、结构拒绝、原子回滚、共享对象冲突、可逆恢复、动态 getter。
- 宿主契约：用真实 `createSettingsHost()` 和 `getAllSettingDefs()` 证明新面板随语言变化，且控件类型、分组、默认值、条件和选项值不变。
- 设置覆盖/漂移：`bun run coverage:check`、`bun run drift:check`；命令完整覆盖/漂移：`bun run commands:check`，三者均纳入 `bun run check`。
- 冒烟：`bun run smoke` 对真实宿主进行三轮应用/撤销，检查原始 UI 恢复和零网络请求。
- 发布前：实际运行官方编译版，检查插件加载、中文搜索、原生编辑、语言选择器和同进程原版恢复。源码契约不能替代这一步。
- Commands：实际官方编译版检查顶层补全及别名、动态状态/键位、中英文恢复、参数/文件/第三方边界与 Tab/Enter 插入和原命令执行；静态门禁不能代替动态模板和交互证明。
- Stats：真实编译版验证 BUN_OPTIONS 预加载、现有参数合并与安全临时路径；从新 shell 直接 `omp stats` 确认仅原服务一个监听器，测试语言/路由/刷新/同地址重启、原 API/SSE、原授权/静态请求行为、JSON/summary、port/host、退出及默认安装/卸载。不使用源码运行代替编译版，也不触发付费评估。
- 验收资源：先登记 run、页面身份基线、专属浏览器 Profile/PID、服务 PID/port、临时路径及清理入口。冒烟用 CDP Target.getTargetInfo 登记真实 target ID，记录原自动 URL、launcher/official PID、opener bridge 端口与私有 preload 路径；实测 0700/0600、已有 --smol/用户 preload 在实际 compiled Bun 中执行、退出后私有目录消失。复用一个主标签，默认 headless；官方自动开页也计入归属。测试专属 opener 必须真实交付 URL 并观察页面，默认 /usr/bin/open 另记录真实调用/URL/新增页数；不假设 BROWSER 或不存在的 --no-open。try/finally 逐阶段先关自有页面、再停止服务并验证端口、最后回收临时目录；正常及人为断言失败分支先实测，残留阻止发布。
- 驱动信号所有权：读取VERSION使用公开pi-utils/dirs子路径，不经包根引入postmortem的异步cleanup→native exit；Puppeteer默认SIGINT会process.exit(130)，launch必须关闭handleSIGINT/handleSIGTERM/handleSIGHUP，由本驱动统一捕获并进入finally。Chrome使用清除真实凭据/代理的隔离env。18.15.0官方合同为SIGINT130/SIGTERM143/SIGHUP129，正常关闭页面或API为0；旧驱动期待SIGINT0已按实测130修正，失败账本cleanupErrors保留。页面/服务/端口/私有目录及Tern block须分别闭合，不能只检查exit130就假定finally已执行。
- 冒烟普通命令也拥有独立POSIX进程组，必须先记根PID再等待；截止向整组TERM并升级KILL，finally等待根进程及确认整组消失后才记groupClosed。成功根退出也不允许留下后代。冷GitHub派生驱动曾在根退出143后留下嵌入式安装子进程；仅按独占run argv认领回收，不把rootRemoved:true当PID回收证明。修复以真实shell后代正常/超时回归及真实compiled正常/三类中断另验。
- 18.12.1编译网络隔离：显式选择真实Anthropic模型触发无凭据暖连；仅global fetch不足，Node HTTPS经标准Agent.createConnection异步callback拒绝，不创建Socket且返回真实ClientRequest，防止同步throw触发Cowork的abort TDZ。net/TLS仍fail-closed，实际compiled35秒与TUI验证；代理分支的fetch HEAD另验。目录GET、Stats本地身份GET、HEAD分别归类；任何推理POST尝试单列，不能以agent_start handler throw充当取消。
- 私有目录必须在自动URL转交之前登记：测试user preload在真实compiled入口写入PID/argv/BUN_OPTIONS，opener bridge先读取该marker并记录native PID及私有preload，再导航唯一自有页面。后续lsof/guard argv再次对照；清理逐路径确认ENOENT，缺少归属则保留run账本报错。实测中断回归先见0700/0600和匹配PID、再见目录消失；旧的仅页/端口/root信号记录不当作逐目录证明。
- 18.10.2历史编译生命周期十项通过：原版/包装PTY实际Ctrl+C（未改termios）、官方子进程异常、launcher SIGKILL、父进程消失、等号/短参数、无效/占用端口及恢复；私有目录/端口/PID回收，SIGKILL独立guard3.816秒清理。旧fetch审计及15个GET的归类不能作为18.12.1“只有目录GET”的证明；早期允许本机目录GET的脚手架也不能证明未访问既有本机服务，失败记录不隐藏。
- compiled smoke账本固定写到运行树旁的`<run>.resources.json`，不因树删除丢失证据；任何清理失败永久记录，不由最终重试覆盖。关闭页面后查询CDP target实际消失，关闭浏览器后观察自有PID退出；服务同时验证launcher/native/guard进程组、原端口与private目录，bridge单独验端口。Bun的信号退出可能仍显示exitCode:null，启动时登记exited promise，以其结算状态统一驱动等待与升级，不反复向已退出进程发信号。
- `OMP_SMOKE_GITHUB_REF=<40位SHA>`切换到干净GitHub安装；未提供则仍走本地link。只有公开插件/依赖安装阶段允许其正常网络，之后真实compiled探针恢复无dispatch护栏；普通命令45秒、冷安装120秒截止均回收独占进程组，不复制驱动或放宽模型请求边界。
- 18.16.0 smoke额外通过原样委托的Bun.spawn记录自动opener PID/parent/原URL，bridge在导航前接入账本，`.exited`与ESRCH共同证明短生命周期opener结束；sidecar置于树外。长browser tab.run临时驱动曾在页面会话关闭后漏等launcher，产生工具宿主尚未reap的自有僵尸子进程；native/端口/private关闭不等于所有PID关闭。失败保留，不杀工具父宿主或通过全局waitpid规避；新阶段的独立成功不抹去旧清理错误。


## 7. 发布边界

源码/开发依赖/目标宿主基线为18.16.0，范围`>=18.16.0 <19`，外部Bun最低1.4.4。官方冷摄取#17758已实际compiled通过；本轮驱动资源回收仍未过（精确PID及父宿主身份保存在树外账本），默认系统opener、完整trace/同origin重启/动态更新与最终精确SHA冷安装未重验，不发布。原三面真实交互、精确最终macOS/Linux CI和完整资源门禁仍须分别通过；Tern可选未验证、不阻止明确非Tern范围，不继承历史豁免或把历史unknown说成当前持续泄漏。Windows草稿未合并，不纳入支持。

18.14.0历史轮的具名成功开页后tab.run解析失败但未留target ID，close仅release；后续共享CDP空列表不能补造独立销毁闭环，故与该轮9个已知target建/关分列。18.15.0新轮不能认领或抹除这项历史未知；本轮所有新页先登记实际target及独占Profile，按实际销毁/进程退出证据清理。已验项不能抵消未验项，也不把实现SHA的CI或冷安装代替最终证据文档SHA验收。

18.15.0官方Tern与系统fallback是不同入口，不能互相代证。Tern不在本次正式验收范围；以后明确纳入时，须取得真实pane socket/pane/block身份及关闭证据，不能靠进程/private消失宣称通过。系统浏览器仍须稳定tab/target ID及原开页合同。源码推断的Tern清理注册窗口、迟到block和3秒wrapper/5秒关闭差异未动态复现，不添加shim或改写官方时限。

每次适配先对齐开发依赖与实际宿主，独立审查Settings、Commands、Stats及全部适用真实合同，更新README、CHANGELOG、来源与安全说明。沿用现有Orca任务、每日23:00 Asia/Shanghai、原工作区及既有授权，不新增调度器；仅更新prompt明确Tern可选和候选发布判定。已有未发布适配/修复候选时，即使当天上游无更新仍继续验收；全部适用门禁通过后实际发版。只有无新变化且无待发布候选时才不空提交/空发布，三面任一适用验收未过仍不发布。

上游没有设置变更时复用现有实现和译文，仍检查导入边界、行为契约、原文哈希及实际编译版，再发布对齐版本与兼容说明。有变更则先补译或复核。旧版本与标签不重写；自动检查或实际验证失败不得发布。

本地与远端工作分支固定为main；不按宿主版本创建maintenance分支，临时隔离只用detached worktree并回收。每次正式Release版本必须高于上一Release且未使用，package.json、v版本tag、GitHub Release一致；未发布候选可继续验收，不空升编号。存在适配变化且门禁全部通过后必须实际创建tag与Release，main push和本机升级不能代替发布。


长期应推动上游提供正式设置 Locale API 和 Extension 卸载回调；接口可用后迁移并删除内部对象修改，不保留双轨实现。
