---
status: accepted
---

# ADR 0001: The package targets browsers and ships ES modules only

Date: 2026-11-26

## Context

The package is consumed by the SPC client libraries, which run in browsers: through a bundler, or as a self-contained
bundle loaded from a CDN. Server-side integrations use the configuration engine's REST API directly and do not need
these libraries. The package used to ship ES modules and CommonJS side by side, without `"type": "module"`, to keep
webpack 4 and CommonJS consumers working; that made the ES build non-standard, and a consumer reported that it cannot be
imported in plain Node.js ([issue #2](https://github.com/viamedici-spc/fp-ts-extensions/issues/2)).

fp-ts 2.x has no `exports` map. Strict ESM resolution, as webpack 5 applies it to a `"type": "module"` package, rejects
an extensionless subpath such as `fp-ts/Option` and needs the full file path.

## Decision

The package is ESM only (`"type": "module"`, `exports` with ES modules and their declarations) and supports browsers
through a bundler or a CDN bundle. Node.js is not a supported runtime. The JavaScript output imports fp-ts's ES modules
by their full path (`fp-ts/es6/Option.js`); the declarations keep `fp-ts/Option`.

## Consequences

- No CommonJS build: `require` of the package is not supported, nor are bundlers without ES module support.
- Importing the package in plain Node.js fails: Node.js loads fp-ts's ES files, but cannot resolve their imports, which
  have no file extension. Tests run in Bun, whose resolver handles them.
- webpack 5, Vite, Rollup and esbuild resolve the output without configuration.
- A consumer's own `fp-ts/Option` and the package's `fp-ts/es6/Option.js` are the same file in a bundler, so there is
  one fp-ts instance.
- Test runners that run in Node.js (Vitest) must let their bundler transform fp-ts and the SPC packages
  (`server.deps.inline`, see the README); the alternative, inlining fp-ts into this package, was not chosen: it would
  duplicate fp-ts for every consumer that uses it directly.

## Alternatives considered

- **Keep CommonJS beside ESM:** the dual build is what made the package non-standard, and no supported environment needs
  CommonJS.
- **Bundle fp-ts into the package:** would duplicate fp-ts for every consumer that uses it directly, and fp-ts is a peer
  dependency for exactly that reason.
- **Support Node.js:** would need fp-ts resolved as CommonJS or bundled, for a runtime this package does not target: it
  serves libraries that target browsers.
