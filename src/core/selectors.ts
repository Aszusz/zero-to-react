import { State } from './state';

export const selectCount = (state: State) => state.count;
export const selectIncrementing = (state: State) => state.incrementing;
