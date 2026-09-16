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
  /**
   * 上游来源说明。非原创项目必须写 —— 说明基于谁的项目做了什么，
   * 避免让人误以为是完全从零写的。
   */
  upstream?: string
  /**
   * 开发时间（用于时间线排版）。
   * 取值方式：有 git 用 git 首末提交，没有就用源码文件的修改时间范围。
   * 两者都可能是估算值 —— 别写成精确日期。
   */
  period?: {
    /** 起始 YYYY-MM-DD */
    start: string
    /** 结束 YYYY-MM-DD；缺省表示仍在进行 */
    end?: string
    /** 备注，比如「与 xxx 同期」 */
    note?: string
  }
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
  /** 项目截图（主图 + 缩略图条 + 全屏） */
  screenshots?: { image: string; caption: string; date?: string }[]
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
    period: { start: '2026-09-11', end: '2026-09-14', note: 'SOS 第三代 · 与 CS1.6 版同期收尾' },
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
    period: { start: '2026-09-08', end: '2026-09-11', note: 'SOS 第二代 · 紧接 CS2 版' },
    upstream: '服务端插件全部自研；机器人部分基于开源项目 YaPB 4.4.957 改写（13 文件 +1651 行）',
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
    tagline: '桌面 AI 创作伴侣 · LiyouDesk → LiyouMirage → Nook 同一条线',
    icon: '🌸',
    category: 'AI 应用',
    status: '先行版',
    period: { start: '2026-03-20', end: '2026-08-23', note: '前身 LiyouDesk（3.20 从零自主开发，1 天做出 MVP），后改名 Nook' },
    concept:
      '一个桌面 AI 伴侣：璃幽。它能聊天、陪创作（小说 / 世界观 / 灵感），但真正的核心是记忆——它记得你叫什么、喜欢什么、上次那个角色后来怎么样了。数据 100% 在本地，模型可以跑本地的 Ollama，也可以接云端。这条线从 2026-03-20 的 LiyouDesk 开始，改名为 LiyouMirage，后来又改名为 Nook；框架部分被抽成了 liyouForge。',
    philosophy:
      '陪伴这件事，难点不在模型多聪明，在它记不记得住。所以这个项目最厚的一层是记忆：分七层、每条给权重、不常用的自己衰减掉，想记的东西先挂起等你审核——不是让 AI 偷偷记你的一切。另外一条是本地优先：聊天记录、记忆、密钥都不出机器。',
    highlights: [
      '七层记忆：L0 灵魂（SOUL.md）· L1 主人模型（USER.md）· L2 羁绊瞬间 · L3 世界知识 · L4 情节日志 · L5 语义事实（MEMORY.md）· L6 技能 + 遗忘归档',
      '记忆会衰减也会强化：importance / reinforce / decay + 事实三元组，不常用的自己退场',
      '记忆审核：AI 想记的东西先进 pending 挂起，你逐条批了才算数',
      '数字分身：让它学一个人的说话方式（前端最大的一块，50 KB 单文件）',
      '一键切换本地 Ollama 与云端模型；本地数据 AES 加密，密钥走系统钥匙串',
      'SKILL.md 技能系统：人格 / 学习 / 开发三篇，按需加载，不塞进常驻提示词',
      'Tauri v2 打包，安装包几 MB，内存占用远低于 Electron',
      'Rust 层带 44.9 KB 测试（记忆 / 聊天 / LLM 三块）',
      '游戏化：灵光值、40+ 成就（7 类 + 稀有度）、会闹的小情绪',
      '这套记忆系统后来被移植进了 Numen（给 Minecraft AI 同伴用）',
      '同一条线走过三个阶段：LiyouDesk（3.20 从零自主开发，1 天做出 MVP）→ LiyouMirage → Nook',
    ],
    tech: ['Tauri v2', 'Rust', 'Vue 3', 'TypeScript', 'SQLite', 'Pinia', 'Element Plus', 'Ollama'],
    progress: {
      done: 'v0.7.0。Rust 后端 41 个文件 303 KB、前端 104 个文件；聊天、记忆、小说、世界观、灵感、数字分身、语音、设置全部接通。',
      next: '把记忆注入的预算调度再收紧，继续补世界知识的检索。',
    },
    architecture: [
      { layer: 'L0 灵魂', role: 'SOUL.md —— 璃幽的人格、语气、行为边界（隐私神圣 / 不替他做决定 / 外部操作必须确认）' },
      { layer: 'L1 主人模型', role: 'USER.md —— 称呼、兴趣、关系定位，由首次引导生成，之后在对话中逐步学习' },
      { layer: 'L2–L5 记忆', role: '羁绊瞬间 · 世界知识 · 情节日志 · 语义事实；带权重与衰减，想记的先挂起等审核' },
      { layer: 'Rust 后端', role: 'commands（IPC 命令层）→ services（业务）→ repository（SQLite）→ security（AES + 钥匙串）→ error（统一错误）' },
      { layer: 'Vue 前端', role: 'views / components / composables / stores / skills；所有 IPC 走统一的 ipcInvoke()' },
    ],
    scale: [
      { label: 'Rust 后端', value: '41 文件' },
      { label: 'Rust 代码', value: '303 KB' },
      { label: '前端文件', value: '104 个' },
      { label: '记忆层', value: '7 层' },
      { label: '后端测试', value: '44.9 KB' },
      { label: '版本', value: 'v0.7.0' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/jay0609/liyou-mirage' },
      { label: '世界观 · 书灵志', url: '/projects/liyou-mirage/lore' },
      { label: '次元星图', url: '/projects/liyou-mirage/world-map' },
    ],
  },

  {
    slug: 'minecraft-numen',
    name: 'Numen 扩展',
    tagline: '给开源的 Minecraft AI 同伴框架加记忆层与 31 个工具',
    icon: '🧠',
    category: 'AI 应用',
    status: '开发中',
    period: { start: '2026-08-18', end: '2026-09-01' },
    upstream: '基于 dwinovo 的开源项目 Numen（LGPL-3.0）做的扩展，不是从零写的项目',
    concept:
      'Numen 是 dwinovo 做的开源项目：把大模型塞进 Minecraft——让一个服务端假玩家（ServerPlayer）当身体，近三十个工具当手和眼，你说「挖一组铁回来」，它真的下矿、寻路、挥镐，回来还问你要不要熔了。我的工作是给它补上缺的那一块：记忆。再把工具从近三十个扩到五十多个。',
    philosophy:
      '上游把「身体、眼睛、双手」做得很完整，但同伴每次开聊都像第一次见你——不记得你是谁、上次干到哪、这个世界长什么样。所以方向不是塞更多上下文，而是分七层、给每层定额度、让不常用的自己衰减掉：2K 常驻 + 按任务临时拉，超了先蒸馏，再久就归档。',
    highlights: [
      '七层记忆架构：L0 灵魂 · L1 主人模型 · L2 羁绊瞬间 · L3 世界知识 · L4 情节日志 · L5 语义事实 · L6 技能 + 遗忘归档',
      '权重可算、会衰减：score = importance + reinforce + ln(1 + access) − decay，不常用的记忆自己退场',
      '注入预算 2K token 硬顶（persona 400 / owner 400 / bond 300 / 局势 300 / 弹性 600），不靠堆上下文',
      '语义蒸馏：把对话压成事实三元组写进 L5，原始日志归档',
      'Autonomy 自主性：不等指令也会自己安排事情；Diary 日记：同伴写自己的经历，只有主人能看',
      '新增 24 个工具 + 7 个任务：后勤（家 / 仓库 / 整理存储）· 生存（吃饭 / 治疗 / 武装）· 制造（逐格合成 / 熔炼）· 移动（跳跃 / 空中放置 / 堵水）· 勘测（区域扫描 / 场地勘察 / 蓝图导出）· 联网搜索 · 写日记',
      'ToolGroup / ToolSelector：工具从近三十个涨到五十多个后，按任务只挑相关的给模型，避免提示词爆炸',
      '给记忆系统补了 5 个测试：Distiller / MemoryScorer / MemoryStore / WorldKnowledge / Autonomy',
    ],
    tech: ['Java 17', 'Fabric', 'Forge', 'NeoForge', 'Gson', 'JUnit'],
    progress: {
      done: '两个仓库合计 58 个新增文件 + 57 个改动文件（numen-fork +875/−256，numen-api +474/−46），含七层记忆、自主性、日记与 24 个新工具，带 5 个测试。',
      next: '把记忆层接进 agent loop 的每轮注入，继续补齐世界知识的 12 个域。',
    },
    architecture: [
      { layer: '上游 · 身体', role: '服务端假玩家（ServerPlayer）—— 每个动作都走原生玩家代码路径，天然和红石 / 怪物 AI / 容器同一套规则' },
      { layer: '上游 · 眼睛与双手', role: '感知 API（扫方块 / 实体 / 配方，不开 GUI 透视机器内部）+ 行动 API（移动 / 挖掘 / 放置 / 战斗 / 容器）' },
      { layer: '新增 · 记忆层', role: 'L1 主人模型 · L2 羁绊瞬间 · L3 世界知识（12 域）· L5 语义事实 + 遗忘归档；2K 常驻 token 预算' },
      { layer: '新增 · 自主性', role: 'Autonomy —— 不等指令也会自己安排事情；Diary 记录它自己的经历' },
      { layer: '新增 · 工具扩展', role: '24 个新工具 + 7 个新任务；ToolGroup / ToolSelector 按任务筛选，控制提示词体积' },
    ],
    scale: [
      { label: '新增文件', value: '58 个' },
      { label: '改动文件', value: '57 个' },
      { label: '新增代码', value: '+1349 行' },
      { label: '新工具', value: '24 个' },
      { label: '记忆层', value: '7 层' },
      { label: '测试', value: '5 个' },
    ],
    links: [
      { label: '上游 · minecraft-numen', url: 'https://github.com/Dwinovo/minecraft-numen' },
      { label: '上游 · numen-api', url: 'https://github.com/Dwinovo/numen-api' },
    ],
  },

  {
    slug: 'slg-game',
    name: 'SLG 战略原型',
    tagline: '建村令题材的策略游戏原型 · Unity',
    icon: '🏰',
    category: '游戏',
    status: '开发中',
    period: { start: '2026-08-12', end: '2026-08-13' },
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

  {
    slug: 'slg-three-kingdoms',
    name: '三国式 SLG 单机',
    tagline: '46 城 · 行军制 · 结束回合 —— 三国志 11 式的单机策略',
    icon: '🏯',
    category: '游戏',
    status: '开发中',
    period: { start: '2026-07-24', end: '2026-07-28', note: '紧跟 SOS CS2 版' },
    concept:
      '一张 100×100 的地图，46 座城，从一座城开始打到统一。玩法照三国志 11 来：点主城弹出浮动菜单（出征 / 招募 / 升级 / 情报），出征是行军制而不是瞬移，行动完点「结束回合」交给 AI。跑在腾讯团结引擎上。',
    philosophy:
      '这个项目中途做了一次很硬的取舍：功能已经全跑通了（46 城、建筑前置、野怪营地、伤兵、天气、迷雾都在），但代码是 82 个文件互相 FindObjectOfType。于是推倒重写成三层——Backend 纯 C# 零 UnityEngine 引用、Frontend 只管显示、中间用 CommandBus 单向流转。视觉暂时退回方块，换来的是 44 个测试能跑。',
    highlights: [
      '三层分离：Backend（纯 C#，零 UnityEngine 引用）/ Frontend（Unity）/ Bridge（CommandBus）',
      '数据流单向：CommandBus → CommandValidator → System；View 只读 GameState，不直接调 System',
      '强类型 GameEventBus 取代旧的 string 事件总线；全局零 FindObjectsOfType',
      '路线重构后 Phase 1–6 完成，53 个文件 / 44 个测试 / 0 编译错误',
      '三国志 11 式交互：浮动菜单、行军制（路上会遭遇战）、结束回合制、敌兵限流',
      '46 城 + 21 种建筑 + 45 条等级前置规则；3 兵种带克制',
      '4 类资源节点（农场 / 矿场 / 林场 / 金矿，L1–L5）+ 10 级野怪营地（流寇 → 叛军帝都）',
      '伤兵系统、粮草消耗、天气、迷雾、随机事件（丰收 / 疫病 / 山贼 / 援军）',
      '像素风：32×32 城池 / 16×16 士兵 / 8 种地形 × 4 变体（确定性选变体打破重复感）',
    ],
    tech: ['团结引擎 1.9.3', 'C#', 'Unity 2022.3', 'A* 寻路', 'Tilemap'],
    progress: {
      done: '旧版功能完整可玩（招募→出征→行军→AI 对战→攻城→占城→统一）；新版三层架构 Phase 1–6 完成，44 个测试通过、零编译错误，画面用方块占位。',
      next: '把 Frontend 显示层重新接到新架构上，恢复像素风视觉。',
    },
    architecture: [
      { layer: 'Backend', role: '纯 C#，零 UnityEngine 引用 —— Data（配置表 / 模型）/ Systems（移动 / 战斗 / 经济 / AI）/ Bridge（CommandBus + 事件）' },
      { layer: 'Bridge', role: 'CommandBus → CommandValidator → System 单向流；GameEventBus 强类型事件；EventHistory 环形队列' },
      { layer: 'Frontend', role: 'Unity 侧 —— Bootstrap / Input / Views / Sync（GameStateRenderer）/ UI（HUD / 面板 / 日志）' },
      { layer: 'Tests', role: 'Phase 1–6 集成测试，覆盖骨架 → 地图 → 寻路 → 行为系统 → 全流程统一' },
      { layer: '数据表', role: 'TerrainDataTable（8 地形）· TroopDataTable（3 兵种 + 克制）· BuildingDataTable（20 建筑 + 45 前置）· CityDataTable（46 城）' },
    ],
    scale: [
      { label: '代码文件', value: '53 个' },
      { label: '集成测试', value: '44 个' },
      { label: '地图', value: '100×100' },
      { label: '城池', value: '46 座' },
      { label: '建筑', value: '21 种' },
      { label: '开发阶段', value: 'P1–P6' },
    ],
  },

  {
    slug: 'sos-zombie-cs2',
    name: 'SOS 军团 · CS2 版',
    tagline: '把 CS1.6 的西南僵尸服，第三代移植到 CS2',
    icon: '🧟',
    category: '游戏工具/插件',
    status: '开发中',
    period: { start: '2026-07-19', end: '2026-07-23', note: 'SOS 第一代 · 7 月连做三个项目的第一枪' },
    concept:
      '同一个 SOS 军团的第三代：最早是 CS1.6 的 AMXX 插件，后来移植到 Zombie Plague 5.0.8a，这一代用 C# 重写跑在 CS2 上（CounterStrikeSharp 框架）。8 种模式、13 种僵尸职业、21 件道具、16 项人类技能，内容全部放 JSON 里，改数值不用重新编译。',
    philosophy:
      '插件写大了最容易烂在「一改数值就要重编译」和「逻辑和配置搅在一起」。所以这一代坚持两件事：一是能配的都进 JSON（config.json 74 项、zombies.json 13 条、shop_items.json 21 条），二是道具走三层——定义层只管数据、应用层只管效果、协调层只管流程，谁都不越界。',
    highlights: [
      '从 AMXX（Pawn）→ Zombie Plague → CounterStrikeSharp（C#）的第三代移植',
      '8 种游戏模式：普通感染 · 群体感染 · 复仇之神 · 幸存者 · 军团 · 超级英雄对抗（末日）· 极限 · 阵营对抗',
      '13 种僵尸职业 + 16 项人类技能树（满级 110 点，K 键加点，每局免费重置 1 次）',
      '道具系统三层架构：定义层（纯数据）/ 应用层（效果）/ 协调层（流程）',
      '全武器接管引擎伤害：弹匣 / 备弹 / 后坐力 / 精度 / 击退系数 / 部位乘数 / 技能与道具叠加',
      '内容全部 JSON 化：config.json 74 项 · zombies.json 13 条 · shop_items.json 21 条',
      '玩家数据持久化到 SQLite：SteamID + 时长 + VIP 等级 + 累计数据',
      '身份权限分四级：OP / SVIP / VIP(1-10) / 普通',
      '自定义菜单用 WasdMenu 屏幕中央数字直选，不依赖 CS2 原生菜单',
    ],
    tech: ['C#', 'CounterStrikeSharp', 'SQLite', 'CS2'],
    progress: {
      done: 'v4.0.0。Core / Combat / Modes / Skills / Shop / Menus / Economy / Permissions / Database / Audio 十个模块全部落地；伤害、击退、感染、模式、商店、技能树、武器接管已实现。',
      next: '继续补道具效果与应用层，把旧手雷管理器的遗留逻辑清干净。',
    },
    architecture: [
      { layer: 'Core', role: 'GameState 全局状态 · PlayerData 唯一权威数据源 · ConfigManager 配置加载 · BotManager · InfectionSystem · GameLoop 回合主循环' },
      { layer: 'Modes', role: '8 种模式的规则实现（都是 partial class SOSZombie 的一部分）+ GameModes 统一切换' },
      { layer: 'Combat', role: 'DamageSystem 伤害（读技能倍率）· KnockbackSystem 击退（武器系数 × 部位 × 抗性）· WeaponCustomizer 全武器接管' },
      { layer: 'Skills / Shop', role: '16 项技能树 + 道具三层架构（定义 / 应用 / 协调）' },
      { layer: 'Grenades / Economy / Database', role: '魔法手雷（纯叠加，不杀原生实体）· 弹药袋 + 经验 · SQLite 持久化' },
      { layer: 'Menus / Help / Audio / Permissions', role: 'WasdMenu 各面板 · 新手引导 · 音效 · 四级身份权限' },
    ],
    scale: [
      { label: '代码文件', value: '39 个' },
      { label: '僵尸职业', value: '13 种' },
      { label: '游戏模式', value: '8 种' },
      { label: '道具', value: '21 件' },
      { label: '配置项', value: '74 项' },
      { label: '版本', value: 'v4.0.0' },
    ],
  },
]
