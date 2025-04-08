import { StoreProvider } from './horizon';
import './index.css';
import { store } from '@/shell/store';
import App from '@/view/App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </StrictMode>,
);
