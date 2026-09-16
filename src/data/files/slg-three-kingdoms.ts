/**
 * 由 scripts/convert-content.cjs 自动生成
 * 编辑请改 content/files/slg-three-kingdoms.json
 */
import type { ProjectFiles } from './types'

const data: ProjectFiles = {
  "slug": "slg-three-kingdoms",
  "sections": [
    {
      "id": "main",
      "title": "Assets/_Project/Scripts",
      "root": "gamebate",
      "total": 95,
      "files": [
        {
          "path": "Assets/_Project/Scripts/Backend/Bridge/CommandBus.cs",
          "title": "命令总线 —— 接收命令 → 校验 → 路由到 System.Execute",
          "desc": "Phase 3: 已连接所有 System"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Bridge/Commands/CityCommands.cs",
          "title": "城池相关命令定义 —— 不可变数据包",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Bridge/Commands/CommandValidator.cs",
          "title": "命令校验器 —— 在 CommandBus 路由到 System 之前检查合法性",
          "desc": "纯后端，零 UnityEngine 引用 Phase 1 提供骨架，Phase 3 注入真实 System 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Bridge/Commands/GameCommands.cs",
          "title": "游戏级命令定义 —— 不可变数据包",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Bridge/Commands/ICommand.cs",
          "title": "命令接口 —— 纯后端，所有游戏命令必须实现此接口",
          "desc": "命令是不可变数据包（Data Object）"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Bridge/Commands/UnitCommands.cs",
          "title": "单位命令定义 —— 不可变数据包",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Bridge/EventBus.cs",
          "title": "事件总线 —— 强类型发布/订阅（替代旧项目 string-based EventBus）",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Bridge/Events/CityEvents.cs",
          "title": "城池相关事件 —— 强类型，供 EventBus 发布/订阅",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Bridge/Events/CombatEvents.cs",
          "title": "战斗相关事件 —— 强类型，供 EventBus 发布/订阅",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Bridge/Events/EventHistory.cs",
          "title": "事件历史 —— 固定大小的环形队列，供战报和回放使用",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Bridge/Events/GameEvents.cs",
          "title": "游戏级事件 —— 强类型，供 EventBus 发布/订阅",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Bridge/Events/IGameEvent.cs",
          "title": "事件标记接口 —— 纯后端",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Configs/BuildingDataTable.cs",
          "title": "建筑配置表 —— 纯数据，零 UnityEngine 引用",
          "desc": "名称 / 等级上限 / 建造消耗 / 产出 / 前置条件 / 增幅效果"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Configs/CityDataTable.cs",
          "title": "46 城硬编码配置表 —— 三国志11完整地理映射 + 玩家云南左下角开局",
          "desc": "纯数据，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Configs/GameConfig.cs",
          "title": "游戏配置静态代理 —— 所有代码通过此类读取配置，不直接访问 SO",
          "desc": "零 UnityEngine 引用（因为 Backend.asmdef 不能引用 UnityEngine）"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Configs/TerrainDataTable.cs",
          "title": "地形配置表 —— 纯数据，零 UnityEngine 引用",
          "desc": "定义每种地形的行军消耗、防御加成、是否可通行"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Configs/TroopDataTable.cs",
          "title": "兵种配置表 —— 纯数据，零 UnityEngine 引用",
          "desc": "兵种克制链: 骑兵 → 步兵 → 弓箭手 → 骑兵"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Enums/BuildingType.cs",
          "title": "建筑类型枚举 —— 匹配游戏实际 20 种建筑",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Enums/GamePhase.cs",
          "title": "游戏阶段枚举 —— 纯后端，零 UnityEngine 引用",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Enums/NodeType.cs",
          "title": "节点类型枚举",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Enums/ResourceType.cs",
          "title": "资源枚举",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Enums/SeasonType.cs",
          "title": "季节枚举",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Enums/TerrainType.cs",
          "title": "地形类型枚举 —— 匹配游戏实际 8 种地形",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Enums/TroopType.cs",
          "title": "兵种枚举",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/GameState.cs",
          "title": "游戏根状态 —— 纯后端，零 UnityEngine 引用",
          "desc": "单一根对象，序列化一行代码，增量更新可追踪"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Models/BanditCampModel.cs",
          "title": "野怪营地纯数据模型 —— 纯后端，零 UnityEngine 引用",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Models/BuildingModel.cs",
          "title": "建筑实例模型 —— 纯后端，零 UnityEngine 引用",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Models/CityModel.cs",
          "title": "城池纯数据模型 —— 纯后端，零 UnityEngine 引用",
          "desc": "不含任何行为逻辑，只存数据"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Models/MapModel.cs",
          "title": "地图数据模型 —— 纯后端，零 UnityEngine 引用",
          "desc": "100×100 网格，持有所有 tile 数据"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Models/MapTileData.cs",
          "title": "单格地图数据 —— 纯后端，零 UnityEngine 引用",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Models/ResourceNodeModel.cs",
          "title": "资源节点纯数据模型 —— 纯后端，零 UnityEngine 引用",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Models/SoldierModel.cs",
          "title": "士兵纯数据模型 —— 纯后端，零 UnityEngine 引用",
          "desc": "每个士兵是独立实体（非堆叠制）"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/Models/TurnModel.cs",
          "title": "回合数据模型 —— 纯后端，零 UnityEngine 引用",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/PlayerState.cs",
          "title": "玩家状态 —— 资源、可见范围",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Data/WorldState.cs",
          "title": "世界状态 —— 地图、回合、天气、所有实体集合",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Serialization/GameStateSerializer.cs",
          "title": "游戏状态序列化器 —— GameState ↔ JSON",
          "desc": "Phase 3 stub: 用反射做基础序列化（不依赖 System.Text.Json 或 Newtonsoft） Phase 4 替代为 Unity JsonUtility 或完整实现"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/AI/AIBrain.cs",
          "title": "AI 大脑 —— 评估 + 决策（多城管理）",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/AI/AIScheduler.cs",
          "title": "AI 分帧调度器 —— 每帧执行 N 个任务",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/AI/AITaskQueue.cs",
          "title": "AI 任务队列 —— 优先级排序的任务列表",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/AI/EnhancedAIBrain.cs",
          "title": "增强版 AI 大脑 —— 多兵种招募 + 多目标评估 + 防御逻辑",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/AI/EnhancedAITaskQueue.cs",
          "title": "增强版 AITaskQueue —— 支持多种部队类型和任务限制",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/BanditPlacer.cs",
          "title": "野怪营地放置器 —— 中心辐射分布，Lv1-10 梯度",
          "desc": "纯逻辑，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/BattleLogRecorder.cs",
          "title": "战报环形缓冲区 —— 记录最近 N 条战斗事件",
          "desc": "从 Assets/Scripts/Combat/BattleLogRecorder.cs 搬迁 + 去旧依赖"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/CityPlacer.cs",
          "title": "城池放置器 —— 从 CityDataTable 读取数据，注入到 WorldState",
          "desc": "纯逻辑，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/CombatSystem.cs",
          "title": "战斗系统 —— 单位/城池战斗结算 + 日志 + 音效 + 占城",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/EconomySystem.cs",
          "title": "经济系统 —— 资源产出、税收、建筑效果、消耗结算",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/FogOfWarLogic.cs",
          "title": "迷雾逻辑 —— 纯视野计算，零 UnityEngine 引用",
          "desc": "基于玩家城池/士兵位置计算可见范围"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/MapGenerator.cs",
          "title": "地图生成器 —— 纯逻辑，零 UnityEngine 引用",
          "desc": "根据地形配置在 MapModel 上生成地形"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/MovementSystem.cs",
          "title": "行军系统 —— 逐格移动 + 遭遇检测",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/RebellionSystem.cs",
          "title": "叛乱系统 —— 低治安城池生成叛军",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/RecruitmentSystem.cs",
          "title": "招募系统 —— 城池征兵逻辑",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/ResourcePlacer.cs",
          "title": "资源节点放置器 —— 在地图上随机生成农场/矿场/林场/金矿",
          "desc": "纯逻辑，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/SupplySystem.cs",
          "title": "粮草系统 —— 行军消耗 + 补给",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/TurnSystem.cs",
          "title": "回合系统 —— 回合流转 + 分帧 AI 调度",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/TutorialSystem.cs",
          "title": "新手引导 —— 三段提示",
          "desc": "从 Assets/Scripts/Systems/TutorialSystem.cs 搬迁 + 去旧依赖"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/VictorySystem.cs",
          "title": "胜利条件检测 —— 全部城池归玩家 = 胜利",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Systems/WeatherLogic.cs",
          "title": "天气系统 —— 纯逻辑，零 UnityEngine 引用",
          "desc": "每 N tick 切换一次天气"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Utils/AStarPathfinder.cs",
          "title": "A* 寻路 —— 纯算法，零 UnityEngine 引用",
          "desc": "使用 cameFrom 映射替代不可靠的 open-list 索引"
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Utils/IdGenerator.cs",
          "title": "自增 ID 生成器 —— 纯后端，零 UnityEngine 引用",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Backend/Utils/MathUtils.cs",
          "title": "数学工具 —— 伤害公式、钳制、随机数",
          "desc": "纯后端，零 UnityEngine 引用"
        },
        {
          "path": "Assets/_Project/Scripts/Configs/GameConfigSO.cs",
          "title": "游戏配置 ScriptableObject —— 设计师编辑器可调数值",
          "desc": "唯一 SO 入口，其他数据表在 Backend.Data.Configs 中硬编码"
        },
        {
          "path": "Assets/_Project/Scripts/Configs/MapColors.cs",
          "title": "统一配色常量",
          "desc": "从 Assets/Scripts/Configs/MapColors.cs 搬迁 + 适配"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Bootstrap/GameBootstrap.cs",
          "title": "GameBootstrap —— MonoBehaviour 入口，连接前端与后端",
          "desc": "new GameState → 注入 System → Wire CommandBus → 启动 View"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Bootstrap/SaveLoadUI.cs",
          "title": "存档/读档 UI —— IO 操作 + GameStateSerializer",
          "desc": "MonoBehaviour，读写磁盘"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Input/InputHandler.cs",
          "title": "输入处理器 —— 完整版：点击选中/命令路由/框选",
          "desc": "MonoBehaviour，只做输入→Command 转换"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Sync/GameStateRenderer.cs",
          "title": "游戏状态渲染器 —— 订阅后端变更 → 增量更新所有 View GameObject",
          "desc": "生命周期：每帧由 GameBootstrap 调用 Render()"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Systems/AudioManager.cs",
          "title": "音频管理器 —— 程序化音效（蜂鸣），订阅新 GameEventBus",
          "desc": "从 Assets/Scripts/Systems/AudioManager.cs 搬迁 + 适配强类型事件"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/UI/Factories/UIImage.cs",
          "title": "UI 图片工厂 —— 创建 Image/SpriteRenderer",
          "desc": "从旧项目 Assets/Scripts/UI/UIImage.cs 精简化搬迁"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/UI/Factories/UILayerConfig.cs",
          "title": "UI 层级配置 —— Canvas sortingOrder 分层",
          "desc": "从旧项目 Assets/Scripts/UI/UILayerConfig.cs 搬迁"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/UI/Factories/UIStyle.cs",
          "title": "UI 样式常量 —— 集中管理颜色/字体/尺寸",
          "desc": "从旧项目 Assets/Scripts/UI/UIStyle.cs 精简化搬迁"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/UI/Factories/UIText.cs",
          "title": "UI 文字工厂 —— 创建 TextMeshPro / Text 组件",
          "desc": "从旧项目 Assets/Scripts/UI/UIText.cs 精简化搬迁"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/UI/HUD/EndTurnButton.cs",
          "title": "结束回合按钮 —— MonoBehaviour，右下角按钮",
          "desc": "点击 → CommandBus.Execute(EndTurnCommand)"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/UI/HUD/TopBar.cs",
          "title": "顶栏 HUD —— MonoBehaviour，只读 GameState 显示资源/人口/回合",
          "desc": "从旧项目 HudBar.cs 重构"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/UI/Log/GameLog.cs",
          "title": "游戏日志 —— MonoBehaviour，显示后端 EventLog",
          "desc": "从旧项目 GameLog.cs 重构"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/UI/MapTooltip.cs",
          "title": "地图悬浮提示 —— 屏幕顶部居中半透明信息条",
          "desc": "从 Assets/Scripts/UI/MapTooltip.cs 搬迁 + 适配新 Model 类型"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/UI/Panels/CityPanel.cs",
          "title": "城池浮动菜单 —— 点击城池弹出：出征/招募/升级/情报",
          "desc": "从旧项目 CityPanel.cs 重构的纯 UI，通过 CommandBus 发命令"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/UI/Panels/GameOverPanel.cs",
          "title": "游戏结束面板 —— 胜利/失败弹窗",
          "desc": "纯 UI，显示结算信息"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/UI/Panels/NodeDetailPanel.cs",
          "title": "资源节点/野怪详情面板 —— 点击节点弹出",
          "desc": "纯 UI 展示，只读 GameState"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Utils/CoroutineDispatcher.cs",
          "title": "协程调度器 —— 为纯 C# 逻辑组件提供协程执行环境",
          "desc": "从 Assets/Scripts/Core/CoroutineDispatcher.cs 搬迁"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Utils/PerformanceSampler.cs",
          "title": "性能采样器 —— 每帧记录耗时，环形缓冲区，超标自动 warn",
          "desc": "从 Assets/Scripts/Systems/PerformanceSampler.cs 搬迁"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Utils/UnityMainThreadDispatcher.cs",
          "title": "主线程调度器 —— 跨线程操作统一入队，Update 消费",
          "desc": "从 Assets/Scripts/Core/UnityMainThreadDispatcher.cs 搬迁"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Views/CameraController.cs",
          "title": "三国志风格摄像机 —— 正俯视2D、滚轮缩放、右键拖拽、边缘滚动",
          "desc": "从 Assets/Scripts/Map/CameraController.cs 搬迁 + 添加 namespace"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Views/CityView.cs",
          "title": "城池视图 —— MonoBehaviour，从 CityModel 读取数据渲染 Sprite",
          "desc": "只读 GameState，不做逻辑"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Views/FogOfWarView.cs",
          "title": "迷雾视图 —— MonoBehaviour，从 FogOfWarLogic 读数据渲染半透明遮罩",
          "desc": "只读，不做逻辑"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Views/MapSprites.cs",
          "title": "地图 Sprite 加载 —— 从磁盘读 PNG，PPU=纹理宽→精确1世界单位",
          "desc": "从 Assets/Scripts/Map/MapSprites.cs 搬迁 + 适配新模型"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Views/MapView.cs",
          "title": "地图视图 —— MonoBehaviour，根据 MapModel 数据渲染 Tilemap + 背景",
          "desc": "只读 GameState，不做逻辑"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Views/SelectionHighlight.cs",
          "title": "SelectionHighlight —— 选中士兵/城池的高亮范围显示",
          "desc": "MonoBehaviour，纯渲染"
        },
        {
          "path": "Assets/_Project/Scripts/Frontend/Views/SoldierView.cs",
          "title": "士兵视图 —— MonoBehaviour，从 SoldierModel 读取数据渲染 Sprite",
          "desc": "只读 GameState，不做逻辑"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase1IntegrationTests.cs",
          "title": "Phase 1 骨架集成测试 —— 验证 GameState + CommandBus + EventBus 基础流程",
          "desc": "纯 C#，不依赖 Unity"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase2IntegrationTests.cs",
          "title": "Phase 2 集成测试 —— 地图生成 + 城池放置 + 资源 + 寻路",
          "desc": "纯 C#，不依赖 Unity"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase3IntegrationTests.cs",
          "title": "Phase 3 集成测试 —— 行为系统端到端",
          "desc": "纯 C#"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase4IntegrationTests.cs",
          "title": "Phase 4 集成测试 —— 前端 + Bootstrap 连接验证",
          "desc": "不启动真实 Unity 渲染，只验证对象创建和 System 连接"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase5IntegrationTests.cs",
          "title": "Phase 5 集成测试 —— 前端面板 + 迷雾 + 天气 + AI增强 + 存档",
          "desc": ""
        },
        {
          "path": "Assets/_Project/Scripts/Tests/Phase6FullConquestTest.cs",
          "title": "Phase 6 全统一端到端测试 —— 从云南出发攻克 46 城直到统一",
          "desc": "纯 C#，不依赖 Unity"
        },
        {
          "path": "Assets/_Project/Scripts/Tests/TestRunner.cs",
          "title": "测试运行器 —— 调用所有 Phase 1→5 测试套件",
          "desc": "在 Unity Editor 中通过菜单或脚本执行"
        }
      ]
    }
  ]
}

export default data
