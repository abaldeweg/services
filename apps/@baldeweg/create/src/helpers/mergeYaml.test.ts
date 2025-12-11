import { describe, it, expect, afterEach } from 'vitest';
import { mkdir, rm, readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import yaml from 'yaml';
import { mergeYaml } from './mergeYaml.js';

const targetRelBase = `__test_output__/merge-yaml`;

describe('mergeYaml', () => {
  afterEach(async () => {
    await rm(join(process.cwd(), `${targetRelBase}.yaml`), { force: true, recursive: true });
  });

  it('merges into existing file and preserves other keys', async () => {
    const targetRel = `${targetRelBase}.yaml`;
    const absTarget = join(process.cwd(), targetRel);
    await mkdir(dirname(absTarget), { recursive: true });

    const original = { keep: 'value', replace: 'old', nested: { x: 1 }, items: [1, 2] };
    await writeFile(absTarget, yaml.stringify(original) + '\n');

    await mergeYaml(targetRel, { replace: 'new', add: 'x', nested: { y: 2 }, items: [3] });

    const finalRaw = await readFile(absTarget, 'utf-8');
    const final = yaml.parse(finalRaw);

    expect(final).toEqual({
      keep: 'value',
      replace: 'new',
      add: 'x',
      nested: { x: 1, y: 2 },
      items: [1, 2, 3],
    });
  });
});
