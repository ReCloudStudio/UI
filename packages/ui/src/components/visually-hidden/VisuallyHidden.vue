<script setup lang="ts">
import { VisuallyHidden as RekaVisuallyHidden } from 'reka-ui'

export interface VisuallyHiddenProps {
  class?: string
}

withDefaults(defineProps<VisuallyHiddenProps>(), { class: '' })
</script>

<template>
  <RekaVisuallyHidden>
    <slot />
  </RekaVisuallyHidden>
</template>
