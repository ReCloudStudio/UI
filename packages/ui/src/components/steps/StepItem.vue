<template>
  <div :class="['relative border-l-2 border-slate-200 pl-8 pb-2 dark:border-slate-800 last:border-transparent', props.class]">
    <!-- Step Badge / Number indicator -->
    <div
      class="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#2563EB] text-xs font-semibold text-white shadow-sm ring-1 ring-slate-900/5 dark:border-[#090E17] dark:bg-[#2563EB] dark:ring-white/10"
    >
      <slot name="step">
        {{ computedStep }}
      </slot>
    </div>

    <!-- Title & Description Header -->
    <div v-if="title || description || $slots.title || $slots.description" class="mb-3">
      <h3 v-if="title || $slots.title" class="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        <slot name="title">{{ title }}</slot>
      </h3>
      <p v-if="description || $slots.description" class="mt-1 text-sm text-slate-600 dark:text-slate-400">
        <slot name="description">{{ description }}</slot>
      </p>
    </div>

    <!-- Step Body -->
    <div class="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'
import { stepsInjectionKey, type StepItemProps } from './types'

const props = withDefaults(defineProps<StepItemProps>(), {
  title: '',
  description: '',
  step: undefined,
  class: ''
})

const context = inject(stepsInjectionKey, null)
const autoStepIndex = ref<number>(1)

onMounted(() => {
  if (context && props.step === undefined) {
    autoStepIndex.value = context.registerStep()
  }
})

const computedStep = computed(() => {
  if (props.step !== undefined) return props.step
  return autoStepIndex.value
})
</script>
