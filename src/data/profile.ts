/**
 * 个人简介数据 — 数据驱动
 *
 * 首页所有个人板块（Hero / 基本信息 / 兴趣爱好 / 游戏生涯 / 职业经历 / 亮点 / 陪玩服务 / 联系）
 * 都从这里读取。改这个文件即可更新首页，无需碰组件。
 */
import { CONTACT } from '../constants'

export interface TimelineItem {
  /** 时间段，如 "现在" / "2020 — 2022" */
  period: string
  title: string
  desc: string
  tags?: string[]
}

export interface Highlight {
  icon: string
  title: string
  desc: string
}

export interface ServiceItem {
  icon: string
  name: string
  desc: string
  /** 计价方式，如 "xx 元/局" */
  price?: string
}

export interface BasicItem {
  label: string
  value: string
}

export interface HobbyItem {
  icon: string
  name: string
}

export interface DoingItem {
  icon: string
  title: string
  desc: string
}

export interface ThinkingItem {
  icon: string
  title: string
  desc: string
}

export interface Profile {
  /** 网名（不是真名） */
  name: string
  /** 网名 / 常用称呼 */
  alias: string
  /** 一句话定位（短） */
  role: string
  /** slogan */
  tagline: string
  /** 头像：emoji 或图片路径（以 / 或 http 开头则按图片渲染） */
  avatar: string
  /** 自我介绍段落 */
  intro: string[]
  /** 我是什么样的人（相处方式） */
  personality: string[]
  /** 个人标签：星座 / MBTI / 血型 …… 留空数组则不显示该区块 */
  tags: BasicItem[]
  /** 思维方式（判断问题时用的框架） */
  thinking: ThinkingItem[]
  /** 现在在做什么 */
  nowDoing: DoingItem[]
  /** 基本信息（地区 / 身高 / 体重 …） */
  basics: BasicItem[]
  /** 兴趣爱好 */
  hobbies: HobbyItem[]
  /** 玩过的 FPS 系列（按接触顺序，不写年份） */
  gameHistory: string[]
  gameCareer: TimelineItem[]
  career: TimelineItem[]
  highlights: Highlight[]
  services: ServiceItem[]
  contact: { label: string; value: string; url?: string }[]
}

export const profile: Profile = {
  name: '林子杰',
  alias: '子弈',
  role: 'FPS 陪玩 × 独立开发者',
  tagline: '会打，也会聊 —— 完美魔王 S，学过心理学的 FPS 陪玩',
  avatar: '/images/avatar.jpg',

  intro: [
    '我是子弈，广东人。FPS 游戏陪玩，同时也是独立游戏开发者——白天写代码，晚上陪你上分。',
    'CSGO 5E 天梯第一、LOL S6 大师；现在完美平台魔王 S（rating 1.32），5E S+（rating 1.46）。有两年一线消防经历，也系统学过心理学。',
    '所以我陪玩卖的不只是枪法。会打的人很多，能让你这一局放松、不尴尬、输了也不憋屈的人很少——那是我想做的那一种。',
  ],

  personality: [
    '打游戏的时候我不太闲聊——该冲的时候冲，该等的时候等，报点清楚。但如果你想聊点什么，我也接得住。',
    '学过心理学，当过两年消防兵，也自己开过店。所以我不会在意你打得菜还是强，我只在意这一局愉不愉快。',
    '不太会催单，也不太会推销。你什么时候想打，来就行。',
  ],

  /**
   * 个人标签 —— 轻松的社交信息，放在基本资料下面
   */
  tags: [
    { label: '生日', value: '6 月 9 日' },
    { label: '星座', value: '双子座' },
    { label: '年龄', value: '永远 18' },
    { label: 'MBTI', value: 'ENTP' },
    { label: '口头禅', value: '有趣' },
    { label: '情感', value: '单身' },
    { label: '饮食', value: '肉食主义者' },
    { label: '咖啡', value: '每日必喝' },
    { label: '音乐', value: '纯音乐' },
    { label: '游戏', value: '我的世界' },
  ],

  thinking: [
    {
      icon: '🧩',
      title: '第一性原理',
      desc: '遇到问题先问"这件事的本质是什么"，而不是"别人怎么做"。做游戏时不问"别的僵尸模式怎么设计的"，而问"如果这个世界是真的，规则应该长什么样"——所以 BOT 和真人共用同一套体系，不因为我是玩家就特殊对待。',
    },
    {
      icon: '📊',
      title: '贝叶斯',
      desc: '任何结论都只是"当前概率最高的假设"，不是真理。所以我习惯要求"先说理由，再给方案"——我要看的是推理链，不是结论。新证据进来就更新，不护着自己之前的判断。',
    },
    {
      icon: '📔',
      title: '记录与复盘',
      desc: '不靠记忆做判断，靠记录。每天记一次，隔一段时间回看——数据会告诉你哪些是真的在变，哪些只是感觉。',
    },
  ],

  nowDoing: [
    {
      icon: '🎯',
      title: 'FPS 陪玩',
      desc: 'CS2 完美 / 5E · 三角洲行动 · Steam 小游戏。每天 08:00 - 23:00 在线。',
    },
    {
      icon: '💻',
      title: '独立开发游戏',
      desc: '用 AI 辅助独立开发一款 3D FPS，已经推进到第 19 个里程碑。',
    },
    {
      icon: '📔',
      title: '每天记录',
      desc: '在这个站上记每天做了什么——训练、开发、学的东西。',
    },
  ],

  basics: [
    { label: '所在地区', value: '广东' },
    { label: '身高', value: '180 cm' },
    { label: '体重', value: '71.5 kg' },
  ],

  /**
   * 玩过的 FPS 系列 —— 按接触顺序排的链条。
   * ⚠️ 刻意不写年份：写了就等于公开年龄。
   */
  gameHistory: ['半条命', 'CS 1.5', 'CS 1.6', 'CSOL', 'CS:S', 'CSGO', 'CS2'],

  hobbies: [
    { icon: '🎮', name: 'FPS 游戏' },
    { icon: '💻', name: '独立开发' },
    { icon: '🏋️', name: '健身' },
    { icon: '🕺', name: 'Hip hop' },
    { icon: '🎤', name: '唱歌' },
    { icon: '🍳', name: '做饭' },
  ],

  gameCareer: [
    {
      period: '历史最高',
      title: '完美平台 · 魔王 S',
      desc: 'rating 1.32',
      tags: ['CS2', '完美'],
    },
    {
      period: '历史最高',
      title: '5E 优先 · S+',
      desc: 'rating 1.46',
      tags: ['CS2', '5E'],
    },
    {
      period: '历史最高',
      title: '5E 非优先 · TOP 1',
      desc: '非优先模式全国第一',
      tags: ['CS2', '5E'],
    },
    {
      period: '目前 · 5E 2026 S4',
      title: 'S · 13 星',
      desc: 'rating 1.72 ｜ 全服排名 NO.1105 ｜ 胜率 64%',
      tags: ['CS2', '5E'],
    },
    {
      period: '过往',
      title: 'CSGO 5E 天梯第一',
      desc: '5E 平台天梯榜第一名',
      tags: ['CSGO'],
    },
    {
      period: 'S6',
      title: '英雄联盟 · 大师',
      desc: 'S6 赛季大师段位',
      tags: ['LOL'],
    },
  ],

  career: [
    {
      period: '两年',
      title: '一线消防',
      desc: '习惯了高压下不乱——你那边崩了，我这边不会跟着急。',
      tags: ['消防'],
    },
    {
      period: '学过',
      title: '心理学',
      desc: '知道什么时候该说话、什么时候该闭嘴。这一条对陪玩比枪法有用。',
      tags: ['心理学'],
    },
    {
      period: '现在',
      title: '独立开发游戏',
      desc: '用 AI 独立开发 3D FPS，推进到第 19 个里程碑——我对游戏机制的理解比只会打的人深一层。',
      tags: ['Unity', 'C#'],
    },
  ],

  highlights: [
    {
      icon: '🎯',
      title: '完美魔王 S',
      desc: 'rating 1.32 ｜ 5E S+ rating 1.46 ｜ 非优先 TOP 1',
    },
    {
      icon: '🚒',
      title: '两年消防经历',
      desc: '一线待过——扛压和靠谱是那时候练出来的',
    },
    {
      icon: '🧠',
      title: '学过心理学',
      desc: '陪玩卖的是情绪价值，我知道怎么让你放松',
    },
    {
      icon: '💻',
      title: '独立开发者',
      desc: '用 AI 独立开发 3D FPS 游戏，已推到第 19 个里程碑',
    },
  ],

  services: [
    { icon: '🎯', name: 'CS2 陪玩', desc: '完美 / 5E 全段位，按局计费。', price: '40 - 90 元/局' },
    { icon: '🪖', name: '三角洲行动', desc: '自带双枪 + 过点卡。', price: '120 元/小时 · 包天 800' },
    { icon: '🕹️', name: '小游戏 · Steam', desc: '任意 Steam 游戏陪玩。', price: '60 元/小时' },
  ],

  contact: [
    { label: '微信接单', value: CONTACT.wechatId, url: '/#play' },
    { label: '抖音', value: 'CS2NPC' },
  ],
}
