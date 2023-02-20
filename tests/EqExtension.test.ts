import {eqNullable} from "../src/Eq";
import * as Eq from "fp-ts/Eq";

describe("Eq extension tests", () => {
    it("eqNullable - both are null", () => {
        const eq: Eq.Eq<any> = Eq.fromEquals((x, y) => {
            throw  "Should not be called";
        });

        expect(eqNullable(eq).equals(null, null)).toBe(true);
    });

    it("eqNullable - one is null", () => {
        const eq: Eq.Eq<any> = Eq.fromEquals((x, y) => {
            throw  "Should not be called";
        });

        expect(eqNullable(eq).equals({}, null)).toBe(false);
        expect(eqNullable(eq).equals(null, {})).toBe(false);
    });

    it("eqNullable - both are not null", () => {
        const object1 = {};
        const object2 = {};

        const eq: Eq.Eq<any> = Eq.fromEquals((x, y) => {
            expect(x).toStrictEqual(object1);
            expect(y).toStrictEqual(object2);

            return true;
        });

        expect(eqNullable(eq).equals(object1, object2)).toBe(true);
    });
});