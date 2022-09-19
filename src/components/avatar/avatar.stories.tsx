import { ComponentStory, ComponentMeta, DecoratorFn } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Avatar } from './avatar';

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
  component: Avatar,
  title: 'Avatar',
  decorators: [reactRouterDecorator],
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  tag: 'WT',
  src: 'https://randomuser.me/api/portraits/men/75.jpg',
  link: '/',
};
