// src: shared/dictionary/src/schema.ts
// @(#) : valibot schemas for data/adjectives.yaml and data/hackers.yaml
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as v from 'valibot';

export const CATEGORIES = ['turing', 'language', 'oss', 'author', 'historical', 'scientist', 'engineer'] as const;
export type Category = (typeof CATEGORIES)[number];

export const AdjectivesSchema = v.array(v.pipe(v.string(), v.regex(/^[a-z]+$/)));

// v.record accepts arrays, JSON Schema `type: object` does not: reject them first
export const HackersSchema = v.pipe(
  v.custom<unknown>((input) => !Array.isArray(input), 'expected a map, not an array'),
  v.record(
    v.pipe(v.string(), v.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)),
    v.object({
      fullname: v.string(),
      description: v.string(),
      category: v.picklist(CATEGORIES),
    }),
  ),
);
