<template>
  <div class="pt-24 pb-4xl px-lg">
    <div class="max-w-content mx-auto">
      <div class="text-center mb-3xl">
        <h1 class="text-display-lg text-liyou-deep-indigo font-display tracking-wide mb-md">次元书库</h1>
        <p class="text-body-lg text-liyou-text-secondary max-w-xl mx-auto">璃幽宇宙的官方内容生态——小说、设定集、世界观图谱与壁纸。</p>
      </div>

      <!-- 官方小说/设定集 -->
      <section class="mb-4xl">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-xl border-l-4 border-liyou-pink pl-md">官方小说 & 设定集</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-xl">
          <GlassCard v-for="book in books" :key="book.title" class="flex flex-col">
            <div class="w-full h-40 bg-liyou-light-purple-soft/50 rounded-card flex items-center justify-center mb-lg">
              <span class="text-4xl">{{ book.icon }}</span>
            </div>
            <h3 class="text-heading-md text-liyou-text-primary font-heading mb-sm">{{ book.title }}</h3>
            <p class="text-body-sm text-liyou-text-secondary flex-1">{{ book.desc }}</p>
            <span class="text-caption text-liyou-text-muted mt-md">{{ book.status }}</span>
          </GlassCard>
        </div>
      </section>

      <!-- 世界观图谱 -->
      <section class="mb-4xl">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-xl border-l-4 border-liyou-pink pl-md">世界观图谱</h2>
        <SpotlightCard customClass="min-h-[300px] flex flex-col items-center justify-center text-center cursor-pointer" @click="$router.push('/world-map')">
          <span class="text-6xl mb-lg">🌌</span>
          <h3 class="text-heading-lg text-liyou-text-primary font-heading mb-sm">次元星图</h3>
          <p class="text-body-md text-liyou-text-secondary max-w-md">交互式璃幽宇宙世界观展览——点击星图节点，探索每一个角落的故事与设定。</p>
          <div class="mt-lg flex items-center gap-sm text-liyou-pink text-body-sm">
            <span>进入星图</span>
            <span>→</span>
          </div>
        </SpotlightCard>
      </section>

      <!-- 壁纸/插画下载 -->
      <section>
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-xl border-l-4 border-liyou-pink pl-md">壁纸 & 插画</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
          <div v-for="i in 8" :key="i" class="glass-card aspect-video flex items-center justify-center cursor-pointer group">
            <div class="text-center">
              <span class="text-3xl block mb-sm">🖼️</span>
              <span class="text-caption text-liyou-text-muted group-hover:text-liyou-pink transition-colors">壁纸 {{ i }}</span>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button class="btn-secondary">下载全部壁纸包</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlassCard from '../components/GlassCard.vue'
import SpotlightCard from '../components/SpotlightCard.vue'
import { books } from '../data/books'
</script>
