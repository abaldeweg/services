import { log } from '@clack/prompts';
import { existsSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';

/**
 * Creates directories if they do not exist.
 */
export function createDirs(dirs: string[]): void {
  const projectPath = resolve('.');
  dirs.forEach(dir => {
    const dirPath = join(projectPath, dir);
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    } else {
      log.info(`Directory ${dirPath} already exists. Skipping creation.`);
    }
  });
}
