import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { LabelResponseSchema } from '~/types/schemas/label';
import { apiClient } from '~/utils/axios/axios';
import { labelKeys } from './../query-keys';

const userEmbedSchema = z.object({
  user: z.object({
    secret: z.string(),
  }),
});

export const useLabel = (themeId: string) => {
  return useQuery({
    queryKey: labelKeys.detail(themeId),
    queryFn: async () => {
      const { data } = await apiClient.get(`/labels/${themeId}`);

      if (!data) {
        return null;
      }

      return LabelResponseSchema.merge(userEmbedSchema).parse(data);
    },
    staleTime: Infinity,
  });
};
