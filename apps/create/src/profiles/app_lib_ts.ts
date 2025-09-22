import { text } from '@clack/prompts';
import { copyTemplate, createDirs, createFiles } from '../helpers/index.js';
import type { Profile } from '../types/types.js';

/**
 * Create a typescript library in apps/.
 */
export const appLibTs: Profile = {
  name: 'appLibTs',
  description: 'Create a typescript library in apps/.',
  ask: async () => {
    const name = await text({
      message: 'What is the name of the library?',
      placeholder: 'Library Name',
      initialValue: 'my-library',
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
    createDirs([`apps/${options.name}`, `apps/${options.name}/src`]);
    copyTemplate({ templateName: 'app_lib_ts/package.json', targetPath: `apps/${options.name}/package.json`, variables: { name: options.name } });
    copyTemplate({ templateName: 'app_lib_ts/tsconfig.json', targetPath: `apps/${options.name}/tsconfig.json` });
    copyTemplate({ templateName: 'app_lib_ts/jest.config.js', targetPath: `apps/${options.name}/jest.config.js` });
    createFiles([
      { path: `apps/${options.name}/src/index.ts`, content: '' },
      { path: `apps/${options.name}/src/index.test.ts`, content: '' }
    ])

    createDirs(['.github']);
    copyTemplate({ templateName: 'release.yaml', targetPath: `.github/workflows/release_${options.name}.yaml` });
    copyTemplate({ templateName: 'tests.yaml', targetPath: `.github/workflows/tests_${options.name}.yaml`, variables: { name: options.name } });
  }
};
