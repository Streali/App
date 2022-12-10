import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';

export function setupSentry(): void {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      environment: import.meta.env.MODE,
      tracesSampleRate: 1.0,
    });
  }
}
