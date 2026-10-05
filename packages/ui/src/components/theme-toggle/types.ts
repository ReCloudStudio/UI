import type { ThemeMode } from "../../composables/useTheme";

export type ThemeToggleVariant = "button" | "dropdown" | "switch";
export type ThemeToggleSize = "sm" | "md" | "lg";

export interface ThemeToggleProps {
  /**
   * Component display variant.
   * - `button`: Icon button toggling between light and dark (or cycling system).
   * - `dropdown`: Dropdown selecting light, dark, or system.
   * - `switch`: Switch/toggle style.
   * @default 'button'
   */
  variant?: ThemeToggleVariant;
  /**
   * Size of the button or switch.
   * @default 'md'
   */
  size?: ThemeToggleSize;
  /**
   * Controlled mode value (`v-model`). If omitted, uses global `useTheme()`.
   */
  modelValue?: ThemeMode;
  /**
   * Whether clicking button cycles between 'light' -> 'dark' -> 'system'.
   * If false, toggles between 'light' and 'dark'.
   * @default false
   */
  cycleSystem?: boolean;
  /**
   * Custom aria-label override.
   */
  ariaLabel?: string;
  /**
   * Additional classes.
   */
  class?: string;
}
