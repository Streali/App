import type { RouteObject } from 'react-router-dom';

const Dashboard = lazy(() => import('~/pages/dashboard'));
const Login = lazy(() => import('~/pages/login'));

const ChatCreate = lazy(() => import('~/pages/chat/create'));
const ChatLibrary = lazy(() => import('~/pages/chat/library'));
const ChatEdit = lazy(() => import('~/pages/chat/edit'));

const EventListCreate = lazy(() => import('~/pages/event-list/create'));
const EventListLibrary = lazy(() => import('~/pages/event-list/library'));
const EventListEdit = lazy(() => import('~/pages/event-list/edit'));

const LabelCreate = lazy(() => import('~/pages/label/create'));
const LabelLibrary = lazy(() => import('~/pages/label/library'));
const LabelEdit = lazy(() => import('~/pages/label/edit'));

const EventEmbed = lazy(() => import('~/pages/events'));
const ChatEmbed = lazy(() => import('~/pages/chat/embed'));
const EventListEmbed = lazy(() => import('~/pages/event-list/embed'));
const LabelEmbed = lazy(() => import('~/pages/label/embed'));

type CustomRouteObject = RouteObject & { protected: boolean };

export const rootRoutes: CustomRouteObject[] = [
  {
    path: '/',
    element: <Dashboard />,
    protected: true,
  },
  {
    path: '/login',
    element: <Login />,
    protected: false,
  },
];

export const chatRoutes: CustomRouteObject[] = [
  {
    path: '/chats/create',
    element: <ChatCreate />,
    protected: true,
  },
  {
    path: '/chats',
    element: <ChatLibrary />,
    protected: true,
  },
  {
    path: '/chats/:id/edit',
    element: <ChatEdit />,
    protected: true,
  },
];

export const eventListRoutes: CustomRouteObject[] = [
  {
    path: '/event-lists/create',
    element: <EventListCreate />,
    protected: true,
  },
  {
    path: '/event-lists',
    element: <EventListLibrary />,
    protected: true,
  },
  {
    path: '/event-lists/:id/edit',
    element: <EventListEdit />,
    protected: true,
  },
];

export const labelRoutes: CustomRouteObject[] = [
  {
    path: '/labels/create',
    element: <LabelCreate />,
    protected: true,
  },
  {
    path: '/labels',
    element: <LabelLibrary />,
    protected: true,
  },
  {
    path: '/labels/:id/edit',
    element: <LabelEdit />,
    protected: true,
  },
];

export const embedRoutes: CustomRouteObject[] = [
  {
    path: '/events',
    element: <EventEmbed />,
    protected: true,
  },
  {
    path: '/chats/:id/embed',
    element: <ChatEmbed />,
    protected: false,
  },
  {
    path: '/event-lists/:id/embed',
    element: <EventListEmbed />,
    protected: false,
  },
  {
    path: '/labels/:id/embed',
    element: <LabelEmbed />,
    protected: false,
  },
];

export const routes: CustomRouteObject[] = [
  ...rootRoutes,
  ...chatRoutes,
  ...labelRoutes,
  ...eventListRoutes,
  ...embedRoutes,
];
