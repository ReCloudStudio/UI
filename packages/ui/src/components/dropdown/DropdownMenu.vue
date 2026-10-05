<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        :side-offset="sideOffset"
        :class="contentClasses"
      >
        <template v-for="(item, idx) in items" :key="idx">
          <DropdownMenuSeparator
            v-if="item.separator"
            class="my-1 h-px bg-slate-100 dark:bg-slate-800"
          />
          <DropdownMenuItem
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
            <Icon :icon="item.icon" v-if="item.icon" size="0.875rem" class="mr-2" />
            <span>{{ item.label }}</span>
          </DropdownMenuItem>
        </template>
        <slot />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from 'reka-ui'
import { Icon, type IconSource } from '../icon'
import { cn } from '../../utils/cn'

export interface DropdownMenuItemType {
  label?: string
  icon?: IconSource
  disabled?: boolean
  destructive?: boolean
  separator?: boolean
  onSelect?: () => void
}

export interface DropdownMenuProps {
  items?: DropdownMenuItemType[]
  sideOffset?: number
  class?: string
}

const props = withDefaults(defineProps<DropdownMenuProps>(), {
  items: () => [],
  sideOffset: 4,
  class: ''
})

const contentClasses = computed(() => {
  return cn(
    'z-50 min-w-[9rem] overflow-hidden rounded-lg bg-white dark:bg-[#0F172A] p-1 text-slate-800 dark:text-slate-200 ring-1 ring-inset ring-slate-200 dark:ring-slate-800 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    props.class
  )
})
</script>
