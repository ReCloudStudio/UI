<template>
  <span :class="avatarClasses">
    <img
      v-if="src && !imageFailed"
      :src="src"
      :alt="alt"
      class="h-full w-full object-cover"
      @error="imageFailed = true"
    />
    <slot v-else>{{ fallback }}</slot>
    <span v-if="status" :class="statusClasses" />
  </span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { cn } from '../../utils/cn'

export interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'busy' | 'away'
  class?: string
}

const props = withDefaults(defineProps<AvatarProps>(), {
  src: '',
  alt: '',
  fallback: '',
  size: 'md',
  status: undefined,
  class: ''
})

const imageFailed = ref(false)

watch(() => props.src, () => {
  imageFailed.value = false
})

const avatarClasses = computed(() => cn(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 font-semibold text-slate-600 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700',
  {
    xs: 'h-5 w-5 text-[9px]',
    sm: 'h-7 w-7 text-[10px]',
    md: 'h-9 w-9 text-xs',
    lg: 'h-11 w-11 text-sm',
    xl: 'h-14 w-14 text-base'
  }[props.size],
  props.class
))

const statusClasses = computed(() => cn(
  'absolute bottom-0 right-0 rounded-full bg-slate-400 ring-2 ring-white dark:ring-[#0F172A]',
  {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-3.5 w-3.5'
  }[props.size],
  props.status === 'online' && 'bg-emerald-500',
  props.status === 'busy' && 'bg-red-500',
  props.status === 'away' && 'bg-amber-400'
))
</script>
