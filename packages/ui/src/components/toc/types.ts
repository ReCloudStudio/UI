export interface TocItem {
  id: string
  title: string
  level?: number
  children?: TocItem[]
}

export interface TocProps {
  items?: TocItem[]
  selector?: string
  container?: string
  scrollSpy?: boolean
  title?: string
  offset?: number
  class?: string
}
