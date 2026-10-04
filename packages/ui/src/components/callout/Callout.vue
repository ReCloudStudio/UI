<template>
  <div
    :class="[
      'my-5 rounded-xl border text-sm transition-colors',
      styleConfig.container,
      props.class
    ]"
    role="region"
    :aria-label="title || type"
  >
    <div
      :class="[
        'flex items-start gap-3 p-4',
        collapsible ? 'cursor-pointer select-none' : ''
      ]"
      @click="collapsible && toggle()"
    >
      <div class="mt-0.5 shrink-0" :class="styleConfig.iconClass">
        <slot name="icon">
          <!-- note -->
          <svg v-if="type === 'note'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          <!-- tip -->
          <svg v-else-if="type === 'tip'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.439a8.966 8.966 0 01-4.5 0m4.5 0v.75A2.25 2.25 0 0112 23.25h0A2.25 2.25 0 019.75 21v-.75m6-12a6 6 0 10-12 0c0 2.22 1.206 4.16 3 5.197V15a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0015 15v-1.553c1.794-1.037 3-2.977 3-5.197z" />
          </svg>
          <!-- warning -->
          <svg v-else-if="type === 'warning'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <!-- danger -->
          <svg v-else-if="type === 'danger'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <!-- info (default) -->
          <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </slot>
      </div>

      <div class="min-w-0 flex-1">
        <div class="flex items-center justify-between gap-2">
          <div :class="['font-semibold tracking-tight', styleConfig.titleClass]">
            <slot name="title">{{ computedTitle }}</slot>
          </div>
          <div v-if="$slots.action" class="shrink-0" @click.stop>
            <slot name="action" />
          </div>
          <button
            v-if="collapsible"
            type="button"
            class="rounded p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            :aria-label="isOpen ? '收起' : '展开'"
          >
            <svg
              class="h-4 w-4 transition-transform duration-200"
              :class="isOpen ? 'rotate-180' : ''"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        <div
          v-show="!collapsible || isOpen"
          :class="[
            'leading-relaxed transition-opacity',
            styleConfig.contentClass,
            (title || $slots.title) ? 'mt-1.5' : ''
          ]"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CalloutProps, CalloutType } from './types'

const props = withDefaults(defineProps<CalloutProps>(), {
  type: 'info',
  title: undefined,
  collapsible: false,
  defaultOpen: true,
  class: ''
})

const isOpen = ref(props.defaultOpen)

function toggle() {
  isOpen.value = !isOpen.value
}

const defaultTitles: Record<CalloutType, string> = {
  note: 'Note',
  tip: 'Tip',
  info: 'Info',
  warning: 'Warning',
  danger: 'Danger'
}

const computedTitle = computed(() => props.title ?? defaultTitles[props.type])

const styleMap: Record<CalloutType, { container: string; iconClass: string; titleClass: string; contentClass: string }> = {
  note: {
    container: 'border-slate-300/80 bg-slate-100/70 dark:border-slate-800 dark:bg-slate-900/60',
    iconClass: 'text-slate-600 dark:text-slate-300',
    titleClass: 'text-slate-900 dark:text-slate-100',
    contentClass: 'text-slate-700 dark:text-slate-300'
  },
  tip: {
    container: 'border-emerald-500/25 bg-emerald-500/[0.06] dark:border-emerald-500/30 dark:bg-emerald-500/10',
    iconClass: 'text-emerald-600 dark:text-emerald-400',
    titleClass: 'text-emerald-900 dark:text-emerald-200',
    contentClass: 'text-emerald-950/90 dark:text-emerald-200/90'
  },
  info: {
    container: 'border-[#2563EB]/25 bg-[#2563EB]/[0.05] dark:border-[#70ACFE]/30 dark:bg-[#2563EB]/10',
    iconClass: 'text-[#2563EB] dark:text-[#70ACFE]',
    titleClass: 'text-[#1D4ED8] dark:text-[#70ACFE]',
    contentClass: 'text-slate-800 dark:text-slate-200'
  },
  warning: {
    container: 'border-amber-500/30 bg-amber-500/[0.07] dark:border-amber-400/30 dark:bg-amber-400/10',
    iconClass: 'text-amber-600 dark:text-amber-400',
    titleClass: 'text-amber-900 dark:text-amber-200',
    contentClass: 'text-amber-950/90 dark:text-amber-200/90'
  },
  danger: {
    container: 'border-rose-500/30 bg-rose-500/[0.07] dark:border-rose-500/30 dark:bg-rose-500/10',
    iconClass: 'text-rose-600 dark:text-rose-400',
    titleClass: 'text-rose-900 dark:text-rose-200',
    contentClass: 'text-rose-950/90 dark:text-rose-200/90'
  }
}

const styleConfig = computed(() => styleMap[props.type] ?? styleMap.info)
</script>
