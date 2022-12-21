import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { eventListKeys } from '~/hooks/query-keys';
import { apiClient } from '~/utils/axios/axios';

export function useDuplicateEventList() {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      await apiClient.post(`/event-lists/${id}/duplicate`);

      toastr(
        ToastType.Success,
        'Theme duplicated',
        'Your theme has been duplicated successfully !'
      );
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(eventListKeys.lists());
      },
    }
  );
}
