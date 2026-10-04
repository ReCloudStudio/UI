export interface MultiSelectOption {
  label: string
  value: string
  disabled?: boolean
  group?: string
}

export interface MultiSelectProps {
  modelValue?: string[]
  options: MultiSelectOption[]
  placeholder?: string
  id?: string
  label?: string
  hint?: string
  error?: string
  required?: boolean
  emptyText?: string
  clearable?: boolean
  disabled?: boolean
  class?: string
}
