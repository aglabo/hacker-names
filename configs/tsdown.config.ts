// src: configs/tsdown.config.ts
// @(#) : tsdown config bundling each workspace package (packages/@aglabo/*/src) into its dist
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// system config
import { defineConfig, type UserConfig } from 'tsdown';

// shared base config
import { baseConfig } from '../base/configs/tsdown.config.base.ts';

// plugins
import { pluginYaml } from './plugin-yaml.ts';

// settings shared by every package build in this repository
const common: UserConfig = {
  ...baseConfig,
  // resolve paths from the repository root, not from configs/
  cwd: '..',
  // sibling workspace packages are resolved at runtime, never inlined
  external: [/^@aglabo\//],
  plugins: [pluginYaml],
};

const pkg = (name: string) => `packages/@aglabo/${name}`;

// config: one build per package, in dependency order
export default defineConfig([
  { ...common, entry: { index: `${pkg('types')}/src/index.ts` }, outDir: `${pkg('types')}/dist`, dts: true },
  { ...common, entry: { index: `${pkg('dict')}/src/index.ts` }, outDir: `${pkg('dict')}/dist`, dts: true },
  { ...common, entry: { index: `${pkg('core')}/src/index.ts` }, outDir: `${pkg('core')}/dist`, dts: true },
  { ...common, entry: { cli: `${pkg('cli')}/src/cli.ts` }, outDir: `${pkg('cli')}/dist`, dts: false },
]);
