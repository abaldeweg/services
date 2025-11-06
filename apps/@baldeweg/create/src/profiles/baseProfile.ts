import { log, text } from '@clack/prompts';
import { copyTemplate, createDirs, createFiles, writeJson, writeYaml } from '../helpers/index.js';
import type { Profile } from '../types/types.js';

/**
 * Creates basic directory structure and files.
 */
export const baseProfile: Profile = {
  id: 'baseProfile',
  name: 'Base',
  description: 'Creates basic directory structure and files.',
  ask: async () => {
    const name = await text({
      message: 'What\'s the name of the project?',
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
      message: 'What license do you want to use?',
      placeholder: 'License',
      initialValue: '',
    });

    return { name, description, license };
  },
  run: async (options) => {
    createDirs(['apps', 'packages', 'notebooks', 'scripts']);

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

    createFiles([{ path: 'LICENSE', content: null }]);
    log.info('Created LICENSE file, please update it with the correct license text. https://opensource.org/licenses');

    writeJson('package.json', {
      "name": "root",
      "version": "0.0.0",
      "description": options.description,
      "license": options.license,
      "devDependencies": {
        "@baldeweg/create": "0.3.0",
      }
    })

    copyTemplate('base/.gitignore.ejs', '.gitignore');

    copyTemplate('base/.editorconfig.ejs', '.editorconfig');

    writeYaml('pnpm-workspace.yaml', {
      packages: []
    })
  }
};
