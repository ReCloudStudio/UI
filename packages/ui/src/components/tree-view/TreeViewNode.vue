<template>
  <li
    role="none"
    class="relative"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <div
      :id="`tree-item-${node.id}`"
      role="treeitem"
      :aria-level="level"
      :aria-expanded="isBranch ? expanded : undefined"
      :aria-selected="selected"
      :aria-disabled="node.disabled || undefined"
      :aria-checked="checkable ? (checkState === 'partial' ? 'mixed' : checkState === 'checked') : undefined"
      :draggable="draggable && !node.disabled"
      :class="nodeClasses"
      :style="{ paddingLeft: `${(level - 1) * 1.25 + 0.375}rem` }"
      tabindex="0"
      @click="selectNode"
      @keydown="onKeydown"
      @dragstart="onDragStart"
    >
      <!-- Visual accent bar when highlight-variant is 'bar' -->
      <span
        v-if="highlightVariant === 'bar' && selected"
        class="absolute top-1 bottom-1 left-0.5 w-1 rounded-full bg-[var(--primary)]"
        aria-hidden="true"
      />

      <!-- Expand / Collapse chevron or Loading spinner -->
      <button
        v-if="isBranch"
        type="button"
        class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
        :aria-label="expanded ? loc.collapseNode(node.label) : loc.expandNode(node.label)"
        @click.stop="emit('toggle', node.id)"
      >
        <svg
          v-if="isLoading"
          class="h-3.5 w-3.5 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <svg
          v-else
          :class="cn('h-3.5 w-3.5 transition-transform duration-150', expanded && 'rotate-90')"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6" />
        </svg>
      </button>
      <span v-else class="w-6 shrink-0" />

      <!-- Checkbox -->
      <input
        v-if="checkable"
        type="checkbox"
        :checked="checkState === 'checked'"
        :indeterminate="checkState === 'partial'"
        :aria-label="loc.selectNode(node.label)"
        class="h-4 w-4 shrink-0 rounded accent-[var(--primary)]"
        @click.stop
        @change="emit('check', node)"
      >

      <!-- Icon slot / default icon -->
      <div v-if="$slots.icon || node.icon" class="flex shrink-0 items-center text-[var(--muted-foreground)]">
        <slot name="icon" :node="node" :expanded="expanded" :selected="selected">
          <Icon :icon="node.icon" size="1rem" />
        </slot>
      </div>

      <!-- Label slot / default label -->
      <div class="min-w-0 grow truncate">
        <slot name="label" :node="node" :expanded="expanded" :selected="selected">
          <span>{{ node.label }}</span>
        </slot>
      </div>

      <!-- Active selection badge/indicator -->
      <span
        v-if="selected"
        class="ml-auto inline-flex shrink-0 items-center rounded-full bg-[var(--primary)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--primary)] ring-1 ring-[var(--primary)]/20"
        aria-hidden="true"
      >
        {{ loc.selectedBadge }}
      </span>
    </div>

    <!-- Drop indicator lines -->
    <div
      v-if="dropPosition === 'before'"
      class="pointer-events-none absolute top-0 right-0 left-0 h-0.5 bg-[var(--primary)]"
    />
    <div
      v-if="dropPosition === 'after'"
      class="pointer-events-none absolute right-0 bottom-0 left-0 h-0.5 bg-[var(--primary)]"
    />

    <!-- Children branch -->
    <ul v-if="hasChildren && expanded" role="group">
      <TreeViewNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :level="level + 1"
        :expanded-ids="expandedIds"
        :selected-ids="selectedIds"
        :checked-ids="checkedIds"
        :checkable="checkable"
        :draggable="draggable"
        :loading-ids="loadingIds"
        :highlight-variant="highlightVariant"
        @toggle="emit('toggle', $event)"
        @select="emit('select', $event)"
        @check="emit('check', $event)"
        @navigate="emit('navigate', $event)"
        @node-drag-start="emit('node-drag-start', $event)"
        @node-drop="emit('node-drop', $event)"
      >
        <template #icon="slotProps: any">
          <slot name="icon" v-bind="slotProps" />
        </template>
        <template #label="slotProps: any">
          <slot name="label" v-bind="slotProps" />
        </template>
      </TreeViewNode>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '../icon'
import { cn } from '../../utils/cn'
import { useComponentLocale } from '../../locale'
import type { TreeHighlightVariant, TreeNode } from './types'

defineOptions({ name: 'TreeViewNode' })

const props = defineProps<{
  node: TreeNode
  level: number
  expandedIds: string[]
  selectedIds: string[]
  checkedIds: string[]
  checkable: boolean
  draggable: boolean
  loadingIds: string[]
  highlightVariant: TreeHighlightVariant
}>()

const emit = defineEmits<{
  (event: 'toggle', id: string): void
  (event: 'select', id: string): void
  (event: 'check', node: TreeNode): void
  (event: 'navigate', payload: { event: KeyboardEvent; node: TreeNode }): void
  (event: 'node-drag-start', node: TreeNode): void
  (event: 'node-drop', payload: { targetNode: TreeNode; position: 'before' | 'inside' | 'after' }): void
}>()

const loc = useComponentLocale('tree')
const dropPosition = ref<'before' | 'inside' | 'after' | null>(null)

const hasChildren = computed(() => Boolean(props.node.children?.length))
const isBranch = computed(() => hasChildren.value || props.node.isLeaf === false)
const expanded = computed(() => props.expandedIds.includes(props.node.id))
const selected = computed(() => props.selectedIds.includes(props.node.id))
const isLoading = computed(() => props.loadingIds.includes(props.node.id))

const descendantIds = computed(() => {
  const ids: string[] = []
  const visit = (entry: TreeNode) => {
    entry.children?.forEach((child) => {
      ids.push(child.id)
      visit(child)
    })
  }
  visit(props.node)
  return ids
})

const checkState = computed(() => {
  const ids = [props.node.id, ...descendantIds.value]
  const count = ids.filter((id) => props.checkedIds.includes(id)).length
  return count === 0 ? 'unchecked' : count === ids.length ? 'checked' : 'partial'
})

const nodeClasses = computed(() => {
  const highlightStyles = {
    subtle: selected.value
      ? 'bg-[var(--rc-blue-50)] text-[var(--rc-blue-700)] ring-1 ring-[var(--rc-blue-200)] font-medium dark:bg-[var(--rc-blue-950)]/50 dark:text-[var(--rc-blue-300)] dark:ring-[var(--rc-blue-800)]'
      : 'text-[var(--foreground)] hover:bg-[var(--muted)]',
    solid: selected.value
      ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-xs [&_button]:text-[var(--primary-foreground)] [&_svg]:text-[var(--primary-foreground)] [&_span]:text-[var(--primary-foreground)]'
      : 'text-[var(--foreground)] hover:bg-[var(--muted)]',
    bar: selected.value
      ? 'bg-[var(--muted)] text-[var(--primary)] font-semibold pl-2 dark:bg-[var(--muted)]'
      : 'text-[var(--foreground)] hover:bg-[var(--muted)]'
  }[props.highlightVariant]

  return cn(
    'relative group flex min-h-8 items-center gap-2 rounded-md pr-2 text-sm outline-none transition-all select-none',
    highlightStyles,
    dropPosition.value === 'inside' && 'ring-2 ring-inset ring-[var(--primary)] bg-[var(--muted)]',
    props.node.disabled && 'pointer-events-none opacity-45'
  )
})

function selectNode() {
  if (!props.node.disabled) emit('select', props.node.id)
}

function onKeydown(event: KeyboardEvent) {
  if (!props.node.disabled) emit('navigate', { event, node: props.node })
}

function onDragStart(event: DragEvent) {
  if (!props.draggable || props.node.disabled) return
  event.dataTransfer?.setData('text/plain', props.node.id)
  emit('node-drag-start', props.node)
}

function onDragOver(event: DragEvent) {
  if (!props.draggable || props.node.disabled) return
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const offset = event.clientY - rect.top
  const height = rect.height

  if (offset < height * 0.25) {
    dropPosition.value = 'before'
  } else if (offset > height * 0.75) {
    dropPosition.value = 'after'
  } else {
    dropPosition.value = 'inside'
  }
}

function onDragLeave() {
  dropPosition.value = null
}

function onDrop() {
  if (!props.draggable || !dropPosition.value) return
  emit('node-drop', {
    targetNode: props.node,
    position: dropPosition.value
  })
  dropPosition.value = null
}
</script>
