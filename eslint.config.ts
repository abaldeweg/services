import storybook from "eslint-plugin-storybook";
import js from "@eslint/js";
import pluginVitest from "@vitest/eslint-plugin";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginImport from "eslint-plugin-import";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    plugins: { js, import: eslintPluginImport },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { import: eslintPluginImport },
    rules: {
      "import/order": [
        "error",
        {
          "newlines-between": "never",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**"],
  },
  ...(defineConfigWithVueTs(vueTsConfigs.recommended) as any),
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    extends: [
      pluginVue.configs["flat/essential"],
      eslintConfigPrettier,
    ],
  },
  {
    files: ["src/**/*.test.ts"],
    extends: [pluginVitest.configs.recommended],
  },
  eslintConfigPrettier,
  {
    files: ["apps/@baldeweg/ui/**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    extends: [...(storybook.configs["flat/recommended"] as any)],
  },
]);
