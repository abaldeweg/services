import { text } from '@clack/prompts';
import { copyTemplate, createDirs, createFiles, mergeYaml, runCommand, writeJson } from '../helpers/index.js';
import type { Profile } from '../types/types.js';

/**
 * Create a Vue 3 + Vite app in apps/.
 */
export const appVue: Profile = {
  name: 'appVue',
  description: 'Create a Vue 3 + Vite app in apps/.',
  ask: async () => {
    const name = await text({
      message: 'What is the name of the package?',
      placeholder: 'Package Name',
      initialValue: 'my-package',
      validate(value) {
        if (value.length === 0) return `Value is required!`;
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
          return 'Name must only contain letters, numbers, hyphens (-), and underscores (_).';
        }
      },
    });

    const license = await text({
      message: 'What is the license of the package?',
      placeholder: 'License',
      initialValue: '',
    });

    return { name, license };
  },
  run: async (options) => {
    createDirs(['.github', `apps/${options.name}`, `apps/${options.name}/src`, `apps/${options.name}/public`, `apps/${options.name}/docker`, `apps/${options.name}/src/composables/`]);

    // root
    createFiles([{ path: `apps/${options.name}/.env`, content: 'VITE_BASE_URL=/\n' }]);

    writeJson(`apps/${options.name}/.prettierrc.json`, {
      "$schema": "https://json.schemastore.org/prettierrc",
      "semi": false,
      "singleQuote": true,
      "printWidth": 100
    });

    copyTemplate({ templateName: 'apps_vue_ts/Dockerfile.ejs', targetPath: `apps/${options.name}/Dockerfile`, variables: { name: options.name } });

    copyTemplate({ templateName: 'apps_vue_ts/env.d.ts.ejs', targetPath: `apps/${options.name}/env.d.ts` });

    copyTemplate({ templateName: 'apps_vue_ts/eslint.config.ts.ejs', targetPath: `apps/${options.name}/eslint.config.ts` });

    copyTemplate({ templateName: 'apps_vue_ts/index.html.ejs', targetPath: `apps/${options.name}/index.html`, variables: { name: options.name } });

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
        "vue": "3.5.21",
        "vue-router": "4.5.1"
      },
      "devDependencies": {
        "@baldeweg/ui": "0.18.1",
        "@tsconfig/node24": "24.0.1",
        "@types/jsdom": "21.1.7",
        "@types/node": "24.5.2",
        "@unhead/vue": "2.0.14",
        "@vitejs/plugin-vue": "6.0.1",
        "@vitest/eslint-plugin": "1.3.10",
        "@vue/eslint-config-prettier": "10.2.0",
        "@vue/eslint-config-typescript": "14.6.0",
        "@vue/test-utils": "2.4.6",
        "@vue/tsconfig": "0.8.1",
        "axios": "1.12.2",
        "eslint": "9.35.0",
        "eslint-plugin-vue": "10.4.0",
        "jiti": "2.5.1",
        "jsdom": "26.1.0",
        "prettier": "3.6.2",
        "typescript": "5.9.2",
        "vite": "7.1.5",
        "vite-plugin-pwa": "1.0.3",
        "vite-plugin-webfont-dl": "3.11.1",
        "vitest": "3.2.4",
        "vue-i18n": "11.1.12",
        "vue-tsc": "3.0.7"
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
    }
    );

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
          "jsdom"
        ]
      }
    });

    copyTemplate({ templateName: 'apps_vue_ts/vite.config.ts.ejs', targetPath: `apps/${options.name}/vite.config.ts`, variables: { name: options.name } })

    // @fix provide json object
    copyTemplate({ templateName: 'apps_vue_ts/cloudbuild.yaml.ejs', targetPath: `apps/${options.name}/cloudbuild.yaml`, variables: { name: options.name } });

    // src
    copyTemplate({ templateName: 'apps_vue_ts/src/App.vue.ejs', targetPath: `apps/${options.name}/src/App.vue` });

    copyTemplate({ templateName: 'apps_vue_ts/src/main.ts.ejs', targetPath: `apps/${options.name}/src/main.ts`, variables: { name: options.name } });

    copyTemplate({ templateName: 'apps_vue_ts/src/unit.setup.ts.ejs', targetPath: `apps/${options.name}/src/unit.setup.ts` });

    copyTemplate({ templateName: 'apps_vue_ts/src/components/Welcome.test.ts.ejs', targetPath: `apps/${options.name}/src/components/Welcome.test.ts` });

    copyTemplate({ templateName: 'apps_vue_ts/src/components/Welcome.vue.ejs', targetPath: `apps/${options.name}/src/components/Welcome.vue` });

    writeJson(`apps/${options.name}/src/i18n/locales/de.json`, {
      "welcome": "Willkommen"
    });

    writeJson(`apps/${options.name}/src/i18n/locales/en.json`, {
      "welcome": "Welcome"
    });

    copyTemplate({ templateName: 'apps_vue_ts/src/i18n/index.ts.ejs', targetPath: `apps/${options.name}/src/i18n/index.ts` });

    copyTemplate({ templateName: 'apps_vue_ts/src/layouts/DefaultLayout.vue', targetPath: `apps/${options.name}/src/layouts/DefaultLayout.vue` });

    copyTemplate({ templateName: 'apps_vue_ts/src/router/index.ts.ejs', targetPath: `apps/${options.name}/src/router/index.ts` });

    copyTemplate({ templateName: 'apps_vue_ts/src/types/baldeweg-ui.d.ts.ejs', targetPath: `apps/${options.name}/src/types/baldeweg-ui.d.ts` });

    copyTemplate({ templateName: 'apps_vue_ts/src/views/HomeView.vue.ejs', targetPath: `apps/${options.name}/src/views/HomeView.vue` });

    // public
    // @fix empty file
    copyTemplate({ templateName: 'apps_vue_ts/public/android-chrome-192x192.png', targetPath: `apps/${options.name}/public/android-chrome-192x192.png` });

    // @fix empty file
    copyTemplate({ templateName: 'apps_vue_ts/public/android-chrome-512x512.png', targetPath: `apps/${options.name}/public/android-chrome-512x512.png` });

    // @fix empty file
    copyTemplate({ templateName: 'apps_vue_ts/public/apple-touch-icon.png', targetPath: `apps/${options.name}/public/apple-touch-icon.png` });

    // @fix empty file
    copyTemplate({ templateName: 'apps_vue_ts/public/favicon.ico', targetPath: `apps/${options.name}/public/favicon.ico` });

    copyTemplate({ templateName: 'apps_vue_ts/public/favicon.svg', targetPath: `apps/${options.name}/public/favicon.svg` });

    copyTemplate({ templateName: 'apps_vue_ts/public/robots.txt.ejs', targetPath: `apps/${options.name}/public/robots.txt` });

    // docker
    copyTemplate({ templateName: 'apps_vue_ts/docker/httpd.conf.ejs', targetPath: `apps/${options.name}/docker/httpd.conf` });

    // ci
    // @fix provide json object
    copyTemplate({ templateName: 'apps_vue_ts/release.yaml.ejs', targetPath: `.github/workflows/release_apps_${options.name}.yaml`, variables: { name: options.name } });

    // @fix provide json object
    copyTemplate({ templateName: 'apps_vue_ts/tests.yaml.ejs', targetPath: `.github/workflows/tests_apps_${options.name}.yaml`, variables: { name: options.name } });

    createFiles([{ path: 'pnpm-workspace.yaml', content: '' }]);
    mergeYaml({ filePath: `pnpm-workspace.yaml`, data: { 'packages': [`apps/${options.name}/`] } });

    runCommand('pnpm', ['install'])
  }
};
