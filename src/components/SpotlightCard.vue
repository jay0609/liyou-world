<template>
  <div ref="cardRef" class="spotlight-card glass-card relative overflow-hidden" :class="customClass">
    <div class="spotlight-glow" :style="glowStyle"></div>
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{ customClass?: string }>()

const cardRef = ref<HTMLDivElement | null>(null)
const glowStyle = ref({ opacity: 0, transform: 'translate(-50%,-50%)' })

let animId = 0
let targetX = -100
let targetY = -100
let currentX = -100
let currentY = -100
let isRunning = false

function onMouseMove(e: MouseEvent) {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  targetX = e.clientX - rect.left
  targetY = e.clientY - rect.top
  if (!isRunning) {
    isRunning = true
    animate()
  }
}

function onMouseLeave() {
  targetX = -100
  targetY = -100
}

function animate() {
  currentX += (targetX - currentX) * 0.1
  currentY += (targetY - currentY) * 0.1

  // 当目标在屏幕外且当前位置已足够接近时，停止动画循环
  if (targetX < 0 && Math.abs(currentX - targetX) < 0.5 && Math.abs(currentY - targetY) < 0.5) {
    isRunning = false
    glowStyle.value = { opacity: 0, transform: `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)` }
    return
  }

  const opacity = targetX < 0 ? 0 : 0.6
  glowStyle.value = {
    opacity,
    transform: `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`,
  }
  animId = requestAnimationFrame(animate)
}

onMounted(() => {
  cardRef.value?.addEventListener('mousemove', onMouseMove)
  cardRef.value?.addEventListener('mouseleave', onMouseLeave)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  cardRef.value?.removeEventListener('mousemove', onMouseMove)
  cardRef.value?.removeEventListener('mouseleave', onMouseLeave)
})
</script>

<style scoped>
.spotlight-card {
  /* ⚠️ .glass-card 本身没有内边距 —— 不加这行文字会贴着边框 */
  padding: 28px 30px;
  transition: border-color 0.3s ease;
}
.spotlight-card:hover {
  border-color: rgba(0, 229, 192, 0.35);
}
.spotlight-glow {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 229, 192, 0.15) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.3s ease;
}

@media (max-width: 640px) {
  .spotlight-card { padding: 20px 18px; }
}
</style>
