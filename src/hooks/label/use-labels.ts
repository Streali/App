import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { labelKeys } from '~/hooks/query-keys';
import { LabelResponseSchema } from '~/types/schemas/label';
import { http } from '~/utils/http/client';

export const useLabels = () => {
  return useQuery({
    queryKey: labelKeys.lists(),
    queryFn: async () => {
      const data = await http.get('labels').json();

      return z.array(LabelResponseSchema).parse(data);
    },
    staleTime: Infinity,
  });
};
