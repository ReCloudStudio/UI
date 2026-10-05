export interface FooterLink {
  label: string;
  href?: string;
  to?: string;
  target?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocial {
  name: string;
  href: string;
  /** Built-in icon name: github, discord, twitter, or x. Unknown values render the name text. */
  icon?: string;
}

export interface FooterProps {
  brandTitle?: string;
  brandDescription?: string;
  columns?: FooterColumn[];
  copyright?: string;
  socials?: FooterSocial[];
  bordered?: boolean;
  class?: string;
}
