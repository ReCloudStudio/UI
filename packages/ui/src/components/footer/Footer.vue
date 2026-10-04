<template>
  <footer
    :class="[
      'w-full bg-white dark:bg-[#0B1220] text-slate-600 dark:text-slate-400 text-sm transition-colors',
      bordered ? 'border-t border-slate-200/80 dark:border-slate-800' : '',
      props.class
    ]"
  >
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
        <!-- Brand Info / Left Column -->
        <div class="lg:col-span-2 space-y-4 pr-4">
          <div class="flex items-center gap-2.5 font-bold text-slate-900 dark:text-slate-100">
            <slot name="logo">
              <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2563EB] text-white font-black text-xs">
                RC
              </div>
            </slot>
            <span v-if="brandTitle || $slots.brand" class="text-base tracking-tight">
              <slot name="brand">{{ brandTitle }}</slot>
            </span>
          </div>

          <p v-if="brandDescription || $slots.description" class="text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm">
            <slot name="description">{{ brandDescription }}</slot>
          </p>

          <div v-if="$slots.newsletter" class="pt-2">
            <slot name="newsletter" />
          </div>
        </div>

        <!-- Link Columns / Navigation Groups -->
        <div
          v-for="col in columns"
          :key="col.title"
          class="space-y-3"
        >
          <h4 class="text-xs font-semibold tracking-wider text-slate-900 uppercase dark:text-slate-100">
            {{ col.title }}
          </h4>
          <ul class="space-y-2">
            <li v-for="link in col.links" :key="link.label + (link.to || link.href)">
              <component
                :is="link.to ? 'RouterLink' : 'a'"
                v-bind="link.to ? { to: link.to } : { href: link.href || '#', target: link.target }"
                class="text-xs sm:text-sm text-slate-500 transition-colors hover:text-[#2563EB] dark:text-slate-400 dark:hover:text-[#70ACFE]"
              >
                {{ link.label }}
              </component>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar: Copyright & Socials -->
      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 sm:flex-row dark:border-slate-800">
        <p class="text-xs text-slate-400 dark:text-slate-500">
          <slot name="copyright">
            {{ copyright || `© ${new Date().getFullYear()} ReCloud Studio. All rights reserved.` }}
          </slot>
        </p>

        <!-- Social Icons / Links -->
        <div class="flex items-center gap-4">
          <slot name="socials">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
              :aria-label="s.name"
            >
              <span class="text-xs font-medium">{{ s.name }}</span>
            </a>
          </slot>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { FooterProps } from './types'

const props = withDefaults(defineProps<FooterProps>(), {
  brandTitle: '',
  brandDescription: '',
  columns: () => [],
  copyright: undefined,
  socials: () => [],
  bordered: true,
  class: ''
})
</script>
