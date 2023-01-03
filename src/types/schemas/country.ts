import { z } from 'zod';

export const CountrySchema = z.object({
  name: z.string(),
  iso_code: z.string().max(2),
});
