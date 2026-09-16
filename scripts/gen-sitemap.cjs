/**
 * 生成 sitemap.xml
 *
 * 在 build 前运行，从路由表和项目数据里取页面，避免手写漏页。
 * 域名：SITE_URL（默认 https://liyou.world）
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const SITE_URL = (process.env.SITE_URL || 'https://liyou.world').replace(/\/$/, '')
const OUT = path.join(ROOT, 'public', 'sitemap.xml')

// 静态页面：[路径, changefreq, priority]
const STATIC_PAGES = [
  ['/', 'daily', '1.0'],
  ['/about', 'monthly', '0.8'],
  ['/guide', 'monthly', '0.9'],
  ['/projects', 'weekly', '0.8'],
  ['/journal', 'daily', '0.8'],
]

// 从 src/data/projects.ts 里抓 slug（避免为了构建去引 TS）
function projectSlugs() {
  const file = path.join(ROOT, 'src', 'data', 'projects.ts')
  if (!fs.existsSync(file)) return []
  const text = fs.readFileSync(file, 'utf-8')
  const slugs = []
  const re = /slug:\s*'([^']+)'/g
  let m
  while ((m = re.exec(text)) !== null) slugs.push(m[1])
  return slugs
}

// 璃幽 IP 的子页面（在路由表里是静态路径）
const EXTRA_PAGES = [
  ['/projects/liyou-mirage/lore', 'monthly', '0.5'],
  ['/projects/liyou-mirage/world-map', 'monthly', '0.5'],
]

function url(loc, changefreq, priority) {
  return `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

function main() {
  const entries = [...STATIC_PAGES]
  for (const slug of projectSlugs()) {
    entries.push([`/projects/${slug}`, 'weekly', slug === 'liyou-mirage' ? '0.7' : '0.6'])
  }
  entries.push(...EXTRA_PAGES)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(([l, c, p]) => url(l, c, p)).join('\n')}
</urlset>
`
  fs.writeFileSync(OUT, xml, 'utf-8')
  console.log(`  ✅ sitemap.xml（${entries.length} 个页面）`)
}

main()
