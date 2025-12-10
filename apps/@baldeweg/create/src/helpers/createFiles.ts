import { mkdir, writeFile, access } from 'fs/promises';
import { dirname } from 'path';
import { log } from '@clack/prompts';
import { getTargetPath } from './utils.js';
import type { FileObject } from '../types/types.js';

/**
 * Creates files at the given path. If parent directories do not exist, they are created.
 */
export async function createFiles(files: FileObject[]): Promise<void> {
  for (const { path, content } of files) {
    const filePath = getTargetPath(path);
    const parentDir = dirname(filePath);

    try {
      await access(filePath);
      log.warning(`File ${filePath} already exists. Skipping creation.`);
    } catch {
      await mkdir(parentDir, { recursive: true });
      await writeFile(filePath, content || '');
    }
  }
}
