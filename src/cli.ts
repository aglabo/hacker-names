// src: ./src/cli.ts
// @(#) : CLI entry point for npx execution
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { greet } from './index.ts';

const _name = process.argv[2];

if (!_name) {
  console.error('Error: Name parameter is required');
  process.exit(1);
}

console.log(greet(_name));
