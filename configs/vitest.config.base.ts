// src: configs/vitest.config.base.ts
// @(#) : vitest base configuration shared by all test levels
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// system config
import { defineConfig } from 'vitest/config';

// config
export default defineConfig({
  test: {
    // all code targets Node.js
    environment: 'node',
    // a level with no specs yet must not fail the run
    passWithNoTests: true,
    exclude: ['node_modules/**', 'dist/**', '.cache/**'],
  },
});
