import { log, text } from '@clack/prompts';
import { copyTemplate, createDirs, createFiles } from '../../helpers/index.js';
import type { Profile } from '../../types/types.js';

/**
 * Base action - creates basic directory structure
 */
export const baseAction: Profile = {
  name: 'base',
  description: 'Create basic directory structure with apps/, packages/ and scripts/ directories',
  ask: async () => {
    const projectName = await text({
      message: 'Whats the name of the project?',
      placeholder: 'Name',
      initialValue: 'My Project',
      validate(value) {
        if (value.length === 0) return `Value is required!`;
      },
    });

    const description = await text({
      message: 'Whats the description of the project?',
      placeholder: 'Description',
      initialValue: 'Description',
    });

    const license = await text({
      message: 'Which license did you choose?',
      placeholder: 'License',
      initialValue: '',
    });


    return { projectName, description, license };
  },
  run: async (options) => {
    createDirs(['apps', 'packages', 'scripts']);
    createFiles([{ path: 'README.md', content: `# ${options.projectName}` }]);
    copyTemplate({ templateName: 'base/renovate.json', targetPath: 'renovate.json' });
    createFiles([{ path: 'LICENSE', content: '' }]);
    log.info('Created LICENSE file, please update it with the correct license text. https://opensource.org/licenses');
    copyTemplate({ templateName: 'base/package.json', targetPath: 'package.json', variables: { description: options.description, license: options.license } });
    copyTemplate({ templateName: 'base/base/.gitignore', targetPath: '.gitignore' });
    copyTemplate({ templateName: 'base/.editorconfig', targetPath: '.editorconfig' });
    createFiles([{ path: 'pnpm-workspace.yaml', content: 'packages:\n' }]);
    createFiles([{ path: 'go.work', content: 'go 1.24\n\n' }]);
    copyTemplate({ templateName: 'base/Makefile', targetPath: 'Makefile' });
  }
};
