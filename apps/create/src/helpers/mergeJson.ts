import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { log } from '@clack/prompts';
import deepmerge from 'deepmerge';

/**
 * Merge data into an existing JSON file.
 */
export function mergeJson(options: {
  filePath: string;
  data: object;
}): void {
  const { filePath, data } = options;
  const absFilePath = resolve('.', filePath);

  let fileContent: any = {};
  if (existsSync(absFilePath)) {
    fileContent = JSON.parse(readFileSync(absFilePath, 'utf8'));
  } else {
    log.warn(`File ${filePath} does not exist. Skipping merge.`);
  }
  const merged = deepmerge(fileContent, data);

  writeFileSync(absFilePath, JSON.stringify(merged, null, 2) + '\n');
}
