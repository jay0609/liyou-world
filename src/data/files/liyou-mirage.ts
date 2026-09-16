/**
 * 由 scripts/convert-content.cjs 自动生成
 * 编辑请改 content/files/liyou-mirage.json
 */
import type { ProjectFiles } from './types'

const data: ProjectFiles = {
  "slug": "liyou-mirage",
  "sections": [
    {
      "id": "rust",
      "title": "Rust 后端（src-tauri）",
      "root": "src-tauri",
      "total": 41,
      "files": [
        {
          "path": "src-tauri/src/bootstrap.rs",
          "title": "启动组装：初始化数据库、注册命令、拉起服务",
          "desc": "大小 9.8 KB"
        },
        {
          "path": "src-tauri/src/commands/chat.rs",
          "title": "聊天命令：发消息、取历史、管理会话",
          "desc": "大小 5.8 KB"
        },
        {
          "path": "src-tauri/src/commands/cloud_api.rs",
          "title": "云端 API：非流式的模型调用与配置",
          "desc": "大小 16.3 KB"
        },
        {
          "path": "src-tauri/src/commands/cloud_stream.rs",
          "title": "云端流式对话（SSE 逐字返回）",
          "desc": "大小 12.1 KB"
        },
        {
          "path": "src-tauri/src/commands/inspiration.rs",
          "title": "灵感收集命令",
          "desc": "大小 2.7 KB"
        },
        {
          "path": "src-tauri/src/commands/memory.rs",
          "title": "记忆系统的 IPC 命令层：增删改查、审核、导入导出（本层最大文件）",
          "desc": "大小 23.3 KB"
        },
        {
          "path": "src-tauri/src/commands/memory_core.rs",
          "title": "记忆核心命令：读写 L0-L5 各层",
          "desc": "大小 5.2 KB"
        },
        {
          "path": "src-tauri/src/commands/memory_file.rs",
          "title": "SOUL.md / USER.md / MEMORY.md 三个记忆文件的读写",
          "desc": "大小 2.3 KB"
        },
        {
          "path": "src-tauri/src/commands/novel.rs",
          "title": "小说工作台命令",
          "desc": "大小 5.3 KB"
        },
        {
          "path": "src-tauri/src/commands/reset.rs",
          "title": "重置数据（清库 / 恢复出厂）",
          "desc": "大小 2.5 KB"
        },
        {
          "path": "src-tauri/src/commands/world.rs",
          "title": "世界观设定命令",
          "desc": "大小 5.2 KB"
        },
        {
          "path": "src-tauri/src/error/mod.rs",
          "title": "统一错误处理与向前端传递",
          "desc": "大小 4.4 KB"
        },
        {
          "path": "src-tauri/src/error/types.rs",
          "title": "错误类型定义",
          "desc": "大小 3.5 KB"
        },
        {
          "path": "src-tauri/src/lib.rs",
          "title": "Tauri 应用入口",
          "desc": "大小 9.3 KB"
        },
        {
          "path": "src-tauri/src/main.rs",
          "title": "二进制入口",
          "desc": "大小 1.8 KB"
        },
        {
          "path": "src-tauri/src/repository/chat_repo.rs",
          "title": "会话与消息的数据访问",
          "desc": "大小 7.0 KB"
        },
        {
          "path": "src-tauri/src/repository/db.rs",
          "title": "SQLite 连接与迁移",
          "desc": "大小 2.2 KB"
        },
        {
          "path": "src-tauri/src/repository/inspiration_repo.rs",
          "title": "灵感表的数据访问",
          "desc": "大小 10.0 KB"
        },
        {
          "path": "src-tauri/src/repository/mod.rs",
          "title": "数据访问层入口",
          "desc": "大小 0.8 KB"
        },
        {
          "path": "src-tauri/src/repository/novel_repo.rs",
          "title": "小说表的数据访问（含章节树）",
          "desc": "大小 17.2 KB"
        },
        {
          "path": "src-tauri/src/repository/world_repo.rs",
          "title": "世界观表的数据访问",
          "desc": "大小 12.7 KB"
        },
        {
          "path": "src-tauri/src/security/aes_cipher.rs",
          "title": "AES 加密：本地数据落盘前加密",
          "desc": "大小 4.1 KB"
        },
        {
          "path": "src-tauri/src/security/keychain.rs",
          "title": "系统密钥链：取密钥，不落明文",
          "desc": "大小 2.2 KB"
        },
        {
          "path": "src-tauri/src/security/mod.rs",
          "title": "安全模块入口",
          "desc": "大小 0.0 KB"
        },
        {
          "path": "src-tauri/src/services/chat.rs",
          "title": "聊天业务逻辑",
          "desc": "大小 3.0 KB"
        },
        {
          "path": "src-tauri/src/services/chat_tests.rs",
          "title": "聊天层测试",
          "desc": "大小 11.8 KB"
        },
        {
          "path": "src-tauri/src/services/inspiration.rs",
          "title": "灵感业务：随手记与整理",
          "desc": "大小 5.3 KB"
        },
        {
          "path": "src-tauri/src/services/llm.rs",
          "title": "LLM 调用：本地 Ollama 与云端统一入口",
          "desc": "大小 7.6 KB"
        },
        {
          "path": "src-tauri/src/services/llm_tests.rs",
          "title": "LLM 层测试",
          "desc": "大小 10.7 KB"
        },
        {
          "path": "src-tauri/src/services/memory/context.rs",
          "title": "记忆注入：按预算挑出该进上下文的部分",
          "desc": "大小 4.4 KB"
        },
        {
          "path": "src-tauri/src/services/memory/facts.rs",
          "title": "事实三元组：语义记忆的结构化表示",
          "desc": "大小 2.4 KB"
        },
        {
          "path": "src-tauri/src/services/memory/lifecycle.rs",
          "title": "记忆生命周期：强化、时间衰减、归档（会\"忘\"）",
          "desc": "大小 6.5 KB"
        },
        {
          "path": "src-tauri/src/services/memory/mod.rs",
          "title": "记忆模块入口：把七层记忆串起来",
          "desc": "大小 8.1 KB"
        },
        {
          "path": "src-tauri/src/services/memory/pending.rs",
          "title": "待确认记忆：AI 想记的东西先挂起，等人审核",
          "desc": "大小 10.4 KB"
        },
        {
          "path": "src-tauri/src/services/memory/storage.rs",
          "title": "记忆持久化（SQLite）",
          "desc": "大小 7.3 KB"
        },
        {
          "path": "src-tauri/src/services/memory/types.rs",
          "title": "记忆层的类型定义（层级 / 权重 / 状态）",
          "desc": "大小 5.8 KB"
        },
        {
          "path": "src-tauri/src/services/memory_tests.rs",
          "title": "记忆系统测试（本模块最大文件，21.9 KB）",
          "desc": "大小 21.4 KB"
        },
        {
          "path": "src-tauri/src/services/novel.rs",
          "title": "小说业务：章节、大纲、续写",
          "desc": "大小 11.4 KB"
        },
        {
          "path": "src-tauri/src/services/world.rs",
          "title": "世界观业务：设定条目与关系",
          "desc": "大小 17.8 KB"
        },
        {
          "path": "src-tauri/src/utils/logger.rs",
          "title": "日志",
          "desc": "大小 3.2 KB"
        },
        {
          "path": "src-tauri/src/utils/mod.rs",
          "title": "mod",
          "desc": ""
        }
      ]
    },
    {
      "id": "vue",
      "title": "Vue 前端（frontend）",
      "root": "frontend",
      "total": 104,
      "files": [
        {
          "path": "frontend/src/App.vue",
          "title": "应用根组件",
          "desc": "大小 5.9 KB"
        },
        {
          "path": "frontend/src/components/BilingChat.vue",
          "title": "聊天主界面（双语 / 双栏）",
          "desc": "大小 16.1 KB"
        },
        {
          "path": "frontend/src/components/CharacterCard.vue",
          "title": "CharacterCard",
          "desc": ""
        },
        {
          "path": "frontend/src/components/ChatBubble.vue",
          "title": "聊天气泡",
          "desc": "大小 9.1 KB"
        },
        {
          "path": "frontend/src/components/ChatClearConfirm.vue",
          "title": "ChatClearConfirm",
          "desc": ""
        },
        {
          "path": "frontend/src/components/ChatConvList.vue",
          "title": "ChatConvList",
          "desc": ""
        },
        {
          "path": "frontend/src/components/ChatHeader.vue",
          "title": "ChatHeader",
          "desc": ""
        },
        {
          "path": "frontend/src/components/ChatInput.vue",
          "title": "聊天输入框",
          "desc": "大小 11.0 KB"
        },
        {
          "path": "frontend/src/components/ChatInterface.setup.ts",
          "title": "ChatInterface.setup",
          "desc": ""
        },
        {
          "path": "frontend/src/components/ChatInterface.vue",
          "title": "ChatInterface",
          "desc": ""
        },
        {
          "path": "frontend/src/components/ChatWelcome.vue",
          "title": "ChatWelcome",
          "desc": ""
        },
        {
          "path": "frontend/src/components/DigitalTwinImport.vue",
          "title": "导入聊天记录训练数字分身",
          "desc": "大小 4.9 KB"
        },
        {
          "path": "frontend/src/components/ErrorBoundary.vue",
          "title": "ErrorBoundary",
          "desc": ""
        },
        {
          "path": "frontend/src/components/ErrorModal.vue",
          "title": "ErrorModal",
          "desc": ""
        },
        {
          "path": "frontend/src/components/InspectorOverlay.vue",
          "title": "InspectorOverlay",
          "desc": ""
        },
        {
          "path": "frontend/src/components/LiyouAvatar.vue",
          "title": "璃幽的头像（带状态）",
          "desc": "大小 3.6 KB"
        },
        {
          "path": "frontend/src/components/MemoryReview.vue",
          "title": "记忆审核：逐条确认 AI 想记的东西",
          "desc": "大小 14.9 KB"
        },
        {
          "path": "frontend/src/components/ModelIndicator.vue",
          "title": "当前模型指示",
          "desc": "大小 3.8 KB"
        },
        {
          "path": "frontend/src/components/ParamPanel.vue",
          "title": "模型参数面板",
          "desc": "大小 3.7 KB"
        },
        {
          "path": "frontend/src/components/PersonaSwitcher.vue",
          "title": "人格切换",
          "desc": "大小 2.1 KB"
        },
        {
          "path": "frontend/src/components/SakuraParticles.vue",
          "title": "樱花粒子背景",
          "desc": "大小 1.5 KB"
        },
        {
          "path": "frontend/src/components/Sidebar.vue",
          "title": "Sidebar",
          "desc": ""
        },
        {
          "path": "frontend/src/components/SpiritThinking.vue",
          "title": "「灵」思考中的动效",
          "desc": "大小 3.0 KB"
        },
        {
          "path": "frontend/src/components/ToastNotification.vue",
          "title": "ToastNotification",
          "desc": ""
        },
        {
          "path": "frontend/src/components/VoiceCallModal.vue",
          "title": "语音通话弹窗",
          "desc": "大小 10.2 KB"
        },
        {
          "path": "frontend/src/composables/useAvatar.ts",
          "title": "useAvatar",
          "desc": ""
        },
        {
          "path": "frontend/src/composables/useChatActions.ts",
          "title": "useChatActions",
          "desc": ""
        },
        {
          "path": "frontend/src/composables/useChatConversations.ts",
          "title": "会话管理",
          "desc": "大小 5.2 KB"
        },
        {
          "path": "frontend/src/composables/useChatEmotions.ts",
          "title": "useChatEmotions",
          "desc": ""
        },
        {
          "path": "frontend/src/composables/useChatHandlers.ts",
          "title": "聊天事件处理",
          "desc": "大小 8.8 KB"
        },
        {
          "path": "frontend/src/composables/useChatMessages.ts",
          "title": "消息管理",
          "desc": "大小 5.9 KB"
        },
        {
          "path": "frontend/src/composables/useChatScroll.ts",
          "title": "useChatScroll",
          "desc": ""
        },
        {
          "path": "frontend/src/composables/useChatSearch.ts",
          "title": "useChatSearch",
          "desc": ""
        },
        {
          "path": "frontend/src/composables/useEmotionTags.ts",
          "title": "useEmotionTags",
          "desc": ""
        },
        {
          "path": "frontend/src/composables/useFeatureTier.ts",
          "title": "useFeatureTier",
          "desc": ""
        },
        {
          "path": "frontend/src/composables/useFirstMessage.ts",
          "title": "useFirstMessage",
          "desc": ""
        },
        {
          "path": "frontend/src/composables/useInspector.ts",
          "title": "useInspector",
          "desc": ""
        },
        {
          "path": "frontend/src/composables/useSystemPrompt.ts",
          "title": "系统提示词拼装（记忆注入的落点）",
          "desc": "大小 2.6 KB"
        },
        {
          "path": "frontend/src/composables/useTheme.ts",
          "title": "useTheme",
          "desc": ""
        },
        {
          "path": "frontend/src/composables/useToast.ts",
          "title": "useToast",
          "desc": ""
        },
        {
          "path": "frontend/src/composables/useVoice.ts",
          "title": "语音",
          "desc": "大小 3.7 KB"
        },
        {
          "path": "frontend/src/config/feature-tiers.ts",
          "title": "功能分级",
          "desc": "大小 3.1 KB"
        },
        {
          "path": "frontend/src/config/providers.ts",
          "title": "模型提供方配置",
          "desc": "大小 7.7 KB"
        },
        {
          "path": "frontend/src/config/settings.ts",
          "title": "设置项",
          "desc": "大小 2.2 KB"
        },
        {
          "path": "frontend/src/locales/zh-CN.ts",
          "title": "zh-CN",
          "desc": ""
        },
        {
          "path": "frontend/src/main.ts",
          "title": "前端入口",
          "desc": "大小 2.4 KB"
        },
        {
          "path": "frontend/src/router/index.ts",
          "title": "前端路由",
          "desc": "大小 2.0 KB"
        },
        {
          "path": "frontend/src/skills/core/core-learning/SKILL.md",
          "title": "技能：学习（怎么从对话里学东西）",
          "desc": "大小 5.4 KB"
        },
        {
          "path": "frontend/src/skills/core/core-personality/SKILL.md",
          "title": "技能：人格（璃幽怎么说话）",
          "desc": "大小 3.1 KB"
        },
        {
          "path": "frontend/src/skills/dev/dev-frontend/SKILL.md",
          "title": "技能：前端开发",
          "desc": "大小 4.5 KB"
        },
        {
          "path": "frontend/src/skills/loader.ts",
          "title": "技能加载器（SKILL.md 按需加载）",
          "desc": "大小 3.0 KB"
        },
        {
          "path": "frontend/src/stores/chat.ts",
          "title": "聊天状态",
          "desc": "大小 0.9 KB"
        },
        {
          "path": "frontend/src/stores/digitalTwin.ts",
          "title": "数字分身状态（18.6 KB）",
          "desc": "大小 18.2 KB"
        },
        {
          "path": "frontend/src/stores/inspiration.ts",
          "title": "灵感状态",
          "desc": "大小 2.8 KB"
        },
        {
          "path": "frontend/src/stores/novel.ts",
          "title": "小说状态",
          "desc": "大小 3.4 KB"
        },
        {
          "path": "frontend/src/stores/overlay.ts",
          "title": "overlay",
          "desc": ""
        },
        {
          "path": "frontend/src/stores/user.ts",
          "title": "用户状态",
          "desc": "大小 1.1 KB"
        },
        {
          "path": "frontend/src/stores/world.ts",
          "title": "世界观状态",
          "desc": "大小 6.0 KB"
        },
        {
          "path": "frontend/src/style.css",
          "title": "全局样式",
          "desc": "大小 5.2 KB"
        },
        {
          "path": "frontend/src/styles/global-enhancements.css",
          "title": "global-enhancements",
          "desc": ""
        },
        {
          "path": "frontend/src/styles/theme-tokens.css",
          "title": "主题 token",
          "desc": "大小 6.7 KB"
        },
        {
          "path": "frontend/src/types/chat.ts",
          "title": "chat",
          "desc": ""
        },
        {
          "path": "frontend/src/types/digital-twin.ts",
          "title": "digital-twin",
          "desc": ""
        },
        {
          "path": "frontend/src/types/inspiration.ts",
          "title": "inspiration",
          "desc": ""
        },
        {
          "path": "frontend/src/types/novel.ts",
          "title": "novel",
          "desc": ""
        },
        {
          "path": "frontend/src/types/world.ts",
          "title": "world",
          "desc": ""
        },
        {
          "path": "frontend/src/utils/cloud-stream.ts",
          "title": "云端流式请求",
          "desc": "大小 4.7 KB"
        },
        {
          "path": "frontend/src/utils/digital-twin-llm.ts",
          "title": "数字分身的 LLM 流程",
          "desc": "大小 7.6 KB"
        },
        {
          "path": "frontend/src/utils/digital-twin-storage.ts",
          "title": "数字分身数据存储",
          "desc": "大小 7.3 KB"
        },
        {
          "path": "frontend/src/utils/error/index.ts",
          "title": "index",
          "desc": ""
        },
        {
          "path": "frontend/src/utils/error/types.ts",
          "title": "types",
          "desc": ""
        },
        {
          "path": "frontend/src/utils/ipc/chat.ts",
          "title": "chat",
          "desc": ""
        },
        {
          "path": "frontend/src/utils/ipc/core.ts",
          "title": "core",
          "desc": ""
        },
        {
          "path": "frontend/src/utils/ipc/index.ts",
          "title": "index",
          "desc": ""
        },
        {
          "path": "frontend/src/utils/ipc/inspiration.ts",
          "title": "inspiration",
          "desc": ""
        },
        {
          "path": "frontend/src/utils/ipc/novel.ts",
          "title": "novel",
          "desc": ""
        },
        {
          "path": "frontend/src/utils/ipc/world.ts",
          "title": "world",
          "desc": ""
        },
        {
          "path": "frontend/src/utils/markdown-render.ts",
          "title": "Markdown 渲染",
          "desc": "大小 3.1 KB"
        },
        {
          "path": "frontend/src/utils/message-format.ts",
          "title": "message-format",
          "desc": ""
        },
        {
          "path": "frontend/src/utils/prompt-templates.ts",
          "title": "提示词模板",
          "desc": "大小 8.9 KB"
        },
        {
          "path": "frontend/src/utils/safeStorage.ts",
          "title": "安全本地存储",
          "desc": "大小 2.4 KB"
        },
        {
          "path": "frontend/src/views/DiagnosticView.vue",
          "title": "诊断页：自检运行时状态",
          "desc": "大小 9.5 KB"
        },
        {
          "path": "frontend/src/views/DigitalTwin.vue",
          "title": "数字分身：让 AI 学习一个人的说话方式（前端最大文件，50 KB）",
          "desc": "大小 48.9 KB"
        },
        {
          "path": "frontend/src/views/InspirationView.vue",
          "title": "灵感收集台",
          "desc": "大小 18.7 KB"
        },
        {
          "path": "frontend/src/views/MemoryEditor.vue",
          "title": "记忆条目编辑器",
          "desc": "大小 4.4 KB"
        },
        {
          "path": "frontend/src/views/MemoryFilter.vue",
          "title": "记忆筛选",
          "desc": "大小 2.2 KB"
        },
        {
          "path": "frontend/src/views/MemoryList.vue",
          "title": "记忆列表",
          "desc": "大小 3.1 KB"
        },
        {
          "path": "frontend/src/views/MemoryManagement.vue",
          "title": "记忆管理主界面",
          "desc": "大小 14.2 KB"
        },
        {
          "path": "frontend/src/views/NovelView.vue",
          "title": "小说工作台",
          "desc": "大小 15.0 KB"
        },
        {
          "path": "frontend/src/views/OnboardingView.vue",
          "title": "首次引导：填 USER.md 的那套流程",
          "desc": "大小 11.2 KB"
        },
        {
          "path": "frontend/src/views/Settings/composables/useProfileSettings.ts",
          "title": "useProfileSettings",
          "desc": ""
        },
        {
          "path": "frontend/src/views/Settings/composables/useRoleSettings.ts",
          "title": "useRoleSettings",
          "desc": ""
        },
        {
          "path": "frontend/src/views/Settings/index.vue",
          "title": "index",
          "desc": ""
        },
        {
          "path": "frontend/src/views/Settings/SettingsAbout.vue",
          "title": "SettingsAbout",
          "desc": ""
        },
        {
          "path": "frontend/src/views/Settings/SettingsAccount.vue",
          "title": "SettingsAccount",
          "desc": ""
        },
        {
          "path": "frontend/src/views/Settings/SettingsAgreement.vue",
          "title": "SettingsAgreement",
          "desc": ""
        },
        {
          "path": "frontend/src/views/Settings/SettingsAppearance.vue",
          "title": "SettingsAppearance",
          "desc": ""
        },
        {
          "path": "frontend/src/views/Settings/SettingsCompliance.vue",
          "title": "SettingsCompliance",
          "desc": ""
        },
        {
          "path": "frontend/src/views/Settings/SettingsModel.vue",
          "title": "SettingsModel",
          "desc": ""
        },
        {
          "path": "frontend/src/views/Settings/SettingsProfile.vue",
          "title": "SettingsProfile",
          "desc": ""
        },
        {
          "path": "frontend/src/views/Settings/SettingsRole.vue",
          "title": "SettingsRole",
          "desc": ""
        },
        {
          "path": "frontend/src/views/Settings/SettingsTier.vue",
          "title": "SettingsTier",
          "desc": ""
        },
        {
          "path": "frontend/src/views/WorldView.vue",
          "title": "世界观工作台",
          "desc": "大小 20.2 KB"
        },
        {
          "path": "frontend/src/vite-env.d.ts",
          "title": "vite-env.d",
          "desc": ""
        }
      ]
    }
  ]
}

export default data
