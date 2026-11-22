// src: base/configs/tsdown.config.base.ts
// @(#) : shared tsdown build settings (no entries, no project-specific externals)
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// system config
import type { UserConfig } from 'tsdown';

// config
export const baseConfig: UserConfig = {
  format: 'esm',
  platform: 'node',
  target: 'node24',
  // wipe each package's output directory before building it
  clean: true,
};
