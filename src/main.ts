import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import './styles/main.css'

// 页面组件 (懒加载 + 错误边界)
function lazyView(importFn: () => Promise<any>) {
  return () => importFn().catch(() => import('./views/NotFoundPage.vue'))
}

const HomePage = lazyView(() => import('./views/HomePage.vue'))
const BookSpiritPage = lazyView(() => import('./views/BookSpiritPage.vue'))
const OCWorkshopPage = lazyView(() => import('./views/OCWorkshopPage.vue'))
const DimensionLibraryPage = lazyView(() => import('./views/DimensionLibraryPage.vue'))
const FanGardenPage = lazyView(() => import('./views/FanGardenPage.vue'))
const ZakkaPage = lazyView(() => import('./views/ZakkaPage.vue'))
const WorldMapPage = lazyView(() => import('./views/WorldMapPage.vue'))
const AboutPage = lazyView(() => import('./views/AboutPage.vue'))
const NotFoundPage = lazyView(() => import('./views/NotFoundPage.vue'))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage, meta: { title: '璃幽宇宙 · 星空入口', description: '万物有灵，为你解忧——次元解忧杂货店。璃幽IP官方次元网站入口。' } },
    { path: '/book-spirit', name: 'book-spirit', component: BookSpiritPage, meta: { title: '璃幽·书灵志', description: '了解璃幽的身份、性格与《万物书》的世界观——她是万物书之灵，次元解忧杂货店的主人。' } },
    { path: '/oc-workshop', name: 'oc-workshop', component: OCWorkshopPage, meta: { title: '璃幽灵境', description: '璃幽灵境(LiyouMirage)——璃幽IP专属桌面AI创作伴侣。软萌治愈的陪伴感 × 强大的创作生产力。' } },
    { path: '/dimension-library', name: 'dimension-library', component: DimensionLibraryPage, meta: { title: '次元书库', description: '璃幽宇宙的官方内容生态——官方小说、设定集、世界观图谱与壁纸插画下载。' } },
    { path: '/fan-garden', name: 'fan-garden', component: FanGardenPage, meta: { title: '粉丝庭院', description: '加入璃幽宇宙的QQ群，欣赏二创作品，参与同人活动。温暖的庭院等你。' } },
    { path: '/zakka', name: 'zakka', component: ZakkaPage, meta: { title: '解忧杂货店', description: '有什么烦恼、心事——都可以留在这里。让璃幽的书灵辉光照亮它。' } },
    { path: '/world-map', name: 'world-map', component: WorldMapPage, meta: { title: '次元星图', description: '交互式璃幽宇宙世界观展览——点击星图节点，探索每一个角落的故事与设定。' } },
    { path: '/about', name: 'about', component: AboutPage, meta: { title: '关于&支持', description: '了解璃幽宇宙背后的团队，查看常见问题，或者联系我们。' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage, meta: { title: '404 · 页面走丢了', description: '这一页被风吹走了……回到杂货店，让璃幽给你泡杯茶吧。' } },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

// 动态 title + meta description (SEO)
router.afterEach((to) => {
  document.title = (to.meta.title as string) || '璃幽宇宙 | Liyou World'
  // 更新 <meta name="description">
  const descEl = document.querySelector('meta[name="description"]')
  if (descEl) {
    descEl.setAttribute('content', (to.meta.description as string) || '万物有灵，为你解忧。璃幽宇宙——次元解忧杂货店。')
  }
})

const head = createHead()
const app = createApp(App)
app.use(createPinia())
app.use(head)
app.use(router)
app.mount('#app')
