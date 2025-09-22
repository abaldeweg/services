import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { log } from '@clack/prompts';
import yaml from 'yaml';

/**
 * Writes a YAML object to disk at the given path. If parent directories do not exist, they are created.
 */
export async function writeYaml(path: string, data: unknown): Promise<void> {
  const projectPath = resolve('.');
  const filePath = join(projectPath, path);
  const parentDir = dirname(filePath);
  if (!existsSync(filePath)) {
    mkdirSync(parentDir, { recursive: true });
    writeFileSync(filePath, yaml.stringify(data));
  } else {
    log.warning(`File ${filePath} already exists. Skipping creation.`);
  }
}
