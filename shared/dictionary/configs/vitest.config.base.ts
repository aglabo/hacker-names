// src: packages/@aglabo/dict/configs/vitest.config.base.ts
// @(#) : vitest config for the dict package: shared base plus workspace aliases and plugins
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// system config
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vitest/config';

// shared base config
import sharedConfig from '../../../../base/configs/vitest.config.base.ts';

// plugins (dict is imported from YAML)
import { pluginYaml } from '../../../../configs/plugin-yaml.ts';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');

// config
export default mergeConfig(sharedConfig, {
  plugins: [pluginYaml],
  resolve: {
    // resolve the schema entry to its source so unit tests need no build (YAML subpaths resolve via package exports)
    alias: [{
      find: /^@aglabo\/hacker-names-dictionary$/,
      replacement: path.resolve(workspaceRoot, 'shared/dictionary/src/index.ts'),
    }],
  },
});
