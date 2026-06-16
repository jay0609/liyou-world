<template>
  <div>
    <HeroSection />

    <!-- 璃幽的自我介绍 -->
    <section class="relative z-10 py-4xl px-lg">
      <div class="max-w-2xl mx-auto text-center">
        <div class="section-divider mb-2xl">
          <span class="decor-star">✦</span> <span class="decor-star">✦</span> <span class="decor-star">✦</span>
        </div>
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-xl">
          你好，我是<span class="text-liyou-pink font-display">璃幽</span>
        </h2>
        <div class="space-y-lg text-body-lg text-liyou-text-secondary leading-relaxed">
          <p>
            我是《万物书》的书灵，次元解忧杂货店的店主。跨越次元的旅人，以文字与故事治愈灵魂。
          </p>
          <p>
            每一个灵魂都值得被倾听。无论你来自哪个世界，无论你带着怎样的心事——这里永远为你留着一盏灯。
          </p>
          <p>
            书页翻动的声音、星光洒落的轨迹、樱花飘落的方向——这些都是我想与你分享的，小小魔法。
          </p>
        </div>
      </div>
    </section>

    <!-- 加入社区 -->
    <section class="py-3xl px-lg bg-liyou-light-purple-soft/50">
      <div class="max-w-lg mx-auto text-center">
        <span class="text-5xl block mb-lg">🌸</span>
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-lg">来杂货店坐坐吧</h2>
        <p class="text-body-md text-liyou-text-secondary mb-xl">
          璃幽在QQ群里等你。一起聊天、分享创作、或者只是安安静静地看星星。
        </p>
        <div class="glass-card inline-block px-xl py-lg mb-lg">
          <span class="text-heading-lg text-liyou-pink font-mono tracking-wider">1105460048</span>
        </div>
        <p class="text-caption text-liyou-text-muted mb-xl">入群问题：璃幽的发卡叫什么名字？</p>
        <a :href="QQ_GROUP.link" target="_blank" class="btn-primary text-lg px-2xl no-underline">
          💬 加入QQ群
        </a>
      </div>
    </section>

    <!-- 底部寄语 -->
    <section class="relative z-10 py-4xl px-lg text-center">
      <p class="text-heading-lg text-liyou-pink font-display tracking-wider">
        万物有灵，为你解忧
      </p>
      <p class="text-body-md text-liyou-text-muted mt-md">
        —— 次元解忧杂货店 · 永远营业中 ——
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import { QQ_GROUP } from '../constants'
</script>

<style scoped>
.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.decor-star {
  color: var(--liyou-light-purple);
  opacity: 0.3;
}
</style>
