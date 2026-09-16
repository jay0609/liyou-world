<template>
  <router-link
    :to="`/projects/${project.slug}`"
    class="project-card glass-card flex flex-col gap-sm p-lg cursor-pointer no-underline group relative overflow-hidden"
  >
    <div class="flex items-start justify-between gap-sm">
      <span class="text-3xl group-hover:scale-110 transition-transform duration-300">{{ project.icon }}</span>
      <span
        class="text-caption px-sm py-xs rounded-full whitespace-nowrap"
        :class="statusClass"
      >{{ project.status }}</span>
    </div>
    <h3 class="text-heading-md text-liyou-text-primary font-heading group-hover:text-liyou-pink transition-colors duration-200">
      {{ project.name }}
    </h3>
    <p class="text-body-sm text-liyou-text-secondary">{{ project.tagline }}</p>
    <span class="text-caption text-liyou-text-muted/60 mt-auto">{{ project.category }}</span>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../data/projects'

const props = defineProps<{ project: Project }>()

const statusClass = computed(() => {
  const map: Record<string, string> = {
    已发布: 'bg-liyou-glow-gold/15 text-liyou-glow-gold',
    先行版: 'bg-liyou-pink/15 text-liyou-pink',
    开发中: 'bg-liyou-light-purple/15 text-liyou-light-purple',
    规划中: 'bg-liyou-deep-indigo-soft/15 text-liyou-text-muted',
  }
  return map[props.project.status] || map['开发中']
})
</script>

<style scoped>
.project-card {
  min-height: 160px;
}
.project-card:hover {
  box-shadow: 0 8px 40px rgba(14, 20, 27, 0.1), 0 0 20px rgba(0, 229, 192, 0.1);
  border-color: rgba(0, 229, 192, 0.35);
}
</style>
