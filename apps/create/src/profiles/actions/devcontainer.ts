import { join } from 'path';
import { copyTemplate } from '../../helpers/template.js';
import type { Profile } from '../../types/types.js';

/**
 * DevContainer action - creates devcontainer configuration
 */
export const devcontainerAction: Profile = {
  name: 'devcontainer',
  description: 'Create a basic devcontainer with universal image',
  run: async (options) => {
    const devcontainerFile = join('.devcontainer', 'devcontainer.json');
    // @fix install features and extensions only if ecosystem is selected
    copyTemplate({
      templateName: 'devcontainer/devcontainer.json',
      targetPath: devcontainerFile
    });
  }
};
