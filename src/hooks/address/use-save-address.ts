import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { queryKeys } from '~/hooks/query-keys';
import { apiClient } from '~/utils/axios/axios';

interface SaveAddressParams {
  id?: string;
  organization: string;
  address: string;
  address_complement: string;
  city: string;
  country: string;
  postal_code: string;
}

export function useSaveAddress() {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: SaveAddressParams) => {
      const { data } = await apiClient.post('/billings/address', params);

      toastr(ToastType.Success, 'Your address has been saved!');

      return data;
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(queryKeys.address());
      },
    }
  );
}
