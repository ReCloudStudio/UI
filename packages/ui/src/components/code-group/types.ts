export interface CodeGroupTab {
  label: string
  key?: string
  icon?: string
}

export interface CodeGroupProps {
  modelValue?: string | number
  tabs?: (string | CodeGroupTab)[]
  class?: string
}
