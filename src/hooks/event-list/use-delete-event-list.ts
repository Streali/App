import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { eventListKeys } from '~/hooks/query-keys';
import { apiClient } from '~/utils/axios/axios';

export const useDeleteEventList = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      await apiClient.delete(`/event-lists/${id}`);

      toastr(ToastType.Success, 'Theme deleted', 'Your theme is successfully deleted !');
    },
    {
      onSuccess(_, id) {
        void queryClient.invalidateQueries(eventListKeys.lists());
        void queryClient.removeQueries(eventListKeys.detail(id));
      },
    }
  );
};
