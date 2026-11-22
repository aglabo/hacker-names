// src: configs/vitest.config.unit.ts
// @(#) : vitest config for unit tests (packages/@aglabo/*/src/**/__tests__/unit)
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
  level: 'unit',
  // unit test - pure tests of individual functions/modules
  include: ['{packages/@aglabo/*/src,scripts}/**/__tests__/unit/**/*.spec.ts'],
});
