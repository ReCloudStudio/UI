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

  /** Storage key shared by the SSR initialization script and `useTheme`. */
  themeStorageKey?: string

  /** Apply saved theme attributes before Vue hydrates to prevent a color-mode flash. */
  injectThemeScript?: boolean
}

export const defaultOptions: ModuleOptions = {
  prefix: 'Re',
  injectTheme: true,
  themeStorageKey: 'recloud-theme',
  injectThemeScript: true
}
