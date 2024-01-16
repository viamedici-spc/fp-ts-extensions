import {Num} from "../src";
import {describe, it, expect} from "vitest";

describe("Numeric tests", () => {
    it("Determine decimal places", () => {
        expect(Num.determineDecimalPlaces()).toBe(0);
        expect(Num.determineDecimalPlaces(23.453453453)).toBe(9);
        expect(Num.determineDecimalPlaces(-23.453453453)).toBe(9);
        expect(Num.determineDecimalPlaces(0.0000000001)).toBe(10);
        expect(Num.determineDecimalPlaces(0.000000000000270)).toBe(13);
        expect(Num.determineDecimalPlaces(101)).toBe(0);
        expect(Num.determineDecimalPlaces(101, 1.05)).toBe(2);
        expect(Num.determineDecimalPlaces(1.05, 5)).toBe(2);
    });
});