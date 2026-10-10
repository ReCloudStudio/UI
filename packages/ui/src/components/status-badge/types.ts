export type StatusBadgeTone = "online" | "offline" | "degraded" | "pending" | "info" | "neutral";

export type StatusBadgeVariant = "subtle" | "soft" | "outline" | "solid";

export type StatusBadgeSize = "xs" | "sm" | "md" | "lg";

export interface StatusBadgeProps {
  status?: StatusBadgeTone;
  label?: string;
  variant?: StatusBadgeVariant;
  size?: StatusBadgeSize;
  dot?: boolean;
  pulse?: boolean;
  class?: string;
}
