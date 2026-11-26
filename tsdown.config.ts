import {isolatedDeclarationSync} from "rolldown/experimental";
import {defineConfig, type Rolldown, type UserConfig} from "tsdown";

/**
 * fp-ts 2.x has no `exports` map, so strict ESM resolution (webpack 5 for a `"type": "module"` package) rejects
 * `fp-ts/Option`. The JavaScript output therefore imports fp-ts' ES modules by their full file path; the declarations
 * keep `fp-ts/Option`, so consumers see the same fp-ts types as in their own code.
 */
const fullySpecifiedFpTs: Rolldown.Plugin = {
    name: "fully-specified-fp-ts",
    resolveId: {
        order: "pre",
        handler(source, importer) {
            if (importer?.endsWith(".d.ts")) {
                return null;
            }
            const match = /^fp-ts(?:\/(?:lib|es6))?(?:\/([^/]+?))?(?:\.js)?$/.exec(source);
            return match ? {id: `fp-ts/es6/${match[1] ?? "index"}.js`, external: true} : null;
        },
    },
};

/**
 * One declaration file per module, straight from Oxc's isolated declarations. tsdown's declaration bundling drops the
 * fp-ts exports that a module passes on with `export * from "fp-ts/…"` once the module is re-exported as a namespace
 * (`export * as O from "./Option"`), so it is not used. Relative imports get the `.js` the emitted files carry.
 */
const isolatedDeclarations: Rolldown.Plugin = {
    name: "isolated-declarations",
    transform(code, id) {
        if (!id.endsWith(".ts") || !id.includes("/src/")) {
            return null;
        }
        const result = isolatedDeclarationSync(id, code);
        if (result.errors.length > 0) {
            this.error(result.errors.map(error => error.message).join("\n"));
        }
        this.emitFile({
            type: "asset",
            fileName: id.slice(id.lastIndexOf("/src/") + "/src/".length).replace(/\.ts$/, ".d.ts"),
            source: result.code.replace(/(from\s+|import\()"(\.{1,2}\/[^"]+?)(?:\.js)?"/g, '$1"$2.js"'),
        });
        return null;
    },
};

const config: UserConfig = defineConfig({
    entry: ["src/*.ts"],
    format: "esm",
    platform: "browser",
    target: "es2022",
    unbundle: true,
    dts: false,
    exports: true,
    // Every dependency stays external: a package bundled by accident fails the build.
    deps: {onlyBundle: []},
    plugins: [fullySpecifiedFpTs, isolatedDeclarations],
});

export default config;
