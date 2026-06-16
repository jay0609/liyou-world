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
          'moon-white': 'var(--liyou-moon-white)',
          'moon-white-soft': 'var(--liyou-moon-white-soft)',
          'light-purple': 'var(--liyou-light-purple)',
          'light-purple-soft': 'var(--liyou-light-purple-soft)',
          'pink': 'var(--liyou-pink)',
          'pink-glow': 'var(--liyou-pink-glow)',
          'deep-indigo': 'var(--liyou-deep-indigo)',
          'deep-indigo-soft': 'var(--liyou-deep-indigo-soft)',
          'glow-gold': 'var(--liyou-glow-gold)',
          'star-white': 'var(--liyou-star-white)',
          // 文本色 (也在 main.css :root 中定义)
          'text-primary': 'var(--liyou-text-primary)',
          'text-secondary': 'var(--liyou-text-secondary)',
          'text-muted': 'var(--liyou-text-muted)',
          'text-inverse': 'var(--liyou-text-inverse)',
        },
      },
      fontFamily: {
        display: ['"Muyao Soft Brush"', '"沐瑶软笔手写体"', '"ZCOOL KuaiLe"', 'cursive', 'serif'],
        heading: ['"ZCOOL KuaiLe"', '"M PLUS Rounded 1c"', '"Noto Sans SC"', '"PingFang SC"', 'sans-serif'],
        body: ['"Inter"', '"Noto Sans SC"', '"PingFang SC"', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', '"Consolas"', 'monospace'],
      },
      borderRadius: {
        'card': '16px',
        'component': '12px',
        'input': '10px',
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
        'card': '0 4px 24px rgba(30, 24, 51, 0.06)',
        'card-hover': '0 8px 40px rgba(30, 24, 51, 0.10)',
        'modal': '0 16px 64px rgba(30, 24, 51, 0.15)',
        'glow-pink': '0 0 24px rgba(232, 160, 180, 0.4)',
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
}
