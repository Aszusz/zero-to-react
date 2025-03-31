// Types

export type State = {
  readonly count: number;
};

// Factories

export const initialState = () => ({
  count: 0,
});

// Selectors

export const selectCount = (state: State): number => state.count;

// Actions

export const increment =
  (by: number) =>
  (state: State): State => ({
    ...state,
    count: state.count + by,
  });

export const decrement =
  (by: number) =>
  (state: State): State => ({
    ...state,
    count: state.count - by,
  });
