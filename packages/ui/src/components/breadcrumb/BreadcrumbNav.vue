<template>
  <nav :aria-label="props.ariaLabel" :class="cn('flex items-center text-sm', props.class)">
    <ol class="flex flex-wrap items-center gap-1.5">
      <li
        v-for="(crumb, idx) in props.items"
        :key="idx"
        class="flex items-center gap-1.5"
      >
        <template v-if="idx < props.items.length - 1">
          <component
            :is="crumb.to ? 'RouterLink' : 'span'"
            :to="crumb.to"
            class="text-slate-500 outline-none transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            {{ crumb.label }}
          </component>
          <svg class="h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </template>
        <span v-else class="font-medium text-slate-900 dark:text-white" aria-current="page">
          {{ crumb.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { cn } from '../../utils/cn'

export interface Crumb {
  label: string
  to?: string
}

export interface BreadcrumbNavProps {
  items: Crumb[]
  ariaLabel?: string
  class?: string
}

const props = withDefaults(defineProps<BreadcrumbNavProps>(), {
  ariaLabel: '面包屑导航',
  class: ''
})
</script>
