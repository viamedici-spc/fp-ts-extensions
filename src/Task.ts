export * from "fp-ts/Task";

import {Task} from "fp-ts/Task";

export type TaskType<T extends Task<any>> = T extends Task<infer R> ? R : never;