// src: packages/@aglabo/core/configs/vitest.config.base.ts
// @(#) : vitest config for the core package: shared base plus workspace aliases and plugins
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
import sharedConfig from '../../../../base/configs/vitest.config.base.ts';

// plugins (dict is imported from YAML)
import { pluginYaml } from '../../../../configs/plugin-yaml.ts';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const pkgSrc = (dir: string, name: string) => path.resolve(workspaceRoot, dir, name, 'src/index.ts');

// config
export default mergeConfig(sharedConfig, {
  plugins: [pluginYaml],
  resolve: {
    // resolve workspace packages to their sources so unit tests need no build
    alias: {
      '@aglabo/hacker-names-types': pkgSrc('shared/packages', 'types'),
      '@aglabo/hacker-names-dict': pkgSrc('packages/@aglabo', 'dict'),
    },
  },
});
