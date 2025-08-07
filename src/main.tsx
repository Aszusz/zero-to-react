import './index.css';
import { store } from '@/shell/store';
import { StoreContext } from '@/shell/store';
import App from '@/view/App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </StrictMode>,
);
