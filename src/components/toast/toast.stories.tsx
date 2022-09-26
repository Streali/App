import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Toaster } from 'react-hot-toast';
import { Toast, ToastType } from './toast';

export default {
  component: Toast,
  title: 'Toast',
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => (
  <>
    <Toast {...args} />
    <Toaster position="top-right" />
  </>
);

export const Primary = Template.bind({});
Primary.args = {
  type: ToastType.Default,
  title: 'Default toast',
  content: 'This is a default toast',
};
