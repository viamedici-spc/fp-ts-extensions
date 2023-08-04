import {defineConfig} from "vite";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts"

export default defineConfig(() => ({
    build: {
        outDir: "dist",
        minify: true,
        lib: {
            entry: "src/index.ts",
            formats:["es", "cjs"],
            name: "fp-ts-extensions",
            // We don't have ESM spec conform package because of fp-ts dependency.
            // So we can't let Vite name the ESM package .mjs because it would break compatibility with webpack.
            // Webpacks expects a fully spec conform package for a .mjs package. Node.js would be happy with this.
            // That's the reason why we don't specify type = "module". This would also break Node.js than because of directory imports.
            fileName: (format, entry) => entry + "." + (format === "es" ? "js" : format === "cjs" ? "cjs" : "XXX")
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled into your library
            external: [/^fp-ts.*/],
            output: {
                // Don't bundle everthing into one module
                preserveModules: true
            }
        },
    },
    plugins: [
        checker({typescript: true}),
        dts()
    ],
    test: {
        exclude: [
            "node_modules/**",
            "**/dist/**",
            "compatibilityTests/**"
        ],
        reporters: ["junit"],
        outputFile: './report/tests-results.xml',
        coverage: {
            provider: "istanbul",
            reporter: "cobertura",
            reportsDirectory: "report",
            enabled: true
        }
    },
}));