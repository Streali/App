import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { queryKeys } from '~/hooks/query-keys';

export const useLottieJson = (url: string) => {
  return useQuery({
    queryKey: queryKeys.lottie(url),
    queryFn: () => {
      return ky.get(url).json();
    },
    staleTime: Infinity,
  });
};
