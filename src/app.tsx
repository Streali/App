import { Navbar } from './components/navbar/navbar';
import { routes } from './router';
import { navigation, noLayout } from './navigation';
import { Route, Routes, useLocation } from 'react-router-dom';

export const App = () => {
  const location = useLocation();

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
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </>
  );
};
