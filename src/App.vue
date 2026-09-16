<template>
  <SplashScreen v-if="showSplash" @done="showSplash = false" />
  <div
    class="min-h-screen flex flex-col"
    :class="{ 'opacity-0': showSplash }"
    style="transition: opacity 0.6s ease 0.3s"
  >
    <NavBar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <Suspense>
          <template #default>
            <transition name="page-fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </template>
          <template #fallback>
            <div class="min-h-[60vh] flex items-center justify-center">
              <span class="text-liyou-pink animate-pulse text-xl font-mono">正在加载…</span>
            </div>
          </template>
        </Suspense>
      </router-view>
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { STORAGE_KEYS } from './constants'
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import SplashScreen from './components/SplashScreen.vue'

const showSplash = ref(!sessionStorage.getItem(STORAGE_KEYS.splashDone))
watch(showSplash, (val) => {
  if (!val) sessionStorage.setItem(STORAGE_KEYS.splashDone, '1')
})

// 兜底：开屏万一没正常结束（异常 / 事件丢失），6 秒后强制关掉。
// 否则整页会一直挂着 opacity-0，看起来就是「内容全没了」。
let splashFallback = 0
onMounted(() => {
  if (showSplash.value) {
    splashFallback = window.setTimeout(() => { showSplash.value = false }, 6000)
  }
})
onUnmounted(() => clearTimeout(splashFallback))
</script>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
