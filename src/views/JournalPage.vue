<template>
  <div class="pt-24 pb-4xl px-lg">
    <div class="max-w-content mx-auto">
      <!-- 标题 -->
      <div class="text-center mb-3xl">
        <GradientText size="xl">每日动态</GradientText>
        <p class="text-body-lg text-liyou-text-secondary mt-md">
          每天记一次——做了什么、练了什么、学了什么。
        </p>
      </div>

      <!-- 记录统计（连续天数是最强的动力装置） -->
      <div class="journal-stats">
        <div class="stat" :class="{ 'stat--hot': streak > 0 }">
          <span class="stat-value">🔥 {{ streak }}</span>
          <span class="stat-label">连续记录 · 天</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ totalDays }}</span>
          <span class="stat-label">累计记录 · 天</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ monthDays }}</span>
          <span class="stat-label">本月 · 天</span>
        </div>
      </div>

      <!-- 翻页：一次只显示一天，默认最新 -->
      <div v-if="allDates.length > 1" class="journal-filter journal-nav">
        <button class="filter-chip nav-arrow" :disabled="!canOlder" @click="goOlder">
          ← 更早
        </button>

        <span class="filter-chip is-active nav-current">
          {{ activeDate.slice(5) }}
          <span v-if="currentEntry?.weekday" class="nav-weekday">{{ currentEntry.weekday }}</span>
          <span class="nav-index">{{ idx + 1 }} / {{ allDates.length }}</span>
        </span>

        <button class="filter-chip nav-arrow" :disabled="!canNewer" @click="goNewer">
          更近 →
        </button>
      </div>

      <!-- 列表 -->
      <div class="journal-list">
        <JournalCard v-for="e in shown" :key="e.date" :entry="e" />
      </div>

      <p v-if="!shown.length" class="journal-empty">还没有记录。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import GradientText from '../components/GradientText.vue'
import JournalCard from '../components/JournalCard.vue'
import { journal } from '../data/journal'

/** 去重后的记录日期，新的在前 */
const allDates = computed(() => [...new Set(journal.map((e) => e.date))].sort().reverse())

/**
 * 当前显示的日期。
 * 默认显示最新的一天 —— 主动态点进来，永远看到的是最近那条记录。
 */
const activeDate = ref(allDates.value[0] ?? '')

const shown = computed(() => journal.filter((e) => e.date === activeDate.value))

const currentEntry = computed(() => shown.value[0])

/** 0 = 最新。索引越大越早 */
const idx = computed(() => Math.max(0, allDates.value.indexOf(activeDate.value)))

const canNewer = computed(() => idx.value > 0)
const canOlder = computed(() => idx.value < allDates.value.length - 1)

function goNewer() {
  if (canNewer.value) activeDate.value = allDates.value[idx.value - 1]
}

function goOlder() {
  if (canOlder.value) activeDate.value = allDates.value[idx.value + 1]
}

/** 本地日期 → YYYY-MM-DD（不要用 toISOString，它按 UTC 会差一天） */
function toDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function daysBetween(a: string, b: string) {
  return Math.round((Date.parse(`${b}T00:00:00`) - Date.parse(`${a}T00:00:00`)) / 86400000)
}

const totalDays = computed(() => allDates.value.length)

/**
 * 连续记录天数。
 * 规则：最新一条必须落在今天或昨天，否则视为已断（隔了两天以上就不算连续）。
 */
const streak = computed(() => {
  const ds = allDates.value
  if (!ds.length) return 0
  if (daysBetween(ds[0], toDateStr(new Date())) > 1) return 0
  let n = 1
  for (let i = 1; i < ds.length; i++) {
    if (daysBetween(ds[i], ds[i - 1]) === 1) n++
    else break
  }
  return n
})

const monthDays = computed(() => {
  const prefix = toDateStr(new Date()).slice(0, 7)
  return allDates.value.filter((d) => d.startsWith(prefix)).length
})
</script>

<style scoped>
/* 记录统计 */
.journal-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 26px;
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 104px;
  padding: 12px 18px;
  border-radius: 10px;
  background: rgba(19, 25, 32, 0.7);
  border: 1px solid rgba(139, 154, 171, 0.18);
}
.stat--hot {
  border-color: rgba(255, 180, 84, 0.45);
  background: rgba(255, 180, 84, 0.08);
}
.stat-value {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--liyou-pink);
}
.stat--hot .stat-value { color: var(--liyou-glow-gold); }
.stat-label {
  font-size: 0.6875rem;
  color: var(--liyou-text-muted);
}

.journal-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 28px;
}
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 14px;
  font-size: 0.8125rem;
  border-radius: 999px;
  cursor: pointer;
  color: var(--liyou-text-secondary, #9BA9B8);
  background: rgba(19, 25, 32, 0.6);
  border: 1px solid rgba(0, 229, 192, 0.25);
  transition: all 0.2s ease;
}
.filter-chip:hover {
  border-color: rgba(0, 229, 192, 0.55);
  color: #00E5C0;
}
.filter-chip.is-active {
  color: #06120F;
  background: #00E5C0;
  border-color: #00E5C0;
}
.filter-count {
  font-size: 0.6875rem;
  opacity: 0.75;
}

.journal-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 760px;
  margin: 0 auto;
}

.journal-empty {
  text-align: center;
  padding: 64px 0;
  color: var(--liyou-text-muted, #9a93a8);
}
/* ── 翻页条 ── */
.journal-nav {
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-current {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: default;
}

.nav-weekday {
  opacity: 0.7;
  font-size: 0.8125rem;
}

.nav-index {
  opacity: 0.55;
  font-size: 0.75rem;
  font-family: var(--liyou-font-mono, ui-monospace, monospace);
}
</style>
