export interface ProjectFile {
  /** 相对项目根的路径，如 "01_Core/Common/InputCommand.cs" */
  path: string
  /** 一句话说明（取自源码头注释） */
  title: string
  /** 详细说明（取自源码头注释） */
  desc: string
}

export interface ProjectFiles {
  /** 对应 projects.ts 里的 slug */
  slug: string
  /** 显示用的根目录名 */
  root: string
  total: number
  files: ProjectFile[]
}
