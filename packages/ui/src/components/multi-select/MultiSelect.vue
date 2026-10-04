<template>
  <Field :id="props.id" :label="props.label" :hint="props.hint" :error="props.error" :required="props.required">
    <template #default="field">
      <ComboboxRoot v-model:open="open" :model-value="props.modelValue" :multiple="true" :disabled="props.disabled" class="w-full" @update:model-value="updateValue">
        <ComboboxAnchor :class="cn('flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-lg bg-white px-2 py-1.5 text-sm shadow-xs ring-1 ring-inset transition-all focus-within:ring-2 dark:bg-[#0F172A]', props.error ? 'ring-red-500 focus-within:ring-red-500' : 'ring-slate-300 focus-within:ring-[#2563EB] dark:ring-slate-700 dark:focus-within:ring-[#70ACFE]', props.disabled && 'cursor-not-allowed bg-slate-50 opacity-50 dark:bg-slate-900/60', props.class)" :aria-describedby="field.describedby" :aria-invalid="field.invalid || undefined">
          <span v-for="option in selectedOptions" :key="option.value" class="inline-flex max-w-full items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-[#1E63CE] dark:bg-blue-950/60 dark:text-[#70ACFE]">{{ option.label }}<button type="button" :disabled="props.disabled" :aria-label="`移除 ${option.label}`" class="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-blue-400 hover:bg-blue-100 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-blue-500 dark:hover:bg-blue-900" @click.stop="remove(option.value)"><svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M18 6 6 18M6 6l12 12" /></svg></button></span>
          <ComboboxInput :id="field.id" :required="props.required && !props.modelValue.length" :placeholder="props.modelValue.length ? '' : props.placeholder" :disabled="props.disabled" class="min-w-24 grow bg-transparent px-1 py-0.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed dark:text-slate-100" :display-value="() => ''" />
          <button v-if="props.clearable && props.modelValue.length" type="button" :disabled="props.disabled" class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200" aria-label="清除所有选择" @click.stop="clear"><svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M18 6 6 18M6 6l12 12" /></svg></button>
          <ComboboxTrigger class="shrink-0 text-slate-400 dark:text-slate-500"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m7 15 5 5 5-5M7 9l5-5 5 5" /></svg></ComboboxTrigger>
        </ComboboxAnchor>
        <ComboboxPortal><ComboboxContent position="popper" :side-offset="4" class="z-50 max-h-72 w-[var(--reka-combobox-trigger-width,280px)] overflow-hidden rounded-lg bg-white text-slate-900 shadow-md ring-1 ring-inset ring-slate-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:bg-[#0F172A] dark:text-slate-100 dark:ring-slate-800"><ComboboxViewport class="p-1"><ComboboxGroup v-for="group in groupedOptions" :key="group.name ?? '__default__'"><ComboboxLabel v-if="group.name" class="px-2 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{{ group.name }}</ComboboxLabel><ComboboxItem v-for="option in group.options" :key="option.value" :value="option.value" :disabled="option.disabled" class="relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 pr-8 pl-3 text-sm outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-slate-800 dark:focus:bg-slate-800">{{ option.label }}<ComboboxItemIndicator class="absolute right-2 text-[#2563EB] dark:text-[#70ACFE]"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></ComboboxItemIndicator></ComboboxItem></ComboboxGroup><ComboboxEmpty class="px-3 py-6 text-center text-sm text-slate-400 dark:text-slate-500">{{ props.emptyText }}</ComboboxEmpty></ComboboxViewport></ComboboxContent></ComboboxPortal>
      </ComboboxRoot>
    </template>
  </Field>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxLabel, ComboboxPortal, ComboboxRoot, ComboboxTrigger, ComboboxViewport } from 'reka-ui'
import { cn } from '../../utils/cn'
import Field from '../field/Field.vue'
import type { MultiSelectOption, MultiSelectProps } from './types'
const props = withDefaults(defineProps<MultiSelectProps>(), { modelValue: () => [], placeholder: '搜索并选择...', id: undefined, label: '', hint: '', error: '', required: false, emptyText: '无匹配项', clearable: true, disabled: false, class: '' })
const emit = defineEmits<{ (event: 'update:modelValue', value: string[]): void; (event: 'clear'): void }>()
const open = ref(false)
const selectedOptions = computed(() => props.modelValue.map((value) => props.options.find((option) => option.value === value)).filter((option): option is MultiSelectOption => Boolean(option)))
const groupedOptions = computed(() => { const groups: { name?: string; options: MultiSelectOption[] }[] = []; for (const option of props.options) { const previous = groups.at(-1); if (previous && previous.name === option.group) previous.options.push(option); else groups.push({ name: option.group, options: [option] }) } return groups })
function updateValue(value: unknown) { emit('update:modelValue', Array.isArray(value) ? value.map(String) : []) }
function remove(value: string) { emit('update:modelValue', props.modelValue.filter((item) => item !== value)) }
function clear() { emit('update:modelValue', []); emit('clear') }
</script>
