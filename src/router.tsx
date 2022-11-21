import { AlertCreate } from '~/pages/alert/create';
import { AlertEdit } from '~/pages/alert/edit';
import { ChatCreate } from '~/pages/chat/create';
import { ChatEdit } from '~/pages/chat/edit';
import { ChatEmbed } from '~/pages/chat/embed';
import { ChatLibrary } from '~/pages/chat/library';
import { Dashboard } from '~/pages/dashboard';
import { Events } from '~/pages/events';
import type { RouteObject } from 'react-router-dom';

export const chatRouter: RouteObject[] = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/chats/create',
    element: <ChatCreate />,
  },
  {
    path: '/chats',
    element: <ChatLibrary />,
  },
  {
    path: '/chats/:id/edit',
    element: <ChatEdit />,
  },
];

export const alertRoutes: RouteObject[] = [
  {
    path: '/alerts/create',
    element: <AlertCreate />,
  },
  {
    path: '/alerts/:id/edit',
    element: <AlertEdit />,
  },
];

export const eventRoutes: RouteObject[] = [
  {
    path: '/events',
    element: <Events />,
  },
];

export const embedRoutes: RouteObject[] = [
  {
    path: '/chats/:id/embed',
    element: <ChatEmbed />,
  },
];

export const routes: RouteObject[] = [...chatRouter, ...eventRoutes /*...alertRoutes*/];
