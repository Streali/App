import { Navbar } from './components/navbar/navbar';
import { routes } from './router';
import { navigation, noLayout } from './navigation';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAuthCheck } from './hooks/auth/useAuthCheck';
import { Protected } from './components/protect/protected';
import { Login } from './pages/login';
import { MinWidthWindow } from './components/min-width-window/min-width-window';

export const App = () => {
  const { status } = useAuthCheck();
  const location = useLocation();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MinWidthWindow />
      {!noLayout.some((path) => location.pathname.includes(path)) && (
        <Navbar navigation={navigation} />
      )}
      <main
        className={`relative min-h-screen ${
          !noLayout.some((path) => location.pathname.includes(path))
            ? 'ml-[80px] w-[calc(100%_-_80px)]'
            : 'ml-0 w-screen'
        }`}
      >
        <Routes>
          <Route path={'/login'} element={<Login />} />
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
