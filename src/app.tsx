import { motion, AnimatePresence } from 'framer-motion';
import LogRocket from 'logrocket';
import { Route, Routes } from 'react-router-dom';
import { MinWidthWindow } from '~/components/min-width-window/min-width-window';
import { Navbar } from '~/components/navbar/navbar';
import { Protected } from '~/components/protect/protected';
import { useAuthCheck } from '~/hooks/auth/use-auth-check';
import { useOnline } from '~/hooks/layouts/use-online';
import { navigation, noLayout } from '~/navigation';
import { Login } from '~/pages/login';
import { embedRoutes, routes } from '~/router';
import { useAuthUser } from './hooks/auth/use-auth-user';

export const App = () => {
  const { data, status } = useAuthCheck();
  const location = useLocation();
  const navigate = useNavigate();
  const online = useOnline();
  const { data: user } = useAuthUser({ enabled: data?.authenticated });
  const redirect = localStorage.getItem('redirectPath');

  useEffect(() => {
    if (
      !noLayout.some((path) => location.pathname.includes(path)) &&
      status === 'success' &&
      user &&
      import.meta.env.DEV
    ) {
      LogRocket.identify(user.id, user);
      LogRocket.init(import.meta.env.VITE_LOGROCKET_APP_ID);
    }

    if (redirect) {
      localStorage.removeItem('redirectPath');
      navigate(redirect);
    }
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!noLayout.some((path) => location.pathname.includes(path)) && (
        <>
          <MinWidthWindow />
          <Navbar navigation={navigation} />
        </>
      )}
      <main
        className={`relative min-h-screen ${
          !noLayout.some((path) => location.pathname.includes(path))
            ? 'ml-[300px] w-[calc(100%_-_300px)]'
            : 'ml-0 w-screen'
        }`}
      >
        <AnimatePresence>
          {!online && (
            <motion.div
              className="absolute top-0 w-full bg-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
                <div className="sm:px-16 sm:text-center">
                  <p className="font-medium text-white">
                    You appears to be offline. Please check your network.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <Routes>
          <Route path={'/login'} element={<Login />} />
          {embedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route element={<Protected />}>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </main>
    </>
  );
};
