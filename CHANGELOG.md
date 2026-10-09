# Changelog

从 18.4.6 起，宿主适配以目标 OMP 稳定版编号为基线；独立插件增量使用新的补丁号并注明实际宿主，不复用已发布编号，不修改历史标签。

## [18.8.7] - 未发布候选

### Settings

- 官方 OMP 18.8.7，开发依赖 coding-agent／pi-utils 18.8.7，宿主范围 `>=18.8.7 <19`；Settings 410/410，新增 6 项并更新 title.icons、tools.xdev 两项说明及哈希。保留语义、默认值、value、group、动态 getter、保存与恢复
- 配置专用模型压缩阈值无设置 UI；共享 effort／语速选项仅翻译 Settings 显示副本，实际 /effort 参数保持英文

### Commands

- 85 定义／93 名称别名／27 动态回调未变；新增、删除、静态英文、别名及 provider 合同变化为 0。仅更新来源，不重复改译
- 实际裸 /、折叠 skill:／技能数量、plan／loop／effort 实时状态、中英往返与原 Tab／Enter Settings 执行已有编译版证据；静态门禁不替代动态核验

### Stats

- 官方 Stats 90 源码／72 客户端文件逐字未变，保留 609 键／105 严格模板；新共享模型目录与价格规则由官方计算
- 实际 11 页、中英往返／刷新／同 origin 重启、请求抽屉／追踪／图表／窄屏／键盘、双项目、原 API 权限、单官方监听器与 SSE version 2→3／请求 5→6 通过；模型／提供商／工具／路径／正文／错误与 API 数据保留原文

### Verification boundary

- 不含 Windows 草稿的主线 frozen install／check：58 pass／0 fail，Schema 与 Commands 静态漂移 0，410/410、85/85／93 标识；原样 CLI 冒烟由真实官方绝对二进制执行
- 默认及命名 Profile／实际启用 XDG 的稳定逻辑路径、物理包迁移后新进程、无 SHELL 账户 shell、直通／dry-run／卸载通过；source-linked doctor 3 ok／1 warning／0 errors，不冒称 GitHub 冷安装
- 原 BUN_OPTIONS 与用户 preload、空格路径／TMPDIR、官方 Bun 1.4.2、SIGINT、父进程消失、wrapper SIGKILL、非法／占用端口及私有 preload 回收有实际证据
- 早期 TUI 驱动误将计划参数提交为提示，合成占位密钥返回 401；未使用真实凭据、未成功推理，该轮不计验收。后续出站网络拒绝，不把失败轮伪称零模型请求
- 默认 opener 门禁阻塞：无法获取既有浏览器页签身份，不启动无法安全回收的默认自动页；最终 macOS/Linux CI、干净 GitHub 安装与完整门禁通过前不发布。Windows PR #1 独立未合并草稿，不混入主线

## [18.8.4] - 2026-10-08

### Baseline

- 受支持 `omp update` 将真实官方宿主 18.8.0 → 18.8.3 → 18.8.4；未改官方资源或二进制，实际内嵌 Bun 1.4.2。开发依赖 coding-agent／pi-utils 锁定 18.8.4，宿主范围 `>=18.8.4 <19`；npm omp-stats 18.8.4 仅为独立源码线索
- 开始发现 GitHub 安装的插件锁版本 18.6.4 与实际 18.8.0 漂移，按相同 GitHub 来源 force install 修复；不更换来源或其它插件

### Settings

- 404/404，新增 0、原文变化 1：只更新 title.icons 说明和哈希；官方配置新增 task.agentAccountPools 不属于设置 UI。类型、默认值、value、group、凭据标记、7 个动态 getter、保存与可逆恢复不变
- 新官方编译进程实际完成中文搜索、原生图标选项编辑/恢复、同进程 en/zh 往返；`/effort ` 保持原参数英语，不泄漏设置译文

### Commands

- 85/85 定义、93 个标识（8 个别名），新增/删除/英文/别名/冲突/缺译均 0；27 个动态回调及同步/异步/partial/AbortSignal/可选能力接口未变，不重复改译
- 新编译版实际验证裸 `/`、折叠/展开 2 个技能、别名、计划/模型/循环状态、原生 Tab/Enter 接受执行、参数/文件/第三方描述边界及 en/zh 恢复；隔离真实 F8 将 effort high → xhigh，模型 ID/级别/文件名保持原文
- 18.8.4 官方模型解析增加近期使用/modelProviderOrder 偏好；显式 provider/id 真实切换保持。不复制业务逻辑，不冒称多提供商认证歧义已实测

### Stats

- 18.8.0→18.8.4 的 90 个源码／72 个客户端文件无直接变化；保留 609 个英文键和 105 个严格模板，显示白名单及数据排除不放宽
- 真实官方编译版分别验证 11 个导航页、请求抽屉/追踪、图表模式、390px 窄屏与键盘、同 origin 刷新/路由/服务重启偏好、异步 SSE 更新；合成多项目数据与译文键同名的模型/项目/工具/正文/错误保持原文，语言切换 API 数据不变
- 合并既有 --smol／用户 preload，真实 Bun.serve 单监听器/原 URL；TMPDIR 与安装代码路径含空格仍加载，私有目录 0700、文件 0600。原 handler/API/SSE/方法/Host/Origin/CORS/费用确认保持；身份头不当授权，原跨 Host/Origin 允许行为不冒称拦截
- 原官方 `/usr/bin/open` 真实调用 1 次、原 URL 新页 1 个、退出 0；语言按钮与切换可用，按 target 定向关闭。测试专属 opener 的真实转交与默认 opener 合同分开记录
- 隔离默认安装、首次 link 加载、命名 Profile/XDG 稳定逻辑路径与物理迁移、新登录 shell 无 SHELL、doctor、JSON/summary、非 Stats、dry-run 和标准卸载均实测；卸载不依赖动态目录模块。真实 PTY Ctrl+C、wrapper SIGKILL、父进程消失及非法 port 异常均确认服务/私有目录回收

### Verification and release boundaries

- 干净主线候选 frozen install 与 `bun run check`：58 通过、0 失败；Settings UI/Schema 漂移 0，Commands 全量静态门禁 0 漂移，1774 次修改、3 轮 zh/en/恢复。现有本地 smoke-cli 原样临时副本明确传目标官方绝对二进制，退出 0；不将独立 Windows 草稿混入发布
- 正常及人为断言失败清理预检先实测；每阶段记录 page/target、独占浏览器、PID/port/临时路径并先关页后停服。新 shell 的 path_helper 曾绕过专属 opener；立即停自有服务，按精确 origin、新 target/创建时间及保护基线回收该页，后续只限子进程修正 PATH。该失败不算默认 opener 门禁成功
- 早期测试驱动将控制字符当粘贴而误提交提示，占位密钥返回 401；未使用真实凭据、未成功推理。停止该轮，不计通过证据；最终 18.8.4 原生交互改用真按键、严格核验提交缓冲及网络隔离
- 最终提交 macOS/Linux CI、干净 GitHub 安装与所有本轮资源回收是发布前置条件；Windows PR #1 仍独立草稿，旧 18.6.1 证据不代表目标版本支持。升级后须重启 OMP；既有 Agent/Stats 不热注入

## [18.8.0] - 2026-10-08

### Baseline

- 官方 OMP 18.6.3 → 18.8.0；`omp update` 下载超时后，使用官方安装脚本和 SHA-256 校验的原发布资产完成升级，未修改官方二进制内容
- 开发依赖 coding-agent／pi-utils 锁定 18.8.0，支持范围 `>=18.8.0 <19`；官方 omp-stats 18.8.0 独立审阅，运行时仍为实际官方编译版 CLI

### Settings

- 覆盖 404/404，新增 SVG 渲染、文本图表、标题图标与标题生成器 4 项；复核 Advisor 冷却、Codex 提前兑换／到期回收、Claude 额度保留／到期回收、Tern 5 项变化
- 默认值、类型、选项 value、group、凭据标记、保存和可逆恢复不变；新增/英文变化已更新原文哈希，Schema 漂移 0
- 新官方编译进程实际完成中文搜索、原生布尔与枚举编辑、同进程 en/zh 切换和恢复

### Commands

- 85/85 定义、93 个命令名／别名，新增／删除／顺序／别名变化 0；更新 prewalk 的启用／重启／取消一次性模型交接说明
- 27 个动态回调与公共 provider 签名未变；新增裸 `/`／折叠 `/skill:` 同步补全回归，switch 的 effectiveServiceTier 参数保持原 provider 语义
- 新编译版实际验证顶层／别名、模型切换、plan／loop 实时状态、Unicode／ASCII 快捷键、技能数量、第三方说明、参数／文件原文、en/zh 往返与 Tab/Enter 原生执行；不发送模型请求

### Stats

- 官方源码 89→90（客户端 71→72），32 个修改、新增 query-store；复核订阅／取消／304 对象复用、追踪 overlay 与 serviceTier／premiumRequests，609 个英文键和 105 个严格模板未变，不重复改译
- 修复命名 Profile 的启动器入口绑定物理 Bun 缓存：安装阶段复用官方 getPluginsNodeModules，恢复活动 Profile／XDG 下同 realpath 的稳定逻辑包链接；默认和命名 Profile 均经真实新编译进程验证
- 真实官方 CLI＋浏览器验证 11 页、默认中文／English、刷新／路由／同 origin 重启、请求抽屉／追踪、图表、动态 DOM、窄屏及键盘；同名模型／提供商／工具／项目数据、正文、错误、数值和 API 保留
- 多项目 API 与原运行时逐字对照、实时 SSE、304／错误／原权限边界、flags／用户 preload／空格路径、单监听器、异常退出／父进程消失／SIGKILL 清理和 dry-run／标准卸载通过；原跨 Host／Origin 的静态允许行为保持，不冒称额外授权
- 原生 `/stats` 仍为官方入口，同 Agent 目录 API 与独立 CLI 完全一致；两种上下文的真实只读费用估算一致（1 条去重消息、39 字符、568 输入 Token、$0.001824）。费用确认中英文只查看后取消，未点击继续、未进行付费评估或真实账户鉴权

### Verification boundary

- 干净发布候选冻结安装与完整 check：58 pass／0 fail／2181 assertions，Settings 404/404／Schema 0，Commands 85/85／93 标识／漂移 0；三轮可逆冒烟 1774 项、零网络请求
- 首次 PTY 0x03 退出超时未记录终端信号条件，保留该失败，不冒称代码修复；后续直接／启动器及默认／显式 ISIG 四个真实终端场景均记录 VINTR=3、正确前台进程组并正常零退出和清理
- 本机原生 TUI 使用真实 PTY 交互证据；桌面处于锁定状态，未伪称窗口截图。未实测原生 Windows、Tern 专有界面或真实订阅账户窗口；本任务不包含已有独立 Windows 改动
- 只有最终提交 macOS/Linux CI、干净 GitHub 安装／doctor／默认启动器／真实 Stats／标准卸载全部通过才打 tag 和发布；已有进程须重启后加载新代码

## [18.6.7] - 2026-10-06

### Baseline

- 官方 `omp update` 从 18.6.1 升级至 18.6.3，校验发布资产 SHA-256；开发依赖锁定 coding-agent／pi-utils 18.6.3，支持范围 `>=18.6.3 <19`
- Settings 全量 400 项：新增保持思考块展开与 Muse Code 响应存储，更新生成速率、紧凑思考级别、显示器与截图尺寸 5 项说明和原文哈希；保持宿主默认值、条件和 Meta 端提示词／输出存储风险
- Commands 85 条定义／93 个标识、27 个动态回调及补全接口无漂移；Stats 89 个源码文件无漂移，复核后保留未变译文

### Fixed

- Stats Window utilization 图表 tooltip 的普通 series 标签保持原始账户名称，防止 Requests／Other (3) 等译文同名数据误译；仅明确的 Exhausted 注记与 total 固定标签翻译

### Verification boundary

- 独立发布候选 frozen install 与完整 check：56 测试、2100 断言通过；Settings 400/400、Schema 漂移 0；Commands 85/85、93 个标识和原文／别名漂移 0；1751 项显示元数据变更、三轮语言恢复、零设置网络请求
- 新启动官方 macOS OMP 18.6.3：Settings 中文搜索、原生 bool／枚举编辑与恢复、原版语言恢复、新 Muse Code 隐私说明通过；Commands 顶层列表、Tab／Enter 原生执行、models／quit 别名、effort 的 off 字面量和 plan／loop 实时状态、Unicode／ASCII 显示通过，未发送模型请求
- 真实官方 Stats：11 页中英文往返、六个时间范围快捷键、费用拆分、请求／工具抽屉与会话追踪、错误筛选原始数据、390px 语言控件、同址刷新／重启偏好保留通过；官方费用估算与双语确认只查看并取消，未执行评估
- Window utilization 账户名 Requests／Other (3)／请求 在真实官方页面的同构 DOM 边界探针中保持正文与 title，复用节点和语言往返不误译，Exhausted／Total 固定标签仍翻译；实际订阅账户窗口未接入，不以探针冒充实账户验证
- 与未注入官方服务的六类 JSON 逐字节相等；HTML 除单个同源 script 外保持，HEAD／SSE 与原方法／action header 拒绝行为保持；官方身份标记不是授权，未添加跨 Origin／Host 拦截
- 发布候选保持 argv／cwd／已有 BUN_OPTIONS；官方进程单 listener、预加载目录 0700／文件 0600；SIGINT、启动器 SIGKILL、父进程退出和真实非法端口启动失败均退出并清理自有预加载
- 干净含空格／中文 HOME 从 GitHub main 安装 18.6.7，doctor 四项全绿；编译宿主默认加载 400 项中文元数据，稳定包路径、新 shell 的 Stats 中英文／刷新、原 JSON／summary、dry-run 保留与标准卸载通过，恢复官方 OMP 入口且二进制 SHA-256 不变
- 最终发布提交仍须独立通过 macOS／Linux CI 才打标签。工作区已有 Windows 待发布改动不纳入本次提交，未验证原生 Windows；Tern 专有展开思考块条件已核对，未进行 Tern 实界面验证。原生页签／分组／硬编码操作提示、第三方命令／参数／文件说明、未知 Stats 文案与 canvas 保持官方原文


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
