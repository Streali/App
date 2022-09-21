import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Badges } from './badges';

export default {
  component: Badges,
  title: 'Forms/Badges',
} as ComponentMeta<typeof Badges>;

const Template: ComponentStory<typeof Badges> = (args) => <Badges {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
