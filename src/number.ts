export * from "fp-ts/number";

import {none, Option, some} from "fp-ts/Option";
import * as A from "fp-ts/Array";
import {pipe} from "fp-ts/function";

export function parseIntO(value: string): Option<number> {
    const int = parseInt(value);
    return isNaN(int) ? none : some(int);
}

export function parseFloatO(value: string): Option<number> {
    const int = parseFloat(value);
    return isNaN(int) ? none : some(int);
}

export function determineDecimalPlaces(...n: number[]) {
    function countDecimalPLaces(n: number) {
        const str = Math.abs(n).toString(10);
        if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
            return +str.split("-")[1] || 0;
        } else if (str.indexOf(".") !== -1) {
            return str.split(".")[1].length || 0;
        }
        return +str.split("-")[1] || 0;
    }

    return pipe(
        n || [] as number[],
        A.reduce(0, (b, a: number) => {
            const decimalPlaces = countDecimalPLaces(a || 0);
            return Math.max(decimalPlaces, b);
        })
    );
}