<template>
  <ul role="tree" :aria-label="props.label" :class="cn('space-y-0.5 rounded-xl bg-white p-2 ring-1 ring-inset ring-slate-200 dark:bg-[#0F172A] dark:ring-slate-800', props.class)">
    <TreeViewNode v-for="node in props.nodes" :key="node.id" :node="node" :level="1" :expanded-ids="expandedIds" :selected-id="props.modelValue" :checked-ids="props.checkedIds" :checkable="props.checkable" @toggle="toggle" @select="select" @check="toggleChecked" @navigate="navigate" />
  </ul>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { cn } from '../../utils/cn'
import TreeViewNode from './TreeViewNode.vue'
import type { TreeNode } from './types'

export interface TreeViewProps {
  nodes: TreeNode[]
  modelValue?: string
  expandedIds?: string[]
  defaultExpandedIds?: string[]
  checkedIds?: string[]
  checkable?: boolean
  cascade?: boolean
  label?: string
  class?: string
}
const props = withDefaults(defineProps<TreeViewProps>(), { modelValue: undefined, expandedIds: undefined, defaultExpandedIds: () => [], checkedIds: () => [], checkable: false, cascade: true, label: '树形目录', class: '' })
const emit = defineEmits<{ (event: 'update:modelValue', value: string): void; (event: 'update:expandedIds', value: string[]): void; (event: 'update:checkedIds', value: string[]): void; (event: 'select', node: TreeNode): void; (event: 'toggle', node: TreeNode): void; (event: 'check', payload: { node: TreeNode; checked: boolean }): void }>()
const internalExpanded = ref([...props.defaultExpandedIds])
const isControlledExpanded = computed(() => props.expandedIds !== undefined)
const expandedIds = computed(() => isControlledExpanded.value ? props.expandedIds! : internalExpanded.value)
const visibleNodes = computed(() => { const list: TreeNode[] = []; const visit = (nodes: TreeNode[]) => nodes.forEach((node) => { list.push(node); if (node.children?.length && expandedIds.value.includes(node.id)) visit(node.children) }); visit(props.nodes); return list })
watch(() => props.defaultExpandedIds, (value) => { if (!isControlledExpanded.value) internalExpanded.value = [...value] })
function toggle(id: string) { const node = findNode(id); if (!node || node.disabled) return; const next = expandedIds.value.includes(id) ? expandedIds.value.filter((value) => value !== id) : [...expandedIds.value, id]; if (!isControlledExpanded.value) internalExpanded.value = next; emit('update:expandedIds', next); emit('toggle', node) }
function select(id: string) { const node = findNode(id); if (!node || node.disabled) return; emit('update:modelValue', id); emit('select', node) }
function toggleChecked(node: TreeNode) { if (node.disabled) return; const affected = props.cascade ? [node.id, ...descendants(node)] : [node.id]; const allChecked = affected.every((id) => props.checkedIds.includes(id)); const next = allChecked ? props.checkedIds.filter((id) => !affected.includes(id)) : [...new Set([...props.checkedIds, ...affected])]; emit('update:checkedIds', next); emit('check', { node, checked: !allChecked }) }
function descendants(node: TreeNode): string[] { const ids: string[] = []; node.children?.forEach((child) => { ids.push(child.id, ...descendants(child)) }); return ids }
function findNode(id: string): TreeNode | undefined { const visit = (nodes: TreeNode[]): TreeNode | undefined => { for (const node of nodes) { if (node.id === id) return node; const match = node.children && visit(node.children); if (match) return match } }; return visit(props.nodes) }
function navigate({ event, node }: { event: KeyboardEvent; node: TreeNode }) { const index = visibleNodes.value.findIndex((entry) => entry.id === node.id); if (event.key === 'ArrowRight' && node.children?.length && !expandedIds.value.includes(node.id)) { event.preventDefault(); toggle(node.id); return } if (event.key === 'ArrowLeft' && expandedIds.value.includes(node.id)) { event.preventDefault(); toggle(node.id); return } const target = event.key === 'ArrowDown' ? visibleNodes.value[index + 1] : event.key === 'ArrowUp' ? visibleNodes.value[index - 1] : event.key === 'Home' ? visibleNodes.value[0] : event.key === 'End' ? visibleNodes.value.at(-1) : undefined; if (target) { event.preventDefault(); document.getElementById(`tree-item-${target.id}`)?.focus() } else if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(node.id) } }
</script>
