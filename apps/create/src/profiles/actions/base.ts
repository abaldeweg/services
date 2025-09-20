import { createDirs } from '../../helpers/index.js';
import type { Profile } from '../../types/types.js';

/**
 * Base action - creates basic directory structure
 */
export const baseAction: Profile = {
  name: 'base',
  description: 'Create basic directory structure with apps/, packages/ and scripts/directories',
  run: async (options) => {
    createDirs(['apps', 'packages', 'scripts']);
  }
};
