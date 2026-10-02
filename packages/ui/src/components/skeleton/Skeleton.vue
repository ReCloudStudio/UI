<template>
  <div :class="cn('animate-pulse rounded-md bg-slate-200 dark:bg-slate-800', props.class)" :style="{ width: props.width, height: props.height }" />
</template>

<script setup lang="ts">
import { cn } from '../../utils/cn'

export interface SkeletonProps {
  width?: string
  height?: string
  class?: string
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  width: '100%',
  height: '1rem',
  class: ''
})
</script>
