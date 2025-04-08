import type { Store, Emit, JsonValue, UnknownEvent } from '../core/core';
import { StoreContext } from './context';
import { useContext, useState, useEffect, useRef } from 'react';

function useStore<S extends JsonValue, E extends UnknownEvent>(): Store<S, E> {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error(
      'useStore (or hooks using it like useEmit/useSelector) must be used within a <StoreProvider>.',
    );
  }
  return store as Store<S, E>;
}

export function useEmit<E extends UnknownEvent>(): Emit<E> {
  const store = useStore<JsonValue, E>();
  return store.emit;
}

export function useSelector<S extends JsonValue, TSelected>(
  selector: (state: S) => TSelected,
  equalityFn: (a: TSelected, b: TSelected) => boolean = (a, b) => a === b,
): TSelected {
  const store = useStore<S, UnknownEvent>();
  const latestSelector = useRef(selector);

  const initialStoreState = store.getState();
  const initialSelectedState = selector(initialStoreState);

  const latestSelectedState = useRef<TSelected>(initialSelectedState);
  const latestStoreState = useRef<S>(initialStoreState);

  useEffect(() => {
    latestSelector.current = selector;
  }, [selector]);

  const [selectedState, setSelectedState] =
    useState<TSelected>(initialSelectedState);

  useEffect(() => {
    function checkForUpdates() {
      const newStoreState = store.getState();
      try {
        const newSelectedState = latestSelector.current(newStoreState);

        if (!equalityFn(newSelectedState, latestSelectedState.current)) {
          setSelectedState(newSelectedState);
          latestSelectedState.current = newSelectedState;
          latestStoreState.current = newStoreState;
        } else {
          if (newStoreState !== latestStoreState.current) {
            latestStoreState.current = newStoreState;
          }
        }
      } catch (err) {
        const error = err as Error;
        console.error(
          "Error in useSelector's selector function:",
          error?.message || err,
        );
      }
    }

    const unsubscribe = store.subscribe(checkForUpdates);

    const currentStateBeforeEffectCheck = store.getState();
    if (currentStateBeforeEffectCheck !== latestStoreState.current) {
      checkForUpdates();
    }

    return () => unsubscribe();
  }, [store, equalityFn]);

  return selectedState;
}
