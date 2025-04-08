import type { Store, JsonValue, UnknownEvent } from '../core/core';
import { StoreContext } from './context';
import React, { JSX } from 'react';

interface StoreProviderProps<S extends JsonValue, E extends UnknownEvent> {
  store: Store<S, E>;
  children: React.ReactNode;
}

export function StoreProvider<S extends JsonValue, E extends UnknownEvent>({
  store,
  children,
}: StoreProviderProps<S, E>): JSX.Element {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
