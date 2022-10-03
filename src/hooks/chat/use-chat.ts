import { useQuery } from '@tanstack/react-query';
import * as z from 'zod';
import { queryKeys } from '~/hooks/query-keys';
import { ChatThemeSchema } from '~/types/schemas/chat';
import { apiClient } from '~/utils/axios/axios';

export const useChat = (themeId: string) => {
  return useQuery(
    queryKeys.chat(themeId),
    async () => {
      const { data } = await apiClient.get(`/chat-themes/${themeId}`);

      if (!data) {
        return null;
      }

      const userEmbedSchema = z.object({
        user: z.object({
          username: z.string(),
        }),
      });

      return ChatThemeSchema.merge(userEmbedSchema).parse(data);
    },
    {
      staleTime: Infinity,
    }
  );
};
