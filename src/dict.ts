// src: src/dict.ts
// @(#) : dictionaries bundled at build time (dict/*.dic)
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import adjectivesText from '../dict/adjectives.dic?raw';
import hackersText from '../dict/hackers.dic?raw';
import { parseDict } from './parse-dict.ts';

export const ADJECTIVES: readonly string[] = parseDict(adjectivesText);
export const HACKERS: readonly string[] = parseDict(hackersText);
