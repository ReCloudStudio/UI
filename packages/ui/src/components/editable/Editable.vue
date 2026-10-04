<template>
  <EditableRoot
    v-slot="{ isEditing }"
    :model-value="modelValue"
    :placeholder="effectivePlaceholder"
    :disabled="disabled"
    :readonly="readonly"
    select-on-focus
    submit-mode="both"
    class="group inline-flex max-w-full items-center gap-1.5"
    :class="props.class"
    @update:model-value="$emit('update:modelValue', $event as string)"
  >
    <EditableArea class="inline-flex min-w-0 items-center rounded-md">
      <EditablePreview
        class="max-w-full truncate border-b border-dashed border-slate-300 px-1 py-0.5 text-sm text-slate-900 transition-colors group-hover:border-slate-400 dark:border-slate-700 dark:text-slate-100"
      />
      <EditableInput
        class="w-48 rounded-md bg-white px-1.5 py-0.5 text-sm text-slate-900 outline-none ring-2 ring-[#2563EB] dark:bg-[#0F172A] dark:text-slate-100 dark:ring-[#70ACFE]"
      />
    </EditableArea>
    <span v-if="!disabled && !readonly" class="inline-flex items-center gap-0.5">
      <template v-if="isEditing">
        <EditableSubmitTrigger
          class="inline-flex size-6 cursor-pointer items-center justify-center rounded-md text-emerald-600 transition-colors hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
          :aria-label="commonLoc.save"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
        </EditableSubmitTrigger>
        <EditableCancelTrigger
          class="inline-flex size-6 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          :aria-label="commonLoc.cancel"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M18 6 6 18M6 6l12 12" /></svg>
        </EditableCancelTrigger>
      </template>
      <EditTrigger
        v-else
        class="inline-flex size-6 cursor-pointer items-center justify-center rounded-md text-slate-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800"
        :aria-label="commonLoc.edit"
      >
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
      </EditTrigger>
    </span>
  </EditableRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  EditableRoot,
  EditableArea,
  EditablePreview,
  EditableInput,
  EditableSubmitTrigger,
  EditableCancelTrigger,
  EditableEditTrigger as EditTrigger
} from 'reka-ui'
import { useComponentLocale } from '../../locale'

export interface EditableProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  class?: string
}

const props = withDefaults(defineProps<EditableProps>(), {
  modelValue: '',
  placeholder: undefined,
  disabled: false,
  readonly: false,
  class: ''
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const commonLoc = useComponentLocale('common')
const effectivePlaceholder = computed(() => props.placeholder ?? commonLoc.value.edit)
</script>
