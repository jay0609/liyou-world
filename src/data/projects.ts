/**
 * 个人项目作品集 — 数据驱动
 *
 * 每个项目 = 首页的一张卡，点击进入 /projects/:slug
 * （概念 + 理念 + 亮点 + 技术栈 + 进展 + 架构文件树）
 * 新增项目只需在数组里追加一条，路由与列表自动生效。
 *
 * 文件树为扫描真实项目目录生成。
 */

export type ProjectStatus = '规划中' | '开发中' | '先行版' | '已发布'
export type ProjectCategory = '游戏' | 'AI 应用' | '游戏工具/插件' | '独立产品'

export interface ArchitectureLayer {
  /** 层名 */
  layer: string
  /** 这一层负责什么 */
  role: string
}

export interface Project {
  /** 路由标识，唯一，小写短横线 */
  slug: string
  name: string
  /** 一句话定位 */
  tagline: string
  icon: string
  category: ProjectCategory
  status: ProjectStatus
  /** 概念：它是什么、解决什么问题 */
  concept: string
  /** 理念：为什么做 */
  philosophy: string
  /** 亮点 / 核心功能 */
  highlights: string[]
  /** 技术栈 */
  tech: string[]
  /** 当前进展 */
  progress: { done: string; next: string }
  /** 架构分层说明 */
  architecture?: ArchitectureLayer[]
  /** 架构文件树（扫描真实目录生成，纯文本） */
  fileTree?: string
  /** 规模数据 */
  scale?: { label: string; value: string }[]
  links?: { label: string; url: string }[]
}

export const projects: Project[] = [
  {
    slug: 'soszombie',
    name: 'SOSZombie',
    tagline: 'CS1.6 僵尸感染模式的 3D 重制 · 团结引擎',
    icon: '🧟',
    category: '游戏',
    status: '开发中',
    concept:
      '把 CS1.6 时代的「SOS 僵尸感染」玩法，用现代 3D 引擎从零重做。8 个 AI 人类 + 1 个真人玩家，反向 ZP 感染回合制——每一局都是人和僵尸的拉锯。',
    philosophy:
      'BOT 和真人共用同一套游戏体系：BOT 是随机性，玩家是选择性，但不能因为「我是真人」就特殊对待。模拟内核必须确定——同一份输入日志 + 同一个种子，必须得到同一个结果，否则调试无从下手。',
    highlights: [
      '五层架构：01_Core 是纯 C#，可脱离引擎跑测试',
      '固定 64 tick + 种子随机 + 状态哈希，保证确定性',
      'AI 被当作「另一个输入源」，与玩家走同一套系统',
      '按里程碑推进，每个里程碑验收后打 git tag',
    ],
    tech: ['团结引擎 2022.3', 'C#', 'NUnit', 'Git'],
    progress: {
      done: '已推进到 M19：武器携行格、模式抽取权重、母体僵尸机制、手雷体系。',
      next: '武器模型与掉落视觉、地图模块、商城开放给真人玩家。',
    },
    architecture: [
      { layer: '01_Core', role: '纯 C# 内核，asmdef 关闭引擎引用，可无 Unity 编译与测试' },
      { layer: '03_Presentation', role: '只读展示层——HUD / 菜单 / 视觉，不写任何状态' },
      { layer: 'Docs', role: '设计锚点、架构索引、数值出处、模块接口与不变式' },
      { layer: 'Tools', role: '内核测试 + 展示层编译检查，独立于引擎' },
    ],
    fileTree: `SOSZombie/
├── Assets/
│   ├── 01_Core/                 ← 纯 C#，可脱离引擎测试
│   │   ├── Common/
│   │   ├── Data/                ← 武器 / 僵尸 / 商店 / 规则，一文件一事物
│   │   ├── Level/
│   │   ├── State/
│   │   └── Systems/             ← 战斗 / 移动 / 回合 / 商店 / 僵尸 / 人类 / 掉落
│   ├── 03_Presentation/         ← 只读层，27 个脚本
│   │   ├── PlayerHud.cs
│   │   ├── MenuPage.cs
│   │   ├── WeaponSelectPage.cs
│   │   ├── CombatVisuals.cs
│   │   └── SimRunner.cs
│   ├── Editor/
│   ├── Resources/
│   └── Scenes/
├── Docs/                        ← 17 份设计文档
└── Tools/
    ├── CoreTests/               ← 38 个测试文件
    └── PresentationCompileCheck/`,
    scale: [
      { label: 'C# 脚本', value: '347' },
      { label: 'git 提交', value: '63' },
      { label: '里程碑 tag', value: '23' },
      { label: '设计文档', value: '17 份' },
      { label: '测试文件', value: '38' },
    ],
  },

  {
    slug: 'cs16-soszombie',
    name: 'CS1.6 SOS 僵尸服',
    tagline: '把星河 SOSZOMBIE 复刻到 ZP 5.0.8a · AMXX 插件',
    icon: '🧟',
    category: '游戏工具/插件',
    status: '已发布',
    concept:
      'CS1.6 的 SOSZOMBIE 是星河网络基于 Zombie Plague 4.3 魔改的僵尸服。这个项目把它复刻到 ZP 5.0.8a 基座上——ZP 只当框架，SOS 的玩法全部自己重写。除了服务端插件，还改写了 YaPB 机器人，让 BOT 真的会玩这套玩法。',
    philosophy:
      '单人维护一个服，最怕的是「一个文件两千行」。所以状态只有一份：技能 / 经验 / 等级 / 技能点全在 Core，菜单和战斗模块通过 native 读写，谁都不许自己存一份。另一个原则是不碰 ZP 核心——用官方 class / items API 注册自己的内容，ZP 升级也不会把我的东西冲掉。机器人那边同理：只加不改，全部参数走 cvar，出问题能一个开关关掉。',
    highlights: [
      '21 种僵尸 + 全套主动技能，走 ZP 的 class API 注册，零改动核心',
      '状态集中在 ZQ_SOS_Core，Menu / Combat / Weapon 全部通过 native 访问',
      '手雷 6 种引信模式：普通 / 临近 / 触发 / 激光拌雷 / 速度检测 / 遥控，接管引信 + 0.1s 控制器',
      '母体机制：红光范围光环 + 超级跳；独苗自愈 300/s；最后一名人类 ×10 血',
      '改写 YaPB 机器人（13 文件 +1651 行）：从玩家路径学习路点、猎杀欲望、狼群包抄',
      '冲锋猛扑 14 个参数（飞行时间 / 重力 / 起跳高度 / 弧线检查），配合服务端冲刺技能解决「僵尸够不到高台」',
      '自研 zp50_zp43_compat 兼容层，让老插件能跑在 ZP 5.0 上',
    ],
    tech: ['Pawn', 'AMX Mod X 1.8.1', 'Zombie Plague 5.0.8a', 'C++', 'YaPB 4.4.957', 'Metamod'],
    progress: {
      done: '13 个自研插件全部编译上线，plugins.ini 实际加载 78 个插件无报错；YaPB 机器人做了 14 轮实验构建（p0→p12），母体、手雷 6 模式、冲锋猛扑已实机验证。',
      next: '推进 ZQ_SOS_Level v2 重建版（把技能系统收敛），继续调机器人 AI 的猎杀与包抄参数。',
    },
    architecture: [
      { layer: 'ZP 5.0 基座', role: 'zp50_core + 官方模块（约 59 个），提供 class / items / gamemode API' },
      { layer: '内容注册层', role: 'zp50_class_soszombie（21 种僵尸）+ zp50_items_sos（道具），不改 ZP 核心' },
      { layer: '状态层', role: 'ZQ_SOS_Core —— 技能数据 / 经验 / 等级 / 技能点 / 存档序列化，唯一状态源 + native' },
      { layer: '表现层', role: 'Menu（菜单 / Trie 存档 / HUD）· Combat（战斗被动）· Weapon（弹夹射速换弹）· Mother（母体）' },
      { layer: '机器人 AI', role: 'YaPB 4.4.957 改写 —— 路点学习 / 猎杀 / 狼群 / 冲锋 / 净空 / ZP 大脑，52 个新 cvar' },
      { layer: '辅助', role: 'nademodes（手雷引信）· bot_addon（BOT 加点）· countdown（开局音效）' },
    ],
    scale: [
      { label: '自研插件', value: '13 个' },
      { label: 'Pawn 源码', value: '279.7 KB' },
      { label: '机器人改写', value: '+1651 行' },
      { label: '新增 cvar', value: '52 个' },
      { label: '实验构建', value: '14 轮' },
      { label: '僵尸种类', value: '21 种' },
    ],
  },

  {
    slug: 'liyou-mirage',
    name: '璃幽灵境',
    tagline: '桌面 AI 创作伴侣 · Tauri + Rust + Vue',
    icon: '🌸',
    category: 'AI 应用',
    status: '先行版',
    concept:
      '一款桌面 AI 创作伴侣，把角色陪伴与创作生产力放在同一个本地应用里：对话、小说工作台、OC 创作、世界观设定，数据 100% 存在本地。',
    philosophy:
      '让 AI 不只是冷冰冰的工具，而是一个有性格、愿意倾听的伙伴；创作是手段，陪伴才是目的。',
    highlights: [
      'Tauri v2 打包，安装包仅数 MB，内存占用远低于 Electron',
      'Rust 后端分层：commands / services / repository / security',
      '多模型切换 + 本地存储加密',
      '配套世界观站点与交互式「次元星图」',
    ],
    tech: ['Tauri v2', 'Rust', 'Vue 3', 'TypeScript', 'SQLite', 'Pinia'],
    progress: {
      done: '先行版已发布，支持聊天、创作工坊与本地存储。',
      next: '完善亲密度 / 等级 / 成就系统，接入语音与更多模型。',
    },
    architecture: [
      { layer: 'commands', role: 'Tauri IPC 命令层——前端唯一的调用入口' },
      { layer: 'services', role: '业务逻辑' },
      { layer: 'repository', role: '数据访问（SQLite）' },
      { layer: 'security', role: '密钥与加密' },
      { layer: 'error', role: '统一错误类型，跨层传递' },
    ],
    fileTree: `璃幽灵境/
├── src/                          ← Vue 3 前端
├── src-tauri/
│   └── src/
│       ├── commands/             ← Tauri IPC 命令层
│       ├── services/             ← 业务逻辑
│       ├── repository/           ← 数据访问
│       ├── security/             ← 密钥 / 加密
│       ├── error/                ← 统一错误
│       ├── utils/
│       ├── bootstrap.rs          ← 启动组装
│       ├── lib.rs
│       └── main.rs
└── Docs/`,
    links: [
      { label: '世界观 · 书灵志', url: '/projects/liyou-mirage/lore' },
      { label: '次元星图', url: '/projects/liyou-mirage/world-map' },
    ],
  },

  {
    slug: 'minecraft-numen',
    name: 'Minecraft Numen',
    tagline: 'Minecraft 服务端改版 · Java / Fabric',
    icon: '⛏️',
    category: '游戏',
    status: '开发中',
    concept:
      '基于 Minecraft 服务端做的改版工程，拆成 API、fork、构建三块，跑在自己的服务器上。',
    philosophy: '把「魔改」当成正经工程做——分模块、可回退、配置与代码分离。',
    highlights: [
      '拆成 numen-api / numen-fork / numen-maven 三块',
      '配置与日志外置，不动核心代码即可调整',
    ],
    tech: ['Java', 'Fabric', 'Maven'],
    progress: {
      done: '主体结构已搭好，服务端可运行。',
      next: '继续补充玩法模块。',
    },
    fileTree: `numen/
├── numen-api/          ← API 模块
├── numen-fork/         ← 服务端 fork
├── numen-maven/        ← Maven 构建
├── config/             ← 配置（外置）
├── logs/
└── tools/`,
  },

  {
    slug: 'slg-game',
    name: 'SLG 战略原型',
    tagline: '建村令题材的策略游戏原型 · Unity',
    icon: '🏰',
    category: '游戏',
    status: '开发中',
    concept:
      '以「从一块建村令开始」为起点的发展类策略游戏原型，用来验证资源循环与建造节奏。',
    philosophy: '先用最小可玩的原型把核心循环跑通，再堆内容。',
    highlights: ['243 个 C# 脚本的原型规模', '完整的世界观与建筑设定文档'],
    tech: ['Unity', 'C#'],
    progress: {
      done: '核心循环原型可跑。',
      next: '整理模块结构，补玩法。',
    },
    fileTree: `从一块建村令开始/
├── Assets/
│   ├── Scripts/        ← 243 个 C# 脚本
│   └── Scenes/
└── Docs/`,
  },
]
