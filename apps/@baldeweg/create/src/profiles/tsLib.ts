import { text, confirm } from '@clack/prompts';
import { copyTemplate, createDirs, createFiles, writeJson } from '../helpers/index.js';
import type { Profile } from '../types/types.js';

/**
 * Create a typescript library.
 */
export const tsLib: Profile = {
  id: 'tsLib',
  name: 'TypeScript Library',
  description: 'Create a typescript library.',
  ask: async () => {
    const name = await text({
      message: 'What is the name of the library?',
      placeholder: 'Library Name',
      initialValue: 'ts_library',
      validate(value) {
        if (value.length === 0) return `Value is required!`;
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
          return 'Name must only contain letters, numbers, hyphens (-), and underscores (_).';
        }
      },
    });

    const deploy = await confirm({
      message: "Do you plan to deploy your package? This will create your package into the apps/ directory and create build specific files. Otherwise it will be created into the packages/ directory.",
    });

    return { name, deploy };
  },
  run: async (options) => {
    const outputDir = options.deploy ? `apps/${options.name}` : `packages/${options.name}`;

    createDirs(['.github', `${outputDir}`, `${outputDir}/src`]);

    writeJson(`${outputDir}/package.json`, {
      "name": options.name,
      "type": "module",
      "version": "0.0.0",
      "main": "dist/index.js",
      "types": "dist/index.d.ts",
      "scripts": {
        "build": "tsc",
        "test": "jest"
      },
      "devDependencies": {
        "@types/node": "24.8.1",
        "typescript": "5.9.3",
        "vitest": "3.2.4"
      }
    })

    writeJson(`${outputDir}/tsconfig.json`, {
      "compilerOptions": {
        "outDir": "./dist",
        "module": "nodenext",
        "target": "esnext",
        "types": [],
        "sourceMap": true,
        "declaration": true,
        "declarationMap": true,
        "noUncheckedIndexedAccess": true,
        "exactOptionalPropertyTypes": true,
        "strict": true,
        "jsx": "react-jsx",
        "verbatimModuleSyntax": true,
        "isolatedModules": true,
        "noUncheckedSideEffectImports": true,
        "moduleDetection": "force",
        "skipLibCheck": true,
      }
    })

    copyTemplate({ templateName: 'ts/vitest.config.ts.ejs', targetPath: `${outputDir}/vitest.config.ts` });

    createFiles([
      { path: `${outputDir}/src/index.ts`, content: null },
      { path: `${outputDir}/src/index.test.ts`, content: null }
    ])

    if (options.deploy) {
      copyTemplate({ templateName: 'ts/release.yaml.ejs', targetPath: `.github/workflows/release_apps_${options.name}.yaml`, variables: { name: options.name } });
    }

    copyTemplate({ templateName: 'ts/tests.yaml.ejs', targetPath: `.github/workflows/tests_apps_${options.name}.yaml`, variables: { name: options.name } });
  }
};
