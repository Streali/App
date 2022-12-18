import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '~/hooks/auth/use-auth-user';
import { labelKeys } from '~/hooks/query-keys';
import { apiClient } from '~/utils/axios/axios';

export const useLabelData = (userSecret?: string) => {
  const { data: user } = useAuthUser();

  return useQuery({
    queryKey: labelKeys.info(userSecret || user?.secret || ''),
    queryFn: async ({ queryKey }) => {
      const { data } = await apiClient.get(`/users/${queryKey[2]}/labels-info`);

      if (!data) {
        return null;
      }

      return data;
    },
    enabled: !!userSecret || !!user?.secret,
    refetchInterval: 1000 * 30,
    staleTime: Infinity,
  });
};
