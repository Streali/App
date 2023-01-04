import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '~/hooks/query-keys';
import { PlanSchema } from '~/types/schemas/billing';
import { apiClient } from '~/utils/axios/axios';

export function useCurrentPlan() {
  return useQuery({
    queryKey: queryKeys.currentPlan(),
    queryFn: async () => {
      const { data } = await apiClient.get('/billings/current-plan');

      return PlanSchema.parse(data);
    },
    staleTime: Infinity,
  });
}
