// src: src/__tests__/unit/parse-dict.unit.spec.ts
// @(#) : unit tests for parseDict
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { describe, expect, test } from 'vitest';
import { parseDict } from '../../parse-dict.ts';

describe('parseDict', () => {
  test('ignores # header lines and blank lines', () => {
    expect(parseDict('# h\n\na\nb\n')).toEqual(['a', 'b']);
  });
  test('tolerates CRLF', () => {
    expect(parseDict('# h\r\n\r\na\r\nb\r\n')).toEqual(['a', 'b']);
  });
});
