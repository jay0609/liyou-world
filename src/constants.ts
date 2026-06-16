/**
 * 璃幽宇宙 — 全局常量
 * 集中管理所有硬编码值，方便统一修改
 */
export const SITE = {
  name: '璃幽宇宙',
  nameEn: 'Liyou World',
  domain: 'liyou.world',
  email: 'contact@liyou.world',
} as const

export const QQ_GROUP = {
  number: '1105460048',
  link: 'https://qm.qq.com/q/1105460048',
  verifyQuestion: '璃幽的发卡叫什么名字？',
} as const

export const STORAGE_KEYS = {
  users: 'liyou-users',
  currentUser: 'liyou-current-user',
  posts: 'liyou-posts',
  splashDone: 'splash-done',
} as const
