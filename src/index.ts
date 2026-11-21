// src: src/index.ts
// @(#) : public API of hacker-names
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import type { GenerateOptions } from '#shared/types/index.types.ts';
import { ADJECTIVES, HACKERS } from './dict.ts';

export type { GenerateOptions };

export const VERSION = '0.0.1';

function pick(words: readonly string[], rng: () => number): string {
  const index = Math.min(Math.floor(rng() * words.length), words.length - 1);
  const word = words[index];
  if (word === undefined) { throw new Error('dictionary is empty'); }
  return word;
}

export function generate(options: GenerateOptions = {}): string {
  const rng = options.rng ?? Math.random;
  const adjective = options.hackerOnly === true ? undefined : pick(ADJECTIVES, rng);
  const hacker = pick(HACKERS, rng);
  return adjective === undefined ? hacker : `${adjective}-${hacker}`;
}
