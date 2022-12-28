import { Route, Routes } from 'react-router-dom';
import { protectedRoutes, routes } from '~/boot/router';
import Shell from '~/components/layout/shell';
import { Protected } from '~/components/protect/protected';
import { Login } from '~/pages/login';

export default function App() {
  const navigate = useNavigate();
  const redirect = localStorage.getItem('redirectPath');

  useEffect(() => {
    if (redirect) {
      localStorage.removeItem('redirectPath');
      navigate(redirect);
    }
  }, []);

  return (
    <Shell>
      <Routes>
        <Route path={'/login'} element={<Login />} />

        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        <Route element={<Protected />}>
          {protectedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Shell>
  );
}
