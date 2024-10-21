export * from "fp-ts/Option";

import {IO} from "fp-ts/IO";
import * as O from "fp-ts/Option";
import {Option} from "fp-ts/Option";
import {pipe} from "fp-ts/function";
import * as A from "fp-ts/Array";

export type ExtractOptionType<T extends Option<any>> = T extends Option<infer A> ? A : never;

export function chainFirstIOK<A, B>(f: (a: A) => IO<B>) {
    return (o: Option<A>) =>
        pipe(o,
            O.map(a => {
                f(a)();
                return a;
            })
        );
}

export const doIfSome = chainFirstIOK;

export function doIfNone<A, B>(f: () => IO<B>) {
    return (o: Option<A>) => {
        if (O.isNone(o)) {
            f()();
        }
        return o;
    };
}

export function getOrThrow<A, B extends Error>(f: () => B) {
    return (o: Option<A>) => pipe(
        o,
        O.getOrElse<A>(() => {
            throw f();
        })
    );
}

export function run<A extends unknown[], B>(o: Option<(...args: A) => B>) {
    return (...args: A) => pipe(
        o,
        doIfSome(fn => () => fn(...args))
    )
}

export const bindM = <D extends Record<string, Option<any>>>(dependencies: D): Option<{ readonly [K in keyof D]: D[K] extends Option<infer O> ? O : any }> =>
    (pipe(
        Object.entries(dependencies),
        A.reduce(O.Do, (b, [k, v]) =>
            pipe(
                b,
                O.bind(k, () => v)
            )
        )
    ) as any);