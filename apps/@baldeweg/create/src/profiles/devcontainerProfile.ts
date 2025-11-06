import { multiselect } from '@clack/prompts';
import { writeJson } from '../helpers/writeJson.js';
import type { Devcontainer, Profile } from '../types/types.js';

/**
 * Creates a basic devcontainer with base image and features.
 */
export const devcontainerProfile: Profile = {
  id: 'devcontainerProfile',
  name: 'Devcontainer',
  description: 'Creates a basic devcontainer with base image and features.',
  ask: async () => {
    const ecosystems = await multiselect({
      message: 'Which ecosystems do you want to use?',
      options: [
        { value: 'js', label: 'JavaScript/ TypeScript/ VueJS' },
        { value: 'go', label: 'Go' },
        { value: 'python', label: 'Python/ Notebooks' },
      ],
    });

    return { ecosystems };
  },
  run: async (options) => {
    // base
    let devcontainer: Devcontainer = {
      "name": "Monorepo",
      "image": "mcr.microsoft.com/devcontainers/base:ubuntu-24.04",
      "features": {
        "ghcr.io/abaldeweg/devcontainer_features/bash:3.0.0": {}
      },
      "postCreateCommand": [],
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

    // js
    if (options.ecosystems.includes('js')) {
      devcontainer.features['ghcr.io/devcontainers/features/node:1.6.3'] = {
        "version": "24",
        "installPnpm": "true"
      };
      devcontainer.postCreateCommand = ['pnpm install'];
      devcontainer.customizations.vscode.extensions.push(
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "Vue.volar",
        "vitest.explorer",
        "mrmlnc.vscode-apache",
        "redhat.vscode-yaml",
      );
    }

    // go
    if (options.ecosystems.includes('go')) {
      devcontainer.features['ghcr.io/devcontainers/features/go:1.3.2'] = {};
      devcontainer.features['ghcr.io/guiyomh/features/goreleaser:0.1.1'] = {};
      devcontainer.customizations.vscode.extensions.push(
        "golang.go",
        "mrmlnc.vscode-apache",
        "redhat.vscode-yaml",
      );
    }

    // python
    if (options.ecosystems.includes('python')) {
      devcontainer.features['ghcr.io/devcontainers/features/python:1.7.1'] = {};
      devcontainer.customizations.vscode.extensions.push(
        "ms-toolsai.jupyter",
        "ms-python.python",
        "mechatroner.rainbow-csv",
        "ms-python.black-formatter",
        "ms-python.isort",
      );
    }

    devcontainer.customizations.vscode.extensions = [...new Set(devcontainer.customizations.vscode.extensions)];

    writeJson('.devcontainer/devcontainer.json', devcontainer)
  }
};
