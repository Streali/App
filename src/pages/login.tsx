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
    <div className="h-screen flex justify-center items-center flex-col gap-10">
      <div className="w-[55%] h-[60%] bg-primary-500 blur-[200px] rounded-full fixed -top-[20%] -left-[20%]"></div>
      <div className="w-[60%] h-[15%] bg-accent-500 blur-[200px] rounded-full fixed top-[40%] -right-[40%]"></div>
      <h1 className="font-semibold text-4xl font-title text-center">
        Join the best streaming
        <br />
        visual editor
      </h1>
      <Button link={'http://localhost:3333/oauth/twitch/redirect'} iconLeft="twitch-fill" external>
        Login with Twitch
      </Button>
    </div>
  );
};
