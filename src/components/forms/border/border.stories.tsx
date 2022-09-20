import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Border } from './border';

export default {
  component: Border,
  title: 'Forms/Border',
} as ComponentMeta<typeof Border>;

const Template: ComponentStory<typeof Border> = (args) => <Border {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
