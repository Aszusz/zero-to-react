import type { Event } from '@/core/events';
import type { State } from '@/core/state';
import { useEmit, useSelector } from '@/horizon';

export const useAppEmit = () => useEmit<Event>();

type EqualityFn<T> = (a: T, b: T) => boolean;

export const useAppSelector = <TSelected>(
  selector: (state: State) => TSelected,
  equalityFn?: EqualityFn<TSelected> | undefined,
) => useSelector<State, TSelected>(selector, equalityFn);
