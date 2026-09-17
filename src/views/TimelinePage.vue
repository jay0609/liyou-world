<template>
  <div class="tl-page">
    <!-- 头部 -->
    <header class="tl-head">
      <h1 class="tl-title">时间线</h1>
      <p class="tl-sub">
        我一直在做的事 —— <strong>开发</strong>和<strong>接单</strong>混在一条线上。
        从最近的往下看。
      </p>

      <!-- 图例 -->
      <div class="tl-legend">
        <span class="tl-leg"><span class="tl-ico dev">🔨</span>开发</span>
        <span class="tl-leg"><span class="tl-ico ord">💼</span>接单</span>
        <span class="tl-leg tl-count">{{ entries.length }} 条记录</span>
      </div>
    </header>

    <!-- 空状态 -->
    <div v-if="!entries.length" class="tl-empty">
      还没有记录。
    </div>

    <!-- 时间轴 -->
    <div v-else class="tl-body">
      <section v-for="g in groups" :key="g.key" class="tl-group">
        <h2 class="tl-month">{{ g.label }}</h2>

        <ul class="tl-list">
          <li v-for="e in g.items" :key="e.key" class="tl-item" :class="e.type">
            <span class="tl-dot" aria-hidden="true"></span>

            <span class="tl-date">{{ e.date.slice(5) }}</span>

            <span class="tl-badge">{{ e.type === 'dev' ? '🔨' : '💼' }}</span>

            <div class="tl-body-col">
              <p class="tl-line">
                <template v-if="e.type === 'dev'">
                  <RouterLink v-if="e.link" :to="e.link" class="tl-link">{{ e.title }}</RouterLink>
                  <span v-else class="tl-strong">{{ e.title }}</span>
                  <span v-if="e.status" class="tl-status">{{ e.status }}</span>
                </template>
                <template v-else>
                  <span class="tl-strong">{{ e.title }}</span>
                  <span v-if="e.detail" class="tl-detail">{{ e.detail }}</span>
                </template>
              </p>

              <p v-if="e.sub" class="tl-subline">{{ e.sub }}</p>

              <p v-if="e.quote" class="tl-quote">「{{ e.quote }}」</p>
            </div>

            <span v-if="e.repeat" class="tl-repeat">回头客</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { projects } from '../data/projects'
import { ORDERS } from '../data/orders'

interface Entry {
  key: string
  date: string
  type: 'dev' | 'order'
  title: string
  detail?: string
  sub?: string
  quote?: string
  repeat?: boolean
  status?: string
  link?: string
}

const MONTH_CN = ['', '1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月']

/** 项目里程碑 —— 用 Project.period */
const devEntries: Entry[] = projects
  .filter((p) => p.period?.start)
  .map((p) => ({
    key: `dev-${p.slug}`,
    date: p.period!.start,
    type: 'dev' as const,
    title: p.name,
    sub: p.period!.note || p.tagline,
    status: p.status,
    link: `/projects/${p.slug}`,
  }))

/** 接单记录 */
const orderEntries: Entry[] = ORDERS.map((o, i) => ({
  key: `ord-${i}-${o.date}`,
  date: o.date,
  type: 'order' as const,
  title: o.game,
  detail: o.detail,
  sub: o.tag,
  quote: o.quote,
  repeat: o.repeat,
}))

const entries = computed(() =>
  [...devEntries, ...orderEntries].sort((a, b) => b.date.localeCompare(a.date)),
)

/** 按月分组，月份从近到远 */
const groups = computed(() => {
  const map = new Map<string, Entry[]>()
  for (const e of entries.value) {
    const key = e.date.slice(0, 7)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(e)
  }
  return [...map.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, items]) => {
      const [y, m] = key.split('-')
      return { key, label: `${y} 年 ${MONTH_CN[Number(m)]}`, items }
    })
})
</script>

<style scoped>
.tl-page {
  max-width: 880px;
  margin: 0 auto;
  padding: 96px 24px 120px;
}

/* ── 头部 ── */
.tl-head {
  margin-bottom: 48px;
  text-align: center;
}

.tl-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.tl-sub {
  color: var(--liyou-text-muted);
  font-size: 0.9375rem;
  line-height: 1.8;
}

.tl-sub strong {
  color: var(--liyou-cyan);
  font-weight: 600;
}

.tl-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  font-size: 0.8125rem;
  color: var(--liyou-text-muted);
}

.tl-leg {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.tl-count {
  opacity: 0.6;
}

/* ── 空状态 ── */
.tl-empty {
  padding: 60px 0;
  text-align: center;
  color: var(--liyou-text-muted);
  font-size: 0.875rem;
}

/* ── 月份分组 ── */
.tl-group {
  margin-bottom: 44px;
}

.tl-month {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--liyou-text-muted);
  margin-bottom: 18px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(139, 154, 171, 0.16);
}

/* ── 条目 ── */
.tl-list {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}

/* 竖线 */
.tl-list::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: rgba(139, 154, 171, 0.18);
}

.tl-item {
  position: relative;
  display: grid;
  grid-template-columns: 16px 44px 24px 1fr;
  align-items: start;
  gap: 0 10px;
  padding: 10px 0;
}

.tl-dot {
  grid-column: 1;
  width: 11px;
  height: 11px;
  margin-top: 5px;
  margin-left: 0;
  border-radius: 50%;
  background: var(--liyou-text-muted);
  z-index: 1;
}

.tl-item.dev .tl-dot {
  background: var(--liyou-cyan, #00e5c0);
  box-shadow: 0 0 0 3px rgba(0, 229, 192, 0.12);
}

.tl-item.order .tl-dot {
  background: var(--liyou-pink);
  box-shadow: 0 0 0 3px rgba(232, 160, 180, 0.14);
}

.tl-date {
  grid-column: 2;
  font-family: var(--liyou-font-mono, ui-monospace, monospace);
  font-size: 0.8125rem;
  color: var(--liyou-text-muted);
  padding-top: 1px;
}

.tl-badge {
  grid-column: 3;
  font-size: 0.875rem;
  line-height: 1.4;
}

.tl-body-col {
  grid-column: 4;
  min-width: 0;
}

.tl-line {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--liyou-text);
  margin: 0;
}

.tl-strong {
  font-weight: 600;
}

.tl-link {
  font-weight: 600;
  color: var(--liyou-cyan, #00e5c0);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.tl-link:hover {
  border-bottom-color: currentColor;
}

.tl-status {
  display: inline-block;
  margin-left: 10px;
  padding: 1px 9px;
  border-radius: 999px;
  font-size: 0.6875rem;
  color: var(--liyou-text-muted);
  border: 1px solid rgba(139, 154, 171, 0.28);
  vertical-align: 1px;
}

.tl-detail {
  margin-left: 10px;
  font-family: var(--liyou-font-mono, ui-monospace, monospace);
  font-size: 0.8125rem;
  color: var(--liyou-text-muted);
}

.tl-subline {
  margin: 4px 0 0;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--liyou-text-muted);
  opacity: 0.85;
}

.tl-quote {
  margin: 6px 0 0;
  padding-left: 10px;
  border-left: 2px solid rgba(232, 160, 180, 0.4);
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--liyou-text-muted);
}

.tl-repeat {
  grid-column: 4;
  justify-self: start;
  margin-top: 7px;
  padding: 1px 9px;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--liyou-pink);
  border: 1px solid rgba(232, 160, 180, 0.45);
  background: rgba(232, 160, 180, 0.08);
}

@media (max-width: 640px) {
  .tl-page {
    padding: 80px 16px 96px;
  }

  .tl-item {
    grid-template-columns: 14px 40px 20px 1fr;
    gap: 0 6px;
  }

  .tl-line {
    font-size: 0.875rem;
  }
}
</style>
