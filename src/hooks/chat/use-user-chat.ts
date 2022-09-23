import { useQuery } from '@tanstack/react-query';
import { ChatTheme } from '../../types/schemas/chat';
import { apiClient } from '../../utils/axios/axios';
import { queryKeys } from '../query-keys';

export interface UseUserChatThemes {
  data?: ChatTheme[] | undefined | null;
  error: unknown;
  isLoading: boolean;
}

export const useUserChat = () => {
  return useQuery(
    queryKeys.chats(),
    async () => {
      const { data } = await apiClient.get('/chat-themes');

      return data;
    },
    {
      staleTime: Infinity,
    }
  );
};
