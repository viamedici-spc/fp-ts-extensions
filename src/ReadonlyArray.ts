import {pipe} from "fp-ts/function";

export * from "fp-ts/ReadonlyArray";

import * as RA from "fp-ts/ReadonlyArray";
import * as O from "fp-ts/Option";
import {Eq, fromEquals} from "fp-ts/Eq";
import {some} from "fp-ts/Option";

export type SingleOrArray<T> = T | ReadonlyArray<T>;

const isArray = <T>(a: SingleOrArray<T>): a is ReadonlyArray<T> => Array.isArray(a);

export function fromSingleOrArray<T>(a: SingleOrArray<T>): ReadonlyArray<T> {
    if (isArray(a)) {
        return a;
    }
    return [a];
}

export function getUnsortedArrayEq<A>(eq: Eq<A>): Eq<ReadonlyArray<A>> {
    return fromEquals<ReadonlyArray<A>>((x, y) => {
        return x.length === y.length && pipe(
            x,
            RA.reduce(some(y), (b, a) => pipe(
                b,
                O.chain(b => pipe(
                    b,
                    RA.difference(eq)([a]),
                    // The size must have changed, otherwise the item was not found.
                    O.fromPredicate(n => n.length !== b.length)
                ))
            )),
            // The array must be empty, otherwise one array was larger than the other.
            O.filter(RA.isEmpty),
            O.isSome
        );
    });
}
