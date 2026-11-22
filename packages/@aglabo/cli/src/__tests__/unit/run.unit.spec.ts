// src: packages/@aglabo/cli/src/__tests__/unit/run.unit.spec.ts
// @(#) : unit tests for the CLI logic
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ADJECTIVES, HACKERS } from '@aglabo/hacker-names-dict';
import { describe, expect, test } from 'vitest';
import { run } from '../../run.ts';

describe('run', () => {
  test('prints <adjective>-<hacker> by default', () => {
    expect(run([], () => 0)).toEqual({ code: 0, stdout: `${ADJECTIVES[0]}-${HACKERS[0]}\n`, stderr: '' });
  });
  test.each(['--hacker-only', '-H'])('prints only the hacker with %s', (flag) => {
    expect(run([flag], () => 0)).toEqual({ code: 0, stdout: `${HACKERS[0]}\n`, stderr: '' });
  });
  test('prints help and version', () => {
    expect(run(['--help']).stdout).toContain('Usage: hacker-names');
    expect(run(['-v']).stdout).toMatch(/^\d+\.\d+\.\d+\n$/);
  });
  test('rejects unknown options and positionals with exit code 2', () => {
    for (const argv of [['--bogus'], ['extra']]) {
      const result = run(argv);
      expect(result.code).toBe(2);
      expect(result.stdout).toBe('');
      expect(result.stderr).toContain('Usage:');
    }
  });
});
