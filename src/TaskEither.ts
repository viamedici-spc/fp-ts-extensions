export * from "fp-ts/TaskEither";

import {IO} from "fp-ts/IO";
import {pipe} from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import {TaskEither} from "fp-ts/TaskEither";

export function chainFirstIOK<A, B>(f: (a: A) => IO<B>) {
    return <E>(e: TaskEither<E, A>) =>
        pipe(e,
            TE.map(a => {
                f(a)();
                return a;
            })
        );
}

export const doIfRight = chainFirstIOK;

export function doIfLeft<A, B>(f: (a: A) => IO<B>) {
    return <E>(e: TaskEither<A, E>) =>
        pipe(e,
            TE.swap,
            doIfRight(f),
            TE.swap
        );
}

export function doIfLeftOrRight<A, B, E>(f: (a: A | B) => IO<E>) {
    return (e: TaskEither<A, B>) =>
        pipe(e,
            doIfRight(a => () => f(a)()),
            doIfLeft(b => () => f(b)())
        );
}