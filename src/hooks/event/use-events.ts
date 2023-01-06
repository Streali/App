import { useQuery } from '@tanstack/react-query';
import * as z from 'zod';
import { eventKeys } from '~/hooks/query-keys';
import { EventSchema } from '~/types/schemas/event';
import { http } from '~/utils/http/client';

export const useEvents = () => {
  return useQuery({
    queryKey: eventKeys.lists(),
    queryFn: async () => {
      const data = await http.get(`events`).json();

      if (!data) {
        return [];
      }

      return z.array(EventSchema).parse(data);
    },
    staleTime: Infinity,
    refetchInterval: 1000 * 60,
  });
};
