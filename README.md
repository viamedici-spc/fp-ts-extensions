# fp-ts-extensions

Extensions for [fp-ts](https://gcanti.github.io/fp-ts/): every module re-exports the fp-ts module of the same name and
adds helpers on top, so `import {O, pipe} from "@viamedici-spc/fp-ts-extensions"` gives you fp-ts's `Option` plus more.

## Installation

```bash
npm install @viamedici-spc/fp-ts-extensions fp-ts
```

fp-ts 2.x is a peer dependency.

## Usage

```ts
import {O, pipe} from "@viamedici-spc/fp-ts-extensions";
// or one module at a time:
import * as RA from "@viamedici-spc/fp-ts-extensions/ReadonlyArray";

const firstEven = pipe(
    [1, 3, 4],
    RA.findFirst(n => n % 2 === 0),
    O.doIfSome(n => () => console.log(n)),
);
```

## Supported environments

The package is **ESM only** and made for **browsers**, through a bundler (Vite, webpack 5, Rollup, esbuild, …) or as
part of a bundle loaded from a CDN. Node.js is not a supported runtime. TypeScript resolves it with `moduleResolution`
`bundler`, `node16` or `nodenext`.

## Testing with Vitest

fp-ts 2.x ships ES modules whose imports have no file extensions, which Node.js cannot load. Test runners that run in
Node.js, such as Vitest, therefore have to let their bundler transform fp-ts and the SPC packages:

```ts
// vitest.config.ts
import {defineConfig} from "vitest/config";

export default defineConfig({
    test: {
        server: {deps: {inline: [/fp-ts/, /@viamedici-spc\//]}},
    },
});
```

`bun test` and the bundlers (Vite, webpack 5, Rollup, esbuild) need no such setting. Outside a bundler, e.g. under
`bun test`, an application's own `fp-ts/…` imports and this package's can load two copies of fp-ts; compare `Option`
and `Either` values by their `_tag`, not by identity with `O.none`.

## Documentation

- [Overview](docs/overview.md): modules, invariants, architecture and commands.
- [Decisions](docs/adr/): why the package is built the way it is.

## License

MIT
