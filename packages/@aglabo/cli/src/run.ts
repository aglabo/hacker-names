// src: packages/@aglabo/cli/src/run.ts
// @(#) : CLI logic (no process access, so it can be unit-tested)
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { generate, VERSION } from '@aglabo/hacker-names';
import { parseArgs } from 'node:util';
import type { CliResult } from './run.types.ts';

const USAGE = `Usage: hacker-names [options]

Prints a random "<adjective>-<hacker>" name.

Options:
  -H, --hacker-only  print only the hacker name
  -h, --help         show this help
  -v, --version      show the version
`;

export function run(argv: readonly string[], rng?: () => number): CliResult {
  let values;
  try {
    ({ values } = parseArgs({
      args: [...argv],
      options: {
        'hacker-only': { type: 'boolean', short: 'H' },
        'help': { type: 'boolean', short: 'h' },
        'version': { type: 'boolean', short: 'v' },
      },
      allowPositionals: false,
    }));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { code: 2, stdout: '', stderr: `${message}\n\n${USAGE}` };
  }
  if (values.help === true) { return { code: 0, stdout: USAGE, stderr: '' }; }
  if (values.version === true) { return { code: 0, stdout: `${VERSION}\n`, stderr: '' }; }
  const name = generate({
    hackerOnly: values['hacker-only'] === true,
    ...(rng === undefined ? {} : { rng }),
  });
  return { code: 0, stdout: `${name}\n`, stderr: '' };
}
