import { text } from '@clack/prompts';
import { copyTemplate, createDirs, createFiles } from '../../helpers/index.js';
import type { Profile } from '../../types/types.js';

/**
 * Creates a typescript package
 */
export const packageLibTsAction: Profile = {
  name: 'base',
  description: 'Create basic directory structure with apps/, packages/ and scripts/ directories',
  ask: async () => {
    const name = await text({
      message: 'What is the name of the package?',
      placeholder: 'Not sure',
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
    createDirs([`packages/${options.name}`, `packages/${options.name}/src`]);
    copyTemplate({ templateName: 'package_lib_ts/package.json', targetPath: `packages/${options.name}/package.json`, variables: { name: options.name } });
    copyTemplate({ templateName: 'package_lib_ts/tsconfig.json', targetPath: `packages/${options.name}/tsconfig.json` });
    copyTemplate({ templateName: 'package_lib_ts/jest.config.js', targetPath: `packages/${options.name}/jest.config.js` });
    createFiles([
      { path: `packages/${options.name}/src/index.ts`, content: '' },
      { path: `packages/${options.name}/src/index.test.ts`, content: '' }
    ])
  }
};
