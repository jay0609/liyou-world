<template>
  <div class="pt-24 pb-4xl px-lg">
    <div class="max-w-content mx-auto">
      <router-link to="/projects/liyou-mirage" class="inline-flex items-center gap-xs text-body-sm text-liyou-text-muted hover:text-liyou-pink no-underline mb-xl transition-colors">← 返回璃幽灵境</router-link>
      <div class="text-center mb-3xl">
        <GradientText size="xl">璃幽 · 书灵志</GradientText>
        <p class="text-body-lg text-liyou-text-secondary max-w-xl mx-auto mt-lg">她是《万物书》的书灵，也是次元解忧杂货店的主人。</p>
      </div>

      <!-- 角色档案 -->
      <section class="mb-4xl">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-xl border-l-4 border-liyou-pink pl-md">角色档案</h2>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          <SpotlightCard customClass="lg:col-span-1 flex flex-col items-center text-center">
            <div class="w-48 h-48 rounded-full bg-liyou-light-purple-soft/50 flex items-center justify-center mb-lg relative">
              <span class="text-6xl">🌸</span>
              <span class="absolute -top-2 -right-2 text-lg animate-bounce">✨</span>
            </div>
            <h3 class="text-heading-lg text-liyou-pink font-display mb-sm">璃幽</h3>
            <p class="text-body-sm text-liyou-text-muted">Liyou · 书灵</p>
            <div class="flex gap-sm mt-md text-liyou-text-muted/40 text-sm">
              <span>📖</span><span>🌸</span><span>✨</span><span>💜</span>
            </div>
          </SpotlightCard>

          <GlassCard customClass="lg:col-span-2">
            <div class="space-y-lg">
              <div><h4 class="text-heading-md text-liyou-text-primary font-heading mb-sm">身份</h4><p class="text-body-md text-liyou-text-secondary">《万物书》的书灵，次元解忧杂货店的店主。跨越次元的旅人，以文字与故事治愈灵魂。</p></div>
              <div><h4 class="text-heading-md text-liyou-text-primary font-heading mb-sm">年龄</h4><p class="text-body-md text-liyou-text-secondary">外观约16岁，实际年龄未知（自《万物书》诞生起便存在）</p></div>
              <div><h4 class="text-heading-md text-liyou-text-primary font-heading mb-sm">性格</h4><p class="text-body-md text-liyou-text-secondary">温柔而坚定，对万物抱有好奇心。偶尔调皮，喜欢在书页空白处写小小的批注。相信"每个灵魂都值得被倾听"。</p></div>
              <div><h4 class="text-heading-md text-liyou-text-primary font-heading mb-sm">标志物</h4><p class="text-body-md text-liyou-text-secondary">发间别着一枚<b class="text-liyou-pink">物书发卡</b>——《万物书》的缩影，辉光流转间可见星尘与文字。</p></div>
            </div>
          </GlassCard>
        </div>
      </section>

      <!-- 世界观 -->
      <section class="mb-4xl">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-xl border-l-4 border-liyou-pink pl-md">《万物书》与世界</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-xl">
          <SpotlightCard>
            <h3 class="text-heading-md text-liyou-text-primary font-heading mb-sm">📕 什么是《万物书》？</h3>
            <p class="text-body-md text-liyou-text-secondary leading-relaxed">《万物书》是一本存在于次元之间的神秘典籍。它记载着一切有灵之物的故事——无论是一颗星辰、一朵花、还是一个迷路的灵魂。璃幽是它的守护者与朗读者。</p>
          </SpotlightCard>
          <SpotlightCard>
            <h3 class="text-heading-md text-liyou-text-primary font-heading mb-sm">🏪 次元解忧杂货店</h3>
            <p class="text-body-md text-liyou-text-secondary leading-relaxed">坐落于次元的缝隙之间，外表是一家小小的杂货店，内里却通连无数世界。来客可以从书架上取下任意一本书，阅读其中某个灵魂的故事，带走一份温暖。</p>
          </SpotlightCard>
        </div>
      </section>

      <!-- 🎮 VN 对话模式：璃幽的起源 -->
      <section class="mb-4xl">
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-xl border-l-4 border-liyou-pink pl-md">璃幽的起源</h2>

        <div class="vn-scene glass-card overflow-hidden relative" @click="advanceStory">
          <!-- VN 背景层 -->
          <div class="vn-bg absolute inset-0 bg-liyou-deep-indigo/95"></div>
          <div class="vn-bg-particles absolute inset-0 opacity-30"></div>

          <!-- 角色立绘区（左） -->
          <div class="vn-character absolute left-0 bottom-0 w-[45%] h-[85%] flex items-end justify-center z-10 pointer-events-none">
            <div class="vn-sprite w-48 h-64 sm:w-56 sm:h-80 rounded-t-2xl bg-liyou-light-purple/10 border border-liyou-light-purple/15 border-b-0 flex flex-col items-center justify-center">
              <span class="text-7xl sm:text-8xl mb-sm">🌸</span>
              <span class="text-body-sm text-liyou-pink-glow font-display">{{ currentSpeaker === '璃幽' ? '璃幽' : '?' }}</span>
            </div>
          </div>

          <!-- 对话框（底部） -->
          <div class="vn-dialog absolute bottom-0 left-0 right-0 z-20 p-lg sm:p-xl" @click.stop>
            <div class="glass-card p-lg sm:p-xl" style="background:rgba(30,24,51,0.85);border-color:rgba(232,160,180,0.2);">
              <div v-if="currentSpeaker" class="flex items-center gap-sm mb-sm">
                <span class="w-3 h-3 rounded-full" :class="currentSpeaker === '璃幽' ? 'bg-liyou-pink' : 'bg-liyou-glow-gold'"></span>
                <span class="text-body-sm font-semibold" :class="currentSpeaker === '璃幽' ? 'text-liyou-pink' : 'text-liyou-glow-gold'">
                  {{ currentSpeaker }}
                </span>
              </div>
              <p class="text-body-lg text-liyou-star-white leading-relaxed" style="min-height:3em;">
                <TypedText :strings="[currentLine]" :typeSpeed="40" :showCursor="true" @complete="isTyping = false" />
              </p>

              <!-- 选项（如果有） -->
              <div v-if="currentOptions.length > 0" class="flex flex-col gap-sm mt-lg">
                <button v-for="(opt, oi) in currentOptions" :key="oi" class="vn-option text-left text-body-md text-liyou-light-purple hover:text-liyou-pink transition-colors py-sm px-md border border-liyou-light-purple/20 rounded-card hover:border-liyou-pink/40" @click.stop="chooseOption(oi)">
                  {{ opt.label }}
                </button>
              </div>

              <!-- 继续提示 -->
              <div v-if="currentOptions.length === 0 && !isTyping" class="text-right mt-md">
                <span class="text-caption text-liyou-text-muted/60 animate-pulse">点击继续 →</span>
              </div>
            </div>
          </div>

          <!-- 章节标题覆盖 -->
          <transition name="vn-fade">
            <div v-if="showChapterTitle" class="absolute inset-0 z-30 flex items-center justify-center bg-liyou-deep-indigo/80" @click.stop="showChapterTitle = false">
              <div class="text-center">
                <h2 class="text-display-lg text-liyou-pink-glow font-display mb-md">璃幽的起源</h2>
                <p class="text-body-lg text-liyou-light-purple">—— 万物之始 ——</p>
                <p class="text-caption text-liyou-text-muted/50 mt-2xl">点击开始阅读</p>
              </div>
            </div>
          </transition>
        </div>
      </section>

      <!-- 插画廊 -->
      <section>
        <h2 class="text-heading-xl text-liyou-text-primary font-heading mb-xl border-l-4 border-liyou-pink pl-md">插画 & 漫画</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-md">
          <div v-for="i in 4" :key="i" class="glass-card aspect-square flex items-center justify-center text-liyou-text-muted text-body-sm cursor-pointer hover:border-liyou-pink/40 transition-colors">
            <span>插画 {{ i }}</span>
          </div>
        </div>
        <p class="text-center text-body-sm text-liyou-text-muted mt-lg">更多插画与漫画即将上线 ✨</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import GlassCard from '../components/GlassCard.vue'
import SpotlightCard from '../components/SpotlightCard.vue'
import GradientText from '../components/GradientText.vue'
import TypedText from '../components/TypedText.vue'
import { storyLines, type StoryLine } from '../data/story'

const story: StoryLine[] = storyLines

const lineIndex = ref(0)
const showChapterTitle = ref(true)
const isTyping = ref(true)
const currentOptions = ref<{ label: string; next: number }[]>([])

const currentLine = computed(() => story[lineIndex.value]?.text || '')
const currentSpeaker = computed(() => story[lineIndex.value]?.speaker || '')

function advanceStory() {
  if (showChapterTitle.value) {
    showChapterTitle.value = false
    return
  }
  if (currentOptions.value.length > 0) return
  if (lineIndex.value < story.length - 1) {
    isTyping.value = true
    lineIndex.value++
    currentOptions.value = story[lineIndex.value].options || []
  }
}

function chooseOption(i: number) {
  const opt = currentOptions.value[i]
  if (opt) {
    isTyping.value = true
    lineIndex.value = opt.next
    currentOptions.value = []
  }
}
</script>

<style scoped>
.vn-scene {
  min-height: 500px;
  height: 70vh;
  max-height: 700px;
  cursor: pointer;
  user-select: none;
}

@media (max-width: 640px) {
  .vn-scene { height: 60vh; min-height: 400px; }
  .vn-character { width: 40%; }
  .vn-sprite { width: 120px; height: 200px; }
}

.vn-fade-enter-active, .vn-fade-leave-active { transition: opacity 0.5s ease; }
.vn-fade-enter-from, .vn-fade-leave-to { opacity: 0; }

.vn-option {
  cursor: pointer;
  transition: all 0.2s ease;
}
.vn-option:hover {
  background: rgba(0, 229, 192, 0.08);
}
</style>
