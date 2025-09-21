import { text } from '@clack/prompts';
import { copyTemplate, createDirs, createFiles } from '../../helpers/index.js';
import type { Profile } from '../../types/types.js';

/**
 * Create a go module in apps/.
 */
export const appModuleGoAction: Profile = {
  name: 'appModuleGoAction',
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
    createDirs([`apps/${options.name}`, `apps/${options.name}/app`, `apps/${options.name}/pkg`, `apps/${options.name}/internal`]);
    copyTemplate({ templateName: 'app_module_go/main.go', targetPath: `apps/${options.name}/app/main.go` });
    createFiles([{
      path: `apps/${options.name}/go.mod`, content: `module ${options.importPath}\n\ngo 1.24`
    }]);

    createDirs(['.github']);
    copyTemplate({ templateName: 'app_module_go/release.yaml', targetPath: `.github/workflows/release_${options.name}.yaml` });
    copyTemplate({ templateName: 'app_module_go/tests.yaml', targetPath: `.github/workflows/tests_${options.name}.yaml` });

    copyTemplate({ templateName: 'app_module_go/cloudbuild.yaml', targetPath: `apps/${options.name}/cloudbuild.yaml`, variables: { name: options.name } });
  }
};
