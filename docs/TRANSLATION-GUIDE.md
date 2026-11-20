# 简体中文翻译规范

本规范适用于 OMP `/settings` 设置显示文案；内置斜杠补全与 Stats Web 另按以下边界适配。

当前范围为设置项名称、说明、警告和静态选项。页签、分组与硬编码操作提示保持官方原文，不计入翻译覆盖率。

## 内置斜杠补全译文边界

- 当前来源OMP19.0.1官方BUILTIN_SLASH_COMMAND_DEFS；89条说明、98名称/别名、9别名及27动态回调。19.0.1无补全说明变化（`/copy local`仅执行侧）；19.0.0仅`/handoff`说明变为“后台交接压缩（等同`/compact handoff`）”并改译，别名与动态回调源码不变（18.20.3曾删除`/seance`并同步移除译文）；`/commit`会生成提交提示词，验收只看补全说明、不执行。viewSession、switch有效层级、真实键位、descriptionMatch与原生Enter保护保持；源码行为通过不代证compiled TUI验收。
- 只翻译顶层补全的说明与实时状态、`skill:` 数量；参数提示、命令名、别名、模型／提供商 ID、路径与目标正文保持原样。
- `switch` / `loop` / `effort` 的动态快捷键按宿主实际显示捕获，中文保留原键位。除键位占位外必须匹配官方原文，第三方覆盖、技能说明和未知文案不改。
- `/settings-language en` 恢复官方补全结果；中文与英文都须验证排序、Tab／Enter 插入和实际官方编译版，不能用静态表检查代替。
- `bun run commands:check` 将目标官方完整注册表与译文逐条比对，拒绝新增漏译、删除残留、空译文、英文/别名漂移和标识冲突；仅 `switch` / `loop` 的已知键位占位变化不算原文漂移，周围原文仍须匹配。其余静态原文严格比对；显示层的 `effort` 真实键位支持不放宽静态门禁。动态状态生成逻辑和 provider 接口变化须独立审查，不能以静态覆盖替代。

## Stats Web 译文边界

- 19.0.1审阅：时间范围新增“2d”“3d”（译“2天”“3天”，窗口说明“最近2天”“最近3天”），按钮提示序号按官方8项顺序生成（“最近7天（5）”等），侧栏“1–8 时间范围”中键位保持原样。
- 19.0.0审阅：概览“By source”行中Main agent/Subagents/Advisor为固定UI标签并翻译；旁路用途类别（Title、Judge、Thinking等，首字母大写的存储purpose）是数据，即使与词典键同名也保持原文；“Decision models”卡标题/说明翻译、类别保持原文；“By agent”键随官方移除删除。
- 当前审阅基线为官方`@oh-my-pi/omp-stats@19.0.1`，客户端仅Shell/TimeChart/range/types相对19.0.0变化（见上条）；字典947键（含8个官方范围展开项）、155通用严格模板及9个Spotlight作用域属性模板。18.22.2曾改Gain页：来源列“Snapcompact imaged tool results”/“Snapcompact compaction (context freed)”只在该列`.cell-primary`单文本节点经`statsGainSources`译为“Snapcompact 图像化工具结果”/“Snapcompact 压缩（释放的上下文）”，项目范围版说明（含项目名）安全回退英文。18.20.2客户端Costs/Gain/Providers与range/series改按本地日历日分桶，3条“Per UTC day…”说明改为“Per day…”并同步更新为“按日汇总…”。失败原因列6个已知代码标签只作用于该列节点，HTTP状态码、未知代码、百分比与数据捕获值保持原文。日期刻度由浏览器Intl本地化，插件不改。mutations/preload不改；未知文案、混合数据提示与canvas安全回退英文。19.0.1真实网页因环境前提未完整重验，不能继承旧版通过记录。
- `src/stats/translations.ts` 只包含原文键、中文值及严格锚定的动态模板；浏览器端必须先通过官方 UI 区域白名单，不能在整页全局替换英文。
- 保留模型、提供商、工具、项目与账户名称、路径、请求与会话正文、错误原文、协议、数字和模板中的实际数据；未知文案与 canvas 内绘制内容保持官方原文。Window utilization 普通 tooltip series 标签是账户数据，即使为 Requests／Other (3) 也不译；仅官方带 tone-bad 的 Exhausted 注记与 total 固定标签属于 UI。
- 切回 English 恢复原始文本与显示属性；验证 React 异步更新、路由复用与译文键同名的数据值，不只检查首页。外部写入即使与插件上次显示相同，也须失效旧来源；一批外部文本／属性写入全部失效后才渲染，不能误恢复真实数据。表头复用须重新判断整表单元格的 UI／数据身份。同 origin 的偏好跨刷新、路由与服务重启保留，首次默认中文；网页语言独立于 /settings-language。页面脚本在原 Stats 服务同端口加载，不增加代理。
- Frustration 的费用提示、估算与确认语义不得弱化；切换语言不触发网络操作或评估。

## 1. 翻译目标

译文首先帮助用户准确判断“这个设置控制什么、什么时候生效、有什么风险”，其次才追求自然表达。采用克制翻译：普通界面词和解释性文案译为中文；产品名、工具名、协议、缩写以及直接使用更清楚的英文技术名称保留原文。不得为了“全中文”或口语化牺牲技术含义。

## 2. 不可改变的内容

以下内容默认保持原样：

- 设置路径，如 `compaction.enabled`；
- 命令，如 `/settings`、`omp config set`；
- 枚举和配置值，如 `stable`、`canary`；
- 工具名，如 `read`、`edit`、`lsp`；
- 模型和提供商名称；
- OMP 功能名和产品化名称，如 Advisor、Prewalk、Mnemopi、Hindsight、Snapcompact、Shake、Archive；Archive 是 Agent 的只读历史浏览能力，不译为归档操作，说明中的 archive 和 eval 标识保留原文；
- 协议和技术缩写，如 MCP、LSP、DAP、TTS、STT、RPC；
- 环境变量、文件名、路径、URL；
- 代码标识符和正则表达式；
- 参与程序判断的字符串。

选项可以翻译显示用 `label` 和 `description`，但绝不能修改 `value`。
Settings 选项显示副本与宿主共享原文源必须隔离；不能因设置项的中文挂载而改变 `/effort` 等参数补全的原始说明。

## 3. 翻译单位

每条翻译必须绑定明确标识：

- 设置：完整 `setting path`；
- 选项：`setting path + option value`。

禁止对英文文案做全局字符串替换。相同英文词在不同设置中可能有不同语义。

## 4. 文风

### 4.1 标签

- 翻译普通界面词时，优先使用短名词或动宾结构；
- 中文标签一般控制在 2–10 个汉字；
- 产品名、工具名和更清楚的英文技术名称可以完整保留；
- 不添加句号；
- 与相邻设置保持同一语法结构。

示例：

- `Auto Resume` → `自动恢复`
- `Diagnostics on Write` → `写入后诊断`
- `Shared Language Servers` → `共享语言服务器`

### 4.2 说明

- 直接说明行为、条件和结果；
- 默认使用陈述句；
- 避免“您可以”“这个选项会”等无信息前缀；
- 原文只有一句时，译文通常也保持一句；
- 保留重要限制、优先级、回退和副作用；
- 句末通常不加句号，与 OMP 当前设置说明风格保持一致。

### 4.3 风险警告

风险级别不得弱化。涉及封号、限流、数据丢失、外发、费用或安全边界时，必须保留明确后果和触发条件。

不得把 `may get your account flagged or banned` 弱化为“可能有风险”。

### 4.4 标点与空格

- 中文语句使用全角中文标点；
- 中文与英文缩写、数字之间不强制加入空格，按可读性统一；
- 代码、路径、键名和值使用反引号；
- 括号内为英文标识时使用半角括号也可，但同一条目保持一致；
- 不使用 emoji 补充原文没有的语气。

## 5. 核心术语表

| English | 推荐译法 | 说明 |
|---|---|---|
| Appearance | 外观 | 设置页签 |
| Model | 模型 | 设置页签 |
| Interaction | 交互 | 设置页签 |
| Context | 上下文 | LLM 上下文语境 |
| Memory | 记忆 | OMP 记忆系统 |
| Files | 文件 | 设置页签 |
| Shell | Shell | 指 Unix Shell 时保留；描述终端表面时可译“终端” |
| Tools | 工具 | 设置页签 |
| Tasks | 任务 | 设置页签 |
| Providers | 提供商 | 模型/API 提供商 |
| Setting | 设置 | 不译“配置项”，除非强调配置文件 |
| Configuration | 配置 | |
| Prompt | 提示词 | 不译“提示” |
| System Prompt | 系统提示词 | |
| Thinking | 思考 | 模型推理强度语境 |
| Reasoning | 推理 | 模型能力或推理 token 语境 |
| Compaction | 压缩 | 上下文压缩 |
| Context Window | 上下文窗口 | |
| Fallback | 回退 | 不译“降级”，除非原文强调能力下降 |
| Retry | 重试 | |
| Steering | 引导 | 会话中途引导模型 |
| Follow-up | 后续消息 | 根据消息队列语境可译“跟进消息” |
| Tool Call | 工具调用 | |
| Approval | 审批 | 工具权限语境 |
| Permission | 权限 | |
| Hook | Hook | 首次出现可写“Hook（钩子）” |
| Extension | 扩展 | OMP Runtime Extension |
| Plugin | 插件 | OMP 可安装包 |
| Workspace | 工作区 | |
| Session | 会话 | |
| Resume | 恢复会话 | 标签空间不足时可用“恢复” |
| Branch | 分支 | 会话树分支 |
| Tree | 会话树 | 单独出现且语境明确时可用“树” |
| Cache | 缓存 | |
| Token | token | 保留小写英文，数量单位同样使用 token |
| Rate Limit | 速率限制 | |
| Timeout | 超时 | |
| Endpoint | 端点 | API Endpoint 可写“API 端点” |
| Credential | 凭据 | |
| Secret | 密钥 | 若泛指敏感值可译“敏感信息” |
| Redaction | 脱敏 | |
| Diagnostics | 诊断 | LSP 语境 |
| Language Server | 语言服务器 | |
| Lazy | 延迟 | 按需启动语境，不译“懒加载” |
| Preview | 预览 | |
| Inline | 行内 | |
| Overlay | 覆盖层 | UI 语境 |
| Status Line | 状态栏 | |
| Composer | 输入框 | OMP Composer Shape 语境可写“输入框样式” |
| Theme | 主题 | |
| Light/Dark | 浅色/深色 | 主题语境 |

术语表不是机械替换表。译者必须结合完整说明判断语境。

## 6. 翻译完整性

一条设置被计为“完整翻译”必须满足：

- `label` 已翻译；
- `description` 已翻译；
- 原文存在 `warning` 时警告已翻译；
- 原文存在静态选项时，每个选项的 `label` 已翻译；
- 原文存在选项说明时对应说明已翻译；
- 英文原文哈希与已复核的宿主元数据一致。

仅翻译标签而遗漏说明属于部分翻译，不得计入 P0 完成率。

动态快捷键说明使用 `description` 中文模板与 `descriptionSource` 官方英文模板的同名占位符，例如 `{escape}`。占位符从原始 getter 当前返回值捕获，不把 `Esc`、`⌃C` 等某一符号预设硬编码进中文。必须同时验证换符号后的显示和切回原版后的 getter 恢复。模板只能包含数据，不得包含执行逻辑。

平台限定选项必须按官方条件建立 `byPlatform` 完整记录，并分别复核原文哈希与选项值。基础记录用于未覆盖的平台；例如 Apple 词典选项只存在于 Darwin 变体。不得把平台差异当成可以忽略所有选项删除或哈希变化的理由。

## 7. 上游变更处理

### 新增设置

先理解设置行为和相关源码，再翻译。没有足够依据时保留英文并提交待确认 Issue，不猜测。

### 修改英文说明

即使中文读起来仍通顺，也必须检查语义差异。覆盖检查应把上游原文哈希变化标记为待复核。

### 删除设置

从活动翻译表删除；历史可由 Git 保留。不得继续维护无法命中的孤立翻译。

### 选项变化

严格按 `value` 比较。新增值补译；删除值移除；值重命名视为删除加新增，不按相似标签自动迁移。

## 8. 来源与归属

活动翻译只以目标版本 OMP 官方设置注册表的英文显示元数据为语义来源：

1. 从锁定的`@oh-my-pi/pi-coding-agent@19.0.1`完整注册图提取英文；477UI，19.0.1相对19.0.0无设置变化。19.0.0新增缓存保温策略、缓存衔接压缩百分比/token数、`task.crossInstance`、`mcp.evalNamespaces`、`mcp.builtinTransforms`六项独立翻译，`providers.cacheWarming`、`tools.intentTracing`、`isolation.backend`、`ovnfs.path`、`task.enableLsp`按新原文改译（Keep Alive译“保持存活”，bridge译“衔接”；max_tokens、node_repl、PAL、print/RPC/ACP/SDK保持原文）；18.22.2新增`providers.webKeyless`、`live.endpoint`、`live.apiKey`三项独立翻译，`live.voice`、`task.structured`、`browser.relay`/`cmux`/`tern`按新原文改译；18.22.0新增`tui.renderEmbeds`、`disassembler.backend`/`maxOpen`/`idleCloseSec`、`ghidra.installDir`/`python`六项并删除官方移除的三项`ida.*`，`tts.localVoice`/`localSpeed`、`speech.voice`/`speed`、`speechgen.enabled`按Phonon音色与0.8–1.3语速改译，`worktree.onExit`补译`force`；其余466项原文哈希不变、不重译。Phonon、Kokoro、Ghidra、PyGhidra、IDA Pro、idalib、JDK、dsm、exec、`<img>`/`<iframe>`、音色人名、Parallel/Exa/Firecrawl/Keenable/Perplexity/Jina/Startpage/DuckDuckGo/Ecosia/Google/Mojeek/Hacker News、OpenAI Realtime WebRTC、Codex、Bearer、!command、`app: "relay"`/`"tern"`、judge、input_type、query/passage、Qwen3-Embedding、E5、NVIDIA NIM、eval、prelude、/commit、bash.patterns、环境变量名、GEMINI_API_KEY、google-vertex与Issue编号保留原文。固定官方commit `f40f335845f0b136453d12fec8d6057011082766`的源码与npm全部2047份coding-agent源码逐字节一致，4个导出模板源按package.files排除；utils133/Stats121/TUI473份亦一致；
2. 使用本项目自己的 LLM 能力按本规范生成初稿，不输入或复用第三方中文译文；
3. 按设置路径和选项 `value` 校验完整性；
4. 用英文原文哈希标记待复核的上游语义变化；
5. 对共享宿主元数据强制使用一致译文，冲突时失败关闭；
6. 不复制 OMP 或第三方项目的功能代码、提示词、构建产物或二进制。

通用词语出现相同译法不构成来源复用；每条活动译文都必须能从锁定的官方英文原文独立重建和复核。

## 9. 翻译评审清单

每个翻译 PR 必须确认：

- [ ] 绑定的是正确设置路径或选项值；
- [ ] 未修改任何设置键、默认值或枚举值；
- [ ] 行为、条件、优先级和副作用完整保留；
- [ ] 风险表述没有弱化；
- [ ] 专有名词符合术语表；
- [ ] 中英文和数字标点一致；
- [ ] 当前英文原文哈希已更新；
- [ ] 覆盖检查没有新增 stale 或 mismatch；
- [ ] 对不确定译法提供了源码或官方文档依据。

## 10. 争议处理

译法有争议时按以下优先级判断：

1. OMP 源码中的实际行为；
2. OMP 官方文档中的术语；
3. 上下游相关项目的通用技术术语；
4. 本项目既有术语一致性；
5. 中文表达自然度。

无法在 PR 中达成一致时保留英文，比提交可能误导用户的中文更安全。
