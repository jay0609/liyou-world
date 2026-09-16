<template>
  <!-- 目录节点 -->
  <div v-if="isDir">
    <button class="ftn-row ftn-row--dir" type="button" :style="indent" @click="open = !open">
      <span class="ftn-caret">{{ expanded ? '▾' : '▸' }}</span>
      <span class="ftn-name">{{ node.name }}/</span>
      <span class="ftn-count">{{ fileCount }}</span>
    </button>
    <div v-show="expanded">
      <FileTreeNode
        v-for="c in node.children"
        :key="c.path"
        :node="c"
        :query="query"
        :depth="depth + 1"
      />
    </div>
  </div>

  <!-- 文件节点 -->
  <div v-else>
    <button
      class="ftn-row ftn-row--file"
      :class="{ 'is-open': detail }"
      type="button"
      :style="indent"
      @click="detail = !detail"
    >
      <span class="ftn-caret">{{ node.desc ? (detail ? '▾' : '▸') : '·' }}</span>
      <span class="ftn-name">{{ node.name }}</span>
      <span class="ftn-title">{{ node.title || '—' }}</span>
    </button>
    <div v-show="detail && node.desc" class="ftn-desc" :style="descIndent">{{ node.desc }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface TreeNode {
  name: string
  path: string
  title?: string
  desc?: string
  children?: TreeNode[]
}

const props = defineProps<{
  node: TreeNode
  query: string
  depth: number
}>()

/** 顶层目录默认展开 */
const open = ref(props.depth === 0)
const detail = ref(false)

const isDir = computed(() => Array.isArray(props.node.children))

const indent = computed(() => ({ paddingLeft: `${8 + props.depth * 14}px` }))
const descIndent = computed(() => ({ marginLeft: `${8 + props.depth * 14 + 14}px` }))

function countFiles(n: TreeNode): number {
  if (!n.children) return 1
  return n.children.reduce((s, c) => s + countFiles(c), 0)
}

function subtreeMatch(n: TreeNode, q: string): boolean {
  if (n.children) return n.children.some((c) => subtreeMatch(c, q))
  return (
    n.name.toLowerCase().includes(q) ||
    (n.title ?? '').toLowerCase().includes(q) ||
    (n.desc ?? '').toLowerCase().includes(q)
  )
}

const fileCount = computed(() => countFiles(props.node))

/** 搜索时：命中的子树自动展开 */
const expanded = computed(() =>
  props.query ? subtreeMatch(props.node, props.query.toLowerCase()) : open.value
)
</script>

<style scoped>
.ftn-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  width: 100%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 10px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.8125rem;
  line-height: 1.6;
  transition: background 0.15s ease;
}
.ftn-row:hover { background: rgba(0, 229, 192, 0.06); }

.ftn-caret {
  flex-shrink: 0;
  width: 10px;
  color: var(--liyou-text-muted);
  font-size: 0.6875rem;
}

.ftn-row--dir .ftn-name {
  color: var(--liyou-pink);
  font-weight: 700;
}
.ftn-row--dir .ftn-count {
  margin-left: auto;
  padding: 0 7px;
  border-radius: 999px;
  font-size: 0.625rem;
  color: var(--liyou-text-muted);
  background: rgba(139, 154, 171, 0.14);
}

.ftn-row--file .ftn-name {
  color: var(--liyou-text-primary);
  white-space: nowrap;
}
.ftn-row--file .ftn-title {
  flex: 1;
  min-width: 0;
  color: var(--liyou-text-muted);
  font-size: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ftn-row--file.is-open .ftn-title { color: var(--liyou-text-secondary); white-space: normal; }

.ftn-desc {
  padding: 8px 12px 10px;
  margin-bottom: 6px;
  border-left: 2px solid rgba(0, 229, 192, 0.35);
  border-radius: 0 6px 6px 0;
  background: rgba(0, 229, 192, 0.05);
  font-size: 0.75rem;
  line-height: 1.85;
  color: var(--liyou-text-secondary);
  white-space: pre-wrap;
}
</style>
