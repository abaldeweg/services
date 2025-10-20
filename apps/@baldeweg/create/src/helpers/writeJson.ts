import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { log } from '@clack/prompts';
import { getTargetPath } from './utils.js';

/**
 * Writes a JSON object to disk at the given path. If parent directories do not exist, they are created.
 */
export async function writeJson(path: string, data: unknown): Promise<void> {
  const filePath = getTargetPath(path);
  const parentDir = dirname(filePath);

  if (!existsSync(filePath)) {
    mkdirSync(parentDir, { recursive: true });
    writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  } else {
    log.warning(`File ${filePath} already exists. Skipping creation.`);
  }
}
