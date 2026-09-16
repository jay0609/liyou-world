# 璃幽宇宙（Liyou World）— DESIGN.md

> **万物有灵，为你解忧。**
> 
> 本文件是璃幽宇宙官网（cs2npc.cn）的视觉设计系统。所有 AI Agent 与开发者应遵循此文件来生成或编写页面 UI。

---

## 1. Visual Theme & Atmosphere

### 设计哲学

璃幽宇宙是横跨**现实与幻想**的次元入口。设计需要在"古风书卷感"与"次元幻想感"之间取得平衡——既有纸页翻动的温度，也有星辰粒子流淌的灵性。

**三个关键词：轻柔、灵性、书卷气。**

### 视觉隐喻

| 元素 | 隐喻 | 设计表现 |
|------|------|----------|
| 星空 | 次元入口 | 全屏粒子 canvas，深色渐变背景 |
| 书本/卷轴 | 知识载体 | 毛玻璃卡片、翻页过渡动画 |
| 辉光 | 万物之灵 | 微妙的发光边框、悬浮光晕 |
| 璃幽（看板娘） | 品牌的灵魂 | Live2D 角色，不同页面不同动作 |

### 情绪板

```
清晨的旧书店 → 阳光透过窗棂 → 尘埃在光柱中漂浮
       ↓
   柔和的暖白 + 淡紫光晕 + 书页的纹理感
       ↓
  "次元解忧杂货店"——温暖的、令人安心的、带一点魔法的
```

### 密度与节奏

- **Hero 区**：低密度，大量留白，让星空和 Live2D 角色呼吸
- **内容区**：中密度，卡片式布局，信息有序但不拥挤
- **Footer 区**：低密度，简洁收尾

---

## 2. Color Palette & Roles

### 主色调体系

| 语义名称 | 色值 | 用途 |
|----------|------|------|
| `--liyou-moon-white` | `#F8F6F3` | 页面主背景（浅色模式） |
| `--liyou-moon-white-soft` | `#F3F0EC` | 卡片背景（浅色模式） |
| `--liyou-light-purple` | `#C4B5D4` | 次要元素、分隔线、侧边栏装饰 |
| `--liyou-light-purple-soft` | `#E8E0F0` | 淡紫背景块、hover 高亮 |
| `--liyou-pink` | `#E8A0B4` | 品牌主色、最高优先级 CTA、Logo |
| `--liyou-pink-glow` | `#F0C0D0` | 悬浮发光、辉光效果 |
| `--liyou-deep-indigo` | `#1E1833` | 深色模式背景、主文字色（深色模式） |
| `--liyou-deep-indigo-soft` | `#2D2648` | 深色模式卡片背景 |
| `--liyou-glow-gold` | `#E8C67A` | "书灵辉光"点缀色（极少使用，最高亮） |
| `--liyou-star-white` | `#FFFFFF` | 粒子、星星、高亮文字 |

### 功能性色

| 语义名称 | 色值 | 用途 |
|----------|------|------|
| `--liyou-text-primary` | `#2D2648` | 浅色模式主文字 |
| `--liyou-text-secondary` | `#6B6380` | 浅色模式次要文字 |
| `--liyou-text-muted` | `#9B93AD` | 浅色模式辅助文字 |
| `--liyou-text-inverse` | `#F8F6F3` | 深色背景上的文字 |
| `--liyou-border` | `rgba(196, 181, 212, 0.3)` | 默认边框 |
| `--liyou-border-active` | `rgba(232, 160, 180, 0.5)` | 激活态边框（璃幽粉） |
| `--liyou-success` | `#7BC89C` | 成功状态 |
| `--liyou-warning` | `#E8C67A` | 警告状态 |
| `--liyou-error` | `#E08880` | 错误状态 |

### 使用规则

1. **璃幽粉（`--liyou-pink`）永远只用于一个位置**——当前页面最重要的那个 CTA 或品牌标识。不要到处撒。
2. **辉光金（`--liyou-glow-gold`）仅用于"书灵辉光"元素**——每页不超过 3 处。
3. **淡紫系（light-purple）是环境的基调**，大量使用在背景、分隔、次级元素中不会出错。
4. **月白（moon-white）不等于纯白**——永远不要使用 `#FFFFFF` 作为大面积背景，用 `#F8F6F3`。

---

## 3. Typography Rules

### 字体家族

| 层级 | 字体栈 | 用途 |
|------|--------|------|
| **Display（展示）** | `"Muyao Soft Brush", "沐瑶软笔手写体", "ZCOOL KuaiLe", cursive, serif` | Hero Slogan、页面大标题 |
| **Heading（标题）** | `"Noto Serif SC", "Source Han Serif SC", Georgia, serif` | 章节标题、卡片标题 |
| **Body（正文）** | `"Inter", "Noto Sans SC", "PingFang SC", -apple-system, sans-serif` | 正文、描述、导航 |
| **Mono（等宽）** | `"JetBrains Mono", "Fira Code", "Consolas", monospace` | 技术说明、代码块（OC工坊） |

### 字体层级表

| 标签 | 字号 | 字重 | 行高 | 用途 |
|------|------|------|------|------|
| `.text-display-xl` | `clamp(3rem, 6vw, 5rem)` | 400 | 1.2 | Hero 主 slogan |
| `.text-display-lg` | `clamp(2rem, 4vw, 3.5rem)` | 400 | 1.3 | 页面主标题 |
| `.text-heading-xl` | `clamp(1.5rem, 3vw, 2.25rem)` | 600 | 1.4 | 板块标题 |
| `.text-heading-lg` | `clamp(1.25rem, 2vw, 1.75rem)` | 600 | 1.4 | 卡片标题 |
| `.text-heading-md` | `1.125rem` | 600 | 1.5 | 小节标题 |
| `.text-body-lg` | `1.0625rem` | 400 | 1.7 | 大段正文 |
| `.text-body-md` | `0.9375rem` | 400 | 1.7 | 标准正文 |
| `.text-body-sm` | `0.8125rem` | 400 | 1.6 | 辅助文字、标签 |
| `.text-caption` | `0.75rem` | 400 | 1.5 | 脚注、时间戳 |
| `.text-mono` | `0.875rem` | 400 | 1.6 | 代码/技术文字 |

### 字体加载策略

```css
/* 沐瑶软笔手写体：自托管，font-display: swap，不阻塞渲染 */
@font-face {
  font-family: 'Muyao Soft Brush';
  src: url('/fonts/muyao-soft-brush.woff2') format('woff2'),
       url('/fonts/muyao-soft-brush.ttf') format('truetype');
  font-display: swap;
  /* fallback 到 站酷快乐体 → 系统字体 */
}
```

- Display 字体使用 `font-display: swap`
- 正文字体使用 `font-display: optional`（避免 FOIT）
- 古风字体仅在 Display 层级使用，控制体积

---

## 4. Component Stylings

### 4.1 按钮

#### 主按钮（Primary CTA）—— 璃幽粉

```
背景：--liyou-pink
文字：--liyou-text-inverse（月白色）
圆角：12px
内边距：12px 28px
字重：600
过渡：all 0.2s ease

Hover：
  背景变得稍亮（lighten 8%）
  微微放大 scale(1.03)
  辉光扩散 box-shadow: 0 0 24px rgba(232, 160, 180, 0.4)

Active：
  scale(0.98)
  box-shadow: 0 0 12px rgba(232, 160, 180, 0.2)

Disabled：
  不透明度 0.4
  cursor: not-allowed
  无 hover 效果
```

#### 次按钮（Secondary）

```
背景：transparent
边框：1px solid --liyou-light-purple
文字：--liyou-text-primary
圆角：12px
内边距：12px 28px

Hover：
  背景：--liyou-light-purple-soft
  边框色：--liyou-pink
```

#### 幽灵按钮（Ghost / 导航用）

```
背景：transparent
文字：--liyou-text-secondary
内边距：8px 16px

Hover：
  文字色：--liyou-pink
  无背景变化
```

### 4.2 卡片

#### 标准毛玻璃卡片

```
背景：rgba(248, 246, 243, 0.7)  // 月白半透明
backdrop-filter: blur(16px)
-webkit-backdrop-filter: blur(16px)
边框：1px solid rgba(196, 181, 212, 0.25)
圆角：16px
阴影：0 4px 24px rgba(30, 24, 51, 0.06)

Hover：
  背景：rgba(248, 246, 243, 0.85)
  transform: translateY(-4px)
  box-shadow: 0 8px 40px rgba(30, 24, 51, 0.10)
  边框发光：0 0 20px rgba(232, 160, 180, 0.08)  ← 微弱的璃幽粉辉光
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1)
```

#### 深色模式卡片

```
背景：rgba(45, 38, 72, 0.7)  // 深靛半透明
backdrop-filter: blur(16px)
边框：1px solid rgba(196, 181, 212, 0.15)
其他同上
```

#### 入口导航卡片（首页四卡片）

```
标准卡片基础上：
  最小尺寸：240px × 160px（桌面）/ 全宽（移动）
  内嵌 icon 或小插画（居中上方）
  标题 → 简短描述 → 微弱的箭头指示器
  Hover 时箭头滑动 + 辉光亮起
```

### 4.3 导航栏

```
背景：rgba(248, 246, 243, 0.8)
backdrop-filter: blur(20px)
边框底：1px solid rgba(196, 181, 212, 0.15)
高度：64px
内容区最大宽度：1200px

滚动行为：
  向下滚动后，背景透明度降低 → rgba(248, 246, 243, 0.95)
  同时边框阴影加深

Logo：
  左侧，璃幽粉色的"璃幽"二字 + 小图标
  Display 字体

导航链接：
  居中排列
  文字色：--liyou-text-secondary
  Hover：--liyou-pink + 底部一条细线指示器
  Active：--liyou-pink + 底部辉光线

移动端：
  Hamburger 菜单 → 全屏覆盖式导航面板（毛玻璃）
```

### 4.4 输入框

```
背景：--liyou-moon-white
边框：1px solid rgba(196, 181, 212, 0.3)
圆角：10px
内边距：10px 16px
字体：Body 层级

Focus：
  边框：--liyou-pink
  box-shadow: 0 0 0 3px rgba(232, 160, 180, 0.15)
  过渡：0.2s ease

Placeholder：
  颜色：--liyou-text-muted
  font-style: italic（可选）
```

### 4.5 FAQ Accordion

```
标题栏：
  背景：transparent
  边框底：1px solid rgba(196, 181, 212, 0.2)
  内边距：16px 0
  展开箭头在右侧

展开态：
  内容区 padding: 16px 0
  箭头旋转 180°

Hover：
  标题栏背景：rgba(232, 224, 240, 0.3)  // 淡紫软色
```

---

## 5. Layout Principles

### 间距体系

基于 **4px 基准网格**，使用以下间距值：

| Token | 值 | 用途 |
|-------|-----|------|
| `--space-xs` | 4px | 紧密元素间距 |
| `--space-sm` | 8px | 图标与文字、标签间距 |
| `--space-md` | 16px | 标准元素间距、卡片内边距 |
| `--space-lg` | 24px | 段落间距、卡片间距 |
| `--space-xl` | 32px | 版块内部间距 |
| `--space-2xl` | 48px | 版块之间间距 |
| `--space-3xl` | 64px | Hero 底部间距、大板块分隔 |
| `--space-4xl` | 96px | 首页各 Section 之间的分隔 |

### 网格系统

- **最大内容宽度**：`1200px`，居中自动 margin
- **Hero 区域**：全宽，无限制
- **内容区域**：`max-width: 1200px` + 左右各 `24px` padding（移动端 `16px`）
- **卡片网格**：
  - 2 列：`repeat(2, 1fr)` + `24px gap`
  - 3 列：`repeat(3, 1fr)` + `24px gap`
  - 4 列：`repeat(4, 1fr)` + `16px gap`（仅图标/标签等小元素）
- **二创瀑布流**：CSS `columns` 或 Masonry 布局

### 留白哲学

> "万物有灵"——元素之间需要呼吸的空间。

1. **Hero 区文字周围至少保留 40px 的安全区**
2. **卡片内的文字与边框至少 16px 间距**
3. **段落之间 1.5 倍行高 + 8px 额外间距**
4. **版块标题与内容区之间至少 32px**
5. **页面底部至少 64px 空白再进入 Footer**

---

## 6. Depth & Elevation

### 层次系统（由低到高）

| 层级 | 元素 | 阴影 / 表现 |
|------|------|-------------|
| **L0 - 基底** | 页面背景（星空/粒子） | 无阴影，`z-index: 0` |
| **L1 - 浮层** | 内容区背景块 | 微弱阴影：`0 2px 8px rgba(30,24,51,0.04)` |
| **L2 - 卡片（静止）** | 标准卡片 | `0 4px 24px rgba(30,24,51,0.06)` |
| **L3 - 卡片（悬浮）** | Hover 卡片 | `0 8px 40px rgba(30,24,51,0.10)` + 辉光 |
| **L4 - 导航栏** | 固定导航 | `0 1px 0 rgba(196,181,212,0.15)` + backdrop-blur |
| **L5 - 弹窗/Modal** | 模态框 | `0 16px 64px rgba(30,24,51,0.15)` + 全屏半透明遮罩 |
| **L6 - 看板娘** | Live2D 角色 | 无阴影，`z-index: 50`，始终在内容之上 |

### 光影规则

1. 浅色模式：阴影偏冷（深靛色 + 低透明度）
2. 深色模式：阴影极淡（几乎不可见），改用发光边框区分层次
3. 辉光效果：仅用于 L3 及以上元素，且仅围绕璃幽粉和金辉色
4. 禁止多层嵌套阴影（如卡片内的卡片）——最多两层，超过则用颜色区分

---

## 7. Do's and Don'ts

### ✅ DO

- **用月白（`#F8F6F3`）而不是纯白做背景**
- **毛玻璃卡片永远搭配半透明边框**——否则边缘会糊掉
- **每个页面最多一个 Primary CTA 按钮**——让用户清晰地知道该做什么
- **粒子效果限制在 Hero 区域**——其他地方会分散注意力
- **字体层级严格遵循 Typography 表**——不要即兴调整字号
- **古风字体仅用于 Display 层级**（一句话标题/大标题）
- **移动端先设计**——卡片在窄屏上堆叠，导航变汉堡菜单
- **Live2D 形象在移动端缩小至 60%**——避免遮挡内容
- **过渡动画统一使用 `cubic-bezier(0.4, 0, 0.2, 1)`**

### ❌ DON'T

- **不要使用纯黑 `#000000`**——用深靛代替
- **不要在非 CTA 的元素上使用璃幽粉**——品牌色的力量来自克制
- **不要让毛玻璃卡片失去边框**——在浅色背景上会完全看不清
- **不要滥用动画**——每个 Section 入场动画仅一次，不循环
- **不要在正文中使用古风字体**——影响可读性
- **不要让任何元素在 `z-index` 上超过看板娘（L6）**
- **不要使用超过 2 种不同的圆角值**——统一用 `12px`（组件）和 `16px`（卡片）
- **不要使用纯 CSS 的 box-shadow 模拟辉光**——结合 `filter: blur()` 或伪元素

---

## 8. Responsive Behavior

### 断点

| 断点 | 范围 | 设计策略 |
|------|------|----------|
| **Mobile** | < 640px | 单列堆叠，导航变汉堡菜单，Live2D 缩小居中 |
| **Tablet** | 640px – 1024px | 2 列卡片，导航保持水平（缩小间距） |
| **Desktop** | 1024px – 1440px | 标准设计，2-3 列卡片，全导航 |
| **Wide** | > 1440px | 内容区最大 1200px 居中，两侧留白增加 |

### 移动端适配要点

```
导航：Hamburger → 全屏覆盖面板（毛玻璃 + 淡入动画）
卡片：从多列变为单列全宽
首页四卡片：2×2 → 4×1 垂直堆叠
Live2D：从左侧移至顶部居中，高度缩减至 40vh
Hero Slogan：字号缩减至 mobile 尺寸（clamp 自适应）
粒子：密度降低 50%（节省性能）
翻页动画 → 简化为 fade 过渡
```

### 触控目标

- 所有可点击元素最小触控区域：`44px × 44px`
- 相邻可点击元素间距不小于 `8px`
- 移动端按钮高度不小于 `48px`

---

## 9. Agent Prompt Guide

### 快速配色参考

```
月白（背景）：     #F8F6F3
淡紫（次要）：     #C4B5D4
璃幽粉（品牌色）：  #E8A0B4
深靛（深色背景）：  #1E1833
辉光金（点缀）：   #E8C67A
```

### 就绪提示词

**生成一个新页面：**
> "按照 DESIGN.md 的设计系统，为璃幽宇宙官网的 [页面名称] 创建一个新页面。使用 Vue3 + SCSS + Tailwind，遵循毛玻璃卡片风格、月白淡紫璃幽粉配色体系、以及定义的字体层级。"

**生成一个组件：**
> "按照 DESIGN.md 的组件规范，创建一个 [组件类型]。使用半透明背景 + backdrop-filter、圆角 16px、hover 时向上浮动 4px 并带有微弱的璃幽粉辉光。"

**检查设计一致性：**
> "对照 DESIGN.md，检查 [页面/组件] 的设计一致性。重点检查：配色是否使用了正确的 CSS 变量、字体层级是否正确、阴影层次是否合理、以及是否违反了 Do's and Don'ts 中的任何条目。"

### 文件引用

在项目的 `index.html` 中引入字体：
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;600&family=Noto+Serif+SC:wght@400;600;700&family=ZCOOL+KuaiLe&display=swap" rel="stylesheet">
<!-- 沐瑶软笔手写体为自托管字体，见 public/fonts/ -->
```

在 SCSS 入口文件中定义 CSS 变量：
```scss
:root {
  // 从第 2 节导入所有颜色变量
  // 从第 3 节导入所有字体变量
  // 从第 5 节导入所有间距变量
}
```

---

> 📘 **本 DESIGN.md 是璃幽宇宙官网的"设计宪法"。**
> 
> 任何对视觉的修改都应先更新此文件，再改动代码。
> 
> 版本：v1.0 · 最后更新：2026-05-12 · 所有者：璃幽宇宙团队
