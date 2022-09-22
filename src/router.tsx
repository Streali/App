import { RouteObject } from 'react-router-dom';
import { Create } from './pages/chat/create';

export const chatRouter: RouteObject[] = [
  {
    path: '/',
    element: <Create />,
  },
  {
    path: '/chat/create',
    element: <Create />,
  },
];

export const routes: RouteObject[] = [...chatRouter];
