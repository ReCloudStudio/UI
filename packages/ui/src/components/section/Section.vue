<template>
  <component
    :is="as"
    :class="[
      'w-full transition-colors relative',
      variantClasses[variant],
      spacingClasses[spacing],
      props.class
    ]"
  >
    <!-- Built-in Container wrap -->
    <Container v-if="container" :size="containerSize">
      <!-- Section Header if title / description / slots present -->
      <div
        v-if="title || description || $slots.header || $slots.title || $slots.description"
        :class="[
          'mb-8 sm:mb-12',
          align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-left'
        ]"
      >
        <slot name="header">
          <h2 v-if="title || $slots.title" class="text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl lg:text-4xl">
            <slot name="title">{{ title }}</slot>
          </h2>
          <p v-if="description || $slots.description" class="mt-3 text-base text-[color:var(--muted-foreground)] sm:text-lg">
            <slot name="description">{{ description }}</slot>
          </p>
        </slot>
      </div>

      <slot />
    </Container>

    <!-- Raw content slot without Container -->
    <template v-else>
      <div
        v-if="title || description || $slots.header || $slots.title || $slots.description"
        :class="[
          'mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8',
          align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-left'
        ]"
      >
        <slot name="header">
          <h2 v-if="title || $slots.title" class="text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl lg:text-4xl">
            <slot name="title">{{ title }}</slot>
          </h2>
          <p v-if="description || $slots.description" class="mt-3 text-base text-[color:var(--muted-foreground)] sm:text-lg">
            <slot name="description">{{ description }}</slot>
          </p>
        </slot>
      </div>

      <slot />
    </template>
  </component>
</template>

<script setup lang="ts">
import Container from '../container/Container.vue'
import type { SectionProps, SectionSpacing, SectionVariant } from './types'

const props = withDefaults(defineProps<SectionProps>(), {
  as: 'section',
  variant: 'default',
  spacing: 'md',
  container: true,
  containerSize: 'xl',
  align: 'center'
})

const variantClasses: Record<SectionVariant, string> = {
  default: 'bg-transparent',
  muted: 'bg-[color:var(--surface-muted)]/50',
  card: 'bg-[color:var(--card)] border-y border-[color:var(--border)]',
  brand: 'bg-gradient-to-b from-[color:var(--primary)]/10 via-[color:var(--primary)]/5 to-transparent'
}

const spacingClasses: Record<SectionSpacing, string> = {
  none: 'py-0',
  sm: 'py-8 sm:py-12',
  md: 'py-12 sm:py-16',
  lg: 'py-16 sm:py-24',
  xl: 'py-20 sm:py-32'
}
</script>
