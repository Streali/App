import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { queryKeys } from '~/hooks/query-keys';
import { CountrySchema } from '~/types/schemas/country';
import { apiClient } from '~/utils/axios/axios';

export function useCountries() {
  return useQuery({
    queryKey: queryKeys.countries(),
    queryFn: async () => {
      const { data } = await apiClient.get('/countries');

      return z.array(CountrySchema).parse(data);
    },
    staleTime: Infinity,
  });
}
