import { readFile, writeFile } from 'fs/promises';
import yaml from 'js-yaml';
import { log } from '@clack/prompts';
import deepmerge from 'deepmerge';
import { getTargetPath } from './utils.js';

/**
 * Merges data into an existing YAML file.
 */
export async function mergeYaml(filePath: string, data: object): Promise<void> {
  const absFilePath = getTargetPath(filePath);

  let fileContent: Record<string, unknown> = {};
  try {
    const content = await readFile(absFilePath, 'utf8');
    fileContent = (yaml.load(content) as Record<string, unknown>) || {};
  } catch (err: unknown) {
    if (err instanceof Error && (err as NodeJS.ErrnoException).code === 'ENOENT') {
      log.warn(`File ${filePath} does not exist. Skipping merge.`);
    } else {
      throw err;
    }
  }

  const merged = deepmerge(fileContent, data);

  await writeFile(absFilePath, yaml.dump(merged));
}
