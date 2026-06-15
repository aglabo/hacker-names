// src: ./src/greeting.ts
// @(#) : greeting function
//
// Copyright (c) 2026- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export const greet = (name: string): string => {
  if (!name) {
    throw new Error('Error: Name parameter is required');
  }
  return `Hello, ${name}!!`;
};
