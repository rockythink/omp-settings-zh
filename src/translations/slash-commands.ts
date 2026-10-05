/* Display-only translations verified against OMP 18.6.1. */
export const slashCommandTranslations = [
  {
    "name": "security",
    "en": "Plan, run, inspect, import, and compare OMP-native security scans",
    "zh": "规划、运行、查看、导入和对比 OMP 原生安全扫描"
  },
  {
    "name": "settings",
    "en": "Open settings menu",
    "zh": "打开设置菜单"
  },
  {
    "name": "setup",
    "aliases": [
      "providers"
    ],
    "en": "Open provider setup",
    "zh": "打开提供商配置"
  },
  {
    "name": "plan",
    "en": "Toggle plan mode (agent plans before executing)",
    "zh": "切换计划模式（智能体先规划，再执行）"
  },
  {
    "name": "plan-review",
    "en": "Re-open the plan review for the latest plan (plan mode only)",
    "zh": "重新打开最新计划的审核界面（仅计划模式）"
  },
  {
    "name": "vibe",
    "en": "Toggle vibe mode (direct persistent fast/good worker sessions; read-only toolset)",
    "zh": "切换 Vibe 模式（直接调度持久的 fast/good 工作会话；只读工具集）"
  },
  {
    "name": "goal",
    "en": "Toggle goal mode (persistent autonomous objective for this session)",
    "zh": "切换目标模式（为当前会话持续自主推进目标）"
  },
  {
    "name": "guided-goal",
    "en": "Have the agent interview you in chat, then set up goal mode",
    "zh": "让智能体先在对话中询问需求，再配置目标模式"
  },
  {
    "name": "loop",
    "en": "Toggle loop mode. While enabled, the next prompt you send re-submits after every yield. Bound it with a count/duration, or gate it with `--until '<cmd>'` / `--while '<cmd>'` — the command's exit status decides whether the next iteration runs. Esc suspends the ongoing loop; /loop again to disable.",
    "zh": "切换循环模式。启用后，你发送的下一条提示会在每次交还控制权后重新提交。可用次数或时长限定，或用 `--until '<cmd>'` / `--while '<cmd>'` 控制；命令的退出状态决定是否继续下一轮。Esc 暂停当前循环；再次执行 /loop 关闭。"
  },
  {
    "name": "queue",
    "en": "Queue a message for after the agent yields",
    "zh": "将消息排队，等待智能体交还控制权后处理"
  },
  {
    "name": "model",
    "aliases": [
      "models"
    ],
    "en": "Switch model for this session",
    "zh": "切换当前会话的模型"
  },
  {
    "name": "switch",
    "en": "Switch model for this session (same as Option+P); accepts fuzzy ids, provider/id, @role, :level",
    "zh": "切换当前会话的模型（同 Option+P）；支持模糊 ID、provider/id、@role、:level"
  },
  {
    "name": "fast",
    "en": "Toggle fast service (OpenAI service_tier=priority or ultrafast, Anthropic speed=fast, Google priority)",
    "zh": "切换快速服务（OpenAI service_tier=priority 或 ultrafast、Anthropic speed=fast、Google priority）"
  },
  {
    "name": "slow",
    "en": "Toggle slow mode: flex tier on OpenAI/Google; on Anthropic, continue at low priority after the Claude session limit",
    "zh": "切换慢速模式：OpenAI/Google 使用 flex 层级；Anthropic 在 Claude 会话额度耗尽后以低优先级继续"
  },
  {
    "name": "skillful",
    "en": "Toggle listing available skills in the system prompt (session only)",
    "zh": "切换在系统提示中列出可用技能（仅当前会话）"
  },
  {
    "name": "extended-context",
    "en": "Toggle extended context windows",
    "zh": "切换扩展上下文窗口"
  },
  {
    "name": "computer",
    "en": "Toggle the native computer-use eval prelude for this session",
    "zh": "切换当前会话的原生 computer-use eval 预置环境"
  },
  {
    "name": "ratchet",
    "en": "Build (or reuse) an eval for an LLM flow, then hillclimb it unattended",
    "zh": "为 LLM 流程创建（或复用）评估，然后自动迭代优化"
  },
  {
    "name": "prewalk",
    "en": "Arm or restart a one-shot model handoff",
    "zh": "启用或重新启动一次性模型交接"
  },
  {
    "name": "modelpreset",
    "en": "Save and switch model presets (role models + thinking level)",
    "zh": "保存和切换模型预设（角色模型及思考级别）"
  },
  {
    "name": "effort",
    "en": "Set reasoning effort (thinking level, intelligence) for this session; Shift+Tab cycles levels",
    "zh": "设置当前会话的推理强度（思考级别、智能程度）；Shift+Tab 循环切换级别"
  },
  {
    "name": "advisor",
    "en": "Toggle the advisor (a second model that reviews each turn and injects notes)",
    "zh": "切换顾问模型（第二个模型，每轮审核并注入建议）"
  },
  {
    "name": "export",
    "en": "Export session to HTML file",
    "zh": "将会话导出为 HTML 文件"
  },
  {
    "name": "trace",
    "en": "Open this session's trace in the stats dashboard",
    "zh": "在统计面板中打开当前会话的调用轨迹"
  },
  {
    "name": "dump",
    "en": "Copy session transcript to clipboard (and write LLM request JSON to tmp)",
    "zh": "将会话记录复制到剪贴板（并将 LLM 请求 JSON 写入临时目录）"
  },
  {
    "name": "share",
    "en": "Share session via an encrypted link (share server or secret gist)",
    "zh": "通过加密链接分享会话（分享服务器或私密 gist）"
  },
  {
    "name": "collab",
    "en": "Share this session live via a relay",
    "zh": "通过中继实时共享当前会话"
  },
  {
    "name": "join",
    "en": "Join a shared collab session",
    "zh": "加入共享协作会话"
  },
  {
    "name": "leave",
    "en": "Leave the collab session",
    "zh": "离开协作会话"
  },
  {
    "name": "browser",
    "en": "Toggle browser eval-prelude headless vs visible mode",
    "zh": "切换 browser eval 预置环境的无头／可见模式"
  },
  {
    "name": "copy",
    "en": "Pick text or code from the conversation to copy",
    "zh": "选择对话中的文本或代码进行复制"
  },
  {
    "name": "open",
    "en": "Open the last link from the conversation in your browser (or pick one with /copy)",
    "zh": "在浏览器中打开对话中的最后一个链接（或用 /copy 选择）"
  },
  {
    "name": "todo",
    "en": "View or modify the agent's todo list",
    "zh": "查看或修改智能体的待办列表"
  },
  {
    "name": "session",
    "en": "Session management commands",
    "zh": "会话管理命令"
  },
  {
    "name": "jobs",
    "en": "Show async background jobs status",
    "zh": "显示异步后台任务状态"
  },
  {
    "name": "usage",
    "en": "Show provider usage and limits",
    "zh": "显示提供商用量和额度限制"
  },
  {
    "name": "stats",
    "en": "Launch the local stats dashboard",
    "zh": "启动本地统计面板"
  },
  {
    "name": "changelog",
    "en": "Show changelog entries",
    "zh": "显示更新日志"
  },
  {
    "name": "hotkeys",
    "en": "Show all keyboard shortcuts",
    "zh": "显示所有快捷键"
  },
  {
    "name": "tools",
    "en": "Show tools currently visible to the agent",
    "zh": "显示智能体当前可用的工具"
  },
  {
    "name": "context",
    "en": "Show estimated context usage breakdown",
    "zh": "显示上下文用量估算明细"
  },
  {
    "name": "extensions",
    "aliases": [
      "status"
    ],
    "en": "Open Extension Control Center dashboard",
    "zh": "打开扩展控制中心"
  },
  {
    "name": "agents",
    "en": "Open the agents hub (per-agent model, prewalk, and advisor)",
    "zh": "打开智能体中心（各智能体的模型、prewalk 和顾问）"
  },
  {
    "name": "git",
    "en": "Open the git UI (split diff viewer, staging, commit composer)",
    "zh": "打开 Git 界面（分栏差异查看、暂存和提交编辑）"
  },
  {
    "name": "hub",
    "en": "Open the live Agent Hub",
    "zh": "打开实时 Agent Hub"
  },
  {
    "name": "branch",
    "aliases": [
      "rewind"
    ],
    "en": "Rewind to a previous message, keeping the old path as a branch",
    "zh": "回退到先前的消息，将原路径保留为分支"
  },
  {
    "name": "fork",
    "en": "Create a new fork from a previous message",
    "zh": "从先前的消息创建新分叉"
  },
  {
    "name": "tree",
    "en": "Navigate session tree (switch branches)",
    "zh": "浏览会话树（切换分支）"
  },
  {
    "name": "login",
    "en": "Login with OAuth provider",
    "zh": "使用 OAuth 提供商登录"
  },
  {
    "name": "logout",
    "en": "Logout from OAuth provider",
    "zh": "退出 OAuth 提供商登录"
  },
  {
    "name": "mcp",
    "en": "Manage MCP servers (add, list, remove, test)",
    "zh": "管理 MCP 服务器（添加、列出、移除、测试）"
  },
  {
    "name": "ssh",
    "en": "Manage SSH hosts (add, list, remove)",
    "zh": "管理 SSH 主机（添加、列出、移除）"
  },
  {
    "name": "new",
    "en": "Start a new session",
    "zh": "开始新会话"
  },
  {
    "name": "fresh",
    "en": "Reset provider stream state without changing the local transcript",
    "zh": "重置提供商流状态，不改变本地会话记录"
  },
  {
    "name": "clear",
    "en": "Clear the conversation context in place, keeping the session",
    "zh": "清空当前对话上下文，保留会话"
  },
  {
    "name": "delete",
    "en": "Delete the current session and start a new one",
    "zh": "删除当前会话并开始新会话"
  },
  {
    "name": "compact",
    "en": "Manually compact the session context",
    "zh": "手动压缩会话上下文"
  },
  {
    "name": "shake",
    "en": "Drop heavy content from context (tool results, large blocks)",
    "zh": "从上下文中移除大型内容（工具结果、大段文本）"
  },
  {
    "name": "handoff",
    "en": "Summarize the session into a handoff document and compact in place",
    "zh": "将会话总结为交接文档，并压缩当前上下文"
  },
  {
    "name": "resume",
    "en": "Resume a different session",
    "zh": "恢复另一个会话"
  },
  {
    "name": "pin",
    "en": "Pin or unpin a session at the top of the resume list",
    "zh": "将会话置顶或取消置顶于恢复列表"
  },
  {
    "name": "btw",
    "en": "Ask a side question, or browse this session's BTW history",
    "zh": "询问旁支问题，或浏览当前会话的 BTW 历史"
  },
  {
    "name": "tan",
    "en": "Run a full background agent on tangential work",
    "zh": "启动完整后台智能体处理旁支工作"
  },
  {
    "name": "omfg",
    "en": "Forge a TTSR rule from a complaint to stop a recurring behavior",
    "zh": "根据不满反馈生成 TTSR 规则，避免反复出现同类行为"
  },
  {
    "name": "cleanse",
    "en": "Detect and fix project diagnostics with weighted parallel subagents",
    "zh": "通过按权重分配的并行子智能体检测并修复项目诊断问题"
  },
  {
    "name": "retry",
    "en": "Retry the last failed agent turn",
    "zh": "重试上一次失败的智能体回合"
  },
  {
    "name": "debug",
    "en": "Open debug tools selector",
    "zh": "打开调试工具选择器"
  },
  {
    "name": "memory",
    "en": "Inspect and operate memory maintenance",
    "zh": "查看和执行记忆维护"
  },
  {
    "name": "rename",
    "en": "Rename the current session (omit title to generate)",
    "zh": "重命名当前会话（不提供标题则自动生成）"
  },
  {
    "name": "move",
    "en": "Move the current session to a different directory",
    "zh": "将当前会话移至另一目录"
  },
  {
    "name": "wt",
    "aliases": [
      "worktree"
    ],
    "en": "Move this session into a new worktree, changes included",
    "zh": "将当前会话及其改动移入新 worktree"
  },
  {
    "name": "add-dir",
    "en": "Add a workspace directory to this session (multi-root)",
    "zh": "为当前会话添加工作区目录（多根目录）"
  },
  {
    "name": "remove-dir",
    "en": "Remove a workspace directory from this session",
    "zh": "从当前会话移除工作区目录"
  },
  {
    "name": "dirs",
    "en": "List this session's workspace directories",
    "zh": "列出当前会话的工作区目录"
  },
  {
    "name": "exit",
    "en": "Exit the application",
    "zh": "退出应用"
  },
  {
    "name": "restart",
    "en": "Restart omp with the same launch flags, resuming this session",
    "zh": "保留原启动参数重启 OMP，并恢复当前会话"
  },
  {
    "name": "marketplace",
    "en": "Manage marketplace plugin sources and installed plugins",
    "zh": "管理插件市场来源和已安装插件"
  },
  {
    "name": "plugins",
    "aliases": [
      "plugin"
    ],
    "en": "View and manage installed plugins",
    "zh": "查看和管理已安装插件"
  },
  {
    "name": "reload-plugins",
    "en": "Reload all plugins (skills, commands, hooks, tools, agents, MCP)",
    "zh": "重新加载所有插件（技能、命令、Hook、工具、智能体、MCP）"
  },
  {
    "name": "skills",
    "en": "Search, install, and update skills from the skills.omp.sh registry",
    "zh": "从 skills.omp.sh 技能注册中心搜索、安装和更新技能"
  },
  {
    "name": "force",
    "aliases": [
      "force:"
    ],
    "en": "Force next turn to use a specific tool",
    "zh": "强制下一轮使用指定工具"
  },
  {
    "name": "live",
    "en": "Start Codex-backed realtime voice mode",
    "zh": "启动基于 Codex 的实时语音模式"
  },
  {
    "name": "record",
    "en": "Start or stop recording this screen to a replayable file (omp play)",
    "zh": "开始或停止屏幕录制，生成可回放文件（omp play）"
  },
  {
    "name": "pause",
    "en": "Freeze all agents (main, subagents, advisor) until resumed",
    "zh": "暂停所有智能体（主智能体、子智能体、顾问），直到恢复"
  },
  {
    "name": "quit",
    "aliases": [
      "q"
    ],
    "en": "Quit the application",
    "zh": "退出应用"
  }
] as const;
