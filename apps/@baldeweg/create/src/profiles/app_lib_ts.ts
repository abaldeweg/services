import { text } from '@clack/prompts';
import { copyTemplate, createDirs, createFiles, writeJson } from '../helpers/index.js';
import type { Profile } from '../types/types.js';

/**
 * Create a typescript library in apps/.
 */
export const appLibTs: Profile = {
  name: 'appLibTs',
  description: 'Create a typescript library in apps/.',
  ask: async () => {
    const name = await text({
      message: 'What is the name of the library?',
      placeholder: 'Library Name',
      initialValue: 'my-library',
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
    createDirs(['.github', `apps/${options.name}`, `apps/${options.name}/src`]);

    writeJson(`apps/${options.name}/package.json`, {
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
        "@types/jest": "30.0.0",
        "@types/node": "24.5.2",
        "jest": "30.1.3",
        "ts-jest": "29.4.4",
        "typescript": "5.9.2"
      }
    })

    writeJson(`apps/${options.name}/tsconfig.json`, {
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

    copyTemplate({ templateName: 'apps_lib_ts/jest.config.js.ejs', targetPath: `apps/${options.name}/jest.config.js` });

    createFiles([
      { path: `apps/${options.name}/src/index.ts`, content: '' },
      { path: `apps/${options.name}/src/index.test.ts`, content: '' }
    ])

    // @fix provide json object
    copyTemplate({ templateName: 'apps_lib_ts/release.yaml.ejs', targetPath: `.github/workflows/release_apps_${options.name}.yaml`, variables: { name: options.name } });

    // @fix provide json object
    copyTemplate({ templateName: 'apps_lib_ts/tests.yaml.ejs', targetPath: `.github/workflows/tests_apps_${options.name}.yaml`, variables: { name: options.name } });
  }
};
