import { text } from '@clack/prompts';
import { copyTemplate, createDirs, createFiles, runCommand } from '../helpers/index.js';
import type { Profile } from '../types/types.js';
import { existsSync } from 'fs';

/**
 * Create a go module in packages/.
 */
export const goPackage: Profile = {
  id: 'goPackage',
  name: 'Go Package',
  description: 'Create a go module in packages/.',
  ask: async () => {
    const name = await text({
      message: 'What is the name of the module?',
      placeholder: 'Name of the module',
      initialValue: 'my_module',
      validate(value) {
        if (value.length === 0) return `Value is required!`;
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
          return 'Name must only contain letters, numbers, hyphens (-), and underscores (_).';
        }
      },
    });

    const importPath = await text({
      message: 'What is the import path of the module?',
      placeholder: 'Path',
      initialValue: 'github.com/abaldeweg/services',
      validate(value) {
        if (value.length === 0) return `Value is required!`;
      },
    });

    return { name, importPath };
  },
  run: async (options) => {
    // @fix here should no pkg be needed, in packages there should only be internal stuff.
    createDirs(['.github', `packages/${options.name}`, `packages/${options.name}/app`, `packages/${options.name}/pkg`, `packages/${options.name}/internal`]);

    copyTemplate({ templateName: 'go_package/main.go.ejs', targetPath: `packages/${options.name}/app/main.go` });

    runCommand('go', ['mod', 'init', options.importPath], `packages/${options.name}`);

    createFiles([{ path: `packages/${options.name}/go.sum`, content: '' }]);

    // @fix provide json object
    copyTemplate({ templateName: 'go_package/tests.yaml.ejs', targetPath: `.github/workflows/tests_packages_${options.name}.yaml`, variables: { name: options.name } });

    if (!existsSync('go.work')) {
      runCommand('go', ['work', 'init', `packages/${options.name}`]);
    } else {
      runCommand('go', ['work', 'use', `packages/${options.name}`]);
    }
  }
};
