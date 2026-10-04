<template>
  <div
    :class="cn('flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--border)] px-6 py-10 text-center', props.class)"
  >
    <div
      v-if="$slots.icon"
      class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--muted)] text-[var(--muted-foreground)]"
    >
      <slot name="icon" />
    </div>
    <h3 class="text-sm font-semibold text-[var(--foreground)]">
      {{ displayTitle }}
    </h3>
    <p
      v-if="props.description"
      class="mt-1 max-w-sm text-sm leading-6 text-[var(--muted-foreground)]"
    >
      {{ props.description }}
    </p>
    <div v-if="$slots.default" class="mt-4"><slot /></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'
import { useComponentLocale } from '../../locale'

export interface EmptyStateProps {
  title?: string
  description?: string
  class?: string
}

const props = withDefaults(defineProps<EmptyStateProps>(), {
  title: undefined,
  description: '',
  class: ''
})

const loc = useComponentLocale('empty')
const displayTitle = computed(() => props.title ?? loc.value.defaultTitle)
</script>
