import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables" as *;`
      }
    }
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          // Vue 核心
          'vue-vendor': ['vue', 'vue-router'],
          // 粒子引擎（仅在 Hero 和 星图页面使用，按需加载）
          'particles': ['@tsparticles/slim', '@tsparticles/vue3'],
          // 打字机效果（仅在 Splash 和 BookSpirit 页面使用）
          'typed': ['typed.js'],
        },
      },
    },
    // 控制 chunk 大小警告阈值
    chunkSizeWarningLimit: 500,
  },
})
