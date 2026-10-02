<template>
  <div :class="['inline-flex items-center gap-3 select-none', className]">
    <BrandLogo :size="height" />
    <span
      :style="{ fontSize: `${fontSize}px`, lineHeight: 1 }"
      class="font-semibold tracking-tight text-[#1E63CE] dark:text-[#70ACFE]"
    >
      ReCloud Studio
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BrandLogo from './BrandLogo.vue'

const props = withDefaults(
  defineProps<{
    height?: number
    className?: string
  }>(),
  {
    height: 36,
    className: ''
  }
)

const fontSize = computed(() => Math.round(props.height * 0.65))
</script>
