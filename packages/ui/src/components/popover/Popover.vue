<template>
  <PopoverRoot :open="props.open" @update:open="$emit('update:open', $event)">
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        :side-offset="props.sideOffset"
        :align="props.align"
        :class="contentClasses"
      >
        <div v-if="props.title" class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
          {{ props.title }}
        </div>
        <div class="text-sm text-slate-600 dark:text-slate-400">
          <slot />
        </div>
        <PopoverClose as-child v-if="props.showClose">
          <button class="mt-3 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
            关闭
          </button>
        </PopoverClose>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PopoverRoot, PopoverTrigger, PopoverPortal, PopoverContent, PopoverClose } from 'reka-ui'
import { cn } from '../../utils/cn'

export interface PopoverProps {
  open?: boolean
  title?: string
  showClose?: boolean
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  class?: string
}

const props = withDefaults(defineProps<PopoverProps>(), {
  open: undefined,
  title: '',
  showClose: false,
  align: 'center',
  sideOffset: 6,
  class: ''
})

defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const contentClasses = computed(() => {
  return cn(
    'z-50 w-72 rounded-lg bg-white dark:bg-[#0F172A] p-4 text-slate-800 dark:text-slate-200 ring-1 ring-inset ring-slate-200 dark:ring-slate-800 shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    props.class
  )
})
</script>
