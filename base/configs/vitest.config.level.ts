// src: base/configs/vitest.config.level.ts
// @(#) : factory for per-test-level vitest configs (unit / functional / integration / e2e)
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// libs
import path from 'node:path';

// system config
import { mergeConfig, type ViteUserConfig } from 'vitest/config';

type LevelOptions = {
  // project-specific config this level builds on (base + aliases + plugins)
  baseConfig: ViteUserConfig;
  // repository root; cache and coverage output are placed under it
  rootDir: string;
  // test level name, also used as the cache/coverage subdirectory
  level: string;
  // spec file globs, relative to rootDir
  include: string[];
};

// build the config for one test level
export const defineLevelConfig = ({ baseConfig, rootDir, level, include }: LevelOptions): ViteUserConfig =>
  mergeConfig(baseConfig, {
    root: rootDir,
    test: {
      include,
      cacheDir: path.resolve(rootDir, `.cache/vitest-cache/${level}/`),
      // coverage is reported per level to keep reports separate
      coverage: {
        provider: 'v8',
        reporter: ['json', 'lcov'],
        reportsDirectory: path.resolve(rootDir, `coverage/${level}`),
      },
    },
  });
