export * from "fp-ts/Array";

import {pipe} from "fp-ts/function";
import * as O from "fp-ts/Option";
import {not} from "fp-ts/Predicate";
import * as A from "fp-ts/Array";
import {Eq} from "fp-ts/Eq";
import * as RM from "./ReadonlyMap";

export const defaultIfEmpty = <T>(a: T[], defaultValue: T) => pipe(
    a,
    O.fromPredicate(not(A.isEmpty)),
    O.getOrElse(() => A.of(defaultValue))
)

export const replace = <T>(eq: Eq<T>) => (oldValue: T, newValue: T) => (a: Array<T>) => pipe(
    a,
    A.findIndex(i => eq.equals(i, oldValue)),
    O.chain(index => pipe(
            a,
            A.modifyAt(index, _ => newValue)
        )
    )
)

export const notNull = <T>(t: T[]) => pipe(t, O.fromNullable, O.getOrElse(() => new Array<T>()), A.map(O.fromNullable), A.compact);

export function fullOuterJoin<A, B, K>(a: A[], aKey: (a: A) => K, b: B[], bKey: (b: B) => K, kEq: Eq<K>): { a: A | undefined, b: B | undefined }[] {
    type entry = { a: A[], b: B[] };
    const reduce = <A, B>(a: A[], f: (b: B, a: A) => B) => (b: B) => pipe(a, A.reduce(b, (b, a) => f(b, a)));
    const addElement = <I>(i: I[], iKey: (i: I) => K, update: (e: entry, i: I) => entry) => (map: ReadonlyMap<K, entry>) =>
        pipe(
            map,
            reduce(i, (acc, curr) =>
                pipe(
                    acc,
                    RM.addOrUpdate<K, { a: A[], b: B[] }>(kEq)(iKey(curr),
                        () => update({a: [], b: []}, curr),
                        e => update(e, curr)
                    )
                )
            )
        )

    return pipe(
        RM.fromMap(new Map<K, entry>()),
        addElement(a, aKey, (e, i) => ({...e, a: [...e.a, i]})),
        addElement(b, bKey, (e, i) => ({...e, b: [...e.b, i]})),
        e => [...e.values()],
        A.map(e => ({
            ...e,
            a: defaultIfEmpty<A | undefined>(e.a, undefined),
            b: defaultIfEmpty<B | undefined>(e.b, undefined),
        })),
        A.chain(e => pipe(e.a, A.chain(a => pipe(e.b, A.map(b => ({a: a, b: b}))))))
    )
}