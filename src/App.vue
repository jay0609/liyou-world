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
              <span class="text-liyou-pink animate-pulse text-2xl">🌸 正在加载...</span>
            </div>
          </template>
        </Suspense>
      </router-view>
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { STORAGE_KEYS } from './constants'
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import SplashScreen from './components/SplashScreen.vue'

const showSplash = ref(!sessionStorage.getItem(STORAGE_KEYS.splashDone))
watch(showSplash, (val) => {
  if (!val) sessionStorage.setItem(STORAGE_KEYS.splashDone, '1')
})
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
