import { existsSync } from "node:fs";
import {
  addComponentExports,
  addImportsSources,
  createResolver,
  defineNuxtModule,
  addTypeTemplate,
} from "@nuxt/kit";
import type { NuxtModule } from "@nuxt/schema";
import type { ModuleOptions } from "./types";
import { createThemeInitScript } from "../utils/themeScript";

export * from "./types";

const module: NuxtModule<ModuleOptions> = defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@recloudstudio/ui",
    configKey: "recloudUI",
    compatibility: {
      nuxt: "^4.0.0",
    },
  },
  defaults: {
    prefix: "Re",
    injectTheme: true,
    themeStorageKey: "recloud-theme",
    injectThemeScript: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    addTypeTemplate({
      filename: "types/recloud-ui.d.ts",
      getContents: () => `declare module 'nuxt/schema' {
  interface NuxtConfig {
    recloudUI?: import('@recloudstudio/ui/nuxt').ModuleOptions
  }
  interface NuxtOptions {
    recloudUI?: import('@recloudstudio/ui/nuxt').ModuleOptions
  }
}
export {}`,
    });

    if (options.injectTheme) {
      nuxt.options.css = nuxt.options.css || [];
      nuxt.options.css.push(resolver.resolve("../style.css"));
    }

    if (options.injectThemeScript) {
      nuxt.options.app.head.script ||= [];
      nuxt.options.app.head.script.unshift({
        key: "recloud-theme-init",
        innerHTML: createThemeInitScript(options.themeStorageKey),
        tagPosition: "head",
      });
    }

    // 从源码加载时（monorepo dev）入口是 ../index.ts；发布包 dist 中为 ../index.js。
    const libraryEntry = existsSync(resolver.resolve("../index.ts"))
      ? "../index.ts"
      : "../index.js";
    addComponentExports({
      filePath: resolver.resolve(libraryEntry),
      prefix: options.prefix,
    });

    addImportsSources({
      from: "@recloudstudio/ui",
      imports: ["useTheme", "useToast"],
    });
  },
});

export default module;
