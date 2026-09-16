<template>
  <footer class="relative border-t border-liyou-light-purple/15 bg-liyou-moon-white-soft py-3xl px-lg overflow-hidden">
    <div class="max-w-content mx-auto relative z-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2xl">
        <!-- 品牌 -->
        <div>
          <h4 class="footer-brand mb-lg">
            林子杰<span class="footer-brand-slash">/</span><span class="footer-brand-alias">子弈</span>
          </h4>
          <p class="text-body-sm text-liyou-text-muted mb-sm">FPS 陪玩 × 独立开发者</p>
          <p class="text-caption text-liyou-text-muted/60">© 2026 子弈</p>
        </div>

        <!-- 导航 -->
        <div>
          <h5 class="footer-title">导航</h5>
          <div class="flex flex-col gap-xs">
            <router-link to="/" class="footer-link">首页</router-link>
            <router-link to="/#play" class="footer-link">陪玩 · 价目表</router-link>
            <router-link to="/about" class="footer-link">关于我</router-link>
            <router-link to="/guide" class="footer-link">陪玩须知</router-link>
            <router-link to="/projects" class="footer-link">个人项目</router-link>
            <router-link to="/journal" class="footer-link">动态</router-link>
          </div>
        </div>

        <!-- 项目 -->
        <div>
          <h5 class="footer-title">项目</h5>
          <div class="flex flex-col gap-xs">
            <router-link
              v-for="p in navProjects"
              :key="p.slug"
              :to="`/projects/${p.slug}`"
              class="footer-link"
            >{{ p.name }}</router-link>
          </div>
        </div>

        <!-- 联系 -->
        <div>
          <h5 class="footer-title">联系</h5>
          <div class="flex flex-col gap-xs">
            <router-link to="/#play" class="footer-link">微信接单：{{ CONTACT.wechatId }}</router-link>
            <span class="footer-link">抖音：CS2NPC</span>
            <span class="footer-link">在线时间：08:00 - 23:00</span>
          </div>
        </div>
      </div>

      <div class="mt-2xl pt-lg border-t border-liyou-light-purple/12 text-center">
        <p class="text-caption text-liyou-text-muted/50">
          林子杰 · 子弈 · FPS 陪玩 × 独立开发者
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { CONTACT } from '../constants'
import { projects } from '../data/projects'

/** 页脚只列前几个项目，避免太长 */
const navProjects = projects.slice(0, 4)
</script>

<style scoped>
.footer-brand {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--liyou-text-primary);
}
.footer-brand-slash {
  margin: 0 3px;
  color: var(--liyou-text-muted);
}
.footer-brand-alias {
  color: var(--liyou-pink);
  text-shadow: 0 0 14px rgba(0, 229, 192, 0.35);
}

.footer-title {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--liyou-text-primary);
  margin-bottom: 10px;
}

.footer-link {
  color: var(--liyou-text-muted);
  text-decoration: none;
  font-size: 0.8125rem;
  transition: color 0.2s ease;
}
.footer-link:hover {
  color: var(--liyou-pink);
}
</style>
