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
    slug: 'csgo-soszombie',
    name: 'CS1.6 SOS 僵尸服',
    tagline: '把星河 SOSZOMBIE 移植到 ZP 5.0.8a · AMXX 插件',
    icon: '🎯',
    category: '游戏工具/插件',
    status: '已发布',
    concept:
      'CS1.6 的 SOSZOMBIE 是星河网络基于 Zombie Plague 4.3 改的僵尸服。这个项目把它移植到 ZP 5.0.8a 基座上，并重写了整套升级/技能系统，跑在自己的实时服上。',
    philosophy:
      '单人维护一个服的插件，最怕的是「一个文件 1600 行」。所以核心思路是拆模块 + 用 native 通信：状态只有一份，其他模块通过接口访问。',
    highlights: [
      '把 1636 行的单文件拆成 Core / Menu / Combat 三层模块',
      '状态集中在 Core，Menu 与 Combat 通过 native 访问',
      '技能体系：经验 / 等级 / 技能点 / 四分类加点 / 存档',
      '母体僵尸机制、手雷模式、武器系统、倒计时独立成模块',
    ],
    tech: ['Pawn', 'AMX Mod X 1.8.1', 'Zombie Plague 5.0.8a'],
    progress: {
      done: '全部模块已编译部署到实时服，加载无报错；母体僵尸与燃烧/冰冻手雷已实测。',
      next: '继续对齐真人僵尸与 AI 僵尸的行为逻辑。',
    },
    architecture: [
      { layer: 'Core', role: '技能数据 + 经验/等级/技能点数组 + 加点逻辑 + 全部 native' },
      { layer: 'Menu', role: '菜单 / 存档(Trie) / HUD / 按键绑定' },
      { layer: 'Combat', role: '战斗被动：伤害、吸血、减伤、反伤、冰冻、燃烧、暴击…' },
      { layer: 'addon', role: 'BOT 自动升级，通过 Core 的 native 接入，无需改动' },
    ],
    fileTree: `addons/amxmodx/scripting/
├── include/
│   ├── zq_sos_core.inc          6.0 KB   ← 共用枚举 + native 声明
│   ├── zq_sos_combat.inc        0.9 KB
│   └── zq_sos_items.inc         0.5 KB
├── ZQ_SOS_Level.sma            51.7 KB   ← 最大模块
├── ZQ_SOS_Combat.sma           29.2 KB   ← 战斗被动
├── zq_sos_nademodes.sma        29.2 KB   ← 手雷模式
├── ZQ_SOS_Core.sma             27.5 KB   ← 状态唯一来源
├── ZQ_SOS_Menu.sma             18.8 KB   ← 菜单 / 存档 / HUD
├── ZQ_SOS_Weapon.sma           15.0 KB
├── ZQ_SOS_Mother.sma           11.7 KB   ← 母体僵尸
├── zq_sos_zombie_charge.sma     6.2 KB
└── zq_sos_countdown.sma         1.2 KB`,
    scale: [
      { label: '插件模块', value: '9 个' },
      { label: 'Pawn 源码', value: '约 200 KB' },
      { label: '最大单文件', value: '51.7 KB' },
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
