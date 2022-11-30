import { useMutation } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { EventList } from '~/types/schemas/event-list';
import { apiClient } from '~/utils/axios/axios';

export function useCreateEventList() {
  return useMutation(async (params: EventList) => {
    const { data } = await apiClient.post('/event-lists', params);

    toastr(
      ToastType.Success,
      'Your event list is created!',
      'Congratulation! You can use your theme right now 👍'
    );

    return data;
  });
}
