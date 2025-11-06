import { log, text } from '@clack/prompts';
import { copyFile, copyTemplate, createDirs, createFiles, mergeYaml, runCommand, writeJson, makeSlug } from '../helpers/index.js';
import type { Profile } from '../types/types.js';

/**
 * Creates a Vue 3 + Vite app in apps/.
 */
export const tsVueProfile: Profile = {
  id: 'tsVueProfile',
  name: 'TypeScript Vue App',
  description: 'Creates a Vue 3 + Vite app in apps/.',
  ask: async () => {
    const name = await text({
      message: 'What\'s the name of the package?',
      placeholder: 'Package Name',
      initialValue: 'ts_vue',
      validate(value) {
        if (value.length === 0) return `Value is required!`;
        if (!/^[a-zA-Z0-9_@\/-]+$/.test(value)) {
          return 'Name must only contain letters, numbers, hyphens (-), underscores (_), at (@), and slash (/).';
        }
      },
    });

    const shortName = await text({
      message: 'What\'s the short name of the package? It will be used in the manifest for the PWA.',
      placeholder: 'Short Package Name',
      initialValue: 'ts_vue',
      validate(value) {
        if (value.length === 0) return `Value is required!`;
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
          return 'Name must only contain letters, numbers, hyphens (-) and underscores (_).';
        }
      },
    });

    const description = await text({
      message: 'What\'s the description of the package?',
      placeholder: 'Description',
      initialValue: 'Description',
    });

    const license = await text({
      message: 'What\'s the license of the package?',
      placeholder: 'License',
      initialValue: '',
    });

    const color = await text({
      message: "Which theme color should be used (hex code)?",
      placeholder: "Hex color, e.g. #d31e27",
      initialValue: "#d31e27",
      validate(value: string) {
        if (value.length === 0) return `Value is required!`;
        if (!/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(value)) {
          return 'Enter a valid hex color (e.g. #d31e27 or #f00)';
        }
      },
    });

    return { name, shortName, license, color, description };
  },
  run: async (options) => {
    createDirs(['.github', `apps/${options.name}`, `apps/${options.name}/src`, `apps/${options.name}/src/i18n/locales`, `apps/${options.name}/public`, `apps/${options.name}/docker`, `apps/${options.name}/src/composables/`]);

    // root
    createFiles([{ path: `apps/${options.name}/.env`, content: 'VITE_BASE_URL=/\n' }]);

    writeJson(`apps/${options.name}/.prettierrc.json`, {
      "$schema": "https://json.schemastore.org/prettierrc",
      "semi": false,
      "singleQuote": true,
      "printWidth": 80
    });

    copyTemplate('ts_vue/Dockerfile.ejs', `apps/${options.name}/Dockerfile`, { name: options.name });

    copyTemplate('ts_vue/env.d.ts.ejs', `apps/${options.name}/env.d.ts`);

    copyTemplate('ts_vue/eslint.config.ts.ejs', `apps/${options.name}/eslint.config.ts`);

    copyTemplate('ts_vue/index.html.ejs', `apps/${options.name}/index.html`, { name: options.name, color: options.color, description: options.description });

    writeJson(`apps/${options.name}/package.json`, {
      "name": options.name,
      "version": "0.0.0",
      "type": "module",
      "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview",
        "test": "vitest"
      },
      "dependencies": {
        "vue": "3.5.22",
        "vue-router": "4.6.3"
      },
      "devDependencies": {
        "@baldeweg/ui": "0.18.1",
        "@tsconfig/node24": "24.0.1",
        "@types/jsdom": "27.0.0",
        "@types/node": "24.8.1",
        "@unhead/vue": "2.0.19",
        "@vitejs/plugin-vue": "6.0.1",
        "@vitest/eslint-plugin": "1.3.23",
        "@vue/eslint-config-prettier": "10.2.0",
        "@vue/eslint-config-typescript": "14.6.0",
        "@vue/test-utils": "2.4.6",
        "@vue/tsconfig": "0.8.1",
        "axios": "1.12.2",
        "eslint": "9.38.0",
        "eslint-plugin-vue": "10.5.1",
        "jiti": "2.6.1",
        "jsdom": "27.0.1",
        "prettier": "3.6.2",
        "typescript": "5.9.3",
        "vite": "7.1.10",
        "vite-plugin-pwa": "1.1.0",
        "vite-plugin-webfont-dl": "3.11.1",
        "vitest": "3.2.4",
        "vue-i18n": "11.1.12",
        "vue-tsc": "3.1.1"
      },
      "license": options.license || undefined
    }
    );

    writeJson(`apps/${options.name}/tsconfig.app.json`, {
      "extends": "@vue/tsconfig/tsconfig.dom.json",
      "include": [
        "env.d.ts",
        "src/**/*",
        "src/**/*.vue"
      ],
      "exclude": [
        "src/**/*.test.ts"
      ],
      "compilerOptions": {
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
        "paths": {
          "@/*": [
            "./src/*"
          ]
        }
      }
    }
    );

    writeJson(`apps/${options.name}/tsconfig.json`, {
      "files": [],
      "references": [
        {
          "path": "./tsconfig.node.json"
        },
        {
          "path": "./tsconfig.app.json"
        },
        {
          "path": "./tsconfig.vitest.json"
        }
      ]
    });

    writeJson(`apps/${options.name}/tsconfig.node.json`, {
      "extends": "@tsconfig/node24/tsconfig.json",
      "include": [
        "vite.config.*",
        "vitest.config.*",
        "eslint.config.*"
      ],
      "compilerOptions": {
        "noEmit": true,
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
        "module": "ESNext",
        "moduleResolution": "Bundler",
        "types": [
          "node"
        ]
      }
    });

    writeJson(`apps/${options.name}/tsconfig.vitest.json`, {
      "extends": "./tsconfig.app.json",
      "include": [
        "src/**/*.test.ts",
        "env.d.ts"
      ],
      "exclude": [],
      "compilerOptions": {
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.vitest.tsbuildinfo",
        "lib": [],
        "types": [
          "node",
          "jsdom",
          "vitest/globals"
        ]
      }
    });

    copyTemplate('ts_vue/vite.config.ts.ejs', `apps/${options.name}/vite.config.ts`, { name: options.name, color: options.color, description: options.description, short_name: options.shortName })

    copyTemplate('ts_vue/cloudbuild.yaml.ejs', `apps/${options.name}/cloudbuild.yaml`, { name: options.name });

    createFiles([{ path: `apps/${options.name}/README.md`, content: `# ${options.name}\n\n` }]);

    createFiles([{ path: `apps/${options.name}/CHANGELOG.md`, content: `# Changelog\n\n` }]);

    // src
    copyTemplate('ts_vue/src/App.vue.ejs', `apps/${options.name}/src/App.vue`);

    copyTemplate('ts_vue/src/main.ts.ejs', `apps/${options.name}/src/main.ts`, { name: options.name });

    copyTemplate('ts_vue/src/unit.setup.ts.ejs', `apps/${options.name}/src/unit.setup.ts`);

    copyTemplate('ts_vue/src/components/HomeWelcome.test.ts.ejs', `apps/${options.name}/src/components/HomeWelcome.test.ts`);

    copyTemplate('ts_vue/src/components/HomeWelcome.vue.ejs', `apps/${options.name}/src/components/HomeWelcome.vue`);

    writeJson(`apps/${options.name}/src/i18n/locales/de.json`, {
      "welcome": "Willkommen"
    });

    writeJson(`apps/${options.name}/src/i18n/locales/en.json`, {
      "welcome": "Welcome"
    });

    copyTemplate('ts_vue/src/i18n/index.ts.ejs', `apps/${options.name}/src/i18n/index.ts`);

    copyTemplate('ts_vue/src/layouts/DefaultLayout.vue', `apps/${options.name}/src/layouts/DefaultLayout.vue`);

    copyTemplate('ts_vue/src/router/index.ts.ejs', `apps/${options.name}/src/router/index.ts`);

    copyTemplate('ts_vue/src/types/baldeweg-ui.d.ts.ejs', `apps/${options.name}/src/types/baldeweg-ui.d.ts`);

    copyTemplate('ts_vue/src/views/HomeView.vue.ejs', `apps/${options.name}/src/views/HomeView.vue`);

    // public
    copyFile('ts_vue/public/android-chrome-192x192.png', `apps/${options.name}/public/android-chrome-192x192.png`);

    copyFile('ts_vue/public/android-chrome-512x512.png', `apps/${options.name}/public/android-chrome-512x512.png`);

    copyFile('ts_vue/public/apple-touch-icon.png', `apps/${options.name}/public/apple-touch-icon.png`);

    copyFile('ts_vue/public/favicon.ico', `apps/${options.name}/public/favicon.ico`);

    copyFile('ts_vue/public/favicon.svg', `apps/${options.name}/public/favicon.svg`);

    copyTemplate('ts_vue/public/robots.txt.ejs', `apps/${options.name}/public/robots.txt`);

    // docker
    copyTemplate('ts_vue/docker/httpd.conf.ejs', `apps/${options.name}/docker/httpd.conf`);

    // ci
    copyTemplate('ts_vue/release.yaml.ejs', `.github/workflows/release_apps_${makeSlug(options.name)}.yaml`, { name: options.name });

    copyTemplate('ts_vue/tests.yaml.ejs', `.github/workflows/tests_apps_${makeSlug(options.name)}.yaml`, { name: options.name });

    createFiles([{ path: 'pnpm-workspace.yaml', content: null }]);
    mergeYaml(`pnpm-workspace.yaml`, { 'packages': [`apps/${options.name}/`] });

    runCommand('pnpm', ['install'])
  }
};
