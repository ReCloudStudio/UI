export type DataTableDensity = "compact" | "default" | "relaxed";

export interface DataTableColumn {
  key: string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  slot?: boolean;
  sortable?: boolean;
  hideable?: boolean;
}

export interface DataTableSort {
  key: string;
  direction: "asc" | "desc";
}
