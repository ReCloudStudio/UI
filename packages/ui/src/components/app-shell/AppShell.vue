<template>
  <div :class="cn('flex min-h-dvh bg-slate-50 text-slate-800 dark:bg-[#090E17] dark:text-slate-100', props.class)" :style="{ '--app-sidebar-width': props.sidebarWidth }">
    <aside v-if="$slots.sidebar" class="hidden w-[var(--app-sidebar-width)] shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0F172A] lg:block"><slot name="sidebar" /></aside>
    <div class="flex min-w-0 grow flex-col">
      <header v-if="$slots.header" class="sticky top-0 z-30 shrink-0 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-[#090E17]/90"><slot name="header" /></header>
      <main class="min-w-0 grow"><slot /></main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '../../utils/cn'

export interface AppShellProps {
  sidebarWidth?: string
  class?: string
}

const props = withDefaults(defineProps<AppShellProps>(), { sidebarWidth: '16rem', class: '' })
</script>
