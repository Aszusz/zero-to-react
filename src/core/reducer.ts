import { Actions, Action } from './actions';
import { initialState, State } from './state';

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case Actions.type['ui/increment']: {
      return {
        ...state,
        count: state.count + 1,
      };
    }

    case Actions.type['ui/decrement']: {
      return {
        ...state,
        count: state.count - 1,
      };
    }

    case Actions.type['eff/increment-async-ready']: {
      return {
        ...state,
        count: state.count + action.payload,
      };
    }

    default:
      return state;
  }
};
