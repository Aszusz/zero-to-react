import { counter } from './counter';
import { appEffects } from './effects';
import { selectCount, State } from '@/core/counter';
import { storeContext, StoreContext } from '@/main';
import { useContext, useMemo } from 'react';
import { StoreApi } from 'zustand';
import { useStore } from 'zustand/react';

export const useCounter = (
  ctx: StoreContext = storeContext,
  eff = appEffects,
) => {
  const store = useContext<StoreApi<State>>(ctx);

  return useMemo(() => {
    return {
      // State hooks
      useCount: () => useStore(store, selectCount),

      // Thunks
      ...counter(store, eff),
    };
  }, [store, eff]);
};
