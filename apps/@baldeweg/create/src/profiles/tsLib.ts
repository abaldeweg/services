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
        "@types/jest": "30.0.0",
        "@types/node": "24.5.2",
        "jest": "30.1.3",
        "ts-jest": "29.4.4",
        "typescript": "5.9.2"
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

    copyTemplate({ templateName: 'ts/jest.config.js.ejs', targetPath: `${outputDir}/jest.config.js` });

    createFiles([
      { path: `${outputDir}/src/index.ts`, content: '' },
      { path: `${outputDir}/src/index.test.ts`, content: '' }
    ])

    if (options.deploy) {
      // @fix provide json object
      copyTemplate({ templateName: 'ts/release.yaml.ejs', targetPath: `.github/workflows/release_apps_${options.name}.yaml`, variables: { name: options.name } });
    }

    // @fix provide json object
    copyTemplate({ templateName: 'ts/tests.yaml.ejs', targetPath: `.github/workflows/tests_apps_${options.name}.yaml`, variables: { name: options.name } });
  }
};
