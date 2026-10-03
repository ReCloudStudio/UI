<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->

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

## Releases

- Develop on `dev`; merge `dev` into `main` only for a planned release. Do not commit feature work directly to `main`, except an urgent production fix.
- Every user-facing change on `dev` needs a Changeset (`bun run changeset`). Do not manually change `@recloudstudio/ui`'s version during feature work.
- Write commit messages and Changeset summaries in English, even when the conversation or UI copy is in another language. Commit subjects use Conventional Commits (`feat: ...`, `fix: ...`, `chore: ...`) in the imperative mood; Changeset summaries are one or two English sentences, because they become the published `CHANGELOG.md`.
- An urgent fix may be committed directly to `main`; add a patch Changeset so the release workflow creates the required patch-version PR.
- A push to `main` creates the Changesets version PR. Merge that PR, then create and push `v<packages/ui/package.json version>` to publish to npm and GitHub Packages. The tag must exactly match the manifest version.
