<template>
  <section class="space-y-3">
    <div v-if="props.title || $slots.header" class="flex items-baseline justify-between gap-4">
      <h3 class="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
        <slot name="header">{{ props.title }}</slot>
      </h3>
      <span v-if="props.badge" class="text-[11px] font-mono text-slate-500 dark:text-slate-400">{{ props.badge }}</span>
    </div>
    <p v-if="props.description" class="text-sm leading-6 text-slate-600 dark:text-slate-400 -mt-1 max-w-2xl">
      {{ props.description }}
    </p>

    <div v-if="$slots.default" class="rounded-xl ring-1 ring-inset ring-slate-200/80 dark:ring-slate-800/80 bg-white dark:bg-[#0B1220]">
      <div class="p-6 sm:p-8 bg-grid-pattern/40">
        <div class="preview-area">
          <slot />
        </div>
      </div>

      <CodeBlock
        v-if="props.code"
        v-model:collapsed="codeCollapsed"
        collapsible
        :code="props.code"
        :language="codeLanguage"
        class="rounded-t-none rounded-b-xl border-x-0 border-b-0 shadow-none"
      />
    </div>

    <!-- Code-only examples skip the empty preview area. -->
    <CodeBlock
      v-else-if="props.code"
      v-model:collapsed="codeCollapsed"
      collapsible
      :code="props.code"
      :language="codeLanguage"
      class="shadow-none"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface DocExampleProps {
  title?: string
  description?: string
  code?: string
  badge?: string
  /** Show the code expanded on first render. */
  expanded?: boolean
}

const props = withDefaults(defineProps<DocExampleProps>(), {
  title: '',
  description: '',
  code: '',
  badge: '',
  expanded: false
})

const codeCollapsed = ref(!props.expanded)

/** Infer the snippet language; CodeBlock resolves aliases such as `ts` and `bash`. */
const codeLanguage = computed(() => {
  const code = props.code
  const first = code.trimStart().slice(0, 40)
  if (/^(# |npm |bun |pnpm |yarn |npx )/.test(first)) return 'bash'
  if (/^\/\//.test(first) && /defineNuxtConfig|export default/.test(code)) return 'ts'
  if (/^[{[]/.test(first)) return 'json'
  return 'vue'
})

</script>

<style scoped>
.preview-area :deep(.demo-grid) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.625rem;
}
</style>
