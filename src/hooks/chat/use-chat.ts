import { useQuery } from '@tanstack/react-query';
import { chatKeys } from '~/hooks/query-keys';
import { ChatThemeSchema } from '~/types/schemas/chat';
import { apiClient } from '~/utils/axios/axios';

export const useChat = (themeId: string) => {
  return useQuery({
    queryKey: chatKeys.detail(themeId),
    queryFn: async () => {
      const { data } = await apiClient.get(`/chat-themes/${themeId}`);

      if (!data) {
        return null;
      }

      return ChatThemeSchema.parse(data);
    },
    staleTime: Infinity,
  });
};
