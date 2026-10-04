<template>
  <Field :id="id" :label="label" :hint="hint" :error="error" :required="required">
    <template #default="field">
    <ComboboxRoot
      v-model:open="open"
      :model-value="props.modelValue"
      :multiple="multiple"
      :disabled="disabled"
      :placeholder="placeholder"
      class="w-full"
      @update:model-value="$emit('update:modelValue', $event as string | string[])"
    >
      <ComboboxAnchor
        class="flex h-10 w-full items-center gap-1 rounded-lg bg-white px-3 text-sm shadow-xs ring-1 ring-inset ring-slate-300 transition-all focus-within:ring-2 focus-within:ring-[#2563EB] dark:bg-[#0F172A] dark:ring-slate-700 dark:focus-within:ring-[#70ACFE]"
        :class="props.class"
      >
        <ComboboxInput
          class="min-w-0 grow bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed dark:text-slate-100"
          :placeholder="effectivePlaceholder"
          :disabled="disabled"
          :id="field.id"
          :required="required"
          :aria-describedby="field.describedby"
          :aria-invalid="field.invalid || undefined"
          :display-value="(value: any) => String(value ?? '')"
        />
        <ComboboxCancel
          v-if="!noClear"
          class="shrink-0 cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          :aria-label="comboboxLoc.clearAria"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M18 6 6 18M6 6l12 12" /></svg>
        </ComboboxCancel>
        <ComboboxTrigger class="shrink-0 text-slate-400 dark:text-slate-500">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m7 15 5 5 5-5M7 9l5-5 5 5" /></svg>
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxPortal>
        <ComboboxContent
          position="popper"
          :side-offset="4"
          class="z-50 max-h-72 w-[var(--reka-combobox-trigger-width,280px)] overflow-hidden rounded-lg bg-white text-slate-900 shadow-md ring-1 ring-inset ring-slate-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:bg-[#0F172A] dark:text-slate-100 dark:ring-slate-800"
        >
          <ComboboxViewport class="p-1">
            <ComboboxGroup v-for="group in groupedOptions" :key="group.name ?? '__default__'">
              <ComboboxLabel
                v-if="group.name"
                class="px-2 pt-2 pb-1 text-[11px] font-semibold tracking-wide text-slate-400 uppercase dark:text-slate-500"
              >
                {{ group.name }}
              </ComboboxLabel>
              <ComboboxItem
                v-for="opt in group.options"
                :key="opt.value"
                :value="opt.value"
                :disabled="opt.disabled"
                class="relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 pr-8 pl-3 text-sm outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-slate-800 dark:focus:bg-slate-800"
              >
                {{ opt.label }}
                <ComboboxItemIndicator class="absolute right-2 flex items-center justify-center text-[#2563EB] dark:text-[#70ACFE]">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                </ComboboxItemIndicator>
              </ComboboxItem>
            </ComboboxGroup>
            <ComboboxEmpty class="px-3 py-6 text-center text-sm text-slate-400 dark:text-slate-500">
              {{ effectiveEmptyText }}
            </ComboboxEmpty>
          </ComboboxViewport>
        </ComboboxContent>
      </ComboboxPortal>
    </ComboboxRoot>
    </template>
  </Field>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ComboboxRoot,
  ComboboxAnchor,
  ComboboxInput,
  ComboboxCancel,
  ComboboxTrigger,
  ComboboxPortal,
  ComboboxContent,
  ComboboxViewport,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxEmpty
} from 'reka-ui'
import Field from '../field/Field.vue'
import { useComponentLocale } from '../../locale'
import type { ComboboxOption, ComboboxProps } from './types'

const props = withDefaults(defineProps<ComboboxProps>(), {
  modelValue: '',
  multiple: false,
  placeholder: undefined,
  id: undefined,
  label: '',
  hint: '',
  error: '',
  required: false,
  emptyText: undefined,
  noClear: false,
  disabled: false,
  class: ''
})

const comboboxLoc = useComponentLocale('combobox')
const effectivePlaceholder = computed(() => props.placeholder ?? comboboxLoc.value.placeholder)
const effectiveEmptyText = computed(() => props.emptyText ?? comboboxLoc.value.emptyText)

defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()

const open = ref(false)

const groupedOptions = computed(() => {
  const groups: { name: string | undefined; options: ComboboxOption[] }[] = []
  for (const opt of props.options) {
    const last = groups[groups.length - 1]
    if (last && last.name === opt.group) last.options.push(opt)
    else groups.push({ name: opt.group, options: [opt] })
  }
  return groups
})
</script>
