export type SearchInputSize = "sm" | "md" | "lg";
export type SearchInputVariant = "default" | "filled" | "pill";

export interface SearchSuggestion {
  id?: string | number;
  label: string;
  description?: string;
  category?: string;
  icon?: string;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface SearchInputProps {
  /**
   * Current search query string (v-model).
   */
  modelValue?: string;

  /**
   * Placeholder text when search query is empty.
   */
  placeholder?: string;

  /**
   * Search input size.
   */
  size?: SearchInputSize;

  /**
   * Visual variant: default (bordered), filled (muted background), pill (fully rounded).
   */
  variant?: SearchInputVariant;

  /**
   * Whether to show a clear (X) button when query is not empty.
   */
  clearable?: boolean;

  /**
   * Whether pressing Escape clears the search text (when dropdown is closed).
   */
  clearOnEsc?: boolean;

  /**
   * Shows a loading spinner when search request or backend fetch is in progress.
   */
  loading?: boolean;

  /**
   * Debounce time in milliseconds before emitting `@search`. Default: 300.
   */
  debounce?: number;

  /**
   * Keyboard shortcut hint to display (e.g., '⌘K', '/', 'Ctrl+K').
   */
  shortcut?: string;

  /**
   * If true, pressing the shortcut globally focuses this search input.
   */
  enableGlobalShortcut?: boolean;

  /**
   * Accessible ARIA label for the input.
   */
  ariaLabel?: string;

  /**
   * Disabled state.
   */
  disabled?: boolean;

  /**
   * Readonly state.
   */
  readonly?: boolean;

  /**
   * Autocomplete attribute for the HTML input.
   */
  autocomplete?: string;

  /**
   * Suggestions / backend results to display in the dropdown.
   */
  suggestions?: SearchSuggestion[];

  /**
   * Controlled open state for the suggestions dropdown (v-model:open).
   */
  open?: boolean;

  /**
   * Empty state text when suggestions array is empty while dropdown is open.
   */
  emptyText?: string;

  /**
   * Whether to automatically show the dropdown on focus when suggestions exist.
   */
  showDropdownOnFocus?: boolean;

  /**
   * Additional CSS classes for the container.
   */
  class?: string;
}

export interface SearchInputEmits {
  (e: "update:modelValue", value: string): void;
  (e: "update:open", open: boolean): void;
  (e: "search", query: string): void;
  (e: "submit", query: string): void;
  (e: "clear"): void;
  (e: "select", item: SearchSuggestion): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
  (e: "keydown", event: KeyboardEvent): void;
}
