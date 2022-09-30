import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryKeys } from '../query-keys';

export const useLottieJson = (url: string) => {
  return useQuery(
    queryKeys.googleFont(),
    async () => {
      const response = await axios.get(url);

      return response.data;
    },
    {
      staleTime: Infinity,
    }
  );
};
