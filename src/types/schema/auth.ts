import * as z from 'zod';

export const AuthCheckSchema = z.object({
  authenticated: z.boolean(),
});

export const AuthUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar_url: z.string(),
  email: z.string(),
});
