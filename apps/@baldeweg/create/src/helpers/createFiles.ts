import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { log } from '@clack/prompts';
import type { FileObject } from '../types/types.js';

/**
 * Creates files at the given path. If parent directories do not exist, they are created.
 */
export async function createFiles(files: FileObject[]): Promise<void> {
  const projectPath = resolve('.');
  files.forEach(({ path, content }) => {
    const filePath = join(projectPath, path);
    const parentDir = dirname(filePath);

    if (!existsSync(filePath)) {
      mkdirSync(parentDir, { recursive: true });
      writeFileSync(filePath, content || '');
    } else {
      log.warning(`File ${filePath} already exists. Skipping creation.`);
    }
  });
}
