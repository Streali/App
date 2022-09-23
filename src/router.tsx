import { RouteObject } from 'react-router-dom';
import { ChatCreate } from './pages/chat/create';
import { ChatEdit } from './pages/chat/edit';
import { ChatEmbed } from './pages/chat/embed';
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
  {
    path: '/chat/:id/embed',
    element: <ChatEmbed />,
  },
];

export const routes: RouteObject[] = [...chatRouter];
