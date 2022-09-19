import { ComponentStory, ComponentMeta, DecoratorFn } from '@storybook/react';
import { TextStyle } from './text-style';
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
  component: TextStyle,
  title: 'Forms/TextStyle',
  decorators: [reactRouterDecorator],
} as ComponentMeta<typeof TextStyle>;

const Template: ComponentStory<typeof TextStyle> = (args) => <TextStyle {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
