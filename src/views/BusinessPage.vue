<template>
  <div class="biz-page">
    <header class="biz-head">
      <h1 class="biz-title">个人业务</h1>
      <p class="biz-sub">现在只有一块：陪练。AI 那块还在想。</p>
    </header>

    <!-- Tab -->
    <div class="biz-tabs">
      <button
        v-for="t in tabs"
        :key="t.key"
        type="button"
        class="biz-tab"
        :class="{ 'is-active': tab === t.key }"
        @click="tab = t.key"
      >
        {{ t.label }}
      </button>
    </div>

    <!-- 陪练师 -->
    <section v-show="tab === 'peilian'" class="biz-panel">
      <p class="biz-p">
        会打，也会聊。报点清楚，不催单，不推销 —— 不在意你打得菜还是强，只在意这一局你开不开心。
      </p>
      <PricingTable />
    </section>

    <!-- 接单记录 -->
    <section v-show="tab === 'orders'" class="biz-panel">
      <OrdersPage />
    </section>

    <!-- 陪练须知 -->
    <section v-show="tab === 'guide'" class="biz-panel">
      <GuidePage />
    </section>

    <!-- AI 业务（占位） -->
    <section v-show="tab === 'ai'" class="biz-panel biz-panel--todo">
      <p class="biz-p biz-p--muted">（还没想好做什么。先留个位置。）</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PricingTable from '../components/PricingTable.vue'
import OrdersPage from './OrdersPage.vue'
import GuidePage from './GuidePage.vue'

const tabs = [
  { key: 'peilian', label: '陪练师' },
  { key: 'orders', label: '接单记录' },
  { key: 'guide', label: '陪练须知' },
  { key: 'ai', label: 'AI 业务' },
]

const tab = ref<string>('peilian')
</script>

<style scoped>
.biz-page {
  max-width: 980px;
  margin: 0 auto;
  padding: 96px 24px 120px;
}

.biz-head {
  text-align: center;
  margin-bottom: 24px;
}

.biz-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 10px;
}

.biz-sub {
  color: var(--liyou-text-muted);
  font-size: 0.9375rem;
}

/* ── Tab ── */
.biz-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
}

.biz-tab {
  padding: 6px 20px;
  border-radius: 999px;
  border: 1px solid rgba(139, 154, 171, 0.24);
  background: none;
  color: var(--liyou-text-muted);
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}

.biz-tab:hover {
  color: var(--liyou-text);
  border-color: rgba(0, 229, 192, 0.4);
}

.biz-tab.is-active {
  color: var(--liyou-cyan, #00e5c0);
  border-color: rgba(0, 229, 192, 0.55);
  background: rgba(0, 229, 192, 0.08);
}

.biz-panel--todo {
  opacity: 0.6;
}

.biz-p {
  margin: 0 0 22px;
  font-size: 0.9375rem;
  line-height: 1.85;
  color: var(--liyou-text-muted);
  text-align: center;
  max-width: 620px;
  margin-left: auto;
  margin-right: auto;
}

.biz-p--muted {
  font-style: italic;
}

/* 嵌套的子页面自带 padding / 标题，这里消掉重复 */
.biz-panel :deep(.ord-page),
.biz-panel :deep(.ord-head),
.biz-panel :deep(.guide-page) {
  padding-top: 0 !important;
}

.biz-panel :deep(.ord-head) {
  display: none;
}

@media (max-width: 640px) {
  .biz-page {
    padding: 80px 16px 96px;
  }
}
</style>
