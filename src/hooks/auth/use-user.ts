import * as Sentry from '@sentry/react';
import { useQuery } from '@tanstack/react-query';
import { authKeys } from '~/hooks/query-keys';
import { UserSchema } from '~/types/schemas/auth';
import { http } from '~/utils/http/client';

async function fetchUser() {
  try {
    const data = await http.get('me').json();

    const user = UserSchema.parse(data);

    Sentry.setUser({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    return user;
  } catch (error) {
    return null;
  }
}

export function useUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: fetchUser,
    staleTime: Infinity,
  });
}
