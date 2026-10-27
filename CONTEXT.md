# Project Context

## 18.13.1 当前维护候选（未发布）

现场起点：本地/远端main同为b7298a164c3d110df3f297504ae061719af21ad0，package/真实宿主/GitHub来源插件均18.12.6；正式tag和Release已为v18.12.6，精确提交CI39822109557成功。Windows PR #1仍CLOSED、isDraft:true、mergedAt:null，保护42项既有未跟踪内容，不混入主线。

官方coding-agent、pi-utils、Stats最新稳定版均18.13.1，coding-agent精确依赖同版utils/Stats。经受管`omp update`将官方18.12.6→18.13.1，实际内嵌Bun1.4.4，SHA256为f9c66e8725cf132a6de31b2321908ae1c43c668de12c91deaf368d25c01947d8，与官方资产一致；固定tag为0838d2ab4407b74e870de07e1a6780a13c7d542c。初次绝对路径update继承了wrapper优先PATH，错误地下载整包到wrapper旁；超时/取消均发生在swap前，wrapper未改。两个具名.new文件按已退出PID回收，改由现有wrapper的update路由使用官方49.4MB patch完成，不把该驱动错误当成产品修复。

Settings559→563定义、419→421 UI：新增tools.restrictedFolders和async.printWake，新增非UI session.warnCost/maxCost不补译；既有仅power.sleepPrevention总说明和idle选项变化，明确执行轮次防睡眠、空闲和等待后台任务不保持唤醒。其余418项既有UI及8动态getter不变。37域、包内/外导入选项与共享边界完整审查，90份固定commit/npm来源逐字相同。官方新增restrictedFoldersNotProject条件保护项目受限路径不提升为全局；保留原路径/value/default/group/凭据/保存与显示选项隔离，不复制审批或睡眠逻辑。

Commands87→88定义、95→96标识，新增local；8别名、原87条英文及27动态回调不变。30命令文件中7份变化：completions/session/registry/control/lifecycle/modes/helpers draft；local异步文件补全、pause计数及原生草稿恢复归宿主管理。43份固定commit来源与npm内容匹配（读取器末尾空白规范化，不冒称原始下载字节hash一致）。裸/与折叠skill:同步、partial/取消/可选能力、viewSession、switch有效服务层级、effort键位与descriptionMatch保持；静态例外仍仅switch/loop。新增消费者边界回归使用真实隔离local文件及编码URL、会话目录切换，不执行编辑器。

Stats179包文件仅package.json版本/官方依赖变化，92源码/73客户端不变，609键/105严格模板保持；118份固定commit/npm来源逐字相同。23运行边界中5份变化涉及CLI布尔元数据/Windows标题保护、formatNumber可选小数参数、parseJsonlLenient游标、$whichAll；Stats/opener既有调用行为保持。catalog5901→5948模型，64增17删，209个既有cost对象变化含浮点表示差异，计算仍归官方。实际compiled十一页zh/en/zh、原请求/错误正文和工具Span、三图表、390px菜单/键盘、English刷新/路由/同origin重启、双项目4→5会话/16→17请求自然SSE/React实测；初始34份、增量36份完整API与原版逐值相同。

最终frozen/check通过：66pass/0fail、2611断言，421/421设置、88/88命令/96标识，Schema/命令漂移0，1863显示变更、3次恢复、源码冒烟网络0。删除新增local回归中的冗余非空断言后，消费者边界单测35断言通过，再完成上述完整检查。真实compiled各切片结果、精确最终CI及冷GitHub安装另以本轮实际输出记录，不能由此自动视为通过。

真实新compiled TUI三轮退出0，176文字帧：Settings中文搜索、新受限文件夹/printWake/sleep说明、printWake false→true→false原生保存恢复、同进程zh/en/zh、思考选项中文与真实/effort参数英文隔离均实测。Commands裸/、八别名、新local中文及local://Original%20filename%20%231.txt原生Tab插入、原Tab/Enter执行Settings、description-only Enter保留原查询、两真实skill数量/展开/原说明、第三方与quoted文件均留证；18.13.1的force:现场有中文“无启用的工具”候选，不沿用历史无候选假设。

TUI动态plan/loop开关与暂停、原生model/switch、Shift+Tab和ASCII/Unicode恢复实测。官方SDK两次真实零请求idle子会话通过Agent Hub Enter聚焦，model/switch/effort跟随Sonnet子会话，子low→high→low及真实Shift+Tab low→medium后恢复，Main Opus/high保持。合成本地perf数据仅激活惰性分支，实际记录model/裸switch对Main priority、Child undefined的effectiveServiceTier调用，不冒称真实测速或参数排序差异。88项断言中82通过、6个驱动预期失败保留并另验正确路径：force历史假设、键位观察面、skill namespace、空local夹具、Sonnet不支持xhigh等；非产品修复。agent_start0/POST0，77GET+16HEAD均dispatch前拒绝；两子会话dispose/移除、三PID退出0/消失、三PTY及整个runtime root回收。partial/取消/可选能力由本轮行为回归补充，不冒称UI触发。

真实绝对路径compiled smoke退出0：Bun1.4.4、3页建/3关，正常/人为断言失败回收、原URL单监听器、已有--smol/用户preload、空格路径0700/0600、中文/English刷新、JSON透传、doctor、dry-run和标准卸载通过；隔离link doctor3/1/0的未创建manifest警告如实保留。15目录GET、2身份GET、1无凭据HEAD均dispatch前拒绝，无推理尝试。驱动SIGINT/SIGTERM/SIGHUP分别130/143/129且每轮2页全关。

Profile/XDG四组合实测稳定逻辑包路径：cache-v1→v2并删除旧址后新compiled进程仍发现插件。缺SHELL/USER/LOGNAME按UID501取得/bin/zsh；保持无关shell内容和0640，卸载恢复。所选Bun移走后version/JSON/summary透传与原版输出/状态相同；移除复制包依赖桥且pi-utils负对照import真实失败后，标准卸载仍成功。

CLI生命周期36项HTTP对照保持原跨Host/Origin200、无CORS授权，judge GET405、缺/错误操作头及身份头伪授权POST403，不发送有效judge；原/包装SSE分别15007/15004ms收到真实keep-alive。原/包装PTY先证ISIG、VINTR03、前台PGID后Ctrl+C均退出0；故意compiled异常1、native/launcher SIGKILL137，父消失后wrapper/native/guard/private回收，孤儿wait状态不伪造。CLI切片含失败历史共17个具名页面创建/17关闭，155PID、34端口、19private最终无残留，专属浏览器/Profile/脚手架回收；保留Puppeteer入口错误及pty.py遮蔽标准库两次fixture失败。

干净GitHub安装首轮超出派生smoke驱动45秒截止，父退出143但嵌入式安装子进程仍存活；其argv含本轮独占已删除root，按此明确归属终止PID49988并确认ESRCH，不把rootRemoved:true误当完整回收。修复scripts/smoke-cli.ts：每条命令创建独占POSIX进程组，先记PID，截止对整组TERM/KILL，finally等待根进程并确认组消失后才记groupClosed；成功路径也清掉迟到后代。修复后独立真实shell后代的正常根退出与加速截止回归均确认后代消失；真实compiled smoke正常及SIGINT/SIGTERM/SIGHUP重跑分别0/130/143/129，新增9页建/9关、5个Stats服务/private回收，38个命令组全关闭。完整frozen/check再次66/0、2611断言通过。

本机按原GitHub来源执行官方plugin upgrade：插件18.12.6→18.13.1，磁盘coding-agent/utils/Stats均18.13.1，doctor5/0/0；来源清单与pi-xcode-mcp0.1.0保持，无需历史候选曾使用的卸载重装。最终SHA的CI与干净GitHub安装仍分别以现场输出核对，不用中间7c56191的CI40531502227替代后续提交。

资源门禁：本轮先建run账本，受管headless正常/人为断言失败清理均恢复空baseline。显式Chrome首次启动报无page target，锁PID随后ESRCH且专属Profile已删，target数量unknown保留。父网页切片及预检共7个已知target创建/7关闭/0已知残留，每阶段复用一个主target，失败才重新建立；驱动的模态遮挡、Node上下文location、窄屏菜单遮挡及hash-only导航误保留旧DOM均保留，未当产品缺陷，关闭/安全恢复后另留正确交互证据。网页六个真实服务退出0、49629端口及四个具名private目录消失，官方单监听器/Bun1.4.4合并--smol/用户preload生效；六次本机身份GET在dispatch前拒绝，POST0。父网页HOME/fixture/临时目录/opener/guard脚手架已删，保留仓库外证据，不退出共享工具浏览器或用户浏览器。

**不发布门禁**：当前桌面screenLocked:true、displayCount0，不能取得可靠原生默认浏览器页面归属及安全关闭条件，未启动默认opener阶段；不以测试子进程URL转交替代，不继承18.12.1例外。不得创建18.13.1 tag/Release；源码候选及本机宿主更新不等于三部分完整验收或发布。后续只能在本轮所有门禁及资源回收、最终提交macOS/Linux CI和精确SHA冷GitHub安装都通过后发布。

## 18.12.6 已发布基线与历史验收记录

现场起点：本地/远端main同为6834b4e53f0621f3ae10f1306ea0b0436422e2f9，package/官方宿主/GitHub安装插件均18.12.5，doctor5/0/0；正式Release仍v18.12.1，最终旧提交CI39628081451的macOS/Linux均成功。Windows PR #1仍CLOSED、isDraft:true、mergedAt:null，独立归档不混入主线；保护42项既有未跟踪内容，不reset/clean。

通过受支持`omp update`将实际官方二进制18.12.5→18.12.6，SHA256为cfbb5e38cd8f8a3be55e710700be587d287deaacdc58c9b0a661c5086bccfe58，实际内嵌Bun1.4.3。coding-agent、pi-utils、Stats最新稳定版均18.12.6且精确同版依赖，开发依赖/宿主范围/来源同步；官方tag45c35e40c46166dc726ccc52f5d27f40f2449f99。插件编号不代替实际宿主或Release证据。

Settings419→419，无新增/删除/原文变化，完整37域与导入选项/边界82来源逐字相同，8个动态getter/共享effort原文不变；90份目标固定commit/npm来源匹配，未变译文与420条平台原文哈希不重写。上游新增扩展延迟加载，实际复现主启动等待元数据时关闭，旧实现关闭后仍挂载中文；修复后主关闭进入终态、通过现有串行链恢复，迟到启动/语言选择不能重挂，子会话隔离保持。独立reproducer先失败后通过，原Auto Resume描述符恢复；生命周期回归纳入既有隔离子进程。

Commands87定义/95标识/8别名/27动态回调不变，完整30命令文件中6份实现变化（lifecycle/session/types及helpers mcp/parse/usage-accounts）另审；46份目标固定commit/npm来源匹配。新增失败标记及MCP OAuth reauth可能开页/改凭据，不用于无副作用验收；viewSession/effectiveServiceTier、effort真实键位、裸/与折叠skill同步路径、partial/取消/可选能力/descriptionMatch合同保持，静态门禁不放宽。

真实compiled TUI六轮均waitpid退出0，452文字帧；后五轮使用关闭竞态修复后的源码。Settings首次/与首次提交/settings中文，中文缓存搜索、auto→long→auto原生保存恢复、同进程en/zh、Unicode/ASCII与effort参数英文隔离实测。Commands裸/、原Tab接受/Enter执行Settings、第三方原文、plan/loop状态、quoted文件、descriptionMatch原查询保护、两技能中英数量/Tab展开及真实idle子会话Agent Hub焦点均留证；Main Opus/high与查看Sonnet/xhigh隔离。真实Shift+Tab为high→xhigh→max，再由原生命令恢复high，旧循环预期失败不抹除。原生model/裸switch picker实测委托查看会话的effectiveServiceTier（Main priority、子none）；仅合成局部performance数据激活惰性分支，不请求模型。switch参数ranker未调用tier callback，不冒称已验证参数层级排序差异。八别名均实际输入；--no-tools夹具下七条显示中文候选，精确force:无候选说明，不算八条可见译文。

上述79项TUI断言72通过、7个驱动预期错误及一次helper参数错误保留，后四轮断言全部通过；六次SDK子会话dispose、六个具名PID消失、PTY/root回收。agent_start0/POST0，131GET+23HEAD均dispatch前拒绝。后四轮在首个editor出现即输入/，捕获列表已中文；未伪造强制eager或普遍首帧时延保证。结构化证据、452帧与原始字节在本轮local artifacts，不提交会话或日志。

Stats179包文件仅package.json变化，92源码/73客户端保持；23份固定commit/npm运行边界来源相同。609键/105严格模板、DOM白名单/数据排除/异步节点复用不变；catalog5900→5901模型（3增2删、保留价格不变），计算仍归官方。真实compiled十一可见路由zh/en/zh、请求/工具Span追踪、三图表、English刷新/路由/同origin重启、390px菜单/键盘已实测；双项目由5会话17请求自然SSE/React至6会话18请求，实际15秒heartbeat，37份完整API与12项HTTP对照一致。原静态和只读API跨Host/Origin200保持，judge缺方法/操作头405/403，不把身份头当授权，不执行费用评估。最初4会话16请求，首次增量达到17后驱动方法调用错误已回收，正式后续17→18独立留证。

冻结安装及完整check通过：65pass/0fail、2566断言，419/419设置、87/87命令/95标识，Schema/命令漂移0，1859显示变更、3次恢复、源码冒烟网络0。真实绝对路径scripts/smoke-cli.ts通过：3页建/3关、2个官方单监听器服务、合并--smol/用户preload、空格路径与0700/0600、正常/故意失败回收、dry-run和标准卸载。13目录GET/2身份GET/1无凭据HEAD均dispatch前拒绝，推理尝试0。

Profile/XDG四组合实测8个新compiled进程退出0；官方稳定逻辑包路径经cache-v1→v2、删除旧址后仍发现插件。缺SHELL/USER/LOGNAME从UID501取得/bin/zsh，保持无关shell内容/0640；无Bun的版本/JSON/summary透传、dry-run与移走依赖桥后标准卸载通过。doctor3/1/0的Not created yet警告保留；81直接子进程/89已知PID均回收，76目录GET全部拒绝，POST0。此处只模拟GUI缺环境，不冒称真实GUI启动。

原/包装真实PTY的ISIG、VINTR03与foreground PGID实测，Ctrl+C退出0；native/launcher SIGKILL与父消失后端口/private回收，Bun返回null退出码不补造0。冒烟驱动SIGINT/SIGTERM/SIGHUP分别130/143/129，每轮2页建/2关、服务/bridge端口、具名preload及独占浏览器/Profile/root回收。

驱动失败保留：首次指定Chrome路径启动未取得page target，具名页未创建，专属Profile锁PID91158后已不存在；不伪造该次target/页数。后续受管headless正常/断言失败回收均恢复基线。网页初轮误取所有挂载路由中隐藏Overview的h1、tab.press签名/不存在的waitForFunction、窄屏菜单动画尚未完成时点击失败，均先关闭本轮页/服务后修正驱动；正式逐可见h1/原生菜单键盘与API断言另留证，不算产品修复或全轮无失败。每阶段复用主target，失败才新建；不关闭共享浏览器进程。

适配提交a2eeffd的CI39804824946已实际完成macOS/Linux两门禁，随后干净GitHub安装同提交，doctor4/0/0、默认PATH接入、新登录shell（path_helper之后先断言自有open与wrapper）、实际官方原URL单监听器、390px中文/English/刷新、dry-run与标准卸载均通过；此处仍只验证测试opener转交。本机官方plugin upgrade虽升插件至18.12.6且doctor5/0/0，磁盘coding-agent/utils/Stats仍18.12.5；--force重装未刷新。仅用官方卸载该插件再同源重装后，三项依赖均18.12.6，doctor5/0/0；pi-xcode-mcp0.1.0及来源清单未变。补充证据后的最终提交CI/冷安装仍须现场按精确SHA再核，不拿a2eeffd代替。

2026-10-22继续验收时，本地/远端main均239b19b3b292d5f261d67f8aef6405820aa1d77d，package、真实宿主、GitHub插件及三项磁盘依赖均18.12.6，doctor5/0/0；该精确提交CI39806582050的macOS/Linux均成功，冷GitHub安装亦有同SHA证据。相对已验适配提交a2eeffd仅CHANGELOG/CONTEXT两份文档变化。独立再次查询三个npm稳定版均18.12.6，coding-agent精确依赖同版utils/Stats。

真实默认opener补验run为omp-release-18126-qNVXeV：桌面已解锁且有两个显示器，取得过实时控制许可，原生Chrome窗口接口仍不可见，故使用已连接Chrome relay读取真实target身份并定向观察/关闭。先记录两个既有用户target；用户期间新增并导航第三个target，仅更新归属基线，不关闭或回退用户操作。正常及故意断言失败的空白页清理预检均通过。Chrome为系统http/https注册的默认应用，既有进程55997只读记录、不终止、不修改Profile。

隔离HOME/PI_CODING_AGENT_DIR/Profile/XDG与含空格TMPDIR，实际GitHub冷安装18.12.6自动接入启动器、doctor4/0/0；没有替换open或修改系统默认浏览器。仅在测试子进程的用户preload记录Bun.spawn原调用后原样委托，三次实际官方Stats分别在52857、53313、53592端口各调用/usr/bin/open一次、子进程均退出0，原始URL精确为各自http://127.0.0.1:端口。每次lsof均只有该真实官方进程的原host/port单监听器。故意断言失败分支与最终正常分支均先关闭新target、再SIGINT退出0并确认端口/private目录消失；最终正常分支中文默认、English刷新保留、切回中文和API相同通过。

补验驱动失败仍保留：按URL而非target ID比较基线，误将用户自己的X页导航判作回收失败；重新读取三个原target ID，均保留、所有自有页均已关闭。另一次误用tab.waitFor函数签名，finally先回收后改用原page.waitForFunction重跑。该补验阶段共6页创建/6页关闭/0自有残留（3个清理预检空白页、3个真实默认自动页），3个Stats端口及3个private目录消失，受管tab列表为空，标准卸载撤销启动器、dry-run不撤销，隔离root已删除；3个目录探测GET在dispatch前阻断，POST0。私有账本及截图保留在仓库外，不提交浏览器个人数据或日志。

18.12.6真实默认opener门禁现已通过，不继承18.12.1例外；此前锁屏状态属于初轮历史，不再代表当前桌面。历史18.12.3潜在52700原生页仍无可认领身份，未触碰、未借新轮证明历史零残留。旧轮Chrome首次启动target数量unknown仍照实保留，不将已知页计数冒充全历史总数。任何后续最终文档提交仍须按其精确SHA完成macOS/Linux CI及干净GitHub安装/Stats/卸载，再创建未使用的18.12.6 tag与Release；本文不代替远端发布证据。

## 18.12.5 历史未发布候选

现场起点：本地/远端main同为3707548d，package与GitHub安装插件18.12.3；插件锁指向GitHub同提交，doctor5/0/0，另一个插件不动。正式Release仍v18.12.1，Windows PR #1仍CLOSED、isDraft:true、mergedAt:null，独立归档不混入主线。通过受支持omp update将真实官方二进制18.12.3→18.12.5，SHA256为5e50df9879de9165d5c6df5e48bb5d038737270013cd849e189da7774fb7368b，实际内嵌Bun1.4.3；三个官方npm包最新稳定版均18.12.5且coding-agent精确依赖同版utils/Stats。官方tag为d5cd750e41fede277f9eb933455da92a0738915e；源码编号/main均不代表Release。

Settings419→419，新增/删除0，复核2项：providers.cacheRetention.long保留Anthropic/Bedrock 1h、OpenAI GPT-5.6+ Responses 12h、较贵写入与仅运行中保温；compaction.methodOrder.remote补充Bedrock支持。首次只比注册域漏掉导入的compaction-methods选项，完整check以67pass/1fail检出哈希漂移；扩审37域的非type import、本包23依赖及外部UI来源后修正，不放宽门禁。固定tag/npm共71文件逐字相同。默认值、value、group、getter、凭据、原生保存与共享effort原文不变，未变译文不重写。

Commands87定义/95标识/8别名/27动态回调保持。30命令文件仅builtin-completions.ts变更/move的目录分隔符补全，不翻译参数或接管匹配。viewSession、switch有效服务层级、effort键位、同步/异步/partial/AbortSignal/可选能力与descriptionMatch/原生Enter保护保持；固定tag/npm36关键文件相同。Stats179包文件仅package.json变化，92源码/73客户端保持，609键/105模板和数据边界不变；固定tag/npm14关键入口相同。utils测试运行时与日志目录变化独立审阅，不据此复制业务或替换官方编译Stats。

冻结安装及完整check通过：65pass/0fail、2566断言，419/419设置、87/87命令/95标识，Schema与命令漂移0，1859显示变更、3次恢复、源码冒烟网络0。删除新增的文案/转发型重复测试，不用重新钉死措辞代替行为验收。

真实新compiled TUI实测中文搜索、新缓存auto→long→auto原生保存恢复、缓存/压缩新说明、同进程en/zh及effort参数英文隔离；裸/、8别名、第三方原文、原Tab/Enter执行Settings、description-only Enter将/menu原查询交回输入护栏、quoted文件Tab、/move .先补./。原生plan开关、loop3轮→Escape暂停→关闭、Shift+Tab high→xhigh→high、/switch在Opus/Sonnet间切换及模型ID保留。父驱动保留168文字帧；最后进程退出0。技能与查看子会话焦点由独立compiled切片另验，不以这些帧替代。

独立compiled技能/焦点切片两轮退出0，150文字帧：两技能数量中英/原生Tab展开与第三方/skill英文边界通过；官方SDK真实零请求idle子会话经Agent Hub Enter聚焦，Sonnet low→xhigh不改Main Opus/high，model/switch/effort跟随viewSession，实际switch往返/model picker current留证。真实Settings ASCII↔Unicode与Shift+Tab恢复实测；两轮agent_start0/POST0，31GET/8HEAD由护栏拒绝。首轮overlay固定Unicode的驱动错误保留，正式新进程纠正；附带preload进程退出码unknown但具名PID均消失，子会话dispose及独立slice回收已确认。

驱动失败不抹除：首次漏掉setupVersion/官方PATH、预期大小写/文案错误及Escape关闭层级判断均先退出本轮进程再修正；/plan on被官方当作prompt，产生1次agent_start和1次POST尝试，已由真实compiled异步无Socket护栏在dispatch前拒绝，未发送模型请求。正式后续仅裸/plan切换，不能称全历史零尝试。正常exit后killpg被拒，waitpid明确返回该子进程退出0后不再发信号；不伪造未知孤儿退出码。

Stats实际十一页en/zh、各空态、请求抽屉/追踪/工具Span、三指标图表、390px与Tab焦点、English刷新/路由/同origin重启实测；双项目4会话16请求，在已存在的真实Profile目录新增JSONL后自然SSE/React至5会话17请求，另读取实际15秒keep-alive。初始31份、增量后34份完整API/请求/trace与原版逐值相等。12项HTTP对照保留原跨Host/Origin静态和只读API200、judge缺方法/操作头405/403；身份头不是授权。模型/项目名Overview、Requests、路径、正文、错误原文及canvas保留，不执行judge或费用确认。

网页首轮夹具误把namedProfile数据写到PI_CODING_AGENT_DIR，按官方dirs解析修正并冷启动后实际摄取；另两个浏览器驱动接口错误均先回收自有资源后重跑，不算产品修复。每次仅一个主target、路由与重启复用；失败才另建具名target。所有启动均先登记真实URL、compiled PID/BUN_OPTIONS/private路径并在实际页面观察后ack测试opener，不调用系统默认opener。原/包装真实PTY均证明ISIG、VINTR03与foreground PGID后Ctrl+C退出0；native/launcher SIGKILL与父进程消失后端口/private回收。即时SIGKILL断言曾早于守护宽限期，后续按明确所有权确认实际回收，保留该驱动失败。

真实绝对路径scripts/smoke-cli.ts通过：3页建/3关、两官方单监听器服务、合并--smol/用户preload、空格路径0700/0600、正常/故意失败回收、dry-run与标准卸载均实测；13目录GET、2身份GET、1无凭据HEAD均dispatch前阻断，推理尝试0。独立四种Profile/XDG切片通过8次新compiled发现、cache-v1→v2删除旧址、缺SHELL/USER/LOGNAME按UID501解析/bin/zsh、无Bun版本/JSON/summary透传与移走依赖桥后卸载；87直接子进程回收，76GET阻断、POST0，doctor3/1/0警告不隐藏。缺Bun的4次卸载dry-run退出126，不把它们计作成功。

三类冒烟驱动中断另验：SIGINT/SIGTERM/SIGHUP分别退出130/143/129，各自2页建/2关、一个官方Stats服务/bridge端口及具名private目录关闭、独占Chrome/Profile/root回收；私有路径在自动URL转交前已登记，不把仅退出码正确当作finally证据。

**不发布的硬阻塞**：当前桌面screenLocked:false、displayCount2，但两次control.acquire均在120秒超时、state仍inactive，已release；没有实时确认，不能安全操作默认浏览器新页，因此该阶段未启动。测试opener转交不替代默认opener，18.12.1单次例外不延续；18.12.3历史52700潜在原生页仍无可认领身份，不擅自关闭。精确最终CI、GitHub冷安装和本机来源升级在提交后按实际输出独立核对，不能由本文预先视为通过。本轮已知具名页/服务/私有目录与临时脚手架均须最终核对；不合并历史未知页宣称全历史零残留。

## 18.12.3 历史未发布候选

本轮通过受支持 `omp update` 将真实官方二进制从18.12.2升级至18.12.3，内嵌Bun1.4.3，SHA256为f2a657b3320fcafa23055053940a45b26a8d3254e1412a158838013d670d6ec5。coding-agent、pi-utils、Stats最新稳定版均为18.12.3，coding-agent精确依赖同版utils/Stats。开发依赖、宿主范围与翻译来源对齐；目标官方tag为53a0377db6845e0dae606146130766ec92d407fd。开始时本地/远端main同为71102b78，正式Release仍v18.12.1；不把候选或main当作发布。

Settings418→419：新增`async.widgets`，保留widget模型角色（默认smol）为每任务首次生成规格、后续更新无需模型调用的语义；复核`tools.approvalMode`新增always-ask-cached及总说明，文件读取也询问、文件/文件夹与当前/所有会话授权范围、exec仍需确认不弱化。默认值true/yolo、原value/group/getter/保存不变；无UI的shellCommandPrefix不补造译文。完整宿主源码1788→1806文件比较，41个去重设置注册/域文件逐字对照固定官方tag；变化仅tools/settings.ts与exec/settings.ts。

Commands86→87定义、94→95名称/别名、8别名无漂移，新增forget-approvals独立译文，不执行清除授权。27动态回调中model/switch/effort改读viewSession，effort候选/提示/执行也跟随查看会话；switch仍由宿主effectiveServiceTier(model)计算。公共provider同步/异步/partial/AbortSignal与可选能力保留，官方新增descriptionMatch和编辑器Enter保护，现有包装保留原字段与item身份，无需改写匹配/插入/执行或放宽静态门禁。11个关键目标GitHub源码与npm逐字一致。

Stats179包文件仅package.json版本及官方依赖变化；92源码/73客户端、stats-cli/openPath/handler逐字不变，609键/105严格模板与browser/mutations保持。utils新增可选throughMissing路径归一化，默认行为不变，Stats未调用；7个关键目标GitHub运行入口与npm逐字一致，不固定npm运行时或复制计算。

本轮frozen/check通过：65pass/0fail、2566断言、419/419设置、87/87命令/95标识、两项漂移0、1859显示变更与3次恢复。首轮62pass/3fail因旧fixture缺viewSession，修正为查看会话合同并增加主/查看会话不同及重新聚焦的候选/当前值回归；不改产品为旧fixture兜底。

真实新compiled主TUI正式轮42项/45文字帧、退出0：中文搜索、新布尔编辑恢复、审批新选项、同进程en/zh、effort参数英文隔离、裸/、8别名、2技能数量及Tab展开、第三方/quoted文件、原生Settings Tab/Enter、plan与loop开启/暂停/关闭、Shift+Tab high→xhigh与恢复、模型picker、纯描述命中Enter保留原查询与Tab显式接受均实测。另以官方SDK创建零请求的真实idle子会话，经原生Agent Hub Enter聚焦；17项/20文字帧、退出0，model/switch随Sonnet子会话而非Opus主会话，effort low→xhigh不改主会话high，English往返、参数原文、Unicode/ASCII设置和effort实际键位提示恢复。两正式轮agent_start0、POST尝试0；不把源码导入或原生Agent定义管理页当作焦点证明。

终端驱动失败如实保留：首轮大小写断言错误后无界SIGTERM等待导致外层超时，PID已证实消失、精确root/launcher回收，退出码unknown；之后的搜索误选、原文预期、技能namespace及不可见静态键位断言纠正均为驱动修正，不冒称产品修复。一轮误用input的action字段，/menu启动了1次Agent、2次POST尝试均由异步无Socket护栏在dispatch前拒绝；改为实际handled:true后正式轮零尝试，不称整个历史零推理尝试。

Stats安全网页轮复用一个主target：11路由zh/en/zh、双项目4会话16请求、请求/trace/工具Span、3指标图表、390px/键盘/空态、English刷新/路由/同origin重启；自然JSONL增量经官方SSE/React至5会话17请求（17280ms），初始35份/增量后76份完整API/请求/trace/entry及CLI JSON原/包装逐值相同，同名数据/路径/正文/错误保留。4次原URL真实转交/ack、4单监听器服务退出0、1页建/关、2private回收；不执行judge。工具汇总`1 failed`徽章仍英文，保留未知安全回退，不宣称全量汉化。

Profile/XDG四组合、物理cache-v1→v2删除旧址后的新compiled发现、缺SHELL/USER/LOGNAME按UID读取账户shell、无Bun透传、dry-run、移走依赖桥后的标准卸载均实测。最终生命周期另36项HTTP对照、原/包装PTY ISIG/VINTR Ctrl+C退出0、native/launcher SIGKILL及父消失清理通过；跨Host/Origin的原静态/只读API200保持，身份头不是授权。最终9页/8服务/6private回收；含驱动失败的该切片25页建/25关，92次HEAD/GET尝试均dispatch前拒绝，POST0。SSE实测流事件，不冒称该切片15秒heartbeat。

**不发布的硬阻塞**：本轮桌面仍screenLocked:true、displayCount0，真实系统默认opener无法建立页面身份基线。Stats网页首个驱动还因登录shell的path_helper重排PATH，潜在调用/usr/bin/open，精确origin为`http://127.0.0.1:52700`；该次默认opener退出/错误及潜在原生页target/存在/关闭均unknown。已知自有页、服务、private及独占Chrome/root均已回收，但不能认领未知原生页、不能称全轮零残留。安全重跑在同一shell、path_helper之后断言自有opener再启动，原URL真实转交不等于默认opener通过。18.12.1单次例外不延续；不得创建18.12.3 tag/Release。最终CI、GitHub冷安装与本机来源更新以实际输出另核，不由本文预先宣称通过。Windows PR #1现场仍CLOSED、isDraft:true、mergedAt:null，保护独立归档，不纳入macOS/Linux主线。

## 18.12.2 历史未发布候选

通过受支持 `omp update` 将真实官方二进制从18.12.1升级至18.12.2，内嵌Bun1.4.3，SHA256为abd9a5b0fef77f4204078e348e233faa0dd3d5d81719cf2b6a9b9478c10eee48。coding-agent、pi-utils、Stats最新稳定版均为18.12.2；开发依赖、翻译来源与宿主范围对齐。官方标签1d5aff90b057ce7dbfe32ea557a527c1b3144b72；最新正式插件Release仍为v18.12.1，不以源码编号或main替代发布。

Settings416→418：新增`tui.completeScrollback`（默认false）和`computer.backgroundFallback`（takeover/refuse，默认takeover）；复核`compaction.idleTimeoutSeconds`的1小时提示词缓存到期前压缩例外。均从官方英文独立翻译；未变化译文不重写。注册分布在modes/tools/session领域；首轮只查config目录漏项，完整check以64pass/1fail检出2项缺译和1项哈希变化，修正后65pass/0fail、2551断言、418/418、Schema漂移0、1855显示变更与3次恢复。该失败保留，不把目录局部比较当完整注册表审阅。

Commands86定义/94标识/8别名/27动态回调不变，静态漂移0；公共provider、同步/异步/partial/AbortSignal/可选能力、switch有效层级与effort selector无相关变化。30个命令文件仅builtin-modes.ts原生`/computer status`配置正文新增backgroundFallback，不翻译目标正文，不宣称整个目录逐字不变。

Stats92源码/73客户端逐字不变，npm179包文件仅package.json变化；609键/105严格模板与UI白名单/数据排除保持。catalog5732→5897行，新增171/删除6，1232既有行变化、376行cost对象变化（包含浮点表示差异，不等于376项实质调价）；coreweave/deepseek-ai/DeepSeek-V4.1-Flash输入0.2→0.15、缓存读取0.03→0.002。默认judge固定到typesafe/jev-1.14.0及openrouter/typesafe/jev-1.14；不由插件复制计算或执行评估。

新compiled TUI保留91文字帧：新增布尔false→true→false、fallback takeover→refuse→takeover，中文搜索、原生编辑、同进程en/zh与effort英文参数隔离；裸/、2技能数量及Tab展开、8别名、第三方、quoted文件Tab、原生Settings Tab/Enter、plan/loop、原生模型picker往返、Shift+Tab high→xhigh及符号恢复。agent_start0、POST尝试0；54次连接/请求尝试均dispatch前阻断。搜索误选后恢复与picker未关闭的断言失败留证；最终Agent Ctrl+C未在驱动等待内退出，按具名进程组SIGTERM回收，退出143，不冒称正常退出0或全轮无驱动失败。partial/取消等由既有行为回归补充，不冒称UI触发。

实际Stats复用主标签，11路由zh/en/zh、请求/工具Span抽屉、三图表模式、390px/键盘、English刷新及同origin重启；双项目4会话16请求自然SSE更新至5会话17请求（1456ms）。11路API、4份完整trace及16份请求详情与原版逐值相等，同名UI键的项目/路径/正文/错误保持原文；费用估价仅打开后取消，无judge可用，不点继续。持久Bun.serve回调跨Eval调用浏览器返回Run no longer active的两轮驱动失败均先关自有页再停服务，改为纯URL队列由当前调用转交；不把工具限制算产品修复。网页阶段3页建/3关、6服务退出0且端口/private目录关闭，32次外连尝试阻断、POST0，临时运行目录已回收。只关闭具名页，不终止共享工具浏览器。

Profile/XDG四组合、物理cache-v1→v2后8个新compiled发现、缺SHELL/USER/LOGNAME按UID解析/bin/zsh、不可用Bun的透传、dry-run/无pi-utils动态导入标准卸载均实测；96子进程退出、目录回收，link doctor3/1/0警告不隐藏。生命周期另验56HTTP合同、38完整API响应、真实SSE heartbeat、原/包装PTY ISIG/VINTR Ctrl+C退出0、异常子进程143、launcher SIGKILL/父消失和三种驱动信号；17页建/17关、15服务/13私有preload目录回收。nullable exitCode驱动超时及导入/路径断言失败留证，未知孤儿退出码不补造。

**未发布门禁**：本轮桌面工具仍报告screenLocked:true，不能建立真实系统默认浏览器页面身份基线，故未启动该阶段。18.12.1单次豁免不继承；仅测试子进程opener转交实际URL不等于默认opener通过。最终提交CI及干净GitHub安装以本轮实际输出为准，不由本文预先宣称通过；任何未验/残留均禁止tag/Release。PR #1现场为CLOSED、isDraft:true、mergedAt:null，Windows归档不纳入macOS/Linux主线。

## 18.12.1 历史发布基线

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
- 当前Settings为421项UI元数据；18.13.1新增受限文件夹与打印模式唤醒，复核睡眠防护说明；8动态getter不变。保留设置路径、类型、默认值、选项value、group、凭据、getter、保存与恢复。
- 当前Commands为88定义、96名称/别名的顶层说明、实时状态与技能数量；18.13.1新增local，原静态与动态说明不变。显示层保持viewSession、有效服务层级及descriptionMatch，不改命令、参数、排序、插入、执行；第三方/未知/路径/模型ID保留原文。
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
