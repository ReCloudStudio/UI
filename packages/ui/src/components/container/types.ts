export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps {
  /**
   * HTML element to render the container as.
   * @default 'div'
   */
  as?: string;
  /**
   * Max width constraint of the container.
   * - `sm`: max-w-screen-sm (~640px)
   * - `md`: max-w-screen-md (~768px)
   * - `lg`: max-w-screen-lg (~1024px)
   * - `xl`: max-w-screen-xl (~1280px / 7xl)
   * - `2xl`: max-w-screen-2xl (~1536px)
   * - `full`: max-w-none (full width)
   * @default 'xl'
   */
  size?: ContainerSize;
  /**
   * Horizontal padding rhythm.
   * @default true
   */
  padded?: boolean;
  /**
   * Additional classes.
   */
  class?: string;
}
