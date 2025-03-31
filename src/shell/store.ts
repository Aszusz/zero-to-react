import { delay, random } from './effects';
import {
  decrement,
  increment,
  initialState,
  selectCount,
  State,
} from '@/core/counter';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

const store = createStore<State>(() => initialState());

// Hooks

export const useCount = () => useStore(store, selectCount);

// Thunks

export const onIncrement = async () => {
  console.log('onIncrement');
  store.setState(increment(1));
};

export const onDecrement = async () => {
  console.log('onDecrement');
  store.setState(decrement(1));
};

export const onIncrementAsync = async () => {
  console.log('onIncrementAsync');
  const rnd = random(5, 10);
  await delay(rnd * 200);
  store.setState(increment(rnd));
};

export const onIncrementAsyncReady = async (by: number) => {
  console.log('onIncrementAsyncReady');
  store.setState(increment(by));
};
