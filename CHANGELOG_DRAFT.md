# Changes

## ESM only, for browsers

- **ES modules only:** the package ships ES modules with their type declarations and no CommonJS build anymore. Use it
  through a bundler (Vite, webpack 5, Rollup, esbuild) or inside a bundle; `require` is not supported.
- **Browsers as the target:** Node.js is not a supported runtime.
- **TypeScript resolution:** TypeScript finds the package with `moduleResolution` `bundler`, `node16` or `nodenext`;
  `node10` (`node`) no longer finds it, since the package has an `exports` map and no `main` or `types` field.
- **Tests in Node.js:** test runners that run in Node.js, such as Vitest, need
  `server.deps.inline: [/fp-ts/, /@viamedici-spc\//]` ([README](README.md#testing-with-vitest)).
- **Every module is a subpath:** `@viamedici-spc/fp-ts-extensions/Option`, `/ReadonlyArray`, … as before; the exports
  map is now generated from the modules.

# Fixes

- **Installing with npm works again:** the package no longer runs a `postinstall` script that failed for consumers.
- **The `./function` subpath resolves:** it pointed to files the build did not produce.
