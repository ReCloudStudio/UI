<template>
  <div
    :class="cn('flex min-h-dvh bg-[var(--background)] text-[var(--foreground)]', props.class)"
    :style="shellStyle"
  >
    <aside
      v-if="$slots.sidebar"
      :class="sidebarClasses"
      :aria-label="props.sidebarLabel"
    >
      <slot name="sidebar" :collapsed="collapsed" :toggle-collapsed="toggleCollapsed" />
    </aside>

    <div class="flex min-w-0 grow flex-col">
      <header v-if="$slots.header || $slots['mobile-menu-trigger']" :class="headerClasses">
        <div
          v-if="$slots['mobile-menu-trigger']"
          class="flex shrink-0 items-center lg:hidden"
        >
          <slot name="mobile-menu-trigger" />
        </div>
        <slot name="header" :collapsed="collapsed" :toggle-collapsed="toggleCollapsed" />
      </header>

      <main class="min-w-0 grow">
        <div :class="contentClasses"><slot /></div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'

export interface AppShellProps {
  /** Expanded desktop sidebar width. */
  sidebarWidth?: string
  /** Desktop sidebar width when `v-model:collapsed` is true. */
  collapsedSidebarWidth?: string
  /** Accessible label for the desktop navigation landmark. */
  sidebarLabel?: string
  /** Constrain the default content slot without adding page-specific wrappers. */
  contentWidth?: 'full' | 'wide' | 'default' | 'narrow'
  class?: string
}

const props = withDefaults(defineProps<AppShellProps>(), {
  sidebarWidth: '16rem',
  collapsedSidebarWidth: '4.5rem',
  sidebarLabel: '应用侧边栏',
  contentWidth: 'full',
  class: ''
})

const collapsed = defineModel<boolean>('collapsed', { default: false })

const contentWidths = {
  full: 'none',
  wide: '90rem',
  default: '76rem',
  narrow: '64rem'
} as const

const shellStyle = computed(() => ({
  '--app-sidebar-width': collapsed.value
    ? props.collapsedSidebarWidth
    : props.sidebarWidth,
  '--app-content-width': contentWidths[props.contentWidth]
}))

const sidebarClasses = computed(() => {
  return cn(
    'hidden w-[var(--app-sidebar-width)] shrink-0 overflow-hidden border-r border-[var(--border)] bg-[var(--card)] transition-[width] duration-200 lg:block'
  )
})

const headerClasses = computed(() => {
  return cn(
    'sticky top-0 z-30 flex min-h-12 shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_92%,transparent)] px-4 backdrop-blur-md lg:px-5'
  )
})

const contentClasses = computed(() => {
  return cn('mx-auto min-w-0 w-full max-w-[var(--app-content-width)]')
})

function toggleCollapsed() {
  collapsed.value = !collapsed.value
}
</script>
