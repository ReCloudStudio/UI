export type HeroLayout = 'center' | 'split' | 'minimal'

export interface HeroProps {
  layout?: HeroLayout
  badge?: string
  title?: string
  description?: string
  primaryActionText?: string
  secondaryActionText?: string
  class?: string
}
