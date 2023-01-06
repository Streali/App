import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { eventListKeys } from '~/hooks/query-keys';
import { EventList, EventListResponseSchema } from '~/types/schemas/event-list';
import { http } from '~/utils/http/client';

export function useCreateEventList() {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: EventList) => {
      const data = await http.post('event-lists', { body: JSON.stringify(params) }).json();

      toastr(
        ToastType.Success,
        'Your event list is created!',
        'Congratulation! You can use your theme right now 👍'
      );

      return EventListResponseSchema.parse(data);
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(eventListKeys.lists());
      },
    }
  );
}
