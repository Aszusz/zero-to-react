import { asyncIncrementMiddleware } from './middleware/counterMiddleware';
import { type Event } from '@/core/events';
import { reducer } from '@/core/reducer';
import { initialState, State } from '@/core/state';
import { createStore } from '@/horizon';

export const store = createStore<State, Event>(reducer, initialState, [
  asyncIncrementMiddleware,
]);
