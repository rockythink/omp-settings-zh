# 开源发布要求

## 1. 目标仓库

- GitHub owner：`rockythink`
- Repository：`omp-settings-zh`
- 计划地址：https://github.com/rockythink/omp-settings-zh
- 可见性：Public
- License：MIT
- 默认分支：`main`
- 本地与远端只维护 `main` 工作分支；不创建按版本命名的维护分支。临时隔离使用 detached worktree，完成后回收。

建议仓库描述：

> Chinese settings and slash-command autocomplete localization, plus a bilingual Stats dashboard for official Oh My Pi — no fork or binary patch.

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
- 当前源码/目标宿主候选18.15.0，内嵌与最低外部Bun均1.4.4；最新正式发布仍v18.12.6。真实默认opener已补验；此前relay断线及unknown尝试继续单列，不抹去失败。冷摄取跟踪[Issue #17754](https://github.com/can1357/oh-my-pi/issues/17754)/[修复PR #17758](https://github.com/can1357/oh-my-pi/pull/17758)，仍须含修复的官方compiled。正式验收范围由维护者确认为macOS/Linux普通终端＋系统浏览器；Tern可选，缺少闭测资格/环境不阻止该范围发布，其路径未验证、不宣称支持。原范围内三面真实compiled、安全/资源回收、精确最终macOS/Linux CI与冷安装门禁不变，全部通过前禁止创建tag/Release。
- 18.13.3实测的原官方/包装compiled首次摄取UI0/API16竞态，其query/query-store及客户端/服务live源码在18.15.0仍未变，未包含对应修复；不为确认旧失败重复运行，不在插件复制查询、轮询、强刷或修改门禁掩盖。完整Stats门禁仍未过，默认opener或Tern可验也不能单独解除发布阻塞。
- 18.14.0另有该轮资源身份未过项：omp18140-stats-managed1成功open/observe后tab.run解析失败，该次没有服务/driver目录，具名close仅返回Released，未取得target ID/独占Profile。已知target和共享CDP空列表不能补造其独立销毁证明，该轮不发布。历史缺证必须保留，但不等于已证实后续轮持续泄漏；后续轮须建立独立基线并证明本轮所有资源闭环，不能凭旧地址认领页面或宣称全历史零残留。
- 官方Tern `over`/`beside`是可选且不同的生命周期，当前未验证、不宣称支持。未安装Tern不阻止明确非Tern范围发版，也不为验收修改官方打开行为；以后明确纳入时才补齐真实环境、pane/block身份和关闭证明，系统fallback及测试opener不可代证。源码推断的注册窗口/迟到block/关闭时限差异不是动态复现，不据此添加shim。
- 18.12.3首个Stats登录shell驱动被path_helper重排，潜在调用系统open；`http://127.0.0.1:52700`的潜在原生页存在/target/关闭均unknown，详见CONTEXT与SECURITY。已知自有资源全部回收或安全重跑通过仍不能替代该轮零残留门禁；保持未发布候选，不创建tag/Release。
- **18.12.1单次授权例外（2026-10-19）**：维护者明确批准仅豁免真实系统默认浏览器的打开/失败回收验收，允许完成实际tag与GitHub Release。该项仍为未验证，Release必须显著列出；不申请或绕过桌面控制，不以测试专属opener转交当作默认opener证据。其余版本一致性、Settings、Commands、Stats headless、资源回收、最终CI和冷安装门禁全部保留；后续版本不自动继承本例外。
- GitHub Release、Git tag 和 `package.json` 版本必须一致。
- 每次正式 Release 必须比上一正式 Release 版本更高且编号未使用；尚未发布的同一候选无需反复空升补丁号。源码编号、main push 和本机安装版本都不能代替实际 tag/Release。
- 有适配或修复变化时，验收通过后实际创建对应 tag 和 GitHub Release；发布流程不能停在“代码已推送”。没有变化则不空发版。
- 上游无设置变更也要验证依赖入口、自动检查和实际编译版；检测到变化先补译，任一检查失败不发布。已用编号不得复用，选择未使用且高于已发布版本的编号，不得重写旧标签。
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
10. 确认设置汉化无网络请求；Stats 只增加同源翻译脚本，不增加代理监听器、遥测或其它业务调用；
11. 在实际官方编译版验证模块共享，不把源码运行成功当作编译版兼容；
12. 更新第三方来源的固定版本和许可证；
13. 从干净目录按 README 重走安装流程；
14. 正常安装验证Stats默认接入、无独立启用命令；新shell直接运行真实compiled `omp stats`，原host/port单监听器、原URL语言按钮、中文/English、刷新/路由/同地址重启、API/SSE（含`/api/close`权限）、原授权/静态请求行为、窄屏、BUN_OPTIONS合并、空格路径、JSON/summary、退出、默认安装/卸载/dry-run及稳定包路径全部验收，不触发付费评估。本次验收系统浏览器非Tern路径；Tern未验证须披露，但不要求取得该可选环境，也不以系统浏览器结果宣称Tern通过。
15. `bun run commands:check` 全量覆盖通过，新增/删除、静态英文/别名漂移、空译文及标识冲突为零；先核对锁定开发依赖与实际宿主一致。动态状态模板、快捷键占位及公共补全接口须从目标官方源码独立审查并通过行为回归。
16. 真实官方编译版验证 `/` 顶层列表、别名、计划/模型/循环实时状态和动态键位；同进程 `/settings-language en/zh` 切换后重新打开列表，Tab/Enter 接受补全并执行无外部副作用的原生命令；参数/文件/第三方说明、模型 ID、原值/排序/插入/执行保持不变，不发送模型请求。
   18.12.3新增descriptionMatch保护：未主动选择的纯描述命中不得因Enter误执行，Tab/主动选择仍交回原provider。model/switch/effort的viewSession焦点切换须独立回归，不以主会话静态列表覆盖替代。
   共享 Settings 选项不得向命令参数说明泄漏；实际打开原生选项和 `/effort `，分别确认中文显示与官方英文参数。官方 update 必须保留受管启动器并替换真正官方二进制。
17. Settings、Commands、Stats 独立报告各自上游变化、适用覆盖/漂移、实际验证证据与英文回退范围；任一部分未通过不得发布，不以设置或静态命令覆盖证明 Stats/动态补全已完成。
18. 仅提交本任务文件并 push 到 main；等待该最终提交在实际发布范围内的全部必需 CI 成功。当前主线为 macOS／Linux，未合并的 Windows 草稿不得混入或宣称正式支持；明确纳入 Windows 后，须补齐目标宿主的 Windows CI、已校验官方编译版资产的原生 CLI 冒烟、真实 console Ctrl+C、安装／卸载与路径边界，旧版本验收不能替代。随后从干净插件目录实际 GitHub 安装，确认包版本／来源、默认 PATH 接入、doctor、原 Stats URL 语言按钮及正常卸载／dry-run。任一失败不打 tag 或发布。
19. 任何可能开页的命令前登记独立 run、既有 page/target ID、本轮页面及浏览器 Profile/PID、服务 PID/port、临时路径和清理入口，包含上游查阅、CLI 冒烟、冷安装、服务重启的自动开页。同一 Stats 阶段复用专属 headless 主标签，最多一个即时关闭的对照页；HTTP/API/JSON/summary 不另开页。官方 Stats 无 --no-open，BROWSER 不能当作禁开保证；测试子进程专属 opener 必须将真实 URL 转交已有受管标签并观察实际网页，不能无操作/假成功，真实默认 opener 的动作/URL/次数另验。新登录 shell 在 path_helper 之后同一子命令断言 command -v open。不改系统默认浏览器、全局 PATH、官方资源或产品逻辑。不能接管时先建立可靠原生基线，按新 target 与精确 origin 认领，既有同地址页不动；无法辨认或安全关闭即停止。成功、断言失败、超时、异常及可捕获中断用 finally/退出钩子逐阶段先关明确自有页面，再停止服务、等待退出并确认端口关闭，最后清理临时文件与独占浏览器/Profile；一个失败也继续其它清理并汇总。验收前实测正常和人为断言失败分支保护原有页面；发布前报告创建/关闭/残留及端口证据，残留或失败不发布。禁止 close-all、批量 localhost 关闭、退出用户浏览器或杀非本轮服务；SIGKILL/崩溃遗留仅凭明确 run 所有权处置，身份不明只报告。

除上文明确记录的18.12.1单次默认opener验收例外外，任一门禁失败不得发布；不得扩大豁免范围或将未验证项目记为通过。

目录逻辑路径须使用实际活动 Profile／XDG 的官方解析结果，并在新进程验证，不以默认 Profile 通过替代命名 Profile。终端退出证据记录 ISIG、VINTR 和 foreground process group；只写 0x03 而未证明产生 SIGINT 的超时须保留，不能伪称代码修复或用 SIGTERM 成功替代正常 Ctrl+C。

冒烟驱动本身也须实测捕获中断：避免pi-utils包根postmortem和Puppeteer默认SIGINT抢先退出；版本常量用官方公开dirs子路径，关闭Puppeteer三类signal handler后由自身finally回收。18.15.0官方合同为SIGINT130/SIGTERM143/SIGHUP129，正常关闭页面或API为0；旧期待SIGINT0已按实测130修正，失败账本cleanupErrors保留。页面target、Tern block、Stats/bridge端口与private目录均须闭合，不能只看退出码认定清理完成。SIGKILL不能保证finally，下次只凭明确run/Profile/target/block/PID账本回收，未知身份只报告。

private preload不能等正常流程后期ps审计才登记；自动opener bridge转交URL前，先从真实compiled marker记录native PID、BUN_OPTIONS中的私有路径，再打开自有页。中断回归同时证明目录/文件0700/0600与退出后该路径ENOENT；归属未知时保留账本失败关闭，不因端口已关闭就删掉唯一追踪记录。

模型请求隔离不能只覆盖global fetch：目标compiled显式模型的原生HTTPS暖连须到达标准Agent异步无Socket拒绝，并跨abort timeout存活；代理fetch分支独立检查。目录GET、Stats身份GET、无凭据HEAD、被拒POST尝试分别记账。技能描述fixture预置官方格式缓存，不调用后台生成；未知输入在input阶段handled，不靠agent_start throw阻止费用。

### 4.1 阻塞前置与恢复

- 每轮先核验真实版本/来源、上游缺陷跟踪、浏览器身份/清理能力和必要真实终端环境。记录具体状态、证据及解除条件；区分产品失败、环境未验、驱动失败和历史unknown，不混写为“发布命令失败”。
- 外部前提明确不满足时，继续完成必要适配、驱动修复和定向回归；不反复运行无法改变发布结论的完整最终矩阵。前提解除后重新固定目标宿主/提交，再完成原有三面、CI、冷安装和回收门禁，不缩小范围、不继承旧通过记录。
- 冷摄取须核验官方合并及实际含修复的官方构建、版本/checksum和嵌入客户端；上游PR绿色、自编译、局部源码回归或插件强刷均不代证。遵守上游贡献要求，不冒充维护者亲自review/测试或自主代发实现PR。
- Tern为[官方闭测的可选产品](https://stencil.so/tern)，不是插件依赖；后续范围确认已撤销此前“缺少Tern就不发布”的要求。本次正式验收非Tern macOS/Linux普通终端＋系统浏览器，Release标注Tern未验证、不宣称支持。以后明确纳入时才要求真实应用/pane/socket/block；不得造假环境、自动注册waitlist/登录/接受条款/改变权限，产品仍原样保留官方打开行为。
- 编译版smoke默认本地link；设置`OMP_SMOKE_GITHUB_REF=<最终40位SHA>`执行真实干净GitHub安装，禁止复制工具输出生成派生脚本。运行账本保留于树外`<run>.resources.json`；成功/人为失败预检先于安装及Stats，观察真实target/PID/组/端口/private销毁。清理失败记录不可被重试抹掉，父只在逐项核对明确所有权后回收遗留脚手架。
- 检查待发布内容以最后正式tag/Release为基线，而不是只看今天上游是否更新。已有未发布候选时继续验收，全部适用门禁通过后实际创建tag与Release；仅当无新变化且无待发布候选才不空提交/空发布。Orca最终结果明确区分“已发布（真实链接/提交）”“无变化且无候选”“未发布（精确阻塞/恢复条件）”，不以completed代证。


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
- Stats 随插件默认接入，新 shell 生效，无独立启用命令；
- 正常插件卸载自动清理自有 PATH；说明 Extension 禁用和原二进制绝对路径调用的边界；
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
- “设置汉化离线，不读取配置值”；
- “通过插件入口切换官方 Stats 网页显示语言”。

不得表述：

- “OMP 官方中文插件”；
- “OMP 全量汉化”；
- “兼容所有未来版本”；
- “绝不会影响 OMP”；
- 在没有真实验证时宣称某版本已兼容。
