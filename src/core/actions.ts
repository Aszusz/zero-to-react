import { ofType, union } from '@/lib/strict-union';

export const Actions = union('type', 'payload', {
  ['ui/increment']: ofType<null>(),
  ['ui/decrement']: ofType<null>(),
  ['ui/increment-async']: ofType<null>(),
  ['eff/increment-async-ready']: ofType<number>(),
} as const);

export type Action = typeof Actions.Union;
