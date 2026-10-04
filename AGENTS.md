<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->

## ReCloud UI Agent Guide

## External Engineering Standards

The following standards are mandatory when their subject applies to the task:

- [Git workflow](https://docs.worldexecute.me/development/git/)
- [TypeScript style](https://docs.worldexecute.me/development/ts-style/)
- [Markdown style](https://docs.worldexecute.me/development/markdown/)

Read only the standard required for the current work; do not preload all three to conserve context.

| Work being performed | Required reading |
| --- | --- |
| Creating branches, committing, preparing a PR, merging, tagging, or changing Git history | Git workflow |
| Adding or modifying `.ts`, `.tsx`, `.js`, `.jsx`, or Vue script code | TypeScript style |
| Adding or modifying `.md` / `.mdx` content, including Changesets | Markdown style |

- Read the relevant linked standard before performing the matching work, and apply its rules throughout that task.
- Repository-local instructions, package scripts, and release workflow take precedence where they explicitly conflict with an external standard. In particular, this repository develops on `dev` as described in [Releases](#releases).
- Do not fetch, quote, or duplicate the full external standards in issues, PRs, commits, or repository files. Link to them and retain only task-specific project rules here.
- Do not commit secrets, credentials, tokens, local IDE settings, build output, or temporary files. Keep commits focused and independently verifiable.

## Workspace

- Use Bun 1.4.2. This is a Bun workspace: the publishable Vue 3 library is `packages/ui`; `apps/playground` is the Nuxt 4 documentation and integration app.
- Library exports live in `packages/ui/src/index.ts`. When adding a component, add its barrel export there and a Playground page plus `apps/playground/utils/catalog.ts` entry.
- The Nuxt module is `packages/ui/src/nuxt/index.ts`; its default auto-import prefix is `Re` (for example, `ReTagInput`). Keep the direct library export unprefixed.
- Consumers import compiled styles from `@recloudstudio/ui/style.css`; retain the library CSS build step when changing component styles.

## Verification

- For a library-only change, run `bun run --cwd packages/ui typecheck`, `bun run --cwd packages/ui test`, and `bun run --cwd packages/ui build`.
- For component, export, Nuxt-module, or documentation changes, also run `bun run --cwd apps/playground build`.
- Put `--cwd` after `run`. Bun 1.4.2 treats `bun --cwd <dir> run <script>` as `bun run` with no script: it prints usage and exits 0, so the check silently passes without running anything.
- The Playground build refuses to run while a Nuxt dev server holds `apps/playground/.nuxt`; stop the dev server first.
- `bun run ci` is the full workspace gate. Biome intentionally excludes `.vue` files, so do not treat a passing root lint as Vue validation.

## Component Delivery

- A published component lives in `packages/ui/src/components/<name>/`. Keep its implementation, public types, and `index.ts` barrel together.
- Export every public component and type from `packages/ui/src/index.ts`. Do not expose implementation-only helpers by accident.
- Every new public component needs a Playground page at `apps/playground/pages/components/<name>.vue` and an entry in `apps/playground/utils/catalog.ts`.
- `catalog.ts` sorts entries inside each category by title; preserve category order and do not manually work around that sort.
- Follow existing Vue 3 patterns: typed props and emits, `cn()` for class composition, keyboard interactions and ARIA semantics for every interactive control, and light/dark mode support.
- Build console-oriented primitives first: dense but readable states, durable empty/loading/error states, controlled data APIs, and explicit async ownership. Do not make network requests or invent backend protocols inside UI components.
- Keep public state controlled where consumers need to own it. If a component also offers an uncontrolled default, document the interaction and preserve predictable update events.

## Theme and Design Tokens

- Treat `packages/ui/src/theme.css` as the token source of truth. Use semantic tokens (`--background`, `--foreground`, `--card`, `--primary`, `--border`, `--ring`, and status tokens) rather than hard-coded palette values in new or modified components.
- Keep the three visual layers distinct: brand gradients are for emphasis and primary moments; surfaces are neutral; semantic colors communicate status. Never use the brand gradient as generic decoration.
- `useTheme()` owns persisted user preferences for color mode, palette, density, radius, and shadow. Keep `light`, `dark`, and `system` behavior hydration-safe; `auto` remains a compatibility alias only.
- Any persisted theme preference must be represented both by `useTheme()` and `createThemeInitScript()` so the pre-hydration document state matches the hydrated app.
- Preserve legacy CSS variable aliases while migrating components; removing or renaming a public token is a breaking change.
- Use the Sans font stack for UI and the Mono stack for code. Apply tabular numbers to data-heavy tables and metrics with `.rc-tabular-nums` or `data-numeric`.

## Changesets

- Every consumer-visible `@recloudstudio/ui` change requires a Changeset in `.changeset/`; docs-only, tests-only, tooling-only, and behavior-neutral refactors do not.
- Read package names from `package.json`; never list private apps or invent package names.
- Choose the smallest valid bump: `patch` for compatible fixes, `minor` for compatible public features/options/exports, and `major` only for consumer-breaking API or behavior changes.
- Write one or two concise English release-note sentences focused on consumer impact. Do not edit package versions, generated changelogs, or `.changeset/config.json` unless explicitly asked.
- Create and validate the Changeset in the same change as the feature. A typical file is:

  ```md
  ---
  "@recloudstudio/ui": minor
  ---

  Add configurable theme preferences and hydration-safe initialization.
  ```

## Releases

- Develop on `dev`; merge `dev` into `main` only for a planned release. Do not commit feature work directly to `main`, except an urgent production fix.
- Every user-facing change on `dev` needs a Changeset (`bun run changeset`). Do not manually change `@recloudstudio/ui`'s version during feature work.
- Write commit messages and Changeset summaries in English, even when the conversation or UI copy is in another language. Commit subjects use Conventional Commits (`feat: ...`, `fix: ...`, `chore: ...`) in the imperative mood; Changeset summaries are one or two English sentences, because they become the published `CHANGELOG.md`.
- An urgent fix may be committed directly to `main`; add a patch Changeset so the release workflow creates the required patch-version PR.
- A push to `main` creates the Changesets version PR. Merge that PR, then create and push `v<packages/ui/package.json version>` to publish to npm and GitHub Packages. The tag must exactly match the manifest version.
