import { Effects } from './effects';
import { decrement, increment, State } from '@/core/counter';
import { StoreApi } from 'zustand/vanilla';

export const counter = (store: StoreApi<State>, eff: Effects) => {
  // Internal thunks
  const onIncrementAsyncReady = async (by: number) => {
    eff.log('onIncrementAsyncReady', by);
    store.setState(increment(by));
  };

  return {
    // External thunks
    onIncrement: async () => {
      eff.log('onIncrement');
      store.setState(increment(1));
    },
    onDecrement: async () => {
      eff.log('onDecrement');
      store.setState(decrement(1));
    },
    onIncrementAsync: async function () {
      eff.log('onIncrementAsync');
      const rnd = eff.random(5, 10);
      await eff.delay(rnd * 200);
      await onIncrementAsyncReady(rnd);
    },
  };
};
