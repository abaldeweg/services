import { multiselect } from '@clack/prompts';
import { writeJson } from '../helpers/writeJson.js';
import type { Devcontainer, Profile } from '../types/types.js';

/**
 * Create a basic devcontainer with universal image
 */
export const devcontainer: Profile = {
  name: 'devcontainer',
  description: 'Create a basic devcontainer with universal image',
  ask: async () => {
    const ecosystems = await multiselect({
      message: 'Which ecosystems do you want to use?',
      options: [
        { value: 'js', label: 'JavaScript/ TypeScript/ VueJS' },
        { value: 'go', label: 'Go' },
      ],
    });

    return { ecosystems };
  },
  run: async (options) => {
    let devcontainer: Devcontainer = {
      "name": "Monorepo",
      "image": "mcr.microsoft.com/devcontainers/base:ubuntu-24.04",
      "features": {
        "ghcr.io/abaldeweg/devcontainer_features/bash:3.0.0": {}
      },
      "postCreateCommand": undefined,
      "customizations": {
        "vscode": {
          "extensions": [
            "mikestead.dotenv",
            "EditorConfig.EditorConfig",
            "DavidAnson.vscode-markdownlint",
            "christian-kohler.path-intellisense",
          ]
        }
      }
    };

    if (options.ecosystems.includes('js')) {
      devcontainer.features['ghcr.io/devcontainers/features/node:1'] = {
        "installPnpm": "true"
      };
      devcontainer.postCreateCommand = 'pnpm install';
      devcontainer.customizations.vscode.extensions.push(
        'dbaeumer.vscode-eslint',
        'esbenp.prettier-vscode',
        'Vue.volar',
        'vitest.explorer',
        'mrmlnc.vscode-apache',
        'redhat.vscode-yaml'
      );
    }
    if (options.ecosystems.includes('go')) {
      devcontainer.features['ghcr.io/devcontainers/features/go:1'] = {};
      devcontainer.features['ghcr.io/guiyomh/features/goreleaser:0.1.1'] = {};
      devcontainer.customizations.vscode.extensions.push(
        'golang.go',
        'mrmlnc.vscode-apache',
        'redhat.vscode-yaml'
      );
    }
    
    devcontainer.customizations.vscode.extensions = [...new Set(devcontainer.customizations.vscode.extensions)];

    writeJson('.devcontainer/devcontainer.json', devcontainer)
  }
};
