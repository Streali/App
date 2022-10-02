import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryKeys } from '../query-keys';

export interface GoogleFontsFamily {
  category?: string | undefined;
  kind: string;
  family: string;
  subsets: string[];
  variants: string[];
  version: string;
  lastModified: string;
  files: { [variant: string]: string };
}

export interface UseGoogleFonts {
  data: GoogleFontsFamily[];
  loading: boolean;
  error: unknown;
}

export const useGoogleFont = () => {
  return useQuery(
    queryKeys.googleFont(),
    async () => {
      const response = await axios.get(
        `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${
          import.meta.env.VITE_GOOGLE_FONTS_API_KEY
        }`
      );

      return response.data.items;
    },
    {
      staleTime: Infinity,
    }
  );
};
