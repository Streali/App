import { RouteObject } from 'react-router-dom';
import { ChatCreate } from './pages/chat/create';
import { ChatEdit } from './pages/chat/edit';
import { ChatLibrary } from './pages/chat/library';

export const chatRouter: RouteObject[] = [
  {
    path: '/',
    element: <ChatLibrary />,
  },
  {
    path: '/chat/create',
    element: <ChatCreate />,
  },
  {
    path: '/chat/library',
    element: <ChatLibrary />,
  },
  {
    path: '/chat/:id/edit',
    element: <ChatEdit />,
  },
];

export const routes: RouteObject[] = [...chatRouter];
