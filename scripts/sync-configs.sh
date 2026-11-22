#!/usr/bin/env bash
# src: scripts/sync-configs.sh
# @(#) : copy non-extendable settings (package.json scripts) from base/configs into a target
#
# Copyright (c) 2025- atsushifx <https://github.com/atsushifx>
#
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT
#
# usage: sync-configs.sh <target_dir> <package|root> [--dry-run]

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ $# -lt 2 ]]; then
  echo "usage: $0 <target_dir> <package|root> [--dry-run]" >&2
  exit 2
fi

target="$1"
kind="$2"
shift 2

case "${kind}" in
  package | root) ;;
  *)
    echo "unknown type: ${kind} (expected package | root)" >&2
    exit 2
    ;;
esac

cd "${REPO_ROOT}"
exec pnpm exec tsx scripts/sync-package-scripts.ts "$(cd "${OLDPWD}" && cd "${target}" && pwd)" "${kind}" "$@"
