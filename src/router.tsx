import { AlertCreate } from '~/pages/alert/create';
import { ChatCreate } from '~/pages/chat/create';
import { ChatEdit } from '~/pages/chat/edit';
import { ChatEmbed } from '~/pages/chat/embed';
import { ChatLibrary } from '~/pages/chat/library';
import type { RouteObject } from 'react-router-dom';

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

export const alertRoutes: RouteObject[] = [
  {
    path: '/alert/create',
    element: <AlertCreate />,
  },
];

export const embedRoutes: RouteObject[] = [
  {
    path: '/chat/:id/embed',
    element: <ChatEmbed />,
  },
];

export const routes: RouteObject[] = [...chatRouter, ...alertRoutes];
