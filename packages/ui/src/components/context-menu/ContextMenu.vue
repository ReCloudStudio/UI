<template>
  <ContextMenuRoot>
    <ContextMenuTrigger as-child>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent :class="contentClasses">
        <template v-for="(item, idx) in props.items" :key="idx">
          <ContextMenuSeparator v-if="item.separator" class="my-1 h-px bg-slate-100 dark:bg-slate-800" />
          <ContextMenuItem
            v-else
            :disabled="item.disabled"
            :class="[
              'relative flex cursor-pointer select-none items-center rounded-md px-2.5 py-1.5 text-xs font-medium outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800',
              item.destructive
                ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40'
                : 'text-slate-700 dark:text-slate-200'
            ]"
            @select="item.onSelect && item.onSelect()"
          >
            <component :is="item.icon" v-if="item.icon" class="mr-2 h-3.5 w-3.5" />
            <span>{{ item.label }}</span>
          </ContextMenuItem>
        </template>
        <slot name="extra" />
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  ContextMenuRoot, ContextMenuTrigger, ContextMenuPortal, ContextMenuContent, ContextMenuItem, ContextMenuSeparator
} from 'reka-ui'
import { cn } from '../../utils/cn'

export interface ContextMenuItemData {
  label?: string
  icon?: any
  disabled?: boolean
  destructive?: boolean
  separator?: boolean
  onSelect?: () => void
}

export interface ContextMenuProps {
  items?: ContextMenuItemData[]
  class?: string
}

const props = withDefaults(defineProps<ContextMenuProps>(), {
  items: () => [],
  class: ''
})

const contentClasses = computed(() => {
  return cn(
    'z-50 min-w-[9rem] overflow-hidden rounded-lg bg-white dark:bg-[#0F172A] p-1 text-slate-800 dark:text-slate-200 ring-1 ring-inset ring-slate-200 dark:ring-slate-800 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    props.class
  )
})
</script>
