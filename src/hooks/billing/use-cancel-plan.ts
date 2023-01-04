import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '~/hooks/query-keys';
import { apiClient } from '~/utils/axios/axios';

export function useCancelPlan() {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      await apiClient.post('/billings/cancel-plan');
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(queryKeys.currentPlan());
      },
    }
  );
}
