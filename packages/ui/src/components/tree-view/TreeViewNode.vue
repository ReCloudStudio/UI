<template>
  <li role="none">
    <div
      :id="`tree-item-${node.id}`"
      role="treeitem"
      :aria-level="level"
      :aria-expanded="hasChildren ? expanded : undefined"
      :aria-selected="selected"
      :aria-disabled="node.disabled || undefined"
      :aria-checked="checkable ? (checkState === 'partial' ? 'mixed' : checkState === 'checked') : undefined"
      :class="cn('group flex min-h-8 items-center gap-1 rounded-md pr-2 text-sm outline-none transition-colors', selected ? 'bg-blue-50 text-[#1E63CE] dark:bg-blue-950/50 dark:text-[#70ACFE]' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800', node.disabled && 'pointer-events-none opacity-45')"
      :style="{ paddingLeft: `${(level - 1) * 1.25 + 0.375}rem` }"
      tabindex="0"
      @click="selectNode"
      @keydown="onKeydown"
    >
      <button v-if="hasChildren" type="button" class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200" :aria-label="expanded ? `收起 ${node.label}` : `展开 ${node.label}`" @click.stop="emit('toggle', node.id)"><svg :class="cn('h-3.5 w-3.5 transition-transform', expanded && 'rotate-90')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6" /></svg></button><span v-else class="w-6 shrink-0" />
      <input v-if="checkable" type="checkbox" :checked="checkState === 'checked'" :indeterminate="checkState === 'partial'" :aria-label="`选择 ${node.label}`" class="h-4 w-4 shrink-0 accent-[#2563EB]" @click.stop @change="emit('check', node)" />
      <span class="truncate">{{ node.label }}</span>
    </div>
    <ul v-if="hasChildren && expanded" role="group"><TreeViewNode v-for="child in node.children" :key="child.id" :node="child" :level="level + 1" :expanded-ids="expandedIds" :selected-id="selectedId" :checked-ids="checkedIds" :checkable="checkable" @toggle="emit('toggle', $event)" @select="emit('select', $event)" @check="emit('check', $event)" @navigate="emit('navigate', $event)" /></ul>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'
import type { TreeNode } from './types'

defineOptions({ name: 'TreeViewNode' })
const props = defineProps<{ node: TreeNode; level: number; expandedIds: string[]; selectedId?: string; checkedIds: string[]; checkable: boolean }>()
const emit = defineEmits<{ (event: 'toggle', id: string): void; (event: 'select', id: string): void; (event: 'check', node: TreeNode): void; (event: 'navigate', payload: { event: KeyboardEvent; node: TreeNode }): void }>()
const hasChildren = computed(() => Boolean(props.node.children?.length))
const expanded = computed(() => props.expandedIds.includes(props.node.id))
const selected = computed(() => props.selectedId === props.node.id)
const descendantIds = computed(() => { const ids: string[] = []; const visit = (entry: TreeNode) => entry.children?.forEach((child) => { ids.push(child.id); visit(child) }); visit(props.node); return ids })
const checkState = computed(() => { const ids = [props.node.id, ...descendantIds.value]; const count = ids.filter((id) => props.checkedIds.includes(id)).length; return count === 0 ? 'unchecked' : count === ids.length ? 'checked' : 'partial' })
function selectNode() { if (!props.node.disabled) emit('select', props.node.id) }
function onKeydown(event: KeyboardEvent) { if (!props.node.disabled) emit('navigate', { event, node: props.node }) }
</script>
