/**
 * 全局常量
 * 集中管理所有硬编码值，方便统一修改
 */
export const SITE = {
  name: '子弈',
  nameEn: 'ZiYi',
  fullName: '林子杰',
  domain: 'liyou.world',
  email: 'contact@liyou.world',
  role: 'FPS 陪玩 × 独立开发者',
} as const

/** 陪玩接单入口 —— 全站主转化出口 */
export const CONTACT = {
  /** 微信号（扫码加好友） */
  wechatId: 'CS2NPC',
  /** 二维码图片路径 */
  wechatQr: '/images/wechat-cs2npc.png',
} as const

/** 璃幽 IP 社区群（已从主导航移除，仅供项目页 / 页脚使用） */
export const QQ_GROUP = {
  number: '1105460048',
  link: 'https://qm.qq.com/q/1105460048',
  verifyQuestion: '璃幽的发卡叫什么名字？',
} as const

export const STORAGE_KEYS = {
  splashDone: 'splash-done',
} as const
