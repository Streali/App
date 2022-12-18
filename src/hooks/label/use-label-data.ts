import { useQuery } from '@tanstack/react-query';
import { useAuthUser } from '~/hooks/auth/use-auth-user';
import { apiClient } from '~/utils/axios/axios';

export const useLabelData = () => {
  const { data: user } = useAuthUser();

  return useQuery({
    queryKey: ['label-data', user],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await apiClient.get(`/users/${user!.secret}/labels-info`);

      if (!data) {
        return null;
      }

      return data;
    },
  });
};
