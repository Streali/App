import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Color } from './color';

export default {
  component: Color,
  title: 'Forms/Color',
} as ComponentMeta<typeof Color>;

const Template: ComponentStory<typeof Color> = (args) => <Color {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
