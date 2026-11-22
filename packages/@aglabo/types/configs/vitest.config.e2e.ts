// src: packages/@aglabo/types/configs/vitest.config.e2e.ts
// @(#) : vitest config for e2e tests of the types package
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
export default definePackageLevel({ baseConfig, configUrl: import.meta.url, level: 'e2e' });
