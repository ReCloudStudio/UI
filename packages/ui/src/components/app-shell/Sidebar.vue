<template>
  <nav :aria-label="props.label" :class="cn('flex h-full flex-col', props.class)">
    <div v-if="$slots.header" class="shrink-0 border-b border-slate-200 px-4 py-4 dark:border-slate-800"><slot name="header" /></div>
    <div class="min-h-0 grow overflow-y-auto px-3 py-4"><slot /></div>
    <div v-if="$slots.footer" class="shrink-0 border-t border-slate-200 px-3 py-3 dark:border-slate-800"><slot name="footer" /></div>
  </nav>
</template>

<script setup lang="ts">
import { cn } from '../../utils/cn'

export interface SidebarProps {
  label?: string
  class?: string
}

const props = withDefaults(defineProps<SidebarProps>(), { label: '侧边导航', class: '' })
</script>
