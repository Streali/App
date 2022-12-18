import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '~/hooks/auth/use-auth-user';
import { labelKeys } from '~/hooks/query-keys';
import { apiClient } from '~/utils/axios/axios';

export const useLabelData = () => {
  const { data: user } = useAuthUser();

  return useQuery({
    queryKey: labelKeys.info(user?.id || ''),
    queryFn: async () => {
      const { data } = await apiClient.get(`/users/${user!.secret}/labels-info`);

      if (!data) {
        return null;
      }

      return data;
    },
    enabled: !!user,
    refetchInterval: 1000 * 30,
    staleTime: Infinity,
  });
};
