import { useQuery } from '@tanstack/react-query';
import * as z from 'zod';
import { eventKeys } from '~/hooks/query-keys';
import { EventSchema } from '~/types/schemas/event';
import { apiClient } from '~/utils/axios/axios';

export const useUserEvent = () => {
  return useQuery({
    queryKey: eventKeys.lists(),
    queryFn: async () => {
      const { data } = await apiClient.get(`/events`);

      if (!data) {
        return [];
      }

      return z.array(EventSchema).parse(data);
    },
    staleTime: Infinity,
  });
};
