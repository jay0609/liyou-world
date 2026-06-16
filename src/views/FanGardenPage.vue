<template>
  <div class="pt-24 pb-4xl px-lg">
    <div class="max-w-content mx-auto">
      <div class="text-center mb-3xl">
        <h1 class="text-display-lg text-liyou-deep-indigo font-display tracking-wide mb-md">粉丝庭院</h1>
        <p class="text-body-lg text-liyou-text-secondary max-w-xl mx-auto">这里是属于大家的温暖庭院——加入我们，分享你的热爱。</p>
      </div>
      <section class="mb-4xl">
        <GlassCard customClass="text-center max-w-lg mx-auto">
          <span class="text-5xl block mb-lg">💬</span>
          <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-sm">加入QQ群</h2>
          <p class="text-body-md text-liyou-text-secondary mb-lg">和璃幽的伙伴们一起聊天、讨论、分享创作</p>
          <div class="glass-card inline-block px-xl py-md bg-liyou-light-purple-soft/30"><span class="text-heading-lg text-liyou-pink font-mono tracking-wider">{{ QQ_GROUP.number }}</span></div>
          <p class="text-caption text-liyou-text-muted mt-md">入群问题：璃幽的发卡叫什么名字？</p>
        </GlassCard>
      </section>
      <section class="mb-4xl">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-xl text-center">二创展示</h2>
        <div class="columns-2 md:columns-3 lg:columns-4 gap-md">
          <div v-for="i in 12" :key="i" class="glass-card break-inside-avoid mb-md p-md cursor-pointer group">
            <div class="w-full rounded-card bg-liyou-light-purple-soft/40 flex items-center justify-center mb-md" :style="{ height: (120 + Math.floor(Math.random() * 160)) + 'px' }"><span class="text-3xl">{{ ['🎨','✏️','📸','🎵','💫','🌟'][i % 6] }}</span></div>
            <p class="text-body-sm text-liyou-text-secondary group-hover:text-liyou-pink transition-colors">作品 {{ i }}</p>
            <p class="text-caption text-liyou-text-muted">by 创作者{{ i }}</p>
          </div>
        </div>
        <div class="text-center mt-xl"><button class="btn-secondary">提交你的作品</button></div>
      </section>
      <section>
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-xl text-center">同人活动公告</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-xl">
          <GlassCard v-for="event in events" :key="event.title">
            <div class="flex items-start gap-lg">
              <div class="flex-shrink-0 w-16 h-16 rounded-card bg-liyou-pink/10 flex items-center justify-center"><span class="text-2xl">{{ event.icon }}</span></div>
              <div>
                <span class="text-caption text-liyou-pink font-semibold">{{ event.date }}</span>
                <h3 class="text-heading-md text-liyou-text-primary font-heading mt-xs mb-sm">{{ event.title }}</h3>
                <p class="text-body-sm text-liyou-text-secondary">{{ event.desc }}</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlassCard from '../components/GlassCard.vue'
import { QQ_GROUP } from '../constants'
import { events } from '../data/events'
</script>
