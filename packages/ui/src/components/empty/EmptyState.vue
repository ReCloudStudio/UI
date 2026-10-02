<template>
  <div :class="cn('flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-6 py-10 text-center dark:border-slate-700', props.class)">
    <div v-if="$slots.icon" class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
      <slot name="icon" />
    </div>
    <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">{{ props.title }}</h3>
    <p v-if="props.description" class="mt-1 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">{{ props.description }}</p>
    <div v-if="$slots.default" class="mt-4"><slot /></div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '../../utils/cn'

export interface EmptyStateProps {
  title: string
  description?: string
  class?: string
}

const props = withDefaults(defineProps<EmptyStateProps>(), {
  description: '',
  class: ''
})
</script>
