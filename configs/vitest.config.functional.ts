// src: configs/vitest.config.functional.ts
// @(#) : vitest config for functional tests (src/**/__tests__/functional)
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
      // Functional Test - behavior of a feature as a whole
      '{src,scripts}/**/__tests__/functional/**/*.spec.ts',
    ],
    cacheDir: path.resolve(rootDir, '.cache/vitest-cache/functional/'),
    // coverage is reported per level to keep reports separate
    coverage: {
      provider: 'v8',
      reporter: ['json', 'lcov'],
      reportsDirectory: path.resolve(rootDir, 'coverage/functional'),
    },
  },
});
