import { describe, it, expect, afterEach } from 'vitest';
import { mkdir, rm, readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { writeJson } from './writeJson.js';

const targetRelBase = `__test_output__/json-file`;

describe('writeJson', () => {
  afterEach(async () => {
    await rm(join(process.cwd(), `${targetRelBase}.json`), { force: true, recursive: true });
  });

  it('writes JSON file to target path', async () => {
    const targetRel = `${targetRelBase}.json`;

    await writeJson(targetRel, { a: 'b' });

    const content = await readFile(join(process.cwd(), targetRel), 'utf-8');
    expect(content).toBe(JSON.stringify({ a: 'b' }, null, 2) + '\n');
  });

  it('does not overwrite an already existing target file', async () => {
    const targetRel = `${targetRelBase}.json`;
    const absTarget = join(process.cwd(), targetRel);
    await mkdir(dirname(absTarget), { recursive: true });
    await writeFile(absTarget, 'original-content');

    await writeJson(targetRel, { a: 'new' });

    const final = await readFile(absTarget, 'utf-8');
    expect(final).toBe('original-content');
  });
});
