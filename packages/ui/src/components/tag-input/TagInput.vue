<template>
  <Field :id="id" :label="label" :hint="hint" :error="error" :required="required">
    <template #default="field">
      <div
        class="w-full rounded-lg bg-white dark:bg-[#0F172A] shadow-xs ring-1 ring-inset transition-all duration-150"
        :class="[
          sizeClasses,
          error
            ? 'ring-red-500 focus-within:ring-2 focus-within:ring-red-500'
            : 'ring-slate-300 dark:ring-slate-700 focus-within:ring-2 focus-within:ring-[#2563EB] dark:focus-within:ring-[#70ACFE]',
          disabled ? 'opacity-50 bg-slate-50 dark:bg-slate-900/60' : '',
          props.class
        ]"
      >
        <div class="flex flex-wrap items-center gap-1.5 p-1.5">
          <span
            v-for="(tag, index) in modelValue"
            :key="`${tag}-${index}`"
            class="inline-flex items-center gap-1 rounded-md bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 text-xs font-medium text-[#1E63CE] dark:text-[#70ACFE]"
          >
            {{ tag }}
            <button
              type="button"
              class="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-blue-400 hover:bg-blue-100 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-blue-500 dark:hover:bg-blue-900 dark:hover:text-blue-300"
              :aria-label="multiLoc.removeAria(tag)"
              :disabled="disabled"
              @click="removeTag(index)"
            >
              <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </span>
          <input
            ref="inputRef"
            :value="draft"
            :placeholder="modelValue.length === 0 ? effectivePlaceholder : ''"
            :disabled="disabled"
            :required="required && modelValue.length === 0"
            :id="field.id"
            :aria-describedby="field.describedby"
            :aria-invalid="field.invalid || undefined"
            :aria-label="label || effectivePlaceholder"
            class="min-w-20 grow bg-transparent px-1.5 py-1 text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed dark:text-slate-100"
            @input="onInput"
            @keydown="onKeydown"
            @paste="onPaste"
            @focus="$emit('focus', $event)"
            @blur="onBlur"
          />
        </div>
      </div>
    </template>
  </Field>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Field from '../field/Field.vue'
import { useComponentLocale } from '../../locale'

export interface TagInputProps {
  modelValue?: string[]
  placeholder?: string
  separator?: string | string[]
  id?: string
  label?: string
  hint?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  unique?: boolean
  max?: number
  addOnPaste?: boolean
  class?: string
}

const props = withDefaults(defineProps<TagInputProps>(), {
  modelValue: () => [],
  placeholder: undefined,
  separator: ',',
  id: undefined,
  label: '',
  hint: '',
  error: '',
  size: 'md',
  disabled: false,
  required: false,
  unique: true,
  max: undefined,
  addOnPaste: true,
  class: ''
})

const multiLoc = useComponentLocale('multiSelect')
const effectivePlaceholder = computed(() => props.placeholder ?? multiLoc.value.placeholder)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

const draft = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const sizeClasses: Record<NonNullable<TagInputProps['size']>, string> = {
  sm: 'min-h-9',
  md: 'min-h-10',
  lg: 'min-h-11'
}

const separatorsArray = computed(() => {
  if (Array.isArray(props.separator)) return props.separator
  return props.separator ? [props.separator] : []
})

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function splitBySeparators(text: string): string[] {
  const separators = separatorsArray.value
  if (separators.length === 0) return [text]
  const pattern = new RegExp(separators.map(escapeRegExp).join('|'))
  return text.split(pattern)
}

function commitMany(values: string[]) {
  let next = [...props.modelValue]
  for (const raw of values) {
    const value = raw.trim()
    if (!value) continue
    if (props.unique && next.includes(value)) continue
    if (props.max !== undefined && next.length >= props.max) break
    next.push(value)
  }
  if (next.length !== props.modelValue.length) {
    emit('update:modelValue', next)
  }
}

function removeTag(index: number) {
  const next = [...props.modelValue]
  next.splice(index, 1)
  emit('update:modelValue', next)
  inputRef.value?.focus()
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value
  const separators = separatorsArray.value
  if (separators.length === 0) {
    draft.value = value
    return
  }
  const pattern = new RegExp(separators.map(escapeRegExp).join('|'))
  if (!pattern.test(value)) {
    draft.value = value
    return
  }
  const parts = value.split(pattern)
  const completed = parts.slice(0, -1)
  draft.value = parts[parts.length - 1] ?? ""
  target.value = draft.value
  commitMany(completed)
}

function onKeydown(event: KeyboardEvent) {
  if (event.isComposing || event.keyCode === 229) return
  if (event.key === 'Enter') {
    event.preventDefault()
    commitMany([draft.value])
    draft.value = ''
  } else if (event.key === 'Backspace' && draft.value === '' && props.modelValue.length > 0) {
    event.preventDefault()
    removeTag(props.modelValue.length - 1)
  }
}

function onPaste(event: ClipboardEvent) {
  if (!props.addOnPaste) return
  event.preventDefault()
  const text = event.clipboardData?.getData('text') ?? ''
  const parts = splitBySeparators(text)
  const all = draft.value ? [draft.value, ...parts] : parts
  commitMany(all)
  draft.value = ''
}

function onBlur(event: FocusEvent) {
  if (draft.value) {
    commitMany([draft.value])
    draft.value = ''
  }
  emit('blur', event)
}
</script>
