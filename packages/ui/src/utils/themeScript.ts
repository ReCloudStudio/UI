import type { ThemePreferences } from "../composables/useTheme";

/**
 * Inline this before application markup to apply persisted theme attributes before Vue hydrates.
 * Nuxt users receive it automatically through the module when `injectTheme` is enabled.
 */
export function createThemeInitScript(
  storageKey = "recloud-theme",
  defaults: Partial<ThemePreferences> = {},
): string {
  const fallback = JSON.stringify({
    mode: "system",
    palette: "recloud",
    density: "comfortable",
    radius: "md",
    shadow: "sm",
    ...defaults,
  });
  return `(function(){try{var fallback=${fallback};var saved=JSON.parse(localStorage.getItem(${JSON.stringify(storageKey)})||'{}');var p=Object.assign({},fallback,saved);var mode=p.mode==='auto'?'system':p.mode;var dark=mode==='dark'||(mode==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);var root=document.documentElement;root.classList.toggle('dark',dark);root.dataset.theme=dark?'dark':'light';root.dataset.themeMode=mode;root.dataset.themePalette=p.palette;root.dataset.themeDensity=p.density;root.dataset.themeRadius=p.radius;root.dataset.themeShadow=p.shadow}catch(e){}})();`;
}
