// src: configs/vitest.config.e2e.ts
// @(#) : vitest config for e2e tests (packages/@aglabo/*/src/**/__tests__/e2e)
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// libs
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// shared level factory
import { defineLevelConfig } from '../base/configs/vitest.config.level.ts';

// project config
import baseConfig from './vitest.config.base.ts';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// config
export default defineLevelConfig({
  baseConfig,
  rootDir,
  level: 'e2e',
  // e2e test - end-to-end runs through the CLI entry point
  include: ['{packages/@aglabo/*/src,scripts}/**/__tests__/e2e/**/*.spec.ts'],
});
