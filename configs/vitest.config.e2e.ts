// src: configs/vitest.config.e2e.ts
// @(#) : vitest config for e2e tests (src/**/__tests__/e2e)
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// libs for base directory
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// base directory
const configDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(configDir, '..');

// system config
import { mergeConfig } from 'vitest/config';

// shared base config
import baseConfig from './vitest.config.base.ts';

// config
export default mergeConfig(baseConfig, {
  root: rootDir,
  test: {
    include: [
      // E2E Test - end-to-end runs through the CLI entry point
      '{src,scripts}/**/__tests__/e2e/**/*.spec.ts',
    ],
    cacheDir: path.resolve(rootDir, '.cache/vitest-cache/e2e/'),
    // coverage is reported per level to keep reports separate
    coverage: {
      provider: 'v8',
      reporter: ['json', 'lcov'],
      reportsDirectory: path.resolve(rootDir, 'coverage/e2e'),
    },
  },
});
