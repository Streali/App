import { z } from 'zod';

export const AddressSchema = z.object({
  id: z.string(),
  organization: z.string().nullable(),
  name: z.string(),
  address: z.string(),
  address_complement: z.string().nullable(),
  city: z.string(),
  country: z.string().max(2),
  postal_code: z.string(),
});
