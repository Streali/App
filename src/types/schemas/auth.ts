import { z } from 'zod';

export const AuthCheckSchema = z.object({
  authenticated: z.boolean(),
});

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar_url: z.string(),
  email: z.string(),
  secret: z.string(),
});

export type User = z.infer<typeof UserSchema>;
