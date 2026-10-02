export const BRAND_COLORS = {
  50: "#C8E0FD",
  100: "#9BC5FE",
  200: "#70ACFE",
  300: "#417BDF",
  600: "#3069C9",
  700: "#1E63CE",
} as const;

export const NEUTRAL_COLORS = {
  ink: "#0E1726",
  text: "#1F2A37",
  textMuted: "#5B6B7B",
  surface: "#FFFFFF",
  surfaceSoft: "#F4F8FE",
  border: "#DCE3EC",
} as const;

export const DARK_COLORS = {
  bgDark: "#0B1220",
  textDark: "#E6EDF6",
  brandDark: "#70ACFE",
  borderDark: "#243044",
} as const;

export const BRAND_GRADIENTS = {
  vertical: "linear-gradient(180deg, #C8E0FD 0%, #9BC5FE 25%, #70ACFE 50%, #417BDF 75%, #3069C9 100%)",
  compact: "linear-gradient(180deg, #C8E0FD 0%, #3069C9 100%)",
  card: "linear-gradient(180deg, #70ACFE 0%, #3069C9 100%)",
} as const;
