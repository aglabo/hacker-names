// src: packages/@aglabo/cli/configs/tsdown.config.ts
// @(#) : tsdown build config for the cli package (run from the package directory)
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// system config
import { defineConfig } from 'tsdown';

// shared base config
import { baseConfig } from '../../../../base/configs/tsdown.config.base.ts';

// config
export default defineConfig({
  ...baseConfig,
  // resolve paths from the package directory, not from configs/
  cwd: '..',
  entry: { cli: 'src/cli.ts' },
  dts: false,
  outDir: 'dist',
  // sibling workspace packages are resolved at runtime, never inlined
  deps: { neverBundle: [/^@aglabo\//] },
});
