<template>
  <div class="pt-24 pb-4xl px-lg">
    <div class="max-w-content mx-auto">
      <div class="text-center mb-3xl">
        <GradientText size="xl">我的项目</GradientText>
        <p class="text-body-lg text-liyou-text-secondary mt-md">
          每个项目背后都有一个概念和一份理念——点进去能看到逐文件的架构。
        </p>
      </div>

      <!-- 视图切换 -->
      <div class="view-tabs">
        <button
          class="view-tab"
          :class="{ 'is-active': view === 'timeline' }"
          type="button"
          @click="view = 'timeline'"
        >🕒 时间线</button>
        <button
          class="view-tab"
          :class="{ 'is-active': view === 'grid' }"
          type="button"
          @click="view = 'grid'"
        >▦ 卡片</button>
      </div>

      <ProjectTimeline v-if="view === 'timeline'" />

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
        <ProjectCard v-for="p in sorted" :key="p.slug" :project="p" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import GradientText from '../components/GradientText.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ProjectTimeline from '../components/ProjectTimeline.vue'
import { projects } from '../data/projects'

/** 默认时间线 —— 卡片是清单，时间线才是演进 */
const view = ref<'timeline' | 'grid'>('timeline')

/** 卡片视图按时间倒序（新的在前） */
const sorted = computed(() =>
  [...projects].sort((a, b) => {
    const av = a.period?.start ?? ''
    const bv = b.period?.start ?? ''
    return bv.localeCompare(av)
  })
)
</script>

<style scoped>
.view-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 28px;
}
.view-tab {
  padding: 7px 18px;
  border-radius: 999px;
  font-size: 0.8125rem;
  cursor: pointer;
  color: var(--liyou-text-secondary);
  background: rgba(19, 25, 32, 0.7);
  border: 1px solid rgba(139, 154, 171, 0.2);
  transition: all 0.2s ease;
}
.view-tab:hover { border-color: rgba(0, 229, 192, 0.45); color: var(--liyou-pink); }
.view-tab.is-active {
  color: #06120f;
  background: var(--liyou-pink);
  border-color: var(--liyou-pink);
}
</style>
