import { fileURLToPath, URL } from "node:url"
import fs from "node:fs"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import vueDevTools from "vite-plugin-vue-devtools"
import { ViteWebfontDownload } from "vite-plugin-webfont-dl"
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      vueDevTools(),
      ...(command === "serve"
        ? [
            ViteWebfontDownload([
              "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap",
              "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@300&display=swap",
            ]),
          ]
        : []),
      tailwindcss(),
      {
        name: "copy-globals-css",
        generateBundle() {
          this.emitFile({
            type: "asset",
            fileName: "globals.css",
            source: fs.readFileSync(
              path.resolve(__dirname, "src/globals.css"),
              "utf-8",
            ),
          })
        },
      },
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      copyPublicDir: false,
      lib: {
        entry: path.resolve(__dirname, "src/ui.js"),
        name: "ui",
        formats: ["es"],
        fileName: (format) => `ui.${format}.js`,
      },
      rollupOptions: {
        external: ["vue", "vue-router"],
      },
    },
    test: {
      environment: "jsdom",
      include: ["src/**/*.test.ts"],
    },
  }
})
