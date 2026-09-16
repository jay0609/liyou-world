<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-liyou-moon-white px-lg pt-16 text-center">
    <span class="text-7xl mb-lg opacity-60">🧭</span>
    <h1 class="text-display-xl text-liyou-text-primary font-display mb-md">404</h1>
    <p class="text-heading-md text-liyou-text-secondary font-heading mb-lg">这个页面不存在</p>
    <p class="text-body-md text-liyou-text-muted max-w-md mb-2xl">
      可能链接过期了，或者地址打错了。回首页看看吧。
    </p>
    <div class="flex flex-wrap items-center justify-center gap-md">
      <router-link to="/" class="btn-primary no-underline">← 回到首页</router-link>
      <router-link to="/#play" class="btn-secondary no-underline">看价目表</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// 404 页面 — 无额外逻辑
</script>
