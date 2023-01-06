import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { chatKeys } from '~/hooks/query-keys';
import { ChatTheme, ChatThemeSchema } from '~/types/schemas/chat';
import { http } from '~/utils/http/client';

export function useCreateChat() {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: ChatTheme) => {
      const data = await http.post('chat-themes', { body: JSON.stringify(params) }).json();

      toastr(
        ToastType.Success,
        'Your chat theme is created!',
        'Congratulation! You can use your theme right now 👍'
      );

      return ChatThemeSchema.parse(data);
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(chatKeys.lists());
      },
    }
  );
}
