<template>
  <div v-if="data.items.length" class="ms">
    <!-- 概览 -->
    <div class="ms-summary">
      <span class="ms-num">{{ data.totalTags }}</span>
      <span class="ms-label">个里程碑 tag</span>
      <span class="ms-sep">·</span>
      <span class="ms-num">{{ data.totalCommits }}</span>
      <span class="ms-label">次提交</span>
      <span v-if="testRange" class="ms-sep">·</span>
      <span v-if="testRange" class="ms-grow">
        测试 <b>{{ testRange[0] }}</b> → <b>{{ testRange[1] }}</b>
      </span>
    </div>

    <!-- 时间线 -->
    <ol class="ms-list">
      <li v-for="(m, i) in data.items" :key="m.tag" class="ms-item">
        <div class="ms-rail">
          <span class="ms-dot" :class="{ 'is-first': i === 0 }"></span>
        </div>
        <div class="ms-body">
          <div class="ms-head">
            <time class="ms-date">{{ m.date }}</time>
            <span class="ms-tag">{{ m.tag }}</span>
            <span v-if="m.tests" class="ms-tests" :title="`该里程碑的自动化测试数量：${m.tests} 项`">
              {{ m.tests }} 项测试
            </span>
            <span v-else-if="m.size" class="ms-tests" :title="`构建产物大小：${m.size} 字节`">
              {{ Math.round(m.size / 1024) }} KB
            </span>
          </div>
          <p class="ms-desc">{{ m.desc }}</p>
        </div>
      </li>
    </ol>

    <p class="ms-foot">
      {{ data.source || '数据来自项目的 git tag —— 每个里程碑验收通过后才打，不是事后补的。' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectMilestones } from '../data/milestones/types'

const props = defineProps<{ data: ProjectMilestones }>()

const testRange = computed<[number, number] | null>(() => {
  const nums = props.data.items.map((m) => m.tests).filter((n): n is number => typeof n === 'number')
  if (nums.length < 2) return null
  return [nums[0], nums[nums.length - 1]]
})
</script>

<style scoped>
/* 概览 */
.ms-summary {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 7px;
  padding: 14px 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background: rgba(19, 25, 32, 0.7);
  border: 1px solid rgba(139, 154, 171, 0.18);
  font-size: 0.8125rem;
  color: var(--liyou-text-muted);
}
.ms-num {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--liyou-pink);
}
.ms-label { margin-right: 6px; }
.ms-sep { color: rgba(139, 154, 171, 0.4); }
.ms-grow {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  color: var(--liyou-text-secondary);
}
.ms-grow b { color: var(--liyou-glow-gold); }

/* 时间线 */
.ms-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.ms-item {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 14px;
}
.ms-rail {
  position: relative;
  display: flex;
  justify-content: center;
}
.ms-rail::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(0, 229, 192, 0.22);
}
.ms-item:first-child .ms-rail::before { top: 8px; }
.ms-item:last-child .ms-rail::before { bottom: calc(100% - 9px); }
.ms-dot {
  position: relative;
  z-index: 1;
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 50%;
  background: var(--liyou-pink);
  box-shadow: 0 0 0 3px rgba(0, 229, 192, 0.14);
}

.ms-body {
  padding-bottom: 18px;
  min-width: 0;
}
.ms-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 9px;
}
.ms-date {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.75rem;
  color: var(--liyou-text-muted);
}
.ms-tag {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 1px 8px;
  border-radius: 5px;
  color: var(--liyou-pink);
  background: rgba(0, 229, 192, 0.1);
  border: 1px solid rgba(0, 229, 192, 0.25);
}
.ms-tests {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.6875rem;
  padding: 1px 8px;
  border-radius: 999px;
  color: var(--liyou-glow-gold);
  background: rgba(255, 180, 84, 0.1);
  border: 1px solid rgba(255, 180, 84, 0.28);
  cursor: help;
}
.ms-desc {
  margin: 5px 0 0;
  font-size: 0.875rem;
  line-height: 1.7;
  color: var(--liyou-text-secondary);
}

.ms-foot {
  margin: 4px 0 0;
  padding-top: 14px;
  border-top: 1px solid rgba(139, 154, 171, 0.12);
  font-size: 0.75rem;
  color: var(--liyou-text-muted);
}

@media (max-width: 640px) {
  .ms-item { gap: 10px; }
  .ms-desc { font-size: 0.8125rem; }
}
</style>
