export interface Milestone {
  /** tag 名，如 "M1" / "M13-B-武器库补齐" */
  tag: string
  /** 打 tag 日期 YYYY-MM-DD */
  date: string
  /** tag 说明（取自 git tag message） */
  desc: string
  /** 该里程碑的测试数量（从说明里解析，没有则为 null） */
  tests: number | null
}

export interface ProjectMilestones {
  slug: string
  totalTags: number
  totalCommits: number
  items: Milestone[]
}
