// src: configs/vitest.config.integration.ts
// @(#) : vitest config for integration tests (src/**/__tests__/integration)
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
      // Integration Test - interaction between modules
      '{src,scripts}/**/__tests__/integration/**/*.spec.ts',
    ],
    cacheDir: path.resolve(rootDir, '.cache/vitest-cache/integration/'),
    // coverage is reported per level to keep reports separate
    coverage: {
      provider: 'v8',
      reporter: ['json', 'lcov'],
      reportsDirectory: path.resolve(rootDir, 'coverage/integration'),
    },
  },
});
