# Project Instructions for AI Agents

This file provides instructions and context for AI coding agents working on this project.

<!-- markdownlint-disable -->
<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:46cd31e7 -->

## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB.
Sync uses `refs/dolt/data` on your git remote.
`.beads/issues.jsonl` is a passive export.

For details and anti-patterns, see:
https://github.com/gastownhall/beads/blob/main/docs/core-concepts/sync-concepts.md

## Agent Context Profiles

The managed Beads block is task-tracking guidance.
It does not override repository, user, or orchestrator instructions.

- Conservative (default): Use `bd` for task tracking. Do not run git commits, git pushes, or Dolt remote sync unless explicitly asked. At handoff, report changed files, validation, and suggested next commands.
- Minimal: Keep tool instruction files as pointers to `bd prime`.
  Use the same conservative git policy unless active instructions say otherwise.
- Team-maintainer: Only when the repository explicitly opts in.
  Agents may then close beads and run quality gates.
  They may also commit and push as part of session close.
  A current "do not commit" or "do not push" instruction still wins.

## Session Completion

This protocol applies when ending a Beads implementation workflow. It is subordinate to explicit user, repository, and orchestrator instructions.

1. File issues for remaining work - Create beads for anything that needs follow-up
2. Run quality gates (if code changed) - Tests, linters, builds
3. Update issue status - Close finished work, update in-progress items
4. Handle git/sync by active profile:
   ```bash
   # Conservative/minimal/default: report status and proposed commands; wait for approval.
   git status

   # Team-maintainer opt-in only, unless current instructions forbid it:
   git pull --rebase
   bd dolt push
   git push
   git status
   ```
5. Hand off - Summarize changes, validation, issue status, and any blocked sync/commit/push step

**Critical rules:**

- Explicit user or orchestrator instructions override this Beads block.
- Do not commit or push without clear authority from the active profile or the current user request.
- If a required sync or push is blocked, stop and report the exact command and error.

<!-- END BEADS INTEGRATION -->
<!-- markdownlint-enable -->

## Build & Test

```bash
pnpm install
pnpm build   # builds every package into packages/@aglabo/*/dist
pnpm test    # unit, functional, integration, e2e
pnpm lint && pnpm lint:types && pnpm lint:filenames
```

Each package also works standalone from its own directory (`configs/` holds its tsdown/vitest/oxlint config):

```bash
cd packages/@aglabo/core
pnpm build       # this package only (build workspace deps first for cli e2e)
pnpm test        # unit, functional, integration, e2e
pnpm lint && pnpm lint:types
```

## Architecture Overview

pnpm workspace under `packages/@aglabo/` (dependency order: types, dict, core, cli):

- `types` (`@aglabo/hacker-names-types`): `GenerateOptions`
- `dict` (`@aglabo/hacker-names-dict`): `ADJECTIVES` / `HACKERS`, generated at build time directly from `dict/src/*.yaml` (`configs/plugin-yaml.ts`)
- `core` (`@aglabo/hacker-names`): `generate()` / `VERSION` — the library TypeScript users import
- `cli` (`@aglabo/hacker-names-cli`): `run()` and the `hacker-names` bin

## Conventions & Patterns

### Config layout: base vs. extension

- `base/configs/` — shared, project-agnostic config (tsconfig, vitest, tsdown, oxlint, commitlint, script templates). Do not put repo-specific values here.
- `configs/` — this repository's extension; imports the base by relative path (`../base/configs/...`).
- `packages/@aglabo/*/tsconfig.json` extends `base/configs/tsconfig.base.json`.
- Things that cannot `extends` (package.json `scripts`) are copied from `base/configs/base-scripts.json` (packages) and `base-root-scripts.json` (root)
  with `bash scripts/sync-configs.sh <target_dir> <package|root> [--dry-run]` (`pnpm sync:configs`). Local-only scripts are kept.
