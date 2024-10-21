export * from "fp-ts/Task";

import {Task} from "fp-ts/Task";

export type ExtractTaskType<T extends Task<any>> = T extends Task<infer A> ? A : never;