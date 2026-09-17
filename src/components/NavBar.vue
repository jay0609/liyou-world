<template>
  <nav class="glass-nav fixed top-0 left-0 right-0 z-40 h-16" :class="{ scrolled }">
    <div class="max-w-content mx-auto px-lg h-full flex items-center justify-between gap-md">
      <!-- Logo = 个人简介（首页） -->
      <router-link to="/" class="logo no-underline" @click="closeAll">
        <span class="logo-real">林子杰</span><span class="logo-slash">/</span><span class="logo-text">子弈</span><span class="logo-caret">_</span>
      </router-link>

      <!-- 桌面导航 -->
      <div class="hidden md:flex items-center gap-lg flex-1 ml-lg">
        <router-link to="/#play" class="nav-link" @click="closeAll">陪玩</router-link>

        <!-- 个人项目：下拉 -->
        <div class="dropdown" @mouseenter="projOpen = true" @mouseleave="projOpen = false">
          <button
            class="nav-link dropdown-trigger"
            :class="{ 'is-open': projOpen }"
            @click="projOpen = !projOpen"
          >
            个人项目<span class="caret">▾</span>
          </button>
          <transition name="dropdown">
            <div v-if="projOpen" class="dropdown-panel">
              <div class="dropdown-card">
                <router-link
                  v-for="p in navProjects"
                  :key="p.slug"
                  :to="`/projects/${p.slug}`"
                  class="dd-item"
                  @click="closeAll"
                >
                  <span class="dd-icon">{{ p.icon }}</span>
                  <span class="dd-body">
                    <span class="dd-name">{{ p.name }}</span>
                    <span class="dd-tag">{{ p.tagline }}</span>
                  </span>
                </router-link>
                <router-link to="/projects" class="dd-all" @click="closeAll">查看全部 →</router-link>
              </div>
            </div>
          </transition>
        </div>

        <router-link to="/timeline" class="nav-link" @click="closeAll">\u65f6\u95f4\u7ebf</router-link>
        <router-link to="/journal" class="nav-link" @click="closeAll">动态</router-link>
        <router-link to="/about" class="nav-link" @click="closeAll">关于我</router-link>
      </div>

      <!-- 右侧：CTA + 汉堡 -->
      <div class="flex items-center gap-sm">
        <button class="btn-primary cta" @click="qrOpen = true">
          <span class="hidden sm:inline">加微信接单</span>
          <span class="sm:hidden">加微信</span>
        </button>
        <button
          class="md:hidden btn-ghost p-sm"
          @click="menuOpen = !menuOpen"
          :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
        >
          <span class="burger" :class="{ 'b1': menuOpen }"></span>
          <span class="burger" :class="{ 'b2': menuOpen }"></span>
          <span class="burger" :class="{ 'b3': menuOpen }"></span>
        </button>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <transition name="menu-slide">
      <div v-if="menuOpen" class="md:hidden glass-nav mobile-menu">
        <router-link to="/" class="m-link" @click="closeAll">
          <span class="m-icon">👤</span> 个人简介
          <span class="m-hint">首页</span>
        </router-link>
        <router-link to="/#play" class="m-link" @click="closeAll">
          <span class="m-icon">🎯</span> 陪玩
          <span class="m-hint">战绩 · 价目表</span>
        </router-link>

        <div class="m-group">
          <span class="m-link m-link--static"><span class="m-icon">🗂️</span> 个人项目</span>
          <router-link
            v-for="p in navProjects"
            :key="p.slug"
            :to="`/projects/${p.slug}`"
            class="m-sub"
            @click="closeAll"
          >
            <span class="m-sub-icon">{{ p.icon }}</span> {{ p.name }}
          </router-link>
          <router-link to="/projects" class="m-sub m-sub--all" @click="closeAll">
            查看全部 →
          </router-link>
        </div>

        <router-link to="/timeline" class="m-link" @click="closeAll"><span class="m-icon">\U0001F4C5</span> \u65f6\u95f4\u7ebf</router-link>
        <router-link to="/journal" class="m-link" @click="closeAll">
          <span class="m-icon">📔</span> 动态
          <span class="m-hint">每日记录</span>
        </router-link>

        <router-link to="/about" class="m-link" @click="closeAll">
          <span class="m-icon">👤</span> 关于我
          <span class="m-hint">详细简介</span>
        </router-link>

        <router-link to="/guide" class="m-link m-link--last" @click="closeAll">
          <span class="m-icon">📋</span> 陪玩须知
          <span class="m-hint">下单流程</span>
        </router-link>
      </div>
    </transition>

    <!-- 微信二维码弹窗（转化出口） -->
    <!-- 必须 Teleport 到 body：.glass-nav 有 backdrop-filter，会成为 fixed 的包含块，
         否则弹窗会被关在 64px 高的导航栏里，无法全屏居中 -->
    <Teleport to="body">
      <transition name="fade">
        <div v-if="qrOpen" class="qr-overlay" @click.self="qrOpen = false">
          <div class="qr-modal">
            <button class="qr-close" aria-label="关闭" @click="qrOpen = false">×</button>
            <img class="qr-img" :src="CONTACT.wechatQr" :alt="`微信：${CONTACT.wechatId}`" />
            <p class="qr-title">微信 · {{ CONTACT.wechatId }}</p>
            <p class="qr-desc">扫码加我，说段位和想打的时间，我直接报价。</p>
          </div>
        </div>
      </transition>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { CONTACT } from '../constants'
import { projects } from '../data/projects'

/** 下拉里最多显示几个项目 */
const NAV_PROJECT_LIMIT = 4
const navProjects = projects.slice(0, NAV_PROJECT_LIMIT)

const router = useRouter()
const scrolled = ref(false)
const menuOpen = ref(false)
const projOpen = ref(false)
const qrOpen = ref(false)

function closeAll() {
  menuOpen.value = false
  projOpen.value = false
}

function handleScroll() {
  scrolled.value = window.scrollY > 10
}

function handleKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    qrOpen.value = false
    closeAll()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKey)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKey)
})

// 路由变化时关闭所有浮层
watch(() => router.currentRoute.value.fullPath, () => closeAll())
</script>

<style scoped>
/* ── Logo ── */
.logo {
  display: inline-flex;
  align-items: baseline;
  flex-shrink: 0;
}
.logo-real {
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--liyou-text-primary);
}
.logo-slash {
  margin: 0 3px;
  font-size: 0.9375rem;
  color: var(--liyou-text-muted);
}
.logo-text {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--liyou-pink);
  text-shadow: 0 0 14px rgba(0, 229, 192, 0.45);
}
.logo-caret {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--liyou-pink);
  animation: caret-blink 1.1s step-end infinite;
}
/* 超窄屏只留网名，避免和 CTA / 汉堡挤在一起 */
@media (max-width: 480px) {
  .logo-real,
  .logo-slash { display: none; }
}
@keyframes caret-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* ── 导航项 ── */
.nav-link {
  color: var(--liyou-text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  position: relative;
  padding: 4px 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  white-space: nowrap;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--liyou-pink);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}
.nav-link:hover,
.nav-link.is-open { color: var(--liyou-pink); }
.nav-link:hover::after,
.nav-link.is-open::after { transform: scaleX(1); }

.caret {
  display: inline-block;
  margin-left: 5px;
  font-size: 0.7em;
  transition: transform 0.2s ease;
}
.nav-link.is-open .caret { transform: rotate(180deg); }

/* ── 下拉 ── */
.dropdown { position: relative; }
.dropdown-panel {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 14px; /* 透明桥：鼠标从按钮移到面板不会触发 mouseleave */
  width: 312px;
  z-index: 50;
}
.dropdown-card {
  background: rgba(16, 21, 28, 0.97);
  border: 1px solid rgba(139, 154, 171, 0.2);
  border-radius: 10px;
  padding: 6px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(16px);
}
.dd-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 7px;
  text-decoration: none;
  transition: background 0.15s ease;
}
.dd-item:hover { background: rgba(0, 229, 192, 0.09); }
.dd-icon { font-size: 1rem; line-height: 1.4; flex-shrink: 0; }
.dd-body { display: flex; flex-direction: column; min-width: 0; }
.dd-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--liyou-text-primary);
}
.dd-item:hover .dd-name { color: var(--liyou-pink); }
.dd-tag {
  font-size: 0.75rem;
  color: var(--liyou-text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dd-all {
  display: block;
  margin-top: 4px;
  padding: 8px 12px;
  border-top: 1px solid rgba(139, 154, 171, 0.15);
  font-size: 0.8125rem;
  color: var(--liyou-pink);
  text-decoration: none;
  text-align: right;
}
.dd-all:hover { color: var(--liyou-pink-glow); }

.dropdown-enter-active,
.dropdown-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.dropdown-enter-from,
.dropdown-leave-to { opacity: 0; transform: translateX(-50%) translateY(-6px); }

/* ── CTA ── */
.cta {
  padding: 7px 16px;
  min-height: 36px;
  font-size: 0.8125rem;
  flex-shrink: 0;
}

/* ── 汉堡 ── */
.burger {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--liyou-text-primary);
  margin-bottom: 4px;
  transition: all 0.2s ease;
}
.burger:last-child { margin-bottom: 0; }
.burger.b1 { transform: rotate(45deg) translateY(6px); }
.burger.b2 { opacity: 0; }
.burger.b3 { transform: rotate(-45deg) translateY(-6px); }

/* ── 移动端菜单 ── */
.mobile-menu {
  border-top: 1px solid rgba(139, 154, 171, 0.15);
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  padding: 12px 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: calc(100vh - 64px);
  overflow-y: auto;
}
.m-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 4px;
  font-size: 1rem;
  color: var(--liyou-text-primary);
  text-decoration: none;
  border-bottom: 1px solid rgba(139, 154, 171, 0.08);
}
.m-link--static { cursor: default; }
.m-link:hover { color: var(--liyou-pink); }
.m-icon { font-size: 1rem; }
.m-hint {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--liyou-text-muted);
}
.m-group { border-bottom: 1px solid rgba(139, 154, 171, 0.08); }
.m-sub {
  display: block;
  padding: 9px 4px 9px 30px;
  font-size: 0.875rem;
  color: var(--liyou-text-secondary);
  text-decoration: none;
}
.m-sub:hover { color: var(--liyou-pink); }
.m-sub-icon { margin-right: 4px; }
.m-sub--all { color: var(--liyou-pink); }

.menu-slide-enter-active,
.menu-slide-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.menu-slide-enter-from,
.menu-slide-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── 二维码弹窗 ── */
.qr-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(4, 7, 10, 0.82);
  backdrop-filter: blur(6px);
}
.qr-modal {
  position: relative;
  width: 100%;
  max-width: 320px;
  padding: 26px 24px 22px;
  text-align: center;
  border-radius: 14px;
  background: rgba(16, 21, 28, 0.98);
  border: 1px solid rgba(0, 229, 192, 0.3);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 229, 192, 0.08);
}
.qr-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(139, 154, 171, 0.12);
  border: 1px solid rgba(139, 154, 171, 0.25);
  font-size: 1.125rem;
  line-height: 1;
  cursor: pointer;
  color: var(--liyou-text-secondary);
  transition: all 0.2s ease;
}
.qr-close:hover {
  color: #06120F;
  background: var(--liyou-pink);
  border-color: var(--liyou-pink);
}
.qr-img {
  width: 220px;
  height: 220px;
  margin: 0 auto;
  display: block;
  object-fit: contain;
  border-radius: 10px;
  background: #fff;
  padding: 6px;
}
.qr-title {
  margin: 16px 0 4px;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 1rem;
  font-weight: 700;
  color: var(--liyou-pink);
}
.qr-desc {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--liyou-text-secondary);
}

.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
