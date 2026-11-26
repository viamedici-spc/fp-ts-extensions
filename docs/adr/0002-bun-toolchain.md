---
status: accepted
---

# ADR 0002: Bun runs the toolchain; tsdown builds the package

Date: 2026-11-26

## Context

The toolchain grew from npm with a `postinstall` script that broke installs for consumers, Vite in library mode with
plugins for declarations and type checks, Vitest and TypeScript 5. Each piece had its own configuration and version
drift, and the published package mixed formats.

## Decision

- **Bun** is the package manager and script runner (`packageManager` in `package.json`, `bun.lock`), the type checker
  (`bun check`, which runs the TypeScript 7 checker and emits nothing), the formatter (`bun fmt`, configured in
  `.oxfmtrc.json`) and the test runner (`bun test` with the `bun:test` API).
- **oxlint** lints, until Bun ships a linter of its own.
- **tsdown** builds the package: ES modules and the generated `exports` map. The declarations come from Oxc's isolated
  declarations, one file per module (no TypeScript compiler needed). publint and arethetypeswrong check the packed
  result.
- **`bun run verify`** is the one gate, locally and in CI; its independent steps run in parallel
  (`bun run --parallel`).
- **Publishing** goes through the shared CI workflow: Bun packs the tarball, `npm publish` uploads it with npm trusted
  publishing, since `bun publish` cannot use trusted publishing yet.
- **Installs** take only versions that have been public for three days (`minimumReleaseAge` in `bunfig.toml`).

## Consequences

- Exported functions and constants carry explicit types (`isolatedDeclarations`), and type-only imports are marked as
  such (`verbatimModuleSyntax`).
- Contributors need Bun; editors keep their own TypeScript.
- A dependency released in the last three days is not installed until it has aged.

## Alternatives considered

- **npm and Vite as before:** the install breakage and the format mix came from there.
- **Declarations from the TypeScript compiler:** slower, needs the `typescript` package, and lets inferred types leak
  into the public declarations unnoticed.
- **Vitest for tests:** the tests need no DOM, and `bun test` runs them without another tool.
