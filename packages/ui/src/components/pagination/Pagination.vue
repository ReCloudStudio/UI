<template>
  <nav class="flex items-center justify-between gap-3" aria-label="分页导航">
    <p v-if="showSummary" class="text-sm text-slate-500 dark:text-slate-400">第 {{ modelValue }} / {{ totalPages }} 页</p>
    <div class="flex items-center gap-1" :class="!showSummary && 'w-full justify-center'">
      <button :class="buttonClasses" :disabled="modelValue <= 1" aria-label="上一页" @click="updatePage(modelValue - 1)">上一页</button>
      <button v-for="page in pages" :key="page" :class="cn(buttonClasses, page === modelValue && 'bg-[#2563EB] text-white ring-[#2563EB] dark:bg-[#70ACFE] dark:text-slate-950 dark:ring-[#70ACFE]')" :aria-current="page === modelValue ? 'page' : undefined" @click="updatePage(page)">{{ page }}</button>
      <button :class="buttonClasses" :disabled="modelValue >= totalPages" aria-label="下一页" @click="updatePage(modelValue + 1)">下一页</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'

export interface PaginationProps {
  modelValue?: number
  total?: number
  pageSize?: number
  siblingCount?: number
  showSummary?: boolean
}

const props = withDefaults(defineProps<PaginationProps>(), {
  modelValue: 1,
  total: 0,
  pageSize: 10,
  siblingCount: 1,
  showSummary: true
})

const emit = defineEmits<{ (event: 'update:modelValue', page: number): void }>()
const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const pages = computed(() => Array.from({ length: Math.min(totalPages.value, props.siblingCount * 2 + 3) }, (_, index) => {
  const start = Math.min(Math.max(props.modelValue - props.siblingCount, 1), Math.max(totalPages.value - (props.siblingCount * 2 + 2), 1))
  return start + index
}))
const buttonClasses = 'inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium text-slate-600 ring-1 ring-inset ring-transparent transition-colors hover:bg-slate-100 hover:text-slate-950 disabled:pointer-events-none disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'

function updatePage(page: number) {
  emit('update:modelValue', Math.min(Math.max(page, 1), totalPages.value))
}
</script>
