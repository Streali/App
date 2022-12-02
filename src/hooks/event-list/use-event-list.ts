import { useQuery } from '@tanstack/react-query';
import { EventListResponseSchema } from '~/types/schemas/event-list';
import { apiClient } from '~/utils/axios/axios';
import { eventListKeys } from './../query-keys';

export const useEventList = (themeId: string) => {
  return useQuery({
    queryKey: eventListKeys.detail(themeId),
    queryFn: async () => {
      const { data } = await apiClient.get(`/event-lists/${themeId}`);

      if (!data) {
        return null;
      }

      return EventListResponseSchema.parse(data);
    },
    staleTime: Infinity,
  });
};
