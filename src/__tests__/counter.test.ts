import { testEffects } from './testEffects';
import { initialState, selectCount, State } from '@/core/counter';
import { counter } from '@/shell/counter';
import { describe, it, expect } from 'vitest';
import { createStore } from 'zustand/vanilla';

describe('Counter Functionality', () => {
  it('should initialize the count to 0', () => {
    const store = createStore<State>(() => initialState());
    const count = selectCount(store.getState());
    expect(count).toBe(0);
  });

  it('should increment the count by 1 when increment action is dispatched', () => {
    const store = createStore<State>(() => initialState());
    const thunks = counter(store, testEffects);
    thunks.onIncrement();
    const count = selectCount(store.getState());
    expect(count).toBe(1);
  });

  it('should decrement the count by 1 when decrement action is dispatched', () => {
    const store = createStore<State>(() => initialState());
    const thunks = counter(store, testEffects);
    thunks.onDecrement();
    const count = selectCount(store.getState());
    expect(count).toBe(-1);
  });

  it('should increment the count by a fixed random amount when async increment action completes', async () => {
    const store = createStore<State>(() => initialState());
    const thunks = counter(store, testEffects);
    let count = selectCount(store.getState());
    expect(count).toBe(0);
    await thunks.onIncrementAsync();
    count = selectCount(store.getState());
    expect(count).toBe(5);
  });
});
