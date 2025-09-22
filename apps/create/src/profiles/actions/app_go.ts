import { text } from '@clack/prompts';
import { copyTemplate, createDirs, createFiles, runCommand } from '../../helpers/index.js';
import type { Profile } from '../../types/types.js';
import { existsSync } from 'fs';

/**
 * Create a go module in apps/.
 */
export const appGoAction: Profile = {
  name: 'appGoAction',
  description: 'Create a go module in apps/.',
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
    createDirs(['.github', `apps/${options.name}`, `apps/${options.name}/app`, `apps/${options.name}/pkg`, `apps/${options.name}/internal`]);

    copyTemplate({ templateName: 'app_go/main.go', targetPath: `apps/${options.name}/app/main.go` });

    runCommand('go', ['mod', 'init', options.importPath], `apps/${options.name}`);

    // @fix provide json object
    copyTemplate({ templateName: 'app_go/release.yaml', targetPath: `.github/workflows/release_apps_${options.name}.yaml` });

    // @fix provide json object
    copyTemplate({ templateName: 'app_go/tests.yaml', targetPath: `.github/workflows/tests_apps_${options.name}.yaml`, variables: { name: options.name } });

    // @fix provide json object
    copyTemplate({ templateName: 'app_go/cloudbuild.yaml', targetPath: `apps/${options.name}/cloudbuild.yaml`, variables: { name: options.name } });

    if (!existsSync('go.work')) {
      runCommand('go', ['work', 'init', `apps/${options.name}`]);
    } else {
      runCommand('go', ['work', 'use', `apps/${options.name}`]);
    }
  }
};
