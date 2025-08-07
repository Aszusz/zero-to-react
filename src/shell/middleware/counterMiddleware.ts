import { Action, Actions } from '@/core/actions';
import { State } from '@/core/state';
import { Middleware } from '@/lib/strict-redux/types';
import { delay, random } from '@/shell/effects';

export const counterMiddleware: Middleware<State, Action> =
  (store) => (next) => async (action) => {
    const result = next(action);

    if (Actions.is['ui/increment-async'](action)) {
      const rnd = random(5, 10);
      await delay(rnd * 200);
      store.dispatch(Actions.create['eff/increment-async-ready'](rnd));
    }

    return result;
  };
