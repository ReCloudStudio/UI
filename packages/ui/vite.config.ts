import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "./tsconfig.json",
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        "icons/index": resolve(__dirname, "src/icons/index.ts"),
        "markdown/index": resolve(__dirname, "src/markdown/index.ts"),
        "nuxt/index": resolve(__dirname, "src/nuxt/index.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@nuxt/kit",
        "reka-ui",
        "lucide-vue-next",
        /^node:/,
        /^shiki(\/.*)?$/,
        "tailwind-merge",
        "clsx",
        "unified",
        "remark-parse",
        "remark-gfm",
        "remark-directive",
        "unist-util-visit",
        "mdast-util-to-string",
      ],
      output: {
        chunkFileNames: "chunks/[name]-[hash].js",
        entryFileNames: "[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
