#!/usr/bin/env node
// src: packages/@aglabo/cli/src/cli.ts
// @(#) : CLI entry point (reads argv, writes stdout/stderr, sets exit code)
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { run } from './run.ts';

const result = run(process.argv.slice(2));
if (result.stdout !== '') { process.stdout.write(result.stdout); }
if (result.stderr !== '') { process.stderr.write(result.stderr); }
process.exitCode = result.code;
