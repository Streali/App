import { QueryClient } from '@tanstack/react-query';
import { HTTPError } from 'ky';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof HTTPError && error.response) {
          const status = error.response.status;

          if ([400, 401, 404].includes(status)) {
            return false;
          }

          if ([500, 503, 504].includes(status) && failureCount <= 5) {
            return true;
          }
        }

        return false;
      },
    },
  },
});
