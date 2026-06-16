<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-liyou-deep-indigo pt-16">
    <!-- tsParticles 背景 -->
    <vue-particles
      id="hero-particles"
      class="absolute inset-0 z-0"
      :options="particleOptions"
      :particles-init="particlesInit"
    />

    <!-- 光晕 -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[700px] h-[500px] rounded-full bg-liyou-light-purple/8 blur-[150px] z-0"></div>
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-liyou-pink/6 blur-[120px] z-0"></div>

    <!-- 底部渐变 -->
    <div class="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-liyou-moon-white to-transparent z-1 pointer-events-none"></div>

    <!-- 樱花层 -->
    <div class="absolute inset-0 z-1 pointer-events-none overflow-hidden" ref="sakuraRef"></div>

    <!-- 主内容 -->
    <div class="relative z-10 flex flex-col items-center gap-2xl px-lg max-w-content mx-auto w-full">
      <!-- 角色立绘 -->
      <div class="relative mb-2xl mt-2xl">
        <div class="absolute -inset-8 rounded-full bg-liyou-pink/5 blur-2xl"></div>
        <div class="absolute -inset-16 rounded-full border border-liyou-light-purple/10 animate-spin ring-1"></div>
        <div class="absolute -inset-20 rounded-full border border-liyou-pink/5 animate-spin ring-2"></div>

        <div class="glass-card w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-96 flex flex-col items-center justify-center gap-md text-center relative">
          <span class="absolute -top-3 -left-3 text-2xl opacity-40">✦</span>
          <span class="absolute -top-3 -right-3 text-2xl opacity-40">✦</span>
          <span class="absolute -bottom-3 -left-3 text-2xl opacity-40">✦</span>
          <span class="absolute -bottom-3 -right-3 text-2xl opacity-40">✦</span>
          <div class="text-7xl lg:text-8xl opacity-70 animate-float">🌸</div>
          <p class="text-heading-md text-liyou-pink-glow font-display">璃幽</p>
          <p class="text-caption text-liyou-text-muted/60">Live2D 即将接入</p>
        </div>
        <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-40 h-6 bg-liyou-pink-glow/25 blur-xl rounded-full"></div>
      </div>

      <!-- Slogan -->
      <div class="text-center">
        <h1 class="text-display-xl text-liyou-star-white font-display tracking-[0.15em] leading-tight mb-lg drop-shadow-lg hero-slogan">万物有灵</h1>
        <p class="text-display-lg text-liyou-light-purple font-display tracking-[0.1em] mb-md">为你解忧</p>
        <p class="text-body-lg text-liyou-text-muted/70 max-w-sm mx-auto">次元解忧杂货店 · 书灵辉光</p>
      </div>

      <!-- 四卡片 -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-md lg:gap-lg w-full max-w-2xl">
        <EntryCard title="书灵志" icon="📖" to="/book-spirit" sub="璃幽的故事" />
        <EntryCard title="灵境" icon="✨" to="/oc-workshop" sub="璃幽灵境" />
        <EntryCard title="次元书库" icon="📚" to="/dimension-library" sub="内容生态" />
        <EntryCard title="粉丝庭院" icon="🏡" to="/fan-garden" sub="社区" />
      </div>

      <div class="animate-bounce mt-2xl"><span class="text-liyou-star-white/30 text-xl">⌄</span></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import EntryCard from './EntryCard.vue'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'

const sakuraRef = ref<HTMLDivElement | null>(null)

// tsParticles 初始化
const particlesInit = async (engine: Engine) => {
  await loadSlim(engine)
}

const particleOptions = {
  fullScreen: false,
  fpsLimit: 60,
  particles: {
    number: { value: 40, density: { enable: true } },  // 从80降到40，减少移动端性能压力
    color: { value: ['#FFFFFF', '#F0C0D0', '#C4B5D4'] },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.1, max: 0.6 }, animation: { enable: true, speed: 0.3, sync: false } },
    size: { value: { min: 0.5, max: 2.5 } },
    move: { enable: true, speed: 0.3, direction: 'none' as const, random: true, straight: false, outModes: { default: 'bounce' as const } },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: 'grab' } },
    modes: { grab: { distance: 140, links: { opacity: 0.3, color: '#F0C0D0' } } },
  },
  detectRetina: true,
}

// 樱花（保持不变）
interface Sakura { el: HTMLDivElement; x: number; y: number; speed: number; sway: number; swaySpeed: number; rotation: number; rotationSpeed: number; size: number; opacity: number }
const sakuras: Sakura[] = []

function createSakura() {
  if (!sakuraRef.value) return
  const el = document.createElement('div')
  el.innerHTML = '🌸'
  el.style.cssText = 'position:absolute;pointer-events:none;will-change:transform,opacity;line-height:1;'
  el.style.fontSize = (14 + Math.random() * 18) + 'px'
  sakuraRef.value.appendChild(el)
  sakuras.push({ el, x: Math.random() * 100, y: -5, speed: 0.15 + Math.random() * 0.3, sway: 0, swaySpeed: 0.01 + Math.random() * 0.02, rotation: Math.random() * 360, rotationSpeed: 0.1 + Math.random() * 0.4, size: 16, opacity: 0.4 + Math.random() * 0.5 })
}

function animateSakura() {
  const h = window.innerHeight
  for (let i = sakuras.length - 1; i >= 0; i--) {
    const s = sakuras[i]
    s.y += s.speed; s.sway += s.swaySpeed; s.rotation += s.rotationSpeed
    s.el.style.transform = `translate(${s.x + Math.sin(s.sway) * 18}vw,${s.y}vh) rotate(${s.rotation}deg)`
    s.el.style.opacity = String(s.opacity * (s.y > h * 0.7 ? 1 - (s.y - h * 0.7) / (h * 0.3) : 1))
    if (s.y > h + 5) { s.el.remove(); sakuras.splice(i, 1) }
  }
}

let sakuraTimer = 0
let sakuraAnimId = 0
let sakuraPaused = false

function sakuraLoop() {
  if (sakuraPaused) { sakuraAnimId = requestAnimationFrame(sakuraLoop); return }
  sakuraTimer++
  if (sakuraTimer % 60 === 0 && sakuras.length < 15) createSakura()
  animateSakura()
  sakuraAnimId = requestAnimationFrame(sakuraLoop)
}

onMounted(() => {
  sakuraAnimId = requestAnimationFrame(sakuraLoop)

  // 离屏时暂停樱花动画，减少不必要的 CPU 消耗
  const observer = new IntersectionObserver(
    ([entry]) => { sakuraPaused = !entry.isIntersecting },
    { threshold: 0.1 }
  )
  const section = sakuraRef.value?.closest('section') as HTMLElement | null
  if (section) observer.observe(section)
})

onUnmounted(() => { cancelAnimationFrame(sakuraAnimId); sakuras.forEach(s => s.el.remove()); sakuras.length = 0 })
</script>

<style scoped>
@keyframes float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
.animate-float { animation: float 3s ease-in-out infinite; }

/* 光环动画速度 */
.ring-1 { animation-duration: 20s; }
.ring-2 { animation-duration: 30s; animation-direction: reverse; }

/* Hero slogan 文字辉光 */
.hero-slogan {
  text-shadow: 0 0 40px rgba(240, 192, 208, 0.3), 0 0 80px rgba(240, 192, 208, 0.15);
}
</style>
