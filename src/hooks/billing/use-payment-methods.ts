import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { queryKeys } from '~/hooks/query-keys';
import { PaymentMethodSchema } from '~/types/schemas/billing';
import { apiClient } from '~/utils/axios/axios';

export function usePaymentMethods() {
  return useQuery({
    queryKey: queryKeys.paymentMethods(),
    queryFn: async () => {
      const { data } = await apiClient.get('/billings/payment-methods');

      return z.array(PaymentMethodSchema).parse(data);
    },
    staleTime: Infinity,
  });
}
