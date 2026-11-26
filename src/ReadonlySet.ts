export * from "fp-ts/ReadonlySet";

import type {Predicate} from "fp-ts/Predicate";
import type {Refinement} from "fp-ts/Refinement";
import type { Option} from "fp-ts/Option";
import {none, some} from "fp-ts/Option";

export function find<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlySet<A>) => Option<B>
export function find<A>(predicate: Predicate<A>): <B extends A>(bs: ReadonlySet<B>) => Option<B>
export function find<A>(predicate: Predicate<A>): (as: ReadonlySet<A>) => Option<A>
export function find<A>(predicate: Predicate<A>): (as: ReadonlySet<A>) => Option<A> {
    return (as: { values(): IterableIterator<A> }) => {
        for (const a of as.values()) {
            if (predicate(a)) {
                return some(a);
            }
        }

        return none;
    }
}