<template>
  <article class="journal-card">
    <!-- 头部 -->
    <header class="journal-head">
      <div class="journal-date-row">
        <time class="journal-date">{{ entry.date }}</time>
        <span class="journal-weekday">{{ entry.weekday }}</span>
      </div>
      <h2 class="journal-title">{{ entry.title }}</h2>
      <div v-if="entry.tags && entry.tags.length" class="journal-tags">
        <span v-for="t in entry.tags" :key="t" class="journal-tag">#{{ t }}</span>
      </div>
    </header>

    <!-- 照片（可选，无照片则整块不渲染） -->
    <div v-if="visiblePhotos.length" class="journal-photos" :class="`cols-${photoCols}`">
      <figure v-for="(p, i) in visiblePhotos" :key="i" class="journal-photo">
        <img
          :src="p.src"
          :alt="p.caption || `${entry.date} 第 ${i + 1} 张`"
          loading="lazy"
        />
        <figcaption v-if="p.caption">{{ p.caption }}</figcaption>
      </figure>
      <div v-if="hiddenCount > 0" class="journal-photo journal-photo--more">
        +{{ hiddenCount }}
      </div>
    </div>

    <!-- 时间线 -->
    <ol class="journal-timeline">
      <li v-for="(item, i) in entry.timeline" :key="i" class="tl-item">
        <span class="tl-time">{{ item.time }}</span>
        <span class="tl-rail"><span class="tl-dot" /></span>
        <span class="tl-text">
          <span v-if="item.icon" class="tl-icon">{{ item.icon }}</span>{{ item.text }}
        </span>
      </li>
    </ol>

    <!-- 收尾 -->
    <footer v-if="entry.note" class="journal-note">{{ entry.note }}</footer>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { JournalEntry } from '../data/journal'

const props = defineProps<{ entry: JournalEntry }>()

/** 最多展示 9 张，多的显示 +N */
const MAX_PHOTOS = 9

const visiblePhotos = computed(() => (props.entry.photos ?? []).slice(0, MAX_PHOTOS))
const hiddenCount = computed(() =>
  Math.max(0, (props.entry.photos?.length ?? 0) - MAX_PHOTOS)
)

/**
 * 排版规则（照片数 → 列数）
 * 0 张：不渲染
 * 1 张：整宽
 * 2-4 张：两列
 * 5+ 张：三列
 */
const photoCols = computed(() => {
  const n = visiblePhotos.value.length
  if (n <= 1) return 1
  if (n <= 4) return 2
  return 3
})
</script>

<style scoped>
.journal-card {
  background: rgba(19, 25, 32, 0.72);
  border: 1px solid rgba(0, 229, 192, 0.22);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.journal-card:hover {
  border-color: rgba(0, 229, 192, 0.45);
  box-shadow: 0 8px 32px rgba(0, 229, 192, 0.12);
}

/* ── 头部 ── */
.journal-head {
  padding: 22px 24px 16px;
  border-bottom: 1px solid rgba(200, 180, 220, 0.18);
}
.journal-date-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 6px;
}
.journal-date {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.875rem;
  font-weight: 600;
  color: #00E5C0;
  letter-spacing: 0.02em;
}
.journal-weekday {
  font-size: 0.8125rem;
  color: var(--liyou-text-muted, #9a93a8);
}
.journal-title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--liyou-text-primary, #3d3550);
  margin: 0;
}
.journal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}
.journal-tag {
  font-size: 0.75rem;
  padding: 2px 9px;
  border-radius: 999px;
  color: #b8829a;
  background: rgba(0, 229, 192, 0.12);
  border: 1px solid rgba(0, 229, 192, 0.22);
}

/* ── 照片 ── */
.journal-photos {
  display: grid;
  gap: 8px;
  padding: 16px 24px 0;
}
.journal-photos.cols-1 { grid-template-columns: 1fr; }
.journal-photos.cols-2 { grid-template-columns: repeat(2, 1fr); }
.journal-photos.cols-3 { grid-template-columns: repeat(3, 1fr); }

.journal-photo {
  margin: 0;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(0, 229, 192, 0.08);
}
.journal-photo img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}
/* 单张照片用 16:9，避免一张图占满整屏 */
.cols-1 .journal-photo img { aspect-ratio: 16 / 9; }

.journal-photo figcaption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 10px 6px;
  font-size: 0.75rem;
  color: #fff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent);
}
.journal-photo--more {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  font-size: 1rem;
  font-weight: 600;
  color: #b8829a;
}

/* ── 时间线 ── */
.journal-timeline {
  list-style: none;
  margin: 0;
  padding: 18px 24px 6px;
}
.tl-item {
  display: grid;
  grid-template-columns: 52px 18px 1fr;
  align-items: start;
  gap: 0;
}
.tl-time {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.8125rem;
  color: #a89bb8;
  padding-top: 1px;
}
.tl-rail {
  position: relative;
  display: block;
  width: 18px;
  align-self: stretch;
  min-height: 26px;
}
/* 竖线 */
.tl-rail::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(0, 229, 192, 0.3);
  transform: translateX(-50%);
}
.tl-item:first-child .tl-rail::before { top: 6px; }
.tl-item:last-child .tl-rail::before { bottom: calc(100% - 7px); }
.tl-dot {
  position: absolute;
  left: 50%;
  top: 4px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #00E5C0;
  transform: translateX(-50%);
  box-shadow: 0 0 0 3px rgba(0, 229, 192, 0.16);
}
.tl-text {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--liyou-text-secondary, #9BA9B8);
  padding-bottom: 12px;
}
.tl-icon { margin-right: 6px; }

/* ── 收尾 ── */
.journal-note {
  margin: 0 24px 22px;
  padding: 12px 16px;
  border-left: 3px solid rgba(255, 180, 84, 0.7);
  border-radius: 0 8px 8px 0;
  background: rgba(255, 180, 84, 0.08);
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #6b5f7a;
}

@media (max-width: 640px) {
  .journal-head { padding: 18px 16px 14px; }
  .journal-photos { padding: 14px 16px 0; }
  .journal-timeline { padding: 16px 16px 4px; }
  .journal-note { margin: 0 16px 18px; }
  .tl-item { grid-template-columns: 46px 16px 1fr; }
}
</style>
