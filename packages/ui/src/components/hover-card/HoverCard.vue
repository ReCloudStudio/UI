<template>
  <HoverCardRoot :open-delay="openDelay" :close-delay="closeDelay">
    <HoverCardTrigger as-child>
      <slot name="trigger" />
    </HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent
        :side="side"
        :side-offset="sideOffset"
        class="z-50 w-72 rounded-lg bg-white p-3.5 text-sm text-slate-700 shadow-lg ring-1 ring-inset ring-slate-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 dark:bg-[#0F172A] dark:text-slate-300 dark:ring-slate-800"
        :class="props.class"
      >
        <slot />
        <HoverCardArrow class="fill-white dark:fill-[#0F172A]" />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>

<script setup lang="ts">
import {
  HoverCardRoot,
  HoverCardTrigger,
  HoverCardPortal,
  HoverCardContent,
  HoverCardArrow
} from 'reka-ui'

export interface HoverCardProps {
  openDelay?: number
  closeDelay?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  class?: string
}

const props = withDefaults(defineProps<HoverCardProps>(), {
  openDelay: 300,
  closeDelay: 200,
  side: 'bottom',
  sideOffset: 6,
  class: ''
})
</script>
