export type State = Readonly<{
  count: number;
  incrementing: boolean;
}>;

export const initialState: State = {
  count: 0,
  incrementing: false,
};
