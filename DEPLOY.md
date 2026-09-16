# 上线检查清单

> 最后更新：2026-09-16
> 状态：**可以部署**

---

## 一、已完成（这些不用你操心）

### SEO

- [x] **`sitemap.xml`** —— 构建时自动生成（12 个页面），从路由表 + 项目数据里取，**新增项目会自动进 sitemap**
- [x] **`robots.txt`** —— 指向 sitemap（修好了之前指向不存在文件的问题）
- [x] **结构化数据 JSON-LD** —— `Person` schema（姓名 / 身份 / 地区 / 擅长领域），Google 和百度会读
- [x] **`canonical`** —— 防重复收录
- [x] **`og:locale` / `og:site_name`** —— 分享卡片补全
- [x] **分享卡片图 `og-cover.jpg`** —— 1200×630 专用（原来是方图头像，微信/QQ 里会被裁得很难看）
- [x] **Twitter/X 大图卡** —— `summary_large_image`
- [x] **每页独立 title / description** —— 路由切换时动态写入

### 性能

- [x] **战绩截图 15 张：6.83 MB → 1.81 MB（省 74%）**，最大单张 135 KB
  - 处理方式：1440px PNG → **1200px JPEG q90**（等比缩放，不是降质压缩）
  - 展示最大宽度 600px、放大看最大 1100px，**1200px 完全够用**
  - 原图在 git 历史里，随时可回退
- [x] **`dist` 总产物：7.4 MB → 2.44 MB**
- [x] **图片懒加载**（`loading="lazy"`）
- [x] **字体** preconnect + 异步加载（不阻塞首屏渲染）
- [x] **代码分割** —— 路由级懒加载 + `vue-vendor` / `particles` 单独分包
- [x] **静态资源长期缓存** —— `/assets/*` 设 `immutable, max-age=1年`

### 安全

- [x] **CSP**（Content-Security-Policy）—— 限制脚本/样式/字体/图片来源
- [x] `X-Content-Type-Options: nosniff`
- [x] `X-Frame-Options: SAMEORIGIN`
- [x] `Referrer-Policy: strict-origin-when-cross-origin`
- [x] `Permissions-Policy` —— 关闭摄像头 / 麦克风 / 定位
- [x] 外链 `rel="noopener"`

### 部署

- [x] **SPA 路由回退** —— `vercel.json` rewrites ＋ `public/_redirects`（刷新 `/projects/xxx` 不会 404）
- [x] **构建产物完整** —— `index.html` / `assets/` / `images/` / `sitemap.xml` / `robots.txt`

---

## 二、部署步骤（3 步）

```bash
# 1. 推到 GitHub（仓库还没建的话先在 GitHub 上建一个空的）
cd D:\liyouhtml
git remote add origin https://github.com/jay0609/ziyi-site.git
git push -u origin main

# 2. 去 vercel.com 导入这个仓库，框架会自动识别成 Vite
#    构建命令：npm run build    输出目录：dist

# 3. 绑定域名 cs2npc.cn（如果域名还没解析，先在域名商那里加 A/CNAME 记录）
```

**注意**：`vercel.json` 里的域名相关配置是 `cs2npc.cn`。**如果以后换域名，要改 3 个地方**：
`index.html` 的 canonical / og:url、`public/robots.txt` 的 Sitemap、`scripts/gen-sitemap.cjs` 的 `SITE_URL`。

---

## 三、上线后自己点这几下（验收）

| # | 点哪里 | 应该看到 |
|---|---|---|
| 1 | 首页往下滚一点 | **「陪玩」在第 2 屏**（我的水平 + 价目表 + 二维码） |
| 2 | 点「加微信接单」 | 屏幕正中弹出二维码 |
| 3 | 鼠标移到「个人项目」 | 下拉出 4 个项目 |
| 4 | 点「个人项目 → 查看全部」 | 5 张项目卡 |
| 5 | 点 `SOSZombie` | 规模数据条 + 架构分层卡 + 终端风格文件树 |
| 6 | 点导航「动态」 | 顶部三个统计块（🔥 连续 / 累计 / 本月） |
| 7 | 点导航「关于我」 | 头像 + 标签 + 性格 + **思维方式** + 履历 |
| 8 | 页脚点「陪玩须知」 | 4 步下单流程 + 7 条 FAQ（可展开） |
| 9 | 首页滚到「战绩相册」 | 两个平台 tab，点图能放大、←/→ 翻页 |
| 10 | **用手机打开** | 布局不挤、汉堡菜单能开、二维码能扫 |
| 11 | **把链接发到微信** | 出现带封面的卡片（不是空白） |

**第 11 条要等部署完才能测** —— 本地 `localhost` 抓不到分享卡片。

---

## 四、已知待办（不影响上线）

| 项 | 说明 |
|---|---|
| **项目截图** | SOSZombie / CS1.6 服的画面还空着，项目页现在只有文字和文件树 |
| **动态只有 1 条** | streak 还是 🔥1，连续记几天才有说服力 |
| **首页和 `/about` 有重复** | 基本资料、兴趣爱好两边都有（可以后续精简） |
| **域名 `cs2npc.cn` 和内容对不上** | 你暂不换。**但分享出去时，域名会是别人判断可信度的第一眼** |
| 图片可进一步转 WebP | 现在 JPEG 已经够用（1.81 MB），WebP 能再省 ~30% |

---

## 五、维护约定

**改数据 = 改 `content/*.json`，然后跑构建：**

```bash
npm run build     # 会自动：转换内容 → 生成 sitemap → 类型检查 → 打包
```

| 想改什么 | 改哪个文件 |
|---|---|
| 价目表 / 包天 | `content/pricing.json` |
| 战绩相册（加截图） | `content/stats.json` + 图片放 `public/images/stats/` |
| 每日动态 | `content/journal/YYYY-MM-DD.json` |
| 个人资料 / 标签 / 思维方式 | `src/data/profile.ts` |
| 项目 | `src/data/projects.ts` |
| 陪玩须知 FAQ | `src/data/faqs.ts` |
