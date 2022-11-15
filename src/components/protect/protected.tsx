import { Navigate, Outlet } from 'react-router-dom';
import { useAuthCheck } from '~/hooks/auth/use-auth-check';

// eslint-disable-next-line react/prop-types
export const Protected = ({ redirectPath = '/login' }) => {
  const { data, status } = useAuthCheck();
  const location = useLocation();

  localStorage.setItem('redirectPath', location.pathname);

  if (status === 'loading') {
    return <div className="flex h-full w-full items-center justify-center">Loading...</div>;
  }

  if (data?.authenticated) {
    return <Outlet />;
  }

  return <Navigate to={redirectPath} replace />;
};
