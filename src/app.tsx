import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '~/boot/router';
import FullPageLoader from '~/components/layout/full-page-loader';
import Shell from '~/components/layout/shell';
import { Protected } from '~/components/protect/protected';
import { splitBy } from '~/utils/common/split-by';

export default function App() {
  const navigate = useNavigate();
  const redirect = localStorage.getItem('redirectPath');

  useEffect(() => {
    if (redirect) {
      localStorage.removeItem('redirectPath');
      navigate(redirect);
    }
  }, []);

  const [protectedRoutes, guestRoutes] = splitBy(routes, (route) => route.protected);

  return (
    <Shell>
      <Suspense fallback={<FullPageLoader />}>
        <Routes>
          {guestRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route element={<Protected />}>
            {protectedRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </Shell>
  );
}
