export * as T from "./Task";
export * as E from "./Either";
export * as TE from "./TaskEither";
export * as O from "./Option";
export * as TO from "./TaskOption";
export * as I from "./Identity";
export * as S from "./Set";
export * as RS from "./ReadonlySet";
export * as TH from "./These";
export * as TTH from "./TaskThese";
export * as TP from "./Tuple";
export * as RTP from "./ReadonlyTuple";
export * as M from "./Map";
export * as RM from "./ReadonlyMap";
export * as MM from "./Magma";
export * as MO from "./Monoid";
export * as P from "./Predicate";
export * as A from "./Array";
export * as RA from "./ReadonlyArray";
export * as NEA from "./NonEmptyArray";
export * as RNEA from "./ReadonlyNonEmptyArray";
export * as R from "./Record";
export * as RR from "./ReadonlyRecord";

export * as Eq from "./Eq";
export * as Ord from "./Ord";

export * as Bool from "./boolean";
export * as Str from "./string";
export * as Num from "./number";

export * from "./function";
export {Option, none, some, isNone, isSome} from "./Option"
export {Either, left, right, isLeft, isRight} from "./Either"
export {Predicate, not, and, or} from "./Predicate"
export {TaskEither} from "./TaskEither"
export {Task} from "./Task"
export {TaskOption} from "./TaskOption"
export {Magma} from "./Magma"
export {Ord as OrdT} from "./Ord"
export {Eq as EqT} from "./Eq"
export {ReadonlyNonEmptyArray} from "./ReadonlyNonEmptyArray"
export {NonEmptyArray} from "./NonEmptyArray"
export {Monoid} from "./Monoid"