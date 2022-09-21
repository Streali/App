import { ComponentStory, ComponentMeta, DecoratorFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './navbar';

const queryClient = new QueryClient();

const reactQueryDecorator: DecoratorFn = (Story) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  );
};

const reactRouterDecorator: DecoratorFn = (Story) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    </MemoryRouter>
  );
};

export default {
  title: 'Navbar',
  decorators: [reactQueryDecorator, reactRouterDecorator],
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

export const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

const navigation = [
  {
    icon: 'home-line',
    items: [
      {
        title: 'Show',
        link: '/',
      },
      {
        icon: 'home-line',
        title: 'Create',
        link: '/create',
      },
    ],
  },
];

export const Primary = Template.bind({});
Primary.args = {
  navigation: navigation,
};
