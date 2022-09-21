import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextStyle } from './text-style';

export default {
  component: TextStyle,
  title: 'Forms/TextStyle',
} as ComponentMeta<typeof TextStyle>;

const Template: ComponentStory<typeof TextStyle> = (args) => <TextStyle {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
