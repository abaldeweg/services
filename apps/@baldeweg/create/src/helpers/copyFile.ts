import { copyFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { mkdirSync } from 'fs';
import { getSourcePath, getTargetPath } from './utils.js';
import { log } from '@clack/prompts';

/**
 * Copies a file to specified dir. Useful for binary files, like images.
 */
export function copyFile(sourcePath: string, targetPath: string): void {
  const absSource = getSourcePath(sourcePath);
  const absTarget = getTargetPath(targetPath);

  if (existsSync(absTarget)) {
    console.warn(`File already exists, skipping: ${targetPath}`);
    return;
  }

  const parentDir = dirname(absTarget);
  mkdirSync(parentDir, { recursive: true });

  try {
    copyFileSync(absSource, absTarget);
  } catch (err: any) {
    log.error(`Failed to copy file from ${absSource} to ${absTarget}: ${err?.message || err}`);
  }
}
