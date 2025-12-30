import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import { defineConfig } from "eslint/config"
import pluginVue from "eslint-plugin-vue"
import {
    defineConfigWithVueTs,
    vueTsConfigs,
} from "@vue/eslint-config-typescript"
import pluginVitest from "@vitest/eslint-plugin"

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    {
        name: "app/files-to-ignore",
        ignores: ["**/dist/**"],
    },
    tseslint.configs.recommended,
    {
        files: ["**/*.vue"],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
        extends: [
            pluginVue.configs["flat/essential"],
            defineConfigWithVueTs(vueTsConfigs.recommended),
            {
                ...pluginVitest.configs.recommended,
                files: ["src/**/*.test.ts"],
            },
        ],
    },
])
