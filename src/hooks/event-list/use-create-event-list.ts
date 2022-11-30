import { useMutation } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { apiClient } from '~/utils/axios/axios';

type CreateEventListParams = {};

export function useCreateEventList() {
  return useMutation(async (params: CreateEventListParams) => {
    const { data } = await apiClient.post('/event-lists', params);

    toastr(
      ToastType.Success,
      'Your event list is created!',
      'Congratulation! You can use your theme right now 👍'
    );

    return data;
  });
}
