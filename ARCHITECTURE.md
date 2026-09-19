# 网站架构

> 建于 2026-09-19。**改代码前先读这份。**
> 站点：https://cs2npc.cn · 仓库：github.com/jay0609/liyou-world（私有）

---

## 一、技术栈

```
Vue 3.5 + TypeScript + Vite 6 + Tailwind 3.4 + SCSS + Pinia + vue-router 4
托管：Vercel（Hobby）· 域名：cs2npc.cn（阿里云注册）
```

---

## 二、文件树

```
liyouhtml/
│
├── content/            ← ① 内容源（只改这里，不碰代码）
│   ├── pricing.json              陪练价目表
│   ├── stats.json                战绩相册数据
│   ├── files/                    项目文件树（8 个项目 / 917 个文件说明）
│   ├── journal/                  动态（每天一条 JSON）
│   ├── milestones/               项目里程碑
│   └── announcements/ events/ story/ settings/   （旧 IP 残留，未使用）
│
├── scripts/            ← ② 构建脚本
│   ├── convert-content.cjs       内容转换器（JSON → TS）
│   └── gen-sitemap.cjs           sitemap 生成
│
├── src/
│   ├── main.ts         ← ③ 入口：路由表 + 动态 title/description + 统计
│   ├── App.vue                   根组件
│   ├── constants.ts              SITE / CONTACT 常量（域名、微信号）
│   │
│   ├── views/          ← ④ 页面（一个路由一个文件）
│   │   ├── HomePage.vue          首页
│   │   ├── BusinessPage.vue      个人业务（Tab：陪练师/接单记录/须知/AI）
│   │   ├── RecordsPage.vue       记录（Tab：动态/站记）
│   │   ├── ThoughtsPage.vue      思考（推演）
│   │   ├── JournalPage.vue       动态（一次一天 + 翻页）
│   │   ├── OrdersPage.vue        接单记录（卡片 + 战绩截图框）
│   │   ├── GuidePage.vue         陪练须知 FAQ
│   │   ├── ProjectsPage.vue      项目列表（卡片/时间线切换）
│   │   ├── ProjectDetailPage.vue 项目详情（截图/理念/架构/里程碑）
│   │   ├── AboutPage.vue         关于我
│   │   ├── BookSpiritPage.vue    璃幽·书灵志（IP）
│   │   ├── WorldMapPage.vue      次元星图（IP）
│   │   └── NotFoundPage.vue      404
│   │
│   ├── components/     ← ⑤ 组件（17 个，可复用）
│   │   ├── NavBar.vue            导航 + 下拉 + 移动端菜单 + 二维码弹窗
│   │   ├── HeroSection.vue       首页首屏
│   │   ├── PricingTable.vue      价目表
│   │   ├── StatsGallery.vue      战绩相册（双相册 + 灯箱）
│   │   ├── ProjectGallery.vue    项目截图（主图 + 缩略图 + 灯箱）
│   │   ├── ProjectCard.vue       项目卡片
│   │   ├── ProjectTimeline.vue   项目时间线
│   │   ├── FileTree.vue          文件树（搜索 + 折叠）
│   │   ├── FileTreeNode.vue      递归节点
│   │   ├── MilestoneTimeline.vue 里程碑时间线
│   │   ├── JournalCard.vue       动态卡片
│   │   ├── SpotlightCard.vue     高亮卡
│   │   ├── GlassCard.vue         玻璃卡
│   │   ├── GradientText.vue      渐变标题
│   │   ├── TypedText.vue         打字机
│   │   ├── SplashScreen.vue      开屏动画
│   │   └── FooterSection.vue     页脚
│   │
│   ├── data/           ← ⑥ 数据（转换产物 + 手写）
│   │   ├── projects.ts           9 个项目         ← 手写
│   │   ├── profile.ts            个人资料         ← 手写
│   │   ├── orders.ts             接单记录         ← 手写
│   │   ├── thoughts.ts           思考 / 站记       ← 手写
│   │   ├── faqs.ts               须知 FAQ         ← 手写
│   │   ├── journal.ts            动态             ← 转换生成
│   │   ├── pricing.ts            价目表           ← 转换生成
│   │   ├── stats.ts              战绩             ← 转换生成
│   │   ├── files/                项目文件树       ← 转换生成
│   │   ├── milestones/           里程碑           ← 转换生成
│   │   └── story.ts / worldMapNodes.ts           （IP 页用）
│   │
│   ├── styles/         ← ⑦ 样式
│   │   ├── main.css              全局 + 主题变量（--liyou-*）
│   │   └── _variables.scss       SCSS 变量
│   │
│   └── composables/useBgm.ts     背景音乐
│
├── public/             ← 静态资源（原样复制到 dist）
│   ├── images/                   43 张 · 约 4.5 MB
│   │   ├── projects/             25 张项目截图
│   │   ├── stats/                15 张战绩
│   │   ├── journal/              身体基线照
│   │   ├── orders/               接单战绩截图
│   │   └── avatar / wechat / og-cover
│   ├── robots.txt · sitemap.xml · favicon.svg · _redirects
│   └── admin/                    Decap CMS（旧，未启用）
│
├── index.html          ← SEO（canonical / og / JSON-LD / 百度统计）
├── vercel.json         ← 部署配置（SPA 回退 + CSP + 缓存头）
├── vite.config.ts · tailwind.config.js · tsconfig.json
└── DEPLOY.md · DESIGN.md · ARCHITECTURE.md（本文件）
```

---

## 三、七个模块

| # | 模块 | 职责 |
|---|---|---|
| ① | `content/` | 内容源。**改内容只改这里。** |
| ② | `scripts/` | build 时把 JSON 转成 TS |
| ③ | `main.ts` | 路由表 / 每页 title+description / 访问统计 |
| ④ | `views/` | 页面。一个路由一个文件 |
| ⑤ | `components/` | 可复用组件 |
| ⑥ | `data/` | 转换产物 + 手写数据 |
| ⑦ | `public/` | 静态资源 |

---

## 四、数据流

```
content/*.json
      │  npm run build 时自动跑
      ▼
scripts/convert-content.cjs
      │
      ▼
src/data/*.ts
      │  被 views / components import
      ▼
页面
      │  vite build
      ▼
dist/  →  git push  →  Vercel 自动部署  →  https://cs2npc.cn
```

**`npm run build` 的完整链路：**
```
convert-content.cjs  →  gen-sitemap.cjs  →  vue-tsc  →  vite build
```

---

## 五、当前路由表

| 路径 | 页面 | 说明 |
|---|---|---|
| `/` | HomePage | 首页 |
| `/business` | BusinessPage | 个人业务（4 Tab） |
| `/projects` | ProjectsPage | 项目列表 |
| `/projects/:slug` | ProjectDetailPage | 项目详情 |
| `/thoughts` | ThoughtsPage | 思考（推演） |
| `/records` | RecordsPage | 记录（动态 / 站记） |
| `/about` | AboutPage | 关于我 |
| `/projects/liyou-mirage/lore` | BookSpiritPage | 璃幽·书灵志 |
| `/projects/liyou-mirage/world-map` | WorldMapPage | 次元星图 |
| `/guide` → `/business` | 重定向 | 旧链接 |
| `/orders` → `/business` | 重定向 | 旧链接 |
| `/journal` → `/records` | 重定向 | 旧链接 |
| `/:pathMatch(.*)*` | NotFoundPage | 404 |

---

## 六、三条硬规则（踩过坑的）

### ① 路由组件绝不能用 `.catch()` 兜底

```ts
// ❌ 绝对不要
const HomePage = () => import('./views/HomePage.vue').catch(() => import('./views/NotFoundPage.vue'))
```

**原因：** vue-router 会缓存这个组件函数，第一次失败后**永久**返回 404 页 —— 本地刷新多少次都没用。

### ② 弹窗必须 `<Teleport to="body">`

**原因：** `.glass-nav` 有 `backdrop-filter`，它会成为 `position: fixed` 的**包含块**。
弹窗写在导航栏内部的话，会被关在 64px 高的导航栏里。

### ③ 改 `content/*.json` 后必须跑 `convert-content.cjs`

**原因：** `src/data/*.ts` 是转换产物。不跑就类型过期，`vue-tsc` 会报**假错**。

---

## 七、常见操作

### 加一条动态

```
1. 新建 content/journal/YYYY-MM-DD.json
2. node scripts/convert-content.cjs
3. npm run build
4. git push
```

### 加一个项目

```
1. 改 src/data/projects.ts（手写）
2. 若要文件树：新建 content/files/<slug>.json
3. node scripts/convert-content.cjs && npm run build
```

### 加一条接单记录

```
1. 改 src/data/orders.ts（手写）
2. 截图放 public/images/orders/
3. npm run build
```

### 加一篇思考 / 站记

```
1. 改 src/data/thoughts.ts（手写）
   · category: '推演'  → 出现在 /thoughts
   · category: '站记'  → 出现在 /records → 站记
2. npm run build
```

### 本地预览（改完先看，再推）

```
npm run dev   →  http://localhost:5173
```

---

## 八、目前没有后端（故意的）

```
纯静态站：
  · 没有数据库、没有服务端进程、没有用户提交
  · 托管在 Vercel 的全球节点上
  · 零运维成本

什么时候才需要后端：
  · 客户自助下单
  · 实时在线状态
  · 评论 / 留言
  → 等有稳定流量再说，现在写后端是给自己找维护成本
```

---

## 九、部署

```
git push origin main
      ↓
Vercel 自动：拉代码 → npm run build → 复制到全球节点
      ↓
1-2 分钟后 https://cs2npc.cn 更新

⚠️ GitHub 从国内访问不稳，push 常失败 → 重试几次（最多见过 8 次）
```

**详细步骤见 `DEPLOY.md`。**

---

## 十、网站定位（2026-09-19 定）

> **不是对标大厂。是三件事：**

```
① 个人能力公开账本
   做了什么、打得怎么样、在想什么 —— 全部公开，可查证

② 接单入口
   陪练业务的转化口：价目表 / 接单记录 / 须知 / 加微信

③ 未来工作室入口
   以后如果做工作室或接合作，这里是门面
```

**⭐ 所以判断"要不要加某个功能"的标准是：**

```
它服务于这三件事之一吗？
  · 是 → 加
  · 不是 → 不加（哪怕它很好玩）
```

**⭐ 也解释了为什么现在是纯静态站：**

```
账本  → 静态够（内容是我写的，不需要用户提交）
入口  → 静态够（加微信，不在站上交易）
门面  → 静态够（展示用）
→ 所以后端不是现在的瓶颈，流量才是
```