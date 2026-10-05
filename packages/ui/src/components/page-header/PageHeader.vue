<template>
  <header :class="cn('space-y-3 border-b border-[color:var(--border)] pb-8', props.class)">
    <div class="flex flex-wrap items-center gap-2.5">
      <span v-if="props.group" class="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--primary)]">{{ props.group }}</span>
      <Badge v-if="props.badge" variant="outline" color="neutral" size="xs">{{ props.badge }}</Badge>
    </div>
    <h1 class="text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
      {{ props.title }}
    </h1>
    <p class="max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
      {{ props.description }}
    </p>
  </header>
</template>

<script setup lang="ts">
import { cn } from '../../utils/cn'
import Badge from '../badge/Badge.vue'
import type { PageHeaderProps } from './types'

const props = withDefaults(defineProps<PageHeaderProps>(), {
  group: 'Components',
  badge: '',
  class: ''
})
</script>
