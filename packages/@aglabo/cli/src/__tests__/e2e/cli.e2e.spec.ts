// src: packages/@aglabo/cli/src/__tests__/e2e/cli.e2e.spec.ts
// @(#) : e2e tests: run the built CLI (dist/cli.mjs) as a real child process (run `pnpm build` first)
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';

const cli = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../dist/cli.mjs');
const exec = (...args: string[]) => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });

describe('hacker-names CLI', () => {
  test('prints <adjective>-<hacker> by default', () => {
    const r = exec();
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/^[a-z]+-[a-z0-9]+(-[a-z0-9]+)*\n$/);
  });
  test('prints no adjective with --hacker-only', () => {
    const r = exec('--hacker-only');
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*\n$/);
  });
  test('exits with 2 on unknown option', () => {
    const r = exec('--bogus');
    expect(r.status).toBe(2);
    expect(r.stderr).toContain('Usage:');
  });
});
