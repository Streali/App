/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_GOOGLE_FONTS_API_KEY: string;
  readonly VITE_MERCURE_ENDPOINT: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_EMBED_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
