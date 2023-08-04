import {A, Str} from "../src"
import {describe, it, expect} from "vitest";

describe("FullOuterJoin tests", () => {
    it("Single element in A", () => {
        const a = ["a"];
        const b = new Array<string>();

        const result = A.fullOuterJoin(a, a => a, b, b => b, Str.Eq);

        expect(result.length).toBe(1);
        expect(result).toStrictEqual([{a: "a", b: undefined}])
    });
    it("Single element in B", () => {
        const a = new Array<string>();
        const b = ["b"];

        const result = A.fullOuterJoin(a, a => a, b, b => b, Str.Eq);

        expect(result.length).toBe(1);
        expect(result).toStrictEqual([{a: undefined, b: "b"}])
    });
    it("Single elements with equal key", () => {
        const a = ["a"];
        const b = ["a"];

        const result = A.fullOuterJoin(a, a => a, b, b => b, Str.Eq);

        expect(result.length).toBe(1);
        expect(result).toStrictEqual([{a: "a", b: "a"}])
    });

    it("Multiple elements", () => {
        const a = ["a", "b", "c"];
        const b = ["a", "c", "d"];

        const result = A.fullOuterJoin(a, a => a, b, b => b, Str.Eq);

        expect(result.length).toBe(4);
        expect(result.sort()).toEqual(expect.arrayContaining(
            [
                {a: "a", b: "a"},
                {a: "b", b: undefined},
                {a: "c", b: "c"},
                {a: undefined, b: "d"}
            ]
        ))
    });

    it("Multiple elements with same key on the right", () => {
        const a = [
            {
                id: "a",
                value: "a"
            },
            {
                id: "b",
                value: "b"
            }
        ];

        const b = [
            {
                id: "c",
                value: "c"
            },
            {
                id: "c",
                value: "d"
            }
        ];

        const result = A.fullOuterJoin(a, a => a.id, b, b => b.id, Str.Eq);

        expect(result.length).toBe(4);
        expect(result.sort()).toEqual(expect.arrayContaining(
            [
                {
                    a: {
                        id: "a",
                        value: "a"
                    }, b: undefined
                },
                {
                    a: {
                        id: "b",
                        value: "b"
                    }, b: undefined
                },
                {
                    a: undefined, b: {
                        id: "c",
                        value: "c"
                    }
                },
                {
                    a: undefined, b: {
                        id: "c",
                        value: "d"
                    }
                }
            ]
        ))
    });
});