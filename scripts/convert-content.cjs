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

// ─── 主流程 ───
function main() {
  console.log('\n🔧 Decap CMS → 璃幽宇宙 内容转换\n')
  ensureDir(DATA)

  convertAnnouncement()
  convertEvents()
  convertStory()

  console.log('\n✅ 转换完成！\n')
}

main()
