import {describe, expect, it} from "bun:test";

// A module is a file in src/ and a line in src/index.ts; the build picks up the file but not the line.
const sourceDirectory = new URL("../src/", import.meta.url).pathname;
const modules = Array.from(new Bun.Glob("*.ts").scanSync(sourceDirectory))
    .map(file => file.replace(/\.ts$/, ""))
    .filter(module => module !== "index")
    .sort();
const entryPoint = await Bun.file(`${sourceDirectory}index.ts`).text();

describe("Entry point", () => {
    it.each(modules)("re-exports %s", module => {
        // As a namespace (`export * as O from "./Option"`), or flat for `function`.
        expect(entryPoint).toMatch(new RegExp(`^export \\* (as \\w+ )?from "\\./${module}";$`, "m"));
    });
});
