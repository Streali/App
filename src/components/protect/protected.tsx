import { Navigate, Outlet } from 'react-router-dom';
import { useAuthCheck } from '~/hooks/auth/use-auth-check';

// eslint-disable-next-line react/prop-types
export const Protected = ({ redirectPath = '/login' }) => {
  const { data, status } = useAuthCheck();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (data?.authenticated) {
    return <Outlet />;
  }

  return <Navigate to={redirectPath} replace />;
};
