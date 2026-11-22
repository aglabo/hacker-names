// src: shared/packages/types/src/index.ts
// @(#) : Type definitions for the public API of hacker-names
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export interface GenerateOptions {
  /** return only the hacker part ("knuth") instead of "<adjective>-<hacker>" */
  hackerOnly?: boolean;
  /** random source returning [0, 1); defaults to Math.random */
  rng?: () => number;
}
