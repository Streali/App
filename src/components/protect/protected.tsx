import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '~/contexts/auth-provider';

// eslint-disable-next-line react/prop-types
export const Protected = ({ redirectPath = '/login' }) => {
  const { user } = useAuth();

  if (user) {
    return <Outlet />;
  }

  return <Navigate to={redirectPath} replace />;
};
