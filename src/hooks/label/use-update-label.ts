import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { apiClient } from '~/utils/axios/axios';
import { LabelResponse } from './../../types/schemas/label';
import { labelKeys } from './../query-keys';

export const useUpdateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: Omit<LabelResponse, 'created_at' | 'updated_at' | 'user_id' | 'secret'>) => {
      const { data } = await apiClient.put(`/labels/${params.id}`, params.theme);

      toastr(
        ToastType.Success,
        'Your label is updated!',
        'Congratulation! You can use your label right now 👍'
      );

      return data;
    },
    {
      onSuccess(_, params) {
        void queryClient.invalidateQueries(labelKeys.detail(params.id));
        void queryClient.invalidateQueries(labelKeys.lists());
      },
    }
  );
};
