# Project Context

## 当前项目

当前源码、开发依赖及适配基线为 18.10.2；真实官方宿主经受支持 update 从 18.9.1 升至 18.10.2（内嵌 Bun 1.4.3）。维护开始最新 Release 为 v18.9.1、远端 main 为 0b31695，本机 GitHub 插件为 18.9.1；原本地主线为 fc689e7 / 18.8.7，含用户 Windows 草稿，在同仓库干净 worktree 适配，不重置或夹带原工作区。实际发布必须现场核对 tag/Release/最终 CI，不凭本文状态。Settings 414/414，新增 task.structured，复核 task.softRequestBudget 说明/哈希；Commands 85 定义/93 标识/27 动态回调相对 18.9.1 逐字未变；Stats 全部 92 源码/73 客户端文件逐字未变，609 键/105 模板保留。完整 check：63 pass/0 fail、2379 次断言，Schema/Commands 静态漂移 0，三轮显示变更 1819 项/零源码网络请求；编译版证据另验。

18.10.2 本地真实编译版证据：Settings 新增结构化任务结果中文搜索、原生布尔保存/恢复、中文思考选项与同进程 en/zh；Commands 裸 /、2 项技能折叠/Tab 展开、第三方及参数/文件原文、models 与 q 别名、Tab/Enter 原生 Settings 执行、plan/loop/model/switch/effort 动态状态、Unicode/ASCII 预设恢复。禁止出站网络的新 TUI 会话 agentStarts/providerRequests 均为 0。Stats 11 个中文导航、中文/English、刷新/路由/同 origin 英文重启、请求与工具 Span 抽屉原始数据、三图表模式、390px 与 G+字母键盘、双项目三会话、真实 SSE 版本进展及 6→7 请求的可见 React 异步更新；12 组原始/包装方法/Host/Origin/操作头/CORS 对照相同。真实 Bun 1.4.3 保留 --smol/用户 preload，单官方监听器、0700/0600 私有路径与空格 TMPDIR；费用确认仅观察并取消，从未点击继续。默认 /usr/bin/open 的成功和人为失败各一次精确新 target 定向回收，既有 13 个用户页面未动。早期验收驱动的 hash/隐藏缓存节点选择器及模态遮挡错误均回收后纠正，不计通过；最终 CI、干净 GitHub 安装及资源零残留仍须现场核对。

18.10.2 生命周期十项（实际 PTY Ctrl+C、异常子进程、launcher SIGKILL/父进程消失、参数/无效及占用端口/恢复）通过，私有目录与页面/进程/端口零残留。修正后的正常 RPC 将全部外部及本机 fetch 在 dispatch 前拒绝，13 次模型目录 GET 尝试、0 推理/费用请求；最终编译 smoke-cli 同样拒绝全部 fetch，macOS 15 次目录 GET。不得称零请求尝试；早期脚手架曾允许本机目录 GET，不能证明未接触已有本机目录服务。发布仍须最终提交 CI、干净 GitHub 安装及最终资源现场核对。

## 已确认的产品边界

- 使用官方二进制与原生 `/settings`，不复制设置面板。
- 当前汉化范围：414 项 UI 元数据，18.9.1→18.10.2 新增 task.structured 并复核 task.softRequestBudget 说明/哈希变化；保留默认值、类型、选项 value、group、凭据标记、8 个可配置动态 getter、保存与可逆恢复语义。
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
