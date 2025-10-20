import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { log } from '@clack/prompts';
import yaml from 'yaml';
import { getTargetPath } from './utils.js';

/**
 * Writes a YAML object to disk at the given path. If parent directories do not exist, they are created.
 */
export async function writeYaml(path: string, data: unknown): Promise<void> {
  const filePath = getTargetPath(path);
  const parentDir = dirname(filePath);

  if (!existsSync(filePath)) {
    mkdirSync(parentDir, { recursive: true });
    writeFileSync(filePath, yaml.stringify(data) + '\n');
  } else {
    log.warning(`File ${filePath} already exists. Skipping creation.`);
  }
}
