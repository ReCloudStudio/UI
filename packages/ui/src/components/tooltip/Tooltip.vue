<template>
  <TooltipProvider :delay-duration="delayDuration">
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          :side="side"
          :side-offset="sideOffset"
          :class="contentClasses"
        >
          <slot name="content">{{ content }}</slot>
          <TooltipArrow class="fill-slate-900 dark:fill-slate-800" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipArrow
} from 'reka-ui'
import { cn } from '../../utils/cn'

export interface TooltipProps {
  content?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  delayDuration?: number
  class?: string
}

const props = withDefaults(defineProps<TooltipProps>(), {
  content: '',
  side: 'top',
  sideOffset: 5,
  delayDuration: 150,
  class: ''
})

const contentClasses = computed(() => {
  return cn(
    'z-50 overflow-hidden rounded-md bg-slate-900 dark:bg-slate-800 px-2.5 py-1 text-xs font-normal text-white ring-1 ring-inset ring-slate-800 dark:ring-slate-700 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    props.class
  )
})
</script>
