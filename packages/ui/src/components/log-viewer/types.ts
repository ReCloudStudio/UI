export type LogViewerLevel = "info" | "warn" | "error" | "debug";

export interface LogEntry {
  id?: string | number;
  timestamp?: string;
  level?: LogViewerLevel;
  message: string;
}

export interface LogViewerProps {
  logs?: string[] | LogEntry[];
  title?: string;
  height?: string;
  showLineNumbers?: boolean;
  showTimestamps?: boolean;
  searchable?: boolean;
  copyable?: boolean;
  autoScroll?: boolean;
  wrap?: boolean;
  emptyText?: string;
  class?: string;
}
