<template>
  <section class="space-y-3">
    <div v-if="props.title || $slots.header" class="flex items-baseline justify-between gap-4">
      <h3 class="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
        <slot name="header">{{ props.title }}</slot>
      </h3>
      <span v-if="props.badge" class="text-[11px] font-mono text-slate-400 dark:text-slate-500">{{ props.badge }}</span>
    </div>
    <p v-if="props.description" class="text-sm leading-6 text-slate-600 dark:text-slate-400 -mt-1 max-w-2xl">
      {{ props.description }}
    </p>

    <div class="rounded-xl ring-1 ring-inset ring-slate-200/80 dark:ring-slate-800/80 bg-white dark:bg-[#0B1220] overflow-hidden">
      <div class="p-6 sm:p-8 bg-grid-pattern/40">
        <div class="preview-area">
          <slot />
        </div>
      </div>

      <div v-if="props.code" class="border-t border-slate-200/80 dark:border-slate-800/80">
        <button
          type="button"
          class="w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          :aria-expanded="showCode"
          @click="showCode = !showCode"
        >
          <span class="flex items-center gap-2">
            <svg class="h-3.5 w-3.5 transition-transform" :class="showCode ? 'rotate-90' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7" /></svg>
            {{ showCode ? '收起代码' : '查看代码' }}
          </span>
          <span
            class="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
            @click.stop="copyCode"
          >
            <svg v-if="!copied" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
            <svg v-else class="h-3.5 w-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
            {{ copied ? '已复制' : '复制' }}
          </span>
        </button>
        <div v-if="showCode" class="px-4 pb-4 pt-2 overflow-x-auto text-[13px] leading-[1.7] font-mono">
          <div v-if="codeHtml" v-html="codeHtml" />
          <pre v-else class="m-0 text-slate-700 dark:text-slate-300"><code>{{ props.code }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { highlightCode, detectLang } from '~/composables/useHighlight'

export interface DocExampleProps {
  title?: string
  description?: string
  code?: string
  badge?: string
}

const props = withDefaults(defineProps<DocExampleProps>(), {
  title: '',
  description: '',
  code: '',
  badge: ''
})

const showCode = ref(false)
const copied = ref(false)
const codeHtml = ref('')

watch(showCode, async (open) => {
  if (open && props.code && !codeHtml.value) {
    codeHtml.value = await highlightCode(props.code, detectLang(props.code))
  }
})

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => (copied.value = false), 1600)
  } catch {
    copied.value = false
  }
}
</script>

<style scoped>
.preview-area :deep(.demo-grid) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.625rem;
}
</style>
