import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { queryKeys } from '~/hooks/query-keys';

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
  return useQuery({
    queryKey: queryKeys.googleFont(),
    queryFn: async () => {
      const response = await ky
        .get(
          `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${
            import.meta.env.VITE_GOOGLE_FONTS_API_KEY
          }`
        )
        .json<{ items: any }>();

      return response.items;
    },
    staleTime: Infinity,
  });
};
