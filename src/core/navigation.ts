import type { NavigationItems } from '~/components/navbar/navbar';

export const navigation: NavigationItems = [
  {
    icon: 'chat-1-line',
    link: '/chats',
    name: 'Chats',
  },
  {
    icon: 'list-check-2',
    link: '/event-lists',
    name: 'Event Lists',
  },
  {
    icon: 'price-tag-3-line',
    link: '/labels',
    name: 'Labels',
  },
];

export const pagesWithoutLayout = ['/login', '/embed', '/events'];
