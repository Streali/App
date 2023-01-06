import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { chatKeys } from '~/hooks/query-keys';
import { ChatTheme, ChatThemeSchema } from '~/types/schemas/chat';
import { http } from '~/utils/http/client';

export interface UseUserChatThemes {
  data?: ChatTheme[] | undefined | null;
  error: unknown;
  isLoading: boolean;
}

export const useChats = () => {
  return useQuery({
    queryKey: chatKeys.lists(),
    queryFn: async () => {
      const data = await http.get('chat-themes').json();

      return z.array(ChatThemeSchema).parse(data);
    },
    staleTime: Infinity,
  });
};
