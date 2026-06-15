// src: ./configs/tsup.config.ts
// @(#) : tsup config for ESM module
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// system config
import { defineConfig } from 'tsup';

// user config
import { baseConfig, createAliasResolvePlugin } from '../base/configs/tsup.config.base.ts';

// configs
export default defineConfig({
  ...baseConfig,

  // entry points
  entry: {
    'index': './src/index.ts',
  },

  // sub-packages definition
  format: ['esm'],
  outDir: 'dist', // for ESM
  // tsconfig
  tsconfig: './tsconfig.json',
  // DTS with incremental build for ESM
  dts: true,
  // esbuild plugins
  esbuildPlugins: [
    // alias rewrite plugin
    createAliasResolvePlugin({
      '#shared/*': './shared',
      '#runtime/*': './src/runtime',
    }),
  ],
});
