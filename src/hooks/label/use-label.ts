import { useQuery } from '@tanstack/react-query';
import { apiClient } from '~/utils/axios/axios';
import { LabelResponseSchema } from './../../types/schemas/label';
import { labelKeys } from './../query-keys';

export const useLabel = (themeId: string) => {
  return useQuery({
    queryKey: labelKeys.detail(themeId),
    queryFn: async () => {
      const { data } = await apiClient.get(`/labels/${themeId}`);

      if (!data) {
        return null;
      }

      return LabelResponseSchema.parse(data);
    },
    staleTime: Infinity,
  });
};
