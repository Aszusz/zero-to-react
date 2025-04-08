import { delay, random } from '../effects';
import { Event, ec, et } from '@/core/events';
import { State } from '@/core/state';
import { Middleware } from '@/horizon';

export const asyncIncrementMiddleware: Middleware<State, Event> =
  (api) => (next) => async (event) => {
    const result = next(event);

    if (event.type === et.incrementAsyncClicked) {
      const amount = random(5, 10);
      await delay(amount * 200);
      api.emit(ec.incrementAsyncDone({ amount }));
      return;
    }

    return result;
  };
