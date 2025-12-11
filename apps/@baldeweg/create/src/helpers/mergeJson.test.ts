import { describe, it, expect, afterEach } from 'vitest';
import { mkdir, rm, readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { mergeJson } from './mergeJson.js';

const targetRelBase = `__test_output__/merge_json`;

describe('mergeJson', () => {
  afterEach(async () => {
    await rm(join(process.cwd(), `${targetRelBase}.json`), { force: true, recursive: true });
  });

  it('merges into existing file and preserves other keys', async () => {
    const targetRel = `${targetRelBase}.json`;
    const absTarget = join(process.cwd(), targetRel);
    await mkdir(dirname(absTarget), { recursive: true });

    const original = { keep: 'value', replace: 'old', nested: { x: 1 } };
    await writeFile(absTarget, JSON.stringify(original, null, 2) + '\n');

    await mergeJson(targetRel, { replace: 'new', add: 'x', nested: { y: 2 } });

    const finalRaw = await readFile(absTarget, 'utf-8');
    const final = JSON.parse(finalRaw);

    expect(final).toEqual({
      keep: 'value',
      replace: 'new',
      add: 'x',
      nested: {
        x: 1,
        y: 2
      },
    });
  });
});
