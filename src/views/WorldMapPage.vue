<template>
  <div class="relative min-h-screen bg-liyou-deep-indigo overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <vue-particles
        id="world-map-particles"
        class="absolute inset-0"
        :options="particleOptions"
        :particles-init="particlesInit"
      />
    </div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-liyou-pink/5 blur-[150px] pointer-events-none"></div>

    <div class="relative z-10 pt-20 pb-4xl px-lg">
      <div class="max-w-content mx-auto text-center mb-2xl">
        <h1
          class="text-display-lg font-display tracking-wider mb-md"
          style="color: #F0C0D0; text-shadow: 0 0 30px rgba(240, 192, 208, 0.4)"
        >
          次元星图
        </h1>
        <p class="text-body-md text-liyou-light-purple/70">点击星图节点，探索璃幽宇宙</p>
      </div>

      <div class="relative max-w-4xl mx-auto" style="min-height: 550px">
        <!-- 连线 SVG -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none z-10" style="min-height: 550px">
          <line
            v-for="(line, i) in visibleLines"
            :key="i"
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            :stroke="line.isActive ? 'rgba(232,160,180,0.4)' : 'rgba(196,181,212,0.1)'"
            stroke-width="1.5"
            stroke-dasharray="4 6"
          >
            <animate
              v-if="line.isActive"
              attributeName="stroke-dashoffset"
              from="20"
              to="0"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
        </svg>

        <!-- 节点 -->
        <div
          v-for="node in nodes"
          :key="node.id"
          class="map-node glass-card absolute z-20 cursor-pointer flex flex-col items-center gap-xs p-md text-center"
          :class="{ 'map-node--active': selectedNodeId === node.id }"
          :style="{ left: node.x + '%', top: node.y + '%', transform: 'translate(-50%, -50%)' }"
          @click="selectNode(node)"
        >
          <span class="text-2xl sm:text-3xl">{{ node.icon }}</span>
          <span class="text-body-sm font-semibold text-liyou-star-white font-heading whitespace-nowrap">
            {{ node.name }}
          </span>
          <span class="text-caption text-liyou-text-muted/50">{{ node.sub }}</span>
        </div>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <transition name="dialog-slide">
      <div
        v-if="dialogOpen"
        class="fixed bottom-0 left-0 right-0 z-50 p-lg sm:p-xl"
        @click.self="dialogOpen = false"
      >
        <div
          class="glass-card max-w-2xl mx-auto p-xl"
          style="background: rgba(30, 24, 51, 0.92); border-color: rgba(232, 160, 180, 0.25)"
        >
          <div class="flex items-center justify-between mb-lg">
            <div class="flex items-center gap-sm">
              <span class="text-2xl">{{ selectedNode?.icon }}</span>
              <div>
                <h3 class="text-heading-md text-liyou-pink-glow font-heading">{{ selectedNode?.name }}</h3>
                <p class="text-caption text-liyou-text-muted">{{ selectedNode?.sub }}</p>
              </div>
            </div>
            <button
              class="btn-ghost text-liyou-text-muted hover:text-liyou-pink text-xl p-xs"
              @click="dialogOpen = false"
            >
              ✕
            </button>
          </div>

          <div class="rounded-card p-lg" style="min-height: 160px; background: rgba(30, 24, 51, 0.6)">
            <span
              v-if="currentLoreSpeaker"
              class="text-caption px-sm py-xs rounded-full inline-block mb-sm"
              :class="
                currentLoreSpeaker === selectedNode?.name
                  ? 'bg-liyou-pink/15 text-liyou-pink'
                  : 'bg-liyou-glow-gold/15 text-liyou-glow-gold'
              "
            >
              {{ currentLoreSpeaker }}
            </span>
            <p class="text-body-lg text-liyou-star-white leading-relaxed" style="min-height: 3em">
              {{ currentLoreText }}
            </p>
          </div>

          <div class="flex items-center justify-between mt-lg">
            <span class="text-caption text-liyou-text-muted/60">
              {{ loreIndex + 1 }}/{{ (selectedNode?.lore || []).length }}
            </span>
            <div class="flex gap-sm">
              <button
                class="btn-ghost text-liyou-text-muted hover:text-liyou-pink text-body-sm"
                @click="prevLore"
                :disabled="loreIndex === 0"
              >
                ←
              </button>
              <button
                v-if="loreIndex < (selectedNode?.lore || []).length - 1"
                class="btn-primary text-sm py-sm px-lg"
                @click="nextLore"
              >
                继续 →
              </button>
              <button
                v-else
                class="btn-ghost text-liyou-pink text-body-sm"
                @click="dialogOpen = false"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'
import { worldMapNodes, type WorldMapNode } from '../data/worldMapNodes'

const nodes = worldMapNodes

// ---- 状态 ----
const selectedNodeId = ref('')
const dialogOpen = ref(false)
const loreIndex = ref(0)

// ---- 计算属性 ----
const selectedNode = computed(() => nodes.find((n) => n.id === selectedNodeId.value))
const currentLoreText = computed(() => selectedNode.value?.lore[loreIndex.value]?.t || '')
const currentLoreSpeaker = computed(() => selectedNode.value?.lore[loreIndex.value]?.s || '')

/** 连线数据：高亮当前选中节点及其关联节点之间的连线 */
const visibleLines = computed(() => {
  const lines: { x1: string; y1: string; x2: string; y2: string; isActive: boolean }[] = []
  nodes.forEach((node) => {
    node.conn.forEach((targetId) => {
      const target = nodes.find((x) => x.id === targetId)
      if (target) {
        lines.push({
          x1: node.x + '%',
          y1: node.y + '%',
          x2: target.x + '%',
          y2: target.y + '%',
          isActive: selectedNodeId.value === node.id || selectedNodeId.value === targetId,
        })
      }
    })
  })
  return lines
})

// ---- 方法 ----
function selectNode(node: WorldMapNode) {
  selectedNodeId.value = node.id
  loreIndex.value = 0
  dialogOpen.value = true
}

function nextLore() {
  if (loreIndex.value < (selectedNode.value?.lore.length || 0) - 1) {
    loreIndex.value++
  }
}

function prevLore() {
  if (loreIndex.value > 0) {
    loreIndex.value--
  }
}

// ---- tsParticles ----
const particlesInit = async (engine: Engine) => {
  await loadSlim(engine)
}

const particleOptions = {
  fullScreen: false,
  fpsLimit: 60,
  particles: {
    number: { value: 80, density: { enable: true } },
    color: { value: ['#FFFFFF', '#F0C0D0', '#C4B5D4'] },
    shape: { type: 'circle' as const },
    opacity: {
      value: { min: 0.1, max: 0.5 },
      animation: { enable: true, speed: 0.4, sync: false },
    },
    size: { value: { min: 0.5, max: 2.5 } },
    move: {
      enable: true,
      speed: 0.2,
      direction: 'none' as const,
      random: true,
      outModes: { default: 'bounce' as const },
    },
  },
  detectRetina: true,
}
</script>

<style scoped>
.map-node {
  background: rgba(30, 24, 51, 0.75);
  border-color: rgba(196, 181, 212, 0.15);
  min-width: 60px;
}
.map-node:hover {
  border-color: rgba(232, 160, 180, 0.4);
  background: rgba(45, 38, 72, 0.85);
  box-shadow: 0 0 30px rgba(232, 160, 180, 0.15);
}
.map-node--active {
  border-color: rgba(232, 160, 180, 0.5);
  box-shadow: 0 0 40px rgba(232, 160, 180, 0.25);
}

@media (max-width: 640px) {
  .map-node {
    min-width: 48px;
    padding: 6px;
  }
  .map-node span {
    font-size: 0.65rem !important;
  }
}

.dialog-slide-enter-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.dialog-slide-leave-active {
  transition: all 0.25s ease;
}
.dialog-slide-enter-from,
.dialog-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
