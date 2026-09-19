<template>
  <div class="rec-page">
    <header class="rec-head">
      <h1 class="rec-title">记录</h1>
      <p class="rec-sub">每天在干嘛，和这个站改了什么。</p>
    </header>

    <div class="rec-tabs">
      <button
        v-for="t in tabs"
        :key="t.key"
        type="button"
        class="rec-tab"
        :class="{ 'is-active': tab === t.key }"
        @click="tab = t.key"
      >
        {{ t.label }}
      </button>
    </div>

    <div v-show="tab === 'journal'">
      <JournalPage />
    </div>

    <div v-show="tab === 'station'">
      <ThoughtsPage :only="'站记'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import JournalPage from './JournalPage.vue'
import ThoughtsPage from './ThoughtsPage.vue'

const tabs = [
  { key: 'journal', label: '动态' },
  { key: 'station', label: '站记' },
]

const tab = ref<string>('journal')
</script>

<style scoped>
.rec-page {
  padding: 96px 24px 120px;
}

.rec-head {
  text-align: center;
  margin-bottom: 24px;
}

.rec-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 10px;
}

.rec-sub {
  color: var(--liyou-text-muted);
  font-size: 0.9375rem;
}

.rec-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 32px;
}

.rec-tab {
  padding: 6px 22px;
  border-radius: 999px;
  border: 1px solid rgba(139, 154, 171, 0.24);
  background: none;
  color: var(--liyou-text-muted);
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}

.rec-tab:hover {
  color: var(--liyou-text);
  border-color: rgba(0, 229, 192, 0.4);
}

.rec-tab.is-active {
  color: var(--liyou-cyan, #00e5c0);
  border-color: rgba(0, 229, 192, 0.55);
  background: rgba(0, 229, 192, 0.08);
}

/* 子页面自带 padding，消掉 */
.rec-page :deep(.pt-24),
.rec-page :deep(.th-page) {
  padding-top: 0;
}
</style>
