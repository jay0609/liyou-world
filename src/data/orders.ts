/**
 * 接单记录
 *
 * 用途：首页「时间线」页上，和项目里程碑混排，证明"这人真有人买"。
 *
 * 怎么加：接完一单，往下面数组最前面插一条（或者告诉我，我加）。
 * 没有单的时候数组是空的 —— 页面会自动不显示接单条目。
 *
 * 字段说明：
 *   date    YYYY-MM-DD，接单当天
 *   game    游戏 + 平台，例如 'CS2 · 完美平台'
 *   detail  做了什么，例如 'B+ → A · 5 局'
 *   tag     老板代号（不要写真名），例如 '老板 A'；可空
 *   quote   老板的原话（可选，有就写，没有留空字符串）
 *   repeat  是不是回头客 —— 这一个字最有说服力
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
  /** 是否回头客 */
  repeat?: boolean
}

/**
 * ⚠️ 现在是空的 —— 页面不会显示接单区块。
 * 接第一单之后，把下面改成：
 *
 * export const ORDERS: OrderRecord[] = [
 *   {
 *     date: '2026-09-17',
 *     game: 'CS2 · 完美平台',
 *     detail: 'B+ → A · 5 局',
 *     tag: '老板 A',
 *     repeat: false,
 *   },
 * ]
 */
export const ORDERS: OrderRecord[] = []
