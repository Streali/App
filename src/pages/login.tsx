import { Navigate } from 'react-router-dom';
import { Button } from '~/components/button/button';
import { useAuth } from '~/contexts/auth-provider';

export const Login = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="fixed -top-[20%] -left-[20%] h-[60%] w-[55%] rounded-full bg-primary-500 blur-[200px]"></div>
      <div className="fixed top-[40%] -right-[40%] h-[15%] w-[60%] rounded-full bg-accent-500 blur-[200px]"></div>
      <h1 className="text-center font-title text-4xl font-semibold">
        Join the best streaming
        <br />
        visual editor
      </h1>
      <Button
        link={`${import.meta.env.VITE_API_URL}/oauth/twitch/redirect`}
        iconLeft="twitch-fill"
        external
      >
        Login with Twitch
      </Button>
    </div>
  );
};
