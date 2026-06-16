<template>
  <div class="pt-24 pb-4xl px-lg">
    <div class="max-w-content mx-auto">
      <div class="text-center mb-3xl">
        <h1 class="text-display-lg text-liyou-deep-indigo font-display tracking-wide mb-md">🏪 解忧杂货店</h1>
        <p class="text-body-lg text-liyou-text-secondary max-w-lg mx-auto">有什么烦恼、心事、想说的话——都可以留在这里。让璃幽的书灵辉光照亮它。</p>
      </div>

      <!-- 即将上线预告 -->
      <section class="max-w-lg mx-auto">
        <GlassCard customClass="text-center py-2xl">
          <span class="text-6xl block mb-lg">🌸</span>
          <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-lg">社区即将上线</h2>
          <p class="text-body-md text-liyou-text-secondary leading-relaxed mb-lg">
            璃幽正在为解忧杂货店搭建真正的社区后端——支持账号注册、发帖、回复、点赞。
            现在的你，可以先加入QQ群，和璃幽及其他伙伴们一起聊天。
          </p>
          <div class="glass-card inline-block px-xl py-md bg-liyou-light-purple-soft/30 mb-xl">
            <span class="text-heading-lg text-liyou-pink font-mono tracking-wider">1105460048</span>
          </div>
          <p class="text-caption text-liyou-text-muted mb-lg">入群问题：璃幽的发卡叫什么名字？</p>
          <a :href="QQ_GROUP.link" target="_blank" class="btn-primary text-lg px-2xl no-underline inline-block">
            💬 先来QQ群坐坐
          </a>
          <p class="text-caption text-liyou-text-muted/50 mt-lg">
            我们正在努力建设中 ✨ 敬请期待
          </p>
        </GlassCard>
      </section>

      <!-- 功能预告 -->
      <section class="mt-4xl max-w-2xl mx-auto">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading text-center mb-xl">上线后你将可以</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-lg">
          <div class="glass-card p-lg text-center">
            <span class="text-3xl block mb-sm">✍️</span>
            <h3 class="text-heading-md text-liyou-text-primary font-heading mb-xs">投递心事</h3>
            <p class="text-body-sm text-liyou-text-muted">匿名或实名，把你的烦恼写在纸条上投进杂货店</p>
          </div>
          <div class="glass-card p-lg text-center">
            <span class="text-3xl block mb-sm">💬</span>
            <h3 class="text-heading-md text-liyou-text-primary font-heading mb-xs">温暖回复</h3>
            <p class="text-body-sm text-liyou-text-muted">璃幽和其他旅人会给你温暖的回应</p>
          </div>
          <div class="glass-card p-lg text-center">
            <span class="text-3xl block mb-sm">🌟</span>
            <h3 class="text-heading-md text-liyou-text-primary font-heading mb-xs">故事收藏</h3>
            <p class="text-body-sm text-liyou-text-muted">每一个被治愈的故事，都会变成回廊里的一颗星石</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlassCard from '../components/GlassCard.vue'
import { QQ_GROUP } from '../constants'
</script>
