import { ComponentStory, ComponentMeta, DecoratorFn } from '@storybook/react';
import { FontSelect } from './font-select';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const reactRouterDecorator: DecoratorFn = (Story) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  );
};

export default {
  component: FontSelect,
  title: 'Forms/FontSelect',
  decorators: [reactRouterDecorator],
} as ComponentMeta<typeof FontSelect>;

const Template: ComponentStory<typeof FontSelect> = (args) => <FontSelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: 'Roboto',
};
