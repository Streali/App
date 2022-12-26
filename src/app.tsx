// import LogRocket from 'logrocket';
import { Route, Routes } from 'react-router-dom';
import { Protected } from '~/components/protect/protected';
import { Login } from '~/pages/login';
import { protectedRoutes, routes } from '~/boot/router';
import Shell from '~/components/layout/shell';

export default function App() {
  /*const location = useLocation();
  const navigate = useNavigate();
  const redirect = localStorage.getItem('redirectPath');*/

  // useEffect(() => {
  //   if (
  //     !noLayout.some((path) => location.pathname.includes(path)) &&
  //     status === 'success' &&
  //     user &&
  //     import.meta.env.DEV
  //   ) {
  //     LogRocket.identify(user.id, user);
  //     LogRocket.init(import.meta.env.VITE_LOGROCKET_APP_ID);
  //   }
  //
  //   if (redirect) {
  //     localStorage.removeItem('redirectPath');
  //     navigate(redirect);
  //   }
  // }, []);

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
