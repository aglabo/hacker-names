// src: packages/@aglabo/dict/src/__tests__/unit/dict.unit.spec.ts
// @(#) : unit tests for the dictionaries generated from YAML
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { describe, expect, test } from 'vitest';
import { ADJECTIVES, HACKERS } from '../../index.ts';

describe('dictionaries', () => {
  test('are non-empty and follow the word format', () => {
    expect(ADJECTIVES.length).toBeGreaterThan(0);
    expect(HACKERS.length).toBeGreaterThan(0);
    for (const a of ADJECTIVES) { expect(a).toMatch(/^[a-z]+$/); }
    for (const h of HACKERS) { expect(h).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/); }
  });
  test('contain no duplicates', () => {
    expect(new Set(ADJECTIVES).size).toBe(ADJECTIVES.length);
    expect(new Set(HACKERS).size).toBe(HACKERS.length);
  });
  test('use the short field of hackers.yaml as the hacker word', () => {
    expect(HACKERS).toContain('knuth');
    expect(HACKERS).toContain('ken-thompson');
  });
});
