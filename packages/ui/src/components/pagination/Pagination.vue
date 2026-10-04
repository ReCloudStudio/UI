<template>
  <nav
    :class="cn('flex items-center justify-between gap-3', props.class)"
    :aria-label="loc.ariaLabel"
  >
    <p v-if="showSummary" class="text-sm text-[var(--muted-foreground)]">
      {{ loc.pageSummary(modelValue, totalPages) }}
    </p>
    <div class="flex items-center gap-1" :class="!showSummary && 'w-full justify-center'">
      <button
        :class="buttonClasses"
        :disabled="modelValue <= 1"
        :aria-label="loc.prev"
        type="button"
        @click="updatePage(modelValue - 1)"
      >
        {{ loc.prev }}
      </button>
      <button
        v-for="page in pages"
        :key="page"
        type="button"
        :class="cn(
          buttonClasses,
          page === modelValue && 'bg-[var(--primary)] text-[var(--primary-foreground)] ring-[var(--primary)] font-semibold shadow-xs'
        )"
        :aria-current="page === modelValue ? 'page' : undefined"
        @click="updatePage(page)"
      >
        {{ page }}
      </button>
      <button
        :class="buttonClasses"
        :disabled="modelValue >= totalPages"
        :aria-label="loc.next"
        type="button"
        @click="updatePage(modelValue + 1)"
      >
        {{ loc.next }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'
import { useComponentLocale } from '../../locale'

export interface PaginationProps {
  modelValue?: number
  total?: number
  pageSize?: number
  siblingCount?: number
  showSummary?: boolean
  class?: string
}

const props = withDefaults(defineProps<PaginationProps>(), {
  modelValue: 1,
  total: 0,
  pageSize: 10,
  siblingCount: 1,
  showSummary: true,
  class: ''
})

const emit = defineEmits<{ (event: 'update:modelValue', page: number): void }>()
const loc = useComponentLocale('pagination')

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const pages = computed(() => Array.from({ length: Math.min(totalPages.value, props.siblingCount * 2 + 3) }, (_, index) => {
  const start = Math.min(Math.max(props.modelValue - props.siblingCount, 1), Math.max(totalPages.value - (props.siblingCount * 2 + 2), 1))
  return start + index
}))

const buttonClasses = 'inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium text-[var(--muted-foreground)] ring-1 ring-inset ring-transparent transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)] disabled:pointer-events-none disabled:opacity-40'

function updatePage(page: number) {
  emit('update:modelValue', Math.min(Math.max(page, 1), totalPages.value))
}
</script>
