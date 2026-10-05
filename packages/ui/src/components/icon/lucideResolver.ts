import type { Component } from "vue";

/**
 * 将 kebab-case、snake_case 或空格分隔的命名转换为 PascalCase。
 * 例如：'settings' -> 'Settings', 'arrow-left' -> 'ArrowLeft', 'circle-alert' -> 'CircleAlert'。
 */
export function toPascalCase(name: string): string {
  if (!name) return "";
  const trimmed = name.trim();
  if (!trimmed) return "";

  const parts = trimmed.split(/[-_\s]+/).filter(Boolean);
  if (parts.length === 0) return "";

  return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
}

/**
 * 缓存已加载的 lucide-vue-next 模块，避免重复动态导入。
 */
let lucideModulePromise: Promise<Record<string, unknown>> | null = null;

function loadLucideModule(): Promise<Record<string, unknown>> {
  if (!lucideModulePromise) {
    lucideModulePromise = import("lucide-vue-next").then((m) => {
      // SAFETY: lucide-vue-next exports named Vue components under icon identifier keys.
      return m as Record<string, unknown>;
    });
  }
  return lucideModulePromise;
}

/**
 * 从 lucide-vue-next 中查找指定名称的图标组件。
 */
export async function lookupLucideIcon(name: string): Promise<Component | null> {
  if (!name) return null;
  const mod = await loadLucideModule();
  const pascal = toPascalCase(name);

  const candidate = mod[pascal] ?? mod[`${pascal}Icon`] ?? mod[name] ?? mod[`${name}Icon`];

  if (candidate && (typeof candidate === "object" || typeof candidate === "function")) {
    // SAFETY: the resolved candidate is a Vue component function or options object.
    return candidate as Component;
  }

  return null;
}
