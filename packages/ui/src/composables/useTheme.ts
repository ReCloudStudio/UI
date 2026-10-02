import { ref, computed, onMounted } from "vue";

export type ThemeMode = "light" | "dark" | "auto";

const currentMode = ref<ThemeMode>("auto");
const systemIsDark = ref(false);

let initialized = false;

function updateMediaListener() {
  if (typeof window === "undefined" || !window.matchMedia) return;
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  systemIsDark.value = mediaQuery.matches;

  mediaQuery.addEventListener("change", (e) => {
    systemIsDark.value = e.matches;
    if (currentMode.value === "auto") {
      applyTheme();
    }
  });
}

function applyTheme() {
  if (typeof document === "undefined") return;

  const isDark =
    currentMode.value === "dark" ||
    (currentMode.value === "auto" && systemIsDark.value);

  const root = document.documentElement;
  const body = document.body;

  if (isDark) {
    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");
    body?.classList.add("dark");
    body?.setAttribute("data-theme", "dark");
  } else {
    root.classList.remove("dark");
    root.setAttribute("data-theme", "light");
    body?.classList.remove("dark");
    body?.setAttribute("data-theme", "light");
  }
}

export function useTheme() {
  onMounted(() => {
    if (!initialized) {
      initialized = true;
      updateMediaListener();

      const saved = localStorage.getItem("recloud-theme") as ThemeMode | null;
      if (saved && (saved === "light" || saved === "dark" || saved === "auto")) {
        currentMode.value = saved;
      }

      applyTheme();
    }
  });

  const isDark = computed(() => {
    return (
      currentMode.value === "dark" ||
      (currentMode.value === "auto" && systemIsDark.value)
    );
  });

  function setMode(mode: ThemeMode) {
    currentMode.value = mode;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("recloud-theme", mode);
    }
    applyTheme();
  }

  function toggle() {
    setMode(isDark.value ? "light" : "dark");
  }

  return {
    mode: currentMode,
    isDark,
    setMode,
    toggle,
  };
}
