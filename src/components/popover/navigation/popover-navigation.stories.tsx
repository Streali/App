import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PopoverNavigation } from './popover-navigation';

export default {
  component: PopoverNavigation,
  title: 'PopoverNavigation',
  args: {
    links: [
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
} as ComponentMeta<typeof PopoverNavigation>;

const Template: ComponentStory<typeof PopoverNavigation> = (args) => (
  <PopoverNavigation {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
