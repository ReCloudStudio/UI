export interface PrevNextItem {
  title: string
  href?: string
  to?: string
  description?: string
}

export interface PrevNextProps {
  prev?: PrevNextItem
  next?: PrevNextItem
  prevLabel?: string
  nextLabel?: string
  class?: string
}
