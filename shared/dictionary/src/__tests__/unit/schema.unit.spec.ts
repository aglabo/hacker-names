// src: shared/dictionary/src/__tests__/unit/schema.unit.spec.ts
// @(#) : unit tests for the dictionary schemas
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as v from 'valibot';
import { describe, expect, test } from 'vitest';
import { AdjectivesSchema, CATEGORIES, HackersSchema } from '../../index.ts';

describe('AdjectivesSchema', () => {
  test('accepts lowercase words', () => {
    expect(v.safeParse(AdjectivesSchema, ['quiet', 'bold']).success).toBe(true);
  });
  test('rejects words outside [a-z]+', () => {
    expect(v.safeParse(AdjectivesSchema, ['Quiet']).success).toBe(false);
    expect(v.safeParse(AdjectivesSchema, ['a-b']).success).toBe(false);
  });
});

describe('HackersSchema', () => {
  const entry = { fullname: 'Ken Thompson', description: 'd', category: 'turing' };
  test('accepts a valid entry', () => {
    expect(v.safeParse(HackersSchema, { 'ken-thompson': entry }).success).toBe(true);
  });
  test('rejects an invalid slug or missing field', () => {
    expect(v.safeParse(HackersSchema, { Ken: entry }).success).toBe(false);
    expect(v.safeParse(HackersSchema, { ken: { fullname: 'Ken' } }).success).toBe(false);
  });
  test.each(CATEGORIES.map((c) => [c]))('accepts category %s', (category) => {
    expect(v.safeParse(HackersSchema, { ken: { ...entry, category } }).success).toBe(true);
  });
  test('rejects an unknown category', () => {
    expect(v.safeParse(HackersSchema, { ken: { ...entry, category: 'turign' } }).success).toBe(false);
  });
});
