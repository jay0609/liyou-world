<template>
  <span ref="elRef" class="typed-text"></span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Typed from 'typed.js'

const props = defineProps<{
  strings: string[]
  typeSpeed?: number
  backSpeed?: number
  startDelay?: number
  loop?: boolean
  showCursor?: boolean
  cursorChar?: string
}>()

const elRef = ref<HTMLSpanElement | null>(null)
let typed: Typed | null = null

function initTyped() {
  if (!elRef.value) return
  // 先销毁旧实例
  typed?.destroy()
  typed = new Typed(elRef.value, {
    strings: props.strings,
    typeSpeed: props.typeSpeed ?? 60,
    backSpeed: props.backSpeed ?? 30,
    startDelay: props.startDelay ?? 0,
    loop: props.loop ?? false,
    showCursor: props.showCursor ?? true,
    cursorChar: props.cursorChar ?? '|',
  })
}

onMounted(() => {
  initTyped()
})

// 监听 strings 变化，自动重新开始打字
watch(
  () => props.strings,
  () => {
    initTyped()
  }
)

onUnmounted(() => {
  typed?.destroy()
})
</script>

<style scoped>
.typed-text :deep(.typed-cursor) {
  color: var(--liyou-pink);
  animation: blink 0.8s infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
