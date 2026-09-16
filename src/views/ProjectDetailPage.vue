<template>
  <div class="pt-24 pb-4xl px-lg">
    <div class="max-w-content mx-auto">
      <!-- 项目不存在：直接列出全部项目，别让访客走进死胡同 -->
      <div v-if="!project" class="py-4xl">
        <div class="text-center mb-3xl">
          <span class="text-6xl block mb-lg opacity-60">🧭</span>
          <h1 class="text-heading-xl text-liyou-text-primary font-heading mb-md">找不到这个项目</h1>
          <p class="text-body-md text-liyou-text-muted">
            地址里的 <code class="diag-code">/projects/{{ slug }}</code> 不在作品集里。下面是全部项目：
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
          <ProjectCard v-for="p in projects" :key="p.slug" :project="p" />
        </div>
      </div>

      <template v-else>
        <!-- 返回 + 头部 -->
        <router-link
          to="/"
          class="inline-flex items-center gap-xs text-body-sm text-liyou-text-muted hover:text-liyou-pink no-underline mb-xl transition-colors"
        >← 返回首页</router-link>

        <div class="text-center mb-3xl">
          <div class="inline-flex flex-wrap items-center justify-center gap-sm mb-lg">
            <span class="text-body-sm px-lg py-sm rounded-full border border-liyou-pink/30 bg-liyou-pink/5 text-liyou-pink">{{ project.category }}</span>
            <span class="text-body-sm px-lg py-sm rounded-full border border-liyou-light-purple/30 bg-liyou-light-purple/10 text-liyou-light-purple">{{ project.status }}</span>
          </div>
          <p v-if="project.statusNote" class="proj-status-note">{{ project.statusNote }}</p>
          <div class="text-5xl mb-md">{{ project.icon }}</div>
          <GradientText size="xl">{{ project.name }}</GradientText>
          <p class="text-body-lg text-liyou-text-secondary mt-md">{{ project.tagline }}</p>
          <p v-if="project.upstream" class="proj-upstream">
            <span class="proj-upstream-mark">↳</span>{{ project.upstream }}
          </p>
        </div>

        <!-- 规模数据 -->
        <section v-if="project.scale?.length" class="flex flex-wrap items-center justify-center gap-md mb-4xl">
          <div v-for="s in project.scale" :key="s.label" class="scale-item">
            <span class="scale-value">{{ s.value }}</span>
            <span class="scale-label">{{ s.label }}</span>
          </div>
        </section>

        <!-- 截图（放在概念之前，访客先看东西再读文字） -->
        <section v-if="project.screenshots?.length" class="mb-4xl">
          <h2 class="text-heading-lg text-liyou-text-primary font-heading mb-lg">📷 截图</h2>
          <ProjectGallery :shots="project.screenshots" />
        </section>

        <!-- 概念 + 理念（标题在方框外，与「核心亮点」统一） -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-xl mb-4xl">
          <div class="flex flex-col">
            <h2 class="text-heading-lg text-liyou-text-primary font-heading mb-lg">💡 概念</h2>
            <SpotlightCard customClass="flex-1">
              <p class="text-body-md text-liyou-text-secondary leading-relaxed">{{ project.concept }}</p>
            </SpotlightCard>
          </div>
          <div class="flex flex-col">
            <h2 class="text-heading-lg text-liyou-text-primary font-heading mb-lg">🌱 理念</h2>
            <SpotlightCard customClass="flex-1">
              <p class="text-body-md text-liyou-text-secondary leading-relaxed">{{ project.philosophy }}</p>
            </SpotlightCard>
          </div>
        </section>

        <!-- 亮点 -->
        <section class="mb-4xl">
          <h2 class="text-heading-lg text-liyou-text-primary font-heading mb-lg">核心亮点</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
            <div
              v-for="(h, i) in project.highlights"
              :key="i"
              class="glass-card p-lg text-body-sm text-liyou-text-secondary flex items-center gap-sm"
            >
              <span class="text-liyou-pink">✦</span>{{ h }}
            </div>
          </div>
        </section>

        <!-- 架构 -->
        <section v-if="project.architecture?.length || project.fileTree" class="mb-4xl">
          <h2 class="text-heading-lg text-liyou-text-primary font-heading mb-lg">🧱 架构</h2>

          <div v-if="project.architecture?.length" class="arch-grid mb-xl">
            <div v-for="a in project.architecture" :key="a.layer" class="arch-item">
              <span class="arch-layer">{{ a.layer }}</span>
              <span class="arch-role">{{ a.role }}</span>
            </div>
          </div>

          <!-- 有逐文件数据 → 可展开的完整文件树（可能有多套代码库）；否则退回静态树 -->
          <template v-if="fileData">
            <div v-for="sec in fileData.sections" :key="sec.id" class="file-section">
              <h3 v-if="fileData.sections.length > 1" class="file-section-title">
                {{ sec.title }}
                <span class="file-section-count">{{ sec.total }} 个文件</span>
              </h3>
              <FileTree :data="sec" />
            </div>
          </template>

          <div v-else-if="project.fileTree" class="filetree-wrap">
            <div class="filetree-bar">
              <span class="ftdot ftdot-r"></span>
              <span class="ftdot ftdot-y"></span>
              <span class="ftdot ftdot-g"></span>
              <span class="filetree-title">目录结构 · 扫描真实项目生成</span>
            </div>
            <pre class="filetree">{{ project.fileTree }}</pre>
          </div>
        </section>

        <!-- 开发里程碑 / 迭代历程（数据来自 git tag 或实验构建） -->
        <section v-if="milestoneData" class="mb-4xl">
          <h2 class="text-heading-lg text-liyou-text-primary font-heading mb-lg">
            🧭 {{ milestoneData.title || '开发里程碑' }}
          </h2>
          <MilestoneTimeline :data="milestoneData" />
        </section>

        <!-- 技术栈 + 进展（标题同样在方框外） -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-xl mb-4xl">
          <div class="flex flex-col">
            <h2 class="text-heading-lg text-liyou-text-primary font-heading mb-lg">🛠️ 技术栈</h2>
            <GlassCard customClass="flex-1">
              <div class="flex flex-wrap gap-xs">
                <span
                  v-for="t in project.tech"
                  :key="t"
                  class="text-body-sm px-md py-xs rounded-full bg-liyou-light-purple/15 text-liyou-light-purple"
                >{{ t }}</span>
              </div>
            </GlassCard>
          </div>
          <div class="flex flex-col">
            <h2 class="text-heading-lg text-liyou-text-primary font-heading mb-lg">📈 进展</h2>
            <GlassCard customClass="flex-1">
              <div class="space-y-md">
                <div>
                  <p class="text-caption text-liyou-text-muted mb-xs">已完成</p>
                  <p class="text-body-sm text-liyou-text-secondary">{{ project.progress.done }}</p>
                </div>
                <div>
                  <p class="text-caption text-liyou-text-muted mb-xs">下一步</p>
                  <p class="text-body-sm text-liyou-text-secondary">{{ project.progress.next }}</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        <!-- 链接 CTA -->
        <section v-if="project.links?.length" class="flex flex-wrap items-center justify-center gap-md py-xl">
          <template v-for="l in project.links" :key="l.url">
            <router-link v-if="isInternal(l.url)" :to="l.url" class="btn-secondary no-underline">{{ l.label }}</router-link>
            <a v-else :href="l.url" target="_blank" rel="noopener" class="btn-primary no-underline">{{ l.label }}</a>
          </template>
        </section>

        <!-- 其他项目 -->
        <section class="mt-4xl pt-2xl border-t border-liyou-light-purple/20">
          <h2 class="text-heading-lg text-liyou-text-primary font-heading mb-lg text-center">更多项目</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
            <ProjectCard v-for="p in otherProjects" :key="p.slug" :project="p" />
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../data/projects'
import type { ProjectFiles } from '../data/files/types'
import type { ProjectMilestones } from '../data/milestones/types'
import GradientText from '../components/GradientText.vue'
import SpotlightCard from '../components/SpotlightCard.vue'
import GlassCard from '../components/GlassCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
import FileTree from '../components/FileTree.vue'
import MilestoneTimeline from '../components/MilestoneTimeline.vue'
import ProjectGallery from '../components/ProjectGallery.vue'
import { SITE } from '../constants'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
const project = computed(() => projects.find((p) => p.slug === slug.value))
const otherProjects = computed(() => projects.filter((p) => p.slug !== slug.value))

/**
 * 文件树 / 里程碑：每个项目一个模块，按需加载。
 * 不能把所有项目合成一个文件 —— 那样访问任何一个项目页都会下载全部数据。
 */
const fileModules = import.meta.glob<{ default: ProjectFiles }>('../data/files/*.ts')
const milestoneModules = import.meta.glob<{ default: ProjectMilestones }>('../data/milestones/*.ts')
const fileData = ref<ProjectFiles | null>(null)
const milestoneData = ref<ProjectMilestones | null>(null)

watchEffect(async () => {
  const s = slug.value
  const fLoader = fileModules[`../data/files/${s}.ts`]
  const mLoader = milestoneModules[`../data/milestones/${s}.ts`]
  fileData.value = fLoader ? (await fLoader()).default : null
  milestoneData.value = mLoader ? (await mLoader()).default : null
})

function isInternal(url: string) {
  return url.startsWith('/')
}

watchEffect(() => {
  if (project.value) {
    document.title = `${project.value.name} · ${SITE.name}`
    const descEl = document.querySelector('meta[name="description"]')
    if (descEl) descEl.setAttribute('content', project.value.tagline)
  }
})
</script>

<style scoped>
.diag-code {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.8125rem;
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--liyou-pink);
  background: rgba(0, 229, 192, 0.1);
}

/* 规模数据 */
.scale-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 12px 22px;
  border-radius: 10px;
  background: rgba(19, 25, 32, 0.7);
  border: 1px solid rgba(139, 154, 171, 0.18);
}
.scale-value {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--liyou-pink);
  line-height: 1.2;
}
.scale-label {
  font-size: 0.75rem;
  color: var(--liyou-text-muted);
}

/* 架构分层 */
.arch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}
.arch-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 18px;
  border-radius: 10px;
  background: rgba(19, 25, 32, 0.7);
  border: 1px solid rgba(139, 154, 171, 0.18);
  border-left: 3px solid rgba(0, 229, 192, 0.55);
}
.arch-layer {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--liyou-pink);
}
.arch-role {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--liyou-text-secondary);
}

/* 上游来源说明（非原创项目必须标明） */
.proj-upstream {
  display: inline-flex;
  align-items: baseline;
  gap: 7px;
  margin: 12px auto 0;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.8125rem;
  color: var(--liyou-text-muted);
  background: rgba(139, 154, 171, 0.1);
  border: 1px solid rgba(139, 154, 171, 0.22);
}
.proj-upstream-mark { color: var(--liyou-pink); }

/* 文件树 */
.filetree-wrap {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(139, 154, 171, 0.2);
  background: rgba(8, 11, 15, 0.85);
}

/* 一个项目有多套代码库时的分组标题 */
.file-section + .file-section { margin-top: 30px; }
.file-section-title {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 0 0 12px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--liyou-text-primary);
}
.file-section-count {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.6875rem;
  font-weight: 400;
  padding: 1px 8px;
  border-radius: 999px;
  color: var(--liyou-text-muted);
  background: rgba(139, 154, 171, 0.14);
}
.filetree-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 14px;
  background: rgba(19, 25, 32, 0.9);
  border-bottom: 1px solid rgba(139, 154, 171, 0.15);
}
.ftdot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.ftdot-r { background: #ff5f57; }
.ftdot-y { background: #febc2e; }
.ftdot-g { background: #28c840; }
.filetree-title {
  margin-left: 8px;
  font-size: 0.75rem;
  color: var(--liyou-text-muted);
}
.filetree {
  margin: 0;
  padding: 18px 20px;
  overflow-x: auto;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.8125rem;
  line-height: 1.75;
  color: #9fe8d8;
  white-space: pre;
  tab-size: 2;
}
@media (max-width: 640px) {
  .filetree { font-size: 0.6875rem; padding: 14px; }
}
</style>
