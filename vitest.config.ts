import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    // happy-dom 模拟浏览器环境
    environment: 'happy-dom',
    // 全局 API（无需 import { describe, it } from 'vitest'）
    globals: true,
    // 排除 node_modules 和 dist
    exclude: ['node_modules', 'dist'],
    // 覆盖率配置（可选）
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,vue}'],
      exclude: ['src/**/*.d.ts', 'src/main.ts'],
    },
  },
})
