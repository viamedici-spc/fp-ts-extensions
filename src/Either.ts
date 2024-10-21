export * from "fp-ts/Either";

import {IO} from "fp-ts/IO";
import {bind, Do, Either, map, swap} from "fp-ts/Either";
import {pipe} from "fp-ts/function";
import * as A from "fp-ts/Array";

export type ExtractEitherLeftType<T extends Either<any, any>> = T extends Either<infer E, any> ? E : never;
export type ExtractEitherRightType<T extends Either<any, any>> = T extends Either<any, infer A> ? A : never;

export function chainFirstIOK<A, B>(f: (a: A) => IO<B>) {
    return <E>(e: Either<E, A>) => pipe(
        e,
        map(a => {
            f(a)();
            return a;
        })
    );
}

export const doIfRight = chainFirstIOK;

export function doIfLeft<A, B>(f: (a: A) => IO<B>) {
    return <E>(e: Either<A, E>) => pipe(
        e,
        swap,
        doIfRight(f),
        swap
    );
}

export function doIfLeftOrRight<A, B, E>(f: (a: A | B) => IO<E>) {
    return (e: Either<A, B>) => pipe(
        e,
        doIfRight(a => () => f(a)()),
        doIfLeft(b => () => f(b)())
    );
}

export const bindM = <E>() =>
    <D extends Record<string, Either<E, any>>>(dependencies: D): Either<E, { readonly [K in keyof D]: D[K] extends Either<E, infer R> ? R : any }> =>
        (pipe(
            Object.entries(dependencies),
            A.reduce(Do as Either<E, {}>, (b, [k, v]) => pipe(
                    b,
                    bind(k, () => v)
                )
            )
        ) as any);