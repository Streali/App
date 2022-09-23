import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChatTheme } from '../../types/schemas/chat';
import { apiClient } from '../../utils/axios/axios';
import { toastr, ToastType } from '../../utils/toast/toast';
import { queryKeys } from '../query-keys';

export function useCreateChat() {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: ChatTheme) => {
      const { data } = await apiClient.post('/chat-themes', params);

      toastr(
        ToastType.Success,
        'Your chat theme is created!',
        'Congratulation! You can use your theme right now 👍'
      );

      return data;
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(queryKeys.chats());
      },
    }
  );
}
