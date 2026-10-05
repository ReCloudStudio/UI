<template>
  <div :class="['overflow-hidden rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-[#090E17]', props.class]">
    <!-- Header Tabs Bar -->
    <div class="flex items-center gap-1 border-b border-slate-200/80 bg-slate-50/80 px-2 pt-1.5 dark:border-slate-800 dark:bg-slate-900/50">
      <button
        v-for="(tab, index) in normalizedTabs"
        :key="tab.key"
        type="button"
        :class="[
          'relative flex items-center gap-1.5 rounded-t-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]',
          activeKey === tab.key
            ? 'border-t border-x border-slate-200/80 bg-white text-slate-900 font-semibold dark:border-slate-800 dark:bg-[#090E17] dark:text-slate-100 -mb-px'
            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
        ]"
        @click="selectTab(tab.key)"
      >
        <Icon v-if="tab.icon" :icon="tab.icon" size="0.875rem" class="shrink-0" />
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Active Tab Content -->
    <div class="p-0">
      <slot :active-key="activeKey" :active-index="activeIndex">
        <slot :name="activeKey" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Icon, type IconSource } from '../icon'
import type { CodeGroupProps, CodeGroupTab } from './types'

const props = withDefaults(defineProps<CodeGroupProps>(), {
  modelValue: undefined,
  tabs: () => [],
  class: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number): void
  (e: 'change', val: string | number): void
}>()

interface InternalTab {
  label: string
  key: string
  icon?: IconSource
}

const normalizedTabs = computed<InternalTab[]>(() => {
  return props.tabs.map((tab) => {
    if (typeof tab === 'string') {
      return { label: tab, key: tab }
    }
    return {
      label: tab.label,
      key: tab.key || tab.label,
      icon: tab.icon
    }
  })
})

const internalActiveKey = ref<string | number>(
  props.modelValue ?? (normalizedTabs.value[0]?.key || 0)
)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined) {
      internalActiveKey.value = val
    }
  }
)

const activeKey = computed(() => internalActiveKey.value)

const activeIndex = computed(() => {
  return normalizedTabs.value.findIndex((t) => t.key === activeKey.value)
})

function selectTab(key: string | number) {
  internalActiveKey.value = key
  emit('update:modelValue', key)
  emit('change', key)
}
</script>
