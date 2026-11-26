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

const config: UserConfig = defineConfig({
    entry: ["src/*.ts"],
    format: "esm",
    platform: "browser",
    target: "es2022",
    unbundle: true,
    dts: {generator: "oxc"},
    exports: true,
    plugins: [fullySpecifiedFpTs],
});

export default config;
