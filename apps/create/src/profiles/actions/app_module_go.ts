import { text } from '@clack/prompts';
import { copyTemplate, createDirs } from '../../helpers/index.js';
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

    return { name };
  },
  run: async (options) => {
    createDirs([`apps/${options.name}`]);
    copyTemplate({ templateName: 'module_go/main.go', targetPath: `apps/${options.name}/main.go` });
    copyTemplate({ templateName: 'module_go/sum.go', targetPath: `apps/${options.name}/sum/sum.go` });
    copyTemplate({ templateName: 'module_go/sum_test.go', targetPath: `apps/${options.name}/sum/sum_test.go` });
  }
};
