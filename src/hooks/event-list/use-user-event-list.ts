import { useQuery } from '@tanstack/react-query';
import { eventListKeys } from '~/hooks/query-keys';
import { EventList } from '~/types/schemas/event-list';
import { apiClient } from '~/utils/axios/axios';

export interface UseUserChatThemes {
  data?: EventList[] | undefined | null;
  error: unknown;
  isLoading: boolean;
}

export const useUserEventList = () => {
  return useQuery({
    queryKey: eventListKeys.lists(),
    queryFn: async () => {
      const { data } = await apiClient.get('/event-lists');

      return data;
    },
    staleTime: Infinity,
  });
};
