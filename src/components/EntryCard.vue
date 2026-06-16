<template>
  <router-link :to="to" class="entry-card glass-card flex flex-col items-center justify-center gap-xs p-md lg:p-lg cursor-pointer no-underline group relative overflow-hidden">
    <!-- 手绘风装饰角 -->
    <span class="absolute top-2 left-2 text-xs opacity-0 group-hover:opacity-30 transition-opacity duration-500 text-liyou-pink">◌</span>
    <span class="absolute top-2 right-2 text-xs opacity-0 group-hover:opacity-30 transition-opacity duration-500 text-liyou-pink">◌</span>
    <span class="absolute bottom-2 left-2 text-xs opacity-0 group-hover:opacity-30 transition-opacity duration-500 text-liyou-pink">◌</span>
    <span class="absolute bottom-2 right-2 text-xs opacity-0 group-hover:opacity-30 transition-opacity duration-500 text-liyou-pink">◌</span>

    <!-- 图标 -->
    <span class="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">{{ icon }}</span>

    <!-- 标题 -->
    <span class="text-body-sm sm:text-body-md font-semibold text-liyou-text-primary font-heading group-hover:text-liyou-pink transition-colors duration-200">{{ title }}</span>

    <!-- 副标题 -->
    <span class="text-caption text-liyou-text-muted/70">{{ sub }}</span>

    <!-- hover 底部装饰线 -->
    <span class="absolute bottom-3 left-1/2 -translate-x-1/2 w-0 h-px bg-liyou-pink/40 transition-all duration-300 group-hover:w-1/2"></span>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  to: string
  sub: string
}>()
</script>

<style scoped>
.entry-card {
  min-height: 100px;
}
.entry-card:hover {
  box-shadow: 0 8px 40px rgba(30, 24, 51, 0.10), 0 0 20px rgba(232, 160, 180, 0.1);
  border-color: rgba(232, 160, 180, 0.35);
}
</style>
