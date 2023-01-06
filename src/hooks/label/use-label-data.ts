import { useQuery } from '@tanstack/react-query';
import { useUser } from '~/hooks/auth/use-user';
import { labelKeys } from '~/hooks/query-keys';
import { LabelDataSchema } from '~/types/schemas/label';
import { http } from '~/utils/http/client';

export const useLabelData = () => {
  const { data: user } = useUser();

  return useQuery({
    queryKey: labelKeys.info(user?.secret || ''),
    queryFn: async ({ queryKey }) => {
      const data = await http.get(`users/${queryKey[2]}/labels-info`).json();

      if (!data) {
        return null;
      }

      return LabelDataSchema.parse(data);
    },
    enabled: !!user?.secret,
    refetchInterval: 1000 * 10,
    staleTime: Infinity,
  });
};
