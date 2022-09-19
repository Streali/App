import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../button/button';
import { Popover } from './popover';

export default {
  component: Popover,
  title: 'Popover',
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  trigger: <Button>Trigger popover</Button>,
  children: 'Popover content',
  align: 'start',
  side: 'right',
  open: true,
};
