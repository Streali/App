import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '~/components/button/button';
import { Confirmation } from './confirmation';

export default {
  component: Confirmation,
  title: 'Confirmation',
} as ComponentMeta<typeof Confirmation>;

const Template: ComponentStory<typeof Confirmation> = (args) => <Confirmation {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  trigger: <Button>Trigger</Button>,
  title: 'Confirm delete',
  text: 'Are you sure you want to delete this item?',
  word: 'delete',
  confirmText: 'For delete this item, type',
};
