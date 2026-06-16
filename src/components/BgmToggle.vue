<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-sm">
    <!-- 音量滑块 -->
    <transition name="fade-slide">
      <div v-if="showSlider" class="glass-card p-md flex items-center gap-sm">
        <span class="text-body-sm text-liyou-text-muted">🔊</span>
        <input type="range" min="0" max="100" :value="Math.round(volume * 100)" @input="onVolume" class="volume-slider" />
        <span class="text-caption text-liyou-text-muted w-8">{{ Math.round(volume * 100) }}</span>
      </div>
    </transition>

    <!-- BGM 按钮 -->
    <button class="bgm-btn glass-card w-12 h-12 rounded-full flex items-center justify-center text-xl relative" :class="{ playing: isPlaying }" @click="toggle" @mouseenter="showSlider = true" @mouseleave="hideSlider" aria-label="BGM 开关">
      <span :class="isPlaying ? 'animate-pulse' : ''">{{ isPlaying ? '🎵' : '🔇' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useBgm } from '../composables/useBgm'

const { isPlaying, volume, toggle, setVolume, registerAutoPlay, cleanup } = useBgm()
const showSlider = ref(false)
let hideTimer = 0

function onVolume(e: Event) {
  const val = parseInt((e.target as HTMLInputElement).value)
  setVolume(val / 100)
}

function hideSlider() {
  clearTimeout(hideTimer)
  hideTimer = window.setTimeout(() => { showSlider.value = false }, 1500)
}

// 组件挂载时注册自动播放监听，卸载时清理
onMounted(() => {
  registerAutoPlay()
})

onUnmounted(() => {
  cleanup()
  clearTimeout(hideTimer)
})
</script>

<style scoped>
.bgm-btn {
  cursor: pointer;
  transition: all 0.3s ease;
}
.bgm-btn:hover {
  box-shadow: 0 0 20px rgba(232, 160, 180, 0.3);
}
.bgm-btn.playing {
  border-color: rgba(232, 160, 180, 0.5);
}

.volume-slider {
  width: 80px;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(196, 181, 212, 0.3);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--liyou-pink);
  cursor: pointer;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
