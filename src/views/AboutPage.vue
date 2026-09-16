<template>
  <div class="pt-24 pb-4xl px-lg">
    <div class="max-w-content mx-auto">
      <!-- 头部：头像 + 名字 + 定位 -->
      <div class="about-hero">
        <div class="avatar-ring">
          <img class="about-avatar" :src="profile.avatar" :alt="profile.name" />
        </div>
        <h1 class="about-name">
          {{ profile.name }}<span class="about-slash">/</span><span class="about-alias">{{ profile.alias }}</span>
        </h1>
        <p class="about-role">{{ profile.role }}</p>
        <p class="about-tagline">{{ profile.tagline }}</p>
      </div>

      <!-- 基本资料 -->
      <section class="mb-4xl">
        <h2 class="about-h2">基本资料</h2>
        <div class="basics-grid">
          <div v-for="b in profile.basics" :key="b.label" class="basic-cell">
            <span class="basic-cell-label">{{ b.label }}</span>
            <span class="basic-cell-value">{{ b.value }}</span>
          </div>
        </div>
      </section>

      <!-- 个人标签（tags 为空则不显示） -->
      <section v-if="profile.tags.length" class="mb-4xl">
        <h2 class="about-h2">个人标签</h2>
        <div class="basics-grid">
          <div v-for="t in profile.tags" :key="t.label" class="basic-cell">
            <span class="basic-cell-label">{{ t.label }}</span>
            <span class="basic-cell-value">{{ t.value }}</span>
          </div>
        </div>
      </section>

      <!-- 我是什么样的人 -->
      <section class="mb-4xl">
        <h2 class="about-h2">我是什么样的人</h2>
        <div class="prose-block">
          <p v-for="(p, i) in profile.personality" :key="i">{{ p }}</p>
        </div>
      </section>

      <!-- 思维方式 -->
      <section class="mb-4xl">
        <h2 class="about-h2">思维方式</h2>
        <div class="thinking-list">
          <div v-for="t in profile.thinking" :key="t.title" class="thinking-item">
            <div class="thinking-head">
              <span class="thinking-icon">{{ t.icon }}</span>
              <h3 class="thinking-title">{{ t.title }}</h3>
            </div>
            <p class="thinking-desc">{{ t.desc }}</p>
          </div>
        </div>
      </section>

      <!-- 兴趣爱好 -->
      <section class="mb-4xl">
        <h2 class="about-h2">兴趣爱好</h2>
        <div class="hobby-grid">
          <div v-for="h in profile.hobbies" :key="h.name" class="hobby-item">
            <span class="hobby-icon">{{ h.icon }}</span>
            <span class="hobby-name">{{ h.name }}</span>
          </div>
        </div>
      </section>

      <!-- 现在在做什么 -->
      <section class="mb-4xl">
        <h2 class="about-h2">现在在做什么</h2>
        <div class="doing-grid">
          <div v-for="d in profile.nowDoing" :key="d.title" class="doing-item">
            <span class="doing-icon">{{ d.icon }}</span>
            <h3 class="doing-title">{{ d.title }}</h3>
            <p class="doing-desc">{{ d.desc }}</p>
          </div>
        </div>
      </section>

      <!-- 履历 -->
      <section class="mb-4xl">
        <h2 class="about-h2">经历</h2>
        <div class="resume">
          <div v-for="item in profile.career" :key="item.title" class="resume-item">
            <span class="resume-period">{{ item.period }}</span>
            <div class="resume-body">
              <h3 class="resume-title">{{ item.title }}</h3>
              <p class="resume-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="about-cta">
        <router-link to="/#play" class="btn-primary no-underline">查看价目表</router-link>
        <router-link to="/guide" class="btn-secondary no-underline">陪玩须知</router-link>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { profile } from '../data/profile'
</script>

<style scoped>
/* ── 头部 ── */
.about-hero {
  text-align: center;
  margin-bottom: 64px;
}
.avatar-ring {
  display: inline-block;
  padding: 4px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 229, 192, 0.7), rgba(255, 180, 84, 0.5));
  margin-bottom: 20px;
}
.about-avatar {
  display: block;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 18%;
}
.about-name {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--liyou-text-primary);
  margin: 0 0 8px;
}
.about-slash { margin: 0 6px; color: var(--liyou-text-muted); }
.about-alias { color: var(--liyou-pink); }
.about-role {
  font-size: 1rem;
  color: var(--liyou-text-secondary);
  margin: 0 0 6px;
}
.about-tagline {
  font-size: 0.875rem;
  color: var(--liyou-text-muted);
  margin: 0;
  max-width: 520px;
  margin-inline: auto;
}

/* ── 通用标题 ── */
.about-h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--liyou-text-primary);
  margin-bottom: 20px;
  padding-left: 14px;
  border-left: 3px solid var(--liyou-pink);
}

/* ── 基本资料 ── */
.basics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
}
.basic-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 18px;
  border-radius: 10px;
  background: rgba(19, 25, 32, 0.7);
  border: 1px solid rgba(139, 154, 171, 0.18);
}
.basic-cell-label {
  font-size: 0.75rem;
  color: var(--liyou-text-muted);
}
.basic-cell-value {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--liyou-pink);
}

/* ── 段落 ── */
.prose-block {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.prose-block p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.9;
  color: var(--liyou-text-secondary);
}

/* ── 兴趣爱好 ── */
.hobby-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(118px, 1fr));
  gap: 12px;
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
.hobby-name { font-size: 0.8125rem; color: var(--liyou-text-secondary); }

/* ── 思维方式 ── */
.thinking-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 800px;
}
.thinking-item {
  padding: 20px 24px;
  border-radius: 10px;
  background: rgba(19, 25, 32, 0.7);
  border: 1px solid rgba(139, 154, 171, 0.18);
  border-left: 3px solid rgba(0, 229, 192, 0.55);
}
.thinking-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.thinking-icon { font-size: 1.125rem; }
.thinking-title {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 1rem;
  font-weight: 700;
  color: var(--liyou-pink);
  margin: 0;
}
.thinking-desc {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.85;
  color: var(--liyou-text-secondary);
}

/* ── 现在在做什么 ── */.doing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}
.doing-item {
  padding: 20px 22px;
  border-radius: 10px;
  background: rgba(19, 25, 32, 0.7);
  border: 1px solid rgba(139, 154, 171, 0.18);
  border-top: 3px solid rgba(0, 229, 192, 0.55);
}
.doing-icon { font-size: 1.5rem; }
.doing-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--liyou-text-primary);
  margin: 10px 0 6px;
}
.doing-desc {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--liyou-text-secondary);
}

/* ── 履历 ── */
.resume {
  display: flex;
  flex-direction: column;
}
.resume-item {
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(139, 154, 171, 0.12);
}
.resume-item:last-child { border-bottom: none; }
.resume-period {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.8125rem;
  color: var(--liyou-pink);
  padding-top: 2px;
}
.resume-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--liyou-text-primary);
  margin: 0 0 4px;
}
.resume-desc {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--liyou-text-secondary);
}

/* ── CTA ── */
.about-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-top: 56px;
}
</style>
