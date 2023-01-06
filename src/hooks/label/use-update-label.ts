import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { labelKeys } from '~/hooks/query-keys';
import { LabelResponse, LabelResponseSchema } from '~/types/schemas/label';
import { http } from '~/utils/http/client';

export const useUpdateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: Omit<LabelResponse, 'created_at' | 'updated_at' | 'user_id' | 'secret'>) => {
      const data = await http
        .put(`labels/${params.id}`, { body: JSON.stringify(params.theme) })
        .json();

      toastr(
        ToastType.Success,
        'Your label is updated!',
        'Congratulation! You can use your label right now 👍'
      );

      return LabelResponseSchema.parse(data);
    },
    {
      onSuccess(_, params) {
        void queryClient.invalidateQueries(labelKeys.detail(params.id));
        void queryClient.invalidateQueries(labelKeys.lists());
      },
    }
  );
};
