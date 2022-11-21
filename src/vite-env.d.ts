/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_GOOGLE_FONTS_API_KEY: string;
  readonly VITE_LOGROCKET_APP_ID: string;
  readonly VITE_MERCURE_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
