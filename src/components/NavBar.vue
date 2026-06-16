<template>
  <nav class="glass-nav fixed top-0 left-0 right-0 z-40 h-16 transition-all duration-300" :class="{ 'scrolled': scrolled }">
    <div class="max-w-content mx-auto px-lg h-full flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-sm no-underline">
        <span class="text-heading-lg font-display tracking-wide logo-text">璃幽</span>
        <span class="text-body-sm text-liyou-text-muted hidden sm:inline">· 宇宙</span>
      </router-link>

      <!-- 桌面导航 -->
      <div class="hidden md:flex items-center gap-md">
        <router-link to="/book-spirit" class="nav-link">书灵志</router-link>
        <router-link to="/oc-workshop" class="nav-link">灵境</router-link>
        <router-link to="/dimension-library" class="nav-link">次元书库</router-link>
        <router-link to="/zakka" class="nav-link">杂货店</router-link>
        <router-link to="/world-map" class="nav-link">星图</router-link>
        <router-link to="/fan-garden" class="nav-link">庭院</router-link>
        <router-link to="/about" class="nav-link">关于</router-link>

        <!-- 加群入口 -->
        <a :href="QQ_GROUP.link" target="_blank" class="btn-primary text-sm py-sm px-md no-underline">
          💬 加群
        </a>
      </div>

      <!-- 移动端汉堡菜单 -->
      <div class="md:hidden flex items-center gap-sm">
        <button class="btn-ghost p-sm" @click="menuOpen = !menuOpen" :aria-label="menuOpen ? '关闭菜单' : '打开菜单'">
          <span class="block w-5 h-0.5 bg-liyou-text-primary mb-1 transition-all" :class="{ 'rotate-45 translate-y-1.5': menuOpen }"></span>
          <span class="block w-5 h-0.5 bg-liyou-text-primary mb-1 transition-all" :class="{ 'opacity-0': menuOpen }"></span>
          <span class="block w-5 h-0.5 bg-liyou-text-primary transition-all" :class="{ '-rotate-45 -translate-y-1.5': menuOpen }"></span>
        </button>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <transition name="menu-slide">
      <div v-if="menuOpen" class="md:hidden glass-nav border-t border-liyou-light-purple/20 absolute top-16 left-0 right-0 py-lg px-lg flex flex-col gap-md">
        <router-link to="/book-spirit" class="nav-link text-lg py-sm" @click="menuOpen = false">书灵志</router-link>
        <router-link to="/oc-workshop" class="nav-link text-lg py-sm" @click="menuOpen = false">🌸 璃幽灵境</router-link>
        <router-link to="/dimension-library" class="nav-link text-lg py-sm" @click="menuOpen = false">次元书库</router-link>
        <router-link to="/zakka" class="nav-link text-lg py-sm" @click="menuOpen = false">🏪 解忧杂货店</router-link>
        <router-link to="/world-map" class="nav-link text-lg py-sm" @click="menuOpen = false">🌌 次元星图</router-link>
        <router-link to="/fan-garden" class="nav-link text-lg py-sm" @click="menuOpen = false">粉丝庭院</router-link>
        <router-link to="/about" class="nav-link text-lg py-sm" @click="menuOpen = false">关于</router-link>
        <a :href="QQ_GROUP.link" target="_blank" class="btn-primary text-sm py-sm px-md no-underline text-center" @click="menuOpen = false">💬 加入QQ群</a>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { QQ_GROUP } from '../constants'

const router = useRouter()
const scrolled = ref(false)
const menuOpen = ref(false)

function handleScroll() { scrolled.value = window.scrollY > 10 }

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// 路由变化时关闭移动端菜单
watch(() => router.currentRoute.value.path, () => { menuOpen.value = false })
</script>

<style scoped>
.logo-text {
  color: #F0A8B8;
  text-shadow: 0 0 12px rgba(240, 168, 184, 0.5);
  transition: text-shadow 0.3s ease;
}
.logo-text:hover { text-shadow: 0 0 20px rgba(240, 168, 184, 0.8); }

.nav-link {
  color: var(--liyou-text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  position: relative;
  padding: 4px 0;
  transition: color 0.2s ease;
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
.nav-link.router-link-exact-active { color: var(--liyou-pink); }
.nav-link:hover::after,
.nav-link.router-link-exact-active::after { transform: scaleX(1); }

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
