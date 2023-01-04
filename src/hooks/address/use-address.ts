import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '~/hooks/query-keys';
import { AddressSchema } from '~/types/schemas/address';
import { apiClient } from '~/utils/axios/axios';

export function useAddress() {
  return useQuery({
    queryKey: queryKeys.address(),
    queryFn: async () => {
      const { data } = await apiClient.get('/billings/address');

      if (!data) {
        return null;
      }

      return AddressSchema.parse(data);
    },
    staleTime: Infinity,
  });
}
