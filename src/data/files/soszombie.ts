/**
 * 由 scripts/convert-content.cjs 自动生成
 * 编辑请改 content/files/soszombie.json
 */
import type { ProjectFiles } from './types'

const data: ProjectFiles = {
  "slug": "soszombie",
  "sections": [
    {
      "id": "main",
      "title": "SOSZombie/Assets",
      "root": "SOSZombie/Assets",
      "total": 157,
      "files": [
        {
          "path": "01_Core/Common/InputCommand.cs",
          "title": "输入指令与按键位",
          "desc": "客户端唯一有权发送的东西就是「输入意图」。表现层负责把引擎输入翻译成 InputCommand， 仿真层只认 InputCommand —— 这条边界是将来接联机时「不用重写」的关键。"
        },
        {
          "path": "01_Core/Common/SimEvent.cs",
          "title": "仿真事件（表现层用来播特效/音效，不反向改状态）",
          "desc": ""
        },
        {
          "path": "01_Core/Common/SimMath.cs",
          "title": "仿真层数学工具",
          "desc": ""
        },
        {
          "path": "01_Core/Common/SimRandom.cs",
          "title": "种子化随机数（xorshift32）。禁用 UnityEngine.Random，保证可复现。",
          "desc": ""
        },
        {
          "path": "01_Core/Common/SimVector3.cs",
          "title": "仿真层向量（纯 C#，禁止引用 UnityEngine）",
          "desc": ""
        },
        {
          "path": "01_Core/Data/Ai/AiSharedData.cs",
          "title": "AI 共用参数（Data/Ai）",
          "desc": "【数据层·AI 行为】僵尸 AI 与 AI 人类都要用的节奏参数，放一处避免各写一份。 视线检测用的身体尺寸**不在这里** —— 那是\"角色属性\"，统一取 `HumanAttributes` （以前 AI 代码里硬编码了 0.305 / 1.62，和 `HumanAttributes` 重复了两份，已合并）。"
        },
        {
          "path": "01_Core/Data/Ai/HumanAiData.cs",
          "title": "AI 人类行为参数（Data/Ai）",
          "desc": "【数据层·AI 行为】M7：AI 人类会逃、会抱团、**会开枪**、**会买装备**。 设计意图：AI 要\"会还手\"，但不能变成神枪手，否则僵尸（尤其你变的那只）活不下来。 压火力的三个旋钮：① 只在 `EngageRange` 内开火 ② 每发 `AimErrorDegrees` 瞄准误差 ③ 点射 + 组间停顿。 ⚠ 下面每个数字背后都有一次实测（调参记录写在注释里，改的时候别把平衡搞崩）。"
        },
        {
          "path": "01_Core/Data/Ai/ZombieAiData.cs",
          "title": "僵尸 AI 参数（Data/Ai）",
          "desc": "【数据层·AI 行为】只管\"僵尸怎么想\"：多久重寻路一次、路点判定、什么时候放弃追击。 僵尸\"是什么\"（血量/速度/咬击）在 `Data/Attributes/ZombieAttributes.cs`。 僵尸之间的避让参数在 `ZombieAvoidanceData.cs`。"
        },
        {
          "path": "01_Core/Data/Ai/ZombieAvoidanceData.cs",
          "title": "僵尸避让参数（Data/Ai）",
          "desc": "【数据层·AI 行为】8 只僵尸同屏时\"不叠在一起、不堵门\"的调参面板（M4 的成果）。 设计定位：只做**意向层面**的错开（侧向推力 + 拥堵降速），不做身体碰撞。 实测教训都写在注释里 —— 下面每个数字背后都对应一次真实踩坑。"
        },
        {
          "path": "01_Core/Data/Attributes/HumanAttributes.cs",
          "title": "人类属性（Data/Attributes）",
          "desc": "【属性层·人类】这是\"一个人类是什么样\"的唯一真相：体质 + 身体尺寸 + 运动能力 + 移动手感。 以前这些散在 `MovementConfig`（运动）与 `PlayerConfig`（血量）两个文件里， 而且 AI 代码里还**硬编码了一份身体尺寸**（0.305 / 1.62）—— 现在全部收在这里，只留一份。 僵尸用的是同一个身体（同尺寸、同重力、同台阶高度），只有\"体质\"不同 → 见 `ZombieAttributes`。 单位：一律「米」。GoldSrc 换算 1 unit ≈ 0.0254 m（玩家 72 units ≈ 1.83 m）：   速度 250 units/s → 6.35 m/s ｜ 重力 800 units/s² → 20.32 m/s² ｜ 跳跃 268 units/s → 6.81 m/s"
        },
        {
          "path": "01_Core/Data/Attributes/ModeProfile.cs",
          "title": "模式参数（Data/Attributes，M18-A）",
          "desc": "============================================================================ 【\"模式\"回答什么问题】**这一局会发生什么**：   · 谁变身（随机 1 人变复仇者？还是普通感染？）   · 咬人转不转化（`AllowInfect`）   · 死了能不能回来（`ZombieRespawn`）   · 回合多久、准备期多长（`TimeLimit` / 预告） 而\"这个身份是什么\"（血量/速度/重力/外观）属于**职业**：僵尸看 `ZombieTypeProfile`， 人类看 `HumanTypeProfile`（M18-B）。模式与职业**严格分开** —— 这是照你服 ZP 的架构：   `zp50_gamemodes.sma`（选模式、谁变身） vs `zp50_class_nemesis.sma`（变成之后是什么）。 【为什么模式要独立成一层】你服有 **7 个模式**（感染/复仇者/幸存者/虫群/瘟疫/多重/末日）。   层分对了，以后加模式 = **加一个数据文件**（M11 的纪律再来一次），系统代码一行不动。 【和 ZP 的一处差异（服主要求）】ZP 是\"按注册顺序试 + 每个模式 1/X 概率\"（`zp_nemesis_chance 20`   = 1/20）；我们改成**加权随机**（`Weight` 越大越容易出，0 = 不启用）—— 更好控制，   也更容易\"只开一个模式\"做测试。 ============================================================================"
        },
        {
          "path": "01_Core/Data/Attributes/ShopItemProfile.cs",
          "title": "商品条目（Data/Attributes）",
          "desc": "【属性层·道具】\"一件商品是什么\"：编号 / 名字 / 说明 / 价格 / **效果**。 M11 数据层内容化：把\"效果\"从**系统代码**搬进**数据**。   以前 `ShopSystem` 里按商品编号写了三遍 `switch`（购买 / 能不能买 / 不能买的原因），   每加一件商品都要改三个地方，还要给 `ShopCatalog` 加一组专属字段   （`NightVisionName` / `ArmorPrice` / `ArmorAmount` …）—— 通用字段与专属字段重复定义。   现在：商品 = 一条数据（本结构），效果类型 + 参数 + 是否\"只能买一次\"；   `ShopSystem` 只在一处按**效果类型**分派。   **加一件道具 = 新建一个内容文件**（用已有的效果类型时，系统代码一个字都不用改）。"
        },
        {
          "path": "01_Core/Data/Attributes/Weapons/WeaponProfile.Ammo.cs",
          "title": "武器参数「弹夹」抽屉（`WeaponProfile` 的一部分，M12-C 按分类分文件）",
          "desc": "这里放\"子弹怎么进枪、打多快、打完怎么装回来\"：弹匣 / 备弹 / 射速 / 换弹 / 拉栓 / 打空自动换弹。 逻辑层消费它的地方：`WeaponSystem`（开火节流、换弹计时、自动换弹）、 `WeaponSwitch`（判断这把枪还有没有子弹）、`PlayerHud`（画子弹数）。"
        },
        {
          "path": "01_Core/Data/Attributes/Weapons/WeaponProfile.cs",
          "title": "武器参数（一把枪的全部数值）· 主文件：身份 / 动作 / 开火方式",
          "desc": "⚠️ 参数参照 CS 1.6（公开数值资料），再按\"僵尸血量 450\"这个前提做过适配，不追求逐位一致。 数值单位：距离米、时间秒、角度度、速度 m/s。 来源标注：   [CS参考] = 公开的 CS 1.6 数值资料（伤害 / 射速 / 弹匣 / 备弹 等）   [待标定] = 自定，等实测后按\"打靶数据 → 改哪个参数\"的对照法调整 ============================================================================ 【武器总属性的文件分工】M12-C：按类别拆成 8 个 `partial` 文件。 拆的只是\"抽屉\"——**字段名一个都没变**，所以 7 个内容文件、逻辑层、203 个用例都不用改。   WeaponProfile.cs            这里：身份（名字/槽位/类别/权重/价格）+ 动作（抬枪/收枪/拿枪速度）                                     + 开火方式（全自动 / 几颗弹丸）+ 空仓冷却 + 射程 + Clone()   WeaponProfile.Ammo.cs       弹夹：弹匣 / 备弹 / 射速 / 换弹 / 拉栓 / 打空自动换弹   WeaponProfile.Damage.cs     威力：基础伤害 / 护甲穿透 / 距离衰减（含分段表）/ 命中部位倍率   WeaponProfile.Knockback.cs  击退力：ImpactForce（被击方的抗击退在 `ZombieAttributes`）   WeaponProfile.Recoil.cs     后坐力：每发上跳与摆动 / 弹道图案 / 恢复延迟 / 视角抖动   WeaponProfile.Spread.cs     散布：基础散布 / 连发惩罚 / 站立·移动·空中·下蹲倍率   WeaponProfile.Scope.cs      开镜：有没有镜 / 档位 FOV / 开镜时间 / 开镜后的准度与速度   WeaponProfile.Melee.cs      近战：射程 / 命中锥 改动纪律（M11 定下，M12-C 继续执行）：   · 加一把枪 = 新建 `Data/Content/Weapons/<名字>.cs` + `Data/Catalogs/WeaponCatalog.cs` 加一行   · 逻辑层**永远不认武器名字**，只认 `WeaponProfile` 这个接口（按编号查表拿到）   · 新增一个属性 = 在对应类别文件里加字段（默认值必须保持老行为），内容文件按需覆盖 ============================================================================"
        },
        {
          "path": "01_Core/Data/Attributes/Weapons/WeaponProfile.Damage.cs",
          "title": "武器参数「威力」抽屉（`WeaponProfile` 的一部分，M12-C 按分类分文件）",
          "desc": "这里放\"这一枪能打掉多少血\"：基础伤害 / 护甲穿透 / 距离衰减 / 命中部位倍率。 ============================================================================ 【距离衰减模型】M13-A 改成**指数模型**（服主定的：\"按指数来就好，范围自己订，实测再看\"）。       伤害系数 = RangeModifier ^ (距离 / FalloffUnitDistance)   每经过 `FalloffUnitDistance` 米，伤害乘一次 `RangeModifier`。两个数都是**每把枪一份**，   所以\"霰弹枪该衰减得比步枪快得多\"这种事，是改数据而不是改代码。   为什么不用 M12-B 的分段常量表：那个结构建立在\"CS 的衰减是分段常量\"这个**我没核实过的**   前提上（见 `Docs/10_数值出处清单.md` 6.1）。实际 CS 家族更像\"每 500 units 乘一次   rangeModifier\"的指数衰减，指数模型同时也是三角函数级好调的形状，所以分段表已删除。   ⚠ 现在这套 `RangeModifier / FalloffUnitDistance` 是**我们自己定的**（标 ⚖️），     不是抄来的：目标是\"手感接近换源前 + 步枪远距离更可靠\"，实测后再调。 ============================================================================"
        },
        {
          "path": "01_Core/Data/Attributes/Weapons/WeaponProfile.Grenade.cs",
          "title": "投掷物参数（M17-C）· `WeaponProfile` 的第 9 个 partial 文件",
          "desc": "【为什么手雷也是一种\"武器\"】服主要求做三种手雷（冰冻/燃烧/照明）。做成独立的道具系统就意味着 掉枪、拾取、槽位、商城、HUD、AI 全部要写第二套 —— 正是\"两套系统\"。做成武器之后：   · M16 的**丢枪 / 捡枪 / 掉落 / 回合重置**一行代码都不用改就适用于手雷；   · 商城的 `GrantWeapon` 效果直接能用；   · HUD 的槽位条、`WeaponSwitch` 的\"能不能用\"、`IsUsable` 全是现成的。 所以手雷占 **4 键的独立槽位**（`WeaponSlot.Grenade`），装 **1 颗**，投出去槽位就空了。 【和\"状态\"的分工】（重要，别混）   · **这个文件**：一颗手雷**自己**的参数 —— 怎么扔、扔出去留多久、圈多大。   · **`Data/Rules/GrenadeData.cs`**：**中弹之后挂在目标身上**的状态参数（燃烧伤害/减速、     寒冷累积与解冻速度）—— 那些是\"受害者身上发生的事\"，不该由\"谁扔的\"决定。 【数值出处】服主 2026-09 定的口径（见 `Docs/14` 第 12、13 节）+ 你服 ZP 的配置：   · 冰圈/火圈都是 **10 秒**（服主：\"燃烧弹 10 秒火圈\"、\"冰冻弹也一样……落地留下 10 秒冰圈\"）   · 引信 **0.8 秒**（服主：\"落地的 0.8 秒爆\"）   · 投掷**固定初速**（服主：\"投掷是固定初速\"，不做蓄力）   · 照明弹 60 秒 / 半径 25m ✅ 你服 `zp_grenade_flare_duration` / `zp_grenade_flare_radius`"
        },
        {
          "path": "01_Core/Data/Attributes/Weapons/WeaponProfile.Knockback.cs",
          "title": "武器参数「击退力」抽屉（`WeaponProfile` 的一部分，M12-C 按分类分文件）",
          "desc": "⚠ 击退是**两个抽屉配一对**：   · 攻击侧（这里）：`ImpactForce` —— 这一枪能推多大力   · 被击侧（`ZombieAttributes`）：`KnockbackResist` 抗击退 / `KnockbackMax` 上限 / `KnockbackDamping` 衰减 所以\"改击退手感\"通常要同时看这两个文件 —— 只改武器会让坦克和快速僵尸表现差很多。 结算链路（M12-A 修正后的模型，见 `WeaponSystem.FireOneProjectile`）：   这一发实际推的力 = ImpactForce × (1 − 抗击退) × (1 − 当前击退/上限)   然后夹一次硬上限兜底，最后在 `ZombieSystem` 里按 `KnockbackDamping` **指数**衰减。 为什么要\"越推越推不动\"：8 个人同时开枪时纯加法会把僵尸瞬间送飞（服主实测反馈）。"
        },
        {
          "path": "01_Core/Data/Attributes/Weapons/WeaponProfile.Melee.cs",
          "title": "武器参数「近战」抽屉（`WeaponProfile` 的一部分，M12-C 按分类分文件）",
          "desc": "近战武器（匕首）不消耗弹药：按\"射程 + 正面命中锥\"判定，永远打躯干（没有爆头）。 逻辑层消费它的地方：`WeaponSystem`（近战分支排在开火路径**最前面** —— 匕首弹匣是 0， 排在换弹判断后面会被当成\"空匣\"直接 return）、`HumanCombat`（AI 拿刀时的冲锋距离）、 `WeaponSwitch`（近战不参与\"打空自动换枪\"）。"
        },
        {
          "path": "01_Core/Data/Attributes/Weapons/WeaponProfile.Recoil.cs",
          "title": "武器参数「后坐力」抽屉（`WeaponProfile` 的一部分，M12-C 按分类分文件）",
          "desc": "M12-A 把开枪反馈补成\"FPS 通用三层\"，三层都在这个文件里：   ① 弹道后坐力（改子弹方向）= RecoilPitchPerShot / RecoilYawPerShot + **弹道图案**      —— 图案是\"第 1 发、第 2 发…第 N 发\"的固定曲线（CS 玩家背的就是它），有它才有\"压枪\"   ② 恢复延迟（RecoilRecoveryDelay）：停火后**等一会儿**才开始回正，      否则\"点一下放一下\"等于没后坐力   ③ 视角抖动（ViewPunch）：只晃画面、**不影响子弹方向**，回正快得多 恢复阶段的两个\"方向性系数\"（M12-C 从 `WeaponSystem` 搬进数据层）：   RecoilYawRecoveryScale / ViewPunchYawScale —— 水平回正比垂直慢/快多少（原来写死 0.5）。 逻辑层消费它的地方：`WeaponSystem`（累积与恢复）、`SimRunner`（叠到相机上）。"
        },
        {
          "path": "01_Core/Data/Attributes/Weapons/WeaponProfile.Scope.cs",
          "title": "武器参数「开镜 / 瞄准（ADS）」抽屉（`WeaponProfile` 的一部分，M12-C 按分类分文件）",
          "desc": "只有狙击枪有镜（`HasScope`）；右键是\"**按一下切一档**\"（M12-B，不是按住）， 切过最后一档就退出开镜 —— CS 的倍镜手感。 逻辑层消费它的地方：`WeaponSystem`（档位切换、开镜进度、开火后退镜）、 `Simulation`（开镜时移动更慢）、`SimRunner`（按档位插值相机 FOV）。"
        },
        {
          "path": "01_Core/Data/Attributes/Weapons/WeaponProfile.Spread.cs",
          "title": "武器参数「散布」抽屉（`WeaponProfile` 的一部分，M12-C 按分类分文件）",
          "desc": "模型：有效散布 = 状态散布（基础散布 × 状态倍率） + 连发惩罚   · 状态散布：站着/走着/跳着/下蹲时**第一发**的精度   · 连发惩罚：每发累加，停火超过 `SpreadRecoveryDelay` 之后才开始按 `SpreadRecovery` 恢复 全部单位是\"度（半角）\"。 逻辑层消费它的地方：`WeaponSystem.StateSpreadScale`（算状态倍率）、 `Ballistics.ApplySpread`（按散布随机偏转每一颗弹丸）。"
        },
        {
          "path": "01_Core/Data/Attributes/Weapons/WeaponUpgrade.cs",
          "title": "武器「个人加成」（Data/Attributes/Weapons）",
          "desc": "============================================================================ 【这是给谁留的位置】M12-C 预留：1.6 SOSZOMBIE 那套\"升级插件属性\"。 1.6 的升级插件本质是\"**这个人的**伤害 +10%、弹夹 +30%、击退 +50%\"—— 同一把 AK-47，升过级的人和没升级的人打出来的数值**不一样**。 但武器本身就一份属性（`WeaponProfile`，一把枪一个文件），所以不能把升级写进武器里， 否则\"每把枪一份数值\"就变成\"每人每把枪一份数值\"，以后查数值会非常痛苦。 于是分成两层，各管各的：   · `WeaponProfile`（8 个分类文件）= **基础数值**，一把枪一份，和谁拿它无关   · `WeaponUpgrade`（这里）      = **个人加成**，一人一份，默认全中性（各倍率 = 1） 结算：`WeaponResolver.Resolve(基础属性, 个人加成)` → 这一 tick 真正生效的数值。 **真的（真人）和 BOT 用同一套**：它按角色下标存放（`Simulation.WeaponUpgrades`）， 不区分谁是真人 —— 与\"BOT 和真人共用游戏体系\"这条总纪律一致。 现状（M12-C）：**只有结构，没有任何升级项、没有 UI、没有购买入口**。 所有加成恒为 1 → `IsNeutral == true` → `WeaponResolver` 直接返回基础属性对象本身 （零拷贝、零分配、行为与加这一层之前**逐位相同**）。 ============================================================================"
        },
        {
          "path": "01_Core/Data/Attributes/WeaponSlots.cs",
          "title": "携行格布局（Data/Attributes，M19）",
          "desc": "============================================================================ 【为什么要有这个文件】M19 之前\"武器槽位\"= \"键盘 1/2/3/4\"，**一个类别一个格子**。 于是：① 主武器只能带一把 → 商城买新枪只能把旧的丢在地上（服主不要这样）；       ② 三种手雷共用一个格子 → 商城只能判\"4 键那个格子空不空\" → 全局只能买一颗。 现在拆成两层（这是 M19 的核心）：   · **类别**（`WeaponSlot`，4 种）—— 装备**语义**：这是主武器还是投掷物。`WeaponProfile.Slot` 用它。   · **携行格**（本文件，9 格）—— 装备**放哪儿**：每个角色有 9 个格子，每格独立记住一把武器 + 自己的弹药。   ------------------------------- 携行格一览 -------------------------------    格  键   类别        容量   出生自带    0   1    主武器       第 1 把  ✅ 玩家在菜单里选的 / BOT 按权重抽的    4   1    主武器       第 2 把  ❌（商城买）    5   1    主武器       第 3 把  ❌（商城买）    6   1    主武器       第 4 把  ❌（商城买）    1   2    副武器       1 把    ✅ Glock-18（副武器只有一格，照服主口径）    2   3    匕首         1 把    ✅ 匕首（人人都有，不能丢）    3   4    投掷物       第 1 颗  ✅ 冰冻弹    7   4    投掷物       第 2 颗  ✅ 燃烧弹    8   4    投掷物       第 3 颗  ✅ 照明弹   -------------------------------------------------------------------------- 【为什么前 4 格编号 == `WeaponSlot` 的值】`(int)WeaponSlot.Primary == 0` 之类在代码与用例里   到处都是（\"每个类别的**第 1 格**\"）。保持这个相等，老代码/老用例的下标语义就仍然成立，   M19 只是在后面**追加**了 5 个格子（2/3/4 号主武器 + 2/3 号投掷物）。 【键位规则（服主口径）】一个类别只对应一个键（1/2/3/4）：   · 不在这个类别 → 切到该类别的**第 1 把能用的**；   · 已经在这个类别 → 切到**同一类别的下一格**（跳过空格与空弹药的）。   所以\"1 键在 4 把主武器之间循环、4 键在 3 颗雷之间循环\"是**同一条规则**的两个结果，   规则本身在 `WeaponSwitch.PressCategory` 一处。 【容量改起来是哪一行】改 `PrimaryCapacity` / `GrenadeCapacity` 两个常量 +   `CharacterState` 里对应的字段（每格一个字段 —— 结构体不能放变长数组）。 ============================================================================"
        },
        {
          "path": "01_Core/Data/Attributes/ZombieAttributes.cs",
          "title": "僵尸属性（Data/Attributes）",
          "desc": "【属性层·僵尸】只放\"僵尸这种生物是什么样\"：体质 + 攻击 + 感知 + 重生。 **不含 AI 行为参数**（重寻路 / 避让 / 点射节奏）—— 那些在 `Data/Ai/` 下。 僵尸的身体尺寸、重力、台阶高度**复用人类**（同一副身体被感染），见 `HumanAttributes`。 僵尸的**状态**（位置/血量/AI 状态）在 `State/ZombieState.cs`。"
        },
        {
          "path": "01_Core/Data/Attributes/ZombieTypeProfile.cs",
          "title": "僵尸类型（Data/Attributes）",
          "desc": "【属性层·僵尸】把 M10 之前\"所有僵尸共用一份属性\"改成\"**每种僵尸一份属性**\"。 加一种僵尸 = 在 `ZombieCatalog.Types` 里写一条（不用改任何系统代码）—— 和 `WeaponCatalog` 加一把枪是同一个套路。 设计边界（M10 定的）：   ✔ 这一版**只做属性差异**（血量 / 速度 / 咬击 / 感知 / 重生 / 颜色体型）——     没有新机制，所以不需要动任何系统。   ✘ 不做技能（拉人 / 扑击 / 吐酸）—— 那属于\"新机制\"，等这一层稳定后再各自单独一轮。"
        },
        {
          "path": "01_Core/Data/Catalogs/ModeCatalog.cs",
          "title": "模式总表（Data/Catalogs，M18-A）",
          "desc": "【总表层】只回答两个问题：\"一共有哪些模式、按什么顺序\"。 每个模式的参数在 `Data/Content/Modes/<名字>.cs`（一个模式一个文件）。 **加一个模式 = 新建一个内容文件 + 在下面的 `Profiles` 里加一行**（不改任何系统代码）。 编号约定：**0 号是经典感染模式**（默认模式；`ModeData.DefaultModeId` 指向它）。 构造时把内容模板**克隆成自己的一份**（照 `WeaponCatalog` / `ZombieCatalog` 的做法， 否则\"某个用例改了权重\"会污染其它仿真 —— M11 实测踩过跨用例污染）。"
        },
        {
          "path": "01_Core/Data/Catalogs/ShopCatalog.cs",
          "title": "道具商城总表（Data/Catalogs）",
          "desc": "【总表层】这里**只回答两个问题**：\"一共有哪些道具、按什么顺序\"。 每件道具的价格/效果在 `Data/Content/Shop/<名字>.cs`（一件道具一个文件）。 加一件道具 = 新建一个内容文件 + 在下面的 `Items` 里加一行。 编号约定：**0 必须留给\"不买\"**。   `InputCommand.BuyItemId` 是 int，结构体默认值恒为 0；如果 0 代表真商品，   任何\"只置了购买位、没指定商品\"的指令都会静默买那件东西（M7 实测踩过，有用例守着）。"
        },
        {
          "path": "01_Core/Data/Catalogs/WeaponCatalog.cs",
          "title": "武器表（Data/Attributes）",
          "desc": "【总表层·Catalogs】这里**只回答两个问题**：\"一共有哪些武器、按什么顺序\"。 每一把枪的具体数值在 `Data/Content/Weapons/<名字>.cs`（一个武器一个文件，M11 内容化重构）。 加一把枪 = 新建一个内容文件 + 在下面的 `Profiles` 里加一行（**不改任何系统代码**）。 M10-C：7 把武器，分三个槽位（键盘 1/2/3）——   主武器：AK-47（基准）/ MP5（快而轻）/ XM1014 霰弹枪（贴脸爆裂）/ AWP 狙击（一枪重伤）   副武器：Glock-18（起手就有）/ 沙漠之鹰（手枪里最疼）   匕首：近战（不消耗弹药） 分配规则（与僵尸类型同一条纪律——\"**BOT 随机 / 玩家选择**\"，属性与规则完全相同）：   · BOT：按 `SpawnWeight` 从池子里随机抽   · 玩家：在\"武器选择\"菜单里自己挑（默认 AK + Glock + 匕首） 平衡前提：僵尸血量 450（普通）。所以 AWP 115 躯干 4 枪、爆头 ×4 = 460 **一枪带走**； 霰弹 22×6 = 132 贴脸一发；MP5 单发 26 但 750 RPM，靠持续输出。"
        },
        {
          "path": "01_Core/Data/Catalogs/ZombieCatalog.cs",
          "title": "僵尸类型表（Data/Attributes）",
          "desc": "【属性层·僵尸】一共有哪几种僵尸、以及\"随机抽取\"和\"取属性\"这两个查询。 加一种僵尸 = 在 `Types` 里加一条（不用改系统代码）。 编号约定（**0 必须是\"普通\"**）：`ZombieState.ZombieTypeId` 的默认值是 0， 而\"测试里手工摆的僵尸 / 老存档\"都会落到 0 —— 所以 0 号只能是基准的那一种。 四种角色的分工（都在\"只有属性差异\"的范围内）：   普通：基准（数值 = M10 之前那套）   快速：血少、跑得比人快很多 —— 追人用，但很容易被打死   铁壁：血很厚、很慢、一口很疼 —— 逼人类换位，但追不上人   母体：开局那只（血最厚、伤害最高），**只在开局出现**（SpawnWeight = 0）"
        },
        {
          "path": "01_Core/Data/Content/Grenades/GrenadeFire.cs",
          "title": "手雷内容：燃烧弹（Data/Content/Grenades，M17-C）",
          "desc": "【它是什么】服主口径（`Docs/14` §12）：   落地 **0.8 秒**后炸开，留下 **10 秒火圈**；圈内目标被**持续刷新\"燃烧 3 秒\"**：   期间每 **0.2 秒 5 点**火伤 + 移速 **×0.5**；**离开火圈（或火圈到点）以后，残余的那 3 秒照样烧完**。 【数值出处】   ✅ 你服 `zombieplague.cfg`：`zp_grenade_fire_damage 5`（每 0.2 秒）、`zp_grenade_fire_slowdown 0.5`   ⚖️ 服主 2026-09 定：火圈 10 秒、引信 0.8 秒、燃烧状态 3 秒（刷新型）   ⚠ 说明：ZP 的 `zp_grenade_fire_duration 10` 是\"**人身上烧 10 秒**\"（ZP 没有火圈），     我们把它重新解释成\"**火圈 10 秒 + 状态 3 秒**\" —— 这是**有意的差异**，记在 `Docs/10`。 【站着不动挨满会掉多少血】火圈 10 秒 + 残留 3 秒 = 13 秒 × 25 dps = **325 伤**（普通僵尸 450 血）。   参考：ZP 是烧 10 秒 = 250 伤。服主如果要削弱，改 `GrenadeData` 里的伤害或这里 `ZoneDuration` 即可。"
        },
        {
          "path": "01_Core/Data/Content/Grenades/GrenadeFlare.cs",
          "title": "手雷内容：照明弹（Data/Content/Grenades，M17-C）",
          "desc": "【它是什么】服主定的：\"**照明弹暂时只做视觉效果**\"。   落地 0.8 秒后炸开 → 在地上留 **60 秒**、半径 **25m** 的**白光**：   · **不改任何玩法状态**（不点燃、不减速、不影响 AI）—— 核心只留一张\"光\"的记录，     表现层读它画点光源 + 光柱；   · 为什么核心也要留记录而不是纯表现层画：光要**可同步、可哈希、回合重置能清掉**，     而且将来联机时\"谁在哪扔了颗照明弹\"是服务器说了算（和圈一样属于世界状态）。 【数值出处】✅ 你服 `zombieplague.cfg`：   zp_grenade_flare_duration 60    // Flare lightning duration in seconds   zp_grenade_flare_radius 25      // Flare lightning radius   zp_grenade_flare_color 0        // 0 = 白色"
        },
        {
          "path": "01_Core/Data/Content/Grenades/GrenadeFrost.cs",
          "title": "手雷内容：冰冻弹（Data/Content/Grenades，M17-C）",
          "desc": "【它是什么】服主口径（`Docs/14` §13）：落地 **0.8 秒**后炸开，留下 **10 秒冰圈**； 圈内目标被**持续刷新\"寒冷\"**：减速一路累积到 **0 = 完全冻住**（不能动、不能咬，但照样吃击退）； 走出圈外按 **1.5 秒**逐渐解冻（\"渐冻 → 渐融\"），寒冷状态本身 3 秒后消失。 【数值出处】   ⚖️ 服主 2026-09 定：冰圈 10 秒、引信 0.8 秒、冻满 1.5 秒、解冻 1.5 秒、状态 3 秒。   ✅ 你服 ZP 的 `zp_grenade_frost_duration 3` 是\"人身上冻多久\"，我们用它作**寒冷状态时长**（3 秒）。 【它不是武器数值】伤害/射速/弹匣这些对它是无意义的（投掷物不开火）：   弹匣 = 1（装一颗）、备弹 = 0、伤害 = 0、散布/后坐力 = 0（不参与开火）。"
        },
        {
          "path": "01_Core/Data/Content/Modes/ModeBasic.cs",
          "title": "模式内容：感染 / 复仇者 / 幸存者（Data/Content/Modes，M18-A）",
          "desc": "【一个模式一个文件】（M11 的纪律）：加一个模式 = 新建这样一个文件 + 总表加一行。 【数值出处】全部来自**服主自己服务器**的 ZP 配置（`zombieplague.cfg`）：   感染：`zp_infection_chance 1`（默认模式）、`zp_infection_min_players 0`   复仇者：`zp_nemesis_chance 20`、`zp_nemesis_min_players 0`、`zp_nemesis_allow_respawn 0`   幸存者：`zp_survivor_chance 20`、`zp_survivor_min_players 0`、`zp_survivor_allow_respawn 0` ⚠ **权重**（服主 2026-09 定）：感染 **50** / 复仇者 **25** / 幸存者 **25**（合计 100）。   ⚠ 实际概率会被\"禁止连续同模式\"略微影响：上一回合若是复仇者，这一回合就只在剩下两个模式里按权重分   （感染 50 : 幸存者 25 → 2:1）。你服 ZP 的 `zp_prevent_consecutive_modes 1` 也是这个行为。 ⚠⚠ **现阶段（M18-A）复仇者/幸存者模式用的是\"普通僵尸\"**：它们的**职业**   （血量 2000 / 重力 ×0.5 / 免疫冰冻雷 / M249…）是 M18-C / M18-D 的内容。   所以现在抽到这两个模式，你能验的是**流程**（1 打 9、谁死谁出局、杀光僵尸就赢），   属性还没到位 —— 那不是 bug，是分阶段落地。"
        },
        {
          "path": "01_Core/Data/Content/Shop/ItemArmor.cs",
          "title": "道具内容：护甲（Data/Content/Shop）",
          "desc": "【内容层】一件道具 = 一个文件（M11 内容化重构）。 护甲的\"减伤比例\"**不在这里** —— 那是角色属性（`HumanAttributes.ArmorAbsorbRatio`）， 属于\"受击规则\"而不是\"商品价格\"。这里只写\"卖多少钱、买完给多少耐久\"。"
        },
        {
          "path": "01_Core/Data/Content/Shop/ItemGrenades.cs",
          "title": "道具内容：手雷（Data/Content/Shop，M17-C）",
          "desc": "【服主定的规则】   > \"一次可以买 1 颗，上限都是 1 颗，5 弹药袋一颗。手上有别的雷时禁止购买新的。\" 所以三件商品都复用 `GrantWeapon` 效果（手雷就是武器），价格 5 袋； **\"上限 1 颗\"和\"有别的雷就不让买\"由同一条规则满足**（见 `ShopSystem.IsOwned`： 只要**手雷槽位里有东西**就算已拥有，不论是哪一种）—— 不需要写两套判断。"
        },
        {
          "path": "01_Core/Data/Content/Shop/ItemNightVision.cs",
          "title": "道具内容：夜视仪（Data/Content/Shop）",
          "desc": "【内容层】一件道具 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这件道具是什么、多少钱、买完有什么效果\"； \"一共有哪些道具、按什么顺序\"在 `Data/Catalogs/ShopCatalog.cs`。 加一件新道具（例如医疗包）= 新建一个这样的文件 + 总表加一行。 只要效果是**已有的种类**（`ShopEffectKind`），系统代码一个字都不用改。"
        },
        {
          "path": "01_Core/Data/Content/Shop/ItemWeaponHeavy.cs",
          "title": "道具内容：重武器（AWP / M249 / SG550 / G3SG1）（Data/Content/Shop，M17）",
          "desc": "【服主定的规则】（原话）   > \"关于重型武器，AWP/M249/SG550/G3SG1 都在主武器菜单中去除不被玩家开局选择，只能商城购买。\" 所以这四把在 `WeaponProfile` 里标了 `PurchaseOnly = true`：   · 开局武器菜单里**不列**它们（`WeaponCatalog.SelectableAtStart` 是唯一判断处）；   · BOT 的随机装备池里**也不抽**它们（否则 BOT 免费拿 AWP、你花钱买，等于真人吃亏）。 【价格出处】✅ **你服 ZP 的现成值**：   `scripting/zp50/zp50_item_weapons.sma` 里 `#define ITEM_COST 10`   —— AWP / M249 / SG550 / G3SG1 都是\"额外物品\"，**每件 10 个弹药袋**   （ZP 里这四把不在免费买枪菜单 `zp50_buy_menus.sma` 里，和服主要求的规则完全一致）。 ⚠ 我们和 ZP 的**收入不一样**：ZP 是 500 伤害 = 1 袋，我们是 **100 伤害 = 1 袋**（服主定的），   也就是同样打 10 袋我们要快 5 倍。第一版先照抄 10 袋（服主：\"随便按照你的想法填就好了\"），   实测之后再调 —— 调价只用改下面这几个数字，系统代码一行都不用动。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Ak47.cs",
          "title": "武器内容：Ak47（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Aug.cs",
          "title": "武器内容：AUG（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Awp.cs",
          "title": "武器内容：Awp（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Deagle.cs",
          "title": "武器内容：Deagle（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Elite.cs",
          "title": "武器内容：双持贝瑞塔（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Famas.cs",
          "title": "武器内容：FAMAS（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/FiveSeven.cs",
          "title": "武器内容：Five-SeveN（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/G3sg1.cs",
          "title": "武器内容：G3SG1（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Galil.cs",
          "title": "武器内容：Galil（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Glock18.cs",
          "title": "武器内容：Glock18（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Knife.cs",
          "title": "武器内容：Knife（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/M249.cs",
          "title": "武器内容：M249 机枪（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/M3.cs",
          "title": "武器内容：M3 泵动霰弹（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/M4a1.cs",
          "title": "武器内容：M4A1（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Mac10.cs",
          "title": "武器内容：MAC-10（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Mp5.cs",
          "title": "武器内容：Mp5（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/P228.cs",
          "title": "武器内容：P228（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/P90.cs",
          "title": "武器内容：P90（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Scout.cs",
          "title": "武器内容：Scout 轻狙（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Sg550.cs",
          "title": "武器内容：SG-550（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Sg552.cs",
          "title": "武器内容：SG-552（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Tmp.cs",
          "title": "武器内容：TMP（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Ump45.cs",
          "title": "武器内容：UMP45（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Usp.cs",
          "title": "武器内容：USP（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。 数值来源（M13-B 扩充武器库）：伤害/射速/弹匣/备弹/价格 = 公开的 CS 1.6 数值表（多源交叉， 分歧记录见 Docs/10 §2.1）；击退力 = **本服 ZP 配置** [Knockback Power for Weapons]； 散布/后坐力/衰减/换弹/移速等手感数值 = 按同类枪的模板配的（⚖️ 自定，实测再调）。"
        },
        {
          "path": "01_Core/Data/Content/Weapons/Xm1014.cs",
          "title": "武器内容：Xm1014（Data/Content/Weapons）",
          "desc": "【内容层】一把武器 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这把武器是什么样\"；\"一共有哪些武器、按什么顺序\"在 Data/Catalogs/WeaponCatalog.cs。 加一把新枪 = 新建一个这样的文件 + 总表加一行（**不改任何系统代码**）。"
        },
        {
          "path": "01_Core/Data/Content/Zombies/Fast.cs",
          "title": "僵尸内容：Fast（Data/Content/Zombies）",
          "desc": "【内容层】一种僵尸 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这种僵尸是什么样\"；\"一共有哪些、按什么顺序、能不能被随机抽到\"在 Data/Catalogs/ZombieCatalog.cs（SpawnWeight = 0 = 只由开局指定，例如母体）。"
        },
        {
          "path": "01_Core/Data/Content/Zombies/Mother.cs",
          "title": "僵尸内容：Mother（Data/Content/Zombies）",
          "desc": "【内容层】一种僵尸 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这种僵尸是什么样\"；\"一共有哪些、按什么顺序、能不能被随机抽到\"在 Data/Catalogs/ZombieCatalog.cs（SpawnWeight = 0 = 只由开局指定，例如母体）。"
        },
        {
          "path": "01_Core/Data/Content/Zombies/Normal.cs",
          "title": "僵尸内容：Normal（Data/Content/Zombies）",
          "desc": "【内容层】一种僵尸 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这种僵尸是什么样\"；\"一共有哪些、按什么顺序、能不能被随机抽到\"在 Data/Catalogs/ZombieCatalog.cs（SpawnWeight = 0 = 只由开局指定，例如母体）。"
        },
        {
          "path": "01_Core/Data/Content/Zombies/Tank.cs",
          "title": "僵尸内容：Tank（Data/Content/Zombies）",
          "desc": "【内容层】一种僵尸 = 一个文件（M11 内容化重构：一个东西一个文件）。 这里只写\"这种僵尸是什么样\"；\"一共有哪些、按什么顺序、能不能被随机抽到\"在 Data/Catalogs/ZombieCatalog.cs（SpawnWeight = 0 = 只由开局指定，例如母体）。"
        },
        {
          "path": "01_Core/Data/GameData.cs",
          "title": "数据层总入口（Data）",
          "desc": "【数据层】把所有\"软编码\"的数据类装在一起，作为 `Simulation` 的构造参数。 为什么要有它：拆细之后数据类变成 10 个，构造函数再堆 10 个参数就离谱了； 这里只做\"打包\"，本身**不含任何数值**（数值永远在各自的分类文件里）。 分类原则（M8 拆分定的）：   Attributes/ = 角色与武器\"是什么样\"（体质、身体尺寸、运动能力、武器数值）   Ai/         = \"怎么想\"（僵尸 AI / AI 人类 / 避让 / 共用节奏）   Rules/      = \"一局怎么走\"（回合、掉落、商店）"
        },
        {
          "path": "01_Core/Data/Rules/AmmoPackRewardData.cs",
          "title": "弹药袋奖励规则（Data/Rules，M16）",
          "desc": "【为什么改成这样】服主的决定：**弹药袋不再作为掉落物**，改成\"打在显示上加逻辑\"：   > \"把弹药袋不做为掉落物，而是直接在弹药袋的显示上面添加逻辑，100 伤害值 = 1 个弹药袋。\" 也就是从\"捡地上的袋子\"变成\"打伤害就有袋子\"（和 ZP 的做法一致 —— 你服务器上 `zp50_rewards_ammopacks.sma` 就是按伤害/击杀发袋，见下表）。 【出处对照】ZP 的默认值（你服的 `zombieplague.cfg`）：   zp_ammop_damage = 1            开启按伤害奖励   zp_ammop_zombie_damaged_hp = **500**   对僵尸 500 伤害 = 1 袋   zp_ammop_human_damaged_hp = **250**    僵尸对人 250 伤害 = 1 袋   zp_ammop_zombie_killed = 1 / human_killed = 1    击杀 +1   zp_ammop_human_infected = 1    感染人类 +1（僵尸侧）   zp_ammop_winner = 3 / loser = 1                  胜负 +3 / +1 ⚠ 我们用 **100 伤害 = 1 袋**（服主定的），比 ZP 默认富 5 倍 —— 这是**平衡决定**，   实测觉得钱太多就调大这个数（或调高商店价格）。"
        },
        {
          "path": "01_Core/Data/Rules/GrenadeData.cs",
          "title": "手雷状态规则（Data/Rules，M17-C）",
          "desc": "【这个文件装什么】**中弹之后挂在目标身上的状态**参数 —— 也就是\"受害者身上发生的事\"。 一颗手雷自己的参数（怎么扔、圈多大、留多久）在 `WeaponProfile.Grenade.cs` 里。 这么分是因为：伤害与减速的强度**不该由\"谁扔的\"决定**（否则以后加一颗\"高级燃烧弹\"， 已经挂在身上的人会不知道该按哪颗算）。一手交钱一手交货：圈是投掷者的，状态是受害者的。 【出处】（服主口径见 `Docs/14` §12、§13）   ✅ 你服 `zombieplague.cfg`：        zp_grenade_fire_damage 5        // 每 0.2 秒 5 点（= 25 dps）        zp_grenade_fire_slowdown 0.5    // 燃烧期间移速 ×0.5        zp_grenade_frost_duration 3     // 冻结 3 秒（⚠ ZP 里这是\"人身上冻多久\"；                                        //   我们按服主口径改成\"寒冷状态的时长\"，见下面 ChillDuration）   ⚖️ 服主 2026-09 定的（`Docs/14` §13.5，六条已确认）：        冻满时间 1.5 秒 / 解冻时间 1.5 秒 / 状态时长 3 秒（冰火都一样）"
        },
        {
          "path": "01_Core/Data/Rules/LoadoutChoiceData.cs",
          "title": "本地玩家的装备选择（Data/Rules）",
          "desc": "【数据层·偏好】\"我这一局想拿哪把主武器 / 副武器\"。匕首人人都有，不用选。 和 `ZombieChoiceData` 是同一条纪律（M10 的对称原则）：   **BOT 和真人共用同一张武器表、同一套属性**，区别只在\"谁来做选择\"：     · BOT：`WeaponCatalog.RollForSlot` 按权重**随机**抽     · 本地玩家：用这里的**选择**（默认 AK-47 + Glock-18 + 匕首）   差异在\"决策\"，不在\"规则/数值/系统\"。 它不影响确定性：这是一份**常量配置**（同一局内不会变），同种子 + 同配置 → 同结果。"
        },
        {
          "path": "01_Core/Data/Rules/LootData.cs",
          "title": "掉落物参数（M5：弹药袋）",
          "desc": ""
        },
        {
          "path": "01_Core/Data/Rules/ModeData.cs",
          "title": "模式选择规则（Data/Rules，M18-A）",
          "desc": "【出处】照你服 ZP 的 `zombieplague.cfg`：   `zp_prevent_consecutive_modes 1`  → 不许连着两回合抽到同一个模式（感染模式除外，它是主力）   `zp_gamemode_delay 10`            → 模式开战前 10 秒预告（见 `ModeProfile.AnnounceLeadTime`）"
        },
        {
          "path": "01_Core/Data/Rules/NavGridData.cs",
          "title": "寻路网格参数（Data/Rules）",
          "desc": "【数据层·规则】`LevelGrid` 把关卡盒子转成\"可行走网格\"时的格子尺寸。 为什么要单独一个文件：以前这个 0.4 是写死在 `Simulation` 里的魔法数字（M8 拆出来）。 调小 = 路径更精细但更慢；调大 = 更快但容易贴着墙角走。"
        },
        {
          "path": "01_Core/Data/Rules/RoundData.cs",
          "title": "回合规则数据（Data/Rules）",
          "desc": "【数据层·规则】只放\"一局游戏怎么走\"：准备期、时长、胜负、结算、初始感染人数。 AI 行为参数**不在这里了**（M8 拆分时挪到 `Data/Ai/`），角色属性在 `Data/Attributes/`。 胜负用 ZP 经典规则：**所有人类被感染 = 僵尸胜；人类撑到时间上限 = 人类胜**。"
        },
        {
          "path": "01_Core/Data/Rules/TargetData.cs",
          "title": "靶子数据（Data/Rules）",
          "desc": "【数据层·规则】M2 引入的静态靶子的数值。以前这两个数字写死在 `TargetDamage` 里（M8 搬出来）。 靶子的作用不是玩法，而是**持续校验弹道链没被改坏**（打靶数据一眼能看出弹道/伤害有没有被改崩）。"
        },
        {
          "path": "01_Core/Data/Rules/WeaponDropData.cs",
          "title": "地上武器（掉落 / 捡拾）的规则数据（Data/Rules，M16）",
          "desc": "【规则本身是什么】（服主定的）   · **主动丢弃**：按 `G` 把当前手持那把丢在脚下（带着当时的弹匣 + 备弹）。   · **自动捡起**：走过地上的枪时**自动捡**，但**只在对应槽位是空的时候**；     身上已经有同类武器就不捡（所以想换枪 = 先按 G 丢掉自己的，再走过去捡）。   · **被感染时不掉枪**（服主定的：只保留主动丢弃）。 ============================================================================ 【\"丢完就又被自己捡回来\"是怎么防的 —— 两道，缺一不可】 服主指出的现象：丢枪点 0.7m，而拾取半径 1.4m → **刚丢下的枪立刻回到手里 = 按 G 没反应**。 服主给的思路是\"丢远一点 + 把捡拾范围按身体碰撞来（偏小）\"——**这个思路对，已经照做了**：   · `PickupRadius` 1.4 → **0.7**（≈ 身体半宽 0.32 + 一点余量：真的是\"走过去碰到\"才捡）   · `DropForwardOffset` 0.7 → **1.1**（丢出去比捡的判定明显更远，留出 0.4m 的安全差） ⚠ 但**光靠数值不够**，因为丢枪点会被墙推近：贴着墙按 G 时，枪只能掉在脚下 0.35m   （`DropMinForward`，见 `WeaponDropRules.TryDrop` 的贴墙收边）—— 那一刻它**就在**拾取半径里，   于是\"丢完立刻捡回来\"又会复现。所以保留第二道规则：   **丢枪的人必须先离开过一次拾取范围，才能再捡回自己丢的那把**（`WeaponDropState.LeftRangeMask`）。   两道的关系是：     · 数值那道管**手感**（0.7m 的触碰范围、1.1m 的丢弃距离）；     · 规则那道管**正确性**（不管数值怎么调、不管墙把你逼到多近，都不可能当场捡回来）。   只留数值那道 = 以后谁把 `DropForwardOffset` 调小一点（或者把 `PickupRadius` 调大一点），   bug 就静默回来了；只留规则那道 = 从 1.4m 外\"隔空吸枪\"，手感不对。 ============================================================================ 数值都是 ⚖️ 平衡/手感自定，实测再调。"
        },
        {
          "path": "01_Core/Data/Rules/ZombieChoiceData.cs",
          "title": "本地玩家的僵尸偏好（Data/Rules）",
          "desc": "【数据层·偏好】\"我变成僵尸时想当哪一种\"。 为什么它属于\"规则数据\"而不是\"玩家特权\"（M10 的设计要点）：   BOT 和真人**共用同一张僵尸类型表、同一套属性**，区别只在\"谁来做选择\"：     · BOT：`ZombieCatalog.RollWeighted` 按权重**随机**抽     · 本地玩家：用这里的**预选**值（默认还是普通僵尸）   换句话说，差异在\"决策\"，不在\"规则/数值/系统\"—— 这符合服主定的对称原则。 它不影响确定性：这是一份**常量配置**，同种子 + 同配置 → 同结果。 将来联机时它就是\"玩家加入时携带的装备偏好\"，由服务器收下并广播。"
        },
        {
          "path": "01_Core/Level/Arena01.cs",
          "title": "第一张灰盒地图 Arena01",
          "desc": "设计目标（对应 00_设计锚点 的地图规格）：   1. 一个守点（三面掩体 + 一条退路）   2. 两条通道（窄门 1.3m = 拥堵测试场；宽门 3m）   3. 一组可跳箱堆（0.6 / 1.0 / 1.4 m）   4. 一段台阶 + 一处 1m 高平台   5. 一条沿墙侧廊（包抄路线） 坐标约定：X 向右，Y 向前（北），Z 向上。单位：米。"
        },
        {
          "path": "01_Core/Level/GridPathfinder.cs",
          "title": "A* 寻路（Level）",
          "desc": "从原 `LevelGrid.cs` 拆出来（那个文件同时装着\"网格生成\"和\"A* 寻路\"两件事）。 网格本身（可行走判定）在 `LevelGrid.cs`；参数在 `Data/Rules/NavGridData.cs`。 要点：8 邻接、**不允许斜穿墙角**、高度差超过 `MaxStepLink` 视为不连通。"
        },
        {
          "path": "01_Core/Level/LevelData.cs",
          "title": "关卡数据（灰盒：全部是轴对齐盒子）",
          "desc": ""
        },
        {
          "path": "01_Core/Level/LevelGrid.cs",
          "title": "寻路网格（不用 NavMesh 烘焙；全部由关卡数据在运行时生成）",
          "desc": "为什么不用 Unity NavMesh：   1. NavMesh 需要在编辑器里烘焙（我们的流程是「打开就玩」，不做编辑器操作）   2. Core 必须是纯 C#，NavMesh 是引擎 API   3. 网格寻路可以无头单元测试（M3 的僵尸 AI 就有了可验证的地基）"
        },
        {
          "path": "01_Core/SOSZombie.Core.asmdef",
          "title": "",
          "desc": ""
        },
        {
          "path": "01_Core/State/AmmoPackState.cs",
          "title": "掉落物状态（M5：弹药袋）",
          "desc": ""
        },
        {
          "path": "01_Core/State/CharacterState.cs",
          "title": "角色状态（State）",
          "desc": "【状态层】\"一个角色现在是什么样\"：阵营、位置、速度、视角、血量、护甲、装备。 人类与僵尸**共用**这个结构（僵尸只是 `Team == Zombie` 的角色）； 僵尸特有的 AI 记账在 `ZombieState`，人类 AI 的记账在 `HumanAiState`。 命名说明：原来叫 `PlayerState`，但它同时代表\"真人玩家\"和\"AI 人类\"， 拆分时改名为 `CharacterState`（角色），避免以后看到名字以为是玩家专用。"
        },
        {
          "path": "01_Core/State/GrenadeState.cs",
          "title": "飞行中的手雷（State，M17-C）",
          "desc": "一颗手雷的一生：**投出 → 飞行 → 落地 → 引信 0.8 秒 → 炸开（生成圈 / 生成光）→ 自己消失**。 这里只存\"飞的时候\"要用的东西；炸开之后留下的圈是 `AreaEffectState`。 和其它状态一样：**全部可哈希**（进 `StateHasher`），并且回合重置时会清空。"
        },
        {
          "path": "01_Core/State/HitZone.cs",
          "title": "命中部位（State）",
          "desc": "从原 `CombatState.cs` 拆出来（一个枚举单独一个文件，方便查找与引用）。 与 `Data/Attributes/WeaponProfile.cs` 里的 HeadMultiplier / BodyMultiplier / LegMultiplier 配套。"
        },
        {
          "path": "01_Core/State/HumanAiState.cs",
          "title": "AI 人类状态（State）",
          "desc": "从原 `RoundState.cs` 里搬出来的（那个文件同时装着\"回合状态\"和\"AI 记账\"，文件名说不清）。 刻意和 `CharacterState` 分开：CharacterState 是\"角色数据\"，这里是\"这个 AI 的记账\"， 混在一起会让 CharacterState 越来越像杂物间。"
        },
        {
          "path": "01_Core/State/RecoilState.cs",
          "title": "后坐力状态（State）",
          "desc": "从原 `CombatState.cs` 拆出来。 要点：后坐力偏移**只由仿真计算、只由表现层读取**，绝不写回鼠标输入 （写回去的话\"压枪\"就变成了改输入，联机时会变成作弊面）。"
        },
        {
          "path": "01_Core/State/RoundState.cs",
          "title": "回合状态（State）",
          "desc": "【状态层】\"这一局打到哪一步了\"：阶段、胜者、回合号、累计感染数。 规则数值在 `Data/Rules/RoundData.cs`，阶段推进逻辑在 `Systems/Round/RoundFlow.cs`。 （AI 人类的记账已搬到 `State/HumanAiState.cs`）"
        },
        {
          "path": "01_Core/State/TargetState.cs",
          "title": "靶子状态（State）",
          "desc": "从原 `CombatState.cs` 拆出来。 靶子是 M2 用来验证伤害与命中部位的静物；M3 起与僵尸共存，用来持续校验弹道链没被改坏。 （命中部位枚举在 `State/HitZone.cs`）"
        },
        {
          "path": "01_Core/State/WeaponDropState.cs",
          "title": "地上的武器状态（M16）",
          "desc": "【这是什么】被玩家丢在地上的一把枪：位置 + 是哪把 + **当时还剩多少弹**。 【为什么要它】M16 之前武器**只存在于角色身上**（三个槽位编号 + 三份弹药状态）， 世界里没有任何\"武器实体\"—— 所以打空就只能等回合重置（表现为\"枪没了、只剩匕首\"）。 服主指出的正是这一层：CS/ZP 里武器**同时**是\"身上的槽位\"和\"地上的东西\"， 我们只做了前半。这个结构就是补上后半。 【设计要点】   · 弹药跟着枪走：丢出去时把当时的弹匣 + 备弹一起写进来，捡起来是多少就是多少（CS 行为）。   · 它是**世界状态**（不是某个角色的状态），和弹药袋一样环形复用（见 `Simulation.WeaponDrops`）。"
        },
        {
          "path": "01_Core/State/WeaponState.cs",
          "title": "武器状态（State）",
          "desc": "从原 `CombatState.cs` 拆出来的（那个文件一次装了武器/后坐力/靶子/命中部位四样东西）。 武器\"注数\"在 `Data/Attributes/WeaponProfile.cs`，这里只存\"当前这把枪打到哪一步了\"。"
        },
        {
          "path": "01_Core/State/WorldState.cs",
          "title": "世界状态（State）",
          "desc": "从 `Simulation.cs` 里搬出来的：所有角色的数组 + 数量。 之所以单独一个文件：`Simulation` 已经很大，而\"世界里有谁\"是能被整体快照/哈希的独立概念 （将来联机做状态同步、回放做快照，都从这里入手）。"
        },
        {
          "path": "01_Core/State/ZombieState.cs",
          "title": "僵尸状态（State）",
          "desc": "从原 `ZombieConfig.cs` 里搬出来的（那个文件同时装着\"参数\"和\"状态\"，文件名的含义被撑爆了）。 现在：参数在 `Data/Attributes/ZombieAttributes.cs` + `Data/Ai/*`，状态在这里。"
        },
        {
          "path": "01_Core/Systems/Combat/Ballistics.cs",
          "title": "弹道（纯 C# 射线检测）",
          "desc": "为什么自己写而不用 Unity 物理：   1. Core 必须是纯 C#（可无头测试）   2. 命中判定的规则（部位/护甲/衰减）是玩法逻辑，不能交给引擎 几何：关卡是 AABB 盒子，角色/靶子也是 AABB → 用标准的 slab 法求交。"
        },
        {
          "path": "01_Core/Systems/Combat/DamageRules.cs",
          "title": "伤害规则（Systems/Combat）",
          "desc": "【系统层·规则】从原 `Simulation.cs` 拆出来：**\"被打中之后扣多少血\"只有一个真相来源**。   · 咬击伤害结算（谁被咬由事件的 SourceId 指定 → AI 与真人一视同仁）   · 护甲吸收（按 `HumanAttributes.ArmorAbsorbRatio`，对真人和 AI 也一样）   · 调试无敌（只对**本地玩家**生效，用 `State.IsLocal` 判断，不是写死 0 号） 为什么集中在这里：以前\"AI 咬人\"和\"玩家僵尸咬人\"各写了一份扣血代码， 护甲吸收漏掉一处就会变成\"玩家咬人无视护甲\"这种玄学 bug（M7 实测踩过）。"
        },
        {
          "path": "01_Core/Systems/Combat/GrenadeEffects.cs",
          "title": "手雷状态效果：圈刷新 + 身上结算（Systems/Combat，M17-C）",
          "desc": "============================================================================ 【这一层做的事】把\"地上的圈\"变成\"身上的状态\"，再把状态变成\"移速与流血\"。   火圈（10 秒）：**每 tick** 给圈里的目标续上\"燃烧 3 秒\"  → 离圈/圈灭之后，残余的 3 秒照样烧完   冰圈（10 秒）：**每 tick** 给圈里的目标续上\"寒冷 3 秒\"，并把寒冷强度往上推                  → 站满 1.5 秒 = 寒冷 1.0 = **完全冻住**；出圈按 1.5 秒渐融 【为什么伤害不在\"圈\"上，而在\"状态\"上】服主的口径是\"范围内容忍被持续挂上 3 秒状态\"——   所以圈只负责**刷新**，真正掉血的是状态。好处：     · \"离圈之后还会烧 3 秒\"是自然结果，不是特判；     · 站在火里 10 秒和进进出出 10 次，规则是同一条（都是\"被刷新\"）。 【只影响僵尸】火/冰只对**僵尸**生效（和我们\"没有友军伤害\"的现状一致；你服 ZP 也只烧僵尸）。 ============================================================================"
        },
        {
          "path": "01_Core/Systems/Combat/GrenadeStatus.cs",
          "title": "身体状态查询口：冻住 / 在烧 / 移速修饰（Systems/Combat，M17-C）",
          "desc": "============================================================================ 【为什么单独一个文件】因为这是\"两条移动路径都必须问同一个答案\"的那一处。 M14 的教训：击退的**消费**只写在僵尸 AI 的移动里 → 真人僵尸被枪打纹丝不动。 M16 的教训：真人僵尸的咬击事件没带自己的槽位 → 咬人一分钱没有。 现在手雷是**第三个**\"打在身体上的效果\"，所以从第一天起就只留**一个查询口**：     真人僵尸：`MovementSystem` → `Simulation.Step` 问这里     AI 僵尸：`ZombieSystem`   → `ZombieDirector` 问这里 【状态存在哪】存在**僵尸槽位**上（`ZombieState.Chill / BurnUntil`），理由见 `ZombieState` 的注释：   一具僵尸身体走的是槽位，AI 那条路拿不到 `CharacterState`，只存角色上就会\"AI 冻不住、真人冻得住\"。 ============================================================================"
        },
        {
          "path": "01_Core/Systems/Combat/GrenadeSystem.cs",
          "title": "手雷：投掷 / 飞行 / 引信（Systems/Combat，M17-C）",
          "desc": "============================================================================ 【一颗手雷的一生】   按左键（手持手雷时）→ 按视线方向 + 上抬扔出去 → 抛物线飞 → **落地** → 引信 0.8 秒   → 炸开：冰冻/燃烧**留下一张圈**（`AreaEffectState`），照明留一张光 → 自己消失。 【为什么做成\"武器\"】见 `WeaponProfile.Grenade.cs` 的头注释：这样掉枪/捡枪/商城/HUD 全部复用，   不用写第二套系统（服主的原则）。 【形状上的一个刻意选择】炸开之后**留下的圈**是独立状态（`AreaEffectState`），不在手雷自己身上。   因为\"圈\"要活 10 秒（远离手雷的死亡时刻），而手雷本身炸完就该消失。 【确定性】飞行完全由固定 tick 推进；命中检测用地图盒子的射线（和子弹同一套 `Ballistics`）。 ============================================================================"
        },
        {
          "path": "01_Core/Systems/Combat/TargetDamage.cs",
          "title": "靶子伤害与重生（Systems/Combat）",
          "desc": "【系统层·战斗】从原 `WeaponSystem.cs` 末尾 / `Simulation.cs` 拆出来：   · 靶子受伤（含护甲穿透、命中部位记录、死亡事件）   · 靶子到点重生（3 秒，便于反复打靶验证） 靶子是 M2 引入的\"静物标靶\"，M3 起与僵尸共存 —— 它的价值是**持续校验弹道链没被改坏**。"
        },
        {
          "path": "01_Core/Systems/Combat/WeaponCarry.cs",
          "title": "携行格查询（Systems/Combat，M19）",
          "desc": "============================================================================ 【这一层存在的理由】M19 把\"一个类别一个格子\"改成\"一个类别若干格\"之后， 有四件事都要问同一套问题，**必须只有一份答案**：   · 商城：我还能放得下这把枪吗？（放不下 → 拒绝购买，服主口径\"不要自动丢枪\"）   · 拾取：这一格该放哪？（同类别的第一个空格；满了就不捡）   · 切换：这个类别里现在哪一格能用？（优先有弹药的）   · 丢弃/投掷之后：手里空了，该自动切到哪一格？ 所以\"找空格 / 找同编号 / 找能用\"这三件事只写在**这里**，别处一律调它 （和 `GrenadeStatus` 是同一个做法：查询口唯一）。 【和 `WeaponSlots` 的分工】   · `WeaponSlots`（Data 层）：**布局常量**（哪个格属于哪个类别、类别容量多少）。   · 本文件（Systems 层）：**对某个角色的查询**（要读 `CharacterState`/`WeaponState`）。 ============================================================================"
        },
        {
          "path": "01_Core/Systems/Combat/WeaponDropRules.cs",
          "title": "丢枪 / 捡枪的规则（Systems/Combat，M16）",
          "desc": "============================================================================ 【这一层补的是什么】 M16 之前武器**只存在于角色身上**：世界是\"某个角色拿着某把枪\"，没有\"地上有一把枪\"。 结果就是服主实测到的现象 —— 打空之后没有任何补回来的途径（弹药袋是钱、不能补弹）， 只剩匕首。这个文件补上\"武器也是世界里的东西\"这半边。 【规则（服主定的）】   ① 主动丢弃：按 `G` 丢当前手持那把（带着当时的弹匣 + 备弹）。丢掉后那个携行格**变空**。   ② 自动捡起：走过地上的枪**自动捡**，但**同类别的携行格还有空格**时才捡；      身上已经有**同一个编号**的枪就不捡（否则 4 格主武器会被同一个编号塞满）。      **格子满了不捡**（M19 服主口径：不顶掉手里那把；想换就先按 G 丢一把）。   ③ 被感染**不掉枪**（服主定的：只保留主动丢弃）。   ④ 匕首不能丢（保底武器，丢了就赤手空拳；`WeaponDropData.AllowDropKnife` 可开）。 【和\"空格\"的关系】`WeaponId = WeaponCatalog.None(-1)` = 这一格没枪。   查表会拿到 `WeaponCatalog.Empty`（空手档案），所以逻辑层不用到处判 null。   M19 起\"哪一格该放这个类别\"的算法只有一处：`WeaponCarry`。 ============================================================================"
        },
        {
          "path": "01_Core/Systems/Combat/WeaponResolver.cs",
          "title": "武器数值解析（Systems/Combat）",
          "desc": "============================================================================ 【逻辑层读武器数据的唯一入口】M12-C。 以前逻辑层是直接拿 `WeaponCatalog.Get(编号)` 的：那就是\"基础数值\"。 现在中间多了**一层解析**，因为 1.6 SOSZOMBIE 的升级插件要求 \"同一把枪、不同的人、数值不同\"：     基础数值（WeaponProfile，一把枪一份）        ×  个人加成（WeaponUpgrade，一人一份，默认全 1）        =  这一 tick 真正生效的数值 三条纪律：   ① **只有这里做乘法**。`WeaponSystem` / `HumanCombat` / `PlayerHud` 一律读解析结果，      不许自己再乘一次 —— 否则\"伤害 +10%\"会在不同地方被算成 +10% / +21% / +33%。   ② **中性加成必须零行为变化**：全 1 时直接返回基础属性对象**本身**（不拷贝、不分配），      所以加这一层之前的每一帧结果都能逐位复现（有用例守着）。   ③ **真人和 BOT 走同一条路**：解析发生在按角色下标取数值的地方      （`Simulation.WeaponOf / Weapon / WeaponAt`），两边的入口是同一个。 ⚠ 返回值可能是**共享对象**：`baseProfile` 本身（中性）或一份新拷贝（非中性）。   两种情况下调用方都只能**读**，绝不能改返回的对象 —— 改中性情况下的返回值   等于直接改武器表（跨角色、跨回合全部污染）。 ============================================================================"
        },
        {
          "path": "01_Core/Systems/Combat/WeaponSwitch.cs",
          "title": "换武器（Systems/Combat）",
          "desc": "【系统层·战斗】\"按 1/2/3/4 换武器\"这件事的规则集中在这里。M19 起是**两条**：   `PressCategory(category)` —— **按键语义**（服主口径：一个类别一个键）：       ① 不在这个类别 → 切到该类别的\"第一把能用的\"（`WeaponCarry.FindTargetInCategory`）；       ② 已经在这个类别 → 切到**同类别的下一格**（`WeaponCarry.FindNextInCategory`，跳过空格）。     于是\"1 键在 4 把主武器之间循环\"\"4 键在 3 颗雷之间循环\"是**同一条规则**的两个结果。   `Activate(slot)` —— **指定格**：让某位角色拿起第 `slot` 格。     商城买完枪、丢枪/投掷之后的自动切换、以及 AI\"我就要这一把\"走它。 为什么要有抬枪时间：   · 手感上：CS 里换枪不是瞬发的，抬枪期间不能开火；   · 规则上：**防止\"打一枪切一下\"无限加速**（AK 打完一发立刻切刀再切回来，等于绕过射速限制）。 为什么换枪不改弹药：   每位角色的每个携行格**各有一份** `WeaponState`（见 `Simulation.WeaponStates`），   所以换枪只是改\"手持哪一格\"——各自弹匣/换弹/散布互不影响，   不会出现\"切枪就能把换弹重置掉\"这种变相刷子弹。 边界：换枪**会中断当前换弹**（符合 CS 手感，也避免\"切回来发现换弹已经完成\"的漏洞）。"
        },
        {
          "path": "01_Core/Systems/Combat/WeaponSystem.cs",
          "title": "武器系统（射速 / 弹匣 / 换弹 / 散布 / 后坐力 / 开火命中）",
          "desc": ""
        },
        {
          "path": "01_Core/Systems/Combat/ZombieBite.cs",
          "title": "咬击判定（Systems/Combat）",
          "desc": "【系统层·战斗】\"怎么算咬中\"集中在这里：   · AI 僵尸：由 `ZombieSystem` 判定（它自己朝目标走，咬击判定在那边）   · 输入驱动的僵尸（本地玩家 / 将来的远端玩家）：由本文件判定（左键 + 冷却） **两者只做\"判定 + 发同一类事件\"（`ZombieAttack`），扣血统一由 `DamageRules` 结算。** M10 之前这里自己调 `DamageRules.ApplyBiteDamage` 结算，而 `DamageRules` 用 `PlayerControlled` 标记跳过这些事件来避免重复扣血 —— 那是\"两条路\"，加僵尸类型（伤害/范围/间隔都要按类型变） 时必然改漏一边。现在只有一条路。"
        },
        {
          "path": "01_Core/Systems/Human/HumanAi.cs",
          "title": "AI 决策（Systems/Human）",
          "desc": "【系统层·AI】AI 人类的**决策总入口**：算出这一 tick 要做什么，返回一个 `InputCommand`。 与真人完全同一条路径：移动 → MovementSystem，开火/换弹 → WeaponSystem，购买 → ShopSystem。 好处：① 人和 AI 规则一致（不会出现\"AI 的枪不一样\"）② 每个行为都能无头测试       ③ 将来联机时 AI 就是一个可复制、可回放的输入源。 按威胁距离分档（一眼看得懂）：   惊慌（< PanicRadius）  → 掉头就跑，不还手   交火（≤ EngageRange）  → 见 `HumanCombat`：转身瞄准、点射、边打边退   走位（≤ FleeRadius）   → 寻路去\"离僵尸最远的安全点\"   待机                   → 向最近同伴靠拢（抱团），顺手检查要不要买装备 拆出的文件：交火细节在 `HumanCombat.cs`，购买策略在 `HumanPurchase.cs`，            \"想去哪 → InputCommand\"的翻译在 `Systems/Movement/MoveIntent.cs`。 数值全在 `Data/Ai/HumanAiData.cs` 与 `Data/Ai/AiSharedData.cs`。"
        },
        {
          "path": "01_Core/Systems/Human/HumanCombat.cs",
          "title": "AI 交火（Systems/Human）",
          "desc": "【系统层·AI】从原 `HumanAi.cs` 拆出来的\"怎么打\"：   · 转身瞄准（含**故意的**瞄准误差 —— AI 不是神枪手）   · 点射节奏（几发一组 + 组间停顿，同一组内按武器射速连发）   · 空匣自动换弹   · 弹道上有同伴就不开火（防互相爆头）   · 僵尸逼近时\"边打边退\"（风筝） 三个压火力的旋钮在 `Data/Ai/HumanAiData.cs`：EngageRange / AimErrorDegrees / BurstLength+Pause。 瞄准抖动取自**仿真随机数** → 完全确定性，不会破坏回放/联机。 身体尺寸（眼高/半宽）取角色属性 `HumanAttributes` —— 以前这里硬编码了一份，M8 已合并。"
        },
        {
          "path": "01_Core/Systems/Human/HumanDirector.cs",
          "title": "AI 人类导演（Systems/Human）",
          "desc": "职责：推进**所有 AI 人类**（角色 1..N-1）一 tick 的行为。 从 `Simulation.StepHumanAi` 搬出来的（M9：`Simulation` 只做协调，循环归各自的导演）。 关键设计（从 M6/M7 一直没变）：   AI 不直接改状态，而是**产出一个 `InputCommand`**，然后和真人玩家走**完全相同的系统**   （`MovementSystem` / `WeaponSystem` / `ShopSystem`）。所以：     · AI 不可能\"作弊\"绕过规则（速度和玩家一样、开火要走射速与散布、买东西要花钱）     · 联机时 AI 的输入天然就是可复制、可回放的输入 为什么是 static：它不需要任何缓存（路径缓冲 `HumanPaths[i]` 本来就存在仿真状态里）。 需要缓存的 `ZombieDirector` 做成了实例，理由见那个文件。"
        },
        {
          "path": "01_Core/Systems/Human/HumanPurchase.cs",
          "title": "AI 购买策略（Systems/Human）",
          "desc": "【系统层·AI】从原 `HumanAi.cs` 拆出来。 走的是和真人完全一样的购买输入位（`InputButtons.Buy` + `BuyItemId`）， 所以买不起就是买不到，**不能因为\"是 AI\"就绕过规则**。 M11 数据层内容化：AI 的购买决策**也跟着数据走** —— 不再写死\"没护甲就买护甲\"， 而是问 `ShopSystem.PickAffordableItem`：\"表里现在最值得买、也买得起的是哪件？\"   · 以前：加一件新道具，AI 永远不买（代码只认护甲）   · 现在：加一件 1 块钱的补给，AI 会自动开始买它（不用改 AI 代码） M17：商城开始卖武器了，但**暂时不让 BOT 买枪**（服主：\"BOT 方面我们后续再来，只需要基础的就行了\"） —— `PickAffordableItem` 默认跳过武器类商品。所以 BOT 现在仍然只买护甲/夜视仪， 决策代码一个字没改，将来要放开只需要把那个参数打开（见 `ShopSystem.PickAffordableItem`）。"
        },
        {
          "path": "01_Core/Systems/Human/HumanTactics.cs",
          "title": "AI 人类的小战术（Systems/Human）",
          "desc": "【系统层·AI】从 `HumanAi` 里拆出来的\"纯计算\"部分：**找掩体**。 之所以单独一个文件：它是纯函数（给几何 + 位置 → 给一个点），能**无头直接测**， 不用把 AI 塞进场景里跑几十秒才验证（那样既慢又容易假通过）。 【什么是\"掩体\"】在本作里就一条判据：**站在那儿，僵尸看不见我**   —— 用 `Ballistics.HasBodyLineOfSight`（带身体宽度的视线，和开枪判定同一套）反向检查。 另外两条约束（防止 AI 变成\"到处乱跑的兔子\"）：   · 掩体不能离僵尸太近（否则挪过去等于送货上门）   · 掩体要能走到（用碰撞世界做一次\"这一步能不能站\"的粗查）"
        },
        {
          "path": "01_Core/Systems/Loot/AmmoPackRewards.cs",
          "title": "弹药袋奖励结算（Systems/Loot，M16）",
          "desc": "【规则】服主定的：\"把弹药袋不做为掉落物，改成按伤害给 —— **100 伤害 = 1 个弹药袋**。\"   所以这个模块把\"本 tick 发生了哪些伤害/击杀\"折算成弹药袋：     · 伤害：每 `DamagePerPack`（默认 100）点 → +1 袋，**余数累积**（打 250 = 2 袋 + 余 50）     · 击杀僵尸 → +`PerZombieKilled`（默认 1，照 ZP 的 `zp_ammop_zombie_killed`）     · 感染人类 → +`PerHumanInfected`（默认 1，给的\"最后咬他的那只僵尸\"，照 ZP 的 `zp_ammop_human_infected`）   出处对照与\"为什么和 ZP 数值不同\"写在 `AmmoPackRewardData` 里。 【为什么用事件而不是直接在伤害处加钱】   伤害结算发生在 `WeaponSystem`（纯静态，拿不到 `sim`），而加钱要改角色状态。   用一条 `DamageDealt` 事件把两者解耦：**折算规则只有这一处**，改数值/改规则都不用碰战斗代码。 【确定性】只读本 tick 新增的事件 + 按下标顺序处理 → 同输入同种子结果一致（可哈希、可回放）。"
        },
        {
          "path": "01_Core/Systems/Loot/DropRules.cs",
          "title": "掉落规则（Systems/Loot）",
          "desc": "【系统层·规则】从原 `Simulation.cs` 拆出来：\"僵尸死了要不要掉、掉多少\"。 槽位管理（环形复用）留在 `Simulation.SpawnAmmoPack` —— 那是世界状态的事； 拾取/回收/上限在 `LootSystem.cs`；数值在 `Data/Rules/LootData.cs`。"
        },
        {
          "path": "01_Core/Systems/Loot/LootSystem.cs",
          "title": "掉落与拾取（M5）",
          "desc": "设计边界：   ✔ 僵尸死亡 → 按概率掉落弹药袋（用仿真的种子随机 → 确定性）   ✔ 玩家走近 → 自动拾取（水平半径 + 允许的高度差）   ✔ 掉落物超时回收 + 场上数量上限（环形复用，零分配）   ✘ 不做：物品栏、武器掉落、弹药袋被僵尸捡走（后续里程碑再评估）"
        },
        {
          "path": "01_Core/Systems/Movement/BodyStep.cs",
          "title": "共享身体步进（Systems/Movement）",
          "desc": "============================================================================ 【M14：把\"和谁在驱动无关\"的物理只写一份】 服主的判断（原话）：\"AI 只是一个调用其它层的输入源，不该有自己的逻辑； 击退不应该只在 AI 路径被消费 —— 打实体的时候就应该统一产生击退。\" 他说对了，而那个 bug 的根源就是本文件要消灭的东西：   · 击退的**产生**（子弹命中）本来就只有一份：`WeaponSystem.FireOneProjectile`     → 写进被击中僵尸槽位的 `ZombieState.Knockback`。   · 但击退的**消费**（把这个速度加到身体上、衰减它）当时只写在 `ZombieSystem.Step`     （僵尸 AI 的移动实现）里 —— 真人僵尸走的是 `MovementSystem`（角色自控 + 摩擦），     它压根不读槽位的击退 → **真人僵尸被枪打纹丝不动，BOT 僵尸却会后腿**。 这类\"产生一份、消费按驱动各写一份\"的结构有个必然结局：**迟早漏一支**。 所以这里把两件事收成唯一一份实现，两条移动路径都必须调它。 【M16 实测修正：击退改成\"独立位移通道\"，不再并进速度】 服主试玩反馈：\"**AI 打我击退力拉满，但我打 AI 好像没有击退**。\" 用探针量出来（同一记 AK 击退 2.5、同样站住挨打，唯一差别是谁在驱动）：     谁在驱动        一记击退的实际位移      峰值速度     AI 僵尸         −0.399 m               2.50 m/s     真人僵尸        −4.807 m               12.33 m/s（还在涨）     文档里的理论值   −0.417 m 根因就是原来的写法 `velocity += knockback`（**并进速度**）：   · AI 那条路每 tick 用\"期望速度\"**硬覆盖** velocity（`z.Velocity.x = avoidResult.DesiredVx`）     → 上一 tick 并进去的击退被冲掉 → 位移正好等于理论值（**歪打正着地正确**）；   · 真人那条路是加速 + 摩擦模型，**没人覆盖** → 每 tick 往速度里加一份击退，     而真正被衰减的只是\"击退余量\"，**已经加进速度里的那一份永远留在速度里**     → 速度 2.5 → 4.6 → 6.4 → 7.8 → 12.3 一路涨，位移是理论值的 12 倍。 改法：击退**只是在 Integrate 里直接并进这一 tick 的位移**，一个字节都不进 velocity。 于是它既不会被某条驱动的速度覆盖抹掉，也不会被摩擦/加速放大 —— 两条驱动路径的位移**在构造上就相同**，而且正好等于 `Docs/10` §2.4.1 那条公式：     单发位移 ≈ 击退速度 ÷ 衰减率      （2.5 / 6 = 0.42 m） ⚠ 纪律：以后任何\"打在身体上、和谁驱动无关\"的效果（减速、冰冻、拖拽……）   都必须加进这里，**不许再往某一条移动路径里写**。 ============================================================================"
        },
        {
          "path": "01_Core/Systems/Movement/CollisionWorld.cs",
          "title": "碰撞世界（轴对齐盒子 vs 玩家 AABB）",
          "desc": "注意：这里完全不用 Unity 物理。仿真自己算碰撞，保证：   1. Core 是纯 C#，可以无头单元测试   2. 移动结果是确定性的（同输入 → 同结果） 约定：位置 Position 表示「脚底中心」。"
        },
        {
          "path": "01_Core/Systems/Movement/MoveIntent.cs",
          "title": "移动意图（Systems/Movement）",
          "desc": "【系统层·移动】从原 `HumanAi.cs` 拆出来：把\"我想去哪\"翻译成一个 `InputCommand` （视角朝向 + 前进键），再交给 `MovementSystem` 执行。 为什么值得单独一个文件：   ① AI 与真人**共用同一条移动代码路径**（手感一致、只维护一套物理）   ② 以后要加\"巡逻/追击/撤退\"等更多移动意图，都往这里加，不会污染 AI 决策代码 参数（到达半径、重规划间隔）来自 `Data/Ai/HumanAiData.cs`。"
        },
        {
          "path": "01_Core/Systems/Movement/MovementSystem.cs",
          "title": "移动系统（CS 1.6 / Quake 家族模型）",
          "desc": "结构顺序（与原版一致）：   1) 视角写入      2) 蹲下状态      3) 期望方向与速度   4) 地面摩擦      5) 加速          6) 跳跃   7) 重力          8) 位移与碰撞解算"
        },
        {
          "path": "01_Core/Systems/Movement/UnstuckRules.cs",
          "title": "脱困规则（Systems/Movement）",
          "desc": "【是什么】玩家卡在几何里时，把他送回出生点。 【为什么要它】这不是\"锦上添花\"，是**我们自己踩出来的需求**：   · 这一轮写用例时，我两次把角色摆在 `(0,0,0)` —— 而 Arena01 的 (0,0,0) 正好在内部几何里，     角色当场被卡住、一动不能动（表现就是\"按了没反应\"）。   · CS 1.6 的 ZP 服务器也有这个菜单项（\"解除卡住(当你被卡住时使用)\"），玩家原话是     \"你没有被卡住!!\" —— 说明这类问题在真实游戏里同样会发生（贴墙、被推、出生点重叠）。 【纪律】走\"输入位 → Core 裁决\"：表现层只发 `InputButtons.Unstuck`，   **卡不卡住由这里判定、送哪里由这里决定**。表现层不直接改位置（M5 起的规矩）。   `Simulation.LocalIsStuck` 给菜单用来决定那一项能不能点（灰显用同一份判定，不会两边不一致）。"
        },
        {
          "path": "01_Core/Systems/Round/ModeSelector.cs",
          "title": "模式选择器（Systems/Round，M18-A）",
          "desc": "============================================================================ 【唯一一处】\"这一回合用哪个模式\"只在这里决定：   RoundFlow.StartRound（准备期 15 秒走完的那一刻）→ PickNext → 写进 `RoundState.ModeId` 别处（表现层、AI、胜负判定）一律**只读** `sim.Round.ModeId` / `sim.Mode`。 准备期里 `ModeId == -1`（还没抽），所以读到模式的地方都必须容忍\"没有模式\"。 【两个纪律】   ① **独立随机源**：抽签用 `sim.ModeRandom`（同种子派生），**绝不共用战斗随机源** ——      否则\"以后加一个模式\"会把战斗随机序列整体挪位，所有固定种子的用例与回放结果都变      （M10-C 踩过这个坑，`LoadoutRandom` 就是为此加的）。   ② **加一个模式不改代码**：这里只读数据表（权重 / 最低人数 / 是否禁止连续），      没有任何 `if (模式 == 复仇者)` 这种分支（M11 的纪律）。 【和 ZP 的差异】ZP 是\"按注册顺序试 + 每个模式 1/X 概率\"；我们按服主要求改成**加权随机**。   ZP 的\"禁止连续同模式\"我们保留（`ModeData.PreventConsecutiveModes`）。 ============================================================================"
        },
        {
          "path": "01_Core/Systems/Round/RoundFlow.cs",
          "title": "回合流程（Systems/Round）",
          "desc": "【系统层·规则】从原 `Simulation.cs` 拆出来的三件事：   · 阶段推进（准备期 → 进行中 → 结算 → 重置）   · 随机感染（可能是真人玩家 —— 这游戏的核心体验）   · 感染转换（谁的血量归零就变成僵尸） 数值在 `Data/Rules/RoundData.cs`；这里只有流程本身。"
        },
        {
          "path": "01_Core/Systems/Round/RoundManager.cs",
          "title": "回合管理（M6：完整感染回合闭环）",
          "desc": "职责：   1) 准备期 → 随机感染 1 个角色（可能是真人玩家）→ 进行中   2) 判定胜负：所有人类被感染 = 僵尸胜；撑到时间上限 = 人类胜   3) 结算展示若干秒后自动重置，开下一回合 设计纪律：   · 随机感染用仿真的种子随机 → **同种子可复现**（联机/回放前提）   · 回合状态全部在 RoundState 里（可哈希），表现层只读"
        },
        {
          "path": "01_Core/Systems/Shop/ShopSystem.cs",
          "title": "商店逻辑（M5 夜视仪 ｜ M7 护甲 + 多商品 ｜ M11 通用化 ｜ M17 买枪）",
          "desc": "关键纪律：**购买也走「输入 → Core 裁决」这条路**。 表现层点按钮时只置一个输入位（`InputButtons.Buy` + `BuyItemId`）， 由 Core 决定能不能买、扣多少、成功还是失败，再通过事件告诉表现层播什么反馈。 **AI 人类走的是同一个入口** —— 所以\"AI 会买装备\"不需要任何特殊规则。 M11 数据层内容化：这里**不再按商品编号写分支**。   以前 `TryBuy` / `CanAfford` / `BlockReason` 各写一遍 `switch (itemId)`，   加一件商品要改三处 + 给 `ShopCatalog` 加专属字段。   现在全部改成读商品条目（`ShopItemProfile`）：价格、是否\"只能买一次\"都是数据，   效果只在 `ApplyEffect` 里按**效果类型**分派一处。   → **加一件道具（复用已有效果类型时）不需要改本文件**，这条有用例守着。 ============================================================================ 【M17：商城也卖武器了（服主定）】   > \"商城现在可以开放了，真人也能购买，而不是只有 AI 可以随机购买。\"   > \"AWP/M249/SG550/G3SG1 都在主武器菜单中去除不被玩家开局选择，只能商城购买。\" 为此本文件多了两件事：   ① **接口从\"传角色结构体引用\"改成\"传仿真 + 角色下标\"** —— 因为\"卖一把枪\"要动世界状态      （写武器状态、记录流水），光有一个 `ref CharacterState` 是做不到的。      这也是\"规则只有一处\"的前提：真人（`Simulation.Step`）和 AI（`HumanDirector`）走同一个入口。   ② 新增效果 `GrantWeapon`：给对应类别**找一格空位**放上新枪（满弹）。 ============================================================================ 【M19：买枪**不再丢旧枪**（服主改的口径）】   > \"在商店购买武器，如果手上有武器的话不丢，而是按 1 可切换到另外一把武器。\"   > \"主武器格满的时候，拒绝给武器。\" 所以 `EquipPurchasedWeapon` 从 M17 的\"先把旧枪丢地上\"改成\"**放进空格**\"， 并且新增 `PurchaseResult.CarryFull`：格子满了就在**扣钱之前**拒绝（`BlockReason` 会告诉玩家 \"先按 G 丢一把\"）。**本文件里现在没有任何一处会自动丢别人的枪。** ============================================================================"
        },
        {
          "path": "01_Core/Systems/Simulation.cs",
          "title": "仿真主循环（协调者）",
          "desc": "【系统层】这里只做三件事：**持有状态**、**按固定顺序推进各系统**、**对外提供查询**。 具体规则被拆到各自的模块里（M8 拆分 + M9 再降一级）：   · 回合流程（阶段/胜负/重置）   → `Systems/Round/RoundFlow.cs`   · 伤害结算（咬击 + 护甲吸收）  → `Systems/Combat/DamageRules.cs`   · 玩家僵尸咬人                 → `Systems/Combat/ZombieBite.cs`   · 掉落规则（僵尸死亡掉弹药袋）  → `Systems/Loot/DropRules.cs`   · 僵尸选目标 / 重生点          → `Systems/Zombie/ZombieTargeting.cs`   · 靶子复活                     → `Systems/Combat/TargetDamage.cs`   · 状态哈希                     → `Systems/StateHasher.cs`   · AI 人类整批推进（循环 + 输入）→ `Systems/Human/HumanDirector.cs`   · 僵尸整批推进（循环 + 避让缓存）→ `Systems/Zombie/ZombieDirector.cs` 拆分的验收标准是\"行为完全不变\" —— 118 项无头测试全程当回归网。"
        },
        {
          "path": "01_Core/Systems/StateHasher.cs",
          "title": "状态哈希（Systems）",
          "desc": "【系统层】从原 `Simulation.cs` 末尾拆出来：把整个仿真状态压成一个 uint。 用途：① 无头测试验证\"同输入 → 同结果\" ② 将来联机做状态校验/回放。 纪律：**凡是影响未来的状态字段都必须纳入哈希**，漏一个字段就会让\"看起来很稳定\"的测试失效。"
        },
        {
          "path": "01_Core/Systems/Zombie/ZombieAvoidance.cs",
          "title": "僵尸之间的避让（M4）",
          "desc": "设计定位（对应 00_设计锚点 M4 验收：8 僵尸同屏、僵尸之间不长时间互堵、门框可通行）：   只做「意向层面」的错开 —— 在期望速度上叠加侧向推力、在正前方有人时降速，   **不做身体碰撞**（僵尸之间不互相阻挡）、不做 RVO/ORCA 全局优化、不做队形。   好处：计算量极小（每帧只看几个邻居）、完全确定性（同输入同结果）、可一键开关退回 M3。 为什么不用 O(n²) 两两比较：现在 8 只无所谓，但 M6 会到 8~16 只、还要为后续联机留余量。 用 1.5m 的空间哈希格子做邻域查询，复杂度 O(n)。"
        },
        {
          "path": "01_Core/Systems/Zombie/ZombieDirector.cs",
          "title": "僵尸导演（Systems/Zombie）",
          "desc": "职责：推进**所有僵尸槽位**一 tick 的行为 + 每 tick 收尾的一致性维护。 从 `Simulation.StepZombies` 搬出来的（M9：`Simulation` 只做协调，循环归各自的导演）。 为什么是**实例**而不是 static：   避让要一份空间哈希（`_avoidGrid`）和一个邻居下标缓冲（`_neighborBuffer`），   它们是\"每 tick 重建、只为本次推进服务\"的临时缓存。做成 static 会让**两个同时存在的   仿真共用同一份缓存** —— 测试里经常同时构造多个世界，这种耦合迟早出事。   （不需要缓存的 `HumanDirector` 因此保持 static。）"
        },
        {
          "path": "01_Core/Systems/Zombie/ZombieLink.cs",
          "title": "角色 ↔ 僵尸槽位 的身体同步（Systems/Zombie）",
          "desc": "【为什么需要它】   一个僵尸的身体状态有**两份**：僵尸槽位的 `ZombieState`（一个角色一份）和角色自己的   `CharacterState`（人和僵尸共用同一个结构）。两份必须一致，否则\"读哪一份\"会得到不同答案。 【M9 的做法】只做单向：槽位 → 角色（AI 僵尸是槽位在动）。   当时真人僵尸没有槽位，所以不需要反方向。 【M10 的做法】**双向**，方向由\"谁在驱动这只僵尸\"决定（一句话规则）：   ┌ 这只僵尸的驱动是**输入**（本地玩家，将来还有远端玩家）   │   · 活着       → **角色是权威** → 镜像方向：角色 → 槽位   │   · 死亡期间   → 输入被忽略，身体停在死亡点（角色 ← 槽位，速度归零）   │   · 刚复活那一 tick → **槽位是权威**（重生点由僵尸规则决定）→ 角色 ← 槽位   └ 这只僵尸的驱动是 **AI**       · 一律 **槽位是权威** → 镜像方向：槽位 → 角色   于是\"移动/碰撞/被枪打中/被击杀/重生\"对真人和 BOT **只有一条代码路径**，   区别只剩\"输入从哪来\" —— 这正是 M10 对称性重构要的东西。 【为什么没把两份状态合并成一份】   `ZombieState.Position` 被约 90 处引用（Core 40 + 测试 44 + 表现层 6），且测试里大量僵尸   是\"无角色\"的纯 AI 僵尸（`CharacterIndex = -1`）。合并收益是\"结构上不可能漂移\"，   而本文件的同步 + `ZombieLinkTests` 的不变量用例已经能保证一致。   建议等做联机、反正要大改状态结构时一次性做（已记入 Out 清单）。"
        },
        {
          "path": "01_Core/Systems/Zombie/ZombieSystem.cs",
          "title": "僵尸 AI v1（只做三件事：追 / 咬 / 可被击杀）",
          "desc": "设计原则（对应 00_设计锚点「AI v1 只做三件事」）：   1. 有视线 → 直接朝目标走   2. 无视线 → 走网格 A* 路径（复用 M1 的 LevelGrid / GridPathfinder）   3. 贴脸 → 按冷却咬人；玩家血量归零 → 由 Simulation 处理感染转换 不做：包抄、多目标选择、避让、技能（M4+ / 后续）"
        },
        {
          "path": "01_Core/Systems/Zombie/ZombieTargeting.cs",
          "title": "僵尸选目标与重生点（Systems/Zombie）",
          "desc": "【系统层】从原 `Simulation.cs` 拆出来的两件\"僵尸该去哪\"的问题：   · 找最近的人类当目标（真人或 AI 一视同仁）   · 该在哪个重生点复活 具体怎么走、怎么咬在 `ZombieSystem.cs`；避让在 `ZombieAvoidance.cs`。"
        },
        {
          "path": "03_Presentation/AboutPage.cs",
          "title": "菜单页：版本信息（M15）",
          "desc": "照 ZP 的\"插件信息\"那一项。这里写的不是营销文案，而是**这个版本到底做了什么** —— 玩家能据此知道\"我玩的是哪一版\"，我们排查问题时也能一眼对上（服主验收时尤其有用）。"
        },
        {
          "path": "03_Presentation/CombatFeedback.cs",
          "title": "战斗反馈（消费 Core 事件 → 音效 + 视觉）",
          "desc": "边界：只读事件、只播表现，绝不回写仿真状态。"
        },
        {
          "path": "03_Presentation/CombatVisuals.cs",
          "title": "战斗可视元素（靶子 / 弹孔 / 枪口火焰）",
          "desc": "全部由代码生成，遵守「表现层只读状态」： 这里只根据 Core 的状态与事件来画东西，绝不反过来改状态。"
        },
        {
          "path": "03_Presentation/DebugHud.cs",
          "title": "调试面板（IMGUI，全部代码绘制）",
          "desc": "【这一层放什么】只有**开发/验收时才需要看的数据**：   帧率与 Core 每 tick 耗时（性能验收线）、状态哈希（确定性）、命中统计、   散布/后坐力/射速的真实数值、完整名册（含 AI 行为模式）、靶子血量、每只僵尸的   血量/视线/路点/距离/拥堵。 【不放什么】玩家玩的时候需要的东西（生命、护甲、弹药、回合、商店、准星）在 `PlayerHud`。   M9 之前这两类混在一个 551 行的文件里 —— 想改一行玩家 UI 得先读完整份开发数据。 【怎么开关】`F4`（在 `SimRunner` 里读键，避免在 OnGUI 里读键：OnGUI 一帧会被调用多次，   `GetKeyDown` 会连触发两次，把开关瞬间翻回去）。 【分层】`GUI.depth = 1` → 画在玩家界面之下、夜视仪叠加之上（夜视仪是 100）。"
        },
        {
          "path": "03_Presentation/GameBootstrap.cs",
          "title": "代码自举入口",
          "desc": "这是「打开工程按 Play 就能玩」的关键： RuntimeInitializeOnLoadMethod 会在任何场景自动执行（包括空场景）， 所以不需要在编辑器里拖任何组件、不需要建场景。"
        },
        {
          "path": "03_Presentation/GrenadeVisuals.cs",
          "title": "手雷可视（M17-C）：飞行中的雷 + 地上的圈/光",
          "desc": "【只读仿真】按 `sim.Grenades` / `sim.AreaEffects` 把池子里的物体摆好，一个状态都不写。   池子大小 = Core 里那两个数组的长度，运行期零分配。 【画什么】   · 飞行中的手雷：一颗小球（颜色按手雷种类：冰冻淡蓝 / 燃烧橙红 / 照明白）   · 燃烧圈：橙红圆盘 + 一个会闪的点光源（火）   · 冰冻圈：淡蓝圆盘（没有光 —— 冰是\"冷\"，不该照亮）   · 照明弹：白色圆盘 + 一根细光柱 + 一个大范围点光源（这是它唯一的作用） 【为什么圈画成一个\"贴地的圆盘\"】灰盒阶段要的是\"一眼看清范围在哪\"，   用圆柱压扁成盘子最便宜；将来有美术资源时换成带贴图的圈即可（只改这一个文件）。"
        },
        {
          "path": "03_Presentation/HelpPage.cs",
          "title": "菜单页：帮助（M15）",
          "desc": "照 ZP 的做法：菜单里有一项\"帮助\"，弹一页**怎么玩**的说明（ZP 用的是 MOTD 网页， 我们用 IMGUI 文本 —— 内容等价，形式服从我们的表现层技术栈）。 这一页的内容是**玩家第一次进来最需要知道的**：你是人还是僵尸、怎么算赢、按键在哪、 手里的枪怎么选。所以它只说\"能立刻用上的\"，不讲实现细节。"
        },
        {
          "path": "03_Presentation/HudStyles.cs",
          "title": "HUD 样式（IMGUI）",
          "desc": "M9：HUD 拆成\"玩家界面 `PlayerHud`\"与\"开发数据 `DebugHud`\"两部分之后， 两边的字号/配色必须一致（否则同一块面板上的字会一大一小，看着像坏了）。 所以样式集中在这里，两边各持有一个实例。 注意：`GUIStyle` 依赖 `GUI.skin`，**只能在 OnGUI 里创建**，所以是懒加载（`Ensure`）。"
        },
        {
          "path": "03_Presentation/HudText.cs",
          "title": "HUD 文案与统计助手",
          "desc": "M9：HUD 拆成 `PlayerHud`（玩家界面）与 `DebugHud`（开发数据）之后， 有些文字是两边都要用的（阶段名、僵尸数量、夜视仪状态…）。 与其抄两份（抄两份就会有一天只改了一处），不如集中在这里。 这里全是**纯函数**：只读 Core 的状态，不写任何东西。"
        },
        {
          "path": "03_Presentation/LevelVisuals.cs",
          "title": "关卡可视化（把 Core 的盒子数据搭成场景）",
          "desc": "关键：这里生成的立方体只用于「看」，碰撞由 Core 自己算。 所以创建后立刻销毁 Collider —— 保证没有任何 Unity 物理参与玩法。"
        },
        {
          "path": "03_Presentation/LootVisuals.cs",
          "title": "掉落物可视（M5：弹药袋）",
          "desc": "只读 Core 状态：按 Sim.AmmoPacks 里的存活项，把池子里的模型摆到对应位置，拾取后隐藏。 池子大小 = 掉落物上限，运行期零分配。"
        },
        {
          "path": "03_Presentation/MenuPage.cs",
          "title": "菜单页面接口与总菜单（IMGUI）",
          "desc": "【M15：照 CS 1.6 / ZP 的总菜单重做】   参照的是服主自己服务器上的 ZP 主菜单（`zp50_main_menu.sma`）+ SOS 升级菜单   （`ZQ_SOS_Menu.sma`，源码与结论见 `Docs/13`）。三条关键决定（服主拍板）：   ① **纯数字键**：菜单不用鼠标点。CS 里菜单是**键盘**操作的东西，鼠标始终属于视角。      所以这里不画任何 `GUI.Button`，项一律显示成 `【1】xxx`。   ② **编号固定、不可用灰显（不隐藏）**：ZP 就是这么做的 —— 菜单位置永远不变，      \"现在不能用\"只是变灰。这条和我们 `Docs/01` 的 IMGUI 纪律是同一个道理      （会变的控件会让人点错/看错）。   ③ **不暂停世界**：菜单只是覆盖层，僵尸照跑、AI 照打，你仍然能移动/开枪/看视角。      数字键在菜单开着时归菜单（核心代码里已保证不让位给\"切武器\"）。 【交互约定】   · `M` 开关总菜单；页里按 `M` 退回列表   · `1`~`9` 进项 / 选择；`0` = 列表里\"关闭\"、页里\"返回上级\"（与 ZP 一致）   · `Esc` 直接全关   · 按键**一律在 `SimRunner.Update` 里读**再喂进来（IMGUI 一帧会调用多次 OnGUI，     在里面读 `GetKeyDown` 会一次按键触发两次 —— M9 定的纪律） 【两类条目】页面（进子页，`IMenuPage`）与动作（直接执行，`MenuAction`）。   以后加功能 = 加一个实现 + 在 `PlayerHud.Bind` 的列表里加一行，总菜单不用改。"
        },
        {
          "path": "03_Presentation/MessageLog.cs",
          "title": "左下角消息栏（M15）",
          "desc": "【这是什么】像 CS 1.6 的左下角 tell 区：一行一行往下滚的短消息，几秒后淡出。   服主的原话：\"到时候选择什么丧尸会在左下角添加一个消息栏，类似于 1.6 的那种   左下角显示交流信息或者展示信息这种。\" 【为什么需要它】以前游戏里所有的\"发生了什么\"都只进了 `Debug.Log`（控制台）：   拾取弹药袋、买到东西、脱困成功、回合胜负……**玩家一个都看不到**。   这一层把\"给玩家看的短消息\"从调试日志里分出来。 【位置】屏幕左下、**压在 HP/AP 条正上方**（HP 条从 `Screen.height - 96` 开始往下画，   所以消息栏以它为底往上排）。最新的消息在最下面，往上越来越旧。 【纪律】表现层只读仿真、不写状态；这里纯粹是\"显示用的环形缓冲\"，不参与任何玩法判定。"
        },
        {
          "path": "03_Presentation/ModeSelectPage.cs",
          "title": "菜单页：模式（下一个回合用哪个模式）（M18-A）",
          "desc": "【为什么需要这一页】服主要的模式是**加权随机**出现的（\"模式可以随机出现，权重可以分配\"）。 但调试/测试时必须能**强制**指定下一回合的模式 —— 否则\"复仇者模式\"要等概率抽到才能试， 一次要等几十局。这一页就是那个开关（也对应你服 ZP 的 `zp_gamemodes_start` 那个 native）。 【纪律】   · 表现层**只发意图**：这里只写 `sim.RequestedModeId`（一个一次性请求，     由 `ModeSelector.PickNext` 在下一个回合开始时消费掉），**不直接改回合状态**；   · 只读数据表来列模式（加一个模式，这一页自动多一行 —— M11 的纪律）。"
        },
        {
          "path": "03_Presentation/NightVisionEffect.cs",
          "title": "夜视仪效果（M5）",
          "desc": "⚠ 重要工程决定：本工程用的是**内置渲染管线（Built-in RP）**，没有 URP/HDRP、没装任何后处理包   （`ProjectSettings/GraphicsSettings.asset` 里 `m_CustomRenderPipeline: {fileID: 0}`）。   所以这里**不引入 URP Volume / Post Processing Stack**，而是用两件零依赖的东西做：     1) `RenderSettings`：抬环境光 + 加绿色雾 + 改背景色（让暗处真的看得见）     2) IMGUI 全屏叠加：绿色染色 + 暗角 + 扫描线（做出\"夜视仪\"的观感）   好处：不需要装包、不会把你的画面搞黑、**可一键开关**、也不依赖任何素材。 边界：夜视仪\"是否拥有\"由 Core 的 CharacterState.HasNightVision 决定（购买后才有效）；       \"开/关\"是纯表现层状态，不参与仿真 → 不影响确定性与将来的联机。"
        },
        {
          "path": "03_Presentation/PlaceholderAudio.cs",
          "title": "占位音效（程序合成，零素材依赖）",
          "desc": "目的：立刻验证「反馈链」是否存在（开火/命中/空仓/换弹）。 服主提供真实音效后，只需把 clip 换成导入的资源即可，调用方不用改。"
        },
        {
          "path": "03_Presentation/PlayerHud.cs",
          "title": "玩家界面 HUD（IMGUI）",
          "desc": "【这一层放什么】只放**你玩游戏需要知道的东西**，而且是\"一眼能看出来\"的形式：   · 顶部中间：第几回合、当前阶段、倒计时、回合时间条、**比分**   · 顶部右侧：存活人类/僵尸、弹药袋、夜视仪状态、你的僵尸类型   · **左下：HP 条 + AP 条**（带数字）   · **右下：弹药（弹匣/备弹）+ 换弹进度 / 咬击冷却**   · 屏幕中心：准星（随散布张开）+ 命中标记   · 屏幕边缘：被咬红闪；阵亡时压暗 + 居中大字倒计时   · 商店（B）、僵尸类型选择（M） 【不放什么】FPS、Core 耗时、状态哈希、每个僵尸的视线与路点、AI 模式统计、靶子血量 —— 那些是   **开发数据**，在 `DebugHud`（`F4` 开关）。 【布局纪律】全部**固定像素**（不用 GUILayout 自动布局承载会变的东西）：   M7 商店那次踩过的坑 —— 自动布局会让\"这次显示按钮、下次显示标签\"的控件在两次布局事件之间   移动位置，点击就落到别的控件上（表现为\"点护甲买成了夜视仪\"）。   条形/数字也遵守：位置固定，只有填充宽度和文字在变。 【分层】`GUI.depth = 0`（最上）；夜视仪叠加 100（最底）、调试面板 1（中间）。"
        },
        {
          "path": "03_Presentation/ShopPage.cs",
          "title": "菜单页：购买装备（M15 建占位，**M17 正式开放**）",
          "desc": "【M17 服主的两句话】   > \"商城现在可以开放了，真人也能购买，而不是只有 AI 可以随机购买。\"   > \"AWP/M249/SG550/G3SG1 都在主武器菜单中去除不被玩家开局选择，只能商城购买。\" 【为什么要重写而不是把旧面板打开】旧面板（`PlayerHud.DrawShop`）是**鼠标点击**的   `GUI.Button`，直接违反 M15 定的 P-1 纪律（菜单纯键盘、鼠标永远归视角）。   所以这一页按 M15 的规矩重画：`【N】名字　价格　状态`，**1-7 买 / 9 翻页 / 0 退出**。 【纪律】   · 表现层**只发意图**：这里只调 `_requestBuy(itemId)`（粘性请求 → 下一 tick 通过     `InputButtons.Buy` + `BuyItemId` 交给 Core 裁决），绝不直接改状态。   · 能不能买、买完什么样，全部问 Core：`ShopSystem.CanAfford` / `BlockReason`。     买不起 / 已拥有 → **灰显 + 写出原因**，编号和位置永远不变（P-2）。"
        },
        {
          "path": "03_Presentation/SimConvert.cs",
          "title": "Core ↔ Unity 坐标转换（**唯一入口**）",
          "desc": "为什么必须有这个文件：   Core 用 GoldSrc 风格坐标：(x 右, y 前/北, z 上)   Unity 用左手系：          (x 右, y 上,     z 前)   两者「上」和「前」的轴不同，直接 new Vector3(p.x, p.y, p.z) 会把整个世界转 90°，   表现为：重力像\"后退\"、按 W 像\"往上\"、俯视相机跑进墙里。 规矩：表现层任何地方都不许自己拼 Vector3，一律走这里（见《01 基座标准》第 12 节）。"
        },
        {
          "path": "03_Presentation/SimRunner.cs",
          "title": "仿真驱动器（表现层）",
          "desc": "职责边界（遵守《01 基座标准》）：   ✔ 用累加器按 64 tick 驱动 Core 仿真   ✔ 采集输入 → 组装 InputCommand   ✔ 向外提供「上一帧状态 + 当前状态 + 插值系数」给表现层   ✘ 不写入任何仿真状态（唯一写入者是 Core）"
        },
        {
          "path": "03_Presentation/SOSZombie.Presentation.asmdef",
          "title": "",
          "desc": ""
        },
        {
          "path": "03_Presentation/UpgradePage.cs",
          "title": "菜单页：升级（**占位**，M15）",
          "desc": "【为什么现在只有占位】服主的决定（M15）：先把总菜单外壳做好并验收，升级系统下一块再接。 但**位置先摆出来并灰显**，理由是照 ZP 的做法：菜单项位置固定、不可用只是变灰 —— 玩家一眼能看到\"以后有这东西\"，而不是等你做完才突然多出一项。 【以后要接什么】服主自己服务器上的 SOS 升级插件（源码已到手，见 `Docs/13`）：   17 个共用技能槽（人类/僵尸名字与上限各不相同）+ 人类专属 6 个 + 僵尸专属 10 个，   分四类（基因强化 / 异化能力 / 武器改装 / 突变特性），用经验升级、技能点加点。   Core 侧已经预留了挂载点：`WeaponUpgrade` + `WeaponResolver`（M12-C，默认全中性）。"
        },
        {
          "path": "03_Presentation/WeaponModels.cs",
          "title": "武器外形工厂（M16-B）",
          "desc": "【这是什么】用 Unity 图元（方块/圆柱）拼出\"看得出是什么枪\"的灰盒模型。   服主提的问题原话：\"武器消失\" —— 追下去是两件事：     ① 逻辑上打空弹会自动切走（M16-A 已按服主的要求取消）     ② **手上根本没有枪的模型**，屏幕里只有准星和一个飘着的枪口火焰   这个文件解决第 ② 件：第一人称手上要有枪、别人身上要看得见枪、地上丢的枪要看得见。 【为什么按\"武器类别\"做 7 种，而不是一把枪一个模型】   1. 现在是灰盒阶段，美术资源一律还没有（将来的做法是换成真模型，见 `Docs/11`）；   2. 手感需要的信息是\"我手上是长枪还是短枪\"（步枪/冲锋枪/狙击/霰弹/手枪/刀/机枪），      7 种形状已经能把这件事讲清楚，而 25 把各做一套的边际收益很低；   3. 每把枪仍然**有自己的颜色**（按编号取色），所以\"这是 AK 还是 M4\"也分得出。 【坐标约定（很重要，三处调用都按它摆）】   原点 = **握把**（手抓的那一点，不是枪的中心）；   枪口朝 **本地 +Z**；枪的\"上方\"（照门那一侧）朝 **本地 +Y**。   于是拿着它的物体只要\"朝哪看就转到哪\"，枪就自然指向前方。 【纪律】纯表现：只被 `SimRunner` / `WeaponViewModel` / `WeaponWorldVisuals` 调用，   自己不读仿真、不写状态。"
        },
        {
          "path": "03_Presentation/WeaponSelectPage.cs",
          "title": "菜单页：选择武器（M10-C 建，M15 按 SOS 风格重做）",
          "desc": "服主的流程要求：**先选主武器 → 选完自动进副武器 → 选完副武器直接关菜单**。 （原来还有一屏\"选好了！下一回合开始就会按这套装备发枪\"，服主说\"根本没有意义\"，已删除。） 【版式照 SOSZOMBIE 的买枪菜单做】（源码 `zp50_buy_menus.sma`，调研见 `Docs/13`）：   · **只列武器名字**，不显示伤害/射速/弹匣这些参数（服主：\"就直接给武器名字就好了\"）   · **1-7 = 武器**，**8 = 记住设置【开/关】**，**9 = 下一页**，**0 = 退出**     （ZP 的原版是 1-7 武器 + 8 记住设置 + 9 继续/返回 + 0 退出，我们完全对齐）   · 标题带页码区间（ZP 写 `主要武器 [1-7]`，我们写 `主要武器 [1-7/18]`）   · **靠左显示**（ZP 的菜单由引擎画在屏幕左侧）   · **当前装备的那把用另一种颜色标出**（服主要的；ZP 没有，但它每回合都要重买，我们是持久选择） 【「记住设置」是什么意思】照 ZP 的 `WPN_AUTO_ON` 语义搬过来：   开 = 下一回合开局**不再自动弹这个菜单**，直接用上次选的那套；   关 = 每回合开局都弹出来让你重选。   （ZP 那边是\"自动买上次记住的枪\"，我们这边装备本来就是跟随玩家的，所以等价于\"别每回合烦我\"。） 纪律：   · **玩家选、BOT 随机**（同一张武器表、同一套属性）—— M10 定的对称原则   · 选择只影响\"**下一回合开始发什么枪**\"（`Simulation.SetLocalPrimaryWeapon`），     不会当场把手里的枪换掉（否则菜单就成了作弊开关）   · 布局固定像素（沿用商店那次的教训）"
        },
        {
          "path": "03_Presentation/WeaponViewModel.cs",
          "title": "第一人称手上的枪（M16-B）",
          "desc": "【要解决的问题】M16 之前屏幕里根本没有\"我手上的枪\"：只有准星 + 开火时那团枪口火焰。   服主反馈\"武器消失\"时，一半原因就是这个 —— 打空了弹匣自动切枪（逻辑），   而手上本来也没有任何视觉参照（表现），于是\"枪不见了\"。 【做法】7 个类别的模型各造一个，挂在**第一人称相机**下面，按当前手持武器切显隐：   · 换枪 / 捡枪 → 手上的形状立刻变（走 `sim.Weapon`，Core 说什么就是什么）   · 走路 → 轻微晃动（bob），停住就不晃   · 开火 → 后坐一顶再回位（跟着 `NextFireTime` 的变化判断\"刚打了一发/挥了一刀\"）   · 换弹 → 把枪放下去，换弹结束抬起来（CS 里最直观的一条反馈）   · 右键瞄准 → 枪移到屏幕正中（开镜的拉近是 `SimRunner` 的 FOV + 全屏镜筒在管）   · **空手 / 变成僵尸 → 全部隐藏**（M16 起丢枪会真的留下空槽位） 【纪律】纯表现：只读 `sim`，不写任何状态；所有时间都来自 `Time.deltaTime`，不参与仿真。"
        },
        {
          "path": "03_Presentation/WeaponWorldVisuals.cs",
          "title": "世界里的枪（M16-B）：① 地上的枪 ② 别人手上/身上的枪",
          "desc": "【① 地上的枪】M16 起按 G 可以把枪丢下（`WeaponDropRules`），走过去自动捡。   如果地上那把枪**看不见**，\"丢枪换枪\"这套玩法就没法用 —— 这个模块把它画出来。   形状/颜色直接复用 `WeaponModels`（和第一人称手上那把是同一套工厂），   所以\"地上那把是 AK\"和你手上那把长得一样，一眼能对上。 【② 别人身上的枪】以前 8 个 AI 人类全是**一模一样的青胶囊**，   你分不出谁拿的是狙（远距离威胁大）、谁拿的是刀（可以贴上去）。   现在每个人胸前挂一把他自己那把枪的模型，隔着半个场地也能做判断。   ⚠ 本地玩家不画（他的视角就在自己身体里，画了就是\"脸上杵着一把枪\"）。 【纪律】纯表现：只读 `sim`（`WeaponDrops` / `State.Players`），一个状态都不写。   模型**只在\"那把枪换了\"的时候重建**（丢枪/捡枪/换枪是低频事件），   平时每帧只做\"摆位置\"，所以运行期不掉帧、也不产生垃圾。"
        },
        {
          "path": "03_Presentation/ZombieSelectPage.cs",
          "title": "菜单页：选择僵尸类型（M10 建，M15 按服主要求重做）",
          "desc": "规则（M10-A 定的）：**BOT 按权重随机抽、玩家自己选**，两者共用同一张类型表与同一套属性； \"母体\"只出现在开局，不能被预选（`SpawnWeight = 0`）。 【M15 的改动（服主要求）】   · 页面**只列名字**（原来是\"名字 + 血/速度/咬击/重生\"）——     服主：\"僵尸也只保留名字。到时候选择什么丧尸会在左下角添加一个消息栏……     直接完整的介绍就好了，不需要全部写到僵尸类型里面去。\"   · 所以**介绍改去左下角的消息栏**：选中哪一种，就把那一型的 `Desc` 完整发到消息栏，     顺便把关键数值也用一句话说清楚（消息栏有 4 行空间，比塞进菜单项清楚得多）。"
        }
      ]
    }
  ]
}

export default data
