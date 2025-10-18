import { copyFileSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';

/**
 * Copies a file to specified dir. Useful for binary files, like images.
 */
export function copyFile(sourcePath: string, targetPath: string): void {
  const moduleUrl = new URL('', import.meta.url);
  const currentFilePath = fileURLToPath(moduleUrl);
  const currentDir = dirname(currentFilePath);
  const absSource = join(currentDir, '..', '..', 'templates', sourcePath);

  const projectPath = resolve('.');
  const absTarget = join(projectPath, targetPath);

  if (existsSync(absTarget)) {
    console.warn(`File already exists, skipping: ${targetPath}`);
    return;
  }

  const parentDir = dirname(absTarget);
  mkdirSync(parentDir, { recursive: true });

  try {
    copyFileSync(absSource, absTarget);
  } catch (err: any) {
    throw new Error(`Failed to copy file from ${absSource} to ${absTarget}: ${err?.message || err}`);
  }
}
