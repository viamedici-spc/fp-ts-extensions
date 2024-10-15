export * from "fp-ts/Eq";

import * as Eq from "fp-ts/Eq";
import {Refinement} from "fp-ts/Refinement";

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

export type UnionEqBuilder<U, E extends U> = [U] extends [E]
    ? Eq.Eq<U>
    : {
        with: <T1 extends Exclude<U, E>>(ref: Refinement<Exclude<U, E>, T1>, eq: Eq.Eq<T1>) => UnionEqBuilder<U, E | T1>,
    };

export function union<U>(): UnionEqBuilder<U, never> {
    const getBuilder = (members: ReadonlyArray<[Refinement<unknown, unknown>, Eq.Eq<unknown>]>) => ({
        equals: (x: unknown, y: unknown) => {
            for (const [ref, eq] of members) {
                if (ref(x) && ref(y)) {
                    return eq.equals(x, y);
                }
            }
            return false;
        },
        with: (ref: Refinement<any, any>, eq: Eq.Eq<any>) => {
            return getBuilder([...members, [ref, eq]]);
        }
    });

    return getBuilder([]);
}