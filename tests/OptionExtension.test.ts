import {O, some} from "../src";

describe("Option extension tests", () => {
    it("run - without parameters", () => {
        let count = 0;
        const incOption = some(() => {
            count++;
        });

        O.run(incOption)();

        expect(count).toBe(1);
    });

    it("run - one parameter", () => {
        let count = 0;
        const incOption = some((incBy: number) => {
            count += incBy;
        });

        O.run(incOption)(1);

        expect(count).toBe(1);
    })

    it("run - multiple parameter", () => {
        let str = "";
        const concatOption = some((a: string, b: string) => {
            str += a + b;
        });

        O.run(concatOption)("a", "b");

        expect(str).toBe("ab");
    });
});