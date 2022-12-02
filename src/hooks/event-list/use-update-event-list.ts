import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { EventListResponse } from '~/types/schemas/event-list';
import { apiClient } from '~/utils/axios/axios';
import { eventListKeys } from './../query-keys';

export const useUpdateEventList = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: Omit<EventListResponse, 'created_at' | 'updated_at'>) => {
      const { data } = await apiClient.put(`/event-lists/${params.id}`, params.theme);

      toastr(
        ToastType.Success,
        'Your event list theme is updated!',
        'Congratulation! You can use your theme right now 👍'
      );

      return data;
    },
    {
      onSuccess(_, params) {
        void queryClient.invalidateQueries(eventListKeys.detail(params.id));
        void queryClient.invalidateQueries(eventListKeys.lists());
      },
    }
  );
};
