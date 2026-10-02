<template>
  <TabsContent
    :value="value"
    :class="cn('mt-3 outline-none focus-visible:ring-2 focus-visible:ring-[#3069C9]', props.class)"
  >
    <slot />
  </TabsContent>
</template>

<script setup lang="ts">
import { TabsContent } from 'reka-ui'
import { cn } from '../../utils/cn'

const props = defineProps<{
  value: string
  class?: string
}>()
</script>
