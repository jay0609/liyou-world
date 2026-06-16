// ESLint 配置 — 璃幽宇宙
// 支持 TypeScript + Vue 3 + Prettier
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: false },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier', // 必须放在最后，覆盖与 Prettier 冲突的规则
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // === 全局规则 ===
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',

    // === TypeScript ===
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],

    // === Vue ===
    'vue/multi-word-component-names': 'off', // 允许单词组件名（如 HeroSection）
    'vue/html-self-closing': ['warn', {
      html: { void: 'always', normal: 'never' },
      svg: 'always',
      math: 'always',
    }],
    'vue/component-name-in-template-casing': ['warn', 'PascalCase'],
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'warn', // 使用 v-html 时警告
  },
  overrides: [
    // 配置文件允许 require()
    {
      files: ['*.config.js', '*.config.ts', '*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
