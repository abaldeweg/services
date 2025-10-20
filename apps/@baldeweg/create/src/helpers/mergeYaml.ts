import { readFileSync, writeFileSync, existsSync } from 'fs';
import yaml from 'js-yaml';
import { log } from '@clack/prompts';
import deepmerge from 'deepmerge';
import { getTargetPath } from './utils.js';

/**
 * Merges data into an existing YAML file.
 */
export function mergeYaml(filePath: string, data: object): void {
  const absFilePath = getTargetPath(filePath);

  let fileContent: any = {};
  if (existsSync(absFilePath)) {
    fileContent = yaml.load(readFileSync(absFilePath, 'utf8')) || {};
  } else {
    log.warn(`File ${filePath} does not exist. Skipping merge.`);
  }
  const merged = deepmerge(fileContent, data);

  writeFileSync(absFilePath, yaml.dump(merged));
}
