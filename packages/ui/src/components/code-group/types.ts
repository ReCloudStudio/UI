import type { IconSource } from "../icon";

export interface CodeGroupTab {
  label: string;
  key?: string;
  icon?: IconSource;
}

export interface CodeGroupProps {
  modelValue?: string | number;
  tabs?: (string | CodeGroupTab)[];
  class?: string;
}
