# Project Context

## 当前项目

当前源码、开发依赖和真实官方宿主基线为 18.11.1（内嵌 Bun 1.4.3）；受支持 update 从 18.10.4→18.11.0→18.11.1，最终官方 SHA256 为 bdeb1626b99dc29d844146ea7940d367e61b1032b77e1c77880125f379ca2dda。维护开始 main ca06e04/Release v18.10.3、本机 GitHub 插件 18.10.3、doctor5/0/0；旧工作区 main fc689e7/package18.8.7 的15个修改文件/53个未跟踪项与Windows草稿保持。中间95ab265（18.11.0）CI38762091686成功但未发布，不作为18.11.1验收；最终提交CI、冷GitHub安装和资源门禁另核。

Settings412/412：相对18.10.3删除两项Code Mode，复核contextPromotion.enabled/retry.modelFallback/task.structured三项说明及哈希，gc.compress/gc.compressAfterDays仅配置；18.11.0→18.11.1设置域源码未变，126组选项/679值/8个getter保留。Commands85定义/93标识/27动态回调及公共provider接口未变；新补丁统一双引号@文件token、调整composer和image-reference所有权，参数及原生执行仍交官方。Stats18.11.0有6个服务端文件变化，18.11.1的179包文件仅package.json不同；92源码/73客户端未变。609键/105模板补齐负数saved百分比，仅显示匹配不改数字、数据边界或计算。

最终frozen/check65pass/0fail、2541断言，Settings/Commands漂移0，1816显示变更/3轮恢复/源码冒烟零网络。18.11.1新编译TUI109帧验证中文搜索、autoResume false→true→false、Settings中文选项与/effort英文参数隔离、en/zh、同步/异步裸列表85canonical、2技能及全部8alias prefix、第三方/参数/双引号文件原文和Tab插入、原生Settings执行、plan/loop、effort与Unicode/ASCII恢复。合成SQLite性能样本验证switch default/priority/ultrafast/flex选择，不代表真实性能。正式agent_start0、21fetch全部dispatch前阻断、48个aborted async；实际未触发partial，以既有行为回归补充。

18.11.1真实绝对路径smoke验证Bun1.4.3合并--smol/用户preload、空格路径、0700/0600、单监听器与正常/人为失败回收。默认/usr/bin/open新宿主两轮各1精确origin新页、正式回收保持原14页；默认/命名Profile/XDG稳定逻辑路径、物理包换址后新进程、缺SHELL/USER/LOGNAME按UID解析登录shell、透传/dryrun/无动态导入标准卸载均通过，local link doctor package_manifest警告不隐藏。

Stats18.11.1实际11页中英、刷新/路由/同origin英文重启、请求与工具Span抽屉、3图表模式、390px/键盘、双项目3session及6→7异步更新（约0.94秒）通过；真实费用估价完成后取消，不点Proceed。weekly跨账户合并、5h/Spark/raw无标签隔离，账户/同名UI键的数据、正文/错误/路径保留。26组原/包装HTTP除自有脚本GET外归一化相同，跨Host/Origin原200、CORS/拒绝/400/404/真实500保留；SSE2→3→4，正常会话0→1→2，gc scratch初始/watch不计入。真实PTYCtrl+C两侧退出0；子异常、SIGKILL、父消失、非法/占用端口及私有preload回收，孤儿退出码unknown不说0。启动时sessions根不存在会退周期扫描，为上游限制；正式watcher预建隔离根并保留早期超时。

失败诊断不计通过：早期TUI误提交和guard合同错误累计4次agent_start，所有fetch在dispatch前拒绝；随后新正式会话0。一次login shell path_helper使opener隔离失效，父任务按新原生身份/精确63824 origin认领单页关闭并恢复原14页；之后同一shell子命令断言opener再启动，正常/失败回收重验。隐藏旧路由选择器、SSE networkidle和异步控件等待等驱动问题均单独记录，脚手架、页面、服务、Profile及private目录逐阶段回收，最终数量以本轮资源账本与发布前复核为准。

## 已确认的产品边界

- 使用官方二进制与原生 `/settings`，不复制设置面板。
- 当前汉化范围：412 项 UI 元数据；18.10.3→18.11.1 删除两项 Code Mode，contextPromotion.enabled、retry.modelFallback、task.structured 三项说明/哈希变化；gc.compress / gc.compressAfterDays 不计 UI。插件保留路径、类型、默认值、选项 value、group、凭据标记、8 个动态 getter、原保存与可逆恢复语义。
- 命令补全汉化：85 个内置斜杠命令、93 个命令名/别名的顶层补全说明、实时状态与技能数量；通过公共 addAutocompleteProvider 包装显示结果，不改命令注册表、命令名、参数提示、匹配排序、插入或执行。参数／文件补全、第三方描述和未知原文保持原样，switch / loop / effort 保留动态宿主键位。
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

官方上游：https://github.com/can1357/oh-my-pi

文档优先级：`docs/PRD.md` 定义需求；`docs/TECHNICAL-DESIGN.md` 定义实现；`docs/TRANSLATION-GUIDE.md` 定义译文；`docs/OPEN-SOURCE-RELEASE.md` 定义发布门禁；`CONTRIBUTING.md` 定义贡献流程。上游真实行为变化时，先核验再同步文档。
