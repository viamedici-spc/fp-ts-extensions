export * from "fp-ts/ReadonlySet";

import {Predicate} from "fp-ts/Predicate";
import {Refinement} from "fp-ts/Refinement";
import {none, Option, some} from "fp-ts/Option";

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