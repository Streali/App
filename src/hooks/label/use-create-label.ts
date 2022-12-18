import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { Label } from '~/types/schemas/label';
import { apiClient } from '~/utils/axios/axios';
import { labelKeys } from './../query-keys';

export function useCreateLabel() {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: Label) => {
      const { data } = await apiClient.post('/labels', params);

      toastr(
        ToastType.Success,
        'Your label is created!',
        'Congratulation! You can use your label right now 👍'
      );

      return data;
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(labelKeys.lists());
      },
    }
  );
}
