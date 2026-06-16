<template>
  <div class="glass-card p-2xl" :class="customClass">
    <h3 v-if="title" class="text-heading-lg text-liyou-text-primary font-heading mb-md">{{ title }}</h3>
    <p v-if="description" class="text-body-md text-liyou-text-secondary mb-lg">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  customClass?: string
}>()
</script>
