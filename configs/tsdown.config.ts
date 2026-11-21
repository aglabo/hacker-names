// src: configs/tsdown.config.ts
// @(#) : tsdown config for bundling the library and CLI (src/index.ts, src/cli.ts)
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// libs
import { readFileSync } from 'node:fs';

// system config
import { defineConfig } from 'tsdown';

// plugins
// Vite (vitest) understands `import text from "./x.dic?raw"` natively; rolldown does not.
// This plugin gives rolldown the same behaviour so one source works in both.
const pluginRawQuery = {
  name: 'raw-query',
  load(id: string) {
    if (!id.endsWith('?raw')) { return null; }
    const text = readFileSync(id.slice(0, -'?raw'.length), 'utf8');
    return `export default ${JSON.stringify(text)};`;
  },
};

// config
export default defineConfig({
  // entries: library API and CLI
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
  },
  // resolve paths from the repository root, not from configs/
  cwd: '..',
  // output
  format: 'esm',
  platform: 'node',
  target: 'node20',
  // emit type declarations
  dts: true,
  // wipe the output directory before each build
  clean: true,
  plugins: [pluginRawQuery],
});
