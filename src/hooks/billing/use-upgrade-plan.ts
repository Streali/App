import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '~/hooks/query-keys';
import { apiClient } from '~/utils/axios/axios';

export function useUpgradePlan() {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      await apiClient.post('/billings/upgrade-plan');
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(queryKeys.currentPlan());
      },
    }
  );
}
