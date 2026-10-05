import type { ContainerSize } from "../container/types";

export type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";
export type SectionVariant = "default" | "muted" | "card" | "brand";

export interface SectionProps {
  /**
   * HTML element to render the section as.
   * @default 'section'
   */
  as?: string;
  /**
   * Background and surface variant of the section.
   * - `default`: transparent / semantic canvas
   * - `muted`: subtle surface background (`--surface-muted`)
   * - `card`: card surface with border (`--card`)
   * - `brand`: primary brand gradient / tint
   * @default 'default'
   */
  variant?: SectionVariant;
  /**
   * Vertical padding rhythm.
   * - `none`: py-0
   * - `sm`: py-8 sm:py-12
   * - `md`: py-12 sm:py-16
   * - `lg`: py-16 sm:py-24
   * - `xl`: py-20 sm:py-32
   * @default 'md'
   */
  spacing?: SectionSpacing;
  /**
   * Whether to wrap children in a built-in `<Container>`.
   * Pass `false` if the section needs full-bleed custom layout.
   * @default true
   */
  container?: boolean;
  /**
   * Container max-width size when `container` is true.
   * @default 'xl'
   */
  containerSize?: ContainerSize;
  /**
   * Optional section title in a built-in header.
   */
  title?: string;
  /**
   * Optional section subtitle or description.
   */
  description?: string;
  /**
   * Text alignment for built-in section header.
   * @default 'center'
   */
  align?: "left" | "center";
  /**
   * Additional classes for the outer section element.
   */
  class?: string;
}
