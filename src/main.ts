import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import './styles/main.css'

// 资源预加载失败（开发期模块图过期）→ 整页刷新，Vite 官方推荐的兜底
window.addEventListener('vite:preloadError', () => {
  console.warn('[vite] 预加载资源失败，整页刷新')
  window.location.reload()
})

// 页面组件（懒加载）
//
// 直接返回动态 import —— Vue Router 原生支持，配合 App.vue 的 <Suspense> 即可。
//
// ⚠️ 这里踩过两个坑，都不要重犯：
//
// 1) 不要用 .catch(() => NotFoundPage) 兜底替换组件。
//    vue-router 会缓存懒加载的解析结果 —— 一旦某次 import 失败被替换成 404 页，
//    这条路由就永久渲染 404（现象：点某个链接永远进不去，其他链接正常）。
//
// 2) 不要用 defineAsyncComponent 包一层。
//    它和 <Suspense> + <transition mode="out-in"> 同时使用时，
//    会出现「路由切过去了，但内容不渲染」的空白页。
//
// 所以：保持最朴素的写法。加载失败就让它失败（有下面的 vite:preloadError 兜底）。
const HomePage = () => import('./views/HomePage.vue')
const BookSpiritPage = () => import('./views/BookSpiritPage.vue')
const WorldMapPage = () => import('./views/WorldMapPage.vue')
const AboutPage = () => import('./views/AboutPage.vue')
const GuidePage = () => import('./views/GuidePage.vue')
const ProjectsPage = () => import('./views/ProjectsPage.vue')
const ProjectDetailPage = () => import('./views/ProjectDetailPage.vue')
const JournalPage = () => import('./views/JournalPage.vue')
const NotFoundPage = () => import('./views/NotFoundPage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage, meta: { title: '林子杰 · 子弈 | FPS 陪玩 × 独立开发者', description: 'CS2 完美魔王 S · 5E S+ · 非优先 TOP1。陪玩按局计费，也做独立游戏开发。' } },
    { path: '/projects/liyou-mirage/lore', name: 'liyou-lore', component: BookSpiritPage, meta: { title: '璃幽·书灵志', description: '璃幽的身份、性格与《万物书》的世界观。' } },
    { path: '/projects/liyou-mirage/world-map', name: 'liyou-world-map', component: WorldMapPage, meta: { title: '次元星图', description: '交互式璃幽宇宙世界观展览——点击星图节点，探索每一个角落。' } },
    { path: '/about', name: 'about', component: AboutPage, meta: { title: '关于我', description: '林子杰（子弈）——FPS 陪玩 × 独立开发者。基本资料、兴趣爱好、现在在做什么。' } },
    { path: '/guide', name: 'guide', component: GuidePage, meta: { title: '陪玩须知', description: '下单流程、计费方式与常见问题。CS2 完美 / 5E · 三角洲行动 · Steam 小游戏。' } },
    { path: '/projects', name: 'projects', component: ProjectsPage, meta: { title: '我的项目', description: '个人开发项目作品集——每个项目的概念与理念。' } },
    { path: '/projects/:slug', name: 'project', component: ProjectDetailPage, meta: { title: '项目', description: '个人开发项目作品集——概念、理念与进展。' } },
    { path: '/journal', name: 'journal', component: JournalPage, meta: { title: '每日动态', description: '每天记一次——做了什么、练了什么、学了什么。' } },
    // 旧 IP 页面路径重定向（保留旧链接可访问）
    { path: '/book-spirit', redirect: '/projects/liyou-mirage/lore' },
    { path: '/oc-workshop', redirect: '/projects/liyou-mirage' },
    { path: '/world-map', redirect: '/projects/liyou-mirage/world-map' },
    { path: '/dimension-library', redirect: '/projects' },
    { path: '/fan-garden', redirect: '/projects' },
    { path: '/zakka', redirect: '/projects' },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage, meta: { title: '404 · 页面走丢了', description: '这一页被风吹走了……回到杂货店，让璃幽给你泡杯茶吧。' } },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // 锚点跳转：留出固定导航栏（64px）的高度
    if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  }
})

// 导航失败必须可见
// ⚠️ 懒加载组件 import 失败时，vue-router 默认会「静默中止」这次导航，
// 表现就是「点链接没反应、页面切不过去」，而控制台什么都不打 —— 极难排查。
// 这里把失败原因打出来。
router.onError((error, to) => {
  console.error(`[router] 导航失败（目标 ${to.fullPath}）：`, error)
})

// 动态 title + meta description (SEO)
router.afterEach((to) => {
  document.title = (to.meta.title as string) || '林子杰 · 子弈 | FPS 陪玩 × 独立开发者'
  // 更新 <meta name="description">
  const descEl = document.querySelector('meta[name="description"]')
  if (descEl) {
    descEl.setAttribute('content', (to.meta.description as string) || '林子杰（子弈）——FPS 游戏陪玩 × 独立开发者。CS2 完美 / 5E · 三角洲行动，按局计费。')
  }
})

const head = createHead()
const app = createApp(App)
app.use(createPinia())
app.use(head)
app.use(router)
app.mount('#app')
