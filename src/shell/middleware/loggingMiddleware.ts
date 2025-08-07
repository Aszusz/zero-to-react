import { Action } from '@/core/actions';
import { State } from '@/core/state';
import { Middleware } from '@/lib/strict-redux/types';

export const loggerMiddleware: Middleware<State, Action> =
  () => (next) => (action) => {
    const result = next(action);
    console.log('dispatching', action);
    return result;
  };
