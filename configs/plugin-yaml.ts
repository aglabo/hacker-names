// src: configs/plugin-yaml.ts
// @(#) : rolldown/vite plugin that turns `import data from "./x.yaml"` into a JS object at build time
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

// Vite (vitest) and rolldown (tsdown) share the `load` hook, so one plugin serves both.
export const pluginYaml = {
  name: 'yaml-data',
  load(id: string) {
    if (!id.endsWith('.yaml')) { return null; }
    const data = parse(readFileSync(id, 'utf8')) as unknown;
    return `export default ${JSON.stringify(data)};`;
  },
};
