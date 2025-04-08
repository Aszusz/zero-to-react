/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from '../core/core';
import { createContext } from 'react';

export const StoreContext = createContext<Store<any, any> | null>(null);
