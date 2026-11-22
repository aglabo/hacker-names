// src: packages/@aglabo/dict/configs/vitest.config.integration.ts
// @(#) : vitest config for integration tests of the dict package
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// shared package-level factory
import { definePackageLevel } from '../../../../base/configs/vitest.config.package.ts';

// project config
import baseConfig from './vitest.config.base.ts';

// config
export default definePackageLevel({ baseConfig, configUrl: import.meta.url, level: 'integration' });
