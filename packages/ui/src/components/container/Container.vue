<template>
  <component
    :is="as"
    :class="[
      'mx-auto w-full',
      sizeClasses[size],
      padded ? 'px-4 sm:px-6 lg:px-8' : '',
      props.class
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { ContainerProps, ContainerSize } from './types'

const props = withDefaults(defineProps<ContainerProps>(), {
  as: 'div',
  size: 'xl',
  padded: true
})

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-none'
}
</script>
