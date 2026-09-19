<template>
  <div class="th-page">
    <header class="th-head">
      <h1 class="th-title">思考</h1>
      <p class="th-sub">
        想写就写，不追求篇数。大多是跟 AI 来回推出来的东西。
      </p>
    </header>

    <!-- 分类 -->
    <div v-if="!only" class="th-tabs">
      <button
        v-for="c in cats"
        :key="c"
        type="button"
        class="th-tab"
        :class="{ 'is-active': cat === c }"
        @click="cat = c"
      >
        {{ c }}
      </button>
    </div>
    <div v-if="!THOUGHTS.length" class="th-empty">还没有。</div>

    <div v-else class="th-list">
      <article v-for="(t, i) in filtered" :id="`t-${i}`" :key="t.date + t.title" class="th-item">
        <header class="th-item-head">
          <span class="th-date">{{ t.date }}</span>
          <h2 class="th-item-title">{{ t.title }}</h2>
        </header>

        <p class="th-summary">{{ t.summary }}</p>

        <div v-if="t.tags?.length" class="th-tags">
          <span v-for="tag in t.tags" :key="tag" class="th-tag">{{ tag }}</span>
        </div>

        <button type="button" class="th-toggle" @click="toggle(t.date + t.title)">
          {{ open.has(t.date + t.title) ? '收起 −' : '展开全文 +' }}
        </button>

        <div v-if="open.has(t.date + t.title)" class="th-body">
          <section v-for="(b, bi) in t.blocks" :key="bi" class="th-block">
            <h3 v-if="b.h" class="th-h">{{ b.h }}</h3>
            <p v-if="b.p" class="th-p">{{ b.p }}</p>
            <ul v-if="b.list?.length" class="th-ul">
              <li v-for="(li, li2) in b.list" :key="li2">{{ li }}</li>
            </ul>
          </section>
        </div>

        <div v-if="open.has(t.date + t.title) && t.next?.length" class="th-next">
          <p class="th-next-label">下一步</p>
          <ul class="th-next-ul">
            <li v-for="(n, ni) in t.next" :key="ni">{{ n }}</li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { THOUGHTS } from '../data/thoughts'

const props = defineProps<{ only?: string }>()

const open = reactive(new Set<string>())

/** 分类筛选 */
const cat = ref('全部')
const cats = ['全部', '推演', '站记']

const sorted = computed(() => [...THOUGHTS].sort((a, b) => b.date.localeCompare(a.date)))

const base = computed(() =>
  props.only ? sorted.value.filter((t) => t.category === props.only) : sorted.value,
)
const filtered = computed(() => (cat.value === '全部' ? base.value : base.value.filter((t) => t.category === cat.value)))

function toggle(key: string) {
  if (open.has(key)) open.delete(key)
  else open.add(key)
}
</script>

<style scoped>
.th-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 96px 24px 120px;
}

.th-head {
  text-align: center;
  margin-bottom: 48px;
}

.th-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 10px;
}

.th-sub {
  color: var(--liyou-text-muted);
  font-size: 0.9375rem;
  line-height: 1.8;
}

/* ── 分类 ── */
.th-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
}

.th-tab {
  padding: 5px 16px;
  border-radius: 999px;
  border: 1px solid rgba(139, 154, 171, 0.24);
  background: none;
  color: var(--liyou-text-muted);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}

.th-tab:hover {
  color: var(--liyou-text);
  border-color: rgba(0, 229, 192, 0.4);
}

.th-tab.is-active {
  color: var(--liyou-cyan, #00e5c0);
  border-color: rgba(0, 229, 192, 0.55);
  background: rgba(0, 229, 192, 0.08);
}

/* ── 下一步 ── */
.th-next {
  margin-top: 20px;
  padding: 14px 16px;
  border-radius: 10px;
  background: rgba(0, 229, 192, 0.05);
  border-left: 3px solid rgba(0, 229, 192, 0.4);
}

.th-next-label {
  margin: 0 0 8px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--liyou-cyan, #00e5c0);
}

.th-next-ul {
  margin: 0;
  padding-left: 18px;
  list-style: disc;
}

.th-next-ul li {
  font-size: 0.8125rem;
  line-height: 1.8;
  color: var(--liyou-text-muted);
}

.th-next-ul li::marker {
  color: rgba(0, 229, 192, 0.6);
}

.th-empty {
  padding: 60px 0;
  text-align: center;
  color: var(--liyou-text-muted);
  font-size: 0.875rem;
}

.th-item {
  padding: 22px 24px;
  border-radius: 14px;
  margin-bottom: 16px;
  background: rgba(19, 25, 32, 0.55);
  border: 1px solid rgba(139, 154, 171, 0.14);
}

.th-item-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 10px;
}

.th-date {
  font-family: var(--liyou-font-mono, ui-monospace, monospace);
  font-size: 0.8125rem;
  color: var(--liyou-text-muted);
}

.th-item-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.th-summary {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.8;
  color: var(--liyou-text-muted);
}

.th-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.th-tag {
  padding: 1px 10px;
  border-radius: 999px;
  font-size: 0.6875rem;
  color: var(--liyou-text-muted);
  border: 1px solid rgba(139, 154, 171, 0.26);
}

.th-toggle {
  margin-top: 14px;
  padding: 0;
  border: none;
  background: none;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--liyou-cyan, #00e5c0);
  cursor: pointer;
}

.th-toggle:hover {
  text-decoration: underline;
}

/* ── 正文 ── */
.th-body {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(139, 154, 171, 0.16);
}

.th-block {
  margin-bottom: 22px;
}

.th-block:last-child {
  margin-bottom: 0;
}

.th-h {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--liyou-text);
  margin: 0 0 10px;
}

.th-p {
  margin: 0 0 10px;
  font-size: 0.875rem;
  line-height: 1.85;
  color: var(--liyou-text-muted);
}

.th-ul {
  margin: 0;
  padding-left: 18px;
  list-style: disc;
}

.th-ul li {
  font-size: 0.875rem;
  line-height: 1.85;
  color: var(--liyou-text-muted);
  margin-bottom: 6px;
}

.th-ul li::marker {
  color: rgba(0, 229, 192, 0.6);
}

@media (max-width: 640px) {
  .th-page {
    padding: 80px 16px 96px;
  }

  .th-item {
    padding: 18px;
  }
}
</style>
