<template>
  <div class="pt-24 pb-4xl px-lg">
    <div class="max-w-content mx-auto">
      <div class="text-center mb-3xl">
        <h1 class="text-display-lg text-liyou-deep-indigo font-display tracking-wide mb-md">关于 & 支持</h1>
        <p class="text-body-lg text-liyou-text-secondary max-w-xl mx-auto">了解璃幽宇宙背后的团队，或者联系我们。</p>
      </div>

      <!-- 关于团队 -->
      <section class="mb-4xl">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-xl border-l-4 border-liyou-pink pl-md">关于"璃幽宇宙"团队</h2>
        <GlassCard>
          <p class="text-body-md text-liyou-text-secondary leading-relaxed mb-lg">
            璃幽宇宙是一个<b class="text-liyou-pink">以内容创作为核心</b>的次元文化品牌。我们相信——万物有灵，每个灵魂都值得被倾听。
          </p>
          <p class="text-body-md text-liyou-text-secondary leading-relaxed mb-lg">
            我们的使命是：打造一个温暖、有灵性的次元世界，连接创作者与读者，让每一个故事都能找到它的归宿。
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-lg mt-xl">
            <div class="text-center p-lg">
              <span class="text-3xl block mb-sm">🌟</span>
              <h4 class="text-heading-md text-liyou-text-primary mb-xs">创作</h4>
              <p class="text-body-sm text-liyou-text-muted">原创世界观、角色、故事</p>
            </div>
            <div class="text-center p-lg">
              <span class="text-3xl block mb-sm">🛠️</span>
              <h4 class="text-heading-md text-liyou-text-primary mb-xs">工具</h4>
              <p class="text-body-sm text-liyou-text-muted">OC工坊、创作辅助</p>
            </div>
            <div class="text-center p-lg">
              <span class="text-3xl block mb-sm">💜</span>
              <h4 class="text-heading-md text-liyou-text-primary mb-xs">社区</h4>
              <p class="text-body-sm text-liyou-text-muted">创作者与粉丝的温暖庭院</p>
            </div>
          </div>
        </GlassCard>
      </section>

      <!-- FAQ -->
      <section class="mb-4xl">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-xl border-l-4 border-liyou-pink pl-md">常见问题</h2>
        <div class="space-y-md">
          <div v-for="(faq, i) in faqs" :key="i" class="glass-card cursor-pointer" @click="toggleFaq(i)">
            <div class="flex items-center justify-between p-lg">
              <h4 class="text-heading-md text-liyou-text-primary font-heading">{{ faq.q }}</h4>
              <span class="text-liyou-text-muted transition-transform duration-200" :class="{ 'rotate-180': openFaqs.includes(i) }">▼</span>
            </div>
            <transition name="faq-slide">
              <div v-if="openFaqs.includes(i)" class="px-lg pb-lg">
                <p class="text-body-md text-liyou-text-secondary">{{ faq.a }}</p>
              </div>
            </transition>
          </div>
        </div>
      </section>

      <!-- 合作联系 -->
      <section>
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-xl border-l-4 border-liyou-pink pl-md">合作联系</h2>
        <GlassCard>
          <p class="text-body-md text-liyou-text-secondary mb-lg">
            如果你对璃幽宇宙感兴趣——无论是商业合作、内容共创、还是技术支持——欢迎联系我们。
          </p>
          <div class="space-y-md text-body-md text-liyou-text-secondary">
            <div class="flex items-center gap-sm">
              <span class="text-liyou-pink">📧</span>
              <span>邮箱：contact@liyou.world</span>
            </div>
            <div class="flex items-center gap-sm">
              <span class="text-liyou-pink">💬</span>
              <span>QQ群：1105460048</span>
            </div>
            <div class="flex items-center gap-sm">
              <span class="text-liyou-pink">🌐</span>
              <span>官网：liyou.world</span>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GlassCard from '../components/GlassCard.vue'
import { faqs } from '../data/faqs'

const openFaqs = ref<number[]>([])

function toggleFaq(i: number) {
  const idx = openFaqs.value.indexOf(i)
  if (idx > -1) {
    openFaqs.value.splice(idx, 1)
  } else {
    openFaqs.value.push(i)
  }
}
</script>

<style scoped>
.faq-slide-enter-active,
.faq-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.faq-slide-enter-from,
.faq-slide-leave-to {
  opacity: 0;
  max-height: 0;
}
.faq-slide-enter-to,
.faq-slide-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
