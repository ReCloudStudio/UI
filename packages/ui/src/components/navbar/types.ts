export interface NavbarLink {
  label: string
  href?: string
  to?: string
  target?: string
  badge?: string
  active?: boolean
}

export interface NavbarProps {
  brandTitle?: string
  brandHref?: string
  brandTo?: string
  links?: NavbarLink[]
  sticky?: boolean
  bordered?: boolean
  class?: string
}
