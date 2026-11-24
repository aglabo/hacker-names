// src: packages/@aglabo/dict/src/dict.ts
// @(#) : dictionaries generated directly from dict/src/*.yaml at build time
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AdjectivesSchema, HackersSchema } from '@aglabo/hacker-names-dictionary';
import adjectivesYaml from '@aglabo/hacker-names-dictionary/adjectives.yaml';
import hackersYaml from '@aglabo/hacker-names-dictionary/hackers.yaml';
import * as v from 'valibot';

const adjectives = v.parse(AdjectivesSchema, adjectivesYaml);
const hackers = Object.keys(v.parse(HackersSchema, hackersYaml));

// duplicated words would skew the random distribution (hacker slugs are map keys, unique by construction)
if (new Set(adjectives).size !== adjectives.length) { throw new Error('duplicate word in adjectives dictionary'); }

export const ADJECTIVES: readonly string[] = adjectives;
export const HACKERS: readonly string[] = hackers;
