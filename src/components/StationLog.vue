<template>
  <div class="sl-wrap">
    <p v-if="!entries.length" class="sl-empty">还没有记录。</p>

    <div v-else class="sl-list">
      <article v-for="e in entries" :key="e.date" class="sl-item">
        <div class="sl-date">
          <span class="sl-day">{{ e.date.slice(5) }}</span>
          <span class="sl-year">{{ e.date.slice(0, 4) }}</span>
        </div>

        <div class="sl-body">
          <p v-if="e.title" class="sl-title">{{ e.title }}</p>
          <ul class="sl-ul">
            <li v-for="(it, i) in e.items" :key="i">{{ it }}</li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 站记 —— 这个网站改了什么（时间轴）
 *
 * 只记「网站本身的变更」。
 * 每天在干嘛 → 看「动态」。这里只有：这个站今天改了什么。
 */
interface StationEntry {
  date: string
  title?: string
  items: string[]
}

const RAW: StationEntry[] = [
  {
    date: '2026-09-19',
    title: '信息架构重构',
    items: [
      '新增「思考」栏目 —— 放推演类长文',
      '新增「记录」栏目 —— 动态 / 站记 两个 Tab',
      '「陪玩」改名为「个人业务」，里面用 Tab 分四块：陪练师 / 接单记录 / 陪练须知 / AI 业务',
      '三条旧链接做了重定向：/guide 和 /orders → /business，/journal → /records',
      '写了 ARCHITECTURE.md（文件树 / 模块 / 数据流 / 三条硬规则）',
    ],
  },
  {
    date: '2026-09-18',
    title: '接单记录加了战绩截图',
    items: [
      '接单卡片改成左右布局：左边文字，右边战绩截图框',
      '截图框支持多张：左右箭头切换 + 计数',
      '点图放大，灯箱里也能左右切换（循环）',
      '窄屏时截图自动放到文字下面',
      '加了第二条接单记录',
    ],
  },
  {
    date: '2026-09-17',
    title: '接单记录页上线',
    items: [
      '新增「接单记录」页 —— 只放接单，不放日常',
      '顶部加了「今天」状态条：没单时显示"还没有人点单"',
      '导航加上「接单记录」',
      '把 09-16 的动态重写并发布（84 条，从起床到睡觉）',
      '接入百度统计（含 CSP 放行和 SPA 路由上报）',
      '接入 Vercel Analytics',
      '删掉 keywords 里含「代打」的词（零收益 + 违规风险）',
    ],
  },
  {
    date: '2026-09-16',
    title: '网站上线',
    items: [
      '9 个项目全部整理进站，917 个文件有逐条说明',
      '全站换肤：璃幽粉 → 深色硬核技术风',
      '修了一个路由缓存 bug（首页被缓存成 404 页）',
      '战绩相册（15 张）+ 陪练价目表 + 战绩背书条',
      '时间线视图 + 项目状态（已完成 / 完善中 / 弃坑中，每条写原因）',
      '换域名 liyou.world → cs2npc.cn',
      '20:00 正式上线',
    ],
  },
]

const entries = [...RAW].sort((a, b) => b.date.localeCompare(a.date))
</script>

<style scoped>
.sl-wrap {
  max-width: 720px;
  margin: 0 auto;
}

.sl-empty {
  padding: 60px 0;
  text-align: center;
  color: var(--liyou-text-muted);
  font-size: 0.875rem;
}

/* ── 时间轴 ── */
.sl-list {
  position: relative;
  padding-left: 8px;
}

.sl-list::before {
  content: '';
  position: absolute;
  left: 69px;
  top: 10px;
  bottom: 10px;
  width: 1px;
  background: rgba(139, 154, 171, 0.18);
}

.sl-item {
  display: grid;
  grid-template-columns: 62px 1fr;
  gap: 0 24px;
  padding: 14px 0;
}

.sl-date {
  position: relative;
  text-align: right;
  padding-top: 1px;
}

.sl-date::after {
  content: '';
  position: absolute;
  right: -16px;
  top: 7px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--liyou-cyan, #00e5c0);
  box-shadow: 0 0 0 3px rgba(0, 229, 192, 0.12);
}

.sl-day {
  display: block;
  font-family: var(--liyou-font-mono, ui-monospace, monospace);
  font-size: 0.875rem;
  color: var(--liyou-text);
}

.sl-year {
  display: block;
  font-size: 0.6875rem;
  color: var(--liyou-text-muted);
  opacity: 0.6;
}

.sl-title {
  margin: 0 0 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--liyou-text);
}

.sl-ul {
  margin: 0;
  padding-left: 17px;
  list-style: disc;
}

.sl-ul li {
  font-size: 0.8125rem;
  line-height: 1.85;
  color: var(--liyou-text-muted);
  margin-bottom: 3px;
}

.sl-ul li::marker {
  color: rgba(0, 229, 192, 0.55);
}

@media (max-width: 640px) {
  .sl-item {
    grid-template-columns: 50px 1fr;
    gap: 0 16px;
  }

  .sl-list::before {
    left: 57px;
  }
}
</style>
