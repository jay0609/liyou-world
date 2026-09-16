<template>
  <div class="tl">
    <!-- 起点说明 -->
    <p class="tl-intro">
      按开发时间<strong>从近到远</strong>排列 —— 最上面是最近在做的，越往下越早。
      时间取自 git 提交或源码文件的修改时间，具体到天可能有偏差。
    </p>

    <ol class="tl-list">
      <li v-for="m in months" :key="m.key" class="tl-month">
        <!-- 月份 -->
        <div class="tl-month-label">
          <span class="tl-month-num">{{ m.key }}</span>
          <span class="tl-month-count">{{ m.items.length }} 个项目</span>
        </div>

        <!-- 该月的项目 -->
        <div class="tl-items">
          <router-link
            v-for="p in m.items"
            :key="p.slug"
            :to="`/projects/${p.slug}`"
            class="tl-item"
          >
            <span class="tl-dot"></span>
            <div class="tl-card">
              <div class="tl-head">
                <span class="tl-icon">{{ p.icon }}</span>
                <h3 class="tl-name">{{ p.name }}</h3>
                <span class="tl-span">{{ span(p) }}</span>
              </div>
              <p class="tl-tag">{{ p.tagline }}</p>
              <p v-if="p.period?.note" class="tl-note">{{ p.period.note }}</p>
            </div>
          </router-link>
        </div>
      </li>
    </ol>

    <!-- 还没定时间的 -->
    <template v-if="undated.length">
      <div class="tl-month-label tl-month-label--plain">
        <span class="tl-month-num">时间待确认</span>
      </div>
      <div class="tl-items">
        <router-link v-for="p in undated" :key="p.slug" :to="`/projects/${p.slug}`" class="tl-item">
          <span class="tl-dot tl-dot--dim"></span>
          <div class="tl-card">
            <div class="tl-head">
              <span class="tl-icon">{{ p.icon }}</span>
              <h3 class="tl-name">{{ p.name }}</h3>
            </div>
            <p class="tl-tag">{{ p.tagline }}</p>
          </div>
        </router-link>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { projects, type Project } from '../data/projects'

const dated = computed(() => projects.filter((p) => p.period?.start))
const undated = computed(() => projects.filter((p) => !p.period?.start))

/** 按起始月份分组，月份从近到远 */
const months = computed(() => {
  const map = new Map<string, Project[]>()
  for (const p of dated.value) {
    const key = p.period!.start.slice(0, 7)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(p)
  }
  return [...map.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, items]) => ({
      key,
      items: items.sort((a, b) => b.period!.start.localeCompare(a.period!.start)),
    }))
})

/** "07-19 ~ 07-23"，同月省略前一个月份 */
function span(p: Project) {
  const s = p.period!.start
  const e = p.period!.end
  const sm = s.slice(5)
  if (!e) return `${sm} ~ 至今`
  const em = e.slice(5)
  return s.slice(0, 7) === e.slice(0, 7) ? `${sm} ~ ${em}` : `${sm} ~ ${e.slice(5)}`
}
</script>

<style scoped>
.tl-intro {
  margin: 0 0 28px;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--liyou-text-muted);
  background: rgba(19, 25, 32, 0.6);
  border: 1px solid rgba(139, 154, 171, 0.16);
}
.tl-intro strong { color: var(--liyou-text-secondary); }

.tl-list { list-style: none; margin: 0; padding: 0; }

/* 月份 */
.tl-month { position: relative; padding-left: 0; }
.tl-month-label {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 26px 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(139, 154, 171, 0.15);
}
.tl-month:first-child .tl-month-label { margin-top: 0; }
.tl-month-label--plain { margin-top: 34px; }
.tl-month-num {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--liyou-pink);
}
.tl-month-count { font-size: 0.75rem; color: var(--liyou-text-muted); }

/* 项目条 */
.tl-items { display: flex; flex-direction: column; }
.tl-item {
  position: relative;
  display: block;
  padding: 0 0 12px 26px;
  text-decoration: none;
}
/* 竖线 */
.tl-item::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 14px;
  bottom: -2px;
  width: 1px;
  background: rgba(0, 229, 192, 0.2);
}
.tl-item:last-child::before { display: none; }

.tl-dot {
  position: absolute;
  left: 0;
  top: 9px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--liyou-pink);
  box-shadow: 0 0 0 3px rgba(0, 229, 192, 0.13);
}
.tl-dot--dim { background: var(--liyou-text-muted); box-shadow: none; }

.tl-card {
  padding: 12px 16px;
  border-radius: 10px;
  background: rgba(19, 25, 32, 0.6);
  border: 1px solid rgba(139, 154, 171, 0.16);
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
}
.tl-item:hover .tl-card {
  border-color: rgba(0, 229, 192, 0.45);
  background: rgba(19, 25, 32, 0.85);
  transform: translateX(3px);
}

.tl-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 9px;
}
.tl-icon { font-size: 1.0625rem; }
.tl-name {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--liyou-text-primary);
}
.tl-span {
  margin-left: auto;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.6875rem;
  padding: 1px 9px;
  border-radius: 999px;
  color: var(--liyou-text-muted);
  background: rgba(139, 154, 171, 0.12);
}
.tl-tag {
  margin: 5px 0 0;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--liyou-text-secondary);
}
.tl-note {
  margin: 5px 0 0;
  font-size: 0.75rem;
  color: var(--liyou-glow-gold);
  opacity: 0.85;
}

@media (max-width: 640px) {
  .tl-span { margin-left: 0; }
}
</style>
