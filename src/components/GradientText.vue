<template>
  <span class="gradient-text" :class="sizeClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ size?: 'sm' | 'md' | 'lg' | 'xl' }>()

const sizeClass = computed(() => {
  const map: Record<string, string> = {
    sm: 'text-heading-md',
    md: 'text-heading-lg',
    lg: 'text-heading-xl',
    xl: 'text-display-lg',
  }
  return map[props.size || 'lg']
})
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #E8A0B4 0%, #C4B5D4 40%, #F0C0D0 70%, #E8C67A 100%);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 4s ease-in-out infinite;
  font-weight: 700;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>
