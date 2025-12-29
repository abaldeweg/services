import { mkdir, copyFile as copyFileAsync } from 'fs/promises';
import { constants } from 'fs';
import { dirname } from 'path';
import { getSourcePath, getTargetPath } from './utils.js';
import { log } from '@clack/prompts';

/**
 * Copies a file to specified dir. Useful for binary files, like images.
 */
export async function copyFile(sourcePath: string, targetPath: string): Promise<void> {
  const absSource = getSourcePath(sourcePath);
  const absTarget = getTargetPath(targetPath);
  const parentDir = dirname(absTarget);

  try {
    await mkdir(parentDir, { recursive: true });
    await copyFileAsync(absSource, absTarget, constants.COPYFILE_EXCL);
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === 'EEXIST') {
      log.warn(`File already exists, skipping: ${targetPath}`);
      return;
    }
    log.error(`Failed to copy file from ${absSource} to ${absTarget}: ${(err as Error)?.message || err}`);
  }
}
