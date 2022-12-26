import { createContext, type ReactNode } from 'react';
import FullPageLoader from '~/components/layout/full-page-loader';
import { useUser } from '~/hooks/auth/use-user';
import type { User } from '~/types/schemas/auth';

const AuthContext = createContext<{ user: User | null } | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [firstAttemptFinished, setFirstAttemptFinished] = useState(false);

  const { data, isFetched, isError, isLoading } = useUser();

  useEffect(() => {
    if (!isFetched) {
      setFirstAttemptFinished(true);
    }
  }, [isFetched]);

  if (!firstAttemptFinished) {
    if (isLoading) {
      return <FullPageLoader />;
    }

    if (isError) {
      return <div>Something went wrong</div>;
    }
  }

  return <AuthContext.Provider value={{ user: data! }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
