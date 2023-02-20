export * from "fp-ts/Eq";

import * as Eq from "fp-ts/Eq";

export function combine<A, B>(a: Eq.Eq<A>, b: Eq.Eq<B>): Eq.Eq<A & B> {
    return Eq.fromEquals<A & B>((x, y) => a.equals(x, y) && b.equals(x, y));
}

export function eqNullable<T>(eq: Eq.Eq<T>): Eq.Eq<T | null | undefined> {
    return Eq.fromEquals<T | null | undefined>((x, y) => {
            const xIsNull = (x === null || x === undefined);
            const yIsNull = (y === null || y === undefined);

            return (xIsNull && yIsNull)
                || (!xIsNull && !yIsNull && eq.equals(x, y));
        }
    )
}