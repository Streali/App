import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/navbar/navbar';
import { routes } from './router';
import { navigation, noLayout } from './navigation';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAuthCheck } from './hooks/auth/useAuthCheck';
import { Protected } from './components/protect/protected';
import { Login } from './pages/login';
import { MinWidthWindow } from './components/min-width-window/min-width-window';
import { useOnline } from './hooks/layouts/use-online';

export const App = () => {
  const { status } = useAuthCheck();
  const location = useLocation();
  const online = useOnline();

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
            ? 'ml-[80px] w-[calc(100%_-_80px)]'
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
