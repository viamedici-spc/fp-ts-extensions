---
status: accepted
---

# fp-ts-extensions

## Purpose

Extensions for fp-ts that the SPC client libraries share: helpers fp-ts does not offer (side effects on `Option`,
`Either` and `TaskEither` values, `Eq` builders for nullable values, unions and unsorted arrays, a full outer join, number
parsing into `Option`, type extractors) and the fp-ts modules themselves under the same names, so one import covers both.

Out of scope: an FP library of its own. Everything here builds on fp-ts 2.x and stays compatible with it.

## Public contract

- The entry point `@viamedici-spc/fp-ts-extensions` exports one namespace per module under the usual fp-ts aliases (`O`,
  `E`, `TE`, `RA`, `RM`, `Eq`, …) and re-exports `fp-ts/function` (`pipe`, `flow`, …).
- Every module is also a subpath: `@viamedici-spc/fp-ts-extensions/Option`, `/ReadonlyArray`, `/function`, … The files
  are `src/<Module>.ts`; each one starts with `export * from "fp-ts/<Module>"` and adds its extensions below.

## Invariants

- **A module is a superset of its fp-ts module.** Whatever fp-ts exports under a name, the module of the same name
  exports unchanged; an extension never shadows an fp-ts export with different behavior.
- **fp-ts is a peer dependency.** The package never bundles fp-ts, so a consumer and the package share one copy.
- **The declarations use fp-ts's own paths** (`fp-ts/Option`), so a consumer sees the same types as in their own code.

## Architecture

One source file per fp-ts module in `src/`, `src/index.ts` as the aggregate entry. tsdown builds every file as its own
ES module with its declaration file (from isolated declarations) and generates the `exports` map. Because fp-ts has no
`exports` map, the JavaScript output imports fp-ts's ES modules by their full path (`fp-ts/es6/Option.js`); the reason is
in [ADR 0001](adr/0001-browser-target-and-esm-only.md), the mechanism in `tsdown.config.ts`. Each module file also
exports the namespace object the build creates for the entry point (such as `Option_exports`); it is not part of the
API and has no declaration.

## Supported environments

Browsers, as ESM, through a bundler or inside a bundle loaded from a CDN. Not Node.js
([ADR 0001](adr/0001-browser-target-and-esm-only.md)).

## Commands

| Command | What it does |
|---|---|
| `bun install` | Installs the dependencies (Bun is the package manager; see `packageManager` in `package.json`). |
| `bun run verify` | The gate, its steps in parallel: type check of sources, tests and `package-check/`, lint, format check, tests, build with package checks (`package.json` unchanged, consumer type check, publint, arethetypeswrong). |
| `bun run build` | Builds `dist/` and updates the `exports` map. |
| `bun run test` | Runs the tests with `bun test`. |
| `bun fmt` | Formats the code. |

The toolchain is described in [ADR 0002](adr/0002-bun-toolchain.md).

## Links

- [AGENTS.md](../AGENTS.md): the rules for working in this repository.
- [upstream-watch.md](upstream-watch.md): what changes once a dependency allows it.
