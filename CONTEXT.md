# Project Context

## 当前项目

当前源码、开发依赖和真实官方宿主基线为 18.11.0（内嵌 Bun 1.4.3）；受支持 omp update 将实际宿主 18.10.4→18.11.0，下载补丁经官方 SHA-256 校验。维护开始远端 main ca06e04 / Release v18.10.3、本机同一 GitHub 来源插件 18.10.3，doctor 5/0/0；原受保护工作区 main fc689e7/package 18.8.7 的 15 个修改文件、53 个未跟踪项及 Windows 草稿不动，在同仓库独立主线工作树适配。Windows PR #1 仍 OPEN/draft/DIRTY，不属主线 macOS/Linux 支持。发布以最终提交 CI、干净 GitHub 安装及资源门禁为准，不凭候选文档宣称完成。

Settings 412/412：删除 providers.openai-codex.codeMode / codeModeDirectTools，复核 contextPromotion.enabled、retry.modelFallback、task.structured 三条说明/哈希；gc.compress / gc.compressAfterDays 仅配置。Commands 85 定义/93 标识/27 动态回调与公共 provider 接口未变；/plugins 的 installed plugin 参数说明与 `<plugin>` 原文保留，/new 走新版原生新会话。Stats 全部 73 客户端文件不变，92 源码中 6 个服务端文件涉及定价、压缩暂存排除和窗口分组；609 键/105 严格模板保持，不复制计算。

本机 frozen install/check 64 pass/0 fail、2530 断言，Schema/Commands 静态漂移 0，1816 项显示变化/3 轮恢复/0 源码网络请求。真实新编译 TUI 验证三条设置说明、autoResume false→true→false、中文思考选项与 /effort 英文参数隔离、同进程 en/zh、裸 / 与折叠/展开 2 项技能、models/plugin/q 别名、第三方/文件原文、Tab/Enter 原生设置执行、plan/loop 与 effort high→xhigh、Unicode/ASCII 恢复。隔离的合成性能样本验证 /switch 随 /fast、ultra、/slow 分别选择 default/priority/ultrafast/flex 行；样本不是真实性能。实际英文 provider 的 85 个命令原文与锁定源码无漂移。正式会话 agent_start=0，21 次目录 GET 均在 dispatch 前阻断。早期两次驱动误提交正文各触发一次 agent_start，含推理 POST 尝试但在 dispatch 前被拒绝，不计正式零 turn 证据；随后加入测试专属防误提交门禁，不修改插件产品逻辑。

真实官方绝对路径 smoke 验证 Bun 1.4.3 合并 --smol/用户 preload、空格路径、0700/0600、单监听器和成功/断言失败回收。默认 /usr/bin/open 实际三轮均只创建一个精确 origin 新页；正式成功/人为失败轮先关页再停服务，原 14 个原生页签身份保持。初轮 SPA fragment 判断和紧接关闭后的 AX 异步观察已纠正并回收。默认及命名 Profile/真实 XDG 下稳定逻辑包路径、物理换址后新进程、缺 SHELL/USER/LOGNAME 的 UID 登录 shell、JSON/summary/非 Stats/dry-run/标准卸载通过；local link doctor 3/1/0 的 package_manifest 警告保留，不能代替 GitHub 冷安装。

Stats 实际 11 页中英往返、刷新/路由/同 origin 英文重启、请求和工具 Span 抽屉、三图表模式、390px/键盘、双项目三会话及 6→7 请求异步渲染通过；同名 Requests/Overview/Costs 数据、正文与错误原文保持。费用确认实际显示估算后取消，未点继续。编译 API 验证周窗口跨账户合并、5h/Spark 隔离、无 windowLabel 保留 raw ID；gc scratch 初始/实时均不计入，正常会话 0→1→3、SSE version 2→3→4。26 项原/包装 HTTP 对照仅自有脚本 GET 产生预期差异，原跨 Host/Origin 允许、CORS/拒绝/真实 500 保持。真实 PTY Ctrl+C 两侧退出 0，官方子异常、父消失、launcher SIGKILL（约 3.94s）、非法/占用端口与私有 preload 清理通过；孤儿 wrapper 精确退出码未采集，不宣称退出 0。早期网页驱动的解释器、隐藏旧页面选择器与异步控件等待问题均单独记录并先回收，未作为通过证据。
## 已确认的产品边界

- 使用官方二进制与原生 `/settings`，不复制设置面板。
- 当前汉化范围：412 项 UI 元数据；18.10.3→18.11.0 删除两项 Code Mode，contextPromotion.enabled、retry.modelFallback、task.structured 三项说明/哈希变化；gc.compress / gc.compressAfterDays 不计 UI。插件保留路径、类型、默认值、选项 value、group、凭据标记、8 个动态 getter、原保存与可逆恢复语义。
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
