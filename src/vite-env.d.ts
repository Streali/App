/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_URL: string;
  readonly VITE_GOOGLE_FONTS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
