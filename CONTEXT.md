# Project Context

## 当前项目

当前源码候选、开发依赖和真实官方宿主目标为 18.11.3（内嵌 Bun 1.4.3），未发布。维护开始远端 main 为 a364115，Release v18.11.1，本机 GitHub 插件 18.11.1、doctor 5/0/0。原工作区 main fc689e7/package18.8.7 有15个修改文件/53个未跟踪项，保持不动；本轮在同仓库隔离 worktree 适配，不混入 Windows 草稿。Windows PR #1 仍 OPEN/draft/CONFLICTING。

官方 `omp update` 首次下载180秒超时，重试成功18.11.1→18.11.3；真实二进制 SHA256 为 d518310d647d467a2c5c3f2d38e34489a761996d766395c03b37c61a2203d02b。coding-agent/pi-utils/Stats 最新稳定版均18.11.3且依赖同版；官方tag指向96894a6147d8cc64b7e00ad3a7d7178fd93b9531。插件编号不用于推断内嵌 Stats。

Settings415/415：新增prewalk.auto、prewalk.autoTarget、lsp.requestTimeout，复核lsp.shared和task.isolation.enabled说明/哈希，无删除。Commands86定义/94标识：新增seance只读咨询说明，原27动态回调与公共provider接口不变；参数、会话路径、模型ID不译，不执行咨询。Stats179包文件仅package.json变化，92源码/73客户端不变；609键/105模板不重复改译。

目标版本frozen/check通过：65pass/0fail、2551断言，Settings/Commands漂移0，1837显示变更、3轮恢复与源码冒烟零网络。真实绝对路径smoke验证编译共享Settings、默认link自动启动器、doctor3/1/0（缺package_manifest不隐藏）、JSON保持、同源网页切换/刷新、Bun1.4.3合并--smol/用户preload及空格路径0700/0600、单监听器、dry-run/标准卸载。成功与人为断言失败均回收，3显式页面建/3关、2服务端口关闭，15个目录GET尝试均在dispatch前阻断。

实际新编译TUI观察中文搜索、新增/变化项、autoResume false→true→false、同进程en/zh、seance说明/原参数提示、8个alias前缀、plan/loop/model状态、Settings中文选项与effort英文参数隔离和Tab/Enter原生Settings执行。补充活会话确认2项技能中英数量、Tab显式展开后的技能英文说明、第三方说明、双引号文件Tab插入、Unicode→ASCII→Unicode、Shift+Tab high→xhigh及原生effort high恢复、fast切换后的原模型ID。正式活会话agent_start0，20个目录/更新GET均在dispatch前拒绝；退出130、PID已回收，不冒称TUI零退出。首轮驱动结束等待超时、两轮误将setup边框当composer、两轮未按Tab触发技能列表均保留失败证据。partial/取消未在实际UI触发，以既有行为回归补充。

Stats实际11个可见路由、请求/工具Span抽屉、3种图表模式、390px无横向溢出、键盘跳转、双项目4→5异步请求（1005ms）通过；模型/服务商同名UI键、路径、正文与错误保持原文，语言往返API不变。独占浏览器另验同origin英文重启/刷新，复用1主标签、两次服务退出0且端口关闭。共享浏览器驱动一次重启opener等待超时已回收，不冒称该轮通过；隐藏旧路由标题与不连通会话链样本的驱动错误保留。

默认/命名Profile、默认/命名XDG四组合的稳定逻辑包路径及物理缓存换址后新进程均通过。缺SHELL/USER/LOGNAME按真实UID解析登录shell；版本/JSON/summary透传、dry-run/标准卸载保持无关配置与权限。原/包装15项HTTP/SSE边界一致，原跨Host/Origin静态200不变；真实PTY ISIG/VINTR与前台进程组验证Ctrl+C退出0，官方子异常、wrapper SIGKILL、父消失、非法/占用端口及私有preload回收通过，孤儿退出码unknown。

发布阻塞：无法通过原生computer取得普通Chrome现有窗口/页签身份；relay仅列URL（存在重复）且具名close只释放采用页，未建立可靠的默认opener安全关闭合同。因此没有启动真实系统默认opener阶段；测试专属URL转交不替代它，不打tag/Release。最终精确提交macOS/Linux CI、冷GitHub安装与全部资源零残留仍以现场结果为准。

## 已确认的产品边界

- 使用官方二进制与原生 `/settings`，不复制设置面板。
- 当前汉化范围：415 项 UI 元数据；相对18.11.1新增3项、复核2项，无删除；保留设置路径、类型、默认值、选项 value、group、凭据标记、动态 getter、保存与可逆恢复。
- 命令补全汉化：86 个内置斜杠命令、94 个命令名/别名的顶层说明、实时状态与技能数量；新增seance，原动态逻辑未变。只包装公共provider显示，不改命令名、参数、排序、插入和执行；第三方/未知说明、路径、模型ID保留原文。
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
