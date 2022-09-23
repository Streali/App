import { RouteObject } from 'react-router-dom';
import { Create } from './pages/chat/create';
import { ChatLibrary } from './pages/chat/library';

export const chatRouter: RouteObject[] = [
  {
    path: '/',
    element: <ChatLibrary />,
  },
  {
    path: '/chat/create',
    element: <Create />,
  },
  {
    path: '/chat/library',
    element: <ChatLibrary />,
  },
];

export const routes: RouteObject[] = [...chatRouter];
