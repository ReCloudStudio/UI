export interface ModuleOptions {
  /**
   * Prefix for components (e.g. 'Rc' -> <RcButton />)
   * @default 'Rc'
   */
  prefix?: string

  /**
   * Whether to auto inject theme.css
   * @default true
   */
  injectTheme?: boolean
}

export const defaultOptions: ModuleOptions = {
  prefix: 'Rc',
  injectTheme: true
}
