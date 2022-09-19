import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Switch } from './switch';

export default {
  component: Switch,
  title: 'Forms/Switch',
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Use setting',
};
