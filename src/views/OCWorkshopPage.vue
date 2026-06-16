<template>
  <div class="pt-24 pb-4xl px-lg">
    <div class="max-w-content mx-auto">
      <div class="text-center mb-3xl">
        <div class="inline-flex items-center gap-sm mb-lg px-lg py-sm rounded-full border border-liyou-pink/30 bg-liyou-pink/5">
          <span class="text-body-sm text-liyou-pink">✨ 先行版已发布</span>
        </div>
        <GradientText size="xl">璃幽灵境</GradientText>
        <p class="text-display-lg text-liyou-text-secondary font-display mt-md mb-lg">LiyouMirage</p>
        <p class="text-body-lg text-liyou-text-muted max-w-2xl mx-auto">璃幽IP专属桌面AI创作伴侣——软萌治愈的陪伴感 × 强大的创作生产力</p>
        <div class="flex flex-col items-center gap-md justify-center mt-xl">
          <button class="btn-primary text-lg px-2xl" @click="goQQ">💬 加Q群下载先行版</button>
          <p class="text-body-sm text-liyou-pink font-semibold">QQ群号：{{ QQ_GROUP.number }}</p>
          <p class="text-caption text-liyou-text-muted/60">加入QQ群后在群文件中下载安装包 · 支持 Windows / macOS / Linux</p>
        </div>
      </div>

      <section class="mb-4xl max-w-3xl mx-auto">
        <SpotlightCard>
          <div class="text-center py-2xl">
            <span class="text-6xl block mb-lg">🌸</span>
            <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-lg">既是次元解忧杂货店<br/>也是你的 AI 创意引擎</h2>
            <p class="text-body-lg text-liyou-text-secondary max-w-xl mx-auto leading-relaxed">
              璃幽灵境是璃幽宇宙的第一款桌面应用——将软萌治愈的角色陪伴与强大的创作工具融为一体。
              在这里，璃幽不只是一张立绘，而是能和你对话、帮你写作、陪你创作角色的 AI 伙伴。
            </p>
          </div>
        </SpotlightCard>
      </section>

      <section class="mb-4xl">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading text-center mb-2xl">三大核心体验</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-xl">
          <GlassCard customClass="text-center"><span class="text-4xl block mb-lg">💬</span><h3 class="text-heading-md text-liyou-text-primary font-heading mb-sm">璃幽陪伴</h3><p class="text-body-sm text-liyou-text-secondary">可交互角色立绘，软萌治愈的聊天体验。支持多模型切换，@不同角色自动调用对应AI模型。</p></GlassCard>
          <GlassCard customClass="text-center"><span class="text-4xl block mb-lg">✍️</span><h3 class="text-heading-md text-liyou-text-primary font-heading mb-sm">创作工坊</h3><p class="text-body-sm text-liyou-text-secondary">内置小说工作台、OC角色创作、世界观设定系统。AI 辅助续写、润色、灵感生成。</p></GlassCard>
          <GlassCard customClass="text-center"><span class="text-4xl block mb-lg">🔒</span><h3 class="text-heading-md text-liyou-text-primary font-heading mb-sm">100% 本地</h3><p class="text-body-sm text-liyou-text-secondary">所有数据本地存储，SHA-256 密码哈希。不上传任何云端，隐私安全。</p></GlassCard>
        </div>
      </section>

      <section class="mb-4xl">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading text-center mb-xl">和璃幽一起成长</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-lg max-w-3xl mx-auto">
          <SpotlightCard customClass="text-center">
            <span class="text-3xl block mb-sm">🏆</span><h3 class="text-heading-md text-liyou-text-primary font-heading mb-xs">成就系统</h3><p class="text-body-sm text-liyou-text-muted">20+ 成就等你解锁<br/>从"初次问候"到"彩蛋猎手"</p>
            <div class="flex flex-wrap gap-xs justify-center mt-sm"><span class="text-caption px-sm py-xs rounded-full bg-liyou-pink/10 text-liyou-pink">common</span><span class="text-caption px-sm py-xs rounded-full bg-liyou-light-purple/15 text-liyou-light-purple">rare</span><span class="text-caption px-sm py-xs rounded-full bg-liyou-glow-gold/15 text-liyou-glow-gold">epic</span><span class="text-caption px-sm py-xs rounded-full bg-liyou-pink-glow/15 text-liyou-pink-glow">legend</span></div>
          </SpotlightCard>
          <SpotlightCard customClass="text-center">
            <span class="text-3xl block mb-sm">💜</span><h3 class="text-heading-md text-liyou-text-primary font-heading mb-xs">亲密度系统</h3><p class="text-body-sm text-liyou-text-muted">从"初次见面"到"灵魂伴侣"<br/>越亲密，璃幽越懂你</p>
            <div class="mt-sm text-caption text-liyou-text-muted/60">聊天 +2 · 登录 +5 · 创作 +10 · 成就 +20~100</div>
          </SpotlightCard>
          <SpotlightCard customClass="text-center">
            <span class="text-3xl block mb-sm">📈</span><h3 class="text-heading-md text-liyou-text-primary font-heading mb-xs">等级系统</h3><p class="text-body-sm text-liyou-text-muted">Lv.1 → Lv.30<br/>每级解锁新功能与称号</p>
            <div class="mt-sm text-caption text-liyou-text-muted/60">Lv.10 基础语音 · Lv.15 璃幽之友 · Lv.20 灵境守护者</div>
          </SpotlightCard>
        </div>
      </section>

      <section class="mb-4xl">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading text-center mb-xl">功能全景</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-md">
          <div v-for="f in features" :key="f.name" class="glass-card p-lg text-center hover:border-liyou-pink/30 transition-colors"><span class="text-xl block mb-sm">{{ f.icon }}</span><span class="text-body-sm text-liyou-text-secondary">{{ f.name }}</span></div>
        </div>
      </section>

      <section class="mb-4xl max-w-3xl mx-auto">
        <SpotlightCard>
          <h2 class="text-heading-lg text-liyou-text-primary font-heading mb-lg text-center">🛠️ 技术架构</h2>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-md text-center">
            <div class="p-md"><span class="text-2xl block mb-sm">🦀</span><span class="text-body-sm text-liyou-text-secondary">Tauri v2<br/><span class="text-caption text-liyou-text-muted">桌面框架</span></span></div>
            <div class="p-md"><span class="text-2xl block mb-sm">💚</span><span class="text-body-sm text-liyou-text-secondary">Vue 3<br/><span class="text-caption text-liyou-text-muted">前端框架</span></span></div>
            <div class="p-md"><span class="text-2xl block mb-sm">⚙️</span><span class="text-body-sm text-liyou-text-secondary">Rust<br/><span class="text-caption text-liyou-text-muted">后端语言</span></span></div>
            <div class="p-md"><span class="text-2xl block mb-sm">🗄️</span><span class="text-body-sm text-liyou-text-secondary">SQLite<br/><span class="text-caption text-liyou-text-muted">本地存储</span></span></div>
          </div>
          <p class="text-body-sm text-liyou-text-muted text-center mt-lg">Element Plus · Pinia · GSAP · Lottie · AES-256 加密</p>
        </SpotlightCard>
      </section>

      <section class="text-center py-2xl">
        <div class="glass-card max-w-lg mx-auto p-2xl">
          <span class="text-5xl block mb-lg">🌸</span>
          <h2 class="text-heading-lg text-liyou-text-primary font-heading mb-md">璃幽会一直陪着你的</h2>
          <p class="text-body-md text-liyou-text-secondary mb-xl">欢迎来到灵境——加入QQ群，下载先行版，开启创作之旅。</p>
          <button class="btn-primary text-lg px-2xl" @click="goQQ">💬 加群下载</button>
          <p class="text-heading-md text-liyou-pink font-mono mt-lg">{{ QQ_GROUP.number }}</p>
          <p class="text-caption text-liyou-text-muted/50 mt-md">先行版 v0.1 · 免费使用 · 持续更新 · 群文件下载</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlassCard from '../components/GlassCard.vue'
import SpotlightCard from '../components/SpotlightCard.vue'
import GradientText from '../components/GradientText.vue'
import { QQ_GROUP } from '../constants'
import { features } from '../data/features'

function goQQ() { window.open(QQ_GROUP.link, '_blank') }
</script>
