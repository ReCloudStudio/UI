<template>
  <nav
    :aria-label="props.label"
    :class="cn('flex h-full min-w-0 flex-col', props.class)"
    :data-collapsed="props.collapsed || undefined"
  >
    <div
      v-if="$slots.header"
      class="shrink-0 border-b border-[var(--border)] px-4 py-4"
    >
      <slot name="header" :collapsed="props.collapsed" />
    </div>

    <div class="min-h-0 grow overflow-y-auto px-3 py-4">
      <slot :collapsed="props.collapsed" />
    </div>

    <div
      v-if="$slots.footer"
      class="shrink-0 border-t border-[var(--border)] px-3 py-3"
    >
      <slot name="footer" :collapsed="props.collapsed" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { cn } from '../../utils/cn'

export interface SidebarProps {
  label?: string
  /** Passed from AppShell to let navigation items render icon-only affordances. */
  collapsed?: boolean
  class?: string
}

const props = withDefaults(defineProps<SidebarProps>(), {
  label: '侧边导航',
  collapsed: false,
  class: ''
})
</script>
