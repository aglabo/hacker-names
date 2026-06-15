// src: ./src/__tests__/unit/greeting.spec.ts
// @(#) : unit tests for greet function
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { describe, expect, it } from 'vitest';

import { greet } from '../../greeting.ts';

// ─── Internal Helpers ───────────────────────────────────────────────────────

// fixtures for valid input cases
const _validCases = [
  { input: 'World', expected: 'Hello, World!!' },
  { input: 'John Doe', expected: 'Hello, John Doe!!' },
  { input: 'User123', expected: 'Hello, User123!!' },
] as const;

// fixtures for invalid input cases
const _invalidCases = [
  { label: 'no arguments provided', input: '' },
  { label: 'empty string provided', input: '' },
] as const;

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('greeting()', () => {
  describe('When: with valid input', () => {
    for (const { input, expected } of _validCases) {
      it(`[Normal] greet("${input}") → "${expected}"`, () => {
        expect(greet(input)).toBe(expected);
      });
    }
  });

  describe('When: with invalid input', () => {
    for (const { label, input } of _invalidCases) {
      it(`[Error] returns error when ${label}`, () => {
        expect(() => greet(input)).toThrow('Error: Name parameter is required');
      });
    }
  });
});
