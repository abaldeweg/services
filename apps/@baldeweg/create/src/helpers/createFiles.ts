import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { log } from '@clack/prompts';
import { getTargetPath } from './utils.js';
import type { FileObject } from '../types/types.js';

/**
 * Creates files at the given path. If parent directories do not exist, they are created.
 */
export async function createFiles(files: FileObject[]): Promise<void> {
  files.forEach(({ path, content }) => {
    const filePath = getTargetPath(path);
    const parentDir = dirname(filePath);

    if (!existsSync(filePath)) {
      mkdirSync(parentDir, { recursive: true });
      writeFileSync(filePath, content || '');
    } else {
      log.warning(`File ${filePath} already exists. Skipping creation.`);
    }
  });
}
