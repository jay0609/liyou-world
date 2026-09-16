/**
 * 由 scripts/convert-content.cjs 自动生成
 * 编辑请改 content/files/verge-of-the-firmament.json
 */
import type { ProjectFiles } from './types'

const data: ProjectFiles = {
  "slug": "verge-of-the-firmament",
  "sections": [
    {
      "id": "main",
      "title": "Assets",
      "root": "Assets",
      "total": 214,
      "files": [
        {
          "path": "Assets/_Project/Scripts/Data/Calculators/AIEconomy.cs",
          "title": "AI 城经济（Phase21）— 与玩家同规则的收入/成本计算。",
          "desc": "玩家公式对照： ProductionCalculator.GetCityProduction（建筑产出 × 宫殿港口 × 科技 × 灌溉渠 × 原矿民意 + 税收） 差异点：AI 科技倍率读 city.AITechLevels（AITechHelper），无领主天赋（AI 无武将）。 收入/消耗全部 city 级（不依赖 WorldState 全局科技），供 AIBrain 每 tick 结算。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Calculators/CombatCalculator.cs",
          "title": "统一战斗计算器 — 战力/城防/陷阱/胜负的单一公式来源。",
          "desc": "所有战斗场景（出征打营地/掠夺/守城/AI攻/玩家攻）共用这里， UI 战力预览与实际结算永远一致。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Calculators/EquipmentCalculator.cs",
          "title": "领主装备加成计算器 — 词条（兵种级/兵团级）+ 套装（2/4/6/8件同兵种）。",
          "desc": "加成返回攻/防/命百分比，CombatCalculator 读取。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Calculators/HeroCalculator.cs",
          "title": "武将统一计算器 — 属性加成/专属增幅/带兵上限/经验曲线/升级逻辑的单一公式来源。",
          "desc": "收敛：CombatSystem+CombatCalculator 的属性加成双副本、HeroSystem+RebellionSystem 的升级逻辑双副本、 带兵上限（DispatchUI/Dispatch/CommandValidator）三处散点。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Calculators/LootCalculator.cs",
          "title": "掉落统一计算器 — 营地/击杀掉落的单一公式来源。",
          "desc": "收敛：RebellionSystem.AttackCamp 掉落、CombatSystem.KillSoldier 击杀碎片、双倍/三倍概率。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Calculators/TimeCalculator.cs",
          "title": "时间统一计算器 — 所有\"时间/速度\"加成的唯一公式来源。",
          "desc": "每个速度类型一个汇总函数（科技/建筑/天赋/技能全汇入）， UI 显示与实际结算都走这里 → 永远一致。 出口：建造/训练/研究/医疗/采集/行军。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/AIPersonalityConfig.cs",
          "title": "AI 性格配置 — 每性格一组\"行为偏好\"：发展序（建筑）/ 科技序 / 兵种偏好（训练池）。",
          "desc": "决策第二级（升级建筑/研究科技/征兵）按城性格取对应序 → 每城朝不同方向进化。 纯配置，AI 城持 AIArchetype 引用其一（已在存档）。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/AITechHelper.cs",
          "title": "AI 独立科技查询 — AI 城持有自己的 AITechLevels，研究效果只影响 AI（士兵烘焙/建筑发展/陷阱安装）。",
          "desc": "玩家侧 4 大出口读全局 TechLevels，不受 AI 研究影响。 倍率公式与玩家一致（ResearchConfig.PerLevelValue），仅数据源不同（city.AITechLevels vs world.TechLevels）。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/BuildingCategoryMap.cs",
          "title": "BuildingCategory",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/BuildingDataTable.cs",
          "title": "BuildingDataTable",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/BuildingProductionTable.cs",
          "title": "GoT 式建筑产量表 — 每小时产量 + 建筑储量上限（用户提供农田 Lv1-40 完整数据）。",
          "desc": "实时制换算：每秒 = 每小时 ÷ 3600。 农田数值（用户 2026-08-05 提供）：Lv1=200/时 → Lv40=200000/时；上限=产量×10。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/BuildingSlotConfig.cs",
          "title": "建筑配置 — GoT式\"固定核心建筑 + 可选建筑池\"。",
          "desc": "核心建筑（8种）：始终存在、不可拆除。 可选建筑（15种）：全部可建造，通过前置建筑链/宫殿等级分批解锁，可拆除（返还50%）。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/BuildingUpgradeCost.cs",
          "title": "BuildingUpgradeCost",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/BuildingValidator.cs",
          "title": "BuildingValidator",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/CityDataTable.cs",
          "title": "CityDataTable",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/CityDefenseConfig.cs",
          "title": "陷阱定义（用户 2026-08-06 提供完整属性：战力/攻/防/命/克制兵种）",
          "desc": "public struct TrapDef { public TechId UnlockTech;   // 解锁科技 public string Name; public string Description; public float Attack;        // 攻击 public float Defense;       // 防御 public float HP;            // 生命 public float Power;         // 战力（展示/结算用） public TroopType? CounterTroop; // 克制兵种（骑兵/步兵/枪兵；null=无） public int Tier;            // 阶（1初级/2中级/3高级/4终极） public int CostStone;       // 制造费（石，器械回收修复/重建用） public int CostIron;        // 制造费（铁） } <summary> 城防配置 — 《凛冬将至》式。 攻城结算链：陷阱战 → 城墙战 → 驻军战（前排优先损耗，弓兵后排）。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/EquipmentConfig.cs",
          "title": "领主装备配置 — 品质规则/词条数值/套装/升级消耗。",
          "desc": "public static class EquipmentConfig { <summary>装备最高等级</summary> public const int MaxEquipLevel = 60; <summary>品质词条数（主+副）：白1/绿1/蓝2/紫3/金4</summary> public static int GetAffixCount(EquipmentRarity r) => r switch { EquipmentRarity.White => 1, EquipmentRarity.Green => 1, EquipmentRarity.Blue => 2, EquipmentRarity.Purple => 3, _ => 4, // Gold }; <summary>品质数值倍率：白1/绿1.5/蓝2/紫3/金4</summary> public static float GetRarityMult(EquipmentRarity r) => r switch { EquipmentRarity.White => 1f, EquipmentRarity.Green => 1.5f, EquipmentRarity.Blue => 2f, EquipmentRarity.Purple => 3f, _ => 4f, // Gold }; <summary> 词条数值（百分比）= 品质倍率 × 基础 + 每级成长 × (等级-1)。 用户数据校准：金攻击词条 Lv1=7.5% → Lv20=15.5% → Lv30=19.5%（每级+0.4%）。 反推：金=倍率4 → 基础=7.5/4=1.875，成长=0.4/4=0.1（白每级+0.1%）。 防御=攻击×0.8，生命=攻击×3。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/EquipmentFactory.cs",
          "title": "EquipmentFactory",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/GameConfig.cs",
          "title": "GameConfig",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/HeroConfig.cs",
          "title": "武将配置表 — 48名武将（4兵种 × 12名），古风名（非历史人物）。",
          "desc": "酒馆统一招募；叛军掉落碎片（区域分布决定刷碎片路线）。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/HeroRarityConfig.cs",
          "title": "武将品质配置 — 初始属性范围、属性上限、招募概率。",
          "desc": "品质越高：初始属性越高、属性上限越高、招募越稀有。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/ItemConfig.cs",
          "title": "ItemDef",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/LordSkillConfig.cs",
          "title": "LordSkillDef",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/MapColors.cs",
          "title": "MapColors",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/PortTradeConfig.cs",
          "title": "港口交易配置 — 锚定式汇率。",
          "desc": "核心：1 分钟加速价值 = 港口等级 × 500 资源（Lv1=500 / Lv2=1000 / Lv3=2000）。 资源↔道具按此汇率换算，产出价值 = 消耗价值 × (1 - 损耗)，损耗 Lv1 20% / Lv2 15% / Lv3 10%（铁额外+10%）。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/ProductionCalculator.cs",
          "title": "全局产出公式计算器 — 所有资源产出/增幅的单一公式来源（Single Source of Truth）。",
          "desc": "EconomySystem.Tick、TopBar 全局栏、城池信息栏、建筑视图全部调用这里。 保证\"显示什么 = 实际产出什么\"。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/RegionConfig.cs",
          "title": "RegionConfig",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/ResearchConfig.cs",
          "title": "单个科技节点定义（通用）",
          "desc": "public struct ResearchNodeDef { public TechId Id;               // 科技ID public string Name;             // 科技名 public string Description;      // 效果描述 public int MaxLevel;            // 最大等级（1=解锁型，10=数值型） public float PerLevelValue;     // 每级数值（百分比或绝对值，随 EffectType 解释） public TechEffectType EffectType; // 效果类型（用于解释 PerLevelValue） public int CostPoints;          // 基础研究点消耗（每级递增，当前未用） public int CostIron;            // 基础铁消耗（每级递增，当前未用） public float Duration;          // 基础研究时间（秒，每级递增） public TechId? Requires;        // 前置科技（null=无，前置由用户后定） public int RequiresLevel; public TechId? Requires2; public int Requires2Level; public TechId? Requires3; public int Requires3Level; } <summary>科技效果类型 — 决定 PerLevelValue 如何解释</summary> public enum TechEffectType { PercentAdd,     // 百分比加法：每级 +PerLevelValue% FlatAdd,        // 绝对值加法：每级 +PerLevelValue Unlock,         // 解锁：MaxLevel=1，研究完成解锁 } <summary> 科技树配置 — 三层分类结构（分类→子类→科技）。 士兵：三围档（4兵种×攻防命×9档，每档10级每级+1%）+ 兵种解锁（Lv2-10）。 分档（用户 2026-08-07）：产量/容量/速度分档递增，档N加成 > 档N-1。 前置全部取消（用户后定）。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/TalentConfig.cs",
          "title": "TalentDef",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/TerrainDataTable.cs",
          "title": "TerrainDataTable",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Configs/TroopDataTable.cs",
          "title": "TroopDataTable",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/AIEnums.cs",
          "title": "AIArchetype",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/BuildingType.cs",
          "title": "BuildingType",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/EquipmentEnums.cs",
          "title": "EquipmentType",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/HeroAttribute.cs",
          "title": "HeroAttribute",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/HeroRarity.cs",
          "title": "武将品质 — 决定初始属性、属性上限、成长潜力。",
          "desc": "白(普通) → 绿(精英) → 蓝(稀有) → 紫(史诗) → 金(传说) 品质可通过碎片升级（后续系统）。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/ItemType.cs",
          "title": "道具分类",
          "desc": "public enum ItemCategory { Speed,      // 加速类（万能/兵营/研究/医院） Resource,   // 资源类（小/中/大额） Shard,      // 碎片类（万能碎片 + 锻造经验） } <summary>加速卡子类（作用对象）</summary> public enum SpeedCategory { All,        // 万能：建造/研究/训练/治疗 任一 Train,      // 兵营：只减训练 Research,   // 研究：只减研究 Heal,       // 医院：只减治疗 } <summary>资源包档位</summary> public enum ResourceTier { Low,        // 低级 500 Mid,        // 中级 2000 High,       // 高级 5000 M50,        // 5万 M100,       // 10万 M150,       // 15万 M200,       // 20万 M1,         // 100万 M1_5,       // 150万 M2,         // 200万 M5,         // 500万 M10,        // 1000万 M20,        // 2000万 M5000,      // 5000万 } <summary> 道具类型 — 分类前缀：Speed 加速 / Res 资源 / Frag 碎片。 加速：SpeedAll_万能 / SpeedTrain_兵营 / SpeedResearch_研究 / SpeedHeal_医院，后缀=分钟数。 资源：Res{档}_{资源}。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/LordSkillType.cs",
          "title": "领主技能类型 — 战争类（用户 2026-08-05 提供）。",
          "desc": "一次性 buff 技能（单次救援/步兵守护等）在发动时置位 PlayerState.PendingBattleFlags， 下次出征（MovementSystem.Dispatch）时消耗；时长型（兵团扩编/征服之眼）写 ArmyCapBonus。 待开放：集结扩编/比武决斗/阻截（依赖集结/主堡/PvP 系统，占位）。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/MapRegion.cs",
          "title": "地图区域 — 玩家左下角起家，逐区征服。",
          "desc": "区域决定：地形倾向（视觉/行军难度）、城池命名风格、AI 势力归属。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/NodeType.cs",
          "title": "NodeType",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/ResourceType.cs",
          "title": "ResourceType",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/SeasonType.cs",
          "title": "SeasonType",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/SoldierState.cs",
          "title": "SoldierState",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/TalentId.cs",
          "title": "领主天赋 ID — 内政分支（用户 2026-08-05 提供）。",
          "desc": "前置链（点 1 级解锁下一项）： 建筑1 → 研究1 → {农业1,石工1,林业1,治铁1} → 铸币1 → {农业2,治铁2} → 负重1 → 采集1 → {林业2,铸币2} → 建筑2 → 学士研究 → 采集2 → 负重2 → {农业3,石工3,林业3,治铁3} → 铸币3"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/TechId.cs",
          "title": "科技ID枚举 — 三层分类结构（分类→子类→科技）。",
          "desc": "分类：Troop_士兵 / ResProd_资源产量 / ResCap_资源容量 / Speed_速度 / Def_城墙城防 / Misc_其他。 士兵规则：每级兵种一套三围档（1-9），三围每档10级每级+1%；兵种解锁 Unlock 型（Lv2-10）。 分档规则（用户 2026-08-07）：资源产量/容量/速度分档递增（档N加成 > 档N-1），每档10级。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/TerrainType.cs",
          "title": "TerrainType",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Enums/TroopType.cs",
          "title": "TroopType",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/GameLog.cs",
          "title": "GameLogCategory",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/GameState.cs",
          "title": "GameState",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/AIQueueItem.cs",
          "title": "AIBuildItem",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/BanditCampModel.cs",
          "title": "BanditCampModel",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/BattleReportRecord.cs",
          "title": "战斗参与方兵力明细（兵种 → 数量 + 战力）",
          "desc": "[System.Serializable] public struct BattleForce { public string Name;          // 方名（如 \"寒松军\" / \"玩家·洛阳\"） public int TotalCount;       // 总兵力 public float TotalPower;     // 总战力 public int Dead;             // 阵亡 public int Wounded;          // 伤兵（进医院） public string Detail;        // 兵种构成文本（\"步兵×10 枪兵×5\"） } <summary> 详细战斗战报（事件日志点击查看）— 记录一次攻城的完整过程。 由 SiegeSystem.AttackCity / RevengeLootCity 结算时构造，存 WorldState.BattleReports。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/CityDefenseModel.cs",
          "title": "陷阱修复队列项（对标医院治疗队列：花资源后计时恢复）",
          "desc": "[System.Serializable] public struct TrapRepairItem { public int TrapId; public float RemainingSeconds; // 剩余修复时间 } <summary> 城防状态 — 已研究陷阱 + 已安装陷阱 + 城墙耐久 + 损坏器械。 研究解锁 ≠ 安装生效：研究获得全城通用资格，安装受城墙器械容量限制。 守城陷阱战后：被摧毁陷阱按器械回收科技比例进入损坏池（可修复，对标医院伤兵）。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/CityModel.cs",
          "title": "CityModel",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/HealItem.cs",
          "title": "治疗项 — 医院治疗队列中的一批伤兵。",
          "desc": "HealWounded 花资源后入队，计时恢复（急救术缩短治疗时间）。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/HeroModel.cs",
          "title": "武将（英雄）数据结构 — 简化版。",
          "desc": "只保留：武力（部队ATK加成）、统率（带兵上限+DEF）、等级/经验/属性点。 装备槽预留（后续装备系统接入），无技能/谋略/忠诚。 品质 Rarity 决定初始属性与属性上限。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/InventoryItem.cs",
          "title": "InventoryItem",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/LordEquipment.cs",
          "title": "EquipmentAffix",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/MapModel.cs",
          "title": "MapModel",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/MapTileData.cs",
          "title": "MapTileData",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/ResourceNodeModel.cs",
          "title": "ResourceNodeModel",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/RespawnItem.cs",
          "title": "重生项 — 资源点/叛军营地被清除后，随机地点刷新的调度。",
          "desc": "资源点：采完 → 120s 后同区域随机格刷新（等级=区域等级，总数受控）。 营地：被杀 → 120s 后随机地点刷新（总数受控）。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/SoldierModel.cs",
          "title": "SoldierModel",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/Models/WoundedTroop.cs",
          "title": "伤兵批次（医院收容）— 按兵种+等级聚合。",
          "desc": "出征战损：损失中 40% 阵亡、60% 转伤兵进医院。 治疗消耗 = 每伤兵该兵种等级生产成本的 10%。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/PlayerState.cs",
          "title": "PlayerState",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Data/TalentEffectHelper.cs",
          "title": "领主天赋效果查询 — 各系统从这里读取天赋加成。",
          "desc": "数据源：PlayerState.Talents（TalentId → 等级）。 效果：建造/研究速度、产量（金粮木石铁）、负重、采集速度。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/TechEffectHelper.cs",
          "title": "科技效果查询 — 各系统从这里读取科技加成。",
          "desc": "数据源：WorldState.TechLevels（TechId → 等级）。 放 Data 层（只读数据，供 Logic 层系统使用）。 三层结构：士兵（三围档+解锁）/资源产量/资源容量/速度/城墙城防/其他。"
        },
        {
          "path": "Assets/_Project/Scripts/Data/WorldState.cs",
          "title": "WorldState",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Commands/CityCommands.cs",
          "title": "RecruitCommand",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Commands/GameCommands.cs",
          "title": "SetSpeedCommand",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Commands/ICommand.cs",
          "title": "ICommand",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Commands/LordCommands.cs",
          "title": "CastLordSkillCommand",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Commands/ResearchCommands.cs",
          "title": "StartTechResearchCommand",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Commands/UnitCommands.cs",
          "title": "TroopCount",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Events/CityEvents.cs",
          "title": "BuildingUpgradedEvent",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Events/CombatEvents.cs",
          "title": "UnitAttackEvent",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Events/EventBus.cs",
          "title": "强类型事件总线 — pub/sub 模式。",
          "desc": "System 间解耦：MovementSystem 不直接调用 CombatSystem， 而是通过 EventBus 发出事件，CombatSystem 订阅。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Events/EventHistory.cs",
          "title": "EventHistory",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Events/GameEvents.cs",
          "title": "GameVictoryEvent",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Events/IGameEvent.cs",
          "title": "IGameEvent",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Generators/BanditPlacer.cs",
          "title": "BanditPlacer",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Generators/CityPlacer.cs",
          "title": "CityPlacer",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Generators/MapGenerator.cs",
          "title": "MapGenerator",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Generators/ResourcePlacer.cs",
          "title": "ResourcePlacer",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Infrastructure/BattleLogRecorder.cs",
          "title": "BattleLogRecorder",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Infrastructure/CommandBus.cs",
          "title": "命令总线 — Tick制，收到命令后立即校验+路由执行（无回合暂存）。",
          "desc": "负责 Wire（注入）所有 System。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Infrastructure/IdGenerator.cs",
          "title": "IdGenerator",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Infrastructure/IStatefulSystem.cs",
          "title": "持有 GameState 引用、读档后需要重绑状态的可变系统标记接口。",
          "desc": "GameBootstrap 统一收集实现此接口的系统，读档时一次性调用 SetState， 避免\"新增系统后忘记加入 SetGameState 手动列表\"导致的旧状态引用 bug。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Infrastructure/TutorialSystem.cs",
          "title": "TutorialSystem",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Infrastructure/WorldClock.cs",
          "title": "世界时钟 — Tick制 RTS 的时间驱动核心。",
          "desc": "替代回合制的 TurnSystem，所有 System 通过它获取游戏内 deltaTime。 Bind(WorldState) 后：ElapsedTime/IsPaused/SpeedMultiplier 直接读写 WorldState（单轨，避免存档漂移）。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Read/CommandValidator.cs",
          "title": "CommandValidator",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Utils/AStarPathfinder.cs",
          "title": "A*寻路 — 8方向 + 地形代价注入 + 路径重构。",
          "desc": "Tick制 RTS 核心工具，Backend 程序集纯 C#，零 Unity 依赖。 使用方式： var path = AStarPathfinder.FindPath(map, sx, sy, tx, ty, (x, y) => TerrainDataTable.Data[map.GetTile(x, y).Terrain].MoveCost);"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Utils/LanchesterBattle.cs",
          "title": "兰彻斯特平方律战损结算。",
          "desc": "战力 ∝ 兵力²（质量 = 单兵战力）。 攻方生存比例 = √(攻方战力/守方战力)；守方损失比例 = 攻方战力/守方战力。 用于宏观集群战结算；逐兵对砍的小规模战斗不走此模块。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Utils/MathUtils.cs",
          "title": "战斗/行军通用数学工具",
          "desc": "public static class MathUtils { <summary>基础伤害计算</summary> public static float CalcBaseDamage(float atk, float def) { return Math.Max(1f, atk * (100f / (100f + def))); } <summary>兵种克制修正</summary> public static float CalcCounterDamage(float baseDamage, bool isCounter) { return isCounter ? baseDamage * Game.Data.Configs.GameConfig.CounterMultiplier : baseDamage; } <summary>Clamp 到范围</summary> public static float Clamp(float value, float min, float max) { return value < min ? min : value > max ? max : value; } <summary>两点间欧氏距离</summary> public static float Distance(int x1, int y1, int x2, int y2) { return (float)Math.Sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)); } <summary> GoT 行军时间公式：耗时 = 欧氏距离 × 140 / 速度 + 0.5。 步兵速度 20 → 紧挨 1 格 ≈ 7.5s（GoT 实测 8s）；对角 1.414 → ≈10.4s（实测 10s）。 speedMult = 科技加速倍率（寻路术等，>1 加快）。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/AI/AIActions.cs",
          "title": "AIBrain",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/AI/AIBrain.cs",
          "title": "AI 大脑 — 核心：状态 / 每帧经济结算 + 时间队列推进 / 每城错峰决策。",
          "desc": "架构拆分（用户 2026-08-09）：AIWeights.cs（权重决策）/ AIActions.cs（动作执行+威胁）/ AIQueues.cs（时间队列）/ AISituation.cs（局势查询+工具）。 - 每 AIDecisionInterval(30s) 每座 AI 城做 ONE 动作决策（权重表 + 加权随机，各城错峰） - AI 与玩家同规则：真实收入 + 真实成本 + 真实时间队列（建造/研究/训练） - 性格（随机 archetype）修正权重；跨 tick 意图（侦查→评估→行动） - 威胁覆盖：玩家兵逼近 → 强制防御；保留 AI 互打 / 掠夺 Warning 日志 / 喘息期"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/AI/AIQueues.cs",
          "title": "AIBrain",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/AI/AIScheduler.cs",
          "title": "AI 调度器 — Tick制，分帧从队列取任务并路由到 CommandBus 执行。",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/AI/AISituation.cs",
          "title": "AIBrain",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/AI/AITaskQueue.cs",
          "title": "AITaskPriority",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/AI/AIWeights.cs",
          "title": "AIBrain",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/BuildingConstructionQueue.cs",
          "title": "BuildQueueItem",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/BuildingSystem.cs",
          "title": "建筑系统 — 建筑 CRUD（建造/升级/拆除）+ 建造队列（每城 1 并发，工坊/科技加速）。",
          "desc": "从 EconomySystem 抽离，专注建筑；EconomySystem 专注资源/治安/人口/军饷/粮耗。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/CampBattleSystem.cs",
          "title": "打营地系统 — 玩家征伐叛军营地（零战损 + 精力消耗 + 掉落）。",
          "desc": "从 RebellionSystem 拆出，专注打营地战斗/精力/掉落。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/ClusterBattle.cs",
          "title": "集群战斗结算中心 — 委托给 CombatCalculator（Data 层统一公式）。",
          "desc": "保留现有调用点签名，内部全部走统一计算器，保证 UI 预览与实际一致。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/CombatSystem.cs",
          "title": "战斗系统 — Tick制 RTS 自动交战。",
          "desc": "三个入口： · ResolveAttack(cmd)  — 士兵 vs 士兵（玩家手动/遭遇自动触发） · ResolveSiege(cmd)   — 士兵 vs 城池 · Tick(dt)            — 自动交战冷却驱动"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/EconomySystem.cs",
          "title": "经济系统 — Tick制，每秒产出资源 + 税收 + 人口增长 + 治安漂移。",
          "desc": "建筑 CRUD/建造队列已抽离到 BuildingSystem。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/FogOfWarLogic.cs",
          "title": "战争迷雾逻辑 — Tick制。",
          "desc": "基于己方城池+士兵位置计算圆形视野，填充 VisibilityGrid。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/GatherSystem.cs",
          "title": "采集系统 — 队伍协同采集。",
          "desc": "到达采集点后\"驻军+采集\"：整队共享采集速率，按公式计时装满，时间到自动返回。 采集速率 = 单兵负重 × (节点等级 + 1) / 同节点兵数 装满时间 = 兵数 / (等级 + 1) 秒（各兵种一致），带回总量 = 兵数 × 负重"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/HeroExpService.cs",
          "title": "武将经验服务 — 集群战经验公共逻辑（读写分离：经验发放独立）。",
          "desc": "从 RebellionSystem 拆出，SiegeSystem/ClusterBattle 共用。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/HeroSystem.cs",
          "title": "武将系统 — 简化版。",
          "desc": "Tick: 驻城训练经验 → 升级。 属性加成由 CombatSystem 查询（武力→ATK，统率→DEF+带兵上限）。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/IronForgeSystem.cs",
          "title": "领主装备系统（铁匠铺）— 抽奖/升级/分解/穿戴。",
          "desc": "装备词条：兵种级（仅该兵种）+ 兵团级（全兵种）攻防命。 经验道具：分解装备获取（品质越高经验越多），升级装备消耗原矿+金+经验。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/ItemSystem.cs",
          "title": "道具系统 — 使用背包道具（分类：加速/资源/碎片）。",
          "desc": "资源包 → 补对应资源；碎片袋 → 补万能碎片。 加速卡按子类：万能=建造/研究/训练/治疗任一生效；兵营=只减训练；研究=只减研究；医院=只减治疗。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/LordSystem.cs",
          "title": "领主系统 — 玩家个人页面核心（经验/军工/天赋/技能）。",
          "desc": "经验：刷叛军/做任务得（任务系统后续）；军工：击杀敌方士兵按等级。 技能：战争类，免费发动 + 独立冷却；一次性 buff 置位 PlayerState.PendingBattleFlags（下次出征消耗）。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/MovementSystem.cs",
          "title": "行军系统 — 时间计算制（GoT式）。",
          "desc": "士兵不用逐格移动，而是：距离/移速 = 行军时间，到时到位。 状态机：Idle → Marching(去) → Gathering/Attacking → Marching(回) → Idle。 行军途中不可交战，可选中可撤退。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/PortTradeSystem.cs",
          "title": "港口交易系统 — 锚定式兑换。",
          "desc": "汇率：1 分钟加速 = 港口等级 × 500 资源。 每小时刷新 3-4 个随机配方；兑换扣资源给道具。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/RebellionSystem.cs",
          "title": "叛军系统 — 营地生命周期 + 治安攻城 + 精力恢复。",
          "desc": "读写分离：攻城/报复 → SiegeSystem，打营地 → CampBattleSystem，经验 → HeroExpService。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/RecruitmentSystem.cs",
          "title": "征兵时间队列项",
          "desc": "public struct RecruitQueueItem { public int CityId; public TroopType TroopType; public int Count; public float RemainingSeconds; } <summary> 征兵系统 — 纯手动征兵（GoT式）。 固定双训练槽（并行）：RecruitQueueItem[2]，槽0/槽1 各训练一项，可同时进行。 训练时间：兵种等级曲线（L1-5 = 3/6/12/24/48 秒，新兵指导科技加速）"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/ResearchSystem.cs",
          "title": "研究队列项（通用科技）",
          "desc": "public struct ResearchItem { public TechId TechId; public int TargetLevel; public float RemainingSeconds; } <summary> 科技树系统 — 《凛冬将至》式。 单研究位：通用科技研究（兵种研究位已移除——兵种等级由三围科技等级推导，不再手动研究）。 研究点产出：学院建筑（0.05/s × (1+学院级×0.5)）。 兵种等级（Lv1-4）由武器/防具/体魄科技等级推导（每帧 RecalculateTroopLevels 写 ResearchLevels）。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/SaveData.cs",
          "title": "存档快照 — Newtonsoft.Json 序列化整棵对象树（6 处 Dictionary 全支持）。",
          "desc": "GameState（WorldState+PlayerState）+ 运行时队列快照（建造/训练/研究）。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/SaveGameSystem.cs",
          "title": "存档系统 — Newtonsoft.Json 序列化 SaveData 到 {baseDir}/saves/{slot}.json。",
          "desc": "Logic 层纯 C#（noEngineReferences）：baseDir 由 View 层注入（Application.persistentDataPath）。 存档时机：暂停时（防时间流逝中途存档的队列时间漂移）。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/SiegeSystem.cs",
          "title": "攻城系统 — 玩家攻 AI 城（消灭制）+ AI 报复玩家城。",
          "desc": "攻城链：陷阱 → 城墙耐久 → 驻军战（40/60战损）→ 消灭（掉资源包）。 报复：AI 军攻玩家城（仓库保护资源）。 读写分离：从 RebellionSystem 拆出，专注攻城/报复。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/VictorySystem.cs",
          "title": "胜利条件检测 — Tick制 RTS。",
          "desc": "全城归玩家 → 胜利 | 玩家城池数=0 → 失败。 检测间隔 1 秒，避免每帧重复触发。"
        },
        {
          "path": "Assets/_Project/Scripts/Logic/Write/WeatherLogic.cs",
          "title": "WeatherLogic",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Assert.cs",
          "title": "测试断言 — 失败即抛异常。",
          "desc": "替代 UnityEngine.Debug.Assert（后者只打印不中断，会\"断言失败却标 PASSED\"掩盖回归）。 用法：Assert.True(cond, \"说明\") / Assert.False(cond) / Assert.Equal(a, b)。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase10HeroTests.cs",
          "title": "Phase10HeroTests",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase11TestSimTests.cs",
          "title": "Phase11TestSimTests",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase12WallDefenseTests.cs",
          "title": "Phase12：城墙属性（器械容量/25级+器械攻击/民意值）+ 器械回收（对标医院）。",
          "desc": "验证：容量限制安装、城墙升级自动补装、25级攻击加成、民意值目标、回收率进损坏池/损毁池、修复/重建。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase13ResearchPolishTests.cs",
          "title": "Phase13：研究院完善 — 谍报术效果/天赋记忆激活/研究完成提示/占位科技清理。",
          "desc": "验证：谍报术等级分档信息、天赋记忆门槛、LastCompletedResearch 记录。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase14EliteTroopTests.cs",
          "title": "Phase14：士兵科技新结构（三围档 + 兵种解锁）。",
          "desc": "验证：三围档科技映射（Lv.N 兵 → 档 N-1）、兵种解锁连续计数、 压缩数值（10级满效果=原20级）、GetTroopUnlockLevel 推导。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase15EquipmentTests.cs",
          "title": "Phase15：领主装备系统（铁匠铺抽奖/词条/套装/升级/分解/战斗加成）。",
          "desc": "验证：词条生成、品质规则、套装、装备加成进战力、升级、分解经验。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase16AITests.cs",
          "title": "Phase16: AI 完善（独立科技 / 建筑发展 / 多兵种 / 城墙陷阱 / 兵力规模增长）。",
          "desc": "核心断言：AI 研究只影响 AI（AITechLevels），不改玩家全局 TechLevels。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase17SaveLoadTests.cs",
          "title": "Phase17: 存档/读档（Newtonsoft.Json 序列化 SaveData）。",
          "desc": "覆盖：RoundTrip 全还原（含 Dictionary 科技/建筑）、队列快照、无效槽、ListSlots。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase18PromoteTests.cs",
          "title": "Phase18: 兵种晋升（驻军低级士兵 → 已研究等级，消耗资源差额）。",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase19DensityTests.cs",
          "title": "Phase19: 地图内容密度（叛军40/区域 + 资源30/区域等级混布 + 玩家周边AI城 + 3分钟复活）。",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase1IntegrationTests.cs",
          "title": "Phase1IntegrationTests",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase20AIBehaviorTests.cs",
          "title": "Phase20: AI 行为（喘息期 / AI互打 / 掠夺日志 / 侦查门控）。",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase21AIEconomyTests.cs",
          "title": "Phase21: AI 真经济决策系统（10s 权重决策 / 真资源 / 随机性格 / 侦查意图链）。",
          "desc": "核心断言：AI 与玩家同规则（收入公式、成本门控、驻军上限），决策由权重表驱动， 侦查→情报→攻打意图链成立，威胁覆盖强制防御。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase22EconomyRatioTests.cs",
          "title": "Phase22: 资源配比（初始资源 5000 + 消耗幂曲线 + 时间线拉长）。",
          "desc": "锁定：建筑成本 ^1.5、研究成本 ^2、建造时间 ×5、研究时间 ×3、初始资源 5000。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase24AIPowerEvaluationTests.cs",
          "title": "Phase24: AI 战力评估（同源 GetArmyPower/GetCityDefense）。",
          "desc": "核心断言：有情报 → 按\"我军战力 vs 玩家城防\"决定打不打 + 出兵量按需倒推； 打不过 → 攻击权重归零（不送兵）；侦查采样城防写入情报。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase25AIPersonalityTests.cs",
          "title": "Phase25: AI 性格化（AIPersonalityConfig — 每性格发展序/科技序/兵种偏好）。",
          "desc": "核心断言：不同性格取到不同序（好战先兵营/防御先城墙/发育先农田），兵种偏好不同，决策第二级按性格取。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase26ScoutTests.cs",
          "title": "Phase26: 玩家侦查（快速斥候 + 情报结算 = 返回情报）。",
          "desc": "断言：派 1 斥候快速行军（×ScoutTimeMultiplier）→ 到达采样驻军/城防/资源写入 CityModel → 返程不交战（AI 城仍在、斥候存活）。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase27RevengeTests.cs",
          "title": "Phase27: 复仇链路恢复（玩家破城掠夺 → AI 城仇恨上升 → AI 决策出兵报复玩家）。",
          "desc": "修复前断链：①仇恨从不增加（掠夺制改版丢失\"被掠夺上升\"）；②复仇但无新鲜情报时 权重被\"无情报→0\"分支压制。断言：破城 +HatredGainPerRaid、复仇不依赖情报、 兵力不足不派（守卫）。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase28PublicOrderTests.cs",
          "title": "Phase28: AI 民意恢复（状态机闭合）。",
          "desc": "修复前：AI 城被打民意-10 永不涨，7 次速灭。 断言：民意随时间恢复、封顶 100、被打后仍恢复（不永久打残）。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase29LootHeroCheckTests.cs",
          "title": "Phase29: 右键单兵掠夺武将校验（规则闭环）。",
          "desc": "修复前：LootCityCommand 无武将校验，右键单兵（无武将）也能掠夺敌城， 与\"无武将不能出兵\"原则不符。 断言：无武将单兵右键掠夺被拒（城还在+Warning 日志）；带武将允许。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase2IntegrationTests.cs",
          "title": "Phase2IntegrationTests",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase30AIFamineTests.cs",
          "title": "Phase30: AI 粮食耗尽惩罚（断链修复：AI 粮 clamp 到 0 无惩罚，饿不死）。",
          "desc": "对齐玩家断粮惩罚（EconomySystem）：缺口 → 驻军掉血/人口流失/民意降。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase3IntegrationTests.cs",
          "title": "Phase3IntegrationTests",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase4IntegrationTests.cs",
          "title": "Phase4IntegrationTests",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase5IntegrationTests.cs",
          "title": "Phase5IntegrationTests",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase6FullConquestTest.cs",
          "title": "Phase6FullConquestTest",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase7HatredTests.cs",
          "title": "Phase7HatredTests",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase8TechTreeTests.cs",
          "title": "Phase8TechTreeTests",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase9BuildingSlotTests.cs",
          "title": "Phase9BuildingSlotTests",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/TestLog.cs",
          "title": "测试全时间执行日志 — 记录测试模拟过程中按游戏时间顺序发生的所有操作。",
          "desc": "两种记录来源： 1. TestLog.Record(world, cat, msg) 显式记录（测试/系统调用点）； 2. TestSim.Run(world, ...) 自动 PullFrom(world)：增量吸收 world.EventLog （各系统写 GameLog 的操作——建造完成/研究完成/行军到达/采集入账/战斗/掉落等）。 分类复用 GameLogCategory（Combat/Victory/Defeat/Resource/Building/Research/Hero/Info/Warning）， 可按分类分桶查询/导出。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/TestRunner.cs",
          "title": "测试统一入口。",
          "desc": "断言改为 Assert.True（失败抛异常）后，RunPhase 捕获异常并标红， 不再出现\"断言失败但标 PASSED\"掩盖回归的情况。"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/TestSim.cs",
          "title": "测试时间模拟 — 全局时间倍速 + 按步长快进 N 秒游戏时间。",
          "desc": "用途：跑长周期玩法（建造/研究/行军/采集/AI 调度/完整局）时， 不用手写大 dt 或反复调 Tick，统一按倍速快进。 传 world 参数会自动推进 world.ElapsedTime（时钟），并每步吸收 EventLog 到 TestLog（全时间执行日志）。"
        },
        {
          "path": "Assets/_Project/Scripts/View/Bootstrap/GameBootstrap.cs",
          "title": "游戏总入口 — Tick制 RTS 主循环。",
          "desc": "挂载到场景 Bootstrap GameObject，ExecutionOrder = -1000。"
        },
        {
          "path": "Assets/_Project/Scripts/View/Bootstrap/GameSession.cs",
          "title": "会话静态状态 — 跨场景传递（主菜单→游戏）。",
          "desc": "PendingLoadSlot：主菜单选择读档后设置，GameBootstrap.Awake 检查并自动读档。"
        },
        {
          "path": "Assets/_Project/Scripts/View/Input/InputHandler.cs",
          "title": "输入处理器 — Tick制 RTS。",
          "desc": "左键选中城池/士兵，右键行军/攻击/出征，Space暂停，1/2/3调速。"
        },
        {
          "path": "Assets/_Project/Scripts/View/Renderer/SoldierRenderer.cs",
          "title": "SoldierRenderer",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/Systems/AudioManager.cs",
          "title": "AudioManager",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/AIInfoUI.cs",
          "title": "AI 城情报面板 — 点击 AI 城显示该城实时状态（Phase24 表现层①）。",
          "desc": "纯读 CityModel 现成字段：性格/驻军/建造中/研究中/训练中/意图/情报，含出征按钮。 面板跟随城池屏幕坐标，Tick 实时刷新剩余秒数。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/BackpackUI.cs",
          "title": "背包面板 — 右下角\"包\"按钮打开。",
          "desc": "道具网格：名称/描述/数量/使用按钮。 资源包→补资源；碎片袋→补碎片；加速卡→减建造/研究/训练时间。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/BattleLogUI.cs",
          "title": "事件日志面板 — 左下角滚动日志。",
          "desc": "显示最近 MaxVisible 条（底部最新），按分类着色 + 游戏内时间戳。 来源筛选 Tab：全部 / 玩家 / AI（AI 刷屏时可只看玩家事件）。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/BattleReportDetailUI.cs",
          "title": "详细战斗战报面板 — 点击事件日志（带 ReportId 的条目）打开。",
          "desc": "显示完整战斗过程：攻守双方兵力/战力/损失、城墙变化、阶段摘要、掠夺明细。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/BattleReportUI.cs",
          "title": "战斗战报弹窗（表现层②）— 被 AI 掠夺/守城后弹窗显示结果。",
          "desc": "数据来自 SiegeSystem.BattleReportData（回调注入），纯展示。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/BarracksView.cs",
          "title": "兵营控制面板 — GoT 式三级结构。",
          "desc": "L1 主面板：顶部兵营等级+在线士兵；中部兵种×等级卡片网格（可滚动）；底部双训练队列槽。 L2 详情面板：点卡片 → 该兵种该等级详细数值 + 数量选择 + 训练（分配到空闲槽）。 物理拆分：BarracksView.Grid.cs（网格）/BarracksView.Detail.cs（详情）/BarracksView.Speed.cs（加速弹窗）。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/BarracksView.Detail.cs",
          "title": "BarracksView",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/BarracksView.Grid.cs",
          "title": "BarracksView",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/BarracksView.Speed.cs",
          "title": "BarracksView",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/BuildingViewBase.cs",
          "title": "建筑视图基类 — 每个建筑一个独立 GameObject 面板。",
          "desc": "生命周期：Initialize（创建面板，只一次）→ Bind(cityId)（切换城池）→ Show/Hide。 通用逻辑：标题/等级/效果/升级按钮/资源判断/关闭。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/CityOverviewUI.Cards.cs",
          "title": "刷新卡片\"查看\"按钮：己方城可进视图，敌方城禁用",
          "desc": "void RefreshCardViewButton(CityModel city, BuildingType t, Button btn) { if (btn == null) return; btn.interactable = city.OwnerId == state.Player.Id; SetBtnColor(btn, UIHelper.C_BTN_GRAY); var l = btn.GetComponentInChildren<TMP_Text>(); if (l != null) l.text = \"查看\"; btn.onClick.RemoveAllListeners(); var captured = t; btn.onClick.AddListener(() => OpenBuilding(captured)); } <summary> 刷新卡片\"升级/建造\"按钮（槽位制直连命令，无需进视图）： 已建 → 升级（满级/资源不足/前置/建造中/队列忙禁用）； 未建可选 → 建造（槽满/资源不足/前置/建造中禁用）； 未建核心 → 升级（Lv.0 升级即建造）； 敌方城一律禁用。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/CityOverviewUI.cs",
          "title": "城池概览 — 顶部城池信息栏 + 横向分类 Tab + 分类下建筑网格。",
          "desc": "布局：1000×600 居中容器内。 L1：城池信息(顶) → 分类Tab(横) → 建筑卡片网格(分类下) 点建筑卡片 → L2 建筑详情 物理拆分：CityOverviewUI.Grid.cs（网格+tooltip）/CityOverviewUI.Cards.cs（卡片按钮）/CityOverviewUI.Utils.cs（工具）。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/CityOverviewUI.Grid.cs",
          "title": "CityOverviewUI",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/CityOverviewUI.Utils.cs",
          "title": "CityOverviewUI",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/CityPanelRoot.cs",
          "title": "城池多面板容器 — 居中覆盖，面包屑导航。",
          "desc": "层级：L1 城市概览（建筑列表）→ L2 建筑详情 → L3 建筑子面板（兵种/武将等）。 面包屑 \"城池 > 兵营 > 步兵\" 点击上级返回。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/FarmView.cs",
          "title": "农田 — 产出粮食 + 粮容量展示（小时级产量，GoT 数值）。",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/ForgeView.cs",
          "title": "铁匠铺（锻造）— 消耗原矿锻造装备 + 装备管理。",
          "desc": "顶部：铁匠铺等级/当前原矿/锻造消耗/保底进度 + 锻造按钮。 中部：装备按兵种4子类Tab（步兵/枪兵/骑兵/弓兵），每类品质降序（金最上）。 每件：品质色名+词条+穿戴/升级/分解/重铸按钮。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/GenericBuildingView.cs",
          "title": "通用建筑视图 — 无专属功能的建筑使用此默认实现。",
          "desc": "效果文本统一走 ProductionCalculator（单一公式来源，与实际产出一致）。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/HeroHallView.cs",
          "title": "武将大厅 — 卡片网格 + L3 武将详情子面板。",
          "desc": "顶部信息栏（碎片/驻城武将/招募）→ 武将卡片网格（品质色边框+属性+升品）→ 点卡片进详情。 适配 960 宽面板。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/HospitalView.cs",
          "title": "医馆（医院）— 伤兵收容 + 治疗。",
          "desc": "显示：医院容量/当前伤兵数 + 伤兵明细（兵种×等级×数量）+ 治疗消耗 + 治疗按钮。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/PortView.cs",
          "title": "港口（交易）— 锚定式兑换。",
          "desc": "汇率：1分钟加速 = 港口等级 × 500 资源。 显示：港口等级/汇率/当前配方列表（消耗→产出 + 兑换按钮）/下次刷新倒计时。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/TavernView.cs",
          "title": "酒馆 — 武将招募面板（GoT式）。",
          "desc": "顶部：酒馆等级 + 招募费用（含酒馆折扣）+ 已有武将数。 中部：品质概率展示。 底部：招募按钮 + 升级按钮（base）。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Buildings/WallView.cs",
          "title": "城墙 — 城防面板（960 宽）。",
          "desc": "顶部：城墙等级/城防值/加固加成/攻城伤害倍率/守军反击倍率。 中部：4阶×3种陷阱卡片（已解锁绿框+勾 / 未解锁灰+需科技）。 底部：升级按钮（base）。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/CampInfoUI.cs",
          "title": "CampInfoUI",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/DispatchUI.Army.cs",
          "title": "DispatchUI",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/DispatchUI.cs",
          "title": "出征编队面板 — GoT式（1400×1000，与城池面板同尺寸）。",
          "desc": "左：英雄3卡片选择 + 军团负重 + 士兵按兵种选择。 右：敌方信息+坐标 / 行军时间 / 实力预测对比。 右下：出征按钮（预设目标时直接进攻，否则存编队等右键）。 物理拆分：DispatchUI.Hero.cs（英雄选择）/DispatchUI.Army.cs（士兵+实力）/DispatchUI.Target.cs（目标信息）。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/DispatchUI.Hero.cs",
          "title": "DispatchUI",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/DispatchUI.Target.cs",
          "title": "DispatchUI",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/EnemyInfoUI.cs",
          "title": "敌方部队侦查面板 — 点击 AI 在野士兵显示。",
          "desc": "瞭望塔等级门控信息量：Lv&lt;3 仅\"敌军部队\" / Lv3 兵种构成 / Lv5 平均等级 / Lv8 战力估算 / Lv10 精确战力+目标。 面板跟随士兵屏幕坐标。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/GameUI.cs",
          "title": "GameUI",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/HeroPanelUI.cs",
          "title": "全局武将面板 — 主界面右下角\"武\"按钮打开。",
          "desc": "L1：所有玩家武将卡片网格（品质色+名字+武力/统率+专属兵种+状态）。 L2：点击武将进详情（属性/品质/碎片升品/带兵上限）。 类似城池面板的交互层级。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/LordPanelUI.cs",
          "title": "领主面板 — 玩家个人页面（经验/军工/天赋/技能/装备 五栏）。",
          "desc": "技能栏：战争类 18 个（13 可用：点击发动 + 冷却倒计时；5 待开放灰显）。 经验：等级/经验条；军工：击杀敌方士兵按等级；天赋：天赋点（=等级数）；装备：待开放。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/MainMenuUI.cs",
          "title": "主菜单 — 纯代码 UI（Canvas 运行时创建）。",
          "desc": "新游戏 / 继续游戏（最新存档） / 读档列表 / 退出。 存档系统复用 SaveGameSystem（Logic 层，路径 persistentDataPath 注入）。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/NodeInfoUI.cs",
          "title": "资源节点信息面板 — 只显示详细数据（类型/等级/总容量/剩余可采量/采集统计）。",
          "desc": "采集不再从这里发起（删确认采集/出兵区），改从城池面板\"出征\"→右键节点。 面板跟随节点屏幕坐标。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Panels/GameOverPanel.cs",
          "title": "GameOverPanel",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Presenters/CityPresenter.cs",
          "title": "城池展示装配 — CityModel → UI 文本（情报面板等）。",
          "desc": "纯逻辑（只依赖 Game.Data），把各 UI 内联的聚合/拼接逻辑集中于此，UI 只管显示。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Presenters/Formatter.cs",
          "title": "展示格式化工具 — 把原始数据转成 UI 可读文本（纯逻辑，不依赖 UnityEngine）。",
          "desc": "集中散落各 UI 的格式化/名称映射，UI 只管显示。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/Presenters/MarchGroupPresenter.cs",
          "title": "MarchGroupPresenter",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/ResearchUI.cs",
          "title": "研究面板 — 三层结构（分类 → 子类 → 科技）。",
          "desc": "分类：士兵 / 资源产量 / 资源容量 / 速度 / 城墙城防 / 其他。 士兵分类 → 4兵种子类卡片 → 兵种科技（兵种解锁/攻击力/防御力/生命值 4组）。 其他分类 → 直接科技列表（按小类分组）。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/ToastUI.cs",
          "title": "地图事件飘字（表现层③）— 顶部居中的重要事件提示（战斗警告/被掠夺/胜利等）。",
          "desc": "替代\"翻日志才知道被打了\"。多条目排队，每条显示几秒后淡出。"
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/TopBarUI.cs",
          "title": "TopBarUI",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/UI/UIHelper.cs",
          "title": "UIHelper",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/Utils/CameraController.cs",
          "title": "CameraController",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/Utils/CoroutineDispatcher.cs",
          "title": "CoroutineDispatcher",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/Utils/PerformanceSampler.cs",
          "title": "PerformanceSampler",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/Utils/UnityMainThreadDispatcher.cs",
          "title": "UnityMainThreadDispatcher",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/Views/CampView.cs",
          "title": "CampView",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/Views/CityView.cs",
          "title": "城池视图控制器 — 只读 GameState，渲染城池标记/名称/驻军数/选中环。",
          "desc": "用 Quad + TMP 3D 实现（无外部资源依赖，中文 SDF 与全 UI 统一）。"
        },
        {
          "path": "Assets/_Project/Scripts/View/Views/FogOfWarView.cs",
          "title": "FogOfWarView",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/Views/MapView.cs",
          "title": "纯2D地图 — 区域底色 Quad（Texture2D 逐格着色）+ 区域名 TMP 标签。",
          "desc": "全草地视觉（地形纯装饰），区域用淡色底区分。"
        },
        {
          "path": "Assets/_Project/Scripts/View/Views/NodeView.cs",
          "title": "NodeView",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/View/Views/SoldierView.cs",
          "title": "SoldierView",
          "desc": ""
        }
      ]
    }
  ]
}

export default data
