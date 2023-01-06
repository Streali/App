import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { Label, LabelResponseSchema } from '~/types/schemas/label';
import { http } from '~/utils/http/client';
import { labelKeys } from './../query-keys';

export function useCreateLabel() {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: Label) => {
      const data = await http.post('labels', { body: JSON.stringify(params) }).json();

      toastr(
        ToastType.Success,
        'Your label is created!',
        'Congratulation! You can use your label right now 👍'
      );

      return LabelResponseSchema.parse(data);
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(labelKeys.lists());
      },
    }
  );
}
