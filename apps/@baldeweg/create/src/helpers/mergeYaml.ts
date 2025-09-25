import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import yaml from 'js-yaml';
import { log } from '@clack/prompts';
import deepmerge from 'deepmerge';

/**
 * Merge data into an existing YAML file.
 */
export function mergeYaml(options: {
  filePath: string;
  data: object;
}): void {
  const { filePath, data } = options;
  const absFilePath = resolve('.', filePath);

  let fileContent: any = {};
  if (existsSync(absFilePath)) {
    fileContent = yaml.load(readFileSync(absFilePath, 'utf8')) || {};
  } else {
    log.warn(`File ${filePath} does not exist. Skipping merge.`);
  }
  const merged = deepmerge(fileContent, data);

  writeFileSync(absFilePath, yaml.dump(merged));
}
