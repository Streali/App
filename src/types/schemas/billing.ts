import { z } from 'zod';

export const PlanSchema = z.object({
  name: z.enum(['free', 'pro']),
});

export const PaymentMethodSchema = z.object({
  id: z.string(),
  brand: z.string(),
  expiry_month: z.string(),
  expiry_year: z.string(),
  last_four: z.string(),
});
