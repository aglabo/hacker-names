// src: packages/@aglabo/dict/configs/vitest.config.base.ts
// @(#) : vitest config for the dict package: shared base plus workspace aliases and plugins
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// system config
import { mergeConfig } from 'vitest/config';

// shared base config
import sharedConfig from '../../../../base/configs/vitest.config.base.ts';

// plugins (dict is imported from YAML)
import { pluginYaml } from '../../../../configs/plugin-yaml.ts';

// config
export default mergeConfig(sharedConfig, {
  plugins: [pluginYaml],
});
