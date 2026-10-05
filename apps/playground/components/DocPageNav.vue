<template>
  <PrevNext :prev="previous" :next="following" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { adjacentDocs, docPath } from '~/utils/catalog'

const props = defineProps<{ name: string }>()
const adjacent = computed(() => adjacentDocs(props.name))

const previous = computed(() => {
  const item = adjacent.value.prev
  return item ? { title: item.title, to: docPath(item.name) } : undefined
})

const following = computed(() => {
  const item = adjacent.value.next
  return item ? { title: item.title, to: docPath(item.name) } : undefined
})
</script>
