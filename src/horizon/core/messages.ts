/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonValue } from './core';

export function msgDef<T extends JsonValue = null>() {
  return (type: string) => (payload: T) => {
    return { type: type, payload: payload } as const;
  };
}

export type MessageInfoMap = {
  [key: string]: (type: string) => any;
};

export function makeMessageTypes<Map extends MessageInfoMap>(map: Map) {
  return Object.fromEntries(Object.keys(map).map((key) => [key, key])) as {
    [Key in keyof Map]: Key;
  };
}

export function makeMessageCreators<Map extends MessageInfoMap>(map: Map) {
  return Object.fromEntries(
    Object.entries(map).map((entry) => [entry[0], entry[1](entry[0])]),
  ) as {
    [Key in keyof Map]: Map[Key] extends (
      type: string,
    ) => (payload: infer P) => { type: string; payload: any }
      ? (payload: P) => { type: Key; payload: P }
      : never;
  };
}

export type MakeMessageUnion<
  Creators extends { [key: string]: (arg: any) => any },
> = ReturnType<Creators[keyof Creators]>;
