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

  let fileContent: any = {};
  try {
    const content = await readFile(absFilePath, 'utf8');
    fileContent = yaml.load(content) || {};
  } catch (err: any) {
    if (err && err.code === 'ENOENT') {
      log.warn(`File ${filePath} does not exist. Skipping merge.`);
    } else {
      throw err;
    }
  }

  const merged = deepmerge(fileContent, data);

  await writeFile(absFilePath, yaml.dump(merged));
}
