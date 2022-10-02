import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../utils/axios/axios';
import { queryKeys } from '../query-keys';
import { AuthCheckSchema } from '../../types/schemas/auth';

export const useAuthCheck = () => {
  return useQuery(
    queryKeys.authCheck(),
    async () => {
      const response = await apiClient.get('/auth/check');

      return AuthCheckSchema.parse(response.data);
    },
    {
      staleTime: Infinity,
    }
  );
};
