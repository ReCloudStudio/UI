<template>
  <div :class="['space-y-8 pl-4', props.class]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { stepsInjectionKey, type StepsProps } from './types'

const props = withDefaults(defineProps<StepsProps>(), {
  startIndex: 1,
  class: ''
})

const counter = ref(props.startIndex)

provide(stepsInjectionKey, {
  registerStep: () => {
    const current = counter.value
    counter.value += 1
    return current
  }
})
</script>
