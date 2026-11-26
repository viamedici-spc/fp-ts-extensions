---
status: living
---

# Upstream watch

Things we would do differently if a dependency or a tool allowed it, each with the one command that says whether it does
yet.

⚠️ **Nobody polls this file.** It is read when somebody upgrades the dependency in question. An entry is owed by
somebody else, so it can be neither decided nor planned.

## fp-ts

### Import fp-ts by its public subpaths in the output

- **We would rather** emit `fp-ts/Option` in the JavaScript output, as written in the sources.
- **We do instead** rewrite fp-ts imports to their full ES module paths (`fp-ts/es6/Option.js`) in `tsdown.config.ts`.
- **What blocks it:** fp-ts 2.x has no `exports` map, so strict ESM resolution cannot resolve its subpaths.
- **Check** (an `exports` field in the output means the gate has lifted):

  ```bash
  npm view fp-ts@latest exports
  ```

- **What it would buy:** the rewrite in `tsdown.config.ts` goes away.
- **Upstream:** fp-ts 2.x is in maintenance; its successor is Effect.
- **Last checked:** fp-ts 2.16.11, 2026-11-26: no `exports` field.

## Bun

### Publish with `bun publish`

- **We would rather** publish with `bun publish`, the same tool that packs.
- **We do instead** pack with `bun pm pack` and publish with `npm publish` in the shared CI workflow.
- **What blocks it:** `bun publish` cannot authenticate through npm trusted publishing (OIDC).
- **Check** (`CLOSED` means it may have landed; then try it in a branch build):

  ```bash
  gh issue view 22423 --repo oven-sh/bun --json state --jq .state
  ```

- **What it would buy:** no Node.js setup in the publish job.
- **Upstream:** https://github.com/oven-sh/bun/issues/22423
- **Last checked:** Bun 1.4.5, 2026-11-26: open.

### Lint with `bun lint`

- **We would rather** lint with Bun itself, as we type-check and format with it.
- **We do instead** run oxlint (`bun run lint`).
- **What blocks it:** Bun has no `lint` command yet.
- **Check** (a line means Bun lists `lint` among its own commands; inside this repository `bun lint` would run the
  package's `lint` script instead):

  ```bash
  bun --help | grep -w lint
  ```

- **What it would buy:** one tool less, and `.oxlintrc.json` read by Bun if it stays compatible.
- **Upstream:** Bun release notes.
- **Last checked:** Bun 1.4.5, 2026-11-26: no `lint` command.

## tsdown

### Let tsdown generate the declarations

- **We would rather** use tsdown's own declaration output (`dts: {generator: "oxc"}`).
- **We do instead** emit one declaration file per module with Oxc's isolated declarations, in a small plugin in
  `tsdown.config.ts`.
- **What blocks it:** tsdown's declaration bundling (rolldown-plugin-dts) drops what a module re-exports with
  `export * from "fp-ts/…"` once that module is re-exported as a namespace (`export * as O from "./Option"`), so
  `O.isSome` is missing from the declarations while the JavaScript has it.
- **Check** (in a scratch copy of the repository: switch `tsdown.config.ts` to `dts: {generator: "oxc"}` without the
  `isolatedDeclarations` plugin, build, and run the consumer type check; exit code 0 means it is fixed):

  ```bash
  bun run build && bun package-check/consumer.ts
  ```

- **What it would buy:** the plugin in `tsdown.config.ts` and the explicit `rolldown` dev dependency go away.
- **Upstream:** https://github.com/sxzz/rolldown-plugin-dts/issues/300
- **Last checked:** tsdown 0.23.7, 2026-11-26: the consumer type check fails with TS2694 and TS2314 in
  `dist/index.d.ts`; the issue is open.
