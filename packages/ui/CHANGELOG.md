# @recloudstudio/ui

## 0.3.0

### Minor Changes

- a9d63bd: Add documentation and typography component suite: Callout, InlineCode, Steps, AnchorHeading, Toc, PrevNext, NavTree, and CodeGroup with accessibility and locale support.
- cb1839b: Add universal `Icon` component and multi-library icon resolution registry with `IconSource` integration across TreeView, NavTree, CommandPalette, Tabs, CodeBlock, and menus.
- 10457fd: Add landing page components: Navbar (SiteHeader), Footer, and Hero with layout variants, responsive mobile drawer, and CTA slots.
- 6e23ed0: Add lightweight i18n locale injection context with default zh-CN/en-US messages, adapt Pagination, EmptyState, DataTable, FileUpload, and TreeView to consume contextual translations, and document usage in Playground.
- cb1828a: Add highlight-variant customization, active selection badges, asynchronous child node loading, multi-selection mode, drag-and-drop reordering, and icon/label slots to TreeView.
- 8382379: Add collapsible desktop sidebars, mobile menu trigger slots, and content width conventions to AppShell. Document responsive Sheet navigation and AppShell, Sidebar, and NavigationMenu responsibilities.
- 407951c: Add a configurable theme system with system color mode, palettes, density, radius, shadows, persistent preferences, and hydration-safe Nuxt initialization. Publish layered primitive and semantic CSS design tokens for consistent component styling.

### Patch Changes

- ef36708: Enhance DataTable with controlled sorting, pagination, selection, column visibility, and loading, empty, and error states.
- 044917a: Add TreeView for accessible resource, directory, and permission hierarchies with selection, expansion, and cascaded checkbox states.
- 62cf1b5: Expand i18n localization coverage across components (Select, Combobox, MultiSelect, DatePicker, DateRangePicker, CodeBlock, Editable, TagInput, AlertDialog, DataTable) and eliminate hardcoded Chinese fallbacks.
- e0be157: Add Sheet, a directional drawer for console details and secondary actions.
- 30b131f: Add Timeline for operational logs and change history with status markers, actor metadata, and customization slots.
- 39f3ac9: Add DatePicker and DateRangePicker with stable local date values and range presets.
- b3a472f: Match code block surfaces and syntax highlighting to the active light or dark theme.
- 4299b51: Fix Dialog trigger slot handling, DataTable fallback for empty or undefined rows, TagInput IME composition behavior, Nuxt module type prefix, and package externalization.
- 93d285e: Add the experimental CommandPalette for accessible command navigation in developer tools.
- da38d21: Add AppShell and Sidebar primitives for developer console layouts.
- ad9579b: Add FileUpload with drag-and-drop, validation, upload progress, cancellation, previews, and retry states.
- d3e231c: Add MultiSelect with searchable grouped options, removable selection tags, clearing, and form validation support.
- 6269ae1: Add ResizablePanel for accessible, keyboard-adjustable console workspaces.

## 0.2.0

### Minor Changes

- 1780397: Add a copyable, syntax-highlighted CodeBlock component with file metadata, line numbers, wrapping, scrollable output, and an optional collapsible body (`collapsible` + `v-model:collapsed`).
- 7e97cb0: Add TagInput and change the Nuxt component prefix to Re.
- e2ed65e: Add configurable Progress displays, a top-right Avatar status indicator, and resilient Input prefix layout.

### Patch Changes

- a7b9919: Fix AlertDialog trigger behavior without a controlled open state.
- 4765e22: Improve readability: use red-700 text for the soft error Button to meet WCAG AA contrast, and raise the contrast of the CodeBlock language label, collapse chevron, and line numbers.
- f8e5824: Improve the CollapsiblePanel indicator and uncontrolled open state.
- f8e5824: Improve Input prefix and suffix contrast.
