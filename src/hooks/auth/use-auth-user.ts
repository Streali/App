import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '~/hooks/query-keys';
import { AuthUserSchema } from '~/types/schemas/auth';
import { apiClient } from '~/utils/axios/axios';

export function useAuthUser() {
  return useQuery(
    queryKeys.authUser(),
    async () => {
      const response = await apiClient.get('/me');

      return AuthUserSchema.parse(response.data);
    },
    {
      staleTime: Infinity,
    }
  );
}
