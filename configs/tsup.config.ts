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

// shared entry points
const _entry = {
  'index': './src/index.ts',
  'cli': './src/cli.ts',
};

// shared alias plugin
const _aliasPlugin = createAliasResolvePlugin({
  '#shared/*': './shared',
  '#runtime/*': './src/runtime',
});

// configs
export default defineConfig([
  // Build 1: JS only → dist/
  {
    ...baseConfig,
    entry: _entry,
    format: ['esm'],
    outDir: 'dist',
    tsconfig: './tsconfig.json',
    dts: false,
    sourcemap: false,
    clean: true,
    esbuildPlugins: [_aliasPlugin],
  },
  // Build 2: d.ts + sourcemap (+ JS) → module/
  {
    ...baseConfig,
    entry: _entry,
    format: ['esm'],
    outDir: 'module',
    tsconfig: './tsconfig.json',
    dts: true,
    sourcemap: true,
    clean: true,
    esbuildPlugins: [_aliasPlugin],
  },
]);
