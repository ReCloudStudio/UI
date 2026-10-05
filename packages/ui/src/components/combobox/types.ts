export interface ComboboxOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
}

export interface ComboboxProps {
  modelValue?: string | string[];
  options: ComboboxOption[];
  multiple?: boolean;
  placeholder?: string;
  id?: string;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  emptyText?: string;
  noClear?: boolean;
  disabled?: boolean;
  class?: string;
}
