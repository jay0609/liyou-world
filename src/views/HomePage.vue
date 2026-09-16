<template>
  <div>
    <!-- 个人 Hero -->
    <HeroSection
      :title="profile.name"
      :subtitle="profile.role"
      :note="profile.tagline"
      :card-title="profile.alias"
      :card-note="profile.role"
      :avatar="profile.avatar"
      card-to="/about"
    >
      <a href="#play" class="btn-primary no-underline">查看价目表</a>
      <a href="#projects" class="btn-secondary no-underline">看我的项目</a>
    </HeroSection>

    <!-- 陪玩：我的水平 + 价目表 + 接单入口
         放在第 2 位 —— 从抖音进来的人 3 秒决定去留，先给价格，再讲生平 -->
    <section id="play" class="py-4xl px-lg bg-liyou-deep-indigo-soft/40">
      <div class="max-w-content mx-auto">
        <div class="text-center mb-2xl">
          <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-md">陪玩</h2>
          <p class="text-body-md text-liyou-text-secondary max-w-2xl mx-auto">
            会打，也会聊。报点清楚，不催单，不推销——不在意你打得菜还是强，只在意这一局愉不愉快。
          </p>
        </div>
        <PricingTable />
      </div>
    </section>

    <!-- 关于我 -->
    <section class="relative z-10 py-4xl px-lg">
      <div class="max-w-2xl mx-auto text-center">
        <p class="about-divider mb-xl">// ──────────</p>
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-xl">关于我</h2>
        <div class="space-y-lg text-body-lg text-liyou-text-secondary leading-relaxed">
          <p v-for="(p, i) in profile.intro" :key="i">{{ p }}</p>
        </div>

        <!-- 基本信息 -->
        <div class="basics-strip">
          <div v-for="b in profile.basics" :key="b.label" class="basic-item">
            <span class="basic-label">{{ b.label }}</span>
            <span class="basic-value">{{ b.value }}</span>
          </div>
        </div>

        <router-link to="/about" class="about-more no-underline">看完整版个人简介 →</router-link>
      </div>
    </section>

    <!-- 个人亮点 -->
    <section class="py-3xl px-lg bg-liyou-light-purple-soft/50">
      <div class="max-w-content mx-auto">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading text-center mb-2xl">个人亮点</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
          <GlassCard v-for="h in profile.highlights" :key="h.title" customClass="text-center">
            <span class="text-4xl block mb-sm">{{ h.icon }}</span>
            <h3 class="text-heading-md text-liyou-text-primary font-heading mb-xs">{{ h.title }}</h3>
            <p class="text-body-sm text-liyou-text-secondary">{{ h.desc }}</p>
          </GlassCard>
        </div>
      </div>
    </section>

    <!-- 兴趣爱好 -->
    <section class="py-3xl px-lg">
      <div class="max-w-content mx-auto">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading text-center mb-2xl">兴趣爱好</h2>
        <div class="hobby-grid">
          <div v-for="h in profile.hobbies" :key="h.name" class="hobby-item">
            <span class="hobby-icon">{{ h.icon }}</span>
            <span class="hobby-name">{{ h.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 游戏生涯 -->
    <section class="py-4xl px-lg">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-2xl border-l-4 border-liyou-pink pl-md">游戏生涯</h2>

        <!-- 玩过的 FPS 系列（链条，刻意不标年份） -->
        <div class="game-chain">
          <template v-for="(g, i) in profile.gameHistory" :key="g">
            <span class="chain-node">{{ g }}</span>
            <span v-if="i < profile.gameHistory.length - 1" class="chain-arrow">→</span>
          </template>
        </div>

        <div class="timeline">
          <div v-for="item in profile.gameCareer" :key="item.title" class="timeline-item relative pl-8 pb-2xl">
            <span class="timeline-dot"></span>
            <span class="text-caption text-liyou-pink font-mono">{{ item.period }}</span>
            <h3 class="text-heading-md text-liyou-text-primary font-heading mt-xs">{{ item.title }}</h3>
            <p class="text-body-sm text-liyou-text-secondary mt-xs">{{ item.desc }}</p>
            <div v-if="item.tags?.length" class="flex flex-wrap gap-xs mt-sm">
              <span v-for="t in item.tags" :key="t" class="text-caption px-sm py-xs rounded-full bg-liyou-light-purple/15 text-liyou-light-purple">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 战绩相册 -->
    <section class="py-4xl px-lg">
      <div class="max-w-content mx-auto">
        <div class="text-center mb-2xl">
          <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-md">战绩相册</h2>
          <p class="text-body-md text-liyou-text-secondary max-w-2xl mx-auto">
            截图按平台分成两个相册，每张都标了日期——数据会变，所以留个记录。
          </p>
        </div>
        <StatsGallery />
      </div>
    </section>

    <!-- 职业生涯 -->
    <section class="py-4xl px-lg bg-liyou-light-purple-soft/30">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-2xl border-l-4 border-liyou-pink pl-md">职业生涯</h2>
        <div class="timeline">
          <div v-for="item in profile.career" :key="item.title" class="timeline-item relative pl-8 pb-2xl">
            <span class="timeline-dot"></span>
            <span class="text-caption text-liyou-pink font-mono">{{ item.period }}</span>
            <h3 class="text-heading-md text-liyou-text-primary font-heading mt-xs">{{ item.title }}</h3>
            <p class="text-body-sm text-liyou-text-secondary mt-xs">{{ item.desc }}</p>
            <div v-if="item.tags?.length" class="flex flex-wrap gap-xs mt-sm">
              <span v-for="t in item.tags" :key="t" class="text-caption px-sm py-xs rounded-full bg-liyou-light-purple/15 text-liyou-light-purple">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目作品集 -->
    <section id="projects" class="py-4xl px-lg">
      <div class="max-w-content mx-auto">
        <div class="text-center mb-2xl">
          <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-md">我的项目</h2>
          <p class="text-body-md text-liyou-text-secondary">一些正在打磨的作品——点击查看每个项目的概念与理念。</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
          <ProjectCard v-for="p in projects" :key="p.slug" :project="p" />
        </div>
      </div>
    </section>

    <!-- 联系（微信二维码已在陪玩区块，这里只留次入口，避免重复） -->
    <section class="py-3xl px-lg text-center">
      <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-md">想聊点别的？</h2>
      <p class="text-body-md text-liyou-text-secondary mb-xl max-w-lg mx-auto">
        项目合作、技术交流，或者只是想聊聊——都欢迎。
      </p>
      <div class="flex flex-wrap items-center justify-center gap-md">
        <span class="contact-chip">微信 / 抖音 · {{ CONTACT.wechatId }}</span>
        <router-link to="/about" class="btn-secondary no-underline">关于我</router-link>
        <router-link to="/guide" class="btn-secondary no-underline">陪玩须知</router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import ProjectCard from '../components/ProjectCard.vue'
import GlassCard from '../components/GlassCard.vue'
import PricingTable from '../components/PricingTable.vue'
import StatsGallery from '../components/StatsGallery.vue'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { CONTACT } from '../constants'
</script>

<style scoped>
.about-divider {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--liyou-text-muted);
  opacity: 0.6;
}

/* 基本信息条 */
.basics-strip {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
}
.basic-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  background: rgba(19, 25, 32, 0.7);
  border: 1px solid rgba(139, 154, 171, 0.18);
}
.basic-label {
  font-size: 0.75rem;
  color: var(--liyou-text-muted);
}
.basic-value {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--liyou-pink);
}

/* 兴趣爱好 */
.hobby-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(118px, 1fr));
  gap: 12px;
  max-width: 780px;
  margin: 0 auto;
}
.hobby-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 10px;
  border-radius: 10px;
  background: rgba(19, 25, 32, 0.6);
  border: 1px solid rgba(139, 154, 171, 0.16);
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.hobby-item:hover {
  border-color: rgba(0, 229, 192, 0.4);
  transform: translateY(-2px);
}
.hobby-icon { font-size: 1.5rem; }
.hobby-name {
  font-size: 0.8125rem;
  color: var(--liyou-text-secondary);
}

.contact-chip {
  display: inline-flex;
  align-items: center;
  padding: 12px 22px;
  border-radius: 8px;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.875rem;
  color: var(--liyou-pink);
  background: rgba(0, 229, 192, 0.08);
  border: 1px solid rgba(0, 229, 192, 0.3);
}

.about-more {
  display: inline-block;
  margin-top: 26px;
  font-size: 0.875rem;
  color: var(--liyou-pink);
  border-bottom: 1px solid rgba(0, 229, 192, 0.35);
  padding-bottom: 2px;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.about-more:hover {
  color: var(--liyou-pink-glow);
  border-color: var(--liyou-pink-glow);
}

/* 游戏历程链条 */
.game-chain {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 16px 20px;
  margin-bottom: 32px;
  border-radius: 10px;
  background: rgba(19, 25, 32, 0.7);
  border: 1px solid rgba(139, 154, 171, 0.18);
}
.chain-node {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.8125rem;
  padding: 4px 11px;
  border-radius: 6px;
  color: var(--liyou-text-primary);
  background: rgba(0, 229, 192, 0.08);
  border: 1px solid rgba(0, 229, 192, 0.22);
  white-space: nowrap;
}
.chain-arrow {
  font-size: 0.75rem;
  color: var(--liyou-text-muted);
  opacity: 0.6;
}
.timeline {
  position: relative;
}
.timeline-item::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 8px;
  bottom: -8px;
  width: 2px;
  background: rgba(139, 154, 171, 0.3);
}
.timeline-item:last-child::before {
  display: none;
}
.timeline-dot {
  position: absolute;
  left: 0;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--liyou-pink);
  box-shadow: 0 0 8px rgba(0, 229, 192, 0.5);
}
</style>
