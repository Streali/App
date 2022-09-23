import { Navigate } from 'react-router-dom';
import { Button } from '../components/button/button';
import { useAuthCheck } from '../hooks/auth/useAuthCheck';

export const Login = () => {
  const { data, status } = useAuthCheck();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (data?.authenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Button link={'http://localhost:3333/oauth/twitch/redirect'} iconLeft="twitch-fill" external>
        Login with Twitch
      </Button>
    </div>
  );
};
