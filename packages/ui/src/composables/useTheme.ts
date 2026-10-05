import { computed, onMounted, ref } from "vue";

/** `auto` is retained as a backwards-compatible alias for `system`. */
export type ThemeMode = "light" | "dark" | "system" | "auto";
export type ResolvedThemeMode = "light" | "dark";
export type ThemePalette = "recloud" | "ocean" | "violet" | "slate";
export type ThemeDensity = "compact" | "comfortable" | "spacious";
export type ThemeRadius = "none" | "sm" | "md" | "lg";
export type ThemeShadow = "none" | "sm" | "md" | "lg";

export interface ThemePreferences {
  mode: ThemeMode;
  palette: ThemePalette;
  density: ThemeDensity;
  radius: ThemeRadius;
  shadow: ThemeShadow;
}

export interface UseThemeOptions {
  storageKey?: string;
  defaultMode?: ThemeMode;
  defaultPalette?: ThemePalette;
  defaultDensity?: ThemeDensity;
  defaultRadius?: ThemeRadius;
  defaultShadow?: ThemeShadow;
}

const defaults: ThemePreferences = {
  mode: "system",
  palette: "recloud",
  density: "comfortable",
  radius: "md",
  shadow: "sm",
};

const preferences = ref<ThemePreferences>({ ...defaults });
const systemIsDark = ref(false);
let initialized = false;
let mediaQuery: MediaQueryList | undefined;
let storageKey = "recloud-theme";

function normalizeMode(mode: ThemeMode): "light" | "dark" | "system" {
  return mode === "auto" ? "system" : mode;
}

function resolveTheme(mode = preferences.value.mode): ResolvedThemeMode {
  return normalizeMode(mode) === "dark" || (normalizeMode(mode) === "system" && systemIsDark.value)
    ? "dark"
    : "light";
}

function applyTheme() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const resolved = resolveTheme();
  root.classList.toggle("dark", resolved === "dark");
  root.dataset.theme = resolved;
  root.dataset.themeMode = normalizeMode(preferences.value.mode);
  root.dataset.themePalette = preferences.value.palette;
  root.dataset.themeDensity = preferences.value.density;
  root.dataset.themeRadius = preferences.value.radius;
  root.dataset.themeShadow = preferences.value.shadow;
}

function persist() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey, JSON.stringify(preferences.value));
}

function hydrate(options: UseThemeOptions) {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  storageKey = options.storageKey ?? storageKey;
  const fallback: ThemePreferences = {
    mode: options.defaultMode ?? defaults.mode,
    palette: options.defaultPalette ?? defaults.palette,
    density: options.defaultDensity ?? defaults.density,
    radius: options.defaultRadius ?? defaults.radius,
    shadow: options.defaultShadow ?? defaults.shadow,
  };
  try {
    const saved = JSON.parse(
      window.localStorage.getItem(storageKey) ?? "{}",
    ) as Partial<ThemePreferences>;
    preferences.value = { ...fallback, ...saved };
  } catch {
    preferences.value = fallback;
  }
  mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
  systemIsDark.value = mediaQuery?.matches ?? false;
  mediaQuery?.addEventListener("change", (event) => {
    systemIsDark.value = event.matches;
    if (normalizeMode(preferences.value.mode) === "system") applyTheme();
  });
  applyTheme();
}

export function useTheme(options: UseThemeOptions = {}) {
  onMounted(() => hydrate(options));

  const resolvedMode = computed<ResolvedThemeMode>(() => resolveTheme());
  const isDark = computed(() => resolvedMode.value === "dark");

  function update(next: Partial<ThemePreferences>) {
    preferences.value = { ...preferences.value, ...next };
    persist();
    applyTheme();
  }

  function setMode(mode: ThemeMode) {
    update({ mode: normalizeMode(mode) });
  }
  function setPalette(palette: ThemePalette) {
    update({ palette });
  }
  function setDensity(density: ThemeDensity) {
    update({ density });
  }
  function setRadius(radius: ThemeRadius) {
    update({ radius });
  }
  function setShadow(shadow: ThemeShadow) {
    update({ shadow });
  }
  function toggle() {
    setMode(isDark.value ? "light" : "dark");
  }

  return {
    mode: computed(() => preferences.value.mode),
    resolvedMode,
    palette: computed(() => preferences.value.palette),
    density: computed(() => preferences.value.density),
    radius: computed(() => preferences.value.radius),
    shadow: computed(() => preferences.value.shadow),
    preferences: computed(() => preferences.value),
    isDark,
    setMode,
    setPalette,
    setDensity,
    setRadius,
    setShadow,
    update,
    toggle,
  };
}
