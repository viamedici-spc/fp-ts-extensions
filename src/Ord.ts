export * from "fp-ts/Ord";

import * as Ord from "fp-ts/Ord";

export const ordNotImplemented: Ord.Ord<never> = Ord.fromCompare(() => {
    throw new Error("No implemented");
});

export const ordNeutral: Ord.Ord<never> = Ord.fromCompare(() => 0);