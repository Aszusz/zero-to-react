/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

/// Types

type JsonPrimitive = string | number | boolean | null;

export type JsonValue =
  | JsonPrimitive
  | Readonly<{ [key: string]: JsonValue }>
  | ReadonlyArray<JsonValue>;

export type UnknownEvent = { type: string; payload: JsonValue };

export type Reducer<S extends JsonValue, E extends UnknownEvent> = (
  state: S,
  event: E,
) => S;

export type Store<S extends JsonValue, E extends UnknownEvent> = {
  getState: () => S;
  emit: Emit<E>;
  subscribe: (listener: Listener) => Unsubscribe;
};

export type Emit<E extends UnknownEvent> = (event: E) => E;

export type Listener = () => void;

export type Unsubscribe = () => void;

export interface MiddlewareAPI<S extends JsonValue, E extends UnknownEvent> {
  getState: () => S;
  emit: Emit<E>;
}

export type Middleware<S extends JsonValue, E extends UnknownEvent> = (
  api: MiddlewareAPI<S, E>,
) => (next: Emit<E>) => (event: E) => unknown;

export type StoreCreator = <S extends JsonValue, E extends UnknownEvent>(
  reducer: Reducer<S, E>,
  initialState: S,
  middlewares?: Middleware<S, E>[],
) => Store<S, E>;

/// Implementation

function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return <T>(arg: T) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args)),
  );
}

export const createStore: StoreCreator = <
  S extends JsonValue,
  E extends UnknownEvent,
>(
  reducer: Reducer<S, E>,
  initialState: S,
  middlewares: Middleware<S, E>[] = [],
): Store<S, E> => {
  let currentState: S = initialState;
  let listeners: Listener[] = [];
  let isEmitting: boolean = false;

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  if (initialState === undefined) {
    throw new Error(
      'Initial state cannot be undefined. Please provide a valid initial state conforming to your state type.',
    );
  }

  if (middlewares !== undefined && !Array.isArray(middlewares)) {
    throw new Error('Expected middlewares to be an array or undefined.');
  }

  function getState(): S {
    if (isEmitting) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing.',
      );
    }

    return currentState;
  }

  function subscribe(listener: Listener): Unsubscribe {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }
    if (isEmitting) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing.',
      );
    }

    let isSubscribed = true;
    listeners.push(listener);

    return function unsubscribe(): void {
      if (!isSubscribed) {
        return;
      }
      if (isEmitting) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing.',
        );
      }
      isSubscribed = false;

      listeners = listeners.filter((l) => l !== listener);
    };
  }

  const baseEmit: Emit<E> = (event: E): E => {
    if (typeof event === 'undefined' || event === null) {
      throw new Error('Events must be plain objects.');
    }
    if (typeof event.type !== 'string' || event.type === '') {
      throw new Error('Event "type" property must be a non-empty string.');
    }

    if (isEmitting) {
      throw new Error('Reducers may not emit events.');
    }

    try {
      isEmitting = true;

      currentState = reducer(currentState, event);
    } finally {
      isEmitting = false;
    }

    const currentListeners = [...listeners];
    currentListeners.forEach((listener) => listener());

    return event;
  };

  let finalEmit: Emit<E> = baseEmit;

  if (middlewares.length > 0) {
    const middlewareAPI: MiddlewareAPI<S, E> = {
      getState: getState,
      emit: (event: E) => finalEmit(event),
    };

    const chain = middlewares.map((middleware) => middleware(middlewareAPI));

    finalEmit = compose(...chain)(baseEmit) as Emit<E>;
  }

  const store: Store<S, E> = {
    getState: getState,
    emit: finalEmit,
    subscribe: subscribe,
  };

  return store;
};
