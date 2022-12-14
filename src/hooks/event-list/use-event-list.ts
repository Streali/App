import { useQuery } from '@tanstack/react-query';
import { eventListKeys } from '~/hooks/query-keys';
import { EventListResponseSchema } from '~/types/schemas/event-list';
import { http } from '~/utils/http/client';

export const useEventList = (themeId: string) => {
  return useQuery({
    queryKey: eventListKeys.detail(themeId),
    queryFn: async () => {
      const data = await http.get(`event-lists/${themeId}`).json();

      if (!data) {
        return null;
      }

      return EventListResponseSchema.parse(data);
    },
    staleTime: Infinity,
  });
};
