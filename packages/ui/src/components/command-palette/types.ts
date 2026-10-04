import type { Component } from 'vue'

export interface CommandItem {
  /** Stable identifier returned with the select event. */
  id: string
  label: string
  description?: string
  keywords?: string[]
  shortcut?: string[]
  icon?: Component
  disabled?: boolean
  /** Keep the palette open after this item is selected. */
  keepOpen?: boolean
}

export interface CommandGroup {
  id?: string
  heading?: string
  items: CommandItem[]
}

export type CommandFilter = (items: CommandItem[], query: string) => CommandItem[]
