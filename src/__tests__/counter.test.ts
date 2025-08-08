import { Actions } from '@/core/actions';
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
    state = reducer(state, Actions.create['ui/increment'](null));
    const count = selectCount(state);
    expect(count).toBe(1);
  });

  it('should decrement the count by 1 when decrement action is dispatched', () => {
    let state = initialState;
    state = reducer(state, Actions.create['ui/decrement'](null));
    const count = selectCount(state);
    expect(count).toBe(-1);
  });

  it('should increment the count by the specified amount when async increment action completes', () => {
    let state = initialState;
    state = reducer(state, Actions.create['ui/increment-async'](null));
    state = reducer(state, Actions.create['eff/increment-async-ready'](7));
    const count = selectCount(state);
    expect(count).toBe(7);
  });
});
