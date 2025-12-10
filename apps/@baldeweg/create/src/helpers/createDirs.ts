import { log } from '@clack/prompts';
import { access, mkdir } from 'fs/promises';
import { constants } from 'fs';
import { getTargetPath } from './utils.js';

/**
 * Creates directories if they do not exist.
 */
export async function createDirs(dirs: string[]): Promise<void> {
  for (const dir of dirs) {
    const dirPath = getTargetPath(dir);
    try {
      await access(dirPath, constants.F_OK);
      log.info(`Directory ${dirPath} already exists. Skipping creation.`);
    } catch {
      try {
        await mkdir(dirPath, { recursive: true });
      } catch (err) {
        log.info(`Failed to create directory ${dirPath}: ${String(err)}`);
      }
    }
  }
}
