import * as Sentry from '@sentry/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authKeys } from '~/hooks/query-keys';
import { http } from '~/utils/http/client';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      return http.post('auth/logout');
    },
    {
      onSuccess() {
        Sentry.setUser(null);
        void queryClient.setQueryData(authKeys.user(), null);
      },
    }
  );
}
