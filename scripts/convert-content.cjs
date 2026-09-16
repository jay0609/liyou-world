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

  console.log('\n✅ 转换完成！\n')
}

main()
