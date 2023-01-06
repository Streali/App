import { useQuery } from '@tanstack/react-query';
import { chatKeys } from '~/hooks/query-keys';
import { ChatThemeSchema } from '~/types/schemas/chat';
import { http } from '~/utils/http/client';

export const useChat = (themeId: string) => {
  return useQuery({
    queryKey: chatKeys.detail(themeId),
    queryFn: async () => {
      const data = await http.get(`chat-themes/${themeId}`).json();

      if (!data) {
        return null;
      }

      return ChatThemeSchema.parse(data);
    },
    staleTime: Infinity,
  });
};
