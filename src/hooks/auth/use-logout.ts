import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '~/hooks/query-keys';
import { apiClient } from '~/utils/axios/axios';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      return apiClient.post('/auth/logout');
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(queryKeys.authCheck());
        void queryClient.setQueryData(queryKeys.authUser(), null);
      },
    }
  );
}
