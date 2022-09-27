import { DecoratorFn } from '@storybook/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';

const queryClient = new QueryClient();

export const withDecorator: DecoratorFn = (Story) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Routes>
          <Route path="/*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};
