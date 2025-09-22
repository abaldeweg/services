import { text } from '@clack/prompts';
import { copyTemplate, createDirs } from '../../helpers/index.js';
import type { Profile } from '../../types/types.js';

/**
 * Base action - creates basic directory structure
 */
export const appVueAction: Profile = {
  name: 'base',
  description: 'Create basic directory structure with apps/, packages/ and scripts/ directories',
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

    return { name };
  },
  run: async (options) => {
    createDirs([`apps/${options.name}`, `apps/${options.name}/src`, `apps/${options.name}/public`, `apps/${options.name}/docker`, `apps/${options.name}/src/composables/`]);
    copyTemplate({ templateName: 'app_vue_ts/.env', targetPath: `apps/${options.name}/.env` });
    copyTemplate({ templateName: 'app_vue_ts/.prettierrc.json', targetPath: `apps/${options.name}/.prettierrc.json` });
    copyTemplate({ templateName: 'app_vue_ts/Dockerfile.app', targetPath: `apps/${options.name}/Dockerfile.app`, variables: { name: options.name } });
    copyTemplate({ templateName: 'app_vue_ts/env.d.ts', targetPath: `apps/${options.name}/env.d.ts` });
    copyTemplate({ templateName: 'app_vue_ts/eslint.config.ts.ejs', targetPath: `apps/${options.name}/eslint.config.ts` });
    copyTemplate({ templateName: 'app_vue_ts/index.html', targetPath: `apps/${options.name}/index.html`, variables: { name: options.name } });
    copyTemplate({ templateName: 'app_vue_ts/package.json', targetPath: `apps/${options.name}/package.json`, variables: { name: options.name } });
    copyTemplate({ templateName: 'app_vue_ts/tsconfig.app.json', targetPath: `apps/${options.name}/tsconfig.app.json` });
    copyTemplate({ templateName: 'app_vue_ts/tsconfig.json', targetPath: `apps/${options.name}/tsconfig.json` });
    copyTemplate({ templateName: 'app_vue_ts/tsconfig.node.json', targetPath: `apps/${options.name}/tsconfig.node.json` });
    copyTemplate({ templateName: 'app_vue_ts/tsconfig.vitest.json', targetPath: `apps/${options.name}/tsconfig.vitest.json` });
    copyTemplate({ templateName: 'app_vue_ts/vite.config.ts.ejs', targetPath: `apps/${options.name}/vite.config.ts` });

    copyTemplate({ templateName: 'app_vue_ts/App.vue', targetPath: `apps/${options.name}/src/App.vue` });
    copyTemplate({ templateName: 'app_vue_ts/main.ts.ejs', targetPath: `apps/${options.name}/src/main.ts`, variables: { name: options.name } });
    copyTemplate({ templateName: 'app_vue_ts/unit.setup.ts.ejs', targetPath: `apps/${options.name}/src/unit.setup.ts` });
    copyTemplate({ templateName: 'app_vue_ts/Welcome.spec.ts.ejs', targetPath: `apps/${options.name}/src/Welcome.spec.ts` });
    copyTemplate({ templateName: 'app_vue_ts/Welcome.vue', targetPath: `apps/${options.name}/src/Welcome.vue` });
    copyTemplate({ templateName: 'app_vue_ts/de.json', targetPath: `apps/${options.name}/src/de.json` });
    copyTemplate({ templateName: 'app_vue_ts/en.json', targetPath: `apps/${options.name}/src/en.json` });
    copyTemplate({ templateName: 'app_vue_ts/index.ts.ejs', targetPath: `apps/${options.name}/src/index.ts` });
    copyTemplate({ templateName: 'app_vue_ts/DefaultLayout.vue', targetPath: `apps/${options.name}/src/DefaultLayout.vue` });
    copyTemplate({ templateName: 'app_vue_ts/index.ts.ejs', targetPath: `apps/${options.name}/src/index.ts` });
    copyTemplate({ templateName: 'app_vue_ts/baldeweg-ui.d.ts', targetPath: `apps/${options.name}/src/baldeweg-ui.d.ts` });
    copyTemplate({ templateName: 'app_vue_ts/HomeView.vue', targetPath: `apps/${options.name}/src/HomeView.vue` });

    copyTemplate({ templateName: 'app_vue_ts/android-chrome-192x192.png', targetPath: `apps/${options.name}/public/android-chrome-192x192.png` });
    copyTemplate({ templateName: 'app_vue_ts/android-chrome-512x512.png', targetPath: `apps/${options.name}/public/android-chrome-512x512.png` });
    copyTemplate({ templateName: 'app_vue_ts/apple-touch-icon.png', targetPath: `apps/${options.name}/public/apple-touch-icon.png` });
    copyTemplate({ templateName: 'app_vue_ts/favicon.ico', targetPath: `apps/${options.name}/public/favicon.ico` });
    copyTemplate({ templateName: 'app_vue_ts/favicon.svg', targetPath: `apps/${options.name}/public/favicon.svg` });
    copyTemplate({ templateName: 'app_vue_ts/robots.txt', targetPath: `apps/${options.name}/public/robots.txt` });

    copyTemplate({ templateName: 'app_vue_ts/httpd.conf', targetPath: `apps/${options.name}/docker/httpd.conf` });

    createDirs(['.github']);
    copyTemplate({ templateName: 'app_vue_ts/release.yaml', targetPath: '.github/workflows/release.yaml', variables: { name: options.name } });
    copyTemplate({ templateName: 'app_vue_ts/unit.yaml', targetPath: '.github/workflows/unit.yaml', variables: { name: options.name } });

    copyTemplate({ templateName: 'app_vue_ts/cloudbuild.yaml', targetPath: `apps/${options.name}/cloudbuild.yaml`, variables: { name: options.name } });
  }
};
