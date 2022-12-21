import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { labelKeys } from '~/hooks/query-keys';
import { apiClient } from '~/utils/axios/axios';

export function useDuplicateLabel() {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      await apiClient.post(`/labels/${id}/duplicate`);

      toastr(
        ToastType.Success,
        'Theme duplicated',
        'Your theme has been duplicated successfully !'
      );
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(labelKeys.lists());
      },
    }
  );
}
