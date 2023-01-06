import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { eventListKeys } from '~/hooks/query-keys';
import { EventListResponseSchema } from '~/types/schemas/event-list';
import { http } from '~/utils/http/client';

export const useEventLists = () => {
  return useQuery({
    queryKey: eventListKeys.lists(),
    queryFn: async () => {
      const data = await http.get('event-lists').json();

      return z.array(EventListResponseSchema).parse(data);
    },
    staleTime: Infinity,
  });
};
