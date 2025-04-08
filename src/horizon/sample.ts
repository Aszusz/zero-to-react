import { createStore, Middleware, Reducer } from './core/core';
import {
  msgDef,
  makeMessageCreators,
  MakeMessageUnion,
  makeMessageTypes,
} from './core/messages';

export const events = {
  increment: msgDef(),
  decrement: msgDef(),
  incrementAsyncStart: msgDef(),
  incrementAsyncDone: msgDef<{ amount: number }>(),
};

export const et = makeMessageTypes(events);
export const ec = makeMessageCreators(events);

export type Event = MakeMessageUnion<typeof ec>;

export type State = Readonly<{
  count: number;
  incrementing: boolean;
}>;

export const initialState: State = {
  count: 0,
  incrementing: false,
};

export const selectCount = (state: State) => state.count;
export const selectIncrementing = (state: State) => state.incrementing;

export const reducer: Reducer<State, Event> = (state: State, event: Event) => {
  switch (event.type) {
    case et.increment:
      return { ...state, count: state.count + 1 };
    case et.decrement:
      return { ...state, count: state.count - 1 };
    case et.incrementAsyncStart:
      return { ...state, incrementing: true };
    case et.incrementAsyncDone:
      return {
        ...state,
        count: state.count + event.payload.amount,
        incrementing: false,
      };
    default:
      return state;
  }
};

export const asyncIncrementMiddleware: Middleware<State, Event> =
  (api) => (next) => async (event) => {
    const result = next(event);

    if (event.type === et.incrementAsyncStart) {
      const amount = Math.floor(Math.random() * 5) + 5;
      const delayMs = amount * 200;

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, delayMs);
      });

      api.emit(ec.incrementAsyncDone({ amount }));
      return;
    }

    return result;
  };

export const store = createStore<State, Event>(reducer, initialState, [
  asyncIncrementMiddleware,
]);
