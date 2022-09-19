import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tabs } from './tabs';

export default {
  component: Tabs,
  title: 'Tabs',
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

const content = [
  {
    title: 'Tab 1',
    content: 'Tab 1 content',
    disabled: false,
  },
  {
    title: 'Tab 2',
    content: 'Tab 2 content',
    disabled: true,
  },
  {
    title: 'Tab 3',
    content: 'Tab 3 content',
    disabled: false,
  },
];

export const Primary = Template.bind({});
Primary.args = {
  content,
};
