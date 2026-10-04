export interface ModuleOptions {
  /**
   * Prefix for components (e.g. 'Re' -> <ReButton />)
   * @default 'Re'
   */
  prefix?: string

  /**
   * Whether to auto inject theme.css
   * @default true
   */
  injectTheme?: boolean
}

export const defaultOptions: ModuleOptions = {
  prefix: 'Re',
  injectTheme: true
}
