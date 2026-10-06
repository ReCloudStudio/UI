<template>
  <nav
    v-if="prev || next"
    :class="[
      'grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2',
      props.class
    ]"
    aria-label="文档分页导航"
  >
    <!-- Previous link card -->
    <component
      :is="prev?.to ? 'RouterLink' : 'a'"
      v-if="prev"
      v-bind="prev.to ? { to: prev.to } : { href: prev.href || '#' }"
      class="group relative flex flex-col items-start rounded-xl border border-slate-200/80 bg-white p-4 transition-all hover:border-[color:var(--primary)]/40 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] dark:border-slate-800 dark:bg-[color:var(--card)] dark:hover:border-[color:var(--primary)]/40"
    >
      <span class="inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition-colors group-hover:text-[color:var(--primary)] dark:text-slate-400 dark:group-hover:text-[color:var(--primary)]">
        <svg class="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <span>{{ prevLabel || docsLoc.prev }}</span>
      </span>
      <span class="mt-1 text-sm font-semibold text-slate-900 group-hover:text-[color:var(--primary)] dark:text-slate-100 dark:group-hover:text-[color:var(--primary)]">
        {{ prev.title }}
      </span>
      <span v-if="prev.description" class="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
        {{ prev.description }}
      </span>
    </component>
    <div v-else class="hidden sm:block" />

    <!-- Next link card -->
    <component
      :is="next?.to ? 'RouterLink' : 'a'"
      v-if="next"
      v-bind="next.to ? { to: next.to } : { href: next.href || '#' }"
      class="group relative flex flex-col items-end rounded-xl border border-slate-200/80 bg-white p-4 text-right transition-all hover:border-[color:var(--primary)]/40 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] dark:border-slate-800 dark:bg-[color:var(--card)] dark:hover:border-[color:var(--primary)]/40"
    >
      <span class="inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition-colors group-hover:text-[color:var(--primary)] dark:text-slate-400 dark:group-hover:text-[color:var(--primary)]">
        <span>{{ nextLabel || docsLoc.next }}</span>
        <svg class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </span>
      <span class="mt-1 text-sm font-semibold text-slate-900 group-hover:text-[color:var(--primary)] dark:text-slate-100 dark:group-hover:text-[color:var(--primary)]">
        {{ next.title }}
      </span>
      <span v-if="next.description" class="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
        {{ next.description }}
      </span>
    </component>
  </nav>
</template>

<script setup lang="ts">
import { useComponentLocale } from '../../locale'
import type { PrevNextProps } from './types'

const props = withDefaults(defineProps<PrevNextProps>(), {
  prev: undefined,
  next: undefined,
  prevLabel: undefined,
  nextLabel: undefined,
  class: ''
})

const docsLoc = useComponentLocale('docs')
</script>
