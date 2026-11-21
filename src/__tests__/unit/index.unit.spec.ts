// src: src/__tests__/unit/index.unit.spec.ts
// @(#) : unit tests for the public API and bundled dictionaries
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { describe, expect, test } from 'vitest';
import { ADJECTIVES, HACKERS } from '../../dict.ts';
import { generate, VERSION } from '../../index.ts';

describe('dictionaries', () => {
  test('are non-empty and follow the word format', () => {
    expect(ADJECTIVES.length).toBeGreaterThan(0);
    expect(HACKERS.length).toBeGreaterThan(0);
    for (const a of ADJECTIVES) { expect(a).toMatch(/^[a-z]+$/); }
    for (const h of HACKERS) { expect(h).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/); }
  });
});

describe('generate', () => {
  test('returns <adjective>-<hacker> by default', () => {
    const name = generate({ rng: () => 0 });
    expect(name).toBe(`${ADJECTIVES[0]}-${HACKERS[0]}`);
  });
  test('returns only the hacker with hackerOnly', () => {
    expect(generate({ hackerOnly: true, rng: () => 0 })).toBe(HACKERS[0]);
  });
  test('handles rng values just below 1', () => {
    const name = generate({ rng: () => 0.999999999 });
    expect(name).toBe(`${ADJECTIVES.at(-1)}-${HACKERS.at(-1)}`);
  });
  test('uses Math.random by default and stays in the dictionaries', () => {
    const [adjective, ...rest] = generate().split('-');
    expect(ADJECTIVES).toContain(adjective);
    expect(HACKERS).toContain(rest.join('-'));
  });
  test('exposes a version string', () => {
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
