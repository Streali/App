import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '../../components/toast/toast';
import { apiClient } from '../../utils/axios/axios';
import { queryKeys } from '../query-keys';

export const useDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      await apiClient.delete(`/chat-themes/${id}`);

      toastr(ToastType.Success, 'Theme deleted', 'Your theme is successfully deleted !');
    },
    {
      onSuccess(_, id) {
        void queryClient.invalidateQueries(queryKeys.chats());
        void queryClient.removeQueries(queryKeys.chat(id));
      },
    }
  );
};
