import { log, text } from '@clack/prompts';
import { copyTemplate, createDirs, createFiles, writeJson } from '../../helpers/index.js';
import type { Profile } from '../../types/types.js';

/**
 * Creates basic directory structure and files.
 */
export const baseAction: Profile = {
  name: 'base',
  description: 'Creates basic directory structure and files.',
  ask: async () => {
    const name = await text({
      message: 'Whats the name of the project?',
      placeholder: 'Name',
      initialValue: 'My Project',
      validate(value) {
        if (value.length === 0) return `Value is required!`;
      },
    });

    const description = await text({
      message: 'What\'s the description of the project?',
      placeholder: 'Description',
      initialValue: '',
    });

    const license = await text({
      message: 'Which license did you choose?',
      placeholder: 'License',
      initialValue: '',
    });

    return { name, description, license };
  },
  run: async (options) => {
    createDirs(['apps', 'packages', 'scripts']);

    createFiles([{ path: 'README.md', content: `# ${options.name}` }]);

    writeJson('renovate.json', {
      "extends": [
        "config:base",
        ":disableDependencyDashboard"
      ],
      "packageRules": [
        {
          "updateTypes": [
            "patch"
          ],
          "automerge": true,
          "requiredStatusChecks": [
            "ci/tests"
          ]
        }
      ]
    })

    createFiles([{ path: 'LICENSE', content: '' }]);
    log.info('Created LICENSE file, please update it with the correct license text. https://opensource.org/licenses');

    writeJson('package.json', {
      "name": "root",
      "version": "0.0.0",
      "description": options.description,
      "license": options.license
    })

    copyTemplate({ templateName: 'base/.gitignore', targetPath: '.gitignore' });

    copyTemplate({ templateName: 'base/.editorconfig', targetPath: '.editorconfig' });

    // @fix new apps and packages need to be added to the workspace file
    createFiles([{ path: 'pnpm-workspace.yaml', content: 'packages:\n' }]);

    // @fix every new go app or package needs to be added to the go.work file
    createFiles([{ path: 'go.work', content: 'go 1.24\n\n' }]);
    
    // @fix every new app needs an entry in the Makefile for the release process
    copyTemplate({ templateName: 'base/Makefile', targetPath: 'Makefile' });
  }
};
