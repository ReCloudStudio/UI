<template>
  <div class="space-y-3 pb-8 border-b border-slate-200 dark:border-slate-800/80">
    <div class="flex flex-wrap items-center gap-2.5">
      <span class="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB] dark:text-[#70ACFE]">{{ props.group }}</span>
      <Badge v-if="props.badge" variant="outline" color="neutral" size="xs">{{ props.badge }}</Badge>
    </div>
    <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
      {{ props.title }}
    </h1>
    <p class="text-base text-slate-600 dark:text-slate-300 leading-7 max-w-2xl">
      {{ props.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
export interface DocPageHeaderProps {
  title: string
  description: string
  group?: string
  badge?: string
}

const props = withDefaults(defineProps<DocPageHeaderProps>(), {
  group: 'Components',
  badge: ''
})
</script>
