import type { LocalePack } from "./types";

export const zhCN = {
  "locale": "zh-CN",
  "sourceOmpVersion": "18.4.4",
  "settings": {
    "autoResume": {
      "sourceHash": "0acb3a94cdc9ddbf65f3529da5f5779ebc8ef1b1c99b7d1c29f1731edacfd300",
      "label": "自动恢复",
      "description": "自动恢复当前目录中最近的会话"
    },
    "power.sleepPrevention": {
      "sourceHash": "f5493aa7f9bdab68b1e4d5cbb745f6c3925423f42c5e68232ea23a2d3b2f51dd",
      "label": "阻止睡眠",
      "description": "在活跃会话期间阻止系统睡眠。各级别效果会累加，即包含所有更低级别的标志",
      "options": {
        "off": {
          "label": "关闭",
          "description": "不阻止任何睡眠"
        },
        "idle": {
          "label": "阻止空闲睡眠",
          "description": "会话打开期间保持系统唤醒（macOS `caffeinate -i`）"
        },
        "display": {
          "label": "阻止显示器睡眠",
          "description": "同时阻止显示器因空闲而睡眠（macOS `caffeinate -i -d`）"
        },
        "system": {
          "label": "阻止系统睡眠",
          "description": "同时在使用交流电源时阻止所有系统睡眠，并声明用户处于活跃状态（macOS `caffeinate -i -d -s -u`）"
        }
      }
    },
    "advisor.enabled": {
      "sourceHash": "9a5b44778ea7e6735705a0795f47639f3f498461a65d0f811734d5a32124e1be",
      "label": "启用 Advisor",
      "description": "搭配一个分配给“advisor”角色的第二模型，被动审查每个轮次并注入备注"
    },
    "prewalk.enabled": {
      "sourceHash": "216aa6a231a0c76446686388a1c9695577c3f6a126834d97294ea8ce835360c0",
      "label": "启用 Prewalk",
      "description": "先使用当前模型启动，然后在规划提示的待办列表生成后，于首次编辑/写入时切换到快速/低成本模型（默认为“smol”角色）——由高能力模型制定计划、确认待办事项并开始实现，然后再交接。每个会话可通过 --prewalk / --no-prewalk 覆盖此设置"
    },
    "advisor.syncBacklog": {
      "sourceHash": "165701896fc41f459ee7b994a82a7c71e213a02d8075b563ec1dcf521f03b7de",
      "label": "Advisor 同步积压阈值",
      "description": "如果 Advisor 落后达到此轮数，主 agent 最多暂停 30 秒。关闭后禁用追赶延迟"
    },
    "advisor.immuneTurns": {
      "sourceHash": "f54d6bf6fd6f4d76613f298768f6c5ce6720f18f0a5a6ff65800e8b0170ddd10",
      "label": "Advisor 免打扰轮数",
      "description": "Advisor 的疑虑或阻断问题造成中断后，在接下来的这些主轮次中以不中断方式传递后续疑虑或阻断问题",
      "options": {
        "0": {
          "label": "0 轮",
          "description": "允许每个疑虑或阻断问题触发中断"
        },
        "1": {
          "label": "1 轮"
        },
        "2": {
          "label": "2 轮"
        },
        "3": {
          "label": "3 轮",
          "description": "默认值"
        },
        "4": {
          "label": "4 轮"
        },
        "5": {
          "label": "5 轮"
        }
      }
    },
    "git.enabled": {
      "sourceHash": "afd129831760ccaf6388c663de326f37d9a6001a1c19c1ebd99cc5aa47a5b5b0",
      "label": "启用 Git 集成",
      "description": "在 TUI 中显示 Git 分支、状态和 PR 信息，并监视仓库元数据"
    },
    "providers.maxInFlightRequests": {
      "sourceHash": "47cc3667d60052e8a40bef6747773c42dda7a1a855279b31cc8c96800e16b6f2",
      "label": "最大并发请求数",
      "description": "每个提供商 ID（例如 \"openai\" 或 \"anthropic\"）允许的最大并发 LLM 请求数，由使用此配置根目录的本地 OMP 进程共享；未列出的提供商不受限制"
    },
    "providers.openai-codex.codeMode": {
      "sourceHash": "596c36b70f679951fff0b98a161c980337a016fb0dcf16b81823d7f1d27d3343",
      "label": "Codex Code Mode",
      "description": "通过 `eval` 路由 Codex `code_mode_only` 模型（GPT-5.6）。直接工具为 `eval`、`ask`、`todo`、`yield`、`think`、`checkpoint` 和 `rewind`；其他会话工具通过 `eval` 单元调用。与 codex-rs Code Mode 保持一致。`auto` 遵循模型目录中的标记"
    },
    "providers.openai-codex.codeModeDirectTools": {
      "sourceHash": "21ff26a401f3283facc95e858d5ed2e4962094e914d2725d1cf4465beba42a50",
      "label": "Codex Code Mode 直接工具",
      "description": "Codex Code Mode 的额外直接工具；标准直接工具为 `eval`、`ask`、`todo`、`yield`、`think`、`checkpoint` 和 `rewind`"
    },
    "modelRoleStorage": {
      "sourceHash": "559e85e5e98b03b3e4cea23294f68541afc94696dc64bf6325e9eed7b147b38b",
      "label": "模型角色存储位置",
      "description": "模型选择器的角色分配所保存的位置",
      "options": {
        "global": {
          "label": "全局",
          "description": "将角色模型保存在当前配置文件的配置中（当前行为）"
        },
        "project": {
          "label": "按项目",
          "description": "将项目角色模型保存在 .omp/config.yml 中；缺失的项目角色使用全局默认值"
        }
      }
    },
    "theme.dark": {
      "sourceHash": "428f830ed41ce70a0938576f8c48058dddc8b764262beac75c5054d14771e82a",
      "label": "深色主题",
      "description": "终端为深色背景时使用的主题"
    },
    "theme.light": {
      "sourceHash": "ff0a80bdd32cbae88d211a1c47cbfa1462ead3b0c72e408f2d506eaa404662d1",
      "label": "浅色主题",
      "description": "终端为浅色背景时使用的主题"
    },
    "symbolPreset": {
      "sourceHash": "6c56e0b5117629a70f88be080084aee62635f070a2a822ad5c7c5e20511ca116",
      "label": "符号预设",
      "description": "图标和符号使用的字形集（Unicode、Nerd Font 或 ASCII）",
      "options": {
        "unicode": {
          "label": "Unicode",
          "description": "标准符号（默认）"
        },
        "nerd": {
          "label": "Nerd Font",
          "description": "需要 Nerd Font，或支持 Glyph Protocol 的终端（图标随终端数据传输）"
        },
        "ascii": {
          "label": "ASCII",
          "description": "最大兼容性"
        }
      }
    },
    "colorBlindMode": {
      "sourceHash": "74a96816a9d65defbb8a541a78ba31c0b2d93c8b4603571dfe25f60a791dc418",
      "label": "色觉障碍模式",
      "description": "diff 新增内容使用蓝色而非绿色"
    },
    "composer.shape": {
      "sourceHash": "197428e1eb517d8a790eb25f0d4896fc7fbfc7337f2c2464a6b0e15a10d40046",
      "label": "输入区形态",
      "description": "输入编辑器和状态栏的视觉布局"
    },
    "statusLine.preset": {
      "sourceHash": "71345ec595ee2d489a73c8db38951177f4e732fbbfe7aedd74f549571698324e",
      "label": "状态栏预设",
      "description": "预先构建的状态栏配置",
      "options": {
        "default": {
          "label": "默认",
          "description": "模型、路径、Git、上下文、token、费用"
        },
        "minimal": {
          "label": "极简",
          "description": "仅路径和 Git"
        },
        "compact": {
          "label": "紧凑",
          "description": "模型、Git、费用、上下文"
        },
        "full": {
          "label": "完整",
          "description": "包括时间在内的所有区段"
        },
        "nerd": {
          "label": "Nerd",
          "description": "使用 Nerd Font 图标显示最多信息"
        },
        "ascii": {
          "label": "ASCII",
          "description": "不使用特殊字符"
        },
        "custom": {
          "label": "自定义",
          "description": "用户定义的区段"
        }
      }
    },
    "statusLine.separator": {
      "sourceHash": "f4b1a28fc0d46248032f7131bfbf7e874f1375c338ce63a54553ad6c0c278bb2",
      "label": "状态栏分隔符",
      "description": "区段之间分隔符的样式",
      "options": {
        "powerline": {
          "label": "Powerline",
          "description": "实心箭头（Nerd Font）"
        },
        "powerline-thin": {
          "label": "细尖括号",
          "description": "细箭头（Nerd Font）"
        },
        "slash": {
          "label": "斜杠",
          "description": "正斜杠"
        },
        "pipe": {
          "label": "竖线",
          "description": "垂直竖线"
        },
        "block": {
          "label": "方块",
          "description": "实心方块"
        },
        "none": {
          "label": "无",
          "description": "仅空格"
        },
        "ascii": {
          "label": "ASCII",
          "description": "大于号"
        }
      }
    },
    "statusLine.contextLine": {
      "sourceHash": "a6e9a4fea84d8ffac2518184d97a8c5b4e1043ac191b9f9828480a440a5ab008",
      "label": "上下文响应线",
      "description": "左右区段之间的线如何反映上下文用量（仅限方框输入区）",
      "options": {
        "off": {
          "label": "关闭",
          "description": "纯强调色线条，不反馈上下文用量"
        },
        "percentage": {
          "label": "百分比",
          "description": "已用部分显示为强调色，其余部分变暗"
        },
        "annotated": {
          "label": "带标记",
          "description": "除百分比外，还在推测边界和自动压缩边界处显示刻度"
        },
        "embedded": {
          "label": "嵌入",
          "description": "在带标记的线条中嵌入上下文百分比和窗口大小"
        }
      }
    },
    "statusLine.sessionAccent": {
      "sourceHash": "f0f47454012fe3118d76071b7d55d7975f6add2c71d48fd9f9bd32571b9d6531",
      "label": "会话强调色",
      "description": "编辑器边框和状态栏间隙使用会话名称的颜色"
    },
    "statusLine.transparent": {
      "sourceHash": "56886c53f5598e67cdfd6053022fd23835f486abcab70edf3d6047e27800a47a",
      "label": "透明状态栏",
      "description": "状态栏使用终端默认背景，而非主题的 `statusLineBg`。将移除 Powerline 末端封口，因为它们需要对比色填充才能与周围终端衔接"
    },
    "statusLine.compactThinkingLevel": {
      "sourceHash": "e0a244746eda55072d4fe4c3a75f3238565ccf3857190875d8aef6b58d323927",
      "label": "紧凑显示思考级别",
      "description": "将思考级别显示为模型名称上的单个图标，而非单独的 ` · <level>` 后缀"
    },
    "tools.artifactSpillThreshold": {
      "sourceHash": "7157deeeac05a4e657beeac07058f166739ab692f27309e7738f1e657f40b20f",
      "label": "Artifact 转存阈值（KB）",
      "description": "工具输出超过此大小时会保存为 Artifact，尾部内容仍内联保留",
      "options": {
        "1": {
          "label": "1 KB",
          "description": "约 250 token"
        },
        "5": {
          "label": "5 KB",
          "description": "约 1.25K token"
        },
        "10": {
          "label": "10 KB",
          "description": "约 2.5K token"
        },
        "20": {
          "label": "20 KB",
          "description": "约 5K token"
        },
        "30": {
          "label": "30 KB",
          "description": "约 7.5K token"
        },
        "50": {
          "label": "50 KB",
          "description": "默认；约 12.5K token"
        },
        "75": {
          "label": "75 KB",
          "description": "约 19K token"
        },
        "100": {
          "label": "100 KB",
          "description": "约 25K token"
        },
        "200": {
          "label": "200 KB",
          "description": "约 50K token"
        },
        "500": {
          "label": "500 KB",
          "description": "约 125K token"
        },
        "1000": {
          "label": "1 MB",
          "description": "约 250K token"
        },
        "2.5": {
          "label": "2.5 KB",
          "description": "约 625 token"
        }
      }
    },
    "tools.artifactTailBytes": {
      "sourceHash": "47ac77c90567ca3b5ca6c4c46a9fa35864fd0c00c48659681a1806a161e319c6",
      "label": "Artifact 尾部大小（KB）",
      "description": "输出转存为 Artifact 时内联保留的尾部内容量",
      "options": {
        "1": {
          "label": "1 KB",
          "description": "约 250 token"
        },
        "5": {
          "label": "5 KB",
          "description": "约 1.25K token"
        },
        "10": {
          "label": "10 KB",
          "description": "约 2.5K token"
        },
        "20": {
          "label": "20 KB",
          "description": "默认；约 5K token"
        },
        "50": {
          "label": "50 KB",
          "description": "约 12.5K token"
        },
        "100": {
          "label": "100 KB",
          "description": "约 25K token"
        },
        "200": {
          "label": "200 KB",
          "description": "约 50K token"
        },
        "2.5": {
          "label": "2.5 KB",
          "description": "约 625 token"
        }
      }
    },
    "tools.artifactHeadBytes": {
      "sourceHash": "f4b40b1adba9611bd9b45f0016a885c8ef7df072e47759ba1c96291848429eea",
      "label": "Artifact 头部大小（KB）",
      "description": "输出转存为 Artifact 时，与尾部一同内联保留的头部内容量（省略中间部分）；设为 0 时禁用，即仅保留尾部",
      "options": {
        "0": {
          "label": "0 KB",
          "description": "已禁用；截断时仅保留尾部"
        },
        "1": {
          "label": "1 KB",
          "description": "约 250 token"
        },
        "5": {
          "label": "5 KB",
          "description": "约 1.25K token"
        },
        "10": {
          "label": "10 KB",
          "description": "约 2.5K token"
        },
        "20": {
          "label": "20 KB",
          "description": "默认；约 5K token"
        },
        "50": {
          "label": "50 KB",
          "description": "约 12.5K token"
        },
        "100": {
          "label": "100 KB",
          "description": "约 25K token"
        },
        "200": {
          "label": "200 KB",
          "description": "约 50K token"
        },
        "2.5": {
          "label": "2.5 KB",
          "description": "约 625 token"
        }
      }
    },
    "tools.outputMaxColumns": {
      "sourceHash": "950b3c5117198e5ef85ee747e44aea50d089bfafc03c3462b390fb85c1fd3bb2",
      "label": "输出列上限",
      "description": "流式工具输出（bash、python、js eval）和 `read` 的每行字节上限；宽于此限制的行将以省略号截断，直到下一个换行符为止的剩余字节会被丢弃；设为 0 时禁用",
      "options": {
        "0": {
          "label": "关闭",
          "description": "不设每行上限"
        },
        "256": {
          "label": "256",
          "description": "严格"
        },
        "512": {
          "label": "512"
        },
        "768": {
          "label": "768",
          "description": "默认"
        },
        "1024": {
          "label": "1024"
        },
        "2048": {
          "label": "2048"
        },
        "4096": {
          "label": "4096",
          "description": "宽松"
        }
      }
    },
    "tools.artifactTailLines": {
      "sourceHash": "e54709115aa81897690e998b3ae088f9ab953e0fe8104df4b751e31d07e5c284",
      "label": "Artifact 尾部行数",
      "description": "输出转存为 Artifact 时内联保留的尾部内容最大行数",
      "options": {
        "50": {
          "label": "50 行",
          "description": "约 250 token"
        },
        "100": {
          "label": "100 行",
          "description": "约 500 token"
        },
        "250": {
          "label": "250 行",
          "description": "约 1.25K token"
        },
        "500": {
          "label": "500 行",
          "description": "默认；约 2.5K token"
        },
        "1000": {
          "label": "1000 行",
          "description": "约 5K token"
        },
        "2000": {
          "label": "2000 行",
          "description": "约 10K token"
        },
        "5000": {
          "label": "5000 行",
          "description": "约 25K token"
        }
      }
    },
    "statusLine.showHookStatus": {
      "sourceHash": "bf2dc96e54c3a6a696b3679f27907eb4797dd0048663b20a447654b54b1e9ed0",
      "label": "显示 Hook 状态",
      "description": "在状态栏下方显示 Hook 状态消息"
    },
    "terminal.showImages": {
      "sourceHash": "a159e6cd98066aaa6624c660e328461a0b9a3ae60bea4d28ba3b9a9317a567e5",
      "label": "显示内联图像",
      "description": "在终端中内联渲染图像"
    },
    "images.autoResize": {
      "sourceHash": "01763a5edf96de615ea3f2867d5548dd074eba52545bc3e8632705281405b490",
      "label": "自动调整图像大小",
      "description": "将大型图像缩小至最大 2000x2000，以提高模型兼容性"
    },
    "images.blockImages": {
      "sourceHash": "d2475902d7b71b443595aacdb241243f4a172adac38635c6b4822576ab734534",
      "label": "阻止发送图像",
      "description": "阻止将图像发送给 LLM 提供商"
    },
    "images.describeForTextModels": {
      "sourceHash": "ba8cd5be1b071b80de2725a5706bbe4d85bec4dbfcba44863e77f43988343ea4",
      "label": "为文本模型描述图像",
      "description": "当图像附加到不支持视觉的模型时，将其保存在 local:// 下，并改为注入视觉模型生成的描述，而不是丢弃图像"
    },
    "images.urls.enabled": {
      "sourceHash": "6668d0fc0f483856d4f1efa6c0a8d97257cb5bb95d754844eedddf8c1ef0e6c8",
      "label": "以 URL 提供图像",
      "description": "通过已配置的后端链发布传出图像，并向支持获取 URL 的提供商发送短 URL，而不是内联 base64。所有后端均失败或提供商获取失败时，会自动回退到内联方式"
    },
    "images.urls.backends": {
      "sourceHash": "4f98377197314281ba2d05d43a217234aed49f599d70c6e8f646acf946591844",
      "label": "图像 URL 后端",
      "description": "发布图像供提供商访问时按顺序尝试的目标",
      "options": {
        "imgur": {
          "label": "Imgur",
          "description": "上传需要 Imgur access token 或 client ID"
        },
        "imageshack": {
          "label": "ImageShack",
          "description": "该 API 需要付费订阅"
        },
        "flickr": {
          "label": "Flickr",
          "description": "image-host"
        },
        "chevereto": {
          "label": "Chevereto",
          "description": "self-hosted"
        },
        "vgyme": {
          "label": "vgy.me",
          "description": "image-host"
        },
        "dropbox": {
          "label": "Dropbox",
          "description": "cloud-files"
        },
        "ftp": {
          "label": "FTP / FTPS / SFTP",
          "description": "file-transfer"
        },
        "onedrive": {
          "label": "OneDrive",
          "description": "cloud-files"
        },
        "google-drive": {
          "label": "Google Drive",
          "description": "cloud-files"
        },
        "puush": {
          "label": "puush-compatible endpoint",
          "description": "公共服务已停止，需要替代端点"
        },
        "box": {
          "label": "Box",
          "description": "cloud-files"
        },
        "amazon-s3": {
          "label": "Amazon S3",
          "description": "s3"
        },
        "google-cloud-storage": {
          "label": "Google Cloud Storage",
          "description": "object-storage"
        },
        "azure-storage": {
          "label": "Azure Blob Storage",
          "description": "object-storage"
        },
        "backblaze-b2": {
          "label": "Backblaze B2",
          "description": "配置原生 B2 application keys 或 S3-compatible access keys"
        },
        "owncloud": {
          "label": "ownCloud / Nextcloud",
          "description": "webdav"
        },
        "mediafire": {
          "label": "MediaFire-compatible endpoint",
          "description": "公共 API 已弃用，需要替代端点"
        },
        "sendspace": {
          "label": "SendSpace-compatible endpoint",
          "description": "公共 discovery API 已弃用，需要替代端点"
        },
        "localhostr": {
          "label": "Hostr-compatible endpoint",
          "description": "公共服务已离线，需要替代端点"
        },
        "lambda": {
          "label": "Lambda-compatible endpoint",
          "description": "公共服务已离线，需要替代端点"
        },
        "pomf": {
          "label": "Pomf",
          "description": "pomf"
        },
        "uguu": {
          "label": "Uguu",
          "description": "公共上传内容约三小时后过期"
        },
        "seafile": {
          "label": "Seafile",
          "description": "cloud-files"
        },
        "s-ul": {
          "label": "s-ul",
          "description": "file-host"
        },
        "lobfile": {
          "label": "LobFile-compatible endpoint",
          "description": "公共服务已离线，需要替代端点"
        },
        "transfer-sh": {
          "label": "transfer.sh-compatible endpoint",
          "description": "已停止的公共端点被阻止，需要自行托管的替代端点"
        },
        "plik": {
          "label": "Plik",
          "description": "self-hosted"
        },
        "shared-folder": {
          "label": "共享文件夹",
          "description": "filesystem"
        },
        "catbox": {
          "label": "Catbox",
          "description": "anonymous-host"
        },
        "litterbox": {
          "label": "Litterbox",
          "description": "上传内容是临时的"
        },
        "0x0": {
          "label": "0x0.st",
          "description": "公共上传内容会在由文件大小决定的保留期限后过期"
        },
        "tmpfiles": {
          "label": "tmpfiles.org",
          "description": "公共上传内容是临时的"
        },
        "discord": {
          "label": "Discord",
          "description": "messaging"
        },
        "provider-files": {
          "label": "模型提供商文件",
          "description": "提供商文件引用仅在 API 内有效，并非公共图像 URL"
        },
        "direct": {
          "label": "直接公共 URL",
          "description": "local-serving"
        },
        "cloudflared": {
          "label": "Cloudflare quick tunnel",
          "description": "tunnel"
        },
        "ngrok": {
          "label": "ngrok",
          "description": "tunnel"
        },
        "tailscale": {
          "label": "Tailscale Funnel",
          "description": "tunnel"
        },
        "ssh": {
          "label": "SSH 反向隧道",
          "description": "tunnel"
        },
        "command": {
          "label": "上传命令",
          "description": "external-command"
        },
        "localhost-run": {
          "label": "localhost.run",
          "description": "tunnel"
        },
        "pinggy": {
          "label": "Pinggy",
          "description": "tunnel"
        },
        "devtunnel": {
          "label": "Microsoft dev tunnel",
          "description": "必须已在本地登录 devtunnel CLI"
        },
        "zrok": {
          "label": "zrok",
          "description": "必须已启用本地 zrok 环境"
        },
        "bore": {
          "label": "bore",
          "description": "tunnel"
        },
        "named-cloudflared": {
          "label": "Named Cloudflare Tunnel",
          "description": "tunnel"
        },
        "r2": {
          "label": "Cloudflare R2",
          "description": "s3"
        },
        "tigris": {
          "label": "Tigris",
          "description": "s3"
        },
        "minio": {
          "label": "MinIO",
          "description": "s3"
        },
        "garage": {
          "label": "Garage",
          "description": "s3"
        }
      }
    },
    "images.urls.command": {
      "sourceHash": "c7ca77425d8f96a78660ea7bd45450b48ee1796a92f8a10e22c4b57989a0bebb",
      "label": "图像上传命令",
      "description": "command 后端的 argv 模板；{file} 是图像路径，{mime}/{ext} 可选。使用 stdout 输出的最后一个 URL（例如 pasta -b -f {file}）"
    },
    "images.urls.publicBaseUrl": {
      "sourceHash": "9ed83574cfb822a5aca4979a47fc609eb5085ee1ea1427896037e63a71ece22e",
      "label": "图像 URL 公共基址",
      "description": "作为 blob 服务器前端且可从外部访问的基础 URL（ssh 必填，direct 可选）"
    },
    "images.urls.ttlHours": {
      "sourceHash": "de264b0448902332f853c57882d9ffbf7d980f9d7ccef8c0dc3427397af7893d",
      "label": "图像 URL 有效期（小时）",
      "description": "本地托管图像 URL 的服务时限，从会话最后一次发送这些 URL 时起算；恢复会话会对同一链接重新计时。设为 0 可在 broker 运行期间保持链接有效"
    },
    "images.urls.bindHost": {
      "sourceHash": "caa3b233220decbb1886d9481d0033df0ab6d3b3f3c3a63505ef97a1d3274685",
      "label": "图像 URL 绑定主机",
      "description": "blob 服务器绑定的主机；隧道使用 loopback，直接提供服务使用 0.0.0.0"
    },
    "images.urls.sshTarget": {
      "sourceHash": "983fabfdee46a12e255af6f101e1251d3cc72253e8e0c58c8aae9dcf8797e367",
      "label": "图像 URL SSH 目标",
      "description": "SSH 反向转发的 user@host 目标"
    },
    "images.urls.sshRemotePort": {
      "sourceHash": "af622250c1f709129de9bc3207da6079cf5fba26e5de4d651a4319f34e6c2a5b",
      "label": "图像 URL SSH 远程端口",
      "description": "Web 服务器所代理到的 SSH 反向转发远程监听端口"
    },
    "tui.resizeScrollback": {
      "sourceHash": "0947e9d0ce42cc9045a65a5ea575577598365d0c2326a5c9629c4cd5d9fcc97a",
      "label": "调整大小时的回滚历史",
      "description": "终端尺寸调整稳定后，如何刷新终端回滚历史中保留的对话记录行",
      "options": {
        "append": {
          "label": "追加",
          "description": "在保留的历史记录下方，以新宽度重新输出对话记录"
        },
        "rebuild": {
          "label": "重建",
          "description": "清除全部终端回滚历史，然后以当前宽度重新输出一份对话记录"
        },
        "preserve": {
          "label": "保留",
          "description": "仅重绘视口，并让历史记录继续按原宽度换行"
        }
      }
    },
    "terminal.showProgress": {
      "sourceHash": "97ee8987d7737dbb9a63c3b1f0d5072f1101bd69b53d93d0ba0f99dfd085f612",
      "label": "终端原生进度",
      "description": "Agent 或上下文维护运行时，发出 OSC 9;4 不确定进度指示"
    },
    "tui.textSizing": {
      "sourceHash": "cfe538cd9220b87286e586f3b1296a39a81525cee9ea21c58a4dccba9f18b803",
      "label": "大号标题（Kitty）",
      "description": "使用 Kitty 的 OSC 66 文本尺寸协议，以 2 倍大小渲染 Markdown H1 标题。仅在 Kitty 终端中生效，其他环境均会忽略。默认关闭"
    },
    "tui.renderMermaid": {
      "sourceHash": "e4514535e3a7a9dc994b0059ccd63a36c52f14789b6252cd0b28129064a90959",
      "label": "渲染 Mermaid 图表",
      "description": "将 Mermaid 围栏代码块渲染为 ASCII 图表"
    },
    "tui.codexResetFireworks": {
      "sourceHash": "8329b2a0b8bd13f3f8b251d6c684678454d3a55100fa632c786bc85a44ac108d",
      "label": "Codex 重置烟花",
      "description": "当 Codex 每周用量发生非计划重置，或新存入已保存的重置机会时，在顶部三分之一区域显示烟花覆盖层庆祝，直至按下 {escape}",
      "descriptionSource": "Celebrate unscheduled Codex weekly usage resets and newly banked saved resets with a top-third fireworks overlay that remains until {escape}"
    },
    "tui.titleState": {
      "sourceHash": "6e0c084b462e93a191bc78e133e22a80fbb13ce5f6328fef3fe6cc8bf33b0922",
      "label": "终端标题运行状态",
      "description": "在终端标题的分隔符中显示智能体运行状态：工作时显示动态旋转指示器（WSL 下为静态的 `:`），轮到你操作时显示 `>`，智能体等待你操作时显示 `!`"
    },
    "tui.hyperlinks": {
      "sourceHash": "17abb4d9a27ec0a03cf1f312514bafaea2a6d968900a58a510c0efa0702bdea8",
      "label": "终端超链接",
      "description": "使用 OSC 8 超链接包装路径和 URL，以便通过终端原生方式点击打开（auto：检测支持情况；off：从不启用；always：无条件启用）"
    },
    "tui.tight": {
      "sourceHash": "babebba5a60583ce069f2446fa1db9b4ae0d360bbdba1fa24939eede65c85e94",
      "label": "紧凑布局",
      "description": "移除终端输出左右两侧各 1 个字符的水平内边距"
    },
    "display.shimmer": {
      "sourceHash": "2bb3bf5c3781a7e813164b5287f72b730102335c4f1ca7ba1ed4dcfe3f43a415",
      "label": "流光动画",
      "description": "工作中或加载中消息的动画样式",
      "options": {
        "classic": {
          "label": "经典",
          "description": "柔和的余弦波扫过文本"
        },
        "kitt": {
          "label": "KITT Scanner",
          "description": "Knight Rider 1982 的红色灯光左右往返"
        },
        "disabled": {
          "label": "禁用",
          "description": "无动画，显示静态的弱化文本"
        }
      }
    },
    "display.smoothStreaming": {
      "sourceHash": "486ee99f103176ae2d9462988dea8a0f9438a6ef043971617093152706261425",
      "label": "平滑流式显示",
      "description": "在数据块到达时，平滑显示助手文本和流式工具输入"
    },
    "display.hideToolActivity": {
      "sourceHash": "02283e2dd6b172dfe14a309ab19809155f6a8bd2a37b237692cbb68bd5ff0226",
      "label": "隐藏工具活动",
      "description": "在对话记录中隐藏模型发起的工具调用及其结果"
    },
    "display.showTokenUsage": {
      "sourceHash": "d872624deff2642774e1da779adaf9a000f9363663830f52a239f74c2925c858",
      "label": "显示 token 用量",
      "description": "在助手消息中显示每轮的 token 用量"
    },
    "display.cacheMissMarker": {
      "sourceHash": "7f30aab5c9c647abfea2a3786bad1dec56f5622f0e0d3fb31eeac61b6d08a9f7",
      "label": "缓存未命中标记",
      "description": "当某轮助手请求未命中提示词缓存时，在该轮之后显示分隔线"
    },
    "display.collapseCompacted": {
      "sourceHash": "3d1a8035908cf0f4bd1fa97382c6c9d20e0cf5f54a472c975b8c379c163c98f3",
      "label": "折叠已压缩的历史记录",
      "description": "在实时对话记录中，将压缩前的历史记录折叠到摘要分隔线后；禁用后则完整内联显示对话记录，并在每个压缩点显示分隔线"
    },
    "showHardwareCursor": {
      "sourceHash": "3781f88d0b421103dab3efc168d0edae91abd2109a88ac1758430ea91c204c4d",
      "label": "显示硬件光标",
      "description": "显示终端光标以支持 IME"
    },
    "tui.imeSafeCursor": {
      "sourceHash": "d3e85d1d405645db7c5b1f7f6512ac911b0d06d42898dfb3c4103802d8b97767",
      "label": "IME 安全的提示词布局",
      "description": "将提示词区域的底部边框移至单独一行，防止 macOS IME 预编辑文本将其挤开"
    },
    "defaultThinkingLevel": {
      "sourceHash": "9111eae304b11e100774dadf9c50ee39d2815e005c4507f102a9d1c3ba4ceeb9",
      "label": "思考级别",
      "description": "支持思考的模型的推理深度",
      "options": {
        "auto": {
          "label": "自动",
          "description": "按提示词自动检测"
        },
        "minimal": {
          "label": "最小",
          "description": "极简推理（约 1k token）"
        },
        "low": {
          "label": "低",
          "description": "轻量推理（约 2k token）"
        },
        "medium": {
          "label": "中",
          "description": "中等推理（约 8k token）"
        },
        "high": {
          "label": "高",
          "description": "深度推理（约 16k token）"
        },
        "xhigh": {
          "label": "极高",
          "description": "扩展推理（约 32k token）"
        },
        "max": {
          "label": "最大",
          "description": "模型支持的最大推理深度"
        }
      }
    },
    "hideThinkingBlock": {
      "sourceHash": "539f8dc3674e9f7b820d51d10006a04f5c5b73de53541a0e43c1a5cc9ac49aee",
      "label": "隐藏思考块",
      "description": "隐藏助手响应中的思考块"
    },
    "proseOnlyThinking": {
      "sourceHash": "d4ad65fe4ec6418163030e85e4bf7fabc7363c26af8761961ec636db1ff855d3",
      "label": "思考仅保留正文",
      "description": "从思考摘要中省略代码块，并以省略号替代"
    },
    "omitThinking": {
      "sourceHash": "5ba9db1f9a3230f212d8080ac409ba01c6f49ec9b6b719ec06958eec0765fa07",
      "label": "省略思考摘要",
      "description": "指示上游提供商从响应中完全省略思考摘要（如支持）"
    },
    "externalThinking": {
      "sourceHash": "69d744e4c7b128467b73fb22e49a6ef851a6492881b32aedb73ab4e3e03f440e",
      "label": "外部思考",
      "description": "私有暂存区，不向用户显示。会禁用 GPT、Claude 和 Gemini 中受支持的推理功能",
      "warning": "风险自负：提供商已将此类请求标记为滥用行为，最严重可能触发账号级处置"
    },
    "model.loopGuard.enabled": {
      "sourceHash": "6bd732a70f60303d37acd24e924f7cfb8d6c0dc670b1d5fc3311984ee542a467",
      "label": "循环防护",
      "description": "为模型推理和正文启用自动流循环检测"
    },
    "model.loopGuard.checkAssistantContent": {
      "sourceHash": "f99cd7b8f957a1df6fafbb890f4b7a6e02301527c70b982d44274eb74ab8fd9b",
      "label": "循环防护扫描正文",
      "description": "除思考日志外，也对助手正文消息应用循环防护"
    },
    "model.loopGuard.toolCallReminder": {
      "sourceHash": "90dcef4207e7de943259aba9d6a36c16f38206ab6cd86bd670e9643197aa4063",
      "label": "循环防护工具调用提醒",
      "description": "当 Gemini 推理流连续输出大量规划标题却未调用工具时，中断该流并注入提醒，要求发起工具调用（需要循环防护）"
    },
    "model.toolCallLoopGuard.enabled": {
      "sourceHash": "7b7ae941d9a5b037917fa2d89f97cac094b4881695e659acd0cdeef612ea768e",
      "label": "工具调用循环防护",
      "description": "检测跨轮次连续出现的相同工具调用，并注入纠偏指引"
    },
    "model.toolCallLoopGuard.threshold": {
      "sourceHash": "96bc9f2f0c9772a54dd648844a36648455aed76512b5e2ad4cf00cbae63079a2",
      "label": "工具调用循环阈值",
      "description": "注入纠偏指引前所需的连续相同工具调用次数"
    },
    "model.toolCallLoopGuard.exemptTools": {
      "sourceHash": "1866d8c94a8995695e2ac84db7a361039111fdd8ca2323fda177228556e9b48f",
      "label": "工具调用循环豁免工具",
      "description": "可连续重复而不触发跨轮次循环防护的工具名称"
    },
    "inlineToolDescriptors": {
      "sourceHash": "87ae40514d48f7d5003ca8a5711e964cfbf2fc4e4e81f620a15a78dd9d4201b6",
      "label": "内联工具描述符",
      "description": "在系统提示词中呈现完整工具描述符，并移除提供商工具 schema 中顶层及嵌套的描述，使描述符文本只发送一次；自动模式会对 Gemini 模型启用此功能，对其他模型则禁用",
      "options": {
        "auto": {
          "label": "自动",
          "description": "对 Gemini 模型内联描述符；其他模型仍将描述符保留在工具 schema 中"
        },
        "on": {
          "label": "启用",
          "description": "始终在系统提示词中内联描述符"
        },
        "off": {
          "label": "关闭",
          "description": "仅将描述符保留在提供商工具 schema 中"
        }
      }
    },
    "includeModelInPrompt": {
      "sourceHash": "45937695fa06b31503a51a895827f4517fdb35a24f4363fbbae01b6f1398dc33",
      "label": "在提示词中包含模型",
      "description": "在系统提示词中呈现当前模型标识符，让智能体知道自身所用的模型"
    },
    "includeWorkspaceTree": {
      "sourceHash": "d031ddfafddfd06218a9027babd05031004d17101d94048a3843019fa0dfe127",
      "label": "包含工作区目录树",
      "description": "在系统提示词中呈现工作区目录树。警告：修改文件后，这可能导致跨会话的提示词缓存失效"
    },
    "workspace.additionalDirectories": {
      "sourceHash": "388baa951172642ecddd1294e85407ccf2e1d5ff687e0d89f783329a488fa37d",
      "label": "附加工作区目录",
      "description": "作为额外根目录添加到每个会话的其他工作区目录（多根工作区）；可通过 /add-dir 和 /remove-dir 实时管理；相对路径以 cwd 为基准解析，建议使用绝对路径；系统会告知 agent 这些根目录存在，且可对其执行 read、grep 和 glob"
    },
    "personality": {
      "sourceHash": "fafcc92b52f12d1f9436f019b50268e8bca4c3ddd45bfaa69503e36ef71a3930",
      "label": "个性",
      "description": "呈现在系统提示词个性块中的沟通风格",
      "options": {
        "default": {
          "label": "默认",
          "description": "简练、证据优先的工程师；回复信息密集、行动导向"
        },
        "friendly": {
          "label": "友好",
          "description": "温暖、鼓励他人的协作者，注重保持进展和士气"
        },
        "pragmatic": {
          "label": "务实",
          "description": "直接、高效的工程师，注重清晰与严谨"
        },
        "none": {
          "label": "无",
          "description": "完全省略个性块"
        }
      }
    },
    "temperature": {
      "sourceHash": "c7ee90beb7efad0eb74cb42537b81edc41402cc5ba8faa5cc18aebee38cd3e61",
      "label": "温度",
      "description": "采样温度（0 = 确定性，1 = 创意，-1 = 提供商默认值）",
      "options": {
        "0": {
          "label": "0",
          "description": "确定性"
        },
        "1": {
          "label": "1",
          "description": "最大多样性"
        },
        "-1": {
          "label": "默认",
          "description": "使用提供商默认值"
        },
        "0.2": {
          "label": "0.2",
          "description": "专注"
        },
        "0.5": {
          "label": "0.5",
          "description": "均衡"
        },
        "0.7": {
          "label": "0.7",
          "description": "创意"
        }
      }
    },
    "topP": {
      "sourceHash": "bfa5b2741b8c9bcedfd2990210a98e40a5ab10ccbe5334bf15a41758bf81e827",
      "label": "Top P",
      "description": "核采样截断阈值（0-1，-1 = 提供商默认值）",
      "options": {
        "1": {
          "label": "1",
          "description": "不进行核采样过滤"
        },
        "-1": {
          "label": "默认",
          "description": "使用提供商默认值"
        },
        "0.1": {
          "label": "0.1",
          "description": "非常专注"
        },
        "0.3": {
          "label": "0.3",
          "description": "专注"
        },
        "0.5": {
          "label": "0.5",
          "description": "均衡"
        },
        "0.9": {
          "label": "0.9",
          "description": "宽泛"
        }
      }
    },
    "topK": {
      "sourceHash": "a2490c8a0543cc00b7cbaf86ca9b7b085f76a9f8c4fd2fd16f713e635b04f3ed",
      "label": "Top K",
      "description": "从 top-K token 中采样（-1 = 提供商默认值）",
      "options": {
        "1": {
          "label": "1",
          "description": "贪心选择概率最高的 token"
        },
        "20": {
          "label": "20",
          "description": "专注"
        },
        "40": {
          "label": "40",
          "description": "均衡"
        },
        "100": {
          "label": "100",
          "description": "宽泛"
        },
        "-1": {
          "label": "默认",
          "description": "使用提供商默认值"
        }
      }
    },
    "minP": {
      "sourceHash": "c73113001663413a8b5f8c5f0eb005ff7bc840559ced23593731d253a7ecc725",
      "label": "Min P",
      "description": "最低概率阈值（0-1，-1 = 提供商默认值）",
      "options": {
        "-1": {
          "label": "默认",
          "description": "使用提供商默认值"
        },
        "0.01": {
          "label": "0.01",
          "description": "非常宽松"
        },
        "0.05": {
          "label": "0.05",
          "description": "均衡"
        },
        "0.1": {
          "label": "0.1",
          "description": "严格"
        }
      }
    },
    "presencePenalty": {
      "sourceHash": "5d425f9a9e07cba2c011fdb4fede5a9d7ff3f7838f5a710699ee8459dbc614e0",
      "label": "存在惩罚",
      "description": "对引入已出现 token 的惩罚（-1 = 提供商默认值）",
      "options": {
        "0": {
          "label": "0",
          "description": "无惩罚"
        },
        "1": {
          "label": "1",
          "description": "鼓励新颖性"
        },
        "2": {
          "label": "2",
          "description": "强力鼓励新颖性"
        },
        "-1": {
          "label": "默认",
          "description": "使用提供商默认值"
        },
        "0.5": {
          "label": "0.5",
          "description": "轻度鼓励新颖性"
        }
      }
    },
    "repetitionPenalty": {
      "sourceHash": "73d795947718b810c7f076ca96fa857a7be4ba8afd290362e7dc298686dfd67a",
      "label": "重复惩罚",
      "description": "对重复 token 的惩罚（-1 = 提供商默认值）",
      "options": {
        "1": {
          "label": "1",
          "description": "无惩罚"
        },
        "-1": {
          "label": "默认",
          "description": "使用提供商默认值"
        },
        "0.8": {
          "label": "0.8",
          "description": "允许重复"
        },
        "1.1": {
          "label": "1.1",
          "description": "轻度惩罚"
        },
        "1.2": {
          "label": "1.2",
          "description": "均衡"
        },
        "1.5": {
          "label": "1.5",
          "description": "强力惩罚"
        }
      }
    },
    "textVerbosity": {
      "sourceHash": "7570c318bc48dd3c9727d2ae937d4d99f36a809c77f858440228f64b5273b3d8",
      "label": "文本详略程度",
      "description": "OpenAI Responses 和 Codex 的回复详略程度（low、medium 或 high）",
      "options": {
        "low": {
          "label": "低",
          "description": "倾向简洁回复"
        },
        "medium": {
          "label": "中",
          "description": "兼顾简洁与细节（默认）"
        },
        "high": {
          "label": "高",
          "description": "倾向详细回复"
        }
      }
    },
    "tier.openai": {
      "sourceHash": "02b486b4e7c98a2fbb784ec5e8d578036eacceabd47bc83daeb981ebf953eb44",
      "label": "服务层级 — OpenAI",
      "description": "OpenAI / OpenAI-Codex 请求以及通过 OpenRouter 路由的 OpenAI 系列模型所用的处理层级（`none` = 省略），以 `service_tier` 发送",
      "options": {
        "none": {
          "label": "无",
          "description": "省略 `service_tier`（标准处理）"
        },
        "auto": {
          "label": "自动",
          "description": "由提供商选择默认层级"
        },
        "default": {
          "label": "默认",
          "description": "标准优先级处理"
        },
        "flex": {
          "label": "Flex",
          "description": "可用时成本更低、延迟更高"
        },
        "scale": {
          "label": "Scale",
          "description": "可用时使用 Scale Tier 额度"
        },
        "priority": {
          "label": "Priority",
          "description": "速度更快、成本更高（高级请求）"
        },
        "ultrafast": {
          "label": "Ultrafast",
          "description": "延迟最低的服务；适用于拥有 OpenAI API 预览访问权限的请求，或声明支持此层级的 Codex 模型"
        }
      }
    },
    "tier.anthropic": {
      "sourceHash": "f83145b4056743830b12cb65f657efef8f613c6bc4c4cf26a070e79ac2815c00",
      "label": "服务层级 — Anthropic",
      "description": "Claude 请求的处理层级；在受支持的 Anthropic 直连模型上，`priority` 会实现快速模式（`speed: \"fast\"`）；在 Bedrock/Vertex Claude 以及通过 OpenRouter 使用时会被忽略",
      "options": {
        "none": {
          "label": "无",
          "description": "标准处理"
        },
        "priority": {
          "label": "Priority",
          "description": "在受支持的 Claude 直连模型上使用快速模式（`speed: \"fast\"`）；在 Bedrock/Vertex 上会被忽略"
        }
      }
    },
    "tier.google": {
      "sourceHash": "1d13f1bd0b106adb506b6c16e598cb3b44e6e4d657d001af769ca9032b0d9eb3",
      "label": "服务层级 — Google",
      "description": "Gemini（Google AI Studio + Vertex）请求以及通过 OpenRouter 路由的 Google 系列模型所用的处理层级（`none` = 省略），以顶层 `serviceTier` 字段发送",
      "options": {
        "none": {
          "label": "无",
          "description": "标准处理"
        },
        "flex": {
          "label": "Flex",
          "description": "成本更低、延迟更高（Gemini API + Vertex）"
        },
        "priority": {
          "label": "Priority",
          "description": "速度更快、可靠性更高（Gemini API + Vertex）"
        }
      }
    },
    "tier.subagent": {
      "sourceHash": "79e696bc56bca837867ea7bb588cd2694b1b50c03b11564d8b87ff40061efad6",
      "label": "服务层级 — 子智能体",
      "description": "通过 `task` / `eval` 创建的子智能体所用的服务层级。继承 = 与主智能体当前各模型系列的实时层级一致（跟随 `/fast`）；选择具体值后，将其应用于子智能体模型所属的系列",
      "options": {
        "inherit": {
          "label": "继承",
          "description": "与主智能体当前各模型系列的实时层级一致"
        },
        "none": {
          "label": "无",
          "description": "标准处理"
        },
        "auto": {
          "label": "自动",
          "description": "由提供商选择默认层级（OpenAI 系列）"
        },
        "default": {
          "label": "默认",
          "description": "标准优先级处理（OpenAI 系列）"
        },
        "flex": {
          "label": "Flex",
          "description": "弹性容量层级（OpenAI/Google 系列）"
        },
        "scale": {
          "label": "Scale",
          "description": "Scale Tier 额度（OpenAI 系列）"
        },
        "priority": {
          "label": "Priority",
          "description": "在所创建模型支持的每个系列上使用 Priority"
        },
        "ultrafast": {
          "label": "Ultrafast",
          "description": "Ultrafast 服务（OpenAI 系列，可用时）"
        }
      }
    },
    "tier.advisor": {
      "sourceHash": "cf18d10f3a9525bcb09f1b35bc178c8c2b8b2b149c58212c59f7160cd6693410",
      "label": "服务层级 — Advisor",
      "description": "Advisor 模型所用的服务层级。无 = 标准处理；继承 = 与主智能体当前各模型系列的实时层级一致；选择具体值后，将其应用于 Advisor 模型所属的系列",
      "options": {
        "inherit": {
          "label": "继承",
          "description": "与主智能体当前各模型系列的实时层级一致"
        },
        "none": {
          "label": "无",
          "description": "标准处理"
        },
        "auto": {
          "label": "自动",
          "description": "由提供商选择默认层级（OpenAI 系列）"
        },
        "default": {
          "label": "默认",
          "description": "标准优先级处理（OpenAI 系列）"
        },
        "flex": {
          "label": "Flex",
          "description": "弹性容量层级（OpenAI/Google 系列）"
        },
        "scale": {
          "label": "Scale",
          "description": "Scale Tier 额度（OpenAI 系列）"
        },
        "priority": {
          "label": "Priority",
          "description": "在所创建模型支持的每个系列上使用 Priority"
        },
        "ultrafast": {
          "label": "Ultrafast",
          "description": "Ultrafast 服务（OpenAI 系列，可用时）"
        }
      }
    },
    "retry.maxRetries": {
      "sourceHash": "9d6ab143f3c8ddda872a0883a0dc0f5ac568d44bbb60bf5559f8934a0de183da",
      "label": "重试次数",
      "description": "发生 API 错误时的最大重试次数",
      "options": {
        "1": {
          "label": "重试 1 次"
        },
        "2": {
          "label": "重试 2 次"
        },
        "3": {
          "label": "重试 3 次"
        },
        "5": {
          "label": "重试 5 次"
        },
        "10": {
          "label": "重试 10 次"
        }
      }
    },
    "retry.maxDelayMs": {
      "sourceHash": "2419687df9ba8e1133e7797d3b2cdaf73c5657bbe9b0b574c7f340329bcb71af",
      "label": "最大重试延迟",
      "description": "两次重试之间的最长等待时间，单位为 ms。当提供商要求等待的时间超过此值，且凭据或模型回退均未成功时，请求会快速失败，而不是休眠等待（例如 Anthropic 长达 3 小时的速率限制窗口）。设为 0 可取消上限，让会话等待提供商声明的配额重置后自动恢复"
    },
    "retry.modelFallback": {
      "sourceHash": "3decae223a3b1229a676877586502fa56424b2f5d819d686e6531976e7e266d2",
      "label": "重试模型回退",
      "description": "允许在重试恢复时切换到已配置的回退模型"
    },
    "retry.usageAwareFallback": {
      "sourceHash": "cfba9ba97c575815def45107822d74c1c411ddee22834a1a19c5b479351d04f0",
      "label": "用量感知回退",
      "description": "使用可靠的编码套餐配额报告，在达到硬性用量上限前优先选择同一提供商的账户，之后再选择已配置的回退模型；普通的已配置 API key 不在此范围内"
    },
    "retry.usageReservePct": {
      "sourceHash": "53493ed53bf1eee03ad0f44c57e60a012b57a0704321156ae6b6144e7f31a8d3",
      "label": "预留余量",
      "description": "当编码套餐模型的剩余比例低于此值时，将其视为接近限额；用量未知或未映射时继续使用主模型",
      "options": {
        "5": {
          "label": "5%",
          "description": "仅在接近耗尽时采取行动"
        },
        "10": {
          "label": "10%",
          "description": "均衡的安全余量"
        },
        "15": {
          "label": "15%",
          "description": "保守"
        },
        "20": {
          "label": "20%",
          "description": "提前保护"
        },
        "25": {
          "label": "25%",
          "description": "非常保守"
        }
      }
    },
    "retry.usageReservePolicy": {
      "sourceHash": "2c1c77aa1c568f00523dc8bb037e682c76b418a0bd358c48abd01066007e1f58",
      "label": "预留策略",
      "description": "同一提供商的所有编码套餐账户均已进入预留余量范围时要采取的操作",
      "options": {
        "confirm": {
          "label": "交互式确认",
          "description": "交互式会话在确认前继续使用主模型；后台智能体自动回退"
        },
        "auto": {
          "label": "自动回退",
          "description": "始终选择下一个符合条件的已配置回退项"
        },
        "fail-closed": {
          "label": "失败时关闭",
          "description": "不使用预留配额，也不选择回退项"
        }
      }
    },
    "retry.fallbackChains": {
      "sourceHash": "b5b1d50a5e01ed5490faa0549b40cfe828a5c636b80df5bac54b60f604a7330a",
      "label": "重试回退链",
      "description": "将模型角色、模型选择器（`provider/model-id`）或提供商通配符（`provider/*`）映射到有序回退选择器的 JSON 对象，例如 `{\"default\":[\"openai/gpt-4o-mini\"],\"google-antigravity/*\":[\"google/*\",\"google-vertex/*\"]}`。只要对应模型/提供商处于活动状态，模型相关键就会生效，不受角色影响；`provider/*` 条目会保留失败模型的 id，仅替换提供商。带 id 前缀的通配符（`openrouter/google/*`）会为失败模型的裸 id 重新添加前缀（`google-antigravity/gemini-x -> openrouter/google/gemini-x`）；作为键使用时，仅匹配该前缀下属于该提供商的 id。回退条目可带有显式思考强度后缀（`provider/model:low`、`:high`、`:max`、`:off`）；不带后缀的条目继承失败轮次的思考强度，`provider/*` 条目始终继承"
    },
    "retry.fallbackRevertPolicy": {
      "sourceHash": "fd3ba2e96202fb1c31c06bc11270ed09ccca1608e53e09f49e7da24ff5072739",
      "label": "回退恢复策略",
      "description": "回退后何时恢复使用主要模型",
      "options": {
        "cooldown-expiry": {
          "label": "冷却期结束",
          "description": "主要模型的抑制窗口结束后恢复使用该模型"
        },
        "never": {
          "label": "永不",
          "description": "继续使用回退模型，直到手动更改"
        }
      }
    },
    "providers.anthropic.serverSideFallback": {
      "sourceHash": "0492267aa35076367d9c4228e3b10e2605c0a66a5f439b4c4237a7f1995baf9e",
      "label": "Anthropic 服务端回退 (Fable 5)",
      "description": "当 Claude Fable 5 / Mythos 5 请求被 Anthropic 的安全分类器拦截时，在服务端通过 Claude Opus 5 重试（Anthropic `server-side-fallback-2026-06-01` beta）。此功能需选择启用，保持关闭可保留所有请求在回退功能推出前的行为"
    },
    "steeringMode": {
      "sourceHash": "1dbd6d37fcad0666abb98b6393f8199fde7ea5d3377e8ec377484b2ab290e7bd",
      "label": "引导模式",
      "description": "agent 工作时如何处理排队的消息"
    },
    "followUpMode": {
      "sourceHash": "3b75e4cf3397227fde0b75fc09e633ab0551fb519e4af3e53b1eda85336b77b8",
      "label": "后续消息模式",
      "description": "一轮完成后如何依次处理后续消息"
    },
    "interruptMode": {
      "sourceHash": "9e622569e0d0630e3c66dedc08ad030d9b023808ac484da7da240e6ddf349a7c",
      "label": "中断模式",
      "description": "引导消息何时中断工具执行"
    },
    "loop.mode": {
      "sourceHash": "b07cc1b459f11902c561c2e3cf55caf8abc38dcc0fdc644cff50895e2415e288",
      "label": "循环模式",
      "description": "在重新提交提示词之前，/loop 各次迭代之间执行的操作",
      "options": {
        "prompt": {
          "label": "提示词",
          "description": "将提示词作为后续消息重新提交（当前行为）"
        },
        "compact": {
          "label": "压缩",
          "description": "压缩会话上下文，然后重新提交提示词"
        },
        "reset": {
          "label": "重置",
          "description": "启动新会话，然后重新提交提示词"
        }
      }
    },
    "doubleEscapeAction": {
      "sourceHash": "bf62ae1d989377d39cf71589da7bb5cd11cc8d111f63ca83064bc4f6121e5042",
      "label": "连按两次 Esc 操作",
      "description": "编辑器为空时按两次 {escape} 执行的操作：打开会话记录回退选择器、打开会话树，或不执行任何操作",
      "descriptionSource": "What pressing {escape} twice with an empty editor does: open the transcript rewind selector, open the session tree, or nothing"
    },
    "treeFilterMode": {
      "sourceHash": "336e6236bf92b823de458c000efb6bf5ff53b42bda4a88818954ecc7fa90a7c4",
      "label": "会话树筛选",
      "description": "打开会话树时的默认筛选模式"
    },
    "autocompleteMaxVisible": {
      "sourceHash": "955fde1d01067112cbdf5905f7ab30991108197b3de6b91b3e79701722e99063",
      "label": "自动补全项目数",
      "description": "自动补下拉列表中最多显示的项目数（3–20）",
      "options": {
        "3": {
          "label": "3 项"
        },
        "5": {
          "label": "5 项"
        },
        "7": {
          "label": "7 项"
        },
        "10": {
          "label": "10 项"
        },
        "15": {
          "label": "15 项"
        },
        "20": {
          "label": "20 项"
        }
      }
    },
    "spelling.typoDetection": {
      "sourceHash": "41968458a03cdc4c2bf2e0781ad738b3bb7295bb6de67cd86d2132cb403a18c0",
      "label": "拼写错误检测（macOS）",
      "description": "使用当前启用的 macOS 词典标记提示词中拼写错误的单词"
    },
    "spelling.autocomplete": {
      "sourceHash": "92ab6f253a374842dd155f6f479483e660deb62d7d650589d67e72db674e7561",
      "label": "单词自动补全",
      "description": "以内联提示显示预测的单词补全：按 {accept} 接受并附加空格，按 {right} 接受但不附加空格",
      "options": {
        "off": {
          "label": "关闭",
          "description": "不补全单词"
        },
        "auto": {
          "label": "自动",
          "description": "N-gram（无需下载）"
        },
        "ngram": {
          "label": "N-gram",
          "description": "从提示词历史中学习你的词汇"
        },
        "smollm": {
          "label": "SmolLM",
          "description": "结合 N-gram 的小型本地语言模型（首次使用时下载权重）"
        }
      },
      "descriptionSource": "Show predicted word completions as inline hints: {accept} accepts with a space, {right} without",
      "byPlatform": {
        "darwin": {
          "sourceHash": "cd82abb4ef038e97570a35036c16cdfa38c8b57605b684134715edfecd74f127",
          "label": "单词自动补全",
          "description": "以内联提示显示预测的单词补全：按 {accept} 接受并附加空格，按 {right} 接受但不附加空格",
          "options": {
            "off": {
              "label": "关闭",
              "description": "不补全单词"
            },
            "auto": {
              "label": "自动",
              "description": "N-gram（无需下载）"
            },
            "ngram": {
              "label": "N-gram",
              "description": "从提示词历史中学习你的词汇"
            },
            "smollm": {
              "label": "SmolLM",
              "description": "结合 N-gram 的小型本地语言模型（首次使用时下载权重）"
            },
            "apple": {
              "label": "Apple",
              "description": "使用 macOS 词典补全"
            }
          },
          "descriptionSource": "Show predicted word completions as inline hints: {accept} accepts with a space, {right} without"
        }
      }
    },
    "spelling.autocorrect": {
      "sourceHash": "4a5b6e53dd344a0b69d7a078e42dd7023a91562c2f08d28110930e293d40ba38",
      "label": "自动更正（macOS）",
      "description": "单词输入完成后，应用 macOS 置信度较高的拼写更正"
    },
    "emojiAutocomplete": {
      "sourceHash": "fe869f506add710637b1bea037a9e66da774a535fcc78fdd45d365d97b08519d",
      "label": "Emoji 自动补全",
      "description": "根据 `:name:` 短代码建议 emoji，并展开 `:D` 或 `:-)` 等文本表情"
    },
    "paste.largeMenuThreshold": {
      "sourceHash": "08d124bd27fcbcb5b77beb1481e16912a04e4ace4696e88d1b7b4e0f4ac9f51c",
      "label": "大段粘贴菜单",
      "description": "当粘贴内容达到此行数时，提供菜单，可将其放入代码块、XML 标签或保存到文件。设为 0 会禁用此菜单（大段粘贴仍会折叠为 [Paste] 标记）",
      "options": {
        "0": {
          "label": "关闭"
        },
        "100": {
          "label": "100 行"
        },
        "250": {
          "label": "250 行"
        },
        "500": {
          "label": "500 行"
        },
        "1000": {
          "label": "1000 行"
        }
      }
    },
    "startup.quiet": {
      "sourceHash": "0f74f904bc6ca53314b6f45fbb6279cd26083a0bbd7dacc3c4c4be37141b5b2d",
      "label": "静默启动",
      "description": "跳过欢迎屏幕和启动状态消息"
    },
    "startup.showSplash": {
      "sourceHash": "b6e7ad7ff9d2c6b6f721fd25f712ffe59728a7f54da5e9e8274da27134c93bec",
      "label": "显示启动动画",
      "description": "正常交互式启动时显示完整的设置动画，但不重新运行设置。静默启动仍会将其隐藏"
    },
    "startup.setupWizard": {
      "sourceHash": "97226b14ea64fdd2ce3c2f937d2162e40e015b39347f675fb4fc34706eea39c8",
      "label": "设置向导",
      "description": "每个设置版本仅显示一次新添加的引导步骤"
    },
    "startup.checkUpdate": {
      "sourceHash": "20e1bee637e83b57145c9599beaf5984ac8c7ba6afbb4fe8f84935e50bf585b5",
      "label": "检查更新",
      "description": "启动时检查 omp 更新"
    },
    "update.channel": {
      "sourceHash": "b8089a847c4655149744116e2744d1b3f582bea246d5b379f010efee9ebf02d7",
      "label": "更新通道",
      "description": "omp update 和启动更新检查所使用的更新通道",
      "options": {
        "stable": {
          "label": "稳定版"
        },
        "canary": {
          "label": "Canary"
        }
      }
    },
    "marketplace.autoUpdate": {
      "sourceHash": "f2d619eaecc2713ff1f3b70e322191862cece14d8ec774fd53eda06ad1de4861",
      "label": "Marketplace 自动更新",
      "description": "启动时检查插件更新",
      "options": {
        "off": {
          "label": "关闭",
          "description": "不检查插件更新"
        },
        "notify": {
          "label": "通知",
          "description": "启动时检查，并在有可用更新时通知"
        },
        "auto": {
          "label": "自动",
          "description": "启动时检查并自动安装更新"
        }
      }
    },
    "startup.changelogMode": {
      "sourceHash": "88b9b6abe641c14f09265e0cabc38d6045f530ae458d3365cd5802921dcb254d",
      "label": "启动时更新日志",
      "description": "选择更新说明最初显示摘要、完整详情还是保持隐藏",
      "options": {
        "summary": {
          "label": "摘要",
          "description": "显示发布和变更数量，并提示使用 /changelog"
        },
        "expanded": {
          "label": "展开",
          "description": "完整显示最近的发布说明"
        },
        "hidden": {
          "label": "隐藏",
          "description": "启动时不显示发布说明"
        }
      }
    },
    "magicKeywords.enabled": {
      "sourceHash": "562eae89d3d791c42d050ed4dea84bd066df129f1601b6694b67d16621afffac",
      "label": "魔法关键词",
      "description": "为单独使用的 `ultrathink`、`orchestrate`、`workflowz`、`jevify` 关键词启用隐藏提示"
    },
    "magicKeywords.ultrathink": {
      "sourceHash": "051af7cad7887495172556e13ba4c799c5076cb3788219af399bd1d485699a45",
      "label": "Ultrathink 关键词",
      "description": "允许单独使用的 ultrathink 请求最大程度的自动思考，并附加其隐藏提示"
    },
    "magicKeywords.orchestrate": {
      "sourceHash": "68c202d555f9c46af61efbae142258cf1d9021e3a6d94c5539e8c673d6412132",
      "label": "Orchestrate 关键词",
      "description": "允许单独出现的 orchestrate 附加其隐藏的多智能体编排说明"
    },
    "magicKeywords.workflow": {
      "sourceHash": "af2c75c349b2a979fa04ccb6d3567bc54a2afe58e2b56d53a11f8d9fab329578",
      "label": "Workflow 关键词",
      "description": "允许单独出现的 workflowz 附加其隐藏的 eval 工作流说明"
    },
    "completion.notify": {
      "sourceHash": "d7bbafdf7657307edb3701a7f72fd244443e376675a0901de9450911acbd276d",
      "label": "完成通知",
      "description": "当智能体结束一个回合时通知"
    },
    "error.notify": {
      "sourceHash": "cb1fb099696ec586436217b93e7a988d4dcb5edacdc384bfa2b146381ea4c6c6",
      "label": "错误通知",
      "description": "当智能体因错误而停止时通知"
    },
    "ask.timeout": {
      "sourceHash": "027cddc00c76b78c13fcb133b5cfc00872a7d672619b7b6f793c5229600ced2d",
      "label": "Ask 超时",
      "description": "达到此秒数后自动选择推荐的 ask 选项（0 表示禁用）",
      "options": {
        "0": {
          "label": "已禁用"
        },
        "15": {
          "label": "15 秒"
        },
        "30": {
          "label": "30 秒"
        },
        "60": {
          "label": "60 秒"
        },
        "120": {
          "label": "120 秒"
        }
      }
    },
    "ask.notify": {
      "sourceHash": "94705b07d84277f0eaa1cfcb0fc129121a18fb1f4c7c6bbfefdf9675e405f99b",
      "label": "Ask 通知",
      "description": "当 ask 工具正在等待输入时通知"
    },
    "recap.enabled": {
      "sourceHash": "410f35d7ed07912876381f1ba5b01181dcb0ca67a3bf60dda31430bd432657ff",
      "label": "空闲回顾",
      "description": "终端空闲后，生成简短的 LLM 当前进展回顾"
    },
    "recap.idleSeconds": {
      "sourceHash": "437446fada1b1da2f63a3786d5b06ae457e791a8a3e9e67bd98788f0041ae234",
      "label": "空闲回顾延迟",
      "description": "空闲后等待多少秒再显示回顾",
      "options": {
        "60": {
          "label": "1 分钟"
        },
        "120": {
          "label": "2 分钟"
        },
        "240": {
          "label": "4 分钟"
        },
        "300": {
          "label": "5 分钟"
        },
        "600": {
          "label": "10 分钟"
        }
      }
    },
    "collab.relayUrl": {
      "sourceHash": "507a42e5c9e5eac78f0c1c7c7646cc8b6800eb8fe15b74eeb26f29e494f9fc5e",
      "label": "中继 URL",
      "description": "供 /collab 使用的中继（wss://host[:port]）"
    },
    "collab.webUrl": {
      "sourceHash": "980521f1b36be66020340fd9556802c492b7358a4431e6603cc7d8477c307891",
      "label": "Web UI URL",
      "description": "供 /collab 链接使用的浏览器 UI；留空时根据 collab.relayUrl 推导；显式使用 http:// 时仅限 localhost"
    },
    "collab.displayName": {
      "sourceHash": "89bef2a68721bdbe666342761933437f53783af7950ebe5ebccef2fe1f2f67b5",
      "label": "显示名称",
      "description": "向其他协作参与者显示的名称（默认：OS 用户名）"
    },
    "share.serverUrl": {
      "sourceHash": "2d5f4e2bac845ccb18e1cb811a71374a43cdd2cd15255db755b64340f45042b3",
      "label": "分享服务器",
      "description": "供 /share 使用的分享查看器和上传服务基础地址（加密 blob 上传 + 查看器；链接格式为 <base>/<id>#<key>）"
    },
    "share.store": {
      "sourceHash": "2fc43994b5468ec8c470be7f757c38d330050c4914336d6395ef5ac98609ef4f",
      "label": "分享存储",
      "description": "/share 上传加密会话 blob 的位置",
      "options": {
        "blob": {
          "label": "加密 Blob",
          "description": "上传到分享服务器（无需 GitHub 账号；可避免 Gist API 速率限制）"
        },
        "gist": {
          "label": "GitHub Gist",
          "description": "推送到私密 Gist（需要已认证的 gh），并回退到分享服务器"
        }
      }
    },
    "share.redactSecrets": {
      "sourceHash": "bf717b2155efc6c002c903822ef99b012b371981c7ad93ad75803e166ae7cb43",
      "label": "分享机密信息脱敏",
      "description": "上传前对 /share 快照运行机密信息混淆器（使用 secrets.* 配置）"
    },
    "stt.enabled": {
      "sourceHash": "b9b82ee7366a472506048171907ab19ff8464381707ebbdd0c2d3a9a673acc4d",
      "label": "语音转文本",
      "description": "启用通过麦克风进行语音转文本输入"
    },
    "stt.submitTrigger": {
      "sourceHash": "f2fb4135bcfb40707ba420acb23431bc4f94da1f0fb66a56e9f6a3fb61a71912",
      "label": "语音转文本提交触发方式",
      "description": "选择语音听写何时自动提交：从不、松开时（至少 2 个单词）、松开时且句子完整，或当我说 Submit 时",
      "options": {
        "never": {
          "label": "从不",
          "description": "绝不自动提交；插入听写内容并停留在编辑器中"
        },
        "release": {
          "label": "松开时",
          "description": "若话语包含至少 2 个单词，则在松开时提交，以避免意外发送"
        },
        "release-complete": {
          "label": "松开时且句子完整",
          "description": "若话语以句末标点（.、?、! 等）结尾，则在松开时提交"
        },
        "say-submit": {
          "label": "当我说 Submit 时",
          "description": "若话语末尾的单词包含“submit”，则提交（提交前移除该单词）"
        }
      }
    },
    "contextPromotion.enabled": {
      "sourceHash": "c6e19d3856ee8d0bdaa2f1e438280eb2807d1d0641cde05b24a488b6a1385b5b",
      "label": "自动升级上下文",
      "description": "上下文溢出时改用上下文窗口更大的模型，而不是进行压缩"
    },
    "extendedContext": {
      "sourceHash": "871bf725950ada3db805571e5a2f509029a0946896dde3a2fd13bc02ca4fd53e",
      "label": "扩展上下文",
      "description": "在支持的模型上使用更大的上下文窗口，可能按更高价格计费；关闭后使用默认窗口或标准定价窗口"
    },
    "compaction.enabled": {
      "sourceHash": "4ac5ffc1935d44f855f3dafe2451e8b3fab68feda0bdb05960fe6194239e8b71",
      "label": "自动压缩",
      "description": "上下文过大时自动进行压缩"
    },
    "compaction.midTurnEnabled": {
      "sourceHash": "a04902e65ad02a62589daa613d4e1e2c0bf1bf9149e904aeabffda54d9bffc35",
      "label": "轮次中压缩",
      "description": "在轮次中安全的工具循环边界处、发起下一次提供商请求前检查阈值；子代理始终检查，因为其整个任务都在一个轮次内完成"
    },
    "compaction.methodOrder": {
      "sourceHash": "a620bcc8781ba133237d86dd9301a2e98210dbc2451e51b19066638faa02715c",
      "label": "压缩方法顺序",
      "description": "自动维护上下文时首选的回退顺序；方法不可用或失败时会转到下一个选项",
      "options": {
        "remote": {
          "label": "服务器压缩",
          "description": "当前路由支持时，使用提供商原生的服务器压缩（OpenAI Responses compact、Anthropic compaction beta）"
        },
        "snapcompact": {
          "label": "Snapcompact",
          "description": "将历史记录存档为高密度位图图像，供当前视觉模型读回；无需 LLM 调用"
        },
        "handoff": {
          "label": "Handoff",
          "description": "生成 Handoff 文档，并以其作为压缩摘要继续"
        },
        "soft": {
          "label": "软压缩",
          "description": "不使用服务器压缩，通过压缩模型就地生成摘要"
        },
        "shake": {
          "label": "Shake",
          "description": "无需 LLM 调用，就地丢弃可恢复的大体量内容"
        }
      }
    },
    "compaction.thresholdPercent": {
      "sourceHash": "1710ae7fffc8612d102fd262105bb5668b55d9ba95bd30e4afec57a24964d54d",
      "label": "压缩阈值",
      "description": "上下文维护的百分比阈值；设为默认可使用旧版基于预留量的行为",
      "options": {
        "10": {
          "label": "10%",
          "description": "极早执行维护"
        },
        "20": {
          "label": "20%",
          "description": "很早执行维护"
        },
        "30": {
          "label": "30%",
          "description": "较早执行维护"
        },
        "40": {
          "label": "40%",
          "description": "适度提前执行维护"
        },
        "50": {
          "label": "50%",
          "description": "中点"
        },
        "60": {
          "label": "60%",
          "description": "上下文用量适中"
        },
        "70": {
          "label": "70%",
          "description": "均衡"
        },
        "75": {
          "label": "75%",
          "description": "略激进"
        },
        "80": {
          "label": "80%",
          "description": "常用阈值"
        },
        "85": {
          "label": "85%",
          "description": "激进的上下文用量"
        },
        "90": {
          "label": "90%",
          "description": "非常激进"
        },
        "95": {
          "label": "95%",
          "description": "接近上下文限制"
        },
        "default": {
          "label": "默认",
          "description": "旧版基于预留量的阈值"
        }
      }
    },
    "compaction.thresholdTokens": {
      "sourceHash": "bda8820a3ecfeebba826c104afb1d736c0ad747430e5ff6daab74305426e1dd2",
      "label": "压缩 token 限制",
      "description": "用于上下文维护的固定 token 限制；设置后会覆盖百分比阈值",
      "options": {
        "25000": {
          "label": "25K token",
          "description": "200K 窗口的八分之一"
        },
        "50000": {
          "label": "50K token",
          "description": "200K 窗口的四分之一"
        },
        "100000": {
          "label": "100K token",
          "description": "200K 窗口的一半"
        },
        "150000": {
          "label": "150K token",
          "description": "200K 窗口的四分之三"
        },
        "200000": {
          "label": "200K token",
          "description": "完整的标准上下文窗口"
        },
        "300000": {
          "label": "300K token",
          "description": "大型上下文窗口"
        },
        "500000": {
          "label": "500K token",
          "description": "超大型上下文窗口"
        },
        "default": {
          "label": "默认",
          "description": "使用基于百分比的阈值"
        }
      }
    },
    "compaction.handoffSaveToDisk": {
      "sourceHash": "9f1c8938aa9a600a5f6f77ff018bae333e5dea1c2b3d5ac82f4973fa479e6525",
      "label": "保存 Handoff 文档",
      "description": "为自动 Handoff 流程将生成的 Handoff 文档保存为 markdown 文件"
    },
    "compaction.remoteStreamingV2Enabled": {
      "sourceHash": "fe385a6e54c98867b1e5c86ae621317034f0dbd670002b0fc8abddb8d37f19de",
      "label": "远程压缩 V2",
      "description": "对兼容的远程压缩模型使用 Responses 流式压缩"
    },
    "compaction.asyncEnabled": {
      "sourceHash": "762cbf1dbe2b43236a49a534cc1af1dfd3f4b7200721ba488a92cf51ae314014",
      "label": "异步压缩",
      "description": "当上下文接近压缩阈值时预先在后台生成摘要，并在越过阈值时拼接已就绪的结果"
    },
    "compaction.idleEnabled": {
      "sourceHash": "250e119153672e022655a698337cce3500cf512da59771623319d4bd51217278",
      "label": "空闲时压缩",
      "description": "空闲且 token 数超过阈值时压缩上下文"
    },
    "compaction.idleThresholdTokens": {
      "sourceHash": "488090994647fb17425d5c4a14f8dc357d43e422761f75f9b2266fb16ff3c72d",
      "label": "空闲压缩阈值",
      "description": "触发空闲压缩的 token 数下限",
      "options": {
        "100000": {
          "label": "100K token"
        },
        "200000": {
          "label": "200K token"
        },
        "300000": {
          "label": "300K token"
        },
        "400000": {
          "label": "400K token"
        },
        "500000": {
          "label": "500K token"
        },
        "600000": {
          "label": "600K token"
        },
        "700000": {
          "label": "700K token"
        },
        "800000": {
          "label": "800K token"
        },
        "900000": {
          "label": "900K token"
        }
      }
    },
    "compaction.idleTimeoutSeconds": {
      "sourceHash": "4785cae326f9041d125c9186f0523ecfd667733a4ea03d43e86dc1dc71e90db9",
      "label": "空闲压缩延迟",
      "description": "空闲后等待多少秒再进行压缩",
      "options": {
        "60": {
          "label": "1 分钟"
        },
        "120": {
          "label": "2 分钟"
        },
        "300": {
          "label": "5 分钟"
        },
        "600": {
          "label": "10 分钟"
        },
        "1800": {
          "label": "30 分钟"
        },
        "3600": {
          "label": "1 小时"
        }
      }
    },
    "compaction.supersedeReads": {
      "sourceHash": "e02a63446bbb5324152d69e38184842ad6c8175659dd5bb083288805c89e93a6",
      "label": "替换过期读取结果",
      "description": "再次读取同一文件时，裁剪较早的读取结果（感知缓存，每轮运行）"
    },
    "compaction.dropUseless": {
      "sourceHash": "c5ae5e6d542ea484519f6659e9f2e81d26ca648022a09ed603ff769e7876714e",
      "label": "省略无用结果",
      "description": "已使用后，裁剪被标记为对上下文无用的工具结果（无匹配、等待超时；感知缓存）"
    },
    "snapcompact.systemPrompt": {
      "sourceHash": "aa5fb0b317229dea9533b4323f1ed3b47eb0b7e7eb2fccb23f6ab80d70d7ac6b",
      "label": "Snapcompact 系统提示词",
      "description": "实验性功能：将选定的系统提示词文本渲染为高密度 PNG 图像并附加到首条用户消息（仅限视觉模型）；可节省 token，但被图像化的文本将失去提示词缓存",
      "options": {
        "none": {
          "label": "无",
          "description": "将系统提示词保留为文本"
        },
        "agents-md": {
          "label": "AGENTS.md",
          "description": "仅在可节省 token 时，将已加载的上下文文件指令转为图像"
        },
        "all": {
          "label": "全部",
          "description": "仅在可节省 token 时，将完整系统提示词转为图像"
        }
      }
    },
    "snapcompact.toolResults": {
      "sourceHash": "96bc045f84c1870203b3f43f77a214f7f7e24e4fc42240ebcf4872bd5d953f7e",
      "label": "Snapcompact 工具结果",
      "description": "实验性功能：将较大的历史工具结果渲染为高密度 PNG 图像而非文本（仅限视觉模型）；可减少累积的读取和搜索输出所占用的 token"
    },
    "tools.format": {
      "sourceHash": "e9fbb3f0e902e4d0e0568947251244fb69bd53f8ec90d24e0ea65e55d8ddae90",
      "label": "工具调用模式",
      "description": "控制向模型提供工具的方式。自动模式使用提供商原生工具调用，除非所选模型被标记为不支持，此时回退到由 OMP 实现的 GLM 工具调用格式。原生模式强制使用提供商原生工具；其他值强制使用对应的 OMP 工具调用格式",
      "options": {
        "auto": {
          "label": "自动",
          "description": "使用原生工具调用，除非已知模型不支持"
        },
        "native": {
          "label": "原生",
          "description": "使用提供商原生工具调用"
        },
        "glm": {
          "label": "GLM",
          "description": "使用 GLM 风格的带内工具调用"
        },
        "hermes": {
          "label": "Hermes",
          "description": "使用 Hermes 风格的带内工具调用"
        },
        "kimi": {
          "label": "Kimi",
          "description": "使用 Kimi 风格的带内工具调用"
        },
        "xml": {
          "label": "XML",
          "description": "使用通用 XML 带内工具调用"
        },
        "anthropic": {
          "label": "Anthropic",
          "description": "使用 Anthropic 风格的带内工具调用"
        },
        "deepseek": {
          "label": "DeepSeek",
          "description": "使用 DeepSeek 风格的带内工具调用"
        },
        "harmony": {
          "label": "Harmony",
          "description": "使用 Harmony 风格的带内工具调用"
        },
        "qwen3": {
          "label": "Qwen3",
          "description": "使用由 OMP 实现的 Qwen3 工具调用格式"
        },
        "gemini": {
          "label": "Gemini",
          "description": "使用由 OMP 实现的 Gemini 工具调用格式"
        },
        "gemma": {
          "label": "Gemma",
          "description": "使用由 OMP 实现的 Gemma 工具调用格式"
        },
        "minimax": {
          "label": "MiniMax",
          "description": "使用由 OMP 实现的 MiniMax 工具调用格式"
        }
      }
    },
    "snapcompact.shape": {
      "sourceHash": "05247a86267c78b1d5f7aab1d5d9a6f8fc5e281bd4d426e5e00cf23e32732a63",
      "label": "Snapcompact 形状",
      "description": "Snapcompact 呈现文本时使用的帧形状（用于压缩存档和内联图像）；自动模式会选择针对当前模型调优的形状",
      "options": {
        "auto": {
          "label": "自动",
          "description": "选择针对当前模型调优的形状，无法匹配时回退到其提供商系列"
        },
        "8x8r-bw": {
          "label": "8x8 重复，黑色",
          "description": "unscii 方形字格，黑色墨迹，每行打印两次，副本位于浅色高亮带上"
        },
        "8x8r-sent": {
          "label": "8x8 重复，句子色调",
          "description": "重复网格，墨色在句子边界按六种色调循环"
        },
        "8x8u-bw": {
          "label": "8x8，黑色",
          "description": "普通 unscii 方形字格，每行仅打印一次，黑色墨迹"
        },
        "8x8u-sent": {
          "label": "8x8，句子色调",
          "description": "普通 unscii 方形字格，墨色按句变色"
        },
        "6x6u-bw": {
          "label": "6x6 高密度，黑色",
          "description": "将 unscii 压缩至 6x6——可读的最密字格、帧数最少——使用黑色墨迹"
        },
        "6x6u-sent": {
          "label": "6x6 高密度，句子色调",
          "description": "最密字格，墨色按句变色"
        },
        "5x8-bw": {
          "label": "5x8 旧版，黑色",
          "description": "原版 X.org 5x8 字形，位于 2576px 帧上，使用黑色墨迹"
        },
        "5x8-sent": {
          "label": "5x8 旧版，句子色调",
          "description": "Snapcompact 的原始形状（形状表出现前的会话使用此形状渲染）"
        },
        "6x12-dim": {
          "label": "6x12，弱化停用词",
          "description": "X.org 6x12 字形，黑色墨迹，功能词以灰色弱化显示"
        },
        "8x13-bw": {
          "label": "8x13，黑色",
          "description": "X.org 8x13 字形，黑色墨迹"
        },
        "8on16-bw": {
          "label": "8x13，16px 行距，黑色",
          "description": "8x16 字格中的 8x13 字形（增加行距），黑色墨迹"
        },
        "8on22-bw": {
          "label": "8x13，22px 行距，黑色",
          "description": "8x22 字格中的 8x13 字形——增加行距以避免各行拥挤；OpenAI/Google 的默认值"
        },
        "11on16-bw": {
          "label": "8x13，11px 字符步进，黑色",
          "description": "11x16 字格中的 8x13 字形——增加字母间距以避免字符粘连；Anthropic 的默认值"
        },
        "silver16-bw": {
          "label": "Silver 16，CJK",
          "description": "在 16px 网格中使用内嵌的 Silver TrueType 字体，适用于 CJK 及其他非拉丁文字"
        },
        "doc-8on16-bw": {
          "label": "Doc 8on16，黑色",
          "description": "两栏自动换行的报纸式版面，使用 8x13 字形、16px 行距和黑色墨迹"
        },
        "doc-8on16-sent": {
          "label": "Doc 8on16，句子色调",
          "description": "两栏文档版式，墨色按句变色"
        },
        "doc-8on16-sent-dim": {
          "label": "Doc 8on16，句子色调 + 弱化停用词",
          "description": "两栏文档版式，墨色按句变色，功能词以灰色弱化显示"
        }
      }
    },
    "branchSummary.enabled": {
      "sourceHash": "7d4872335881da0529029e4463ee7e822e829fbeb14b45b4163c412641627c2e",
      "label": "分支摘要",
      "description": "离开分支时提示生成摘要"
    },
    "memory.backend": {
      "sourceHash": "ad3a03ccc4288854806fc03aedfde6090f15626d0cbda4e6b6037ecc7dbae794",
      "label": "记忆后端",
      "description": "关闭，或使用本地摘要流程、Mnemopi SQLite、Hindsight 远程记忆或 Sharpshooter",
      "options": {
        "off": {
          "label": "关闭",
          "description": "不运行任何记忆子系统"
        },
        "local": {
          "label": "本地",
          "description": "本地执行轨迹摘要流程（`memory_summary.md`）"
        },
        "hindsight": {
          "label": "Hindsight",
          "description": "Vectorize Hindsight 远程记忆服务"
        },
        "mnemopi": {
          "label": "Mnemopi",
          "description": "本地 SQLite 召回与存储后端，可选用嵌入向量"
        },
        "sharpshooter": {
          "label": "Sharpshooter",
          "description": "遇到任务阻力时触发的项目决策文件（架构、产品、风格），在后台整合"
        }
      }
    },
    "autolearn.enabled": {
      "sourceHash": "44c29b283026260e8d1cef589c74fa18d98d60f15406efc4d4787adda43fce94",
      "label": "自动学习（实验性）",
      "description": "智能体停止后，提示其将经验写入记忆，并创建或增强相互隔离的托管技能"
    },
    "autolearn.autoContinue": {
      "sourceHash": "80235bbc373ec9cfac66d9faa79579dd73cbfc531f8c7c843c9003a09608e129",
      "label": "停止时自动运行捕获",
      "description": "开启时，在停止时自动运行一轮私有捕获（会额外使用 token）；关闭时，仅保留常驻的自动学习指导"
    },
    "mnemopi.dbPath": {
      "sourceHash": "6edb10f1c642d197994b758ee93ac1ac5b13e48a8d3dd1222921a5371dc32122",
      "label": "Mnemopi DB 路径",
      "description": "可选的 SQLite DB 路径，默认为智能体记忆目录"
    },
    "mnemopi.bank": {
      "sourceHash": "1512e129c6007ed86b1f07ed6fa676303a57f7b09ff6bb48257a9c3b119298c7",
      "label": "Mnemopi 记忆库",
      "description": "可选的共享记忆库基础名称；按项目模式会据此派生项目本地记忆库"
    },
    "mnemopi.scoping": {
      "sourceHash": "5d00cd40504424430a0ce6b5ae3eeb743ee8cc018e4016028a2b8298912e1f6a",
      "label": "Mnemopi 作用域",
      "description": "global = 单个共享记忆库；per-project = 每个 cwd 使用隔离的记忆库；per-project-tagged = 写入项目本地记忆库，同时可见全局召回结果",
      "options": {
        "global": {
          "label": "全局",
          "description": "所有项目共用一个 Mnemopi 记忆库"
        },
        "per-project": {
          "label": "按项目",
          "description": "每个 cwd 基名对应一个项目本地 Mnemopi 记忆库"
        },
        "per-project-tagged": {
          "label": "按项目（带标签）",
          "description": "写入项目本地记忆库，但合并项目和共享记忆库的召回结果"
        }
      }
    },
    "mnemopi.embeddingVariant": {
      "sourceHash": "4a260ee0ceae2308b6f68ed442fa856f0ee9ef281b28570ea2b5211ca5e271ec",
      "label": "嵌入变体",
      "description": "本地嵌入模型系列；en = 更强的英语模型；multilingual = 跨语言模型。更改后，下次启动时会重建现有记忆的嵌入",
      "options": {
        "en": {
          "label": "英语（bge-base-en-v1.5）",
          "description": "BAAI/bge-base-en-v1.5（768d），仅限英语"
        },
        "multilingual": {
          "label": "多语言（multilingual-e5-large）",
          "description": "intfloat/multilingual-e5-large（1024d），支持跨语言召回"
        }
      }
    },
    "mnemopi.autoRecall": {
      "sourceHash": "0df3434f3c1666a6095cf1a216b2b7854dc80e785881de2291be6344ff896278",
      "label": "Mnemopi 自动召回",
      "description": "在每次会话的第一轮中召回本地记忆"
    },
    "mnemopi.autoRetain": {
      "sourceHash": "9a6a8a65929c72005582bffbb401cb1e3ab3b16db71a34f415e4753d88abe9bb",
      "label": "Mnemopi 自动保留",
      "description": "将已完成的对话轮次保留到本地 Mnemopi 记忆中"
    },
    "mnemopi.polyphonicRecall": {
      "sourceHash": "8ac38b0da889747adc40a8a366a63467e8ac068724ed1516bdf4b801f3b1b6ad",
      "label": "Mnemopi 多路召回",
      "description": "融合图谱、事实、向量和时间维度的召回，让关联记忆无需关键词匹配也能呈现"
    },
    "mnemopi.enhancedRecall": {
      "sourceHash": "7ac3d3e453675f88dc8344a713b187a96a686301ac46c3d96ae25e4a76564d70",
      "label": "Mnemopi 增强召回",
      "description": "缓存选项完全相同的重复或相似查询的召回结果；任何记忆写入都会清空缓存"
    },
    "mnemopi.proactiveLinking": {
      "sourceHash": "7032d04806166d2ad7926f40688a2ca0a66cd76c76250a6bb398310d09e85934",
      "label": "Mnemopi 主动链接",
      "description": "在存储新记忆时将其写入情景图，并与相关实体和记忆建立链接"
    },
    "mnemopi.noEmbeddings": {
      "sourceHash": "5f6fa8b2ea8015e6e2d6c5b8c7e538caab0f7d6c213ddc0b66146d32be5cf0fe",
      "label": "Mnemopi 禁用嵌入",
      "description": "强制使用确定性的仅 FTS 召回，而不是向量嵌入"
    },
    "mnemopi.embeddingModel": {
      "sourceHash": "27de29dec508c2b10d7f45c9800eff86a9f9444993080e64a7281175c0314194",
      "label": "Mnemopi 嵌入模型",
      "description": "高级：显式指定覆盖变体的嵌入模型 ID；留空则使用 mnemopi.embeddingVariant"
    },
    "mnemopi.embeddingApiUrl": {
      "sourceHash": "c057e9a742d208adf90545260b7ab2c5dce46cdb8359260e47262ab06ac936a8",
      "label": "Mnemopi 嵌入 API URL",
      "description": "传递给 Mnemopi 的可选 OpenAI 兼容嵌入端点"
    },
    "mnemopi.embeddingApiKey": {
      "sourceHash": "537b5f568cfcc08b610269aa61de82414f3df1f7383049b0b8455aab0e0b431c",
      "label": "Mnemopi 嵌入 API 密钥",
      "description": "传递给 Mnemopi 的可选嵌入 API 密钥"
    },
    "mnemopi.llmMode": {
      "sourceHash": "41d2c6637e4fd5922fcfc42df2d7431d73ac742305373424946bb2ce31290268",
      "label": "Mnemopi LLM 模式",
      "description": "不使用 LLM、使用在线 tiny 模型（/models 中的 TINY 角色，否则为 @smol），或使用远程 OpenAI 兼容端点",
      "options": {
        "none": {
          "label": "无",
          "description": "禁用由 LLM 支持的 Mnemopi 提取"
        },
        "smol": {
          "label": "在线（tiny）",
          "description": "使用在线 tiny 模型（/models 中的 TINY 角色，否则为 @smol）"
        },
        "remote": {
          "label": "远程",
          "description": "使用下方的 Mnemopi 远程 LLM 设置"
        }
      }
    },
    "mnemopi.llmBaseUrl": {
      "sourceHash": "18d588fa637b5b29905e28aeb754ec813fb4a559c54da827e26d06caf213d3c7",
      "label": "Mnemopi LLM 基础 URL",
      "description": "Mnemopi 远程模式使用的可选 OpenAI 兼容 LLM 端点"
    },
    "mnemopi.llmApiKey": {
      "sourceHash": "660594c0042ca6ec30a07cd832e80096199758c70a61b5c9b4b3ff4e378b219f",
      "label": "Mnemopi LLM API 密钥",
      "description": "Mnemopi 远程模式使用的可选 LLM API 密钥"
    },
    "mnemopi.llmModel": {
      "sourceHash": "0a280568c2650359f8e3ed0265a13e2a71c794703325e76d7d1faea0ee2200aa",
      "label": "Mnemopi LLM 模型",
      "description": "Mnemopi 远程模式使用的可选 LLM 模型名称"
    },
    "hindsight.apiUrl": {
      "sourceHash": "5816ddeabf77c367fbadbc99a5b4ff89e3331865f73561ee808bb7cb1071cd0e",
      "label": "Hindsight API URL",
      "description": "Hindsight 服务器 URL（Cloud 或自托管）"
    },
    "hindsight.apiToken": {
      "sourceHash": "a9b8694448f28acc44aca18cc30f40870981bb2b7e437a14b4af4220653438c5",
      "label": "Hindsight API Token",
      "description": "用于需要身份验证的 Hindsight 服务器的 Bearer token"
    },
    "hindsight.bankId": {
      "sourceHash": "43147be9beaec9ce4060f37daf2997b4bb41b067b6204a77c24fd2b7dd60ae48",
      "label": "Hindsight 记忆库 ID",
      "description": "记忆库标识符（默认：项目名称）"
    },
    "hindsight.scoping": {
      "sourceHash": "2690e006acd62eab1d13cba75693e24b59e677833e5e749c12f1e8ff36861b5f",
      "label": "Hindsight 作用域",
      "description": "global = 单个共享记忆库；per-project = 每个 cwd 使用隔离的记忆库；per-project-tagged = 使用项目标签的共享记忆库，召回时合并全局记忆和项目记忆",
      "options": {
        "global": {
          "label": "全局",
          "description": "一个共享记忆库——每个项目看到相同的记忆"
        },
        "per-project": {
          "label": "按项目",
          "description": "每个 cwd 基名对应一个隔离的记忆库——项目之间无法看到彼此的记忆"
        },
        "per-project-tagged": {
          "label": "按项目（带标签）",
          "description": "使用共享记忆库，保留的内容会标记为 project:<cwd>；召回时同时呈现项目记忆和无标签的全局记忆"
        }
      }
    },
    "hindsight.autoRecall": {
      "sourceHash": "6b54f0c711423f19c901ffa695b923b612a2469e395139332243b2e72ce2d334",
      "label": "Hindsight 自动召回",
      "description": "在每个会话的首轮召回记忆"
    },
    "hindsight.autoRetain": {
      "sourceHash": "46c3626f1f3b163f111fcea3935477e3ad55cf6578d1bcb88f65a9f12584fe08",
      "label": "Hindsight 自动保留",
      "description": "每 N 轮以及会话边界时保留对话记录"
    },
    "hindsight.retainMode": {
      "sourceHash": "aeb4eb2520771fc63fcf924c4058dd2d2a09eedb70d530effe425c8d5db1bba9",
      "label": "Hindsight 保留模式",
      "description": "full-session = 每个会话更新插入一个文档，last-turn = 分块保留",
      "options": {
        "full-session": {
          "label": "完整会话",
          "description": "每个会话更新插入一个文档（推荐）"
        },
        "last-turn": {
          "label": "最后一轮",
          "description": "按轮次边界切分的分块保留"
        }
      }
    },
    "hindsight.mentalModelsEnabled": {
      "sourceHash": "f1f6fd04bbc4da8e0c18a28f22fae32e7bbadaa5320365e6d365a43cb04b4963",
      "label": "Hindsight 心智模型",
      "description": "启动时将精心整理的反思摘要（心智模型）读入开发者指令。加载记忆库中已有的模型，不会写入。若还需自动创建内置种子集，请与 hindsight.mentalModelAutoSeed 搭配使用"
    },
    "hindsight.mentalModelAutoSeed": {
      "sourceHash": "efc0e4731d5da6fdec92fd363f8f573feb86e55d777e9fe1b899f30bd0c193d6",
      "label": "Hindsight 心智模型自动播种",
      "description": "会话开始时，在记忆库中创建尚不存在的内置心智模型（project-conventions、project-decisions、user-preferences）"
    },
    "ttsr.enabled": {
      "sourceHash": "541808c1c2d9860be005b1f934332241102bfc8d4290394026323baa6c08be0a",
      "label": "TTSR",
      "description": "输出匹配规则模式时，在流式输出途中中断 agent（Time-Traveling Stream Rules）"
    },
    "ttsr.contextMode": {
      "sourceHash": "7ec08542ba7f6364b9d3cc270984701cb49e7b432a087aa8a55b1733f2151aef",
      "label": "TTSR 上下文模式",
      "description": "TTSR 触发时如何处理部分输出"
    },
    "ttsr.interruptMode": {
      "sourceHash": "291e616b89c17ab95a5e1eb6dbd568f82080e7271820726e471cd16d7d874cc4",
      "label": "TTSR 中断模式",
      "description": "何时在流式输出途中中断，何时在完成后注入警告",
      "options": {
        "always": {
          "label": "始终",
          "description": "在正文流和工具流中都中断"
        },
        "prose-only": {
          "label": "仅正文",
          "description": "仅在回复或思考匹配时中断"
        },
        "tool-only": {
          "label": "仅工具",
          "description": "仅在工具调用参数匹配时中断"
        },
        "never": {
          "label": "从不",
          "description": "绝不中断；完成后注入警告"
        }
      }
    },
    "ttsr.repeatMode": {
      "sourceHash": "d852ea694f60333eecf0decf22b3f2b45574ed0ecbce3a835a29e1a569684858",
      "label": "TTSR 重复模式",
      "description": "规则的重复方式：每个会话一次，或间隔一定数量的消息后重复"
    },
    "ttsr.repeatGap": {
      "sourceHash": "d6fc10d7f5f56abb34ea743bcd6d0897df953fe3a31c307ca93139e62745f5be",
      "label": "TTSR 重复间隔",
      "description": "规则再次触发前需间隔的消息数",
      "options": {
        "5": {
          "label": "5 条消息"
        },
        "10": {
          "label": "10 条消息"
        },
        "15": {
          "label": "15 条消息"
        },
        "20": {
          "label": "20 条消息"
        },
        "30": {
          "label": "30 条消息"
        }
      }
    },
    "ttsr.builtinRules": {
      "sourceHash": "4e96af65e610826bf10d5b4eaf3c3a388b6d96dfd6ef3f6e3d708d338e560e40",
      "label": "内置规则",
      "description": "加载 agent 随附的默认规则（可通过 ttsr.disabledRules 逐项覆盖）"
    },
    "ttsr.disabledRules": {
      "sourceHash": "5e7bfa671b845d9b22e305ac1722f4587d296e0c94919674b17a7d4fc0312369",
      "label": "禁用的规则",
      "description": "要完全忽略的规则名称（适用于随附的默认规则和你自己的规则）"
    },
    "edit.mode": {
      "sourceHash": "b54fadd48af314434e9fcae0e86d0c8a1acbe8ed71679625ee1b112d2a1e6579",
      "label": "编辑模式",
      "description": "选择编辑工具变体（replace、patch、hashline 或 apply_patch）"
    },
    "edit.fuzzyMatch": {
      "sourceHash": "0dee6242ca065b3e60e27f1bff9ccf59a4e8fdb61ea4b3f9f3394124d118bd1a",
      "label": "模糊匹配",
      "description": "接受由空白差异导致的高置信度模糊匹配"
    },
    "edit.fuzzyThreshold": {
      "sourceHash": "03a26b54e3e01f5c7b77a15d202066e205098ea2fb8b01c832bf8a5fbc9c20b8",
      "label": "模糊匹配阈值",
      "description": "接受模糊匹配的相似度阈值（0-1）",
      "options": {
        "0.85": {
          "label": "0.85",
          "description": "宽松"
        },
        "0.90": {
          "label": "0.90",
          "description": "适中"
        },
        "0.95": {
          "label": "0.95",
          "description": "默认"
        },
        "0.98": {
          "label": "0.98",
          "description": "严格"
        }
      }
    },
    "edit.streamingAbort": {
      "sourceHash": "d52ea56320b25b748bb5dbcce4ecf91cccb866e20b1acc8ecee1a5d78eb4df09",
      "label": "预览失败时中止",
      "description": "补丁预览失败时中止流式编辑工具调用"
    },
    "edit.blockAutoGenerated": {
      "sourceHash": "76349d5a3618af7df9728d653e2300dfebd994ea89fc3de089e36c539afc857e",
      "label": "阻止编辑自动生成的文件",
      "description": "防止编辑疑似自动生成的文件（protoc、sqlc、swagger 等）"
    },
    "edit.enforceSeenLines": {
      "sourceHash": "5d82e3a4e7fd59e81cafcb000c76d0fb56c9812af68aa990838dc0985e29c6a9",
      "label": "强制已查看行防护",
      "description": "拒绝锚定在先前读取或搜索中从未完整显示的行上的编辑"
    },
    "edit.blackbox.enabled": {
      "sourceHash": "3e403d8658ae30cfd8f943be790653e9a16d93afd8ff7fe67fae8f3c56e80725",
      "label": "记录解析回归",
      "description": "编辑导致 AST 解析失败时，追加记录编辑前后的完整源代码"
    },
    "edit.autoRepair.enabled": {
      "sourceHash": "621fa98edfbf3f955e31b8f002900a418abf044e8c81d62bb8bd0d9825464cf8",
      "label": "自动修复解析回归",
      "description": "编辑破坏文件的 AST 解析时，请求 smol 模型修复受损区域（通过重新解析验证；失败则回退为警告）"
    },
    "readLineNumbers": {
      "sourceHash": "096db8072a2a6c6ffd0926fcfe1e20eef95b7f9fb2dd1e8786587609d27c4c51",
      "label": "行号",
      "description": "默认在读取工具的输出前添加行号"
    },
    "read.defaultLimit": {
      "sourceHash": "0df2d7a44e406a4f46dc390661cf0f7225d437c74d67389509c325b6580ac1b2",
      "label": "默认读取上限",
      "description": "agent 调用 read 时未指定上限所返回的默认行数",
      "options": {
        "200": {
          "label": "200 行"
        },
        "300": {
          "label": "300 行"
        },
        "500": {
          "label": "500 行"
        },
        "1000": {
          "label": "1000 行"
        },
        "5000": {
          "label": "5000 行"
        }
      }
    },
    "read.renderMarkdown": {
      "sourceHash": "e0a226390a4acfe7133f214394f5afcf2b5dfcd0ac8288c894b81332101daad6",
      "label": "Markdown 预览",
      "description": "将 Markdown 读取结果渲染为终端中格式化的 Markdown 预览，而非原始源文本"
    },
    "read.summarize.enabled": {
      "sourceHash": "4de7d4b6bd2573f30db6ec4cabb854b87a3cf4343506af155d9658d69210e1b0",
      "label": "读取摘要",
      "description": "调用 read 时未明确指定选择器，则返回代码结构摘要"
    },
    "read.summarize.prose": {
      "sourceHash": "4295060e163ad487650b54aec061c480cddfa87a685c447ab3c5c91517e3fbdc",
      "label": "文本摘要",
      "description": "读取 Markdown 和纯文本时返回结构摘要"
    },
    "read.summarize.minBodyLines": {
      "sourceHash": "58f6f70e234c3c9e2fffb2cb2b46437efb3257d2ea89a3afa4cba55603f33cf7",
      "label": "读取摘要正文行数",
      "description": "读取摘要折叠多行正文或字面量前所需的最小长度"
    },
    "read.summarize.minCommentLines": {
      "sourceHash": "d9657d7b5dd2244951e3b7601b9fee350561926b8433ae5f14a78e277f6082eb",
      "label": "读取摘要注释行数",
      "description": "读取摘要折叠多行块注释前所需的最小长度"
    },
    "read.summarize.minTotalLines": {
      "sourceHash": "21293d63fabad824d849abea436d59f9f10e5e0c5359b8f065f480a72ed426a7",
      "label": "读取摘要最小文件行数",
      "description": "总行数少于此值的文件将按原文读取，而不生成结构摘要"
    },
    "read.summarize.unfoldUntil": {
      "sourceHash": "bac87ce6f53f8d9ae0a409b226ff89332f3a2993527db629c88456c905ed216f",
      "label": "读取摘要展开目标",
      "description": "按 BFS 展开可省略区段，直到摘要至少达到此可见行数。设为 0 时仅保留最外层省略"
    },
    "read.summarize.unfoldLimit": {
      "sourceHash": "f6aa06e344332fe0081fb0a09b5e81184bba57506badc5e04e8fe48ec478d8f9",
      "label": "读取摘要展开上限",
      "description": "按 BFS 展开时摘要大小的硬性上限。如果某次展开显示的行数会超过此值，则跳过该展开（该区段保持折叠），并继续展开其余区段"
    },
    "read.toolResultPreview": {
      "sourceHash": "818ce1d7d09673f627d8ac2af5d6e73160d332fcf10dfac3745d666784f58a41",
      "label": "内联读取预览",
      "description": "在对话记录中内联显示读取工具结果，而非摘要行"
    },
    "lsp.enabled": {
      "sourceHash": "c01d690f5c32a9df560e180ced8e7f2f11f658097097e251a2576a8ada2f28e6",
      "label": "LSP",
      "description": "启用 lsp 工具以提供代码智能功能（定义、引用、诊断、重命名）"
    },
    "lsp.lazy": {
      "sourceHash": "5e5740595487c2c62b0154cba12ccd13ef68858bf8069cd509f21fc72a9eb419",
      "label": "延迟启动 LSP",
      "description": "首次使用时（调用 lsp 工具或编辑匹配文件类型的文件）启动语言服务器，而非在会话启动时启动"
    },
    "lsp.shared": {
      "sourceHash": "218b9222cfe3848219373cc6045062f421cb9a23560c461df245a0460bb8e46c",
      "label": "共享语言服务器",
      "description": "通过 daemon broker，让各 omp 实例按项目共享一个语言服务器（不可用时回退到私有服务器）"
    },
    "lsp.formatOnWrite": {
      "sourceHash": "37df220d69eae80d57e2a2c0f38e185e41db58745eac1fe47066be3402d24388",
      "label": "写入时格式化",
      "description": "写入后使用 LSP 自动格式化代码文件"
    },
    "lsp.diagnosticsOnWrite": {
      "sourceHash": "aa805d257b30073401ecce426d2853155f241a1d4b1205aa2cfdef99ea2edf20",
      "label": "写入时诊断",
      "description": "写入代码文件后返回 LSP 诊断"
    },
    "lsp.diagnosticsOnEdit": {
      "sourceHash": "47a375749cc8d0092ddae06daf69cf29b2cf3471c67fce158810bbd6b8816f52",
      "label": "编辑时诊断",
      "description": "编辑代码文件后返回 LSP 诊断"
    },
    "lsp.diagnosticsDeduplicate": {
      "sourceHash": "5867f78d2c7198fb59c1197a5fd9280179f594ffdcb73dfc0eaaabaa30d2371e",
      "label": "诊断去重",
      "description": "抑制文件中已显示的编辑后 LSP 诊断，仅显示新增或有变化的诊断"
    },
    "bash.enabled": {
      "sourceHash": "1f63445b202b78689e32c6f33af34e0db150e3e7ee83ed874adf0d2f7bf4c1fe",
      "label": "Bash",
      "description": "启用 Bash 工具以执行 Shell 命令"
    },
    "bash.autoBackground.enabled": {
      "sourceHash": "c2b67b462c2209f7b053ba2f287aeeebacd8ba9f072ada978b0aee8e3febcb4e",
      "label": "Bash 自动转入后台",
      "description": "自动将长时间运行的 Bash 命令转入后台，并在稍后返回结果"
    },
    "bash.patterns": {
      "sourceHash": "b3c7393b092c5e16454ad55d3bd507a40628576ff4dcaa88ef5e959d0da6ed6b",
      "label": "Bash 审批模式",
      "description": "按顺序应用的 Bash 命令审批规则。每项包含 match 和 approval 字段；仅支持“*”通配符"
    },
    "bashInterceptor.enabled": {
      "sourceHash": "9f06ea4cf1e208ea01a55f837a5baaba9463003605a5567efa1ab12dd0e709ff",
      "label": "Bash 拦截器",
      "description": "阻止已有专用工具可用的 Shell 命令"
    },
    "bash.direnv": {
      "sourceHash": "9656ed2f308c4358e9d1f8e40cefac08b345513f3ff88947a17343b58def2872",
      "label": "direnv 自动加载",
      "description": "自动将仓库的 direnv/devenv `.envrc` 加载到 Bash 会话中，无需手动运行 `direnv exec` 即可使用 devenv 工具和环境变量。遵循 direnv 的允许列表：未执行过 `direnv allow` 的 `.envrc` 绝不会运行"
    },
    "bash.direnvLoadTimeoutMs": {
      "sourceHash": "f60138de40811fdfaa27de944e738ca7f22f05f98161752f7e66fec8cccfd89b",
      "label": "direnv 加载超时（ms）",
      "description": "首次运行 `direnv export` 的最长等待时间（冷启动的 devenv Shell 可能较慢）；超时后，会话将在没有 direnv 环境的情况下运行"
    },
    "shellMinimizer.enabled": {
      "sourceHash": "7d1d42845464a834e003deaebb23307815ade47face9053f86ed01ebcafcfb30",
      "label": "Shell 输出精简",
      "description": "在将冗长的 Shell 输出（git、npm、cargo 等）返回给 agent 前进行压缩"
    },
    "shellMinimizer.sourceOutlineLevel": {
      "sourceHash": "6030471b3459c8f2d696960dd824b202c2236e0f1da58680060f42e051552887",
      "label": "Shell 输出精简源码提纲",
      "description": "对源文件执行 cat/read 时的源码提纲模式：default 或 aggressive"
    },
    "eval.py": {
      "sourceHash": "0740fbb1dc94dc8f443f3d69914e248de9580e4d2c1c64e6d3f28609c8b67d05",
      "label": "Python Eval 后端",
      "description": "允许 Eval 工具将 Python 单元发送到 IPython 内核"
    },
    "eval.js": {
      "sourceHash": "a17fdd6073eae8d7798a4bb1acae60498fc8ceba1cc2f6ca72696c9c5973b060",
      "label": "JavaScript Eval 后端",
      "description": "允许 Eval 工具将 JavaScript 单元发送到进程内运行时"
    },
    "eval.autoBackground.enabled": {
      "sourceHash": "d0713760429801c3e288d9352e75b925d8d1242388ca38c19a6670d00f3dc032",
      "label": "Eval 自动转入后台",
      "description": "自动将长时间运行的 Eval 单元转入后台，并在稍后返回结果"
    },
    "python.kernelMode": {
      "sourceHash": "69392022c21bd03be4e91ab9e57071b19d0406a0a44e0f7087a1d984f722270b",
      "label": "Python 内核模式",
      "description": "在多次 Eval 调用之间保持 IPython 内核运行，或每次都启动新内核"
    },
    "python.interpreter": {
      "sourceHash": "a29d689afcc75e70919d2ac226090eb23562e9bae59e3048819c7a675242e41e",
      "label": "Python 解释器",
      "description": "可选：指定确切 Python 可执行文件的路径。设置后将跳过 Python 运行时的自动发现"
    },
    "tools.approval": {
      "sourceHash": "b86dd87ee8c3c134840f82e8b8f6625564d6a277cb2d55b52552e55cc810f1d2",
      "label": "工具审批策略",
      "description": "每项工具的审批策略。设为 'allow' 可自动批准，设为 'prompt' 可要求确认，设为 'deny' 可阻止。覆盖设置在每种审批模式下都会生效"
    },
    "tools.approvalMode": {
      "sourceHash": "9920bc16ed279d2f93463626589aad28234b08b6cf736b3ecaef928d6f8752ff",
      "label": "工具审批",
      "description": "工具调用的默认审批行为。'Always ask' 仅自动批准只读工具。'Write' 自动批准读取和工作区写入工具。'Yolo' 自动批准所有层级；用户策略仍可要求确认或阻止",
      "options": {
        "always-ask": {
          "label": "始终询问",
          "description": "自动批准只读工具；写入和执行工具需要确认"
        },
        "write": {
          "label": "写入",
          "description": "自动批准只读和写入工具；bash、eval、browser 和 task 等执行工具需要确认"
        },
        "yolo": {
          "label": "Yolo",
          "description": "自动批准读取、写入和执行工具。用户策略仍可要求确认或阻止调用"
        }
      }
    },
    "todo.enabled": {
      "sourceHash": "6b2de007e67a7c632d6aa2367881883edc4da6bcc871cc13a5ea80c694229d95",
      "label": "待办事项",
      "description": "启用 todo 工具以跟踪任务"
    },
    "todo.reminders": {
      "sourceHash": "aac12c05d75a9ebf539305270a199d017913bb60281121259085393c89bb381d",
      "label": "待办提醒",
      "description": "在停止前提醒智能体完成待办事项"
    },
    "todo.remindersMax": {
      "sourceHash": "2e3a4df81be20d09a0fd735caa96312f5591b92526f1d67173e3a028ab00163f",
      "label": "待办提醒上限",
      "description": "放弃提醒前最多发送的待办提醒次数",
      "options": {
        "1": {
          "label": "1 次提醒"
        },
        "2": {
          "label": "2 次提醒"
        },
        "3": {
          "label": "3 次提醒"
        },
        "5": {
          "label": "5 次提醒"
        }
      }
    },
    "todo.eager": {
      "sourceHash": "03c4398b9a52c9807f23260246c2ec95a99c62c6bdd9a609ad611473b78e6ca6",
      "label": "自动创建待办事项",
      "description": "收到首条消息后，推动自动创建待办列表的程度",
      "options": {
        "default": {
          "label": "默认",
          "description": "由模型决定；不自动创建待办列表"
        },
        "preferred": {
          "label": "优先",
          "description": "收到首条消息时建议创建待办列表（仅提醒，不强制）"
        },
        "always": {
          "label": "始终",
          "description": "收到首条消息时强制创建完整的待办列表"
        }
      }
    },
    "glob.enabled": {
      "sourceHash": "b1f79976af435c4f475f215a9c8ff02fc092f6e6d823010d1e54ff311ff1ce34",
      "label": "Glob",
      "description": "启用 glob 工具，通过 glob 模式查找文件"
    },
    "grep.enabled": {
      "sourceHash": "7e8e77d0d79636e3a48657e6b8e527abbd94e29c4194edfda9d1dc9fc351f27b",
      "label": "Grep",
      "description": "启用 grep 工具，通过正则表达式搜索内容"
    },
    "grep.contextBefore": {
      "sourceHash": "d3c5de136bf22126039739b7c98820b7c85e6c9c5e64af3cfcdf7b8e6bb413be",
      "label": "Grep 匹配前上下文",
      "description": "每个 grep 匹配项之前的上下文行数",
      "options": {
        "0": {
          "label": "0 行"
        },
        "1": {
          "label": "1 行"
        },
        "2": {
          "label": "2 行"
        },
        "3": {
          "label": "3 行"
        },
        "5": {
          "label": "5 行"
        }
      }
    },
    "grep.contextAfter": {
      "sourceHash": "936dc53816a1a6714316dbac6f6f0bd5e5e1000849370e34061336795fabcbba",
      "label": "Grep 匹配后上下文",
      "description": "每个 grep 匹配项之后的上下文行数",
      "options": {
        "0": {
          "label": "0 行"
        },
        "1": {
          "label": "1 行"
        },
        "2": {
          "label": "2 行"
        },
        "3": {
          "label": "3 行"
        },
        "5": {
          "label": "5 行"
        },
        "10": {
          "label": "10 行"
        }
      }
    },
    "astGrep.enabled": {
      "sourceHash": "5f1759cb09069fcbfc34d3bdfaf0125fd80be671d5f8ed8910459b48cca2d493",
      "label": "AST Grep",
      "description": "启用 ast_grep 工具以进行结构化 AST 搜索"
    },
    "astEdit.enabled": {
      "sourceHash": "706e8da0ac8f0865aacce76790f6841d5504ce4306c6c16b345db5d15cc02f56",
      "label": "AST Edit",
      "description": "启用 ast_edit 工具以进行结构化 AST 重写"
    },
    "debug.enabled": {
      "sourceHash": "338b4f6d3cae7194678dc3d89f2399c5bed5132a6230a8725d4a35f180e49c7a",
      "label": "Debug",
      "description": "启用 debug 工具以进行基于 DAP 的调试"
    },
    "launch.enabled": {
      "sourceHash": "75cfda658a15a8badb661db7297d11f909074bfe2dcf1aba3793be01fde8c9b3",
      "label": "服务",
      "description": "为共享的长期运行项目进程启用具名 bash 服务和 `proc://` 监管"
    },
    "speechgen.enabled": {
      "sourceHash": "6a2cb3bbb0ac88e5ad4e09b5edb942c301e6751119f23f74958db1270a145c6b",
      "label": "语音生成",
      "description": "启用 TTS 工具，以通过设备端的 Kokoro 或 xAI Grok Voice 合成语音文件"
    },
    "generate_image.enabled": {
      "sourceHash": "e444f73d66163d1246d092eca529d40bc88eefc2a58f1b112c5b895060bef994",
      "label": "生成图像",
      "description": "启用 generate_image 工具（文本生成图像和编辑）；tools.xdev 开启时，此工具会作为 xd:// 设备提供"
    },
    "computer.enabled": {
      "sourceHash": "1700affcd921c7cf3f0ebb93ec01369b1ecebc8a2932ac54d4db784ae5af025e",
      "label": "计算机",
      "description": "启用可脚本化的宿主桌面 `eval` 预置接口（截图、输入、辅助功能）"
    },
    "computer.display": {
      "sourceHash": "14af977285f7a02466d758697e30a16b5a46a926260fb40d3c033689371f2fc2",
      "label": "计算机显示器",
      "description": "合成所有显示器，或选择原生显示器 ID"
    },
    "computer.maxWidth": {
      "sourceHash": "8383e8e3add55068a4da3a01af53a7b798068674d0deb77595f42de58fd88613",
      "label": "计算机截图宽度",
      "description": "合成截图的最大宽度（像素）"
    },
    "computer.maxHeight": {
      "sourceHash": "8e7a2ef0f3e68b6ac14a285b89c594229783a34b3d068dda590539a16c62ac01",
      "label": "计算机截图高度",
      "description": "合成截图的最大高度（像素）"
    },
    "checkpoint.enabled": {
      "sourceHash": "c1ac2ea7e3b16f73d3847d4ca6e298385ce96356f8554060bb11e766649c187c",
      "label": "Checkpoint/Rewind",
      "description": "启用 checkpoint 和 rewind 工具以创建上下文检查点"
    },
    "fetch.enabled": {
      "sourceHash": "a3812338aa54069707c46ae02b581ab34003887fe47b68120bc2a77291bc1ff5",
      "label": "读取 URL",
      "description": "允许 read 工具获取并处理 URL"
    },
    "vault.enabled": {
      "sourceHash": "08664fd0c7edb12ff5687e67569ad5331c214cedbc2247ce5f0ae203e7c46069",
      "label": "Obsidian Vault",
      "description": "启用 vault:// 内部 URL，以通过 Obsidian CLI 读取和编辑 Obsidian Vault 内容。禁用时，将拒绝解析 vault://，且系统提示词中不会包含 vault:// 条目"
    },
    "github.enabled": {
      "sourceHash": "9ca876b4fd6f9c7dbd61a1e40bbb90374141c3ccaf97792df786db09858ccd82",
      "label": "GitHub CLI",
      "description": "启用 github 工具（按操作分派 repository、issue、pull request、diff、search、checkout、push 和 Actions watch 工作流）"
    },
    "github.cache.enabled": {
      "sourceHash": "ab160d10168af22979ebdaa5bd68d85383e821d5d1314845111850bc5fd165ce",
      "label": "GitHub 视图缓存",
      "description": "将渲染后的 issue/PR 视图输出缓存到 ~/.omp/cache/github-cache.db，使重复读取无需额外开销"
    },
    "github.cache.softTtlSec": {
      "sourceHash": "70c3caa1ba0d5ee08a7cb269945e79de0c6e3d4679c586eb3f542a70e56035dc",
      "label": "GitHub 缓存软 TTL",
      "description": "在此时间窗口内，直接返回已缓存的 issue/PR 视图记录（秒；默认 5 分钟）"
    },
    "github.cache.hardTtlSec": {
      "sourceHash": "45a05ceef6154243258e4078575f8bb91849a7ea8e67114b8cdcd9b47a67880b",
      "label": "GitHub 缓存硬 TTL",
      "description": "超过软 TTL 后，将返回缓存记录并在后台刷新；超过硬 TTL 后则丢弃（秒；默认 7 天）"
    },
    "web_search.enabled": {
      "sourceHash": "ba066c16efd466461013095c851604a18d2ec84143dc7065952afb39f64c819c",
      "label": "网页搜索",
      "description": "启用 web_search 工具以获取实时网页结果"
    },
    "security.enabled": {
      "sourceHash": "6553d71ea29a9008e60ac53124f547167a972e0f60ebddfa5a2e3d6f1d95c7d2",
      "label": "安全性",
      "description": "启用 OMP 原生安全扫描的规划与执行，以及只读 security:// 资源命名空间"
    },
    "ask.enabled": {
      "sourceHash": "bb8b32ffcbbf6766a59673264e610c7f99e7a23c3369fd7be16ffa0e737235cf",
      "label": "Ask",
      "description": "启用 ask 工具以交互方式向用户提问"
    },
    "browser.enabled": {
      "sourceHash": "9a40a3d49291aca625cad9b74b5cefdf7a8226e527286f22819835830e252129",
      "label": "浏览器",
      "description": "启用浏览器 `eval` 预置接口，以脚本方式自动化 Chromium（Puppeteer）"
    },
    "browser.cdpUrl": {
      "sourceHash": "941af626f521a3da139ff1a08a75fe114ac545c1435070096810f16a01a404ce",
      "label": "浏览器 CDP URL",
      "description": "默认的 HTTP CDP 发现端点（例如 http://127.0.0.1:9222），用于连接现有浏览器，而非启动浏览器。工具调用中显式指定的 app.cdp_url 或 app.path 优先"
    },
    "browser.relay": {
      "sourceHash": "e511bad991ea61d39fbf1eaf2bad8df691c4083d87cc335fe951c481b5765988",
      "label": "Browser Relay",
      "description": "通过 omp Browser Relay 操作自己的 Chrome 页签。只需安装一次扩展（`omp browser-relay install`）；浏览器预置接口需要中继服务时会自动启动。优先于浏览器 CDP URL；设置 `PI_BROWSER_RELAY=0` 或 `PI_BROWSER_RELAY=1` 可覆盖此设置"
    },
    "browser.relayUrl": {
      "sourceHash": "6b961b3c49b9ab178a7ee5aa2b8811ea5ee3726af557a0eb72020d573f234c27",
      "label": "浏览器 Relay URL",
      "description": "omp browser relay 端点（默认 http://127.0.0.1:9224）"
    },
    "browser.headless": {
      "sourceHash": "70e1b1b75f1c02e3665fd018bedf6bf384da574c644913544bdef72cdd804577",
      "label": "无头浏览器",
      "description": "以无头模式启动浏览器（禁用则显示浏览器界面）"
    },
    "browser.cmux": {
      "sourceHash": "ff40bf2a738e51226c5bae4dd1744c0ae00938d77e000bb3a1c2862201901539",
      "label": "cmux 浏览器",
      "description": "当 cmux 套接字可用时，使用 cmux WKWebView surface 执行浏览器自动化。可设置 PI_BROWSER_CMUX=0 或 PI_BROWSER_CMUX=1 覆盖此设置"
    },
    "browser.screenshotDir": {
      "sourceHash": "849ec1d7056fb8bde68fdf6588baabc3023b45be9f188d41fff18bf115d24bd8",
      "label": "截图目录",
      "description": "保存截图的目录。未设置时，截图会保存到临时文件。支持 ~。示例：~/Downloads、~/Desktop、/sdcard/Download（Android）"
    },
    "tools.intentTracing": {
      "sourceHash": "c3bc5fc30301eb49b3cc478dbb62b7782646274d8b03d80334b189e35aa34d82",
      "label": "意图追踪",
      "description": "要求 agent 在执行每个工具调用前说明其意图"
    },
    "tools.abortOnFabricatedResult": {
      "sourceHash": "1147a3e5a734d140cf86a651cb2306223b3d07d70c3c120e0a98fa6a4a37ffc1",
      "label": "遇到伪造工具结果时中止",
      "description": "使用带内工具调用时，如果模型在单轮生成中开始臆造工具结果，立即停止模型。禁用后，允许模型完成生成，然后丢弃伪造的后续内容"
    },
    "tools.maxTimeout": {
      "sourceHash": "4ae951013b8cae2104bd06404f0815d540f264609dd1a8df0e1f63e4e66fb787",
      "label": "工具最长超时时间",
      "description": "agent 可为任何工具设置的最长超时时间，单位为秒（0 = 不限制）",
      "options": {
        "0": {
          "label": "不限制"
        },
        "30": {
          "label": "30 秒"
        },
        "60": {
          "label": "60 秒"
        },
        "120": {
          "label": "120 秒"
        },
        "300": {
          "label": "5 分钟"
        },
        "600": {
          "label": "10 分钟"
        }
      }
    },
    "async.enabled": {
      "sourceHash": "0e13bc50485d1cd091849fbf92c0693937819ac5de4217dd8b87174a0d27debe",
      "label": "异步执行",
      "description": "启用异步 Bash 命令和后台任务执行"
    },
    "tools.xdev": {
      "sourceHash": "967e3918eb22bfdbe19aa8626b6592ee3414bd6d3bc7443f0e8e40d7d774340a",
      "label": "`xd://` 工具",
      "description": "将很少使用、可通过发现机制查找的工具挂载到 `xd://` 设备 URL，通过 `read`/`write` 操作，而不是在每次请求中发送其 schema。若会话的显式工具列表授予 `read` 但不包含 `write`，则通过仅供设备使用的 `write` 通道挂载设备（文件系统写入仍被拒绝）。关闭后，将所有已启用工具直接暴露在顶层"
    },
    "tools.xdevDocs": {
      "sourceHash": "fc6e5da19feb97bd9399025f7981b9f82f188ba78c7584ca7067dce60849414f",
      "label": "xd:// 提示词文档",
      "description": "选择要内联到系统提示词中的已挂载设备文档和 schema。Built-ins Only 会保持核心工具内联，而 MCP 和扩展工具则按需获取",
      "options": {
        "inline": {
          "label": "所有设备",
          "description": "内联每个已挂载设备的文档和 schema"
        },
        "builtins": {
          "label": "仅内置设备",
          "description": "内联内置文档；按需获取 MCP 和扩展文档"
        },
        "catalog": {
          "label": "仅目录",
          "description": "列出所有设备；按需获取全部文档"
        }
      }
    },
    "tools.xdevInlineDevices": {
      "sourceHash": "0279fc44afe81a76385f0de3555d15690d7477cf369022522bab6be5bd0cb847",
      "label": "xd:// 内联设备",
      "description": "当 xd:// 提示词文档设为 Built-ins Only 时，内联名称匹配这些 glob 模式的动态设备（例如 mcp__context_mode_*）。Catalog Only 会忽略此设置"
    },
    "mcp.enableProjectConfig": {
      "sourceHash": "29afcf86b9eacf7a9970e2d5dffaa82de8e08bbf810fa65e3cf04db6e300acfe",
      "label": "MCP 项目配置",
      "description": "从项目根目录加载 .mcp.json/mcp.json"
    },
    "mcp.renderMarkdownResults": {
      "sourceHash": "06ef74df28c67b5477d4523d291defcc7be0708c818b11ad4ba2db9eb2577f2b",
      "label": "MCP Markdown 结果",
      "description": "在对话记录中将非 JSON 的 MCP 文本结果渲染为 Markdown"
    },
    "mcp.notifications": {
      "sourceHash": "93c3f2ce6818235aa68adbd4565f0b100e3f326bdc6cdf33d26eeb9985723b6e",
      "label": "MCP 更新注入",
      "description": "将 MCP 资源更新注入 agent 对话"
    },
    "mcp.notificationDebounceMs": {
      "sourceHash": "e29995ca2c17ba56e659b548eab599cc2b8fc22663caf692fd87dd7543ba4b53",
      "label": "MCP 通知防抖",
      "description": "MCP 资源更新注入对话前的防抖窗口，单位为毫秒"
    },
    "plan.enabled": {
      "sourceHash": "3ccd9f953d421df50fea843172f59f3785b4371ea11cb93c757642da94df63cc",
      "label": "计划模式",
      "description": "启用计划模式，以便在执行前进行只读探索和规划"
    },
    "plan.defaultOnStartup": {
      "sourceHash": "df706732ab4a9d9bd84663495ebdc6ea12a44ca13b84899925dc8453a32f2015",
      "label": "启动时进入计划模式",
      "description": "每个新会话开始时自动进入计划模式"
    },
    "goal.enabled": {
      "sourceHash": "cd2485a44d3d132e0bdd9b973d5e3b6c13e03906f325a639c5dccad4e77cd9cb",
      "label": "目标模式",
      "description": "启用每会话目标模式和隐藏的 goal 工具"
    },
    "goal.statusInFooter": {
      "sourceHash": "f79ee9825f6b0853c63d3384feeca79e75a60c80fa6a138ba114d037f3aaa68d",
      "label": "在状态栏显示目标状态",
      "description": "在状态栏的目标指示器旁显示 token 预算"
    },
    "goal.continuationModes": {
      "sourceHash": "986e2f556e94fb7817a9e4d5c5af5197527abcb8babc3634323825a367df1c13",
      "label": "目标续接模式",
      "description": "允许活跃目标在轮次之间自动继续的运行模式"
    },
    "title.refreshOnReplan": {
      "sourceHash": "c4d0ddfc9508070a1c0e61aa121c283a51f4b54655631b3b778b67bb19d2181f",
      "label": "重新规划时刷新标题",
      "description": "在 todo init 重新规划后刷新生成的会话标题，除非标题由用户设置"
    },
    "task.isolation.apply": {
      "sourceHash": "29b0ef82b835bcb7152164aa0d30db8cb8a91bf456bf4c507491fb94d1e5a9a3",
      "label": "应用隔离更改",
      "description": "自动将成功完成的隔离任务更改应用到父检出目录；禁用后保留补丁或分支产物"
    },
    "task.isolation.merge": {
      "sourceHash": "5d6d1060c2a5cbc608e60748c3ea42ac6ed41943a711eb1e55db43792613ce33",
      "label": "隔离合并策略",
      "description": "隔离任务更改的整合方式（应用补丁或合并分支）",
      "options": {
        "patch": {
          "label": "补丁",
          "description": "合并差异并执行 git apply"
        },
        "branch": {
          "label": "分支",
          "description": "为每个任务提交，并使用 --no-ff 合并"
        }
      }
    },
    "task.isolation.commits": {
      "sourceHash": "cb32c805ae83830fb3a1e7161435ca2a405b14ed1bdf51ff8e0e7b848cbcc551",
      "label": "隔离提交样式",
      "description": "嵌套仓库更改的提交消息样式（通用或由 AI 生成）",
      "options": {
        "generic": {
          "label": "通用",
          "description": "固定提交消息"
        },
        "ai": {
          "label": "AI",
          "description": "由 AI 根据 diff 生成提交消息"
        }
      }
    },
    "worktree.base": {
      "sourceHash": "67235636a9eb78f6579823fd7379d25d76f743951cee9ce7c8df3c5dfa06ebf3",
      "label": "Worktree 基础目录",
      "description": "代理管理的 worktree 的基础目录——任务隔离副本、`github` PR 检出和 `omp worktree` 清理均位于此处。未设置时使用 ~/.omp/wt。必须是绝对路径或以 ~ 开头的相对路径；其他相对路径会被忽略。环境变量 OMP_WORKTREE_DIR 的优先级更高"
    },
    "task.eager": {
      "sourceHash": "bb8fdeff73b831ee5a5ed25b4aa5696b2565a6c6c7a27ac6c5a196e1c2b367c7",
      "label": "优先委派任务",
      "description": "推动将工作委派给子代理的强度",
      "options": {
        "default": {
          "label": "默认",
          "description": "使用所选模型的策略；部分模型要求明确提出委派请求"
        },
        "preferred": {
          "label": "优先",
          "description": "在系统提示词中加入委派指引"
        },
        "always": {
          "label": "始终",
          "description": "提供提示词指引，并在首个轮次提醒委派"
        }
      }
    },
    "task.batch": {
      "sourceHash": "17bcb5f41d9b1a207ef70fb90e66837f42e4d09f881b8b4aaec9d1fc9a82c791",
      "label": "批量任务调用",
      "description": "将 task 工具切换为批处理结构：一次调用携带 { context, tasks[] }——每个条目对应一个子代理，可为每个条目指定可选的 agent（默认为会话的 spawn-policy agent）和隔离设置，并且必须提供共享上下文以添加到每项任务之前。启用 async.enabled=true 时，每次 spawn 都会作为独立的后台代理运行，并采用正常的空闲/停放生命周期；否则调用会阻塞，直至获得合并结果。禁用后恢复扁平的单次 spawn schema"
    },
    "task.enableEffort": {
      "sourceHash": "d6d2b80e6c10272591a12b32e3300b7c3973c280ab811c1c8978d3977ba5681c",
      "label": "每任务 Effort",
      "description": "在任务 spawn 中提供可选的 effort 参数，让调用方可以覆盖每个子代理的思考级别"
    },
    "task.maxConcurrency": {
      "sourceHash": "ce17d1cc5a19a4ca6fc5aa40ba6e5a029f71a3b6134872f9bec8944af8ba2085",
      "label": "最大并发任务数",
      "description": "可同时运行的子代理数量上限",
      "options": {
        "0": {
          "label": "无限制"
        },
        "1": {
          "label": "1 个任务"
        },
        "2": {
          "label": "2 个任务"
        },
        "4": {
          "label": "4 个任务"
        },
        "8": {
          "label": "8 个任务"
        },
        "16": {
          "label": "16 个任务"
        },
        "32": {
          "label": "32 个任务"
        },
        "64": {
          "label": "64 个任务"
        }
      }
    },
    "task.enableLsp": {
      "sourceHash": "8266d8ac4042f7ed00343ee380bfbfaaf546d874f1d485ee8177ecba2777d702",
      "label": "在子代理中使用 LSP",
      "description": "允许通过 task 工具生成的子代理使用 lsp 工具。默认为关闭以降低子代理的 token 开销；当支持 LSP 的委派值得消耗额外 token 时可启用"
    },
    "task.maxRecursionDepth": {
      "sourceHash": "d0d14939c269a02a443d715b757fe1d63925815b7d48add13466ee3b81a63f15",
      "label": "最大任务递归深度",
      "description": "子代理可继续生成其自身子代理的层数",
      "options": {
        "0": {
          "label": "无"
        },
        "1": {
          "label": "一层"
        },
        "2": {
          "label": "两层"
        },
        "3": {
          "label": "三层"
        },
        "-1": {
          "label": "无限制"
        }
      }
    },
    "task.maxRuntimeMs": {
      "sourceHash": "73bc196419f85ccb253cb09ead1c711119a80996505eb6cad39cef51d7a9baa8",
      "label": "子代理最长运行时间",
      "description": "每个子代理的硬性实际运行时间上限（ms）。设为 0 将禁用此限制。用于纵深防御提供商端流挂起问题，以应对其绕过推理层 watchdog 的情况；触发时会正常中止子代理，原因为“timed out”",
      "options": {
        "0": {
          "label": "无限制",
          "description": "默认"
        },
        "300000": {
          "label": "5 分钟"
        },
        "900000": {
          "label": "15 分钟"
        },
        "1800000": {
          "label": "30 分钟"
        },
        "3600000": {
          "label": "1 小时"
        }
      }
    },
    "task.agentIdleTtlMs": {
      "sourceHash": "7efe60eca2665ba425a6142bd1e079e58bc8ec54a757aef5fd375820de5adae5",
      "label": "代理空闲 TTL",
      "description": "空闲子代理在停放到磁盘前保持驻留内存的时长（ms）。向已停放的代理发送消息或恢复代理时，会自动唤醒代理。设为 0 时，空闲代理会保持驻留内存直至退出"
    },
    "task.softRequestBudget": {
      "sourceHash": "5d5687ce00353539149e55ba47f459454a0dc94f262b3e9d93161fe7893ead74",
      "label": "子代理软请求预算",
      "description": "每个子代理的软请求预算（每次运行中的 assistant 请求数）。超出预算时会注入收尾引导通知（见 task.softRequestBudgetNotice）；达到预算的 1.5 倍时会强制停止运行，代理必须交出其部分发现。设为 0 将禁用此防护。内置的 scout/sonic 代理有更低的内置预算上限，因此低于该上限的值仍会应用于这些代理",
      "options": {
        "0": {
          "label": "已禁用"
        },
        "90": {
          "label": "90 个请求"
        },
        "150": {
          "label": "150 个请求"
        },
        "200": {
          "label": "200 个请求",
          "description": "默认"
        }
      }
    },
    "task.softRequestBudgetNotice": {
      "sourceHash": "3adaf04182af3621d6c460cf0798d657ebef652c1d2e3d77adecc5038f0f9c77",
      "label": "软请求预算通知",
      "description": "子代理超出软请求预算时注入一次引导通知，要求其在达到 1.5 倍预算并被强制停止、交出结果前完成收尾"
    },
    "task.maxEffort": {
      "sourceHash": "60bcb5e4c2ba6ad9559407914d34a072ed21bf640595a261e53eb2cb55c0571d",
      "label": "每次 Spawn 的最大 Effort",
      "description": "task 工具每次 spawn 的 effort 提示所允许的最大推理强度。较低的值可防止调用方将子代理提升到此上限以上；默认值会保留模型支持的完整范围",
      "options": {
        "minimal": {
          "label": "最小",
          "description": "极简推理（约 1k token）"
        },
        "low": {
          "label": "低",
          "description": "轻量推理（约 2k token）"
        },
        "medium": {
          "label": "中",
          "description": "中等推理（约 8k token）"
        },
        "high": {
          "label": "高",
          "description": "深度推理（约 16k token）"
        },
        "xhigh": {
          "label": "极高",
          "description": "扩展推理（约 32k token）"
        },
        "max": {
          "label": "最大",
          "description": "模型支持的最大推理深度"
        }
      }
    },
    "task.prewalk": {
      "sourceHash": "b43f65ff12cb93bed1674fc6b717e7a8cdac07d78ad989630c2fb2483514661d",
      "label": "通用任务 Prewalk",
      "description": "为内置的通用 `task` 子代理启用 Prewalk：它先使用解析后确定的模型进行规划并开始实现，然后在首次编辑/写入时移交给“smol”角色。无论此开关如何，每代理覆盖项（task.agentPrewalk，可在 /agents 中配置）和用户代理的 `prewalk` frontmatter 都会生效"
    },
    "tasks.todoClearDelay": {
      "sourceHash": "5e27d42c31774338c633192c82cbe1f3bbc3b13040ed984fdb03a4c179511be6",
      "label": "Todo 自动清除延迟",
      "description": "已完成或已放弃的 todo 从 todo 小组件中移除前的延迟",
      "options": {
        "0": {
          "label": "立即"
        },
        "60": {
          "label": "1 分钟",
          "description": "默认"
        },
        "300": {
          "label": "5 分钟"
        },
        "900": {
          "label": "15 分钟"
        },
        "1800": {
          "label": "30 分钟"
        },
        "3600": {
          "label": "1 小时"
        },
        "-1": {
          "label": "永不"
        }
      }
    },
    "task.showResolvedModelBadge": {
      "sourceHash": "6eb1ab3a971b693f3457fe6dccf17ce504a02bca1b50595e4e2c726ed4f29b37",
      "label": "显示实际模型标识",
      "description": "在任务组件的状态栏中显示每个子代理实际使用的模型 ID"
    },
    "skills.enableSkillCommands": {
      "sourceHash": "91e7a8c3ed5d25d9d3abd3ffe30abe60ea1143ac74be084920c31ca5e36ef5fb",
      "label": "Skill 命令",
      "description": "将 skill 注册为 /skill:name 命令"
    },
    "commands.enableClaudeUser": {
      "sourceHash": "42ad62f2672993a04a1d315376a40c8dfb586ab14d1f1a3b4c379860c1b41da8",
      "label": "Claude 用户命令",
      "description": "从 ~/.claude/commands/ 加载命令"
    },
    "commands.enableClaudeProject": {
      "sourceHash": "2028517c23cd4af83388b1d356dc518c338d6eb9c9ed0408ebfada79222dd6ee",
      "label": "Claude 项目命令",
      "description": "从 .claude/commands/ 加载命令"
    },
    "commands.enableOpencodeUser": {
      "sourceHash": "1c67a4c03dbfc5cb2a5a39c384d7310a94d94b9a6724b57f0a338f69f1bc4c7a",
      "label": "OpenCode 用户命令",
      "description": "从 ~/.config/opencode/commands/ 加载命令"
    },
    "commands.enableOpencodeProject": {
      "sourceHash": "8d969f229c2f64d8cbde0728ac4ce02493e8c772c97b0352ad2e774cfd89e8bd",
      "label": "OpenCode 项目命令",
      "description": "从 .opencode/commands/ 加载命令"
    },
    "secrets.enabled": {
      "sourceHash": "c71bb5c88f9fc9754378596da29b77271914baf5379bea903ea00800716bf5e0",
      "label": "隐藏密钥",
      "description": "对已配置的密钥进行混淆，并在发送给 AI 提供商之前，对形似凭据的 token 进行脱敏"
    },
    "providers.ollama-cloud.maxConcurrency": {
      "sourceHash": "fe431d922c64280cce75789cf40cb47b4592cc7839abf3088ba7c4203e1d63f3",
      "label": "Ollama Cloud 最大并发数",
      "description": "每个进程允许同时运行的 Ollama Cloud 子代理数量上限；设为 0 可禁用此提供商专属限制"
    },
    "providers.webSearchTimeoutSeconds": {
      "sourceHash": "71c8ac2e307eceb1741a498527d96c6313bed518f7cb610f0c2f3c38462dab6e",
      "label": "网页搜索超时",
      "description": "每个提供商的搜索传输硬超时时间，超时后 web_search 将转至下一个回退，单位为秒（最大 300）",
      "options": {
        "30": {
          "label": "30 秒"
        },
        "60": {
          "label": "1 分钟"
        },
        "120": {
          "label": "2 分钟"
        },
        "180": {
          "label": "3 分钟"
        },
        "300": {
          "label": "5 分钟"
        }
      }
    },
    "providers.antigravityEndpoint": {
      "sourceHash": "1e318646b30303f15f8c7f45adfa8f5b50d2e143440a4b6889bd81832ef3a8b6",
      "label": "Antigravity 端点模式",
      "description": "google-antigravity 提供商（聊天、搜索、图像、发现）的端点路由策略",
      "options": {
        "auto": {
          "label": "自动",
          "description": "先尝试生产端点，遇到 5xx/429 时故障转移到 sandbox"
        },
        "production": {
          "label": "仅 Production",
          "description": "强制仅使用生产端点"
        },
        "sandbox": {
          "label": "仅 Sandbox",
          "description": "强制仅使用 sandbox 端点"
        }
      }
    },
    "providers.fireworksTier": {
      "sourceHash": "05064ba6ba68d1f55088dfc2b96325bad814135d9809d958f53f0b400bf2af7c",
      "label": "Fireworks 层级",
      "description": "Fireworks 请求的服务路径；Priority 会发送 `service_tier: \"priority\"`，在流量高峰期以更高价格换取更高可靠性；Standard 不发送该字段；Fast（`-fast`）模型会忽略此设置，因为 Fast 使用独立的服务路径",
      "options": {
        "standard": {
          "label": "Standard",
          "description": "默认服务路径（不设置 service_tier）"
        },
        "priority": {
          "label": "Priority",
          "description": "优先服务路径：可靠性更高，按 token 计费的价格更高"
        }
      }
    },
    "live.voice": {
      "sourceHash": "bfc3c31ed2e023f8695e731604f665e9745edde961e17b2c22071a51b82aeebf",
      "label": "实时语音音色",
      "description": "由 Codex 支持的实时语音会话所使用的音色",
      "options": {
        "arbor": {
          "label": "Arbor"
        },
        "breeze": {
          "label": "Breeze"
        },
        "cove": {
          "label": "Cove"
        },
        "ember": {
          "label": "Ember"
        },
        "juniper": {
          "label": "Juniper"
        },
        "maple": {
          "label": "Maple"
        },
        "sol": {
          "label": "Sol"
        },
        "spruce": {
          "label": "Spruce"
        },
        "vale": {
          "label": "Vale"
        }
      }
    },
    "tts.localVoice": {
      "sourceHash": "f71bd9b3dde8109334bd4516eef7fd3e18b66a8ac1f4a27be82f9fb3189f2690",
      "label": "本地 TTS 音色",
      "description": "本地 TTS 后端使用的 Kokoro 音色（美式/英式、女声/男声）",
      "options": {
        "af_heart": {
          "label": "Heart（美式女声）"
        },
        "af_bella": {
          "label": "Bella（美式女声）"
        },
        "af_nicole": {
          "label": "Nicole（美式女声）"
        },
        "af_aoede": {
          "label": "Aoede（美式女声）"
        },
        "af_kore": {
          "label": "Kore（美式女声）"
        },
        "af_sarah": {
          "label": "Sarah（美式女声）"
        },
        "am_michael": {
          "label": "Michael（美式男声）"
        },
        "am_fenrir": {
          "label": "Fenrir（美式男声）"
        },
        "am_puck": {
          "label": "Puck（美式男声）"
        },
        "bf_emma": {
          "label": "Emma（英式女声）"
        },
        "bm_george": {
          "label": "George（英式男声）"
        },
        "bm_fable": {
          "label": "Fable（英式男声）"
        }
      }
    },
    "speech.enabled": {
      "sourceHash": "4f418a159bcd77ea507ed998fe9ee45c13d59905a5794c40a4e60538e5a582d0",
      "label": "语音朗读",
      "description": "在助手输出流式生成时通过扬声器朗读"
    },
    "speech.mode": {
      "sourceHash": "4a5fc9373a3d7ff5c92e55d31746c31589dc46ac88d23839163eb52f34158bae",
      "label": "语音朗读模式",
      "description": "朗读内容：all = 助手消息 + 思考；assistant = 仅消息；yield = 仅在轮次结束时朗读最终消息",
      "options": {
        "all": {
          "label": "全部（消息 + 思考）"
        },
        "assistant": {
          "label": "助手消息"
        },
        "yield": {
          "label": "仅最终消息"
        }
      }
    },
    "speech.enhanced": {
      "sourceHash": "49d31a20f3389169abbd67919c71c9f9e90cb8c9740018afb7b04b92943e0b41",
      "label": "增强型语音改写",
      "description": "合成前使用 tiny/smol 模型将助手输出改写为自然口语（描述代码，去除链接和 Markdown）；失败时回退到机械清理"
    },
    "speech.voice": {
      "sourceHash": "a0bb367f6fdb86aa58b87b7b07e506d8642c97496eaa81258942688f16d5cbd2",
      "label": "语音朗读音色",
      "description": "朗读助手输出时使用的 Kokoro 音色",
      "options": {
        "af_heart": {
          "label": "Heart（美式女声）"
        },
        "af_bella": {
          "label": "Bella（美式女声）"
        },
        "af_nicole": {
          "label": "Nicole（美式女声）"
        },
        "af_aoede": {
          "label": "Aoede（美式女声）"
        },
        "af_kore": {
          "label": "Kore（美式女声）"
        },
        "af_sarah": {
          "label": "Sarah（美式女声）"
        },
        "am_michael": {
          "label": "Michael（美式男声）"
        },
        "am_fenrir": {
          "label": "Fenrir（美式男声）"
        },
        "am_puck": {
          "label": "Puck（美式男声）"
        },
        "bf_emma": {
          "label": "Emma（英式女声）"
        },
        "bm_george": {
          "label": "George（英式男声）"
        },
        "bm_fable": {
          "label": "Fable（英式男声）"
        }
      }
    },
    "providers.tinyModelDevice": {
      "sourceHash": "edcd3a6a11491078f10d16183da918649be9597b9354a4b8b80731538df2086b",
      "label": "微型模型设备",
      "description": "本地微型模型（标题与记忆）的推理后端：使用 ONNX 执行提供商，或选择 `mlx` 下载 MLX 权重并通过 mlx-lm 在 Apple silicon 上运行。默认仅使用 CPU 进行 ONNX 推理。环境变量 `PI_TINY_DEVICE` 会覆盖此设置",
      "options": {
        "default": {
          "label": "默认",
          "description": "仅使用 CPU 推理"
        },
        "gpu": {
          "label": "GPU",
          "description": "使用加速提供商（WebGPU/Metal、CUDA 或 DirectML）"
        },
        "cpu": {
          "label": "CPU",
          "description": "仅使用 CPU 推理"
        },
        "mlx": {
          "label": "MLX",
          "description": "通过 mlx-lm 使用 Apple silicon GPU（Python 子进程；macOS arm64）"
        },
        "metal": {
          "label": "Metal",
          "description": "MLX 的别名"
        },
        "webgpu": {
          "label": "WebGPU",
          "description": "WebGPU/Metal 后端"
        },
        "cuda": {
          "label": "CUDA",
          "description": "NVIDIA CUDA（Linux x64）"
        },
        "dml": {
          "label": "DirectML",
          "description": "DirectML 后端（Windows）"
        },
        "coreml": {
          "label": "CoreML",
          "description": "Apple CoreML（需主动启用；可能加载失败）"
        },
        "auto": {
          "label": "自动",
          "description": "让 ONNX Runtime 选择提供商"
        },
        "wasm": {
          "label": "WASM",
          "description": "WebAssembly 后端"
        },
        "webnn": {
          "label": "WebNN",
          "description": "WebNN 后端"
        },
        "webnn-gpu": {
          "label": "WebNN GPU",
          "description": "WebNN GPU 设备"
        },
        "webnn-cpu": {
          "label": "WebNN CPU",
          "description": "WebNN CPU 设备"
        },
        "webnn-npu": {
          "label": "WebNN NPU",
          "description": "WebNN NPU 设备"
        }
      }
    },
    "providers.tinyModelDtype": {
      "sourceHash": "b9f502c582012830474d5c7b38be3891178129c048dbc6cb0393e2efdee9166b",
      "label": "微型模型精度",
      "description": "本地微型模型的 ONNX 量化与精度。默认使用各模型自带的数据类型（q4）；较低精度更快，较高精度更忠实于原始模型。MLX 后端忽略此设置（其仓库已预先量化为 4 位）。环境变量 `PI_TINY_DTYPE` 会覆盖此设置",
      "options": {
        "default": {
          "label": "默认",
          "description": "各模型自带的数据类型（目前为 q4）"
        },
        "q4": {
          "label": "q4",
          "description": "4 位权重；体积最小、速度最快"
        },
        "q4f16": {
          "label": "q4f16",
          "description": "4 位权重与 fp16 激活值"
        },
        "q8": {
          "label": "q8",
          "description": "8 位量化"
        },
        "fp16": {
          "label": "fp16",
          "description": "16 位浮点数；保真度更高、体积更大"
        },
        "fp32": {
          "label": "fp32",
          "description": "全精度；体积最大、速度最慢"
        },
        "int8": {
          "label": "int8",
          "description": "有符号 8 位整数"
        },
        "uint8": {
          "label": "uint8",
          "description": "无符号 8 位整数"
        },
        "bnb4": {
          "label": "bnb4",
          "description": "bitsandbytes 4 位量化"
        },
        "q2": {
          "label": "q2",
          "description": "2 位权重"
        },
        "q2f16": {
          "label": "q2f16",
          "description": "2 位权重与 fp16 激活值"
        },
        "q1": {
          "label": "q1",
          "description": "1 位权重"
        },
        "q1f16": {
          "label": "q1f16",
          "description": "1 位权重与 fp16 激活值"
        },
        "auto": {
          "label": "自动",
          "description": "让 transformers.js 根据设备选择"
        }
      }
    },
    "providers.autoThinkingMaxEffort": {
      "sourceHash": "c3f703997d75f3b1166ffee7391d409abf61e6ebc64b117192393d8325848775",
      "label": "自动思考上限",
      "description": "`auto` 分类器可判定的最高思考强度。`xhigh` 使分类器止于最高档的下一档，因此只有显式使用 `ultrathink` 才会达到 `max`；`max` 允许分类器判定为极特殊的轮次在支持该档位的模型上按最高档计费",
      "options": {
        "xhigh": {
          "label": "xhigh",
          "description": "分类器止于 xhigh（默认）"
        },
        "max": {
          "label": "max",
          "description": "模型支持时，分类器可判定为 max"
        }
      }
    },
    "features.unexpectedStopDetection": {
      "sourceHash": "331f256121ca5d7693bf7c161549415ba8c1a2c3c3e312a5832f9236834a5805",
      "label": "意外停止",
      "description": "当助手在没有可见消息的情况下停止时自动恢复。Smart 还会使用小模型对仅文本停止进行分类",
      "options": {
        "none": {
          "label": "无",
          "description": "已禁用"
        },
        "mechanical": {
          "label": "Mechanical",
          "description": "重试未显示任何助手消息的停止；工具调用除外（默认）"
        },
        "smart": {
          "label": "Smart",
          "description": "Mechanical + 使用小模型对仅文本停止进行分类"
        }
      }
    },
    "providers.kimiApiFormat": {
      "sourceHash": "568f40510429d29583084830145e7db533acb10fd6e608413155bcb0d5f804ca",
      "label": "Kimi API 格式",
      "description": "Kimi Code 提供商的 API 格式（自动跟随实时模型元数据）",
      "options": {
        "auto": {
          "label": "自动",
          "description": "使用模型服务器声明的协议"
        },
        "openai": {
          "label": "OpenAI",
          "description": "api.kimi.com"
        },
        "anthropic": {
          "label": "Anthropic",
          "description": "api.moonshot.ai"
        }
      }
    },
    "providers.openaiWebsockets": {
      "sourceHash": "e02fcda6209fff1f11571fa354f6fe499e276aad74e20c937fa4386ca7ac53dc",
      "label": "OpenAI WebSockets",
      "description": "OpenAI Codex 模型的 WebSocket 策略（自动使用模型默认设置，开启时强制使用，关闭时禁用）",
      "options": {
        "auto": {
          "label": "自动",
          "description": "使用模型或提供商的默认 WebSocket 行为"
        },
        "off": {
          "label": "关闭",
          "description": "为 OpenAI Codex 模型禁用 WebSockets"
        },
        "on": {
          "label": "开启",
          "description": "为 OpenAI Codex 模型强制使用 WebSockets"
        }
      }
    },
    "providers.cacheRetention": {
      "sourceHash": "445590c5156229532581a6ce9a557ab741e165c1bf27a8f61cc2788d4a93af39",
      "label": "提示词缓存保留时间",
      "description": "向支持此功能的提供商（Anthropic、Bedrock、OpenRouter、OpenAI）传递提示词缓存保留时间",
      "options": {
        "auto": {
          "label": "自动",
          "description": "采用提供商默认值：Anthropic OAuth 订阅者会话默认为 1 小时，API 密钥默认为 5 分钟；`PI_CACHE_RETENTION` 仍然生效"
        },
        "short": {
          "label": "短期（5 分钟）",
          "description": "缓存写入费用最低；配合缓存保温，可在空闲时让短期条目保持有效"
        },
        "long": {
          "label": "长期（1 小时）",
          "description": "提供商支持时使用 1 小时 TTL；写入费用更高，仅在运行期间保温"
        },
        "none": {
          "label": "关闭",
          "description": "禁用提示词缓存和缓存亲和路由"
        }
      }
    },
    "providers.streamFirstEventTimeoutSeconds": {
      "sourceHash": "509b227b3ec20edec257f4b764bafca44c08867634e0ae00fec95ad5fe8addce",
      "label": "模型流首事件超时",
      "description": "等待模型流首个事件的秒数；-1 使用提供商或环境变量的默认值，0 禁用超时监控",
      "options": {
        "0": {
          "label": "关闭",
          "description": "禁用首事件超时"
        },
        "300": {
          "label": "5 分钟"
        },
        "600": {
          "label": "10 分钟"
        },
        "1800": {
          "label": "30 分钟"
        },
        "-1": {
          "label": "自动",
          "description": "使用提供商默认值和 PI_* 超时环境变量"
        }
      }
    },
    "providers.streamIdleTimeoutSeconds": {
      "sourceHash": "9e3364b6bef8f95818a8fbda1c5aefa0113139756d88ce925f706b07c8dd2285",
      "label": "模型流空闲超时",
      "description": "模型流在事件之间可保持无输出的秒数；-1 使用提供商或环境变量的默认值，0 禁用超时监控",
      "options": {
        "0": {
          "label": "关闭",
          "description": "禁用空闲超时"
        },
        "300": {
          "label": "5 分钟"
        },
        "600": {
          "label": "10 分钟"
        },
        "1800": {
          "label": "30 分钟"
        },
        "-1": {
          "label": "自动",
          "description": "使用提供商默认值和 PI_* 超时环境变量"
        }
      }
    },
    "providers.openrouterVariant": {
      "sourceHash": "ae66cd328d57b656c6687c81c8fff21e12f1a55122b76242ab4e53a1bd099665",
      "label": "OpenRouter 路由",
      "description": "附加到 OpenRouter 模型 ID 的默认路由变体后缀（选择器已指定变体时，以选择器为准）",
      "options": {
        "default": {
          "label": "默认",
          "description": "不添加后缀；使用 OpenRouter 的默认路由"
        },
        "nitro": {
          "label": ":nitro",
          "description": "优先考虑吞吐量和最低延迟"
        },
        "floor": {
          "label": ":floor",
          "description": "优先选择价格最低的可用提供商"
        },
        "online": {
          "label": ":online",
          "description": "启用 OpenRouter 的网页搜索插件"
        },
        "exacto": {
          "label": ":exacto",
          "description": "精选的高质量提供商（仅为部分模型定义）"
        }
      }
    },
    "providers.fetch": {
      "sourceHash": "b3f53bda97066dd97cc06e42194e06da96f6060bc5b50e0bff173a0b575066a0",
      "label": "网页读取提供商",
      "description": "`fetch`/`read` URL 工具的网页读取后端优先级",
      "options": {
        "auto": {
          "label": "自动",
          "description": "优先级：native > trafilatura > lynx > parallel > firecrawl > jina"
        },
        "native": {
          "label": "原生",
          "description": "进程内 HTML→Markdown 转换器（始终可用）"
        },
        "trafilatura": {
          "label": "Trafilatura",
          "description": "通过 uv/pip 自动安装"
        },
        "lynx": {
          "label": "Lynx",
          "description": "需要 `lynx` 系统软件包"
        },
        "parallel": {
          "label": "Parallel",
          "description": "需要 `PARALLEL_API_KEY`"
        },
        "firecrawl": {
          "label": "Firecrawl",
          "description": "需要 `FIRECRAWL_API_KEY`"
        },
        "jina": {
          "label": "Jina",
          "description": "使用 r.jina.ai 网页读取服务（`JINA_API_KEY` 可选）"
        }
      }
    },
    "codexResets.autoRedeem": {
      "sourceHash": "62c9eff8142dea889259d012830584ae489c637ba5fa623857fc9348f1873638",
      "label": "Codex 自动兑换已保存的重置额度",
      "description": "自动消耗已保存的 Codex 速率限制重置额度：当某轮对话卡住、账号因 5h 或每周窗口耗尽而被阻止，且没有其他账号可以接管时，恢复该账号；同时挽回即将过期的额度。unset 会在首次消耗前询问，yes 不经提示直接消耗，no 禁用这两项检查",
      "options": {
        "unset": {
          "label": "未设置",
          "description": "先检查是否符合条件，再在首次消耗前询问"
        },
        "yes": {
          "label": "是",
          "description": "不经提示直接消耗符合条件的已保存重置额度"
        },
        "no": {
          "label": "否",
          "description": "不执行已保存重置额度的自动兑换检查"
        }
      }
    },
    "codexResets.minBlockedMinutes": {
      "sourceHash": "d5a3f20cee6e2e9839af292ca27c89c7be19e804347e8ff9a373c61a4eb0edf5",
      "label": "Codex 自动兑换最短阻塞时间",
      "description": "仅当自然解除阻塞时间——已耗尽的 5h/每周窗口中最晚的重置时间——距离现在至少还有这么多分钟时，才自动兑换（不要为缩短短暂等待而消耗稀缺额度）。调高此值（如 360）可忽略仅由 5h 窗口造成的阻塞"
    },
    "codexResets.keepCredits": {
      "sourceHash": "aaed54eb514fe019b2d3c438cd4a9bfc025d1fe2a8d6bdcebdbd98730a4b7ffd",
      "label": "Codex 自动兑换保留额度",
      "description": "绝不自动消耗到低于此数量的已保存重置额度（0 = 最后一个额度也可以自动消耗）。即将过期的额度不受此限制——保留一个会过期的额度并无保留作用"
    },
    "codexResets.salvageHorizonHours": {
      "sourceHash": "4e76020d3cc3d2334ddb60dfac45fcc040167a09cca4e4ebb6b7967aeb5dfd26",
      "label": "Codex 重置额度挽回时限",
      "description": "当已保存的 Codex 重置额度将在此小时数内过期，且任一聊天窗口（5h 或每周）有值得恢复的用量时，自动消耗该额度（0 禁用过期额度挽回）"
    },
    "provider.appendOnlyContext": {
      "sourceHash": "c98ee8534acca533b8567ff2722eb49f8305266bf8dbdfdb5bcfcac9ac1da978",
      "label": "仅追加上下文",
      "description": "缓存系统提示词和工具规范，并维护仅追加的消息日志，使提供商前缀缓存（DeepSeek、Xiaomi/SGLang、Anthropic）达到最高命中率；自动为已知的前缀缓存提供商启用",
      "options": {
        "auto": {
          "label": "自动",
          "description": "为已知的前缀缓存提供商启用（推荐）"
        },
        "on": {
          "label": "开启",
          "description": "始终启用仅追加上下文"
        },
        "off": {
          "label": "关闭",
          "description": "禁用仅追加上下文"
        }
      }
    },
    "exa.enabled": {
      "sourceHash": "5a66dfa0a96cf97339fd5cfd18e9eb1407acb26cac80740917120ddc7481d936",
      "label": "Exa",
      "description": "启用 Exa 网页搜索提供商"
    },
    "exa.searchDelayMs": {
      "sourceHash": "03b8b528a370b1d198a16cdcade9669031441eaf69f113f043dbe03704796db8",
      "label": "Exa 搜索延迟",
      "description": "Exa 网页搜索请求之间的最短延迟（毫秒）；设为 0 可禁用限速"
    },
    "searxng.endpoint": {
      "sourceHash": "fde08e7f87eb56f04a268c87b7e20e8fe6e223f9623dda54602f575cd85e556c",
      "label": "SearXNG 端点",
      "description": "用于网页搜索的自托管 SearXNG 实例的基础 URL"
    },
    "extensionHandlers.toolCallTimeoutMs": {
      "sourceHash": "551d60ebd73f65ea6878dd7f2a3f7292931a7f3ea46fea182406d2cfaf6421cb",
      "label": "工具调用处理程序超时（ms）",
      "description": "扩展 tool_call 处理程序在主动工作期间的超时时间，须为有限正数；无效值使用 30000ms，等待 OMP 所有的对话框的时间不计入其中"
    },
    "dev.autoqa": {
      "sourceHash": "2e0cddc4aea537ccce57783673e733efb69a641d2202909d0286b5511c973616",
      "label": "自动 QA",
      "description": "自动报告工具问题（xd://report_issue）。默认开启；首次报告时会征求同意，拒绝后将禁用报告，直至明确重新启用"
    },
    "dev.autoqaPush.endpoint": {
      "sourceHash": "0052808da5e30bce03ee74bfce70aeb4d07528a7ad6c1d8e7cb30f0e1301d2c4",
      "label": "自动 QA 推送端点",
      "description": "接收自动 QA JSON 报告的完整 URL（默认 https://qa.omp.sh/v1/grievances）"
    },
    "composer.tokenRate": {
      "sourceHash": "ab82c5efedfd6a27a06bfbd0a887aa528687853951a212eba3d071fc23188b01",
      "label": "生成速率",
      "description": "在工作状态行中显示实时生成速率（tok/s），紧邻会话标题右侧。根据流式增量估算，并在每条消息完成时按提供商计费的输出 token 数校正"
    },
    "tui.reactions": {
      "sourceHash": "049f992873a3508b160cc0f291f7b5ac0e9879ef704f83cfc486d8aa8f569ec8",
      "label": "智能体回应表情",
      "description": "允许智能体在其消息气泡上用表情徽标回应你的消息"
    },
    "tui.titleSpinner": {
      "sourceHash": "5d6af659ad89599e4bb2d1b8d4b0d44307156238d8772c75e505861bfefeaf69",
      "label": "终端标题旋转指示器",
      "description": "终端标题中工作状态旋转指示器所用的字形集：盲文轮转、月相盈亏、单点循环或兼容 ASCII 的线条",
      "options": {
        "braille": {
          "label": "盲文",
          "description": "经典的 ⠋⠙⠹ 轮转（默认）"
        },
        "pulse": {
          "label": "脉动",
          "description": "月相从 ○◑● 逐渐填满，再逐渐变空"
        },
        "dots": {
          "label": "圆点",
          "description": "单个盲文圆点循环切换"
        },
        "line": {
          "label": "线条",
          "description": "使用 ASCII 字符 `- \\ | /`，适用于不含盲文字形的字体"
        }
      }
    },
    "tui.mouse": {
      "sourceHash": "fdc0edf9b46864674950977c195887b450e0b3bd2256f48efaca086c5cdd80d5",
      "label": "鼠标点击聚焦",
      "description": "在主会话中捕获鼠标点击，使实时子 Agent 卡片和 HUD 行可通过点击聚焦，并在悬停时高亮目标。开启后，原生文本选择改为 {shift}+拖动，滚轮滚动改为 {shift}+滚轮",
      "descriptionSource": "Capture mouse clicks in the main session so live subagent cards and HUD rows focus on click, with a hover highlight on the target. Native text selection becomes {shift}+drag and wheel scroll becomes {shift}+wheel while on"
    },
    "display.pinnedAgents": {
      "sourceHash": "01fb7f1651c02d82ca1765bf78b136248dd7cb94fe686af3beb2451d8bf3c16c",
      "label": "固定智能体列表",
      "description": "在编辑器上方固定显示运行中的智能体跳转列表（`off` 隐藏；`collapsed` 显示少量行及展开控件；`full` 显示全部）",
      "options": {
        "off": {
          "label": "关闭",
          "description": "隐藏固定跳转列表"
        },
        "collapsed": {
          "label": "折叠",
          "description": "显示少量行及展开控件"
        },
        "full": {
          "label": "完整",
          "description": "始终列出所有运行中的智能体"
        }
      }
    },
    "display.showTurnTime": {
      "sourceHash": "2054d1659068a18833574ff26edd6727a0f6996ad12a3f44b34f0e60f6d53756",
      "label": "显示轮次耗时",
      "description": "在助手消息的用量行中显示从提示词提交到交还控制权的总耗时（包括工具调用）"
    },
    "skillful": {
      "sourceHash": "ec1baf2583370639bf534118f525772373881dfc98f9b19a54ea336c632add50",
      "label": "在提示词中列出技能",
      "description": "在系统提示词中列出可用技能；关闭可节省上下文，并可通过 `/skillful` 在每个会话中切换"
    },
    "retry.waitForUsageReset": {
      "sourceHash": "4376f324f6b9672db734407b622bd1b156069b03b2ff3957965e235000457c29",
      "label": "等待用量重置",
      "description": "当提供商报告用量已耗尽并给出重置时间（任意提供商的 5 小时或每周配额窗口）时，等待至重置，而不是因超出 retry.maxDelayMs 立即失败。可按 {escape} 中止等待，但等待也会阻塞子 Agent，因此无人值守运行时请保持关闭",
      "descriptionSource": "When a provider reports usage-limit exhaustion with a reset time (5-hour or weekly quota windows on any provider), sleep until the reset instead of failing fast past retry.maxDelayMs. Waits are abortable ({escape}) but also hold subagents, so leave off for unattended runs."
    },
    "advisor.maxNotesPerUpdate": {
      "sourceHash": "a3988ae01c34e684bf1cde5fa038e3c3cdde022e2dad0184f2c2128f08b9b926",
      "label": "Advisor 每次更新建议上限",
      "description": "每次 Advisor 提示词更新最多接受的非阻塞性建议条数（1–32；界面提供 1–5 的快捷选项），阻塞性问题不受此限制",
      "options": {
        "1": {
          "label": "1 条建议",
          "description": "严格防止建议刷屏"
        },
        "2": {
          "label": "2 条建议"
        },
        "3": {
          "label": "3 条建议"
        },
        "4": {
          "label": "4 条建议",
          "description": "默认"
        },
        "5": {
          "label": "5 条建议"
        }
      }
    },
    "advisor.evictStaleResults": {
      "sourceHash": "195ccd837d8a7ab853c49e5534d9b077ffef0deb23a767e30787d81fd43aaf21",
      "label": "Advisor 清除旧结果",
      "description": "每次审查前，将 Advisor 较早审查中的 `read` / `grep` / `glob` 输出替换为简短占位内容，保留最新一次审查"
    },
    "tui.vimMode": {
      "sourceHash": "413d6571d0bb45b34f715368db19f20e9c37d865aa005652a91ab63ab6158508",
      "label": "Vim 编辑模式",
      "description": "以模式切换方式编辑提示词。{escape} 退出插入模式；普通模式支持 hjkl、0、$、^、w、b、e、gg、G、计数、x/D/C、dd/yy、p 和 u；操作符可配合移动或文本对象（diw、ca(、dap）；v/V 开始可视选择，y 复制，d 删除",
      "descriptionSource": "Modal prompt editing. {escape} leaves Insert mode; Normal mode has hjkl, 0, $, ^, w, b, e, gg, G, counts, x/D/C, dd/yy, p and u; operators take motions or text objects (diw, ca(, dap); v/V start a Visual selection that y copies and d deletes"
    },
    "tui.vimModeDisplay": {
      "sourceHash": "9e287fe697790e65d7be3dfc6989cc52196cbb31654d01c350f70612f0dce4a6",
      "label": "Vim 模式指示器",
      "description": "当前 Vim 模式在状态栏中的显示方式",
      "options": {
        "text": {
          "label": "文本",
          "description": "完整模式名称：NORMAL、INSERT、VISUAL、V-LINE"
        },
        "icon": {
          "label": "图标",
          "description": "每个模式使用一个紧凑字形"
        },
        "none": {
          "label": "隐藏",
          "description": "不在状态栏中显示模式"
        }
      }
    },
    "loop.conditionTimeoutMs": {
      "sourceHash": "0f388024842816ed0a08e04b3e9d723c3494745bb165cc2fe730ce50045daf7f",
      "label": "循环条件超时 (ms)",
      "description": "等待 `/loop --while` / `--until` 条件命令的最长时间，超时后将其视为故障并停止循环。设为 0 可无限等待",
      "options": {
        "0": {
          "label": "不限"
        },
        "10000": {
          "label": "10 秒"
        },
        "30000": {
          "label": "30 秒"
        },
        "120000": {
          "label": "2 分钟"
        }
      }
    },
    "composer.recallClearedDrafts": {
      "sourceHash": "d54a0ff8733b42c4f6431da178b244d9fd182fa2871c172ff4fa7e6b12f81024",
      "label": "找回已清空草稿",
      "description": "将用 {clear} 清除的草稿保留在本地 {history} 历史中，直至退出；关闭后仅影响后续清除的草稿",
      "descriptionSource": "Keep drafts cleared with {clear} in local {history} history until exit; disabling affects future clears"
    },
    "input.bareExitOnEmptySession": {
      "sourceHash": "5143902fd8155a85a4ed148162454b47424ba5dea9c1dc56c962e5e1e245d60f",
      "label": "空会话直接退出",
      "description": "在首条消息之前提交仅含 `exit`、`quit` 或 `q` 的输入（不区分大小写），直接退出而不是向模型发送提示词"
    },
    "input.bareSlashCommands": {
      "sourceHash": "22ff29c8955034cd6668a5cd1ec342c44a01b7aa5207916dfa0e9a05e5e187ef",
      "label": "省略斜杠执行命令",
      "description": "提交仅含命令名称、不带开头 `/` 的输入（例如 `model`、`compact`），即可执行对应斜杠命令；会话已有消息时，需按两次 Enter 确认"
    },
    "magicKeywords.jevify": {
      "sourceHash": "13d2e210aba3b4ad7c58860a5092298775bfeb1090b0c63cf7df540e70db332a",
      "label": "Jevify 关键词",
      "description": "允许单独使用的 `jevify` 追加其隐藏的批量判定分类提示"
    },
    "skills.registryUrl": {
      "sourceHash": "200d719bfb211f0a94c1b7ab1091c503171445d23ea07ea7d1dd872ea03c0fe5",
      "label": "技能注册服务",
      "description": "`omp skill` 用于安装、搜索和发布技能的 Skillshare 注册服务（`https://host[:port]`）"
    },
    "collab.autoStart": {
      "sourceHash": "31c607b239cb23c1135ac9d295cb748b09d91961d17b32c446cfdde10480733a",
      "label": "自动启动",
      "description": "每个交互式会话启动时，通过 `collab.relayUrl` 托管并发布到本地注册表（`omp collab list`）；切换会话时更换房间",
      "options": {
        "off": {
          "label": "关闭",
          "description": "仅在运行 `/collab` 时共享"
        },
        "view": {
          "label": "查看",
          "description": "自动托管；注册表提供仅供查看的链接（`omp collab link --view`）"
        },
        "control": {
          "label": "控制",
          "description": "自动托管；注册表提供可向会话发送提示词的控制链接"
        }
      }
    },
    "stream.serverUrl": {
      "sourceHash": "e10882886e0fe7cf46f0fadb98eeff1582720fb830505b2794c0922e50a80583",
      "label": "直播服务器",
      "description": "`omp stream` 使用的直播服务器（`https://host[:port]`）；观众可在 `<base>/<your Stencil username>` 观看，其中后者为你的 Stencil 用户名"
    },
    "stream.redactPatterns": {
      "sourceHash": "7f4b864bed280004a737464a6a4474cd7ec9623a2b20aef26f78d19f4f6c0ed3",
      "label": "额外脱敏模式",
      "description": "除 `env/secrets.yml` 中的值和内置凭据格式外，对每一行直播内容应用的额外脱敏正则表达式"
    },
    "compaction.experimentalContextManagement": {
      "sourceHash": "5c17f992bba9bbeb54b5da3f247078e2c611710e68bb0cba5a9021f8b69f19d0",
      "label": "笔记支持的上下文窗口（实验性）",
      "description": "跨上下文窗口保留持久笔记和可搜索的原始历史记录"
    },
    "sharpshooter.model": {
      "sourceHash": "3013b8f5bec1695adf5e27718283ad929533280958a8d82488de34574f7e5631",
      "label": "Sharpshooter 模型",
      "description": "用于提取与整合的模型选择器；留空时使用 `smol` 角色"
    },
    "ttsr.judge": {
      "sourceHash": "38f231f5e83342a5b0840ce2b9b2011fb10c0193156bd94639f5d1fd354ef323",
      "label": "模型判定规则",
      "description": "针对已完成的回复、推理和工具调用，向 `judge` 模型角色询问每条 `question` 规则的问题；回答为肯定时，将该规则作为警告注入",
      "options": {
        "auto": {
          "label": "自动",
          "description": "仅当 `judge` 角色解析为原生 TypeSafe jev 模型时进行判定"
        },
        "on": {
          "label": "开启",
          "description": "始终进行判定，无论 `judge` 角色解析为哪个模型"
        },
        "off": {
          "label": "关闭",
          "description": "从不进行判定；问题规则保持不生效"
        }
      }
    },
    "providers.openaiLiveSteering": {
      "sourceHash": "bcd975ff6d66fcbddc9ba9f1b653f212c50d1d5eb56dfe96ee295c00a1c042ad",
      "label": "OpenAI 实时引导",
      "description": "通过 Codex WebSocket，将 GPT-6 回复流式输出期间输入的消息直接送入该回复，而不是等待下一个工具边界"
    },
    "providers.cacheWarming": {
      "sourceHash": "92adf61f240c5286461b82e98d2369cd0d6cc9c9656ae09b4c6f936e160699a8",
      "label": "缓存保温",
      "description": "在提示词缓存条目即将过期前，以 1 token 的输出额度重新发送上一次请求",
      "options": {
        "off": {
          "label": "关闭",
          "description": "禁用缓存保温"
        },
        "streaming": {
          "label": "流式输出期间",
          "description": "在工具长时间执行时保护高成本前缀；代理结束运行后停止"
        },
        "idle": {
          "label": "空闲期间",
          "description": "预期节省仍高于成本下限时，也在两次运行之间刷新 5 分钟缓存条目"
        }
      }
    },
    "claudeResets.autoRedeem": {
      "sourceHash": "0c206e1a18fc62c4b293935ec3c40a2c8d47efd5ca1e3c6193bad12558bc3c47",
      "label": "Claude 自动兑换重置",
      "description": "自动消耗符合条件的 Claude Cedar 或 Juniper 重置次数。Cedar 仅用于其覆盖的额度限制；Juniper 仅能解除单独的 5 小时限额阻断。`unset` 在首次消耗前询问，`yes` 无需询问直接消耗，`no` 禁用限额阻断恢复和到期前利用",
      "options": {
        "unset": {
          "label": "未设置",
          "description": "实时检查是否符合条件，再在首次消耗 Claude 重置次数前询问"
        },
        "yes": {
          "label": "是",
          "description": "无需询问，直接消耗符合条件的 Claude 重置次数"
        },
        "no": {
          "label": "否",
          "description": "不执行 Claude 重置自动兑换检查"
        }
      }
    },
    "claudeResets.minBlockedMinutes": {
      "sourceHash": "92d5083c31169533e3c215dffcfe0d8ce1d2c015544ae2e8bbb2abd4215cfee2",
      "label": "Claude 自动兑换最短阻断时间",
      "description": "仅当自然解除阻断的时间（已耗尽且受覆盖的各额度窗口中最晚的重置时间）至少还相隔所设分钟数时，才自动兑换；仅重置 5 小时限额的次数绝不用于每周限额或特定模型限额造成的阻断"
    },
    "claudeResets.keepCredits": {
      "sourceHash": "affcbc0c1c263f4a8b8793d4638650bbdfb9e473fc13f7337ac1bcb4044c2b8f",
      "label": "Claude 自动兑换保留次数",
      "description": "至少保留所设数量的 Claude 重置次数（0 允许自动消耗最后一次符合条件的重置）；此保留数量也适用于到期前利用"
    },
    "claudeResets.salvageHorizonHours": {
      "sourceHash": "d496deb3471422497fb60b9f039e4791849dcb718aacb66ec3233bf6e8a12463",
      "label": "Claude 重置到期利用窗口",
      "description": "仅当服务器选定的 Cedar 重置将在所设小时数以内到期、其覆盖的额度窗口中有值得恢复的已用额度，且该授权允许提前使用或某个覆盖窗口已耗尽时，才使用该重置（0 禁用到期前利用）"
    },
    "telemetry.otlpExportEnabled": {
      "sourceHash": "b640daf01d74fa616c91990ca9ea7af48cbef704785407fee931fe8ce63c3414",
      "label": "OTLP 遥测导出",
      "description": "允许 OMP 使用 `OTEL_*` 端点导出追踪、日志和指标；更改在下次启动时生效"
    },
    "edit.recoverInlineEdits": {
      "sourceHash": "7343fa4d37e7952d3cb004d9456212f1aec27cb82f678f4d9cfaf881301f75b8",
      "label": "恢复行内编辑内容",
      "description": "将模型以纯文本输出的编辑内容转换为 `edit` 工具调用并执行"
    },
    "find.enabled": {
      "sourceHash": "6fc3e245cd77c42237646dbb5321a24d90aa9bd9c4e3037f3ef9c50a29371f99",
      "label": "find（语义 grep）",
      "description": "启用 `find` 工具：使用自然语言搜索文件和行范围，由 `judge` 模型角色进行判定。自动模式仅当 `judge` 角色解析为原生 TypeSafe jev 模型时启用",
      "options": {
        "auto": {
          "label": "自动",
          "description": "当 `judge` 角色解析为原生 TypeSafe jev 模型时启用"
        },
        "on": {
          "label": "开启",
          "description": "始终启用，无论 `judge` 角色解析为哪个模型"
        },
        "off": {
          "label": "关闭",
          "description": "禁用 `find` 工具"
        }
      }
    },
    "images.questionTimeoutMs": {
      "sourceHash": "addb2c58be4eb11390500602f75075398a60ffae7ff3fe3c1ac5546ddb46b078",
      "label": "图像问答超时",
      "description": "`read` 的 `?q=` 图像问答所调用的视觉模型的单次请求超时时间，单位为毫秒。提供商无响应时会尽快返回超时错误，而不是一直阻塞到手动中止。设为 0 可禁用超时",
      "options": {
        "0": {
          "label": "禁用"
        },
        "60000": {
          "label": "1 分钟"
        },
        "120000": {
          "label": "2 分钟"
        },
        "180000": {
          "label": "3 分钟"
        },
        "300000": {
          "label": "5 分钟"
        }
      }
    },
    "tools.speculativeExecution.enabled": {
      "sourceHash": "1f12be3843248d818e2a96881948136db49be31aae37d0bcc45ebc68dc1eacfa",
      "label": "实验性推测执行",
      "description": "启用首批可安全丢弃结果的操作：通过直接 `read` 调用和嵌套 `eval` 执行已验证的本地读取。网络请求、提供商生成和实际文件系统写入不在此基础范围内"
    },
    "tools.speculativeExecution.maxInFlight": {
      "sourceHash": "769d65e3ef81d91c0623a45f5fdc1d04d31c52d58649715cdf5f5a6b4ddd6728",
      "label": "推测执行并发数",
      "description": "正常分派前允许运行的已验证本地读取的最大数量",
      "options": {
        "1": {
          "label": "1 个操作"
        },
        "2": {
          "label": "2 个操作"
        },
        "3": {
          "label": "3 个操作"
        },
        "4": {
          "label": "4 个操作"
        }
      }
    },
    "bash.allowCompoundCommands": {
      "sourceHash": "1fde7f22fa33d2b89f13823aeb39413637be5d60710e95e7adb3846cb99f147a",
      "label": "允许复合命令",
      "description": "按命令逐一评估字面的 `&&` 命令链；未匹配的命令使用常规 bash 审批策略和模式"
    },
    "eval.autoProvision": {
      "sourceHash": "3b6718dd13b8f1f01c6e6ec661df0a47a82a9326ea61a7c1a3fb0d130afed24b",
      "label": "Eval 环境配置",
      "description": "首次安装时自动创建受管理的 JavaScript eval 包环境"
    },
    "eval.tools.enabled": {
      "sourceHash": "2e96c57ce727cdfeecb7574f8168793d3190c77d0081cfca527e44e7a7b98653",
      "label": "Eval 定义工具",
      "description": "允许 `eval` 单元定义工具（Python 中使用 `@tool`，JS 中使用 `tool(fn)`），供 `task`、`agent()` 和 `workpool()` 子代理调用"
    },
    "eval.workpool.freshAgents": {
      "sourceHash": "5cf133fe8c2932fdb481d45a2c847a85f873d1801ee92d569999a3f5ed589482",
      "label": "Workpool 使用新子代理",
      "description": "为每个 `workpool` 条目启动新的子代理，而不是复用工作代理或批量处理排队条目"
    },
    "task.isolation.enabled": {
      "sourceHash": "961516429072948ae8177dacbf8f2e54c09d5487d2882af0b03161abcd0481bc",
      "label": "隔离子代理",
      "description": "在当前检出目录的隔离副本中运行子代理，之后整合其更改"
    },
    "isolation.backend": {
      "sourceHash": "a72b13a07a5e5f80c984f1d49464f393abad0fc62bee9bef516e11b314ab1003",
      "label": "隔离后端",
      "description": "用于子代理隔离和工作树克隆的后端",
      "options": {
        "auto": {
          "label": "自动",
          "description": "让 PAL 选择可用的最佳后端"
        },
        "apfs": {
          "label": "APFS",
          "description": "macOS `clonefile` 写时复制克隆（APFS）"
        },
        "btrfs": {
          "label": "btrfs",
          "description": "btrfs 子卷快照"
        },
        "zfs": {
          "label": "ZFS",
          "description": "ZFS 快照与克隆"
        },
        "reflink": {
          "label": "Reflink",
          "description": "Linux `FICLONE` 逐文件写时复制克隆"
        },
        "overlayfs": {
          "label": "Overlayfs",
          "description": "Linux 内核覆盖文件系统（或回退到 fuse-overlayfs）"
        },
        "projfs": {
          "label": "ProjFS",
          "description": "Windows 投影文件系统"
        },
        "block-clone": {
          "label": "块克隆",
          "description": "Windows `FSCTL_DUPLICATE_EXTENTS_TO_FILE`（NTFS/ReFS）"
        },
        "rcopy": {
          "label": "递归复制",
          "description": "可用时使用 `git worktree`，否则递归复制"
        }
      }
    },
    "worktree.clone": {
      "sourceHash": "d8a9c9137dafe7fff714dbf7a5e96ebbc085844fae59f395fab97797c66cbe54",
      "label": "将检出目录克隆到工作树",
      "description": "通过 `github pr_checkout` 或 bash 中的 `git worktree add` 创建新工作树时，先对当前检出目录进行写时复制克隆，以保留被忽略的构建产物（`node_modules`、`target`）；文件系统不支持克隆时回退到普通检出"
    },
    "worktree.cleanSource": {
      "sourceHash": "4d35f684560894da43ae06091cb785ce2eabf253f82d0ebd7457653fdbb05f69",
      "label": "`/wt` 后清理源检出目录",
      "description": "通过 `/wt` 创建工作树时，在迁移更改后重置原检出目录中已跟踪文件的更改，并删除未跟踪文件"
    },
    "task.speculativeLaunch": {
      "sourceHash": "4d56c27d953d31f2b1a7b43d273f225333924f9ed1ec72e5f7b45b3ae5542de5",
      "label": "推测启动任务",
      "description": "每个 `tasks[]` 条目完成流式传输后立即启动对应的批次子代理，而不是等待整个 `task` 调用完成。若最终调用未通过校验、被阻止或参数发生变化，则中止已启动的代理。要求 `task` 审批自动允许，且没有扩展工具生命周期处理器"
    },
    "plan.autosave": {
      "sourceHash": "147992d843174000afa0bd4e2a4e72a874047e4de252f5b65bfdfae69c5b5e13",
      "label": "自动保存计划",
      "description": "计划模式完成时，自动将已批准的计划保存到磁盘"
    },
    "plan.autosaveDir": {
      "sourceHash": "251c61a6727af91357e6c9d81d63f8426f6246c83344a7632e8a5b39a21eb7ea",
      "label": "自动保存目录",
      "description": "自动保存计划的目录；支持 `~`、绝对路径和相对于当前工作目录的路径。留空时使用 `<project>/.omp/plans/`"
    },
    "browser.tern": {
      "sourceHash": "d47907979a3e419cc7b0946a0e51675354af6c0f07826bc46399dc1085d6c544",
      "label": "Tern 浏览器",
      "description": "在 Tern 面板内，将浏览器页签作为画中画置于 omp 面板上方（原生网页视图），而不是使用无头 Chromium；没有可承载的 Tern 窗口时回退到 Chromium。显式 `app` 选项、Browser Relay 和浏览器 CDP URL 优先；`headed:false` 或 `app.tern:false` 可让单次打开不使用此模式。设置 `PI_BROWSER_TERN=0` 或 `PI_BROWSER_TERN=1` 可覆盖此设置"
    },
    "browser.freezeOnTurnEnd": {
      "sourceHash": "4277a2304699c39a135dfc0706b3e20347f6ffec2d72f737b055432131d1ea00",
      "label": "轮次结束后冻结浏览器页签",
      "description": "轮次结束时冻结 OMP 管理的无头浏览器页签，避免动画页面在空闲时持续消耗 CPU/GPU。下次使用时自动解冻；打开时传入 `persist:true` 可让该页签不参与冻结"
    },
    "browser.idleCloseSec": {
      "sourceHash": "20a877089331e6c8fc135da9a6214ea29ea256e191d577e72e61ba05c28e7ed8",
      "label": "浏览器空闲关闭超时",
      "description": "关闭空闲超过所设秒数的 OMP 管理的无头浏览器页签和 Tern 浏览器画中画（0 表示从不关闭，但会话释放时仍会回收）。绝不影响通过 Relay、CDP 或独立启动的浏览器，也不影响其他会话的页签",
      "options": {
        "0": {
          "label": "从不"
        },
        "900": {
          "label": "15 分钟"
        },
        "1800": {
          "label": "30 分钟"
        },
        "3600": {
          "label": "1 小时"
        }
      }
    },
    "ida.enabled": {
      "sourceHash": "70576a37ddc515257ce4f0609e32d041823236d0ca47ac51e0e044d7efaba4a3",
      "label": "IDA Pro",
      "description": "在 IDA Pro（idalib）中打开通过 `read` 读取的可执行文件，并启用 `ida` 工具；未找到 IDA 安装时不生效"
    },
    "ida.python": {
      "sourceHash": "67c1e283db95d8cf4e481715ca889b359cf70d687dae4424069b70f3d9977950",
      "label": "IDA Python",
      "description": "能够导入 `ida_domain` 和 `idapro` 的 Python 解释器；留空时自动检测"
    },
    "ida.installDir": {
      "sourceHash": "354c0fea904e32644cb70ca8e9c3d37c42424c7ff385b54f26933f7f4c091ef8",
      "label": "IDA 安装目录",
      "description": "包含 `libidalib` 的目录，会导出为 `IDADIR`；留空时自动检测（`$IDADIR`、`ida-config.json`、标准安装路径）"
    },
    "ida.maxOpen": {
      "sourceHash": "42a8cc47af6a062c4622f0d32f03d86cdc8c434642fd439868d6581fb24b4c3d",
      "label": "IDA 最大打开数据库数",
      "description": "每个项目同时打开的 IDA 数据库数量上限（`omp ps` 中的 `omp.ida.*` 守护进程）；再打开一个时，会保存并关闭空闲数据库中最久未使用的那个",
      "options": {
        "2": {
          "label": "2"
        },
        "4": {
          "label": "4"
        },
        "8": {
          "label": "8"
        },
        "16": {
          "label": "16"
        }
      }
    },
    "ida.idleCloseSec": {
      "sourceHash": "a33319946dd3f20f344ee6e2d120b547d568a042e55cda96304c5506006c66eb",
      "label": "IDA 空闲关闭超时",
      "description": "保存并关闭空闲超过所设秒数的 IDA 数据库（0 表示从不关闭）；重新打开时会重置 `exec` 命名空间",
      "options": {
        "0": {
          "label": "从不"
        },
        "300": {
          "label": "5 分钟"
        },
        "900": {
          "label": "15 分钟"
        },
        "1800": {
          "label": "30 分钟"
        },
        "3600": {
          "label": "1 小时"
        }
      }
    },
    "mcp.startupTimeoutMs": {
      "sourceHash": "036eb918786f257149807dd371cd723429f05617777ea62ee84e5e863d5ca4de",
      "label": "MCP 启动等待时间",
      "description": "等待首次 MCP 工具发现的时长，单位为毫秒；0 表示一直等待连接完成建立或失败"
    }
  }
} satisfies LocalePack;
