import { counterMiddleware } from './middleware/counterMiddleware';
import { loggerMiddleware } from './middleware/loggingMiddleware';
import { reducer } from '@/core/reducer';
import { initialState } from '@/core/state';
import { createStore } from '@/lib/strict-redux/store';
import { createContext } from 'react';

export const store = createStore({
  initialState,
  reducers: [reducer],
  middleware: [counterMiddleware, loggerMiddleware],
});

export const StoreContext = createContext(store);
