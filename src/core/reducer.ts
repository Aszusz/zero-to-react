import { et, type Event } from './events';
import { State } from './state';
import { Reducer } from '@/horizon';

export const reducer: Reducer<State, Event> = (state: State, event: Event) => {
  switch (event.type) {
    case et.incrementClicked:
      return { ...state, count: state.count + 1 };
    case et.decrementClicked:
      return { ...state, count: state.count - 1 };
    case et.incrementAsyncClicked:
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
