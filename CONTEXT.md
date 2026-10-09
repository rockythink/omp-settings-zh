# Project Context

## 当前项目

`omp-settings-zh` 工作区候选为 18.8.7，目标及开发依赖为官方 OMP 18.8.7；最新已发布仍为 v18.8.4／main 100e420。2026-10-09 受支持 `omp update` 将真实 Mach-O 宿主 18.8.5 → 18.8.7。本机插件为 GitHub 来源 18.8.4，doctor 5 ok／0 warning／0 error，不是 local link。Settings UI 410/410，相对 18.8.4 新增 6 项并复核 title.icons、tools.xdev 两项说明与哈希；两项模型压缩阈值配置无 UI。Commands 85 定义／93 标识／27 动态回调及 provider 合同未变。Stats 90 源码／72 客户端文件逐字不变，609 键／105 严格模板保留；共享模型目录及价格规则变化交由官方计算。精确不含 Windows 草稿的主线候选 frozen install 与 check 为 58 pass／0 fail，Schema 和 Commands 静态漂移 0；真实官方 CLI 冒烟完成默认加载、doctor、原 Stats JSON／同源网页、SIGINT 零退出、dry-run／卸载与端口关闭。早期 TUI 驱动错误提交计划提示，占位密钥返回 401；失败轮不计验收，后续改用出站网络拒绝与逐键提交核对。完整三部分交互、默认 opener、Profile／生命周期、最终提交 macOS/Linux CI、冷 GitHub 安装及资源回收仍为门禁，未通过不得发布。Windows PR #1 仍为 OPEN／draft／CONFLICTING，不随主线发布。

本轮真实编译版证据：原生设置搜索、新增 6 项、autoResume 原生编辑及同进程中英往返；思考选项中文与 /effort 参数英文隔离；裸 /、折叠 skill:、技能数量、plan／loop／effort 实时状态与 Tab／Enter 原生 Settings 执行。Stats 11 页、中英往返、请求抽屉／追踪／图表／窄屏／键盘、同 origin 重启保留、双项目数据、原 API 权限、SSE version 2→3 及真实请求数 5→6 已验证。默认及命名 Profile／实际启用 XDG 下迁移物理包位置后新编译进程仍加载稳定逻辑路径；source-linked doctor 为 3 ok／1 warning／0 errors，缺 package_manifest 的警告不掩盖。父进程消失、wrapper SIGKILL、非法／占用端口与私有 preload 清理已验证。系统默认 opener 未启动：原生观测无法取得既有浏览器页签身份，不能安全认领并关闭其自动页面，故该门禁阻塞，不能发布。

## 已确认的产品边界

- 使用官方二进制与原生 `/settings`，不复制设置面板。
- 当前汉化范围：410 项含 UI 元数据的设置名称、说明、风险警告和静态选项；本轮新增 6 项，更新 title.icons、tools.xdev 两项说明与原文哈希。保留默认值、类型、选项 value、group、凭据标记、动态 getter、保存与可逆恢复语义。
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

仓库不包含定时调度器；现有外部 Orca 任务「OMP 更新与中文插件维护（Settings + Commands + Stats）」每天 Asia/Shanghai 23:00 在原工作区执行，三部分独立审查、验证和报告。此次仅修改任务名称与提示词，调度及既有授权不变，未立即触发运行。即使设置或 OMP 无变化，也需独立核验 Commands 的注册表/动态状态/接口与 Stats 上游稳定版线索和实际运行时；不得恢复固定 npm Stats 替代运行时。
- 上游适配以目标版本为编号基线，独立功能或修复递增插件补丁号；已用编号不得复用，明确记录实际宿主。上游无设置变化也须核验接口、自动检查和真实编译版；变化先补译或复核，检查失败不发布。

官方上游：https://github.com/can1357/oh-my-pi

文档优先级：`docs/PRD.md` 定义需求；`docs/TECHNICAL-DESIGN.md` 定义实现；`docs/TRANSLATION-GUIDE.md` 定义译文；`docs/OPEN-SOURCE-RELEASE.md` 定义发布门禁；`CONTRIBUTING.md` 定义贡献流程。上游真实行为变化时，先核验再同步文档。
