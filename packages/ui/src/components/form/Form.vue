<template>
  <form :class="formClasses">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'

export interface FormProps {
  class?: string
}

const props = withDefaults(defineProps<FormProps>(), {
  class: ''
})

const formClasses = computed(() => cn('space-y-5', props.class))
</script>
