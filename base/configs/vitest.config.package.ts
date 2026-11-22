// src: base/configs/vitest.config.package.ts
// @(#) : factory for per-package vitest level configs (a package tests itself from its own directory)
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// libs
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// system config
import type { ViteUserConfig } from 'vitest/config';

// shared level factory
import { defineLevelConfig } from './vitest.config.level.ts';

type PackageLevelOptions = {
  // package-specific config this level builds on (base + aliases + plugins)
  baseConfig: ViteUserConfig;
  // import.meta.url of the calling <package>/configs/*.ts file
  configUrl: string;
  // test level name: unit / functional / integration / e2e
  level: string;
};

// build the config for one test level of a single package
export const definePackageLevel = ({ baseConfig, configUrl, level }: PackageLevelOptions): ViteUserConfig =>
  defineLevelConfig({
    baseConfig,
    // <package>/configs/x.ts -> <package>
    rootDir: path.resolve(path.dirname(fileURLToPath(configUrl)), '..'),
    level,
    include: [`src/**/__tests__/${level}/**/*.spec.ts`],
  });
