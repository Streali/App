import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Create } from './pages/chat/create';
import './main.scss';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Create />,
  },
  {
    path: '/chat/create',
    element: <Create />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
