import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PopoverNavigation } from './popover-navigation';

export default {
  component: PopoverNavigation,
  title: 'PopoverNavigation',
} as ComponentMeta<typeof PopoverNavigation>;

const Template: ComponentStory<typeof PopoverNavigation> = (args) => (
  <PopoverNavigation {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
