import type { NavigationItems } from '~/components/navbar/navbar';

export const navigation: NavigationItems = [
  {
    icon: 'chat-1-line',
    link: '/chats',
  },
  {
    icon: 'list-check-2',
    link: '/event-lists',
  },
  // {
  //   icon: 'alarm-warning-line',
  //   items: [
  //     {
  //       title: 'Create alert',
  //       icon: 'add-line',
  //       link: '/alerts/create',
  //     },
  //   ],
  // },
];

export const noLayout = ['/login', '/embed', '/events'];
