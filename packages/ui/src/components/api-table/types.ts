export type ApiTableRow = Record<string, unknown> & {
  name: string;
  type: string;
  default?: string;
  description: string;
};

export interface ApiTableProps {
  title?: string;
  rows: ApiTableRow[];
  class?: string;
}
