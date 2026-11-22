// src: configs/vitest.config.base.ts
// @(#) : project vitest config: shared base plus workspace aliases and the yaml plugin
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// libs
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// system config
import { mergeConfig } from 'vitest/config';

// shared base config
import sharedConfig from '../base/configs/vitest.config.base.ts';

// plugins
import { pluginYaml } from './plugin-yaml.ts';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkgSrc = (name: string) => path.resolve(rootDir, 'packages/@aglabo', name, 'src/index.ts');

// config
export default mergeConfig(sharedConfig, {
  plugins: [pluginYaml],
  resolve: {
    // resolve workspace packages to their sources so unit tests need no build
    alias: {
      '@aglabo/hacker-names-types': pkgSrc('types'),
      '@aglabo/hacker-names-dict': pkgSrc('dict'),
      '@aglabo/hacker-names': pkgSrc('core'),
    },
  },
});
