import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { chatKeys } from '~/hooks/query-keys';
import { apiClient } from '~/utils/axios/axios';

export function useDuplicateChat() {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      await apiClient.post(`/chat-themes/${id}/duplicate`);

      toastr(
        ToastType.Success,
        'Theme duplicated',
        'Your theme has been duplicated successfully !'
      );
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(chatKeys.lists());
      },
    }
  );
}
