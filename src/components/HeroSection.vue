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

    <!-- 代码雨层（原樱花层，硬核主题改为二进制字符） -->
    <div class="absolute inset-0 z-1 pointer-events-none overflow-hidden" ref="sakuraRef"></div>

    <!-- 主内容 -->
    <div class="relative z-10 flex flex-col items-center gap-2xl px-lg max-w-content mx-auto w-full">
      <!-- 名片 -->
      <div v-if="showCard" class="relative mb-2xl mt-2xl">
        <div class="absolute -inset-8 rounded-full bg-liyou-pink/5 blur-2xl"></div>
        <div class="absolute -inset-16 rounded-full border border-liyou-light-purple/10 animate-spin ring-1"></div>
        <div class="absolute -inset-20 rounded-full border border-liyou-pink/5 animate-spin ring-2"></div>

        <component
          :is="cardTo ? RouterLink : 'div'"
          v-bind="cardTo ? { to: cardTo } : {}"
          class="glass-card w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-96 flex flex-col items-center justify-center gap-md text-center relative"
          :class="{ 'hero-card--link': cardTo }"
        >
          <span class="absolute -top-3 -left-3 text-2xl opacity-40">✦</span>
          <span class="absolute -top-3 -right-3 text-2xl opacity-40">✦</span>
          <span class="absolute -bottom-3 -left-3 text-2xl opacity-40">✦</span>
          <span class="absolute -bottom-3 -right-3 text-2xl opacity-40">✦</span>
          <img
            v-if="isImgAvatar"
            :src="avatar"
            :alt="cardTitle"
            class="hero-avatar animate-float"
          />
          <div v-else class="text-7xl lg:text-8xl opacity-70 animate-float">{{ avatar }}</div>
          <p class="text-heading-md text-liyou-pink-glow font-display">{{ cardTitle }}</p>
          <p class="text-caption text-liyou-text-muted/60">{{ cardNote }}</p>
          <span v-if="cardTo" class="hero-card-hint">查看完整简介 →</span>
        </component>
        <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-40 h-6 bg-liyou-pink-glow/25 blur-xl rounded-full"></div>
      </div>

      <!-- Slogan -->
      <div class="text-center">
        <h1 class="text-display-xl text-liyou-star-white font-display tracking-[0.15em] leading-tight mb-lg drop-shadow-lg hero-slogan">{{ title }}</h1>
        <p class="text-display-lg text-liyou-light-purple font-display tracking-[0.1em] mb-md">{{ subtitle }}</p>
        <p v-if="note" class="text-body-lg text-liyou-text-muted/70 max-w-sm mx-auto">{{ note }}</p>
      </div>

      <!-- CTA 插槽 -->
      <div v-if="$slots.default" class="flex flex-wrap items-center justify-center gap-md">
        <slot />
      </div>

      <div v-if="showArrow" class="animate-bounce mt-2xl"><span class="text-liyou-star-white/30 text-xl">⌄</span></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    note?: string
    cardTitle?: string
    cardNote?: string
    avatar?: string
    /** 名片点击跳转（留空则不可点） */
    cardTo?: string
    showCard?: boolean
    showArrow?: boolean
  }>(),
  {
    title: '林子杰',
    subtitle: 'FPS 陪玩 × 独立开发者',
    note: '会打，也会聊',
    cardTitle: '子弈',
    cardNote: 'CS2 · 完美 / 5E',
    avatar: '🎯',
    cardTo: '',
    showCard: true,
    showArrow: true,
  }
)

/** avatar 是图片路径还是 emoji */
const isImgAvatar = computed(() => /^(https?:)?\//.test(props.avatar))

const sakuraRef = ref<HTMLDivElement | null>(null)

// tsParticles 初始化
const particlesInit = async (engine: Engine) => {
  await loadSlim(engine)
}

const particleOptions = {
  fullScreen: false,
  fpsLimit: 60,
  particles: {
    number: { value: 40, density: { enable: true } }, // 从80降到40，减少移动端性能压力
    color: { value: ['#FFFFFF', '#5CF2DA', '#8B9AAB'] },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.1, max: 0.6 }, animation: { enable: true, speed: 0.3, sync: false } },
    size: { value: { min: 0.5, max: 2.5 } },
    move: { enable: true, speed: 0.3, direction: 'none' as const, random: true, straight: false, outModes: { default: 'bounce' as const } },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: 'grab' } },
    modes: { grab: { distance: 140, links: { opacity: 0.3, color: '#5CF2DA' } } },
  },
  detectRetina: true,
}

// 代码雨（原樱花）
interface Sakura { el: HTMLDivElement; x: number; y: number; speed: number; sway: number; swaySpeed: number; rotation: number; rotationSpeed: number; size: number; opacity: number }
const sakuras: Sakura[] = []

/** 下落字符集：二进制 + 少量代码符号 */
const FALL_CHARS = ['0', '1', '0', '1', '{', '}', ';', '<', '>', '/']

function createSakura() {
  if (!sakuraRef.value) return
  const el = document.createElement('div')
  el.textContent = FALL_CHARS[Math.floor(Math.random() * FALL_CHARS.length)]
  el.style.cssText =
    'position:absolute;pointer-events:none;will-change:transform,opacity;line-height:1;' +
    'font-family:ui-monospace,SFMono-Regular,Consolas,monospace;color:rgba(0,229,192,0.55);'
  el.style.fontSize = (10 + Math.random() * 10) + 'px'
  sakuraRef.value.appendChild(el)
  sakuras.push({ el, x: Math.random() * 100, y: -5, speed: 0.12 + Math.random() * 0.22, sway: 0, swaySpeed: 0.008 + Math.random() * 0.014, rotation: 0, rotationSpeed: 0, size: 12, opacity: 0.25 + Math.random() * 0.45 })
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
  text-shadow: 0 0 40px rgba(92, 242, 218, 0.3), 0 0 80px rgba(92, 242, 218, 0.15);
}

/* 头像 */
.hero-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 18%;
  border: 2px solid rgba(0, 229, 192, 0.45);
  box-shadow: 0 0 32px rgba(0, 229, 192, 0.25);
}
@media (min-width: 1024px) {
  .hero-avatar { width: 148px; height: 148px; }
}

/* 名片可点击 */
.hero-card--link {
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}
.hero-card--link:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 229, 192, 0.55);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5), 0 0 32px rgba(0, 229, 192, 0.18);
}
.hero-card-hint {
  position: absolute;
  bottom: 14px;
  left: 0;
  right: 0;
  font-size: 0.6875rem;
  letter-spacing: 0.06em;
  color: var(--liyou-pink);
  opacity: 0;
  transition: opacity 0.25s ease;
}
.hero-card--link:hover .hero-card-hint { opacity: 1; }
</style>
