export type TimelineStatus = "default" | "info" | "success" | "warning" | "error";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  status?: TimelineStatus;
  actor?: string;
  avatar?: string;
  metadata?: string;
}
