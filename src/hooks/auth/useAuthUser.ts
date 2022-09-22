import { useQuery } from '@tanstack/react-query';
import { AuthUserSchema } from '../../types/schemas/auth';
import { apiClient } from '../../utils/axios/axios';
import { queryKeys } from '../query-keys';

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
