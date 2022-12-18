import { AlertCreate } from '~/pages/alert/create';
import { AlertEdit } from '~/pages/alert/edit';
import { ChatCreate } from '~/pages/chat/create';
import { ChatEdit } from '~/pages/chat/edit';
import { ChatEmbed } from '~/pages/chat/embed';
import { ChatLibrary } from '~/pages/chat/library';
import { Dashboard } from '~/pages/dashboard';
import { Events } from '~/pages/events';
import { EventListCreate } from './pages/event-list/create';
import { EventListEdit } from './pages/event-list/edit';
import { EventListEmbed } from './pages/event-list/embed';
import EventListLibrary from './pages/event-list/library';
import type { RouteObject } from 'react-router-dom';
import CreateLabel from './pages/label/create';

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

export const eventListRoutes: RouteObject[] = [
  {
    path: '/event-lists/create',
    element: <EventListCreate />,
  },
  {
    path: '/event-lists',
    element: <EventListLibrary />,
  },
  {
    path: '/event-lists/:id/edit',
    element: <EventListEdit />,
  },
];

export const labelRoutes: RouteObject[] = [
  {
    path: 'labels/create',
    element: <CreateLabel />,
  },
];

export const embedRoutes: RouteObject[] = [
  {
    path: '/chats/:id/embed',
    element: <ChatEmbed />,
  },
  {
    path: '/event-lists/:id/embed',
    element: <EventListEmbed />,
  },
];

export const routes: RouteObject[] = [
  ...chatRouter,
  ...eventRoutes,
  ...labelRoutes,
  ...eventListRoutes /*...alertRoutes*/,
];
