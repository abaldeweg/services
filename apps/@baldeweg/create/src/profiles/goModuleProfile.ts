import { text, confirm } from '@clack/prompts';
import { copyTemplate, createDirs, createFiles, runCommand } from '../helpers/index.js';
import type { Profile } from '../types/types.js';
import { existsSync } from 'fs';

/**
 * Creates a go module.
 */
export const goModuleProfile: Profile = {
  id: 'goModuleProfile',
  name: 'Go',
  description: 'Creates a go module.',
  ask: async () => {
    const name = await text({
      message: 'What is the name of the module?',
      placeholder: 'Name of the module',
      initialValue: 'go_module',
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

    const deploy = await confirm({
      message: "Do you plan to deploy your package? This will create your package into the apps/ directory and create build specific files. Otherwise it will be created into the packages/ directory.",
    });

    return { name, importPath, deploy };
  },
  run: async (options) => {
    const outputDir = options.deploy ? `apps/${options.name}` : `packages/${options.name}`;

    createDirs(['.github', `${outputDir}`, `${outputDir}/app`, `${outputDir}/internal`]);
    if (options.deploy) {
      createDirs([`${outputDir}/pkg`]);
    }

    copyTemplate('go/main.go.ejs', `${outputDir}/main.go`);

    runCommand('go', ['mod', 'init', options.importPath], `${outputDir}`);

    createFiles([{ path: `${outputDir}/go.sum`, content: null }]);

    if (options.deploy) {
      copyTemplate('go/Dockerfile.ejs', `${outputDir}/Dockerfile`, { name: options.name });
    }

    if (options.deploy) {
      copyTemplate(
        'go/release.yaml.ejs', `.github/workflows/release_apps_${options.name}.yaml`, { name: options.name }
      );
    }

    copyTemplate('go/tests.yaml.ejs', `.github/workflows/tests_apps_${options.name}.yaml`, { name: options.name });

    if (options.deploy) {
      copyTemplate('go/cloudbuild.yaml.ejs', `${outputDir}/cloudbuild.yaml`, { name: options.name });
    }

    if (!existsSync('go.work')) {
      runCommand('go', ['work', 'init', `${outputDir}`]);
    } else {
      runCommand('go', ['work', 'use', `${outputDir}`]);
    }
  }
};
