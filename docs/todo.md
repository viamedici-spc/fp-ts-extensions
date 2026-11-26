---
status: living
---

# To-do

**Work that is decided and not yet done**, defects included. What is undecided goes to `discussion-points.md`, an idea
for later to `backlog.md`, each created from `conventions/templates/` when first needed.

An entry says what to do, what it **waits on**, and how you know it is **done**; the third keeps this from becoming a
wish list. **A finished entry is deleted, not ticked**: the change is the record, and git carries the history.

> Format: `- [ ] **<Title>** (YYYY-MM-DD) — what and why. **Waits on** <nothing | what>. **Done when** <check>.`

## Release

- [ ] **Call the shared workflow at `@v4`** (2026-11-26) — `.github/workflows/main.yml` calls
  `build-bun.yml@feature/v4`, a branch; before merging into `main`, it calls the released `@v4`. **Waits on** the v4
  release of github-ci. **Done when** the workflow names `@v4` and its run on `main` is green.
- [ ] **Retire the npm token** (2026-11-26) — once `main` publishes through trusted publishing: delete the
  repository secret `NPM_TOKEN`, revoke the token on npm and set the package to disallow publishing with tokens, so only
  trusted publishing can publish. **Waits on** the merge into `main` and its first publish. **Done when** the secret is
  gone, the token is revoked and npm shows the package as disallowing tokens.
