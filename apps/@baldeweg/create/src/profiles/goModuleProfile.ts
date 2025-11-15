import { text, confirm } from '@clack/prompts';
import { copyTemplate, createDirs, createFiles, runCommand, writeYaml } from '../helpers/index.js';
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
      message: "Do you plan to deploy your package? This will create your package into the apps/ directory. Otherwise it will be created into the packages/ directory.",
    });

    return { name, importPath, deploy };
  },
  run: async (options) => {
    const outputDir = options.deploy ? `apps` : `packages`;

    createDirs(['.github', `${outputDir}/${options.name}`, `${outputDir}/${options.name}/cmd`, `${outputDir}/${options.name}/internal`]);

    await copyTemplate('go/main.go.ejs', `${outputDir}/${options.name}/main.go`);

    createFiles([{ path: `${outputDir}/${options.name}/README.md`, content: `# ${options.name}\n\n` }]);

    createFiles([{ path: `${outputDir}/${options.name}/CHANGELOG.md`, content: `# Changelog\n\n` }]);

    if (options.deploy) {
      writeYaml(`${outputDir}/${options.name}/openapi.yaml`, {
        openapi: '3.0.0',
        info: {
          title: options.name,
          version: 'v1',
          description: `OpenAPI specification for ${options.name}.`,
        },
        servers: [
          {
            url: 'http://localhost:8080',
          },
        ],
        tags: [
          {
            name: 'example',
            description: `Example`
          },
        ],
        paths: {},
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
          schemas: {},
        },
        security: [
          {
            bearerAuth: []
          }
        ],
      });
    }

    runCommand('go', ['mod', 'init', options.importPath], `${outputDir}/${options.name}`);

    createFiles([{ path: `${outputDir}/${options.name}/go.sum`, content: null }]);

    if (options.deploy) {
      await copyTemplate('go/Dockerfile.ejs', `${outputDir}/${options.name}/Dockerfile`, { name: options.name });
    }

    await copyTemplate(
      'go/release.yaml.ejs', `.github/workflows/release_${outputDir}_${options.name}.yaml`, { name: options.name }
    );

    await copyTemplate('go/tests.yaml.ejs', `.github/workflows/tests_${outputDir}_${options.name}.yaml`, { outputDir: outputDir, name: options.name });

    if (options.deploy) {
      await copyTemplate('go/cloudbuild.yaml.ejs', `${outputDir}/${options.name}/cloudbuild.yaml`, { name: options.name });
    }

    if (!existsSync('go.work')) {
      runCommand('go', ['work', 'init', `${outputDir}/${options.name}`]);
    }

    runCommand('go', ['work', 'use', `${outputDir}/${options.name}`]);
  }
};
