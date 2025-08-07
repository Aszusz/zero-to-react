import type { StrictData } from '../strict-types';

export type UnknownAction = { type: string; payload: StrictData };

export type Dispatch<TAction extends UnknownAction> = (
  action: TAction,
) => TAction | Promise<TAction>;

export type Reducer<
  TState extends StrictData,
  TAction extends UnknownAction,
> = (state: TState, action: TAction) => TState;

export type Listener = () => void;

export type Unsubscribe = () => void;

export type StoreAPI<
  TState extends StrictData,
  TAction extends UnknownAction,
> = {
  dispatch: Dispatch<TAction>;
  getState: () => TState;
};

export type Middleware<
  TState extends StrictData,
  TAction extends UnknownAction,
> = (
  store: StoreAPI<TState, TAction>,
) => (
  next: Dispatch<TAction>,
) => (action: TAction) => TAction | Promise<TAction>;

export type Store<TState extends StrictData, TAction extends UnknownAction> = {
  getState: () => TState;
  dispatch: Dispatch<TAction>;
  subscribe: (listener: Listener) => Unsubscribe;
};

export type StoreConfig<
  TState extends StrictData,
  TAction extends UnknownAction,
> = {
  initialState: TState;
  reducers: Reducer<TState, TAction>[];
  middleware: Middleware<TState, TAction>[];
};
