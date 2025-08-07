/* eslint-disable @typescript-eslint/no-explicit-any */
export type PrettifyRecord<T> = {
  [K in keyof T]: T[K];
} & {};

export type PrettifyFunction<T extends (...args: any) => any> = T extends (
  ...args: infer A
) => infer R
  ? ((...args: A) => R) & {}
  : never;
