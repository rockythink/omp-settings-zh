# Changelog

从 18.4.6 起，宿主适配以目标 OMP 稳定版编号为基线；独立插件增量使用新的补丁号并注明实际宿主，不复用已发布编号，不修改历史标签。

## [Unreleased]

### Added

- 原生 Windows 用户级 PATH 安装／卸载、实际 PE 可执行文件发现和本地编译薄 `omp.exe` 启动器；不依赖 Bash／WSL，不修改机器 PATH 或 PowerShell 执行策略，保留参数、工作目录、标准流、退出码和真正官方 update 目标
- Windows 文件／PATH 所有权预检与失败回滚、dry-run 保护、稳定包路径和用户后续 PATH 编辑保留；源码／Bun 变更在运行中 exe 锁定时暂存更新，退出后按所有权替换，失败保留可重试状态；卸载取消待更新并只按所有权清理
- 三平台 CI 与真实官方编译版的隔离默认加载／Settings／doctor／Stats／卸载冒烟；官方资产版本跟随锁定开发依赖，下载后严格校验 SHA-256

### Changed

- Stats 开启 win32 路径；短 data URL 只编码私有预加载文件名，支持空格、中文和反斜线，不改变 cwd／原 argv，不依赖 Windows 短路径或额外代理
- 生命周期守护由 POSIX shell 改为独立 Bun，避免继承凭据和 BUN_OPTIONS；Windows 保留真实 console Ctrl+C 与官方退出状态，Unix 信号语义保持

### Verification boundary

- 本机 macOS 官方 OMP 18.6.1 默认扩展加载共享中文设置、doctor、Stats 原始 JSON／同源脚本、退出、dry-run 与正常卸载已运行；真实网页中文／English 切换与刷新保留通过，端口仅官方一个监听器，结束后监听器消失
- 原生 Windows x64（Windows Server 2025、Bun 1.4.0、官方 OMP 18.6.1）已通过[三平台 CI 与官方编译版验收](https://github.com/rockythink/omp-settings-zh/actions/runs/37502068680)：60 项通过／0 失败，默认加载共享中文设置、doctor、Stats 同源脚本／原始 JSON、真实 console Ctrl+C／零退出与清理、dry-run 和正常卸载。Windows ARM64、Windows 10／11 桌面及 Windows OMP 18.6.3 未实测；未合并、打 tag 或发布。 18.6.6 历史记录及版本号保持。

## [18.6.6] - 2026-10-06

### Fixed

- Commands `/effort` 实时状态保留 `off`、`auto`、`minimal` 等官方选择器字面量；仅标签汉化，不把 `off` 误作普通开关状态“关闭”，参数说明、值、排序与执行保持原 provider
- Stats Errors 页选中错误特征后，筛选按钮的可见正文与 `title` tooltip 均保持原始错误数据；译文键同名的错误特征不再被 UI 词典翻译

### Baseline

- `omp update` 前后均为官方 OMP 18.6.1；coding-agent、pi-utils 与独立检查的 omp-stats 最新稳定版均为 18.6.1
- Settings 398 项注册表、原文哈希、选项和动态 getter 无漂移；Commands 85 条定义、93 个命令名/别名、27 个动态回调及公共补全接口无上游漂移；Stats 18.6.1 client/server 与 npm 源码逐文件对应，较 18.6.0 仅包版本变化
- Settings、Commands 与 Stats 译文变化均为 0，不重复改译

### Verified

- 冻结安装和完整门禁：57 测试／2317 断言通过；Settings 398/398、Schema 漂移 0，Commands 85/85、93 个命令名/别名及新增/删除/原文漂移 0；1747 项显示元数据变更、三轮中英文恢复、零设置网络请求
- 新启动官方 18.6.1 编译版：顶层中文补全、`effort` 的 `off` 原值及英文往返、Tab/Enter 执行原生 `/settings`、中文搜索和隔离枚举编辑通过；未发送模型请求
- 实际官方 Stats：两项目两请求覆盖十一导航页、请求抽屉、追踪时间线/canvas、键盘路由、390px 窄屏、中文/English、刷新与同 origin 重启；错误特征 `Requests` 的正文与 tooltip 在双语下均保持原文，API 响应不变
- 新 shell PATH 入口运行实际官方 CLI，原 host/port 仅一个监听器；已有用户 preload 与插件 preload 同时生效，TMPDIR 含空格时使用安全私有路径；JSON/summary/非 Stats 直通，Ctrl+C 返回 0 并清理临时目录
- 原静态跨 Origin/Host 允许与无 CORS 保持，judge GET 为 405、无操作头 POST 为 403；没有发送付费评估请求或点击费用确认
- 干净 HOME 从 GitHub main 安装 18.6.6，plugin doctor 全绿；新 shell 启动器、Stats 中英文切换、dry-run 不删除、标准卸载移除插件与自有 PATH 启动器并恢复官方 OMP 入口通过

## [18.6.5] - 2026-10-05

### Fixed

- Settings 静态选项只挂载描述符保留的显示副本，隔离官方思考元数据；原生选项保持中文，`/effort ` 参数说明始终保留官方英文，不改变选项 value、顺序、保存和补全执行
- 撤销先恢复自有选项字段，再在没有后续外部修改时恢复原数组；保留外部新增属性、替换/追加成员和文案编辑
- 官方 update 透传前将已记录官方二进制目录放在 PATH 最前，避免上游按 PATH 选择更新目标时覆盖受管启动器；不修改官方下载和校验逻辑

### Baseline

- 实际官方 OMP 从 18.6.0 更新到 18.6.1；coding-agent、pi-utils 与独立检查的 Stats 最新稳定版均为 18.6.1。开发依赖和锁文件对齐，兼容下限为 18.6.1；插件编号不代表同号宿主
- Settings 注册表、原文哈希、选项和动态 getter 无漂移；Commands 85 条定义、93 个命令名/别名与动态说明模板无变化，上游仅调整 switch 参数候选筛选/排序，原 provider 透传
- 官方 Stats client/server 源码相对 18.6.0 无差异（仅包版本变化）；复核后保留既有译文、DOM 白名单和数据排除，不新增固定 npm 运行时
- 设置/命令/Stats 译文变化均为 0，不重复改译

### Verified

- 冻结安装和完整门禁：57 测试／2310 断言通过；Settings 398/398、Schema 漂移 0，Commands 85/85、93 个命令名/别名及新增/删除/原文漂移 0；1747 项显示元数据变更、三轮中英文恢复、零设置网络请求
- 新启动官方 18.6.1 编译版：中文搜索、原生枚举编辑与恢复、中文选项和英文参数隔离，同进程语言往返，八个别名、第三方/技能/文件说明边界、Tab/Enter 接受补全并执行原生设置；plan/loop 状态往返、effort 实时变更、Unicode/ASCII 键位与 Shift+Tab 切换通过，未发送模型请求
- 实际官方 Stats：十一导航页中英文及刷新/同 origin 重启，异步 Request/Span 抽屉、追踪/图表模式、390px 和键盘通过；两项目四请求、费用 0.068，裸官方与包装 API 相同，模型/提供商/工具/路径/正文/错误和数值保持原文
- 新 shell 默认 PATH 入口运行实际官方 CLI；仅原端口一个监听器，BUN_OPTIONS 中已有 --smol/用户 preload 均保留且在编译版生效；TMPDIR 含空格时使用安全私有预加载目录，目录/文件权限 700/600
- SIGINT 返回 0、启动器 SIGKILL、父进程消失均清理自有监听器/预加载目录；JSON/summary/非 Stats 直通、显式 host/port 和官方错误保持
- API/SSE、原方法/操作头拒绝、静态跨 Origin/Host 允许行为和无 CORS 保持；没有运行付费评估。真实账户订阅数据、非空 Gain/子代理链和费用确认成功路径未实测，不宣称全量汉化


## [18.6.4] - 2026-10-04

### Fixed

- Stats 外部写入与上次中文显示相同的真实数据时，整批文本／属性来源先失效，避免切回 English 时把真实“请求”误恢复为 Requests
- Stats 表头复用后重新判定现有单元格的 UI／数据身份；保留模型、提供商、工具、项目名、路径、正文、错误、数值与 API 原文
- 补齐追踪 Minimap 固定无障碍标签、类型徽标、错误标记，以及 React 拆分的分页／范围／耗时固定片段；未知文案与 canvas 像素继续保留英文
- Commands 静态门禁仅允许 switch／loop 的已知键位变化，周围原文仍须匹配，其余命令严格比对；运行时 effort 继续保留宿主真实键位
- 修复无 SHELL／USER／LOGNAME 环境中 Bun 报告 unknown 账户名时的默认安装失败：macOS 按真实 UID 读取账户名及登录 shell，不查询系统 unknown 账户，也不猜测 shell

### Baseline

- 官方 OMP 更新前后均为 18.6.0；coding-agent、pi-utils 与独立检查的 Stats 最新稳定版均为 18.6.0，开发依赖与锁文件不需版本升级
- Settings 398/398、Schema 漂移 0，设置译文变化 0；Commands 85/85、93 个命令名／别名及静态原文漂移 0，未重复改译既有说明
- 实际官方编译版已取证中英文往返、loop／plan 状态往返、八个别名、第三方／技能／参数／文件边界及 Tab／Enter 执行原生设置；没有发送模型请求

### Verified

- 完整本地门禁：52 测试／2234 断言通过，设置及命令覆盖完整、漂移 0；1595 项显示元数据、三轮中英文恢复、零设置网络请求
- Stats 同值中文外部写入／重复属性写入及显示身份变化的浏览器 DOM 回归通过；这是 DOM 合同证据，不代表所有官方 React 状态分支均已实测
- 实际官方 Stats 编译版：十一导航页中英文往返、刷新／同 origin 重启、Request／Span 抽屉、追踪三种模式与图表模式、390px 窄屏和键盘操作通过；两项目 140 请求，recent／overview／errors／models／providers／tools API 响应切换前后逐字不变，仅官方一个监听器
- 原 API／SSE、拒绝／错误、静态跨 Origin／Host 允许行为与无 CORS 保留；现有 BUN_OPTIONS 预加载、空格临时／安装路径及退出清理通过。未触发付费评估；未配置 judge 模型时费用估算原始错误保留，不宣称已覆盖成功估价后的确认

## [18.6.3] - 2026-10-04

### Added

- 汉化 OMP 18.6.0 的 85 个内置斜杠命令及别名的顶层补全说明、实时状态与技能数量，跟随 `/settings-language zh|en`
- 通过官方公共补全包装接口适配同步、异步和 partial 结果；命令名、参数提示、值、排序与原 provider 的补全插入行为保持不变，第三方说明和参数／文件补全保持原样
- 保留 `switch` / `loop` / `effort` 的宿主动态快捷键；未匹配原文安全回退
- 新增 `bun run commands:check` 并纳入完整门禁，检测全量内置命令新增/删除、译文缺失、原文/别名漂移与标识冲突；复用显示层的动态键位原文匹配规则
- 现有 Orca 任务扩展为 Settings + Commands + Stats 三部分独立审查、真实交互门禁与报告；保留每日 23:00 Asia/Shanghai、原工作区及既有授权，未立即运行任务

### Verified

- 官方 OMP 18.6.0 编译版：中文 `/` 列表、中英文往返、模型 ID 保留、动态键位模板修复后的 `/switch`、`/loop` 与 `/effort`、Tab 插入和原生 `/settings` 打开通过；未发送模型请求
- 真实宿主源码补全：85 个内置命令说明全部汉化，命令值和排序不变；回归覆盖动态状态、语言恢复、别名、参数与第三方边界和快捷键变化
- 隔离发布快照完整门禁：46 测试 / 1633 断言通过，398/398 设置覆盖，Schema 漂移 0，85/85 内置命令（93 个命令名/别名）覆盖、原文/别名/新增/删除漂移 0；三轮设置中英文恢复通过
- 门禁增量实测：真实宿主源码 85 项顶层补全说明汉化，值/排序、逐项接受补全与英文恢复不变；Orca 保存后的名称/提示词与目标一致，其余配置（含调度）未变

## [18.6.2] - 2026-10-04

### Changed

- Stats 随插件默认安装可撤销 PATH 启动器，无独立启用命令；直接 `omp stats` 运行实际官方 CLI，打开中文 / English 网页，不覆盖原二进制
- 非 Stats、JSON、摘要及帮助透传官方；保留 argv、cwd、Profile、监听参数与 CLI 独立评估上下文
- 移除 `/stats-zh`、旧工作进程、代理与固定 Stats 运行时依赖；Bun 预加载在原服务 HTML 注入同源 JS，保留原 URL 与浏览器打开，仅一个 Stats 监听器
- 原生插件卸载自动撤销自有启动器/PATH，dry-run 保持；安装幂等与所有权保护，并同步数据范围和默认安装维护门禁
- GUI 启动缺失 SHELL 时从真实账户读取登录 shell，避免默认接入失败

### Verified

- 官方 OMP 18.6.0 的正常包安装自动生成启动器，真实默认 `omp stats` 打开中文页，无独立启用步骤
- 两项目合成数据 2 请求 / 8 tokens / $0.03；单服务 Overview API 与原编译版逐字段相同，JSON/summary 的 stdout/stderr/退出码一致，SSE 未结束时即可读取事件
- 新 shell 默认 3847 只有原 Stats 一个监听器；中文/English、刷新/费用路由、同 origin 重启、390px 窄屏与同名数据保护通过；原浏览器只打开原 URL，Ctrl+C 退出 0，标准卸载清理且 dry-run 保持
- 真实编译版验证已有 BUN_OPTIONS flags/preload 共存、空格路径、TERM/HUP/KILL/父进程清理；原静态跨 Origin/Host 200 与无 CORS 保留，未运行付费评估
- 完整检查：34 测试 / 289 断言通过，398/398 设置覆盖，Schema 漂移 0，1595 显示元数据变更 / 三轮可逆切换 / 零网络；同步现有 Orca 每日巡检的单服务门禁，不改计划或既有发布授权

## [18.6.1] - 2026-10-04

### Added

- `/stats-zh` 本地官方 Stats 网页入口与网页内中文 / English 切换按钮；同一服务地址的刷新与路由切换保留语言
- 固定官方 Stats 18.6.0 依赖，回环显示代理透传 API 与 SSE；拒绝跨域、DNS 重绑定与缺少官方操作头的修改请求
- `/stats-zh stop`、主会话关闭与父进程断开的服务清理；数据、原始错误、未知文案和 canvas 文字保持原文

### Changed

- 以插件增量版发布 Stats 入口，宿主与官方 Stats 依赖仍为 18.6.0；不覆盖已发布的 v18.6.0
- 同步设置离线与 Stats 本地服务的产品、安全、翻译和发布边界

### Verified

- 完整检查：23 项测试通过，398/398 设置覆盖，Schema 漂移 0
- 官方编译版与浏览器实测 11 个页面、语言切换/刷新、请求抽屉/追踪、图表模式与窄屏；API 与请求正文切换前后逐字不变
- 验证用户级本地安装、纯生产依赖新安装、含中文空格路径、服务复用/关闭、父进程退出与工作进程信号终止后的清理；未运行付费评估

## [18.6.0] - 2026-10-04

### Changed

- 适配 OMP 18.6.0，同步开发依赖、翻译来源、兼容提示与发布版本
- 复核 398 项设置：原文哈希、设置路径和静态选项无漂移，保留既有译文与 Agent 语义，不重复改译产品名、工具名和技术缩写
- 通过完整自动检查与官方编译版验证：中文搜索、原生设置编辑及同进程中英文切换，兼容层行为保持不变

## [18.5.1] - 2026-10-03

### Added

- 新增 `archive.enabled` 译文：保留 Archive、archive 与 eval，明确提示词历史、最近项目、过往会话和会话回顾的只读浏览语义

### Changed

- 适配 OMP 18.5.1，开发依赖、翻译来源、兼容提示与发布版本同步对齐，翻译覆盖更新为 398/398
- 复核其余 397 项，英文原文哈希和选项值无漂移，不重复改译或改变兼容层行为

## [18.5.0] - 2026-10-03

### Added

- 新增 `advisor.reviewMode`、`advisor.reviewInterval`、`tools.artifactMaxBytes` 和 `task.completionProbe` 设置译文

### Changed

- 适配 OMP 18.5.0，翻译覆盖更新为 397/397
- 同步 Advisor 积压、免打扰步骤、建议上限与目标续接模式的上游语义变化
- 全量复核既有译文，修正输入区、服务层级、Gist 回退、读取摘要、xd://、回应表情、脱敏和缓存保温等语义误译
- 文档改用当前 OMP 支持的 `omp plugin upgrade omp-settings-zh` 更新命令

## [18.4.6] - 2026-10-01

### Added

- `display.subagentLivePreview` 子 Agent 实时预览设置译文
- `ratchet.enabled` Ratchet 功能说明译文

### Changed

- `terminal.showProgress` 说明同步上下文维护期间进度与 Tern 始终开启的行为
- 翻译覆盖更新为 393/393，翻译来源与宿主开发依赖升级至 OMP 18.4.6
- `VERSION` 从原始官方 `pi-utils` 导出读取，不再加载仅为版本号所需的整个 coding-agent SDK；不修改上游源码或吞掉导入异常
- 运行时依赖声明为 `>=18.4.6 <19`；新增版本对齐发布约定，无设置变更仍须通过兼容验证

## [0.2.0] - 2026-10-01

### Added

- `/settings-language` 选择器及 `zh` / `en` 快捷参数，运行中应用或撤销汉化
- 原文快照和属性描述符恢复，主会话关闭清理，子会话不干扰主会话语言
- 保留宿主动态快捷键图标的说明模板与 getter 恢复
- 按宿主平台选择完整翻译数据变体，保留 Apple 词典补全仅在 macOS 可选的上游行为

### Changed

- 宿主基线升级为 OMP 18.4.4，依赖锁定该版本，声明范围改为 `>=18.4.4 <19`
- 设置项翻译覆盖更新为 391/391，新增或复核 90 项，移除 20 项已删除设置译文
- 适配层改为动态加载真实共享设置注册表；模块或导出失效时保留兼容提示，不阻止会话启动
- 语言转换串行执行；真实原生面板与三轮挂载/撤销纳入行为检查

### Removed

- 旧 `SETTINGS_SCHEMA` 和全局派生定义缓存适配路径
- 页签和分组标题汉化：18.4.4 编译版未暴露其共享模块，当前版本保留官方原文与排序

## [0.1.0] - Unreleased

### Added

- OMP Extension 入口，通过 `package.json#omp.extensions` 加载
- OMP 18.0.4 `/settings` 页签、分组、设置、警告和静态选项的简体中文显示元数据
- 基于官方英文原文独立生成的克制译文，保留产品名、工具名、协议和技术缩写
- 宿主结构与主版本兼容预检
- 原子 Mutation Plan、写入后验证、完整回滚和共享元数据冲突检测
- 英文回退、重复应用幂等性和一次性兼容警告
- 翻译覆盖率、选项值漂移和英文原文哈希检查
- OMP 18.0.4 契约测试、初始化冒烟检查和真实 TUI 验证流程
