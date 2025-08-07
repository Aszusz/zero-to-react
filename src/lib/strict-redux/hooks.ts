import type { StrictData } from '../strict-types';
import type { Dispatch, Store, UnknownAction } from './types';
import {
  useCallback,
  useDebugValue,
  useRef,
  useSyncExternalStore,
} from 'react';

export function useSelector<
  TState extends StrictData,
  TSelected extends StrictData,
  TAction extends UnknownAction,
>(
  store: Store<TState, TAction>,
  selector: (state: TState) => TSelected,
  equalityFn: (a: TSelected, b: TSelected) => boolean = (a, b) => a === b,
): TSelected {
  const latestRef = useRef<TSelected>(selector(store.getState()));

  const subscribe = useCallback(
    (cb: () => void) => store.subscribe(cb),
    [store],
  );

  const getSnapshot = useCallback(() => {
    const next = selector(store.getState());

    if (equalityFn(latestRef.current, next)) {
      return latestRef.current;
    }

    latestRef.current = next;
    return next;
  }, [store, selector, equalityFn]);
  const selected = useSyncExternalStore(subscribe, getSnapshot);

  useDebugValue(selected);

  return selected;
}

export function useDispatch<
  TState extends StrictData,
  TAction extends UnknownAction,
>(store: Store<TState, TAction>): Dispatch<TAction> {
  return useCallback<Dispatch<TAction>>(
    (action) => store.dispatch(action),
    [store],
  );
}
