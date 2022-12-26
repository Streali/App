import './main.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '~/app';
import { setupSentry } from '~/boot/sentry';
import AppProviders from '~/contexts/app-providers';

setupSentry();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
