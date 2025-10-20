import { log } from '@clack/prompts';
import { existsSync, mkdirSync } from 'fs';
import { getTargetPath } from './utils.js';

/**
 * Creates directories if they do not exist.
 */
export function createDirs(dirs: string[]): void {
  dirs.forEach(dir => {
    const dirPath = getTargetPath(dir);
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    } else {
      log.info(`Directory ${dirPath} already exists. Skipping creation.`);
    }
  });
}
