<template>
  <nav v-if="adjacent.prev || adjacent.next" class="flex items-stretch gap-4 pt-2" aria-label="文档翻页">
    <NuxtLink
      v-if="adjacent.prev"
      :to="docPath(adjacent.prev.name)"
      class="group flex-1 rounded-xl ring-1 ring-inset ring-slate-200/80 dark:ring-slate-800/80 bg-white dark:bg-[#0B1220] px-5 py-4 hover:ring-[#2563EB]/40 dark:hover:ring-[#70ACFE]/40 transition-all"
    >
      <span class="block text-xs text-slate-400 dark:text-slate-500 mb-1">上一页</span>
      <span class="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#2563EB] dark:group-hover:text-[#70ACFE] transition-colors">{{ adjacent.prev.title }}</span>
    </NuxtLink>
    <div v-else class="flex-1" />
    <NuxtLink
      v-if="adjacent.next"
      :to="docPath(adjacent.next.name)"
      class="group flex-1 rounded-xl ring-1 ring-inset ring-slate-200/80 dark:ring-slate-800/80 bg-white dark:bg-[#0B1220] px-5 py-4 text-right hover:ring-[#2563EB]/40 dark:hover:ring-[#70ACFE]/40 transition-all"
    >
      <span class="block text-xs text-slate-400 dark:text-slate-500 mb-1">下一页</span>
      <span class="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#2563EB] dark:group-hover:text-[#70ACFE] transition-colors">{{ adjacent.next.title }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { adjacentDocs, docPath } from '~/utils/catalog'

const props = withDefaults(defineProps<{ name: string }>(), {})
const adjacent = adjacentDocs(props.name)
</script>
