export interface Milestone {
  /** tag 名，如 "M1" / "p12 冲锋猛扑" */
  tag: string
  /** 日期 YYYY-MM-DD */
  date: string
  /** 说明 */
  desc: string
  /** 该节点对应的测试数量（没有则为 null） */
  tests: number | null
  /** 构建产物字节数（用于显示体积增长，可选） */
  size?: number
}

export interface ProjectMilestones {
  slug: string
  totalTags: number
  totalCommits: number
  /** 区块标题（默认「开发里程碑」） */
  title?: string
  /** 数据来源说明（显示在时间线底部） */
  source?: string
  items: Milestone[]
}
