import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

/**
 * Get the absolute path to a source file.
 */
const getSourcePath = (path: string): string => {
  const moduleUrl = new URL('', import.meta.url);
  const currentFilePath = fileURLToPath(moduleUrl);
  const currentDir = dirname(currentFilePath);
  return join(currentDir, '..', '..', 'templates', path);
}

/**
 * Get the absolute path to a target file.
 */
const getTargetPath = (path: string): string => {
  const projectPath = resolve('.');
  return join(projectPath, path);
}

export { getSourcePath, getTargetPath };
