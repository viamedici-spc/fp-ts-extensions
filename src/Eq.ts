export * from "fp-ts/Eq";

import * as Eq from "fp-ts/Eq";

export function combine<A, B>(a: Eq.Eq<A>, b: Eq.Eq<B>): Eq.Eq<A & B> {
    return Eq.fromEquals<A & B>((x, y) => a.equals(x, y) && b.equals(x, y));
}