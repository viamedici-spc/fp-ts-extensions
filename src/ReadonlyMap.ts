export * from "fp-ts/ReadonlyMap";

import {Eq} from "fp-ts/Eq";
import {pipe} from "fp-ts/function";
import * as RA from "fp-ts/ReadonlyMap";
import * as O from "fp-ts/Option";

export const addOrUpdate = <K, V>(kEq: Eq<K>) => (k: K, add: () => V, update: (v: V) => V) => (map: ReadonlyMap<K, V>) => pipe(
    map,
    RA.modifyAt(kEq)(k, update),
    O.getOrElse(() =>
        pipe(
            map,
            RA.upsertAt(kEq)(k, add())
        )
    )
)
