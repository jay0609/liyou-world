/**
 * 接单记录
 *
 * 这个文件喂给「时间线」页 —— 那一页只放接单，不放日常（日常看「动态」）。
 *
 * 怎么加：接完一单，往最前面插一条（或者告诉我，我加）。
 * 没有单的时候数组是空的 —— 页面会显示"今天还没有人点单"。
 *
 * 字段说明：
 *   date     YYYY-MM-DD，接单当天
 *   game     游戏 + 平台，例如 'CS2 · 完美平台'
 *   detail   做了什么，例如 'B+ → A · 5 局'
 *   tag      老板代号（不要写真名），例如 '老板 A'；可空
 *   quote    老板的原话（可选，有就写）
 *   images   战绩截图（可选，放 public/images/orders/ 下，写 URL 路径）
 *   repeat   是不是回头客 —— 这一个标签最有说服力
 */

export interface OrderRecord {
  /** 日期 YYYY-MM-DD */
  date: string
  /** 游戏 + 平台 */
  game: string
  /** 做了什么 */
  detail: string
  /** 老板代号（不写真名） */
  tag?: string
  /** 老板的原话（可选） */
  quote?: string
  /** 战绩截图路径数组（可选），例如 ['/images/orders/2026-09-18-1.jpg'] */
  images?: string[]
  /** 是否回头客 */
  repeat?: boolean
}

/**
 * ⚠️ 现在是空的 —— 页面会显示"今天还没有人点单"。
 *
 * 接第一单之后，改成这样：
 *
 * export const ORDERS: OrderRecord[] = [
 *   {
 *     date: '2026-09-18',
 *     game: 'CS2 · 完美平台',
 *     detail: 'B+ → A · 5 局',
 *     tag: '老板 A',
 *     quote: '打得挺舒服，下次还找你',
 *     images: ['/images/orders/2026-09-18-1.jpg'],
 *     repeat: false,
 *   },
 * ]
 */
export const ORDERS: OrderRecord[] = [
  {
    date: '2026-09-19',
    game: '三角洲行动',
    detail: '2.5 小时',
    tag: '最强一突的高总',
  },  {
    date: '2026-09-17',
    game: '三角洲行动',
    detail: '机密 2 小时 ＋ 绝密 3 小时',
    tag: '帅的一逼的高总',
  },  {
    date: '2026-09-18',
    game: '三角洲行动 · 航天基地 / 巴克什',
    detail: '绝密 · 7 局 · 2.5 小时',
    tag: '俱乐部外派单',
    images: ['/images/orders/2026-09-18-delta-1.jpg'],
  },
]

/** 加微信的入口（和站上其他地方一致） */
export const ORDER_CONTACT_HINT = '加微信说一声就行'
