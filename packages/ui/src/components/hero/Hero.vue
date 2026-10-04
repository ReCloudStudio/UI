<template>
  <section
    :class="[
      'relative overflow-hidden py-16 sm:py-24 transition-colors',
      props.class
    ]"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Layout: Center (Default) -->
      <div v-if="layout === 'center'" class="mx-auto max-w-3xl text-center">
        <!-- Badge -->
        <div v-if="badge || $slots.badge" class="mb-4 inline-flex items-center">
          <slot name="badge">
            <span class="inline-flex items-center gap-1.5 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 px-3 py-1 text-xs font-medium text-[#2563EB] dark:border-[#70ACFE]/20 dark:bg-[#70ACFE]/10 dark:text-[#70ACFE]">
              {{ badge }}
            </span>
          </slot>
        </div>

        <!-- Title / Heading -->
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
          <slot name="title">{{ title }}</slot>
        </h1>

        <!-- Subtitle / Description -->
        <p v-if="description || $slots.description" class="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg lg:text-xl dark:text-slate-400 leading-relaxed">
          <slot name="description">{{ description }}</slot>
        </p>

        <!-- CTA Actions -->
        <div v-if="hasActions" class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <slot name="actions">
            <slot name="primary-action">
              <button
                v-if="primaryActionText"
                type="button"
                class="rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8]"
                @click="$emit('primary-click')"
              >
                {{ primaryActionText }}
              </button>
            </slot>
            <slot name="secondary-action">
              <button
                v-if="secondaryActionText"
                type="button"
                class="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-[#0F172A] dark:text-slate-200 dark:hover:bg-slate-800"
                @click="$emit('secondary-click')"
              >
                {{ secondaryActionText }}
              </button>
            </slot>
          </slot>
        </div>

        <!-- Center Media / Preview slot -->
        <div v-if="$slots.media" class="mt-12 w-full">
          <slot name="media" />
        </div>
      </div>

      <!-- Layout: Split (Left text, Right media) -->
      <div v-else-if="layout === 'split'" class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div class="space-y-6">
          <div v-if="badge || $slots.badge" class="inline-flex items-center">
            <slot name="badge">
              <span class="inline-flex items-center gap-1.5 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 px-3 py-1 text-xs font-medium text-[#2563EB] dark:border-[#70ACFE]/20 dark:bg-[#70ACFE]/10 dark:text-[#70ACFE]">
                {{ badge }}
              </span>
            </slot>
          </div>

          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-5xl dark:text-slate-100">
            <slot name="title">{{ title }}</slot>
          </h1>

          <p v-if="description || $slots.description" class="text-base text-slate-600 sm:text-lg dark:text-slate-400 leading-relaxed">
            <slot name="description">{{ description }}</slot>
          </p>

          <div v-if="hasActions" class="flex flex-wrap items-center gap-4 pt-2">
            <slot name="actions">
              <slot name="primary-action">
                <button
                  v-if="primaryActionText"
                  type="button"
                  class="rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8]"
                  @click="$emit('primary-click')"
                >
                  {{ primaryActionText }}
                </button>
              </slot>
              <slot name="secondary-action">
                <button
                  v-if="secondaryActionText"
                  type="button"
                  class="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-[#0F172A] dark:text-slate-200 dark:hover:bg-slate-800"
                  @click="$emit('secondary-click')"
                >
                  {{ secondaryActionText }}
                </button>
              </slot>
            </slot>
          </div>
        </div>

        <div v-if="$slots.media" class="w-full">
          <slot name="media" />
        </div>
      </div>

      <!-- Layout: Minimal (Clean, left-aligned, low vertical height) -->
      <div v-else class="max-w-3xl space-y-4">
        <h1 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          <slot name="title">{{ title }}</slot>
        </h1>
        <p v-if="description || $slots.description" class="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          <slot name="description">{{ description }}</slot>
        </p>
        <div v-if="hasActions" class="flex flex-wrap items-center gap-3 pt-2">
          <slot name="actions">
            <slot name="primary-action">
              <button
                v-if="primaryActionText"
                type="button"
                class="rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                @click="$emit('primary-click')"
              >
                {{ primaryActionText }}
              </button>
            </slot>
            <slot name="secondary-action">
              <button
                v-if="secondaryActionText"
                type="button"
                class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-[#0F172A] dark:text-slate-200"
                @click="$emit('secondary-click')"
              >
                {{ secondaryActionText }}
              </button>
            </slot>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { HeroProps } from './types'

const props = withDefaults(defineProps<HeroProps>(), {
  layout: 'center',
  badge: undefined,
  title: '',
  description: undefined,
  primaryActionText: undefined,
  secondaryActionText: undefined,
  class: ''
})

defineEmits<{
  (e: 'primary-click'): void
  (e: 'secondary-click'): void
}>()

const slots = useSlots()

const hasActions = computed(() => {
  return (
    !!props.primaryActionText ||
    !!props.secondaryActionText ||
    !!slots.actions ||
    !!slots['primary-action'] ||
    !!slots['secondary-action']
  )
})
</script>
