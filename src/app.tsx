import { Navbar } from './components/navbar/navbar';
import { routes } from './router';
import { navigation, noLayout } from './navigation';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAuthCheck } from './hooks/auth/useAuthCheck';
import { Protected } from './components/protect/protected';
import { Login } from './pages/login';

export const App = () => {
  const { status } = useAuthCheck();
  const location = useLocation();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!noLayout.some((path) => location.pathname.includes(path)) && (
        <Navbar navigation={navigation} />
      )}
      <main
        className={`min-h-screen ${
          !noLayout.some((path) => location.pathname.includes(path))
            ? 'w-[calc(100%_-_80px)] ml-[80px]'
            : 'w-screen ml-0'
        }`}>
        <Routes>
          <Route path={'/login'} element={<Login />} />
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </>
  );
};
