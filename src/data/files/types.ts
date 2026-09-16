export interface ProjectFile {
  /** 相对项目根的路径，如 "01_Core/Common/InputCommand.cs" */
  path: string
  /** 一句话说明（取自源码头注释） */
  title: string
  /** 详细说明（取自源码头注释） */
  desc: string
}

/** 一个代码库 / 一套源码的分组 */
export interface FileSection {
  id: string
  /** 分组标题，如 "AMXX 插件（自研 · Pawn）" */
  title: string
  /** 显示用的根目录名 */
  root: string
  total: number
  files: ProjectFile[]
}

export interface ProjectFiles {
  /** 对应 projects.ts 里的 slug */
  slug: string
  sections: FileSection[]
}
