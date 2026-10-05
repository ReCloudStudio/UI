import type { IconSource } from '../icon'

export interface CommandItem {
  /** Stable identifier returned with the select event. */
  id: string
  label: string
  description?: string
  keywords?: string[]
  shortcut?: string[]
  icon?: IconSource
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
