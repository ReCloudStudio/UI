<template>
  <ol :class="cn('relative space-y-0', props.class)" :aria-label="props.label">
    <li v-for="(item, index) in props.items" :key="item.id" class="relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 pb-7 last:pb-0">
      <div class="relative z-10 flex w-6 justify-center">
        <span :class="cn('mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white dark:ring-[#0F172A]', statusClasses[item.status ?? 'default'])"><slot name="marker" :item="item" :index="index"><svg v-if="item.status === 'success'" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg><svg v-else-if="item.status === 'error'" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M12 8v4m0 4h.01" /></svg><svg v-else-if="item.status === 'warning'" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M12 8v4m0 4h.01" /></svg><span v-else class="h-2 w-2 rounded-full bg-current" /></slot></span>
      </div>
      <div v-if="index < props.items.length - 1" class="absolute top-7 bottom-0 left-3 w-px -translate-x-1/2 bg-slate-200 dark:bg-slate-800" aria-hidden="true" />
      <div class="min-w-0 pt-0.5">
        <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1"><h3 class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ item.title }}</h3><time v-if="item.timestamp" class="text-xs text-slate-400 dark:text-slate-500">{{ item.timestamp }}</time></div>
        <p v-if="item.description" class="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{{ item.description }}</p>
        <div v-if="item.actor || item.metadata || $slots.details" class="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><span v-if="item.actor" class="inline-flex items-center gap-1.5"><Avatar v-if="item.avatar" :src="item.avatar" :alt="item.actor" size="xs" />{{ item.actor }}</span><span v-if="item.metadata" class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">{{ item.metadata }}</span><slot name="details" :item="item" :index="index" /></div>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { cn } from '../../utils/cn'
import Avatar from '../avatar/Avatar.vue'
import type { TimelineItem, TimelineStatus } from './types'

export interface TimelineProps { items: TimelineItem[]; label?: string; class?: string }
const props = withDefaults(defineProps<TimelineProps>(), { label: '时间线', class: '' })
const statusClasses: Record<TimelineStatus, string> = { default: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400', info: 'bg-blue-100 text-[#2563EB] dark:bg-blue-950 dark:text-[#70ACFE]', success: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400', warning: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400', error: 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400' }
</script>
