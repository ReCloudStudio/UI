<template>
  <NavigationMenuRoot
    :model-value="modelValue"
    :class="menuClasses"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <NavigationMenuList class="flex items-center gap-1">
      <NavigationMenuItem v-for="item in items" :key="item.value" :value="item.value">
        <NavigationMenuLink
          v-if="!hasPanel(item)"
          :value="item.value"
          class="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus-visible:ring-[#70ACFE]"
          @select="$emit('update:modelValue', item.value)"
        >
          {{ item.label }}
        </NavigationMenuLink>
        <template v-else>
          <NavigationMenuTrigger class="group inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] data-[state=open]:bg-slate-100/70 data-[state=open]:text-[#2563EB] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus-visible:ring-[#70ACFE] dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-[#70ACFE]">
            {{ item.label }}
            <svg class="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </NavigationMenuTrigger>
          <NavigationMenuContent class="absolute top-0 left-0 w-64 rounded-lg bg-white p-2 text-sm shadow-lg ring-1 ring-inset ring-slate-200 data-[motion=from-start]:animate-in data-[motion=from-end]:animate-in data-[motion=to-start]:animate-out data-[motion=to-end]:animate-out dark:bg-[#0F172A] dark:ring-slate-800">
            <slot v-if="hasSlotPanel" name="panel" :item="item" />
            <component :is="item.panel" v-else-if="item.panel" />
          </NavigationMenuContent>
        </template>
      </NavigationMenuItem>
    </NavigationMenuList>
    <NavigationMenuViewport class="absolute top-full left-0 z-50 mt-2 h-[var(--reka-navigation-menu-viewport-height)] w-[var(--reka-navigation-menu-viewport-width)] origin-top-left overflow-hidden rounded-lg transition-[width,height] duration-200" />
  </NavigationMenuRoot>
</template>

<script setup lang="ts">
import { computed, useSlots, type Component } from 'vue'
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from 'reka-ui'
import { cn } from '../../utils/cn'

export interface NavigationMenuItem {
  label: string
  value: string
  panel?: Component
}

export interface NavigationMenuProps {
  items: NavigationMenuItem[]
  modelValue?: string
  class?: string
}

const props = withDefaults(defineProps<NavigationMenuProps>(), {
  class: ''
})

const slots = defineSlots<{
  panel?: (props: { item: NavigationMenuItem }) => unknown
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const hasSlotPanel = computed(() => Boolean(slots.panel))
const menuClasses = computed(() => cn('relative flex items-center', props.class))

function hasPanel(item: NavigationMenuItem) {
  return hasSlotPanel.value || item.panel !== undefined
}
</script>
