<template>
  <AspectRatio :ratio="ratio" class="w-full overflow-hidden rounded-xl ring-1 ring-inset ring-slate-200 dark:ring-slate-800" :class="props.class">
    <div class="absolute inset-0">
      <slot />
    </div>
  </AspectRatio>
</template>

<script setup lang="ts">
import { AspectRatio } from 'reka-ui'

export interface AspectRatioProps {
  ratio?: number
  class?: string
}

const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: 16 / 9,
  class: ''
})
</script>
