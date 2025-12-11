import { text, confirm } from '@clack/prompts';
import { copyTemplate, createDirs, createFiles, mergeYaml, runCommand, writeJson, writeYaml } from '../helpers/index.js';
import { makeSlug } from '../helpers/makeSlug.js';
import type { Profile } from '../types/types.js';

/**
 * Create a typescript library.
 */
export const tsLibProfile: Profile = {
  id: 'tsLibProfile',
  name: 'TypeScript Library',
  description: 'Creates a typescript library.',
  ask: async () => {
    const name = await text({
      message: 'What\'s the name of the library?',
      placeholder: 'Library Name',
      initialValue: 'ts_library',
      validate(value) {
        if (value.length === 0) return `Value is required!`;
        if (!/^[a-zA-Z0-9_@\/-]+$/.test(value)) {
          return 'Name must only contain letters, numbers, hyphens (-), underscores (_), at (@), and slash (/).';
        }
      },
    });

    const deploy = await confirm({
      message: "Do you plan to deploy your package? This will create your package into the apps/ directory. Otherwise it will be created into the packages/ directory.",
    });

    return { name, deploy };
  },
  run: async (options) => {
    const outputDir = options.deploy ? `apps` : `packages`;

    await createDirs(['.github', `${outputDir}/${options.name}`, `${outputDir}/${options.name}/src`]);

    await writeJson(`${outputDir}/${options.name}/package.json`, {
      "name": options.name,
      "type": "module",
      "version": "0.0.0",
      "main": "dist/index.js",
      "types": "dist/index.d.ts",
      "scripts": {
        "build": "tsc",
        "test": "vitest"
      },
      "devDependencies": {
        "@types/node": "24.8.1",
        "typescript": "5.9.3",
        "vitest": "3.2.4"
      }
    })

    await writeJson(`${outputDir}/${options.name}/tsconfig.json`, {
      "compilerOptions": {
        "outDir": "./dist",
        "module": "nodenext",
        "target": "esnext",
        "types": [
          "vitest/globals"
        ],
        "sourceMap": true,
        "declaration": true,
        "declarationMap": true,
        "noUncheckedIndexedAccess": true,
        "exactOptionalPropertyTypes": true,
        "strict": true,
        "verbatimModuleSyntax": true,
        "isolatedModules": true,
        "noUncheckedSideEffectImports": true,
        "moduleDetection": "force",
        "skipLibCheck": true,
      }
    })

    await copyTemplate('ts_lib/vitest.config.ts.ejs', `${outputDir}/${options.name}/vitest.config.ts`);

    await createFiles([
      { path: `${outputDir}/${options.name}/src/index.ts`, content: null },
      { path: `${outputDir}/${options.name}/src/index.test.ts`, content: null }
    ])

    await createFiles([{ path: `${outputDir}/${options.name}/README.md`, content: `# ${options.name}\n\n` }]);

    await createFiles([{ path: `${outputDir}/${options.name}/CHANGELOG.md`, content: `# Changelog\n\n` }]);

    await copyTemplate('ts_lib/release.yaml.ejs', `.github/workflows/release_${outputDir}_${makeSlug(options.name)}.yaml`, { outputDir: outputDir, name: options.name });

    await copyTemplate('ts_lib/tests.yaml.ejs', `.github/workflows/tests_${outputDir}_${makeSlug(options.name)}.yaml`, { name: options.name });

    await writeYaml('pnpm-workspace.yaml', { packages: [] });
    await mergeYaml(`pnpm-workspace.yaml`, { 'packages': [`${outputDir}/${options.name}/`] });

    await runCommand('pnpm', ['install'])
  }
};
