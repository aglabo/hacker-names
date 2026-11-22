// src: packages/@aglabo/dict/src/dict.ts
// @(#) : dictionaries generated directly from dict/src/*.yaml at build time
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as v from 'valibot';
import adjectivesYaml from '../../../../dict/src/adjectives.yaml';
import hackersYaml from '../../../../dict/src/hackers.yaml';

const AdjectivesSchema = v.array(v.pipe(v.string(), v.regex(/^[a-z]+$/)));

const HackersSchema = v.record(
  v.string(),
  v.object({
    short: v.pipe(v.string(), v.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)),
    fullname: v.string(),
    description: v.string(),
    category: v.string(),
  }),
);

const adjectives = v.parse(AdjectivesSchema, adjectivesYaml);
const hackers = Object.values(v.parse(HackersSchema, hackersYaml)).map((entry) => entry.short);

// duplicated words would skew the random distribution
for (const [name, words] of [['adjectives', adjectives], ['hackers', hackers]] as const) {
  if (new Set(words).size !== words.length) { throw new Error(`duplicate word in ${name} dictionary`); }
}

export const ADJECTIVES: readonly string[] = adjectives;
export const HACKERS: readonly string[] = hackers;
