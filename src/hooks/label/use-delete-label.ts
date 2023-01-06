import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { http } from '~/utils/http/client';
import { labelKeys } from './../query-keys';

export const useDeleteLabel = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      await http.delete(`labels/${id}`);

      toastr(ToastType.Success, 'Label deleted', 'Your label is successfully deleted !');
    },
    {
      onSuccess(_, id) {
        void queryClient.invalidateQueries(labelKeys.lists());
        void queryClient.removeQueries(labelKeys.detail(id));
      },
    }
  );
};
