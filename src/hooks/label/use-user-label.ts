import { useQuery } from '@tanstack/react-query';
import { apiClient } from '~/utils/axios/axios';
import { labelKeys } from './../query-keys';

export const useUserLabels = () => {
  return useQuery({
    queryKey: labelKeys.lists(),
    queryFn: async () => {
      const { data } = await apiClient.get('/labels');

      return data;
    },
    staleTime: Infinity,
  });
};
