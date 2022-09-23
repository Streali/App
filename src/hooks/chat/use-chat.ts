import * as z from 'zod';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../query-keys';
import { apiClient } from '../../utils/axios/axios';
import { ChatThemeSchema } from '../../types/schemas/chat';

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
