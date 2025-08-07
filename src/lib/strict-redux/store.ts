import type { StrictData } from '../strict-types';
import type {
  Dispatch,
  Listener,
  Reducer,
  Store,
  StoreAPI,
  StoreConfig,
  UnknownAction,
  Unsubscribe,
} from './types';

export const createStore = <
  TState extends StrictData,
  TAction extends UnknownAction,
>(
  config: StoreConfig<TState, TAction>,
): Store<TState, TAction> => {
  const listeners: Listener[] = [];
  const getState = () => state;

  let state = config.initialState;
  let isDispatching = false;

  const combinedReducers: Reducer<TState, TAction> = (prev, action) =>
    config.reducers.reduce((state, reducer) => reducer(state, action), prev);

  const baseDispatch: Dispatch<TAction> = async (action) => {
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }
    try {
      isDispatching = true;
      const newState = combinedReducers(state, action);
      if (newState !== state) {
        state = newState;
        const currentListeners = listeners.slice();
        for (const listener of currentListeners) {
          listener();
        }
      }
      return action;
    } finally {
      isDispatching = false;
    }
  };

  let dispatch: Dispatch<TAction> = baseDispatch;

  const storeAPI: StoreAPI<TState, TAction> = {
    getState,
    dispatch: (action) => dispatch(action),
  };

  dispatch = config.middleware
    .map((middleware) => middleware(storeAPI))
    .reduceRight((next, middleware) => middleware(next), baseDispatch);

  const subscribe = (listener: Listener): Unsubscribe => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index >= 0) listeners.splice(index, 1);
    };
  };

  return { getState, dispatch, subscribe };
};
