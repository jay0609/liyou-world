/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        liyou: {
          'moon-white': 'rgb(var(--liyou-moon-white-rgb) / <alpha-value>)',
          'moon-white-soft': 'rgb(var(--liyou-moon-white-soft-rgb) / <alpha-value>)',
          'light-purple': 'rgb(var(--liyou-light-purple-rgb) / <alpha-value>)',
          'light-purple-soft': 'rgb(var(--liyou-light-purple-soft-rgb) / <alpha-value>)',
          'pink': 'rgb(var(--liyou-pink-rgb) / <alpha-value>)',
          'pink-glow': 'rgb(var(--liyou-pink-glow-rgb) / <alpha-value>)',
          'deep-indigo': 'rgb(var(--liyou-deep-indigo-rgb) / <alpha-value>)',
          'deep-indigo-soft': 'rgb(var(--liyou-deep-indigo-soft-rgb) / <alpha-value>)',
          'glow-gold': 'rgb(var(--liyou-glow-gold-rgb) / <alpha-value>)',
          'star-white': 'rgb(var(--liyou-star-white-rgb) / <alpha-value>)',
          // 文本色 (RGB 三元组也在 main.css :root 中定义)
          'text-primary': 'rgb(var(--liyou-text-primary-rgb) / <alpha-value>)',
          'text-secondary': 'rgb(var(--liyou-text-secondary-rgb) / <alpha-value>)',
          'text-muted': 'rgb(var(--liyou-text-muted-rgb) / <alpha-value>)',
          'text-inverse': 'rgb(var(--liyou-text-inverse-rgb) / <alpha-value>)',
        },
      },
      fontFamily: {
        // 深色硬核主题：标题也用等宽，去掉手写体
        display: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', '"Cascadia Mono"', 'Consolas', 'monospace'],
        heading: ['"Inter"', '"Noto Sans SC"', '"PingFang SC"', '-apple-system', 'sans-serif'],
        body: ['"Inter"', '"Noto Sans SC"', '"PingFang SC"', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', '"Cascadia Mono"', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'card': '10px',
        'component': '8px',
        'input': '6px',
      },
      backdropBlur: {
        'glass': '16px',
        'nav': '20px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0, 0, 0, 0.35)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.45)',
        'modal': '0 16px 64px rgba(0, 0, 0, 0.6)',
        'glow-pink': '0 0 24px rgba(0, 229, 192, 0.4)',
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
}
