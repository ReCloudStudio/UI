export type FileUploadStatus = "pending" | "uploading" | "success" | "error" | "cancelled";

export interface FileUploadItem {
  id: string;
  file: File;
  status: FileUploadStatus;
  progress?: number;
  error?: string;
  previewUrl?: string;
}

export interface FileUploadRequest {
  file: File;
  signal: AbortSignal;
  setProgress: (value: number) => void;
}

export type FileUploadHandler = (request: FileUploadRequest) => Promise<void>;
