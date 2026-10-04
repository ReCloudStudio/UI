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
            <span class="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--primary)]/20 bg-[color:var(--primary)]/5 px-3 py-1 text-xs font-medium text-[color:var(--primary)]">
              {{ badge }}
            </span>
          </slot>
        </div>

        <!-- Title / Heading -->
        <h1 class="text-3xl font-extrabold tracking-tight text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
          <slot name="title">{{ title }}</slot>
        </h1>

        <!-- Subtitle / Description -->
        <p v-if="description || $slots.description" class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--muted-foreground)] sm:text-lg lg:text-xl">
          <slot name="description">{{ description }}</slot>
        </p>

        <!-- CTA Actions -->
        <div v-if="hasActions" class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <slot name="actions">
            <slot name="primary-action">
              <button
                v-if="primaryActionText"
                type="button"
                class="rounded-xl bg-[color:var(--primary)] px-5 py-3 text-sm font-semibold text-[color:var(--primary-foreground)] shadow-sm hover:bg-[color:var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
                @click="$emit('primary-click')"
              >
                {{ primaryActionText }}
              </button>
            </slot>
            <slot name="secondary-action">
              <button
                v-if="secondaryActionText"
                type="button"
                class="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] shadow-sm hover:bg-[color:var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
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
              <span class="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--primary)]/20 bg-[color:var(--primary)]/5 px-3 py-1 text-xs font-medium text-[color:var(--primary)]">
                {{ badge }}
              </span>
            </slot>
          </div>

          <h1 class="text-3xl font-extrabold tracking-tight text-[color:var(--foreground)] sm:text-5xl lg:text-5xl">
            <slot name="title">{{ title }}</slot>
          </h1>

          <p v-if="description || $slots.description" class="text-base leading-relaxed text-[color:var(--muted-foreground)] sm:text-lg">
            <slot name="description">{{ description }}</slot>
          </p>

          <div v-if="hasActions" class="flex flex-wrap items-center gap-4 pt-2">
            <slot name="actions">
              <slot name="primary-action">
                <button
                  v-if="primaryActionText"
                  type="button"
                  class="rounded-xl bg-[color:var(--primary)] px-5 py-3 text-sm font-semibold text-[color:var(--primary-foreground)] shadow-sm hover:bg-[color:var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
                  @click="$emit('primary-click')"
                >
                  {{ primaryActionText }}
                </button>
              </slot>
              <slot name="secondary-action">
                <button
                  v-if="secondaryActionText"
                  type="button"
                  class="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] shadow-sm hover:bg-[color:var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
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
        <h1 class="text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
          <slot name="title">{{ title }}</slot>
        </h1>
        <p v-if="description || $slots.description" class="text-sm leading-relaxed text-[color:var(--muted-foreground)] sm:text-base">
          <slot name="description">{{ description }}</slot>
        </p>
        <div v-if="hasActions" class="flex flex-wrap items-center gap-3 pt-2">
          <slot name="actions">
            <slot name="primary-action">
              <button
                v-if="primaryActionText"
                type="button"
                class="rounded-lg bg-[color:var(--primary)] px-4 py-2 text-xs font-semibold text-[color:var(--primary-foreground)] shadow-sm hover:bg-[color:var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
                @click="$emit('primary-click')"
              >
                {{ primaryActionText }}
              </button>
            </slot>
            <slot name="secondary-action">
              <button
                v-if="secondaryActionText"
                type="button"
                class="rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-xs font-semibold text-[color:var(--foreground)] shadow-sm hover:bg-[color:var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
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
