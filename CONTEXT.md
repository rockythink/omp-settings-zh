# Project Context

## 当前项目

当前源码版本、开发依赖和真实官方宿主目标为18.12.1（内嵌Bun1.4.3）；实际发布以同版本tag和GitHub Release为准。官方 `omp update` 下载遇ECONNRESET后，用受支持的 `omp update --force` 从18.11.3升级成功；真实二进制SHA256为fa41b27d434380e99b713e4f9ced0f73eb1fc0c409fdf23a57c119971d24bac5。coding-agent/pi-utils/Stats审阅基线同为18.12.1，coding-agent同版依赖保持；官方v18.12.1对应291e055836c210f314af3f73f53244e8e9d09de8。npm Stats只是独立审阅线索，运行时仍是实际官方编译CLI。

维护最初远端main a364115/Release v18.11.1；18.11.3中间候选未发布。18.12.1运行时代码适配及资源驱动修正基线为808aa64，后续14ad3c9仅更新单main治理及发布文档；当前安装提交必须以插件锁文件和doctor现场核对，不以文档快照代替。用户批准单main收敛：原main fc689e7/package18.8.7的15个修改文件及53个未跟踪项先做仓库外私有备份，68个文件逐字节校验及历史bundle验证后，主工作区快进到远端main；旧18.10.4脏工作树以detached状态移入私有归档，原补丁保持。Windows PR #1已关闭、未合并，独立草稿d546017由非发布tag `archive/windows-support-20261018`保留，不宣称正式Windows支持。全部维护分支及Windows分支已从本地/远端移除，只保留main；用户未跟踪内容不提交。

Settings416/416：相对18.11.3仅新增advisor.continueSeverity，nit/concern/blocker原值与默认concern不变；无删除，其余译文不重复修改。新增sharpshooter.minPromptLength和statusLine.segmentOptions.pi.showProfile无UI，不补造译文。Commands86定义/94标识/27动态回调：整个命令目录、pi-tui补全和公共provider合同均未变化；switch有效层级与effort实时selector另审。Stats179包文件仅package.json、CHANGELOG、db.ts、trace.ts变化，73客户端不变；价格peer解析保留官方计算，609键/105模板不扩张。

frozen/check通过：65pass/0fail、2551断言，设置与命令漂移0，本机macOS1846显示变更（Linux CI1845）、3次可逆恢复，源码冒烟零网络。真实绝对路径编译smoke另验Settings共享元数据、link默认启动器、doctor3/1/0、JSON透传、原URL自动开页、网页语言与刷新、Bun flags/用户preload合并、空格路径0700/0600、单监听器及标准卸载；不以源码导入证明编译共享。

18.12.1 SDK使用原生HTTPS暖连，测试子进程同时拒绝fetch和Node HTTP/HTTPS/net/TLS，不继承真实凭据或代理。标准Agent异步callback拒绝返回真实ClientRequest且不创建Socket；目标compiled35秒RPC跨abort timeout存活退出0，原生HEAD与目录GET均阻断。代理暖连分支另验为fetch HEAD，在dispatch前拒绝；并非真实代理连通性证明。正式短smoke分开记录13个目录GET、2个Stats身份GET与1个无凭据HEAD，不把全部GET笼统称为目录发现。

中断门禁的最新正式轮已在转交自动URL之前，从真实compiled marker登记native PID和私有preload路径；随后对照lsof PID及目录0700/文件0600。SIGINT/SIGTERM/SIGHUP分别退出130/143/129，各2页建/2关、Stats/bridge端口关闭、已命名私有目录逐一消失、root删除；完整正常/断言失败smoke再验3页建/3关和两服务/私有目录回收。未捕获private归属时保留run账本并报错，不把端口空当目录回收证明。

驱动用pi-utils/dirs读取同一锁定VERSION，避免包根postmortem抢先exit，并关闭Puppeteer自带三类信号退出。前两次失败均留证：第一轮独占Chrome退出，第二轮遗留headless Chrome77900，已按专属Profile/精确CDP target关闭，再证实PID/端口/private目录无残留后删根。另一次lsof整段输出比较的驱动失败，source finally退出143、2页全关；改为只取p字段后正式轮通过。

更早三次信号轮仅登记页/端口/root，private路径未持久化，不能补造逐目录证明或合并冒称全部历史资源完整。最新正式轮补齐前后路径证据，不回写旧记录。该历史轮未通过；后续独立轮次须在获取资源前重新登记并验收，不回填旧记录。

新compiled干净TUI已验：Advisor启用/禁用条件、concern→nit→concern保存恢复、autoResume false→true→false、中文搜索及同进程en/zh；思考中文显示与effort英文参数隔离。Commands裸/、8个alias、2项skill中英数量与Tab展开、第三方描述、quoted文件Tab插入、原生Tab/Enter执行Settings、plan/loop开关、原生model picker Opus5.5→Sonnet5.5→Opus5.5、switch数据ID、Unicode/ASCII与Shift+Tab high→xhigh→high均保留帧。正式轮agent_start0、POST尝试0、退出0；4个HEAD/46个GET全部阻断。技能说明按官方SQLite/schema及SHA256键预置既有英文，未调用后台生成；partial/取消由已有行为回归补充，不冒称UI触发。

早期TUI失败不抹除：同步HTTP throw测试hook触发官方Cowork abort回调TDZ，并非已证明的Settings缺陷；异步拒绝修正后正式轮未发生。此前误用不支持的 `/model <id>` 被当成prompt，agent_start1、POST尝试7均dispatch前拒绝、退出130；handler throw不能阻止执行。正式轮改用原生picker及精确input白名单（实际拒绝0）。因此不能把整轮合并声称零模型请求尝试；未向模型发送请求或产生费用。

Stats真实11个可见路由中英各验，32请求/双项目4会话的原/包装JSON、10路API及4份trace逐值相等，catalog动态价格匹配；请求/工具Span抽屉、三种图表、390px/键盘、同名UI键数据/正文/错误保留、同origin语言重启保留及自然SSE/React4→5通过。估价只打开后取消，隔离环境未配置judge，没有可用报价；不点击继续、不执行评估。

官方价格口径边界（非汉化差异）：Costs与会话列表unpriced为0、费用$0.11，四份详细trace各unpriced2、费用N/A。边界为minimax-code/MiniMax-M2.1-lightning及刻意缺价的google-antigravity/Overview；db缺价返回unpriced:false，trace递增未定价。原版与包装结果完全相同，汉化层不修补官方计算，也不宣称该上游差异已经解决。

默认/命名Profile与默认/命名XDG四组合通过官方getPluginsNodeModules稳定逻辑路径及物理缓存v1→v2后8个新compiled进程发现；缺SHELL/USER/LOGNAME按真实UID读取/bin/zsh。不可用Bun时版本/JSON/summary透传、dry-run不撤销、移除本地pi-utils后标准卸载通过；保持无关shell内容与0640权限，link doctor3/1/0警告不隐藏。首次裸Bun依赖探针超时已回收，可能自动解析依赖，不能称该失败探针零外网；修正--no-install后四组合通过。

原/包装各25项HTTP合同、16项API完整响应和真实SSE heartbeat一致；原跨Host/Origin静态200不变，身份头不等于授权。真实PTY ISIG/VINTR前台Ctrl+C退出0，官方子异常、wrapper SIGKILL、父消失、非法/占用端口、空格路径及私有preload回收另验；孤儿退出码unknown。Stats网页五轮10页建/10关，生命周期含默认页15建/15关，均无剩余；精确target/PID/端口与失败驱动证据独立保存，不扩大为整个历史run总数。

默认opener未验证项：历史18.12.1原版 `/usr/bin/open` 曾按精确origin/新AX ref认领并恢复原页；包装失败轮因普通Chrome基线消失在启动前停止。后续实时桌面控制返回active:false，用户选择不控制桌面，未执行该轮默认opener。2026-10-19用户明确选择“豁免该项，实际发布”：**仅对18.12.1发布豁免真实系统默认浏览器的打开/失败回收验收，必须在Release标注未验证**；不再申请桌面控制，不以headless转交URL冒充默认opener通过。该例外不放宽其他门禁，也不自动用于后续版本。早期资源账本缺口及失败仍保留，不补造历史计数；新轮资源须独立完整回收。

单main新轮验收：真实编译版TUI完成50项通过检查、96文字帧，Settings与Commands分别复核；正式已见证BUN_OPTIONS preload的进程agent_start0、POST尝试0。首次NODE_OPTIONS未执行的无护栏轮和两项驱动断言纠正保留，不把它们改写为通过或声称全历史零外发。Stats新轮含正常/故意失败回收、11导航中英、双项目32请求、10API/4完整Trace、抽屉/图表/390px/键盘、同origin重启与SSE；8页创建/8关闭、7个Stats实例退出0，具名private/driver/Profile均回收，初始blank目标完整持久化。只有测试专属opener转交已验，不等于默认opener。官方费用口径差异仍原样记录，不由插件修补。

## 已确认的产品边界

- 使用官方二进制与原生 `/settings`，不复制设置面板。
- 当前汉化范围：416项UI元数据；相对18.11.3新增advisor.continueSeverity 1项，无删除；保留设置路径、类型、默认值、选项value、group、凭据标记、动态getter、保存与可逆恢复。
- 命令补全汉化：86个内置斜杠命令、94个命令名/别名的顶层说明、实时状态与技能数量；相对18.11.3静态与动态合同不变。只包装公共provider显示，不改命令名、参数、排序、插入和执行；第三方/未知说明、路径、模型ID保留原文。
- 页签、分组标题与硬编码操作提示保留官方原文。这是本轮适配明确确认的范围，不宣称完整 TUI 汉化。
- `/settings-language` 提供语言选择器；`zh` 挂载中文，`en` 恢复原文，无需重启，只需重新打开设置面板或命令补全列表。
- 设置语言只保留在当前进程，下次启动默认中文；设置汉化不写配置、不读当前设置值或凭据、不联网。
- 插件安装验证/扩展加载默认安装 Stats PATH 启动器，无独立启用命令。直接 `omp stats` 运行真正官方 CLI，以 Bun 启动预加载包装其页面响应，在原监听器提供同源中文 / English 脚本；不固定 npm Stats、不另起代理、不替换浏览器打开动作。正常卸载自动撤销自有启动器/PATH，dry-run 保持。
- argv、cwd、Profile、stdio、数据源、原 `--port` / `--host` 与 CLI 独立评估上下文不变；只有官方 Stats 一个服务。现有 BUN_OPTIONS 保留，预加载文件仅用于该子进程，退出清理；同 origin 的语言偏好跨刷新/路由/重启保留。会话 `/stats` 不接管，同数据目录下两入口统计范围相同、评估上下文不同。启动 Hook 不改已运行的服务，OMP/Bun 升级须真实编译版回归。
- 启动器通过官方 `pi-utils.getPluginsNodeModules()` 恢复活动 Profile／XDG 下的稳定安装包逻辑路径；不绑定当前 Git/Bun 缓存物理目录。此目录解析不读取设置值或凭据；标准卸载代码不依赖该动态导入。
- 热插拔指汉化效果开关，不改变 OMP 原生 Plugin/Extension 的安装、禁用和重载生命周期。

## 宿主事实与适配边界

- 设置由 `config/registry.ts` 注册，`config/all-settings.ts` 的 `orderedSettings()` 提供按面板顺序排列的句柄。
- `setting.definition` 是宿主共享引用；适配层动态导入 `pi-utils` 的原始 `VERSION` 与 `coding-agent/config/all-settings`。
- 静态选项可与 `/effort` 参数元数据共享来源；仅为有译文变化的选项建立描述符保留的 Settings 显示副本，原数组和原选项留给其它宿主消费者。撤销恢复字段和原数组，保留另一扩展后续编辑。
- 原生 `config/settings-ui.ts` 每次打开面板从注册表生成 entries，TUI 再生成派生定义。
- 18.4.4 编译版页签/分组共享模块的导入曾实测得到独立副本；当前保留官方页签/分组及原始 group，不拓展面板范围。
- 部分说明是可配置的只读 getter，键位图标随符号预设变化；中文模板必须保留这种动态行为，撤销时恢复原始描述符。
- 单词补全的 Apple 词典选项仅出现在 macOS；`byPlatform` 分别绑定平台原文哈希与选项集合，应用和报告共用选择逻辑。
- `/reload-plugins` 不等价于卸载已加载 Extension。立即撤销汉化用 `/settings-language en`。

## 实现不变量

- 设置适配只修改设置项显示字段；不修改 setting path、类型、默认值、选项 value、group、条件、凭据标记或保存逻辑。命令补全适配只修改返回结果的显示字段，接受补全交回原 item。
- 兼容预检先于写入；中途错误逆序回滚，恢复错误必须可见。
- 撤销恢复原始值/属性描述符，不覆盖另一扩展后续改成不同文案的字段。
- 主会话负责语言状态；子会话不能撤销主会话共享的汉化。
- 活动译文仅根据目标版本官方英文独立生成和复核；保留清楚的产品名、协议和技术缩写。Archive 是 Agent 的只读历史浏览能力，保留 Archive、archive 与 eval，不译为归档操作。
- 新增设置、未收录选项或无法匹配的动态说明安全保留官方原文。

## 维护入口

`bun run check` 执行类型、单元/宿主契约、设置覆盖/漂移、`commands:check` 全量内置命令覆盖与原文/别名/删除/标识冲突门禁，以及三轮可逆应用冒烟。命令报告复用运行时原文匹配，允许已知动态键位变化；动态状态生成逻辑、接口和实际 UI 仍需独立核验。宿主适配变化必须另在实际官方编译版验证，不能仅依赖源码运行成功或旧开发依赖。

仓库不包含定时调度器；历史外部 Orca 任务每天 Asia/Shanghai 23:00 在原工作区执行三部分维护。本轮不修改调度，未核实其当前启用状态；run completed 不证明验收或发布。即使设置或 OMP 无变化，也独立核验 Commands 注册表/动态状态/接口与 Stats 最新稳定版线索和实际运行时；不恢复固定 npm Stats 替代运行时。
- 上游适配以目标版本为编号基线，独立功能或修复递增插件补丁号；已用编号不得复用，明确记录实际宿主。上游无设置变化也须核验接口、自动检查和真实编译版；变化先补译或复核，检查失败不发布。
- 本地和远端只保留main工作分支，不再创建maintenance或feature分支。临时隔离只用detached worktree并逐轮回收；归档tag不是Release。
- 每次正式Release必须递增到未使用的版本，package.json、v版本tag与GitHub Release一致。未发布候选可沿用其已更新编号；有变化且门禁通过后必须实际发布，不能以push/main或本机升级代替，无变化不空发布。

官方上游：https://github.com/can1357/oh-my-pi

文档优先级：`docs/PRD.md` 定义需求；`docs/TECHNICAL-DESIGN.md` 定义实现；`docs/TRANSLATION-GUIDE.md` 定义译文；`docs/OPEN-SOURCE-RELEASE.md` 定义发布门禁；`CONTRIBUTING.md` 定义贡献流程。上游真实行为变化时，先核验再同步文档。
