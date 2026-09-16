<template>
  <div v-if="stats.albums.length" class="stats-gallery">
    <!-- 平台切换 -->
    <div v-if="stats.albums.length > 1" class="sg-tabs">
      <button
        v-for="(a, i) in stats.albums"
        :key="a.platform"
        class="sg-tab"
        :class="{ 'is-active': albumIndex === i }"
        type="button"
        @click="switchAlbum(i)"
      >
        <span class="sg-tab-badge">{{ a.icon }}</span>
        {{ a.platform }}
        <span class="sg-tab-count">{{ a.items.length }}</span>
      </button>
    </div>

    <!-- 当前相册 -->
    <div class="sg-grid">
      <figure v-for="(s, i) in current.items" :key="s.image" class="sg-item">
        <button class="sg-thumb" type="button" @click="open(i)">
          <img :src="s.image" :alt="s.title" loading="lazy" />
          <span class="sg-zoom">点击放大</span>
        </button>
        <figcaption class="sg-meta">
          <div class="sg-head">
            <span class="sg-date">{{ s.date }}</span>
            <span v-if="s.season" class="sg-season">{{ s.season }}</span>
          </div>
          <h3 class="sg-title">{{ s.title }}</h3>
          <p v-if="s.caption" class="sg-caption">{{ s.caption }}</p>
          <div v-if="s.stats?.length" class="sg-stats">
            <span v-for="c in s.stats" :key="c.label" class="sg-chip">
              <span class="sg-chip-label">{{ c.label }}</span>
              <span class="sg-chip-value">{{ c.value }}</span>
            </span>
          </div>
        </figcaption>
      </figure>
    </div>

    <!-- 大图查看：必须 Teleport 到 body，否则会被祖先的 backdrop-filter 关在容器里 -->
    <Teleport to="body">
      <transition name="lb-fade">
        <div v-if="active >= 0" class="lb-overlay" @click.self="close">
          <button class="lb-close" type="button" aria-label="关闭" @click="close">×</button>

          <button
            v-if="current.items.length > 1"
            class="lb-nav lb-prev"
            type="button"
            aria-label="上一张"
            @click.stop="step(-1)"
          >‹</button>

          <div class="lb-body">
            <img class="lb-img" :src="current.items[active].image" :alt="current.items[active].title" />
            <div class="lb-caption">
              <span class="lb-date">{{ current.items[active].date }}</span>
              <span v-if="current.items[active].season" class="lb-season">{{ current.items[active].season }}</span>
              <span class="lb-title">{{ current.items[active].title }}</span>
              <span v-if="current.items[active].caption" class="lb-desc">{{ current.items[active].caption }}</span>
            </div>
          </div>

          <button
            v-if="current.items.length > 1"
            class="lb-nav lb-next"
            type="button"
            aria-label="下一张"
            @click.stop="step(1)"
          >›</button>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { stats } from '../data/stats'

const albumIndex = ref(0)
const active = ref(-1)

const current = computed(() => stats.albums[albumIndex.value])

function switchAlbum(i: number) {
  albumIndex.value = i
  active.value = -1
}
function open(i: number) {
  active.value = i
}
function close() {
  active.value = -1
}
function step(d: number) {
  const n = current.value.items.length
  active.value = (active.value + d + n) % n
}

function onKey(e: KeyboardEvent) {
  if (active.value < 0) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') step(-1)
  else if (e.key === 'ArrowRight') step(1)
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
/* ── 平台切换 ── */
.sg-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 22px;
}
.sg-tab {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 0.8125rem;
  cursor: pointer;
  color: var(--liyou-text-secondary);
  background: rgba(19, 25, 32, 0.7);
  border: 1px solid rgba(139, 154, 171, 0.2);
  transition: all 0.2s ease;
}
.sg-tab:hover { border-color: rgba(0, 229, 192, 0.45); color: var(--liyou-pink); }
.sg-tab.is-active {
  color: #06120f;
  background: var(--liyou-pink);
  border-color: var(--liyou-pink);
}
.sg-tab-badge {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(0, 229, 192, 0.16);
  color: var(--liyou-pink);
}
.sg-tab.is-active .sg-tab-badge {
  background: rgba(6, 18, 15, 0.2);
  color: #06120f;
}
.sg-tab-count {
  font-size: 0.6875rem;
  opacity: 0.7;
}

/* ── 卡片 ── */
.sg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}
.sg-item {
  margin: 0;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(19, 25, 32, 0.7);
  border: 1px solid rgba(139, 154, 171, 0.18);
  transition: border-color 0.25s ease, transform 0.25s ease;
}
.sg-item:hover {
  border-color: rgba(0, 229, 192, 0.42);
  transform: translateY(-2px);
}
.sg-thumb {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: rgba(8, 11, 15, 0.9);
  cursor: zoom-in;
  overflow: hidden;
}
.sg-thumb img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.35s ease;
}
.sg-item:hover .sg-thumb img { transform: scale(1.03); }
.sg-zoom {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.6875rem;
  color: #e6edf3;
  background: rgba(4, 7, 10, 0.72);
  border: 1px solid rgba(139, 154, 171, 0.3);
  opacity: 0;
  transition: opacity 0.25s ease;
}
.sg-item:hover .sg-zoom { opacity: 1; }

.sg-meta { padding: 14px 16px 16px; }
.sg-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 6px;
}
.sg-date {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.75rem;
  color: var(--liyou-pink);
}
.sg-season {
  font-size: 0.6875rem;
  padding: 1px 7px;
  border-radius: 999px;
  color: var(--liyou-text-muted);
  background: rgba(139, 154, 171, 0.12);
}
.sg-title {
  margin: 0 0 4px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--liyou-text-primary);
}
.sg-caption {
  margin: 0 0 10px;
  font-size: 0.8125rem;
  color: var(--liyou-text-muted);
}
.sg-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.sg-chip {
  display: inline-flex;
  align-items: baseline;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 6px;
  background: rgba(0, 229, 192, 0.08);
  border: 1px solid rgba(0, 229, 192, 0.2);
}
.sg-chip-label { font-size: 0.6875rem; color: var(--liyou-text-muted); }
.sg-chip-value {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--liyou-pink);
}

/* ── 大图查看 ── */
.lb-overlay {
  position: fixed;
  inset: 0;
  z-index: 70;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  background: rgba(4, 7, 10, 0.94);
  backdrop-filter: blur(8px);
}
.lb-body {
  max-width: min(1100px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lb-img {
  max-width: 100%;
  max-height: 74vh;
  border-radius: 10px;
  border: 1px solid rgba(139, 154, 171, 0.25);
  background: #fff;
}
.lb-caption {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 10px;
  margin-top: 14px;
  font-size: 0.8125rem;
  color: var(--liyou-text-secondary);
}
.lb-date {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  color: var(--liyou-pink);
}
.lb-season {
  padding: 1px 8px;
  border-radius: 999px;
  font-size: 0.6875rem;
  color: var(--liyou-text-muted);
  background: rgba(139, 154, 171, 0.14);
}
.lb-title { color: var(--liyou-text-primary); font-weight: 600; }
.lb-desc { color: var(--liyou-text-muted); }

.lb-close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  color: var(--liyou-text-secondary);
  background: rgba(139, 154, 171, 0.12);
  border: 1px solid rgba(139, 154, 171, 0.25);
  transition: all 0.2s ease;
}
.lb-close:hover { color: #06120f; background: var(--liyou-pink); border-color: var(--liyou-pink); }

.lb-nav {
  flex-shrink: 0;
  width: 40px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  color: var(--liyou-text-secondary);
  background: rgba(19, 25, 32, 0.8);
  border: 1px solid rgba(139, 154, 171, 0.2);
  transition: all 0.2s ease;
}
.lb-nav:hover { color: var(--liyou-pink); border-color: rgba(0, 229, 192, 0.5); }

.lb-fade-enter-active,
.lb-fade-leave-active { transition: opacity 0.2s ease; }
.lb-fade-enter-from,
.lb-fade-leave-to { opacity: 0; }

@media (max-width: 640px) {
  .lb-overlay { padding: 12px; gap: 6px; }
  .lb-nav { width: 30px; height: 52px; font-size: 1.25rem; }
  .lb-img { max-height: 62vh; }
}
</style>
