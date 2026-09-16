/**
 * Decap CMS → 璃幽宇宙 内容转换脚本
 *
 * 功能：在构建前将 content/ 目录中的 CMS 管理内容
 *       转换为 src/data/ 中的 TypeScript 数据文件
 *       直接覆写现有文件，组件无需修改
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const CONTENT = path.join(ROOT, 'content')
const DATA = path.join(ROOT, 'src', 'data')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function readJSON(filePath) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf-8')) } catch { return null }
}

function writeDataFile(filename, content) {
  const ts = `/**\n * 由 scripts/convert-content.cjs 自动生成\n * 编辑请用 Decap CMS：liyou.world/admin\n */\n\n${content}\n`
  fs.writeFileSync(path.join(DATA, filename), ts, 'utf-8')
  console.log(`  ✅ ${filename}`)
}

// ─── 1. 网站公告 ───
function convertAnnouncement() {
  console.log('📢 转换网站公告...')
  const file = path.join(CONTENT, 'settings', 'announcement.json')
  const data = readJSON(file)
  if (!data) return console.log('  ⚠️  公告文件不存在')

  writeDataFile('announcement.ts',
    `export interface SiteAnnouncement {
  visible: boolean
  text: string
  date: string
  link: string
}

export const siteAnnouncement: SiteAnnouncement = ${JSON.stringify(data, null, 2)}`
  )
}

// ─── 2. 同人活动 (覆写 src/data/events.ts) ───
function convertEvents() {
  console.log('🎉 转换同人活动...')
  const dir = path.join(CONTENT, 'events')
  if (!fs.existsSync(dir)) return

  const events = fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => readJSON(path.join(dir, f)))
    .filter(Boolean)

  if (events.length === 0) return console.log('  ⚠️  无活动数据')

  writeDataFile('events.ts',
    `export interface Event {
  icon: string
  date: string
  title: string
  desc: string
}

export const events: Event[] = ${JSON.stringify(events, null, 2)}`
  )
}

// ─── 3. VN 故事 (覆写 src/data/story.ts) ───
function convertStory() {
  console.log('📖 转换书灵志故事...')
  const dir = path.join(CONTENT, 'story')
  if (!fs.existsSync(dir)) return

  const lines = fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => readJSON(path.join(dir, f)))
    .filter(Boolean)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  if (lines.length === 0) return console.log('  ⚠️  无故事数据')

  writeDataFile('story.ts',
    `export interface StoryLine {
  speaker: string
  text: string
  options?: { label: string; next: number }[]
}

export const storyLines: StoryLine[] = ${JSON.stringify(
      lines.map(({ speaker, text, options }) => ({ speaker, text, ...(options ? { options } : {}) })),
      null, 2
    )}`
  )
}

// ─── 4. 每日动态 (覆写 src/data/journal.ts) ───
function convertJournal() {
  console.log('📔 转换每日动态...')
  const dir = path.join(CONTENT, 'journal')
  if (!fs.existsSync(dir)) return console.log('  ⚠️  无动态目录')

  const entries = fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => readJSON(path.join(dir, f)))
    .filter(Boolean)
    // 新的在前
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))

  if (entries.length === 0) return console.log('  ⚠️  无动态数据')

  writeDataFile('journal.ts',
    `export interface JournalItem {
  time: string
  text: string
  icon?: string
}

export interface JournalPhoto {
  src: string
  caption?: string
}

export interface JournalEntry {
  /** 日期 YYYY-MM-DD */
  date: string
  /** 星期，如 "周三" */
  weekday: string
  /** 当天标题 */
  title: string
  tags?: string[]
  /** 照片（可选，空数组则纯文字） */
  photos?: JournalPhoto[]
  /** 时间线 */
  timeline: JournalItem[]
  /** 收尾一段话（可选） */
  note?: string
}

export const journal: JournalEntry[] = ${JSON.stringify(entries, null, 2)}`
  )
}

// ─── 5. 陪玩价目表 (覆写 src/data/pricing.ts) ───
function convertPricing() {
  console.log('💰 转换陪玩价目表...')
  const data = readJSON(path.join(CONTENT, 'pricing.json'))
  if (!data) return console.log('  ⚠️  价目表文件不存在')

  writeDataFile('pricing.ts',
    `export interface PriceTier {
  /** 段位 / 档位名称 */
  label: string
  /** 段位对应的分数区间（可选），如 "2001 - 2200" */
  score?: string
  /** 价格（元） */
  price: number
}

export interface PackageOffer {
  label: string
  price: number
}

export interface PriceGame {
  name: string
  icon: string
  /** 计价单位，如 "局" / "小时" */
  unit: string
  /** 附加说明，如「自带双枪 + 过点卡」 */
  note?: string
  /** 分数列表头说明，如「分数为完美平台段位分」 */
  scoreNote?: string
  /** 包天等打包价（与档位分开显示） */
  packageOffer?: PackageOffer
  tiers: PriceTier[]
}

export interface SelfRankItem {
  platform: string
  rank: string
  rating: string
}

export interface SelfRankStat {
  label: string
  value: string
}

export interface SelfRank {
  label: string
  note?: string
  /** 历史最高战绩 */
  historyLabel?: string
  history: SelfRankItem[]
  /** 目前数据 */
  currentLabel?: string
  current?: SelfRankStat[]
}

export interface Pricing {
  /** 档位列标题，如 "客户段位" */
  tierLabel: string
  /** 常在线时段 */
  onlineHours?: string
  disclaimer: string
  /** 本人水平（价目表上方的背书） */
  selfRank?: SelfRank
  games: PriceGame[]
}

export const pricing: Pricing = ${JSON.stringify(data, null, 2)}`
  )
}

// ─── 6. 战绩相册 (覆写 src/data/stats.ts) ───
function convertStats() {
  console.log('📸 转换战绩相册...')
  const data = readJSON(path.join(CONTENT, 'stats.json'))
  if (!data) return console.log('  ⚠️  战绩数据文件不存在')

  writeDataFile('stats.ts',
    `export interface StatChip {
  label: string
  value: string
}

export interface StatShot {
  /** 截图日期 YYYY-MM-DD —— 必须写，否则过期后会被误读成"当前数据" */
  date: string
  /** 赛季，如 "2026 S4" */
  season?: string
  title: string
  /** 一句话说明 */
  caption?: string
  /** 图下标注的关键数字（不要超过 4 个） */
  stats?: StatChip[]
  /** 图片路径 */
  image: string
}

export interface StatAlbum {
  /** 平台名，如 "5E 平台" */
  platform: string
  /** 平台角标，如 "5E" / "PW" */
  icon: string
  items: StatShot[]
}

export interface StatsGallery {
  albums: StatAlbum[]
}

export const stats: StatsGallery = ${JSON.stringify(data, null, 2)}`
  )
}

// ─── 7. 项目文件树 (每个项目一个模块，按需加载) ───
//
// 不要把所有项目打成一个大文件：那样访问任何一个项目页都会加载全部文件树。
// 改成每个项目一个 .ts，由 ProjectDetailPage 用 import.meta.glob 按需拉取。
function convertFiles() {
  console.log('🌲 转换项目文件树...')
  const srcDir = path.join(CONTENT, 'files')
  const outDir = path.join(DATA, 'files')

  // 清掉旧的（避免删了项目还留着模块）
  if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true })
  fs.mkdirSync(outDir, { recursive: true })

  if (!fs.existsSync(srcDir)) {
    console.log('  ⚠️  无 files 目录')
    return
  }

  const projects = fs.readdirSync(srcDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ file: f, data: readJSON(path.join(srcDir, f)) }))
    .filter((x) => x.data)

  if (projects.length === 0) {
    console.log('  ⚠️  无文件树数据')
    return
  }

  const slugs = []
  for (const { file, data } of projects) {
    const slug = data.slug || path.basename(file, '.json')
    slugs.push(slug)
    // 兼容两种形状：单个 files 数组，或 sections 分组（一个项目多套代码库）
    const sections = Array.isArray(data.sections)
      ? data.sections
      : [
          {
            id: 'main',
            title: data.root || '项目文件',
            root: data.root || '',
            total: (data.files || []).length,
            files: data.files || [],
          },
        ]
    const normalized = { slug, sections }
    const ts = `/**
 * 由 scripts/convert-content.cjs 自动生成
 * 编辑请改 content/files/${file}
 */
import type { ProjectFiles } from './types'

const data: ProjectFiles = ${JSON.stringify(normalized, null, 2)}

export default data
`
    fs.writeFileSync(path.join(outDir, `${slug}.ts`), ts, 'utf-8')
    console.log(
      `  ✅ files/${slug}.ts（${sections.map((s) => `${s.title} ${s.total}`).join(' + ')}）`
    )
  }

  // 类型定义（单独一个文件，避免被 glob 当成项目数据）
  fs.writeFileSync(
    path.join(outDir, 'types.ts'),
    `export interface ProjectFile {
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
`,
    'utf-8'
  )

  // 有文件树的项目 slug 清单（给列表页/导航用，不含数据本体）
  fs.writeFileSync(
    path.join(outDir, 'manifest.ts'),
    `/** 有完整文件树的项目 slug（自动生成） */
export const fileTreeSlugs: string[] = ${JSON.stringify(slugs.sort(), null, 2)}
`,
    'utf-8'
  )
}

// ─── 8. 项目里程碑 (每个项目一个模块，按需加载) ───
function convertMilestones() {
  console.log('🧭 转换项目里程碑...')
  const srcDir = path.join(CONTENT, 'milestones')
  const outDir = path.join(DATA, 'milestones')

  if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true })
  fs.mkdirSync(outDir, { recursive: true })

  if (!fs.existsSync(srcDir)) {
    console.log('  ⚠️  无 milestones 目录')
    return
  }

  const items = fs.readdirSync(srcDir).filter((f) => f.endsWith('.json'))
  if (items.length === 0) {
    console.log('  ⚠️  无里程碑数据')
    return
  }

  for (const file of items) {
    const data = readJSON(path.join(srcDir, file))
    if (!data) continue
    const slug = data.slug || path.basename(file, '.json')
    const ts = `/**
 * 由 scripts/convert-content.cjs 自动生成
 * 数据来自 git tag，编辑请改 content/milestones/${file}
 */
import type { ProjectMilestones } from './types'

const data: ProjectMilestones = ${JSON.stringify(data, null, 2)}

export default data
`
    fs.writeFileSync(path.join(outDir, `${slug}.ts`), ts, 'utf-8')
    console.log(`  ✅ milestones/${slug}.ts（${data.items.length} 个里程碑）`)
  }

  fs.writeFileSync(
    path.join(outDir, 'types.ts'),
    `export interface Milestone {
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
`,
    'utf-8'
  )
}

// ─── 主流程 ───
function main() {
  console.log('\n🔧 Decap CMS → 璃幽宇宙 内容转换\n')
  ensureDir(DATA)

  convertAnnouncement()
  convertEvents()
  convertStory()
  convertJournal()
  convertPricing()
  convertStats()
  convertFiles()
  convertMilestones()

  console.log('\n✅ 转换完成！\n')
}

main()
