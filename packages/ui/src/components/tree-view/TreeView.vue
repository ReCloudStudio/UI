<template>
  <ul
    role="tree"
    :aria-label="effectiveLabel"
    :aria-multiselectable="props.multiple || undefined"
    :class="cn('space-y-0.5 rounded-xl bg-[var(--card)] p-2 ring-1 ring-[var(--border)]', props.class)"
  >
    <TreeViewNode
      v-for="node in props.nodes"
      :key="node.id"
      :node="node"
      :level="1"
      :expanded-ids="effectiveExpandedIds"
      :selected-ids="effectiveSelectedIds"
      :checked-ids="props.checkedIds"
      :checkable="props.checkable"
      :draggable="props.draggable"
      :loading-ids="loadingIds"
      :highlight-variant="props.highlightVariant"
      @toggle="toggle"
      @select="select"
      @check="toggleChecked"
      @navigate="navigate"
      @node-drag-start="handleDragStart"
      @node-drop="handleDrop"
    >
      <template #icon="slotProps">
        <slot name="icon" v-bind="slotProps" />
      </template>
      <template #label="slotProps">
        <slot name="label" v-bind="slotProps" />
      </template>
    </TreeViewNode>
  </ul>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { cn } from '../../utils/cn'
import { useComponentLocale } from '../../locale'
import TreeViewNode from './TreeViewNode.vue'
import type { TreeDropEvent, TreeHighlightVariant, TreeNode } from './types'

export interface TreeViewProps {
  nodes: TreeNode[]
  /** Single selection mode value. When `multiple` is true, use `selectedIds` instead. */
  modelValue?: string
  /** Multi-select mode enabled. */
  multiple?: boolean
  /** Selected node IDs for multi-select mode. */
  selectedIds?: string[]
  /** Controlled expanded node IDs (alias v-model:expandedIds). */
  expandedIds?: string[]
  /** Controlled expanded node IDs (v-model:expanded). */
  expanded?: string[]
  defaultExpandedIds?: string[]
  checkedIds?: string[]
  checkable?: boolean
  cascade?: boolean
  /** Enable HTML5 drag-and-drop reordering between nodes. */
  draggable?: boolean
  /** Visual highlight appearance for selected nodes: subtle, solid, or bar. */
  highlightVariant?: TreeHighlightVariant
  /** Asynchronous loader for fetching dynamic children when expanding an unloaded branch. */
  loadChildren?: (node: TreeNode) => Promise<TreeNode[] | void>
  label?: string
  class?: string
}

const props = withDefaults(defineProps<TreeViewProps>(), {
  modelValue: undefined,
  multiple: false,
  selectedIds: undefined,
  expandedIds: undefined,
  expanded: undefined,
  defaultExpandedIds: () => [],
  checkedIds: () => [],
  checkable: false,
  cascade: true,
  draggable: false,
  highlightVariant: 'subtle',
  loadChildren: undefined,
  label: undefined,
  class: ''
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'update:selectedIds', values: string[]): void
  (event: 'update:expandedIds', values: string[]): void
  (event: 'update:expanded', values: string[]): void
  (event: 'update:checkedIds', values: string[]): void
  (event: 'select', node: TreeNode): void
  (event: 'toggle', node: TreeNode): void
  (event: 'check', payload: { node: TreeNode; checked: boolean }): void
  (event: 'drop', payload: TreeDropEvent): void
}>()

const loc = useComponentLocale('tree')
const effectiveLabel = computed(() => props.label ?? loc.value.label)

const internalExpanded = ref<string[]>([...props.defaultExpandedIds])
const internalSelectedIds = ref<string[]>([])
const loadingIds = ref<string[]>([])

const isControlledExpanded = computed(() => {
  return props.expanded !== undefined || props.expandedIds !== undefined
})

const effectiveExpandedIds = computed<string[]>(() => {
  if (props.expanded !== undefined) return props.expanded
  if (props.expandedIds !== undefined) return props.expandedIds
  return internalExpanded.value
})

const effectiveSelectedIds = computed<string[]>(() => {
  if (props.multiple) {
    return props.selectedIds !== undefined ? props.selectedIds : internalSelectedIds.value
  }
  return props.modelValue !== undefined ? [props.modelValue] : []
})

const visibleNodes = computed(() => {
  const list: TreeNode[] = []
  const visit = (nodes: TreeNode[]) => {
    nodes.forEach((node) => {
      list.push(node)
      if (node.children?.length && effectiveExpandedIds.value.includes(node.id)) {
        visit(node.children)
      }
    })
  }
  visit(props.nodes)
  return list
})

watch(
  () => props.defaultExpandedIds,
  (value) => {
    if (!isControlledExpanded.value) {
      internalExpanded.value = [...value]
    }
  }
)

async function toggle(id: string) {
  const node = findNode(id)
  if (!node || node.disabled) return

  const isExpanding = !effectiveExpandedIds.value.includes(id)

  if (isExpanding && props.loadChildren && (!node.children || node.children.length === 0) && node.isLeaf === false) {
    if (!loadingIds.value.includes(id)) {
      loadingIds.value.push(id)
      try {
        const loaded = await props.loadChildren(node)
        if (Array.isArray(loaded)) {
          node.children = loaded
        }
      } finally {
        loadingIds.value = loadingIds.value.filter((loadingId) => loadingId !== id)
      }
    }
  }

  const next = isExpanding
    ? [...effectiveExpandedIds.value, id]
    : effectiveExpandedIds.value.filter((value) => value !== id)

  if (!isControlledExpanded.value) {
    internalExpanded.value = next
  }

  emit('update:expandedIds', next)
  emit('update:expanded', next)
  emit('toggle', node)
}

function select(id: string) {
  const node = findNode(id)
  if (!node || node.disabled) return

  if (props.multiple) {
    const current = effectiveSelectedIds.value
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]
    if (props.selectedIds === undefined) {
      internalSelectedIds.value = next
    }
    emit('update:selectedIds', next)
  } else {
    emit('update:modelValue', id)
  }

  emit('select', node)
}

function toggleChecked(node: TreeNode) {
  if (node.disabled) return
  const affected = props.cascade ? [node.id, ...descendants(node)] : [node.id]
  const allChecked = affected.every((id) => props.checkedIds.includes(id))
  const next = allChecked
    ? props.checkedIds.filter((id) => !affected.includes(id))
    : [...new Set([...props.checkedIds, ...affected])]

  emit('update:checkedIds', next)
  emit('check', { node, checked: !allChecked })
}

function descendants(node: TreeNode): string[] {
  const ids: string[] = []
  node.children?.forEach((child) => {
    ids.push(child.id, ...descendants(child))
  })
  return ids
}

function findNode(id: string): TreeNode | undefined {
  const visit = (nodes: TreeNode[]): TreeNode | undefined => {
    for (const node of nodes) {
      if (node.id === id) return node
      const match = node.children && visit(node.children)
      if (match) return match
    }
  }
  return visit(props.nodes)
}

function navigate({ event, node }: { event: KeyboardEvent; node: TreeNode }) {
  const index = visibleNodes.value.findIndex((entry) => entry.id === node.id)
  const isBranch = (node.children && node.children.length > 0) || node.isLeaf === false

  if (event.key === 'ArrowRight' && isBranch && !effectiveExpandedIds.value.includes(node.id)) {
    event.preventDefault()
    toggle(node.id)
    return
  }

  if (event.key === 'ArrowLeft' && effectiveExpandedIds.value.includes(node.id)) {
    event.preventDefault()
    toggle(node.id)
    return
  }

  const target =
    event.key === 'ArrowDown'
      ? visibleNodes.value[index + 1]
      : event.key === 'ArrowUp'
        ? visibleNodes.value[index - 1]
        : event.key === 'Home'
          ? visibleNodes.value[0]
          : event.key === 'End'
            ? visibleNodes.value.at(-1)
            : undefined

  if (target) {
    event.preventDefault()
    document.getElementById(`tree-item-${target.id}`)?.focus()
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    select(node.id)
  }
}

let activeDraggedId: string | null = null

function handleDragStart(node: TreeNode) {
  activeDraggedId = node.id
}

function handleDrop(payload: { targetNode: TreeNode; position: 'before' | 'inside' | 'after' }) {
  if (!activeDraggedId) return
  const dragged = findNode(activeDraggedId)
  if (!dragged || dragged.id === payload.targetNode.id) return

  // Prevent dragging a parent into its own descendants
  if (descendants(dragged).includes(payload.targetNode.id)) return

  emit('drop', {
    draggedNode: dragged,
    targetNode: payload.targetNode,
    position: payload.position
  })
  activeDraggedId = null
}
</script>
