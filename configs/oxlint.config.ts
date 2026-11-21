// src: configs/oxlint.config.ts
// @(#) : oxlint config with type-aware linting
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// system config
import { defineConfig } from 'oxlint';

// config
export default defineConfig({
  // rule categories: correctness is fatal, suspicious is advisory
  categories: {
    correctness: 'error',
    suspicious: 'warn',
  },
  // type-aware rules need type information; typeCheck also reports TypeScript errors
  options: {
    typeAware: true,
    typeCheck: true,
  },
  // build output, dependencies, caches and scratch files
  ignorePatterns: ['dist', 'node_modules', '.cache', 'temp'],
});
