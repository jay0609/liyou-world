<template>
  <div class="filetree">
    <!-- 工具栏 -->
    <div class="ft-bar">
      <input
        v-model="q"
        class="ft-search"
        type="search"
        placeholder="搜索文件名 / 说明…（如「击退」「菜单」「确定性」）"
      />
      <span class="ft-stat">
        <template v-if="q">{{ matched }} 个命中</template>
        <template v-else>{{ data.total }} 个文件</template>
      </span>    </div>

    <!-- 树 -->
    <div class="ft-body">
      <FileTreeNode v-for="n in tree" :key="n.path" :node="n" :query="q" :depth="0" />
    </div>

    <p class="ft-foot">
      说明文字取自源码文件的头注释 —— 不是后补的文档，是写代码时留下的。
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FileTreeNode from './FileTreeNode.vue'
import type { ProjectFiles } from '../data/files/types'

const props = defineProps<{ data: ProjectFiles }>()

interface TreeNode {
  name: string
  path: string
  title?: string
  desc?: string
  children?: TreeNode[]
}

const q = ref('')

/** 把扁平路径列表搭成树 */
const tree = computed<TreeNode[]>(() => {
  const root: TreeNode[] = []
  const dirMap = new Map<string, TreeNode>()

  for (const f of props.data.files) {
    const parts = f.path.split('/')
    let level = root
    let acc = ''
    for (let i = 0; i < parts.length - 1; i++) {
      acc = acc ? `${acc}/${parts[i]}` : parts[i]
      let dir = dirMap.get(acc)
      if (!dir) {
        dir = { name: parts[i], path: acc, children: [] }
        dirMap.set(acc, dir)
        level.push(dir)
      }
      level = dir.children!
    }
    level.push({ name: parts[parts.length - 1], path: f.path, title: f.title, desc: f.desc })
  }
  return root
})

function countMatch(n: TreeNode, query: string): number {
  if (n.children) return n.children.reduce((s, c) => s + countMatch(c, query), 0)
  return n.name.toLowerCase().includes(query) ||
    (n.title ?? '').toLowerCase().includes(query) ||
    (n.desc ?? '').toLowerCase().includes(query)
    ? 1
    : 0
}

const matched = computed(() => {
  const query = q.value.trim().toLowerCase()
  if (!query) return props.data.total
  return tree.value.reduce((s, n) => s + countMatch(n, query), 0)
})
</script>

<style scoped>
.filetree {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(139, 154, 171, 0.2);
  background: rgba(8, 11, 15, 0.85);
}

/* 工具栏 */
.ft-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(19, 25, 32, 0.9);
  border-bottom: 1px solid rgba(139, 154, 171, 0.15);
}
.ft-search {
  flex: 1;
  min-width: 0;
  padding: 7px 12px;
  border-radius: 7px;
  border: 1px solid rgba(139, 154, 171, 0.25);
  background: rgba(8, 11, 15, 0.8);
  color: var(--liyou-text-primary);
  font-size: 0.8125rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s ease;
}
.ft-search:focus { border-color: rgba(0, 229, 192, 0.6); }
.ft-search::placeholder { color: var(--liyou-text-muted); }
.ft-stat {
  flex-shrink: 0;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.75rem;
  color: var(--liyou-pink);
}

/* 树 */
.ft-body {
  padding: 10px 0 12px;
  max-height: 640px;
  overflow-y: auto;
}

.ft-foot {
  margin: 0;
  padding: 10px 14px;
  border-top: 1px solid rgba(139, 154, 171, 0.12);
  font-size: 0.6875rem;
  color: var(--liyou-text-muted);
  background: rgba(19, 25, 32, 0.6);
}

@media (max-width: 640px) {
  .ft-body { max-height: 480px; }
  .ft-bar { flex-direction: column; align-items: stretch; gap: 8px; }
  .ft-stat { text-align: right; }
}
</style>
