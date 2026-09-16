<template>
  <div class="pt-24 pb-4xl px-lg">
    <div class="max-w-content mx-auto">
      <div class="text-center mb-3xl">
        <GradientText size="xl">我的项目</GradientText>
        <p class="text-body-lg text-liyou-text-secondary mt-md">每个项目背后都有一个概念和一份理念——点击进入查看。</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
        <ProjectCard v-for="p in projects" :key="p.slug" :project="p" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GradientText from '../components/GradientText.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects'
</script>
