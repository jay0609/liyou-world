<template>
  <div class="ord-page">
    <!-- 头部 -->
    <header class="ord-head">
      <h1 class="ord-title">接单记录</h1>
      <p class="ord-sub">每一单都记在这儿，包括战绩。</p>
    </header>

    <!-- 今天的状态条 -->
    <div class="ord-today" :class="{ 'is-empty': !todayOrders.length }">
      <template v-if="todayOrders.length">
        <p class="ord-today-label">今天</p>
        <p class="ord-today-text">
          接了 <strong>{{ todayOrders.length }}</strong> 单，往下看详情。
        </p>
      </template>
      <template v-else>
        <p class="ord-today-label">今天</p>
        <p class="ord-today-text ord-today-invite">
          还没有人点单 —— <strong>快来成为第一个老板吧</strong>
        </p>
        <RouterLink to="/#play" class="ord-cta">看看价目表 →</RouterLink>
      </template>
    </div>

    <!-- 历史 -->
    <div v-if="!entries.length" class="ord-note">
      <p>这里还是空的 —— 第一单之后，它会一条一条长起来。</p>
      <RouterLink to="/#play" class="ord-cta">查看陪玩价目表 →</RouterLink>
    </div>

    <div v-else class="ord-body">
      <section v-for="g in groups" :key="g.key" class="ord-group">
        <h2 class="ord-month">{{ g.label }}</h2>

        <article v-for="o in g.items" :key="o.key" class="ord-card">
          <header class="ord-card-head">
            <span class="ord-date">{{ o.date.slice(5) }}</span>
            <span class="ord-game">{{ o.game }}</span>
            <span v-if="o.repeat" class="ord-repeat">回头客</span>
          </header>

          <p class="ord-detail">
            {{ o.detail }}
            <span v-if="o.tag" class="ord-tag">· {{ o.tag }}</span>
          </p>

          <p v-if="o.quote" class="ord-quote">「{{ o.quote }}」</p>

          <div v-if="o.images?.length" class="ord-shots">
            <button
              v-for="(src, i) in o.images"
              :key="i"
              type="button"
              class="ord-shot"
              @click="open(src)"
            >
              <img :src="src" :alt="`战绩截图 ${i + 1}`" loading="lazy" />
            </button>
          </div>
        </article>
      </section>
    </div>

    <!-- 灯箱 -->
    <Teleport to="body">
      <div v-if="lightbox" class="ord-lb" @click="lightbox = ''">
        <img :src="lightbox" alt="战绩截图" />
        <button type="button" class="ord-lb-close" aria-label="关闭" @click="lightbox = ''">✕</button>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ORDERS, type OrderRecord } from '../data/orders'

interface Entry extends OrderRecord {
  key: string
}

const MONTH_CN = ['', '1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月']

const lightbox = ref('')
const open = (src: string) => {
  lightbox.value = src
}

/** 本地日期 YYYY-MM-DD（不用 toISOString，它按 UTC 会差一天） */
const today = (() => {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
})()

const entries = computed<Entry[]>(() =>
  ORDERS.map((o, i) => ({ ...o, key: `${o.date}-${i}` })).sort((a, b) => b.date.localeCompare(a.date)),
)

const todayOrders = computed(() => entries.value.filter((e) => e.date === today))

/** 按月分组，从近到远 */
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
.ord-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 96px 24px 120px;
}

/* ── 头部 ── */
.ord-head {
  text-align: center;
  margin-bottom: 32px;
}

.ord-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 10px;
}

.ord-sub {
  color: var(--liyou-text-muted);
  font-size: 0.9375rem;
}

/* ── 今天的状态条 ── */
.ord-today {
  padding: 20px 24px;
  border-radius: 14px;
  margin-bottom: 44px;
  background: rgba(0, 229, 192, 0.06);
  border: 1px solid rgba(0, 229, 192, 0.22);
}

.ord-today.is-empty {
  background: rgba(232, 160, 180, 0.06);
  border-color: rgba(232, 160, 180, 0.26);
}

.ord-today-label {
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--liyou-text-muted);
  margin: 0 0 6px;
}

.ord-today-text {
  font-size: 1rem;
  line-height: 1.7;
  margin: 0;
}

.ord-today-text strong {
  color: var(--liyou-pink);
  font-weight: 700;
}

.ord-cta {
  display: inline-block;
  margin-top: 14px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--liyou-cyan, #00e5c0);
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 229, 192, 0.4);
  padding-bottom: 1px;
  transition: border-color 0.2s;
}

.ord-cta:hover {
  border-bottom-color: currentColor;
}

/* ── 空态 ── */
.ord-note {
  padding: 48px 0;
  text-align: center;
  color: var(--liyou-text-muted);
  font-size: 0.9375rem;
  line-height: 1.9;
}

/* ── 月份 ── */
.ord-group {
  margin-bottom: 40px;
}

.ord-month {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--liyou-text-muted);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(139, 154, 171, 0.16);
}

/* ── 单条卡片 ── */
.ord-card {
  padding: 16px 18px;
  border-radius: 12px;
  margin-bottom: 12px;
  background: rgba(19, 25, 32, 0.55);
  border: 1px solid rgba(139, 154, 171, 0.14);
}

.ord-card-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.ord-date {
  font-family: var(--liyou-font-mono, ui-monospace, monospace);
  font-size: 0.8125rem;
  color: var(--liyou-text-muted);
}

.ord-game {
  font-size: 0.9375rem;
  font-weight: 600;
}

.ord-repeat {
  margin-left: auto;
  padding: 1px 10px;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--liyou-pink);
  border: 1px solid rgba(232, 160, 180, 0.45);
  background: rgba(232, 160, 180, 0.08);
}

.ord-detail {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.7;
  color: var(--liyou-text-muted);
}

.ord-tag {
  opacity: 0.75;
}

.ord-quote {
  margin: 8px 0 0;
  padding-left: 10px;
  border-left: 2px solid rgba(232, 160, 180, 0.4);
  font-size: 0.8125rem;
  line-height: 1.75;
  color: var(--liyou-text-muted);
}

/* ── 战绩截图 ── */
.ord-shots {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
  margin-top: 12px;
}

.ord-shot {
  padding: 0;
  border: 1px solid rgba(139, 154, 171, 0.18);
  border-radius: 8px;
  overflow: hidden;
  background: none;
  cursor: zoom-in;
  transition: border-color 0.2s, transform 0.2s;
}

.ord-shot:hover {
  border-color: rgba(0, 229, 192, 0.45);
  transform: translateY(-2px);
}

.ord-shot img {
  display: block;
  width: 100%;
  height: auto;
}

/* ── 灯箱 ── */
.ord-lb {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: rgba(4, 8, 12, 0.92);
  cursor: zoom-out;
}

.ord-lb img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}

.ord-lb-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(139, 154, 171, 0.35);
  background: rgba(19, 25, 32, 0.9);
  color: var(--liyou-text);
  font-size: 1rem;
  cursor: pointer;
}

@media (max-width: 640px) {
  .ord-page {
    padding: 80px 16px 96px;
  }

  .ord-today {
    padding: 16px 18px;
  }
}
</style>
