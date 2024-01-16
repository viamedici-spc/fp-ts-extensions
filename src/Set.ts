export * from "fp-ts/Set";

import {Predicate} from "fp-ts/Predicate";
import {Refinement} from "fp-ts/Refinement";
import {Option} from "fp-ts/Option";
import * as RS from "./ReadonlySet";

export function find<A, B extends A>(refinement: Refinement<A, B>): (as: Set<A>) => Option<B>
export function find<A>(predicate: Predicate<A>): <B extends A>(bs: Set<B>) => Option<B>
export function find<A>(predicate: Predicate<A>): (as: Set<A>) => Option<A>
export function find<A>(predicate: Predicate<A>): (as: Set<A>) => Option<A> {
    return RS.find(predicate);
}