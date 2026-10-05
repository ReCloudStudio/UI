import type { IconSource } from '../icon'

export interface NavTreeItem {
  title: string
  href?: string
  to?: string
  badge?: string
  icon?: IconSource
  disabled?: boolean
}

export interface NavTreeGroup {
  title: string
  collapsible?: boolean
  defaultOpen?: boolean
  items: NavTreeItem[]
}

export interface NavTreeProps {
  groups: NavTreeGroup[]
  activeHref?: string
  searchable?: boolean
  searchPlaceholder?: string
  class?: string
}
