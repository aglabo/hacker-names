// src: shared/types/configs/tsdown.config.ts
// @(#) : tsdown build config for the types package (run from the package directory)
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// system config
import { defineConfig } from 'tsdown';

// shared base config
import { baseConfig } from '../../../base/configs/tsdown.config.base.ts';

// config
export default defineConfig({
  ...baseConfig,
  // resolve paths from the package directory, not from configs/
  cwd: '..',
  entry: { index: 'src/index.ts' },
  dts: true,
  outDir: 'dist',
  // sibling workspace packages are resolved at runtime, never inlined
  external: [/^@aglabo\//],
});
