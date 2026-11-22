// src: scripts/sync-package-scripts.ts
// @(#) : merge base script templates into a package.json, keeping local-only scripts
//
// Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
//
// usage: tsx scripts/sync-package-scripts.ts <target_dir> <package|root> [--dry-run]

// libs
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type Scripts = Record<string, string>;

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const templates = { package: 'base-scripts.json', root: 'base-root-scripts.json' } as const;

const [targetDir, kind, flag] = process.argv.slice(2);
const templateFile = kind === 'package' || kind === 'root' ? templates[kind] : undefined;
if (!targetDir || !templateFile) {
  console.error('usage: sync-package-scripts.ts <target_dir> <package|root> [--dry-run]');
  process.exit(2);
}
const dryRun = flag === '--dry-run';

const readJson = (file: string) => JSON.parse(readFileSync(file, 'utf8'));
const baseScripts: Scripts = readJson(path.join(repoRoot, 'base/configs', templateFile)).scripts;

const targetFile = path.resolve(targetDir, 'package.json');
const pkg = readJson(targetFile);
const current: Scripts = pkg.scripts ?? {};

// base entries win; scripts that exist only in the target stay untouched
const merged: Scripts = { ...current, ...baseScripts };
const changed = Object.keys(baseScripts).filter((k) => current[k] !== baseScripts[k]);

for (const k of changed) {
  console.log(`${current[k] === undefined ? '+' : '~'} ${k}: ${baseScripts[k]}`);
}
if (changed.length === 0) {
  console.log('scripts already in sync');
} else if (!dryRun) {
  writeFileSync(targetFile, JSON.stringify({ ...pkg, scripts: merged }, null, 2) + '\n');
  console.log(`updated ${targetFile}`);
}
