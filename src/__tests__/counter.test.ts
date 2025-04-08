import { ec } from '@/core/events';
import { reducer } from '@/core/reducer';
import { selectCount } from '@/core/selectors';
import { initialState } from '@/core/state';
import { describe, it, expect } from 'vitest';

describe('Counter Functionality', () => {
  it('should initialize the count to 0', () => {
    const state = initialState;
    const count = selectCount(state);
    expect(count).toBe(0);
  });

  it('should increment the count by 1 when increment action is dispatched', () => {
    let state = initialState;
    state = reducer(state, ec.incrementClicked(null));
    const count = selectCount(state);
    expect(count).toBe(1);
  });

  it('should decrement the count by 1 when decrement action is dispatched', () => {
    let state = initialState;
    state = reducer(state, ec.decrementClicked(null));
    const count = selectCount(state);
    expect(count).toBe(-1);
  });

  it('should increment the count by the specified amount when async increment action completes', () => {
    let state = initialState;
    state = reducer(state, ec.incrementAsyncClicked(null));
    state = reducer(state, ec.incrementAsyncDone({ amount: 7 }));
    const count = selectCount(state);
    expect(count).toBe(7);
  });
});
