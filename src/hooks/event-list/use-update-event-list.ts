import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { eventListKeys } from '~/hooks/query-keys';
import { EventListResponse, EventListResponseSchema } from '~/types/schemas/event-list';
import { http } from '~/utils/http/client';

export const useUpdateEventList = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: Omit<EventListResponse, 'created_at' | 'updated_at'>) => {
      const data = await http
        .put(`event-lists/${params.id}`, { body: JSON.stringify(params.theme) })
        .json();

      toastr(
        ToastType.Success,
        'Your event list theme is updated!',
        'Congratulation! You can use your theme right now 👍'
      );

      return EventListResponseSchema.parse(data);
    },
    {
      onSuccess(_, params) {
        void queryClient.invalidateQueries(eventListKeys.detail(params.id));
        void queryClient.invalidateQueries(eventListKeys.lists());
      },
    }
  );
};
