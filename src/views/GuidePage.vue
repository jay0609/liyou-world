<template>
  <div class="pt-24 pb-4xl px-lg">
    <div class="max-w-content mx-auto">
      <!-- 头部 -->
      <div class="text-center mb-3xl">
        <h1 class="text-display-lg text-liyou-text-primary font-display tracking-wide mb-md">陪玩须知</h1>
        <p class="text-body-lg text-liyou-text-secondary max-w-xl mx-auto">
          下单流程、计费方式和常见问题。看完还有疑问，直接加微信问。
        </p>
      </div>

      <!-- 下单流程 -->
      <section class="mb-4xl">
        <h2 class="about-h2">下单流程</h2>
        <div class="steps">
          <div v-for="(s, i) in steps" :key="i" class="step">
            <span class="step-no">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <h3 class="step-title">{{ s.title }}</h3>
              <p class="step-desc">{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="mb-4xl">
        <h2 class="about-h2">常见问题</h2>
        <div class="space-y-md">
          <div v-for="(faq, i) in faqs" :key="i" class="glass-card cursor-pointer" @click="toggleFaq(i)">
            <div class="flex items-center justify-between p-lg">
              <h4 class="text-heading-md text-liyou-text-primary font-heading">{{ faq.q }}</h4>
              <span
                class="text-liyou-text-muted transition-transform duration-200"
                :class="{ 'rotate-180': openFaqs.includes(i) }"
              >▼</span>
            </div>
            <transition name="faq-slide">
              <div v-if="openFaqs.includes(i)" class="px-lg pb-lg">
                <p class="text-body-md text-liyou-text-secondary">{{ faq.a }}</p>
              </div>
            </transition>
          </div>
        </div>
      </section>

      <!-- 联系 -->
      <section>
        <h2 class="about-h2">联系</h2>
        <GlassCard>
          <div class="contact-row">
            <img class="about-qr" :src="CONTACT.wechatQr" :alt="`微信：${CONTACT.wechatId}`" />
            <div class="contact-info">
              <p class="contact-name">微信 · {{ CONTACT.wechatId }}</p>
              <p class="contact-line">抖音同号：{{ CONTACT.wechatId }}</p>
              <p class="contact-line">在线时间：{{ pricing.onlineHours }}</p>
              <p class="contact-line contact-line--muted">{{ pricing.disclaimer }}</p>
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
import { pricing } from '../data/pricing'
import { CONTACT } from '../constants'

const steps = [
  { title: '加微信', desc: `扫下方二维码，或搜微信号 ${CONTACT.wechatId}。` },
  { title: '说需求', desc: '告诉我：玩什么游戏、你的段位、想打的时间、大概打多久。' },
  { title: '我报价', desc: '按价目表直接给你价格，没有隐藏费用。' },
  { title: '约定开局', desc: '确认时间和价格后，到点开局。按局 / 按小时结算，包天另算。' },
]

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
.about-h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--liyou-text-primary);
  margin-bottom: 20px;
  padding-left: 14px;
  border-left: 3px solid var(--liyou-pink);
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}
.step {
  display: flex;
  gap: 14px;
  padding: 18px 20px;
  border-radius: 10px;
  background: rgba(19, 25, 32, 0.7);
  border: 1px solid rgba(139, 154, 171, 0.18);
}
.step-no {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--liyou-pink);
  opacity: 0.7;
}
.step-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--liyou-text-primary);
  margin: 0 0 4px;
}
.step-desc {
  font-size: 0.8125rem;
  line-height: 1.65;
  color: var(--liyou-text-secondary);
  margin: 0;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 22px;
}
.about-qr {
  width: 132px;
  height: 132px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  padding: 5px;
  object-fit: contain;
}
.contact-name {
  margin: 0 0 8px;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 1rem;
  font-weight: 700;
  color: var(--liyou-pink);
}
.contact-line {
  margin: 0 0 4px;
  font-size: 0.875rem;
  color: var(--liyou-text-secondary);
}
.contact-line--muted { color: var(--liyou-text-muted); }

@media (max-width: 640px) {
  .contact-row { flex-direction: column; text-align: center; gap: 16px; }
}

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
