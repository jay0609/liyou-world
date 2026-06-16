/**
 * 璃幽 · 次元书库 — 官方书籍数据
 * 修改此文件即可更新书库内容，无需改动页面组件
 */

export interface Book {
  icon: string
  title: string
  desc: string
  status: string
}

export const books: Book[] = [
  {
    icon: '📕', title: '璃幽起源：万物之始',
    desc: '《万物书》的诞生与璃幽的觉醒。次元未分时的第一个故事。',
    status: '连载中',
  },
  {
    icon: '📗', title: '解忧杂货店日常',
    desc: '璃幽在杂货店中接待来自各次元的访客，一个个温暖的小故事。',
    status: '即将上线',
  },
  {
    icon: '📘', title: '次元旅行记',
    desc: '跟随璃幽穿越不同次元，探索奇异世界与灵魂的羁绊。',
    status: '策划中',
  },
  {
    icon: '📙', title: '万物书设定集',
    desc: '完整的世界观、种族、魔法体系设定。创作参考必备。',
    status: '即将上线',
  },
  {
    icon: '📓', title: '书灵手记',
    desc: '璃幽的私人日记——那些没有写进书里的小小片段。',
    status: '连载中',
  },
  {
    icon: '📔', title: '粉丝创作精选',
    desc: '来自粉丝庭院的最优秀二创作品合集。',
    status: '征集中',
  },
]
