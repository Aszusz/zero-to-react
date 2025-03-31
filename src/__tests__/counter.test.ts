import {
  initialState,
  selectCount,
  increment,
  decrement,
} from '@/core/counter';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the effects module
vi.mock('./effects', () => ({
  delay: vi.fn(() => Promise.resolve()),
  random: vi.fn(() => 5), // Fixed return for predictable tests
}));

describe('Counter Functionality', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should initialize the count to 0', () => {
    const state = initialState();
    const count = selectCount(state);
    expect(count).toBe(0);
  });

  it('should increment the count by 1 when increment action is dispatched', () => {
    let state = initialState();
    state = increment(1)(state);
    const count = selectCount(state);
    expect(count).toBe(1);
  });

  it('should decrement the count by 1 when decrement action is dispatched', () => {
    let state = initialState();
    state = decrement(1)(state);
    const count = selectCount(state);
    expect(count).toBe(-1);
  });
});
