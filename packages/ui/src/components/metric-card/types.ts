export type MetricTrend = "up" | "down" | "neutral";

export interface MetricCardProps {
  title?: string;
  value?: string | number;
  unit?: string;
  delta?: string | number;
  trend?: MetricTrend;
  deltaDescription?: string;
  description?: string;
  loading?: boolean;
  hoverable?: boolean;
  class?: string;
}
