import { useQuery } from '@tanstack/react-query';
import { labelKeys } from '~/hooks/query-keys';
import { LabelResponseSchema } from '~/types/schemas/label';
import { http } from '~/utils/http/client';

export const useLabel = (themeId: string) => {
  return useQuery({
    queryKey: labelKeys.detail(themeId),
    queryFn: async () => {
      const data = await http.get(`labels/${themeId}`).json();

      if (!data) {
        return null;
      }

      return LabelResponseSchema.parse(data);
    },
    staleTime: Infinity,
  });
};
