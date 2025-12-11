import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { getSourcePath, getTargetPath } from './utils.js';

describe('utils', () => {
  it('getSourcePath returns path inside templates', () => {
    const rel = 'base/file.txt';
    const expected = join(__dirname, '..', '..', 'templates', rel);
    const actual = getSourcePath(rel);
    expect(actual).toBe(expected);
  });

  it('getTargetPath returns path inside project', () => {
    const rel = '__test_output__/out.txt';
    const expected = join(process.cwd(), rel);
    const actual = getTargetPath(rel);
    expect(actual).toBe(expected);
  });
});
