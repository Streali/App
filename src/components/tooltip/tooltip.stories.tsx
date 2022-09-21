import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tooltip } from './tooltip';

export default {
  component: Tooltip,
  title: 'Tooltip',
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <p>Tooltip</p>,
  content: 'Tooltip content',
};
