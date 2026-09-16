<template>
  <div v-if="shots.length" class="pg">
    <!-- 主图 -->
    <figure class="pg-main">
      <button class="pg-main-btn" type="button" @click="open(activeIdx)">
        <img :src="shots[activeIdx].image" :alt="shots[activeIdx].caption || '项目截图'" />
        <span class="pg-zoom">点击放大</span>
      </button>
      <figcaption class="pg-cap">
        <span v-if="shots[activeIdx].date" class="pg-date">{{ shots[activeIdx].date }}</span>
        <span class="pg-text">{{ shots[activeIdx].caption }}</span>
      </figcaption>
    </figure>

    <!-- 缩略图条 -->
    <div v-if="shots.length > 1" class="pg-strip">
      <button
        v-for="(s, i) in shots"
        :key="i"
        class="pg-thumb"
        :class="{ 'is-active': i === activeIdx }"
        type="button"
        @click="activeIdx = i"
      >
        <img :src="s.image" :alt="s.caption || ''" loading="lazy" />
      </button>
    </div>

    <!-- 全屏 -->
    <Teleport to="body">
      <transition name="pg-fade">
        <div v-if="lightbox" class="pg-overlay" @click.self="lightbox = false">
          <button class="pg-x" type="button" aria-label="关闭" @click="lightbox = false">×</button>
          <button v-if="shots.length > 1" class="pg-nav pg-prev" type="button" @click.stop="step(-1)">‹</button>
          <div class="pg-full">
            <img :src="shots[activeIdx].image" :alt="shots[activeIdx].caption || ''" />
            <p class="pg-full-cap">
              <span v-if="shots[activeIdx].date" class="pg-date">{{ shots[activeIdx].date }}</span>
              {{ shots[activeIdx].caption }}
            </p>
          </div>
          <button v-if="shots.length > 1" class="pg-nav pg-next" type="button" @click.stop="step(1)">›</button>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Shot {
  image: string
  caption: string
  date?: string
}

const props = defineProps<{ shots: Shot[] }>()

const activeIdx = ref(0)
const lightbox = ref(false)

function open(i: number) {
  activeIdx.value = i
  lightbox.value = true
}
function step(d: number) {
  const n = props.shots.length
  activeIdx.value = (activeIdx.value + d + n) % n
}
function onKey(e: KeyboardEvent) {
  if (!lightbox.value) return
  if (e.key === 'Escape') lightbox.value = false
  else if (e.key === 'ArrowLeft') step(-1)
  else if (e.key === 'ArrowRight') step(1)
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.pg-main { margin: 0 0 12px; }
.pg-main-btn {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 1px solid rgba(139, 154, 171, 0.25);
  border-radius: 12px;
  overflow: hidden;
  background: rgba(8, 11, 15, 0.9);
  cursor: zoom-in;
}
.pg-main-btn img { display: block; width: 100%; }
.pg-zoom {
  position: absolute;
  right: 12px;
  bottom: 12px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.6875rem;
  color: #e6edf3;
  background: rgba(4, 7, 10, 0.75);
  border: 1px solid rgba(139, 154, 171, 0.3);
  opacity: 0;
  transition: opacity 0.25s ease;
}
.pg-main-btn:hover .pg-zoom { opacity: 1; }

.pg-cap {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px;
  margin-top: 10px;
  font-size: 0.8125rem;
  color: var(--liyou-text-secondary);
}
.pg-date {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.75rem;
  color: var(--liyou-pink);
}

.pg-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.pg-thumb {
  width: 108px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: none;
  opacity: 0.55;
  transition: all 0.2s ease;
}
.pg-thumb img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
.pg-thumb:hover { opacity: 0.85; }
.pg-thumb.is-active { border-color: var(--liyou-pink); opacity: 1; }

/* 全屏 */
.pg-overlay {
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
.pg-full { max-width: min(1200px, 100%); text-align: center; }
.pg-full img {
  max-width: 100%;
  max-height: 76vh;
  border-radius: 10px;
  border: 1px solid rgba(139, 154, 171, 0.25);
}
.pg-full-cap {
  margin: 14px 0 0;
  font-size: 0.8125rem;
  color: var(--liyou-text-secondary);
}
.pg-x {
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
  cursor: pointer;
  color: var(--liyou-text-secondary);
  background: rgba(139, 154, 171, 0.12);
  border: 1px solid rgba(139, 154, 171, 0.25);
}
.pg-x:hover { color: #06120f; background: var(--liyou-pink); }
.pg-nav {
  flex-shrink: 0;
  width: 40px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 1.75rem;
  cursor: pointer;
  color: var(--liyou-text-secondary);
  background: rgba(19, 25, 32, 0.8);
  border: 1px solid rgba(139, 154, 171, 0.2);
}
.pg-nav:hover { color: var(--liyou-pink); border-color: rgba(0, 229, 192, 0.5); }

.pg-fade-enter-active, .pg-fade-leave-active { transition: opacity 0.2s ease; }
.pg-fade-enter-from, .pg-fade-leave-to { opacity: 0; }

@media (max-width: 640px) {
  .pg-overlay { padding: 12px; gap: 6px; }
  .pg-nav { width: 30px; height: 52px; font-size: 1.25rem; }
  .pg-thumb { width: 78px; }
}
</style>
