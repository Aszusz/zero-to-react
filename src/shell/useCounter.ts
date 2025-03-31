import { delay, random } from './effects';
import { decrement, increment, selectCount } from '@/core/counter';
import { storeContext, StoreContext } from '@/main';
import { useContext, useMemo } from 'react';
import { useStore } from 'zustand/react';

export const useCounter = (ctx: StoreContext = storeContext) => {
  const store = useContext(ctx);

  // Internal actions
  const onIncrementAsyncReady = async (by: number) => {
    console.log('onIncrementAsyncReady');
    store.setState(increment(by));
  };

  return useMemo(
    () => ({
      // State hooks
      useCount: () => useStore(store, selectCount),

      // External actions
      onIncrement: async () => {
        console.log('onIncrement');
        store.setState(increment(1));
      },

      onDecrement: async () => {
        console.log('onDecrement');
        store.setState(decrement(1));
      },

      onIncrementAsync: async function () {
        console.log('onIncrementAsync');
        const rnd = random(5, 10);
        await delay(rnd * 200);
        await onIncrementAsyncReady(rnd);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};
