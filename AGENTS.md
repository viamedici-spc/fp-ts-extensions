# Repository guidelines

fp-ts-extensions extends fp-ts: every module in `src/` re-exports the fp-ts module of the same name and adds helpers. It
is the functional base of the SPC client libraries. Start with [docs/overview.md](docs/overview.md).

## Commands

- `bun install` — install (Bun is the package manager; never npm, so no `package-lock.json`).
- `bun run verify` — the gate before a change counts as done: `bun check` (sources, tests and `package-check/`), oxlint,
  `bun fmt --check`, `bun test`, the tsdown build (which must leave `package.json` unchanged), the consumer type check
  (`package-check/consumer.ts`), publint and arethetypeswrong.
- `bun run build`, `bun run test`, `bun run lint`, `bun fmt` — the single steps.
- Dependencies are updated by hand when working on the library: `bun outdated`, then `bun audit`. `bunfig.toml` installs
  only versions that have been public for three days.

## Code

- One file per fp-ts module in `src/`, starting with `export * from "fp-ts/<Module>"`; `src/index.ts` aggregates them. A
  new module is a new file in `src/` plus its `export * as … from "./<Module>"` line in `src/index.ts`; the build picks
  up the file and updates the `exports` map in `package.json`, and a test checks the line.
- Exported functions and constants carry explicit types (`isolatedDeclarations`); type-only imports use `import type`.
- Conventions: [docs/conventions/code.md](docs/conventions/code.md).

## Commits and releases

- Short, sentence-case messages in the past tense (e.g. "Added Eq for unsorted arrays"); one concern per commit; issue
  references as `Fixes #<n>`. Ask before committing.
- CI (`.github/workflows/main.yml`) runs the shared workflow `viamedici-spc/github-ci` (`build-bun.yml`): it verifies
  every push and pull request (a branch with an open pull request runs twice) and publishes, on a push or a manual run
  only, with npm trusted publishing — `main` as release candidates, `feature/*` branches as prereleases under a
  dist-tag named after the branch, version tags as releases.
- Publishing runs in the GitHub environment `npm`, whose rules admit `main`, `feature/*`, `release/*`, `hotfix/*`,
  `support/*` and version tags; npm accepts a publish of this package only from that environment.
- Only repository admins create, move or delete version tags; a tag ruleset enforces it.

## This repository is public

Everything committed here is public: on GitHub, in the npm package, through jsDelivr. Documents, lists, code comments,
TSDoc, tests, test fixtures and commit messages describe **only the public API and the behavior a consumer can
observe**. Never write engine internals (how or why the engine does something behind its documented REST API), internal
hosts, internal repositories or their contents, tokens, customer names or customer models, internal findings or
analyses, or a person's name. An engine behavior is described by what a request returns; a workaround by what it does.
Such material stays outside the repository, with the maintainers. A commit message is public once pushed, so check it
before pushing. The full rule is in
[docs/conventions/documentation.md](docs/conventions/documentation.md#this-repository-is-public).

## Supported environments

- **Browsers only**, as **ESM only**: through a bundler, or inside the configurator-framer bundle from a CDN.
- **Not Node.js.** Node.js is not a supported runtime ([ADR 0001](docs/adr/0001-browser-target-and-esm-only.md)). No
  `node:*` imports, no `process` or `Buffer` in `src/`.
- **SSR frameworks:** the library runs on the client only; a module's top level touches no browser global.

## Verification

`bun run verify` from the repository root, before a change counts as done; CI runs the same gate. A step is green
when its exit code is 0, and only then. Details: [docs/conventions/code.md](docs/conventions/code.md#verification).

## Documentation map: where what goes

How we document is defined in [docs/conventions/documentation.md](docs/conventions/documentation.md); read it before
creating or changing a document. Every file under `docs/` carries `status:` frontmatter; `README.md`, `AGENTS.md` and
`CHANGELOG_DRAFT.md` carry none.

| What | Where |
|---|---|
| Install, a first example, links onward (for users) | [README.md](README.md) |
| The contract of one public member | TSDoc on it ([code.md](docs/conventions/code.md#tsdoc-on-the-public-api)) |
| Purpose, contract, invariants, architecture, environments, commands | [docs/overview.md](docs/overview.md) |
| A decision that is hard to reverse, with its why | [docs/adr/](docs/adr/) |
| What changes for consumers in the next release | [CHANGELOG_DRAFT.md](CHANGELOG_DRAFT.md) |
| Waiting on a dependency, with its check | [docs/upstream-watch.md](docs/upstream-watch.md) |
| How code is written, TSDoc, comments, the gate | [code.md](docs/conventions/code.md) |
| How a received code review is worked through | [code-review.md](docs/conventions/code-review.md) |
| The periodic documentation sweep | [documentation-review.md](docs/conventions/documentation-review.md) |
| How release notes are written | [changelog.md](docs/conventions/changelog.md) |
| Skeletons for every document | [templates/](docs/conventions/templates/) |

Rules in short: one fact, one home; a state document describes the present and never its own history; no person is
named; a decision taken over from another project is written as our own, with the constraint it rests on, and its
source is not named; a code path in a comment or a document is written from the repository root.

## Doc Delta, in the same commit as every substantive change

1. Public API changed → TSDoc on every touched member, README examples that use it, `docs/overview.md` if the contract
   or an invariant moved, an entry in `CHANGELOG_DRAFT.md`.
2. Observable behavior changed → the changelog entry (and a feature note under `docs/features/` once a behavior needs
   more than TSDoc).
3. A decision that is hard to reverse → an ADR in `docs/adr/`.
4. A supported environment, a command or the toolchain changed → `docs/overview.md` and this file.
5. A point opened or resolved, decided but not done, or for later → `docs/discussion-points.md`, `docs/todo.md` or
   `docs/backlog.md`, created from `docs/conventions/templates/` when first needed.
6. A workaround for a dependency's limit → `docs/upstream-watch.md`, with its check.
7. A borrowed decision → written into its ADR or state document as our own, with its constraint, without its source.
