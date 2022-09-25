import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AlertSettings } from './alert-settings';

export default {
  component: AlertSettings,
  title: 'Alert/Settings',
} as ComponentMeta<typeof AlertSettings>;

const Template: ComponentStory<typeof AlertSettings> = (args) => <AlertSettings {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'New alert',
};
