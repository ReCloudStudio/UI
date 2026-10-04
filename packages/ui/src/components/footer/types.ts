export interface FooterLink {
  label: string
  href?: string
  to?: string
  target?: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterSocial {
  name: string
  href: string
  icon?: string
}

export interface FooterProps {
  brandTitle?: string
  brandDescription?: string
  columns?: FooterColumn[]
  copyright?: string
  socials?: FooterSocial[]
  bordered?: boolean
  class?: string
}
