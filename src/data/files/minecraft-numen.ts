/**
 * 由 scripts/convert-content.cjs 自动生成
 * 编辑请改 content/files/minecraft-numen.json
 */
import type { ProjectFiles } from './types'

const data: ProjectFiles = {
  "slug": "minecraft-numen",
  "sections": [
    {
      "id": "fork",
      "title": "numen-fork — 服务端侧（工具与任务）",
      "root": "numen-fork",
      "total": 81,
      "files": [
        {
          "path": "numen/buildSrc/src/main/groovy/multiloader-common.gradle",
          "title": "multiloader-common.gradle",
          "desc": "相对上游：+1 / -0 行。"
        },
        {
          "path": "numen/common/core/act/Interaction.java",
          "title": "Interaction",
          "desc": "相对上游：+40 / -2 行。"
        },
        {
          "path": "numen/common/core/blueprint/ApprovedStore.java",
          "title": "主人已批准的蓝图存储",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/data/HomeStore.java",
          "title": "「家」坐标的持久化存储",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/data/WarehouseStore.java",
          "title": "「仓库」容器坐标的持久化存储",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/NumenCore.java",
          "title": "NumenCore",
          "desc": "相对上游：+38 / -0 行。"
        },
        {
          "path": "numen/common/core/pathing/execute/PathExecutor.java",
          "title": "PathExecutor",
          "desc": "相对上游：+30 / -0 行。"
        },
        {
          "path": "numen/common/core/pathing/settings/NavSettings.java",
          "title": "NavSettings",
          "desc": "相对上游：+10 / -2 行。"
        },
        {
          "path": "numen/common/core/scan/BlockScanner.java",
          "title": "BlockScanner",
          "desc": "相对上游：+86 / -0 行。"
        },
        {
          "path": "numen/common/core/scan/SurveyCache.java",
          "title": "勘测结果缓存",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/task/base/AbstractCompanionTask.java",
          "title": "AbstractCompanionTask",
          "desc": "相对上游：+58 / -1 行。"
        },
        {
          "path": "numen/common/core/task/BuildCompanionTask.java",
          "title": "BuildCompanionTask",
          "desc": "相对上游：+17 / -0 行。"
        },
        {
          "path": "numen/common/core/task/chain/MobDefenseChain.java",
          "title": "MobDefenseChain",
          "desc": "相对上游：+19 / -8 行。"
        },
        {
          "path": "numen/common/core/task/CollectItemsTaskGoal.java",
          "title": "CollectItemsTaskGoal",
          "desc": "相对上游：+16 / -1 行。"
        },
        {
          "path": "numen/common/core/task/ExploreDirectionTask.java",
          "title": "定向探索任务",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/task/ExploreDirectionTaskRecord.java",
          "title": "定向探索的存档记录",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/task/FailureType.java",
          "title": "FailureType",
          "desc": "相对上游：+27 / -0 行。"
        },
        {
          "path": "numen/common/core/task/InteractAtCompanionTask.java",
          "title": "InteractAtCompanionTask",
          "desc": "相对上游：+39 / -3 行。"
        },
        {
          "path": "numen/common/core/task/JumpCompanionTask.java",
          "title": "跳跃任务",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/task/JumpPlaceCompanionTask.java",
          "title": "跳跃放置任务",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/task/JumpPlaceTaskRecord.java",
          "title": "跳跃放置任务的存档记录",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/task/JumpTaskRecord.java",
          "title": "跳跃任务的存档记录",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/task/MakeItemTask.java",
          "title": "合成任务：把配方拆成逐格操作",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/task/MakeItemTaskRecord.java",
          "title": "合成任务的存档记录",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/task/MineCompanionTask.java",
          "title": "MineCompanionTask",
          "desc": "相对上游：+43 / -21 行。"
        },
        {
          "path": "numen/common/core/task/MoveToCompanionTask.java",
          "title": "MoveToCompanionTask",
          "desc": "相对上游：+60 / -7 行。"
        },
        {
          "path": "numen/common/core/task/SmeltItemsTask.java",
          "title": "熔炼任务",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/task/SmeltItemsTaskRecord.java",
          "title": "熔炼任务的存档记录",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/AcquireToolsetTool.java",
          "title": "凑齐一套工具（镐/斧/铲/剑）",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/AgentTools.java",
          "title": "AgentTools",
          "desc": "相对上游：+2 / -2 行。"
        },
        {
          "path": "numen/common/core/tools/AgentToolsTest.java",
          "title": "AgentToolsTest",
          "desc": "相对上游：+6 / -2 行。"
        },
        {
          "path": "numen/common/core/tools/ArmUpTool.java",
          "title": "武装自己：找并装备武器与护甲",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/BlockActionTools.java",
          "title": "BlockActionTools",
          "desc": "相对上游：+14 / -7 行。"
        },
        {
          "path": "numen/common/core/tools/BlockQuery.java",
          "title": "单块查询：这一格是什么、能不能挖",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/BlockWaterTool.java",
          "title": "堵水：用方块封住水流",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/BlueprintReadTool.java",
          "title": "BlueprintReadTool",
          "desc": "相对上游：+43 / -37 行。"
        },
        {
          "path": "numen/common/core/tools/BlueprintTool.java",
          "title": "BlueprintTool",
          "desc": "相对上游：+24 / -9 行。"
        },
        {
          "path": "numen/common/core/tools/BuildPalette.java",
          "title": "BuildPalette",
          "desc": "相对上游：+21 / -3 行。"
        },
        {
          "path": "numen/common/core/tools/BuildTool.java",
          "title": "BuildTool",
          "desc": "相对上游：+113 / -107 行。"
        },
        {
          "path": "numen/common/core/tools/CraftTool.java",
          "title": "CraftTool",
          "desc": "相对上游：+10 / -4 行。"
        },
        {
          "path": "numen/common/core/tools/CraftTools.java",
          "title": "CraftTools",
          "desc": "相对上游：+35 / -0 行。"
        },
        {
          "path": "numen/common/core/tools/DismountTool.java",
          "title": "下坐骑 / 离开载具",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/DropItemsTool.java",
          "title": "DropItemsTool",
          "desc": "相对上游：+8 / -2 行。"
        },
        {
          "path": "numen/common/core/tools/EatItemTool.java",
          "title": "EatItemTool",
          "desc": "相对上游：+8 / -2 行。"
        },
        {
          "path": "numen/common/core/tools/EnsureFoodTool.java",
          "title": "保证不饿：找吃的或催熟作物",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/EquipItemTool.java",
          "title": "EquipItemTool",
          "desc": "相对上游：+6 / -0 行。"
        },
        {
          "path": "numen/common/core/tools/ExploreDirectionTool.java",
          "title": "朝某个方向探索（带记录，不重复走）",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/ExportBuildTool.java",
          "title": "导出建筑蓝图",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/FishTool.java",
          "title": "FishTool",
          "desc": "相对上游：+7 / -1 行。"
        },
        {
          "path": "numen/common/core/tools/GiveItemTool.java",
          "title": "把物品交给主人",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/GoHomeTool.java",
          "title": "回「家」：走到记录的据点坐标",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/HealTool.java",
          "title": "治疗：吃东西回血、脱离危险状态",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/InspectBlockStorageTool.java",
          "title": "InspectBlockStorageTool",
          "desc": "相对上游：+7 / -1 行。"
        },
        {
          "path": "numen/common/core/tools/InspectGuiTool.java",
          "title": "InspectGuiTool",
          "desc": "相对上游：+8 / -2 行。"
        },
        {
          "path": "numen/common/core/tools/InteractEntityTool.java",
          "title": "InteractEntityTool",
          "desc": "相对上游：+7 / -1 行。"
        },
        {
          "path": "numen/common/core/tools/JumpPlaceTool.java",
          "title": "跳跃 + 空中放方块：跨沟与垫脚上升",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/JumpTool.java",
          "title": "跳跃（含助跑起跳判定）",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/LocateBiomeTool.java",
          "title": "LocateBiomeTool",
          "desc": "相对上游：+8 / -2 行。"
        },
        {
          "path": "numen/common/core/tools/LocateStructureTool.java",
          "title": "LocateStructureTool",
          "desc": "相对上游：+9 / -3 行。"
        },
        {
          "path": "numen/common/core/tools/LookupRecipeTool.java",
          "title": "LookupRecipeTool",
          "desc": "相对上游：+11 / -5 行。"
        },
        {
          "path": "numen/common/core/tools/MakeItemTool.java",
          "title": "手搓合成：按配方逐格摆放并取出成品",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/MeleeAttackTool.java",
          "title": "MeleeAttackTool",
          "desc": "相对上游：+6 / -0 行。"
        },
        {
          "path": "numen/common/core/tools/MoveToTool.java",
          "title": "MoveToTool",
          "desc": "相对上游：+1 / -1 行。"
        },
        {
          "path": "numen/common/core/tools/OrganizeStorageTool.java",
          "title": "整理存储：把背包里的东西分门别类塞回容器",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/RangedAttackTool.java",
          "title": "RangedAttackTool",
          "desc": "相对上游：+6 / -0 行。"
        },
        {
          "path": "numen/common/core/tools/RememberStyleTool.java",
          "title": "记住主人的建筑风格偏好",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/ScanBlocksTool.java",
          "title": "ScanBlocksTool",
          "desc": "相对上游：+2 / -1 行。"
        },
        {
          "path": "numen/common/core/tools/ScanTools.java",
          "title": "ScanTools",
          "desc": "相对上游：+1 / -5 行。"
        },
        {
          "path": "numen/common/core/tools/ScanWarehouseTool.java",
          "title": "扫描仓库：清点各容器里装了什么",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/SetHomeTool.java",
          "title": "把当前位置登记为「家」",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/SetWarehouseTool.java",
          "title": "把当前容器登记为「仓库」",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/SmeltItemsTool.java",
          "title": "熔炼：把矿石塞进熔炉并取回成品",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/SurveyBuildSiteTool.java",
          "title": "勘察建造场地：平整度、空间、周边资源",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/SurveyTool.java",
          "title": "勘测：扫描一片区域的资源与地形分布",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/TakeItemsTool.java",
          "title": "TakeItemsTool",
          "desc": "相对上游：+16 / -10 行。"
        },
        {
          "path": "numen/common/core/tools/TransferTool.java",
          "title": "TransferTool",
          "desc": "相对上游：+8 / -2 行。"
        },
        {
          "path": "numen/common/core/tools/WebSearchTool.java",
          "title": "联网搜索：让同伴能查资料再动手",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/core/tools/WriteDiaryTool.java",
          "title": "写日记：同伴记录自己的经历（只有主人能看）",
          "desc": "新增文件。"
        },
        {
          "path": "numen/common/src/main/resources/skills/stuck_escape/SKILL.md",
          "title": "SKILL",
          "desc": "新增文件。"
        },
        {
          "path": "numen/gradle/wrapper/gradle-wrapper.properties",
          "title": "gradle-wrapper.properties",
          "desc": "相对上游：+2 / -2 行。"
        },
        {
          "path": "numen/settings.gradle",
          "title": "settings.gradle",
          "desc": "相对上游：+2 / -0 行。"
        }
      ]
    },
    {
      "id": "api",
      "title": "numen-api — 大脑侧（记忆与自主性）",
      "root": "numen-api",
      "total": 34,
      "files": [
        {
          "path": "numen-api/buildSrc/src/main/groovy/multiloader-common.gradle",
          "title": "multiloader-common.gradle",
          "desc": "相对上游：+1 / -0 行。"
        },
        {
          "path": "numen-api/common/agent/autonomy/Autonomy.java",
          "title": "自主性：不等指令也会自己安排事情",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/autonomy/AutonomyTest.java",
          "title": "AutonomyTest",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/diary/Diary.java",
          "title": "日记：同伴自己的经历记录（只有主人能看）",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/llm/NumenLlmClient.java",
          "title": "NumenLlmClient",
          "desc": "相对上游：+2 / -0 行。"
        },
        {
          "path": "numen-api/common/agent/memory/Distiller.java",
          "title": "语义蒸馏：把对话压成事实三元组",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/memory/DistillerTest.java",
          "title": "DistillerTest",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/memory/MemoryEntry.java",
          "title": "一条记忆的数据结构（importance / reinforce / decay 字段）",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/memory/MemoryLayer.java",
          "title": "七层记忆的枚举定义（L0 灵魂 ~ L6 技能 + 遗忘）",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/memory/MemoryScorer.java",
          "title": "记忆打分：importance + reinforce + ln(access) − decay",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/memory/MemoryScorerTest.java",
          "title": "MemoryScorerTest",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/memory/MemoryStore.java",
          "title": "记忆持久化与检索",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/memory/MemoryStoreTest.java",
          "title": "MemoryStoreTest",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/memory/SharedKnowledge.java",
          "title": "共享知识：多个同伴之间互通的部分",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/memory/WorldKnowledge.java",
          "title": "世界知识（12 域，按任务检索）",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/memory/WorldKnowledgeTest.java",
          "title": "WorldKnowledgeTest",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/model/ModelRegistry.java",
          "title": "ModelRegistry",
          "desc": "相对上游：+11 / -1 行。"
        },
        {
          "path": "numen-api/common/agent/prompt/NumenPrompts.java",
          "title": "NumenPrompts",
          "desc": "相对上游：+39 / -19 行。"
        },
        {
          "path": "numen-api/common/agent/tool/NumenTool.java",
          "title": "NumenTool",
          "desc": "相对上游：+10 / -0 行。"
        },
        {
          "path": "numen-api/common/agent/tool/ToolArgs.java",
          "title": "ToolArgs",
          "desc": "相对上游：+24 / -2 行。"
        },
        {
          "path": "numen-api/common/agent/tool/ToolGroup.java",
          "title": "工具分组：把几十个工具按用途归类",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/agent/tool/ToolSelector.java",
          "title": "工具选择器：按当前任务只挑相关工具给模型",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/client/agent/AgentLoopRegistry.java",
          "title": "AgentLoopRegistry",
          "desc": "相对上游：+15 / -5 行。"
        },
        {
          "path": "numen-api/common/client/agent/EntityAgentLoop.java",
          "title": "EntityAgentLoop",
          "desc": "相对上游：+322 / -7 行。"
        },
        {
          "path": "numen-api/common/client/chat/DefaultChatDisplayFilter.java",
          "title": "DefaultChatDisplayFilter",
          "desc": "相对上游：+11 / -3 行。"
        },
        {
          "path": "numen-api/common/client/chat/WorldChatBus.java",
          "title": "世界聊天总线",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/client/ClientThreading.java",
          "title": "客户端线程调度",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/common/entity/Companions.java",
          "title": "Companions",
          "desc": "相对上游：+7 / -2 行。"
        },
        {
          "path": "numen-api/common/task/LlmTaskChain.java",
          "title": "LlmTaskChain",
          "desc": "相对上游：+12 / -1 行。"
        },
        {
          "path": "numen-api/fabric/NumenFabricClient.java",
          "title": "NumenFabricClient",
          "desc": "相对上游：+13 / -2 行。"
        },
        {
          "path": "numen-api/forge/NumenForgeClient.java",
          "title": "NumenForgeClient",
          "desc": "相对上游：+3 / -2 行。"
        },
        {
          "path": "numen-api/gradle/wrapper/gradle-wrapper.properties",
          "title": "gradle-wrapper.properties",
          "desc": "相对上游：+2 / -2 行。"
        },
        {
          "path": "numen-api/MEMORY-DESIGN.md",
          "title": "MEMORY-DESIGN.md",
          "desc": "新增文件。"
        },
        {
          "path": "numen-api/settings.gradle",
          "title": "settings.gradle",
          "desc": "相对上游：+2 / -0 行。"
        }
      ]
    }
  ]
}

export default data
