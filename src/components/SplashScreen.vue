<template>
  <transition name="splash-fade">
    <div v-if="visible" class="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-liyou-deep-indigo" @click="skip">
      <!-- 粒子 -->
      <canvas ref="canvasRef" class="absolute inset-0"></canvas>
      <!-- 光晕 -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-liyou-pink/10 blur-[100px]"></div>

      <div class="relative z-10 text-center">
        <!-- 标题逐字弹出 -->
        <div class="flex justify-center gap-2 sm:gap-4 mb-lg">
          <span v-for="(char, i) in chars" :key="i" class="splash-char text-display-xl sm:text-[6rem] font-display" :class="i < revealed ? 'revealed' : ''" :style="{ transitionDelay: i * 0.25 + 's', color: i < revealed ? '#F0C0D0' : 'transparent' }">{{ char }}</span>
        </div>
        <!-- Typed.js 打字机副标题 -->
        <div class="h-16 sm:h-20">
          <TypedText
            v-if="revealed >= 4"
            :strings="['万物有灵，为你解忧']"
            :typeSpeed="70"
            :startDelay="300"
            :showCursor="true"
            cursorChar="|"
            class="text-display-lg text-liyou-light-purple font-display"
          />
        </div>
      </div>

      <p class="absolute bottom-8 text-caption text-liyou-text-muted/50 z-10">点击任意位置跳过</p>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TypedText from './TypedText.vue'

const emit = defineEmits<{ done: [] }>()

const visible = ref(true)
const revealed = ref(0)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const chars = ['璃', '幽', '宇', '宙']

let animId = 0
let done = false

function skip() {
  if (done) return
  done = true
  visible.value = false
  setTimeout(() => emit('done'), 600)
}

async function playSequence() {
  for (let i = 0; i < chars.length; i++) {
    await delay(280)
    if (done) return
    revealed.value = i + 1
  }
  // 等待 Typed.js 打完（约 70ms × 7字 + 300ms 延迟 ≈ 800ms）+ 停留
  await delay(2500)
  if (done) return
  skip()
}

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  let w = 0, h = 0
  const stars: { x: number; y: number; r: number; a: number }[] = []
  function resize() {
    w = canvas!.width = window.innerWidth; h = canvas!.height = window.innerHeight
    stars.length = 0
    for (let i = 0; i < 60; i++) stars.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.5 + 0.3, a: Math.random() * 0.4 + 0.2 })
  }
  resize()
  window.addEventListener('resize', resize)
  function draw() {
    ctx!.clearRect(0, 0, w, h)
    for (const s of stars) {
      ctx!.beginPath(); ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx!.fillStyle = `rgba(255,255,255,${s.a})`; ctx!.fill()
      s.a += (Math.random() - 0.5) * 0.01; s.a = Math.max(0.15, Math.min(0.7, s.a))
    }
    animId = requestAnimationFrame(draw)
  }
  draw()
  playSequence()

  // 保存 resize handler 引用以便清理
  ;(window as any).__splashResizeHandler = resize
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  // 清理 resize 监听器
  const handler = (window as any).__splashResizeHandler
  if (handler) {
    window.removeEventListener('resize', handler)
    delete (window as any).__splashResizeHandler
  }
})
</script>

<style scoped>
.splash-char {
  display: inline-block; opacity: 0; transform: scale(0.3);
  transition: opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.splash-char.revealed {
  opacity: 1; transform: scale(1);
  text-shadow: 0 0 30px rgba(240, 192, 208, 0.6), 0 0 60px rgba(240, 192, 208, 0.3);
}
.splash-fade-leave-active { transition: opacity 0.6s ease; }
.splash-fade-leave-to { opacity: 0; }
</style>
