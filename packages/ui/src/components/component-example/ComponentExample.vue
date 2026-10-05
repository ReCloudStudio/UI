<template>
  <section :class="cn('space-y-3', props.class)">
    <div v-if="props.title || $slots.header" class="flex items-baseline justify-between gap-4">
      <h3 class="text-base font-semibold tracking-tight text-[color:var(--foreground)]">
        <slot name="header">{{ props.title }}</slot>
      </h3>
      <span v-if="props.badge" class="font-mono text-[11px] text-[color:var(--muted-foreground)]">{{ props.badge }}</span>
    </div>
    <p v-if="props.description" class="-mt-1 max-w-2xl text-sm leading-6 text-[color:var(--muted-foreground)]">
      {{ props.description }}
    </p>

    <Card v-if="$slots.default" variant="outline" padding="none">
      <div class="bg-grid-pattern/40 p-6 sm:p-8">
        <div class="rc-component-example-preview">
          <slot />
        </div>
      </div>
    </Card>

    <CodeBlock
      v-if="props.code"
      v-model:collapsed="codeCollapsed"
      collapsible
      :code="props.code"
      :language="codeLanguage"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '../../utils/cn'
import Card from '../card/Card.vue'
import CodeBlock from '../code-block/CodeBlock.vue'
import type { ComponentExampleProps } from './types'

const props = withDefaults(defineProps<ComponentExampleProps>(), {
  title: '',
  description: '',
  code: '',
  badge: '',
  expanded: true,
  class: ''
})

const codeCollapsed = ref(!props.expanded)

const codeLanguage = computed(() => {
  const code = props.code
  const first = code.trimStart().slice(0, 40)

  if (/^(# |npm |bun |pnpm |yarn |npx )/.test(first)) return 'bash'
  if (/^\/\//.test(first) && /defineNuxtConfig|export default/.test(code)) return 'ts'
  if (/^(import |export |const |let |function |interface |type |async )/.test(first)) return 'ts'
  if (/^[{[]/.test(first)) return 'json'
  return 'vue'
})
</script>

<style scoped>
.rc-component-example-preview :deep(.demo-grid) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.625rem;
}
</style>
