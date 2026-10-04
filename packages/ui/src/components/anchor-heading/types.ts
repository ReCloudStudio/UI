export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface AnchorHeadingProps {
  as?: HeadingLevel
  id?: string
  copyable?: boolean
  class?: string
}
