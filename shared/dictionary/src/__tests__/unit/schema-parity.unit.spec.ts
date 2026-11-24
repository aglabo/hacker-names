// src: shared/dictionary/src/__tests__/unit/schema-parity.unit.spec.ts
// @(#) : the valibot schemas must agree with the JSON Schema source of truth
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Ajv2020 } from 'ajv/dist/2020.js';
import { readFileSync } from 'node:fs';
import * as v from 'valibot';
import { parse } from 'yaml';
import { describe, expect, test } from 'vitest';
import { AdjectivesSchema, HackersSchema } from '../../index.ts';

const root = new URL('../../../', import.meta.url);
const readJson = (p: string) => JSON.parse(readFileSync(new URL(p, root), 'utf8')) as object;
const readYaml = (p: string) => parse(readFileSync(new URL(p, root), 'utf8')) as unknown;

const ajv = new Ajv2020({ strict: true });
const jsonAdjectives = ajv.compile(readJson('schema/adjectives.schema.json'));
const jsonHackers = ajv.compile(readJson('schema/hackers.schema.json'));

const entry = { fullname: 'Ken Thompson', description: 'd', category: 'turing' };

// [label, input]: both validators must give the same verdict
const adjectiveCases: [string, unknown][] = [
  ['actual data', readYaml('data/adjectives.yaml')],
  ['valid', ['quiet', 'bold']],
  ['empty', []],
  ['uppercase', ['Quiet']],
  ['hyphen', ['a-b']],
  ['non-string', [1]],
  ['not an array', {}],
];
const hackerCases: [string, unknown][] = [
  ['actual data', readYaml('data/hackers.yaml')],
  ['valid', { 'ken-thompson': entry }],
  ['empty', {}],
  ['bad slug key', { Ken: entry }],
  ['trailing hyphen key', { 'ken-': entry }],
  ['missing field', { ken: { fullname: 'Ken' } }],
  ['not an object', []],
];

describe('JSON Schema / valibot parity', () => {
  test.each(adjectiveCases)('adjectives: %s', (_l, input) => {
    expect(v.safeParse(AdjectivesSchema, input).success).toBe(jsonAdjectives(input));
  });
  test.each(hackerCases)('hackers: %s', (_l, input) => {
    expect(v.safeParse(HackersSchema, input).success).toBe(jsonHackers(input));
  });
  test('YAML parsers reject duplicate slug keys', () => {
    expect(() => parse('ken:\n  fullname: a\nken:\n  fullname: b\n')).toThrow();
  });
  // uniqueItems is enforced by JSON Schema only; the loader checks duplicates in code
  test('actual data satisfies the JSON Schema', () => {
    expect(jsonAdjectives(readYaml('data/adjectives.yaml'))).toBe(true);
  });
});
