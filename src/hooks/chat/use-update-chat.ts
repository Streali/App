import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChatTheme } from '../../types/schemas/chat';
import { apiClient } from '../../utils/axios/axios';
import { toastr, ToastType } from '../../utils/toast/toast';
import { queryKeys } from '../query-keys';

export const useUpdateChat = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: ChatTheme) => {
      const { data } = await apiClient.put(`/chat-themes/${params.id}`, params);

      toastr(
        ToastType.Success,
        'Your chat theme is updated!',
        'Congratulation! You can use your theme right now 👍'
      );

      return data;
    },
    {
      onSuccess(_, params) {
        void queryClient.invalidateQueries(queryKeys.chat(params.id));
        void queryClient.invalidateQueries(queryKeys.chats());
      },
    }
  );
};
