import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BorderRadius, BorderRadiusAllSettings } from './border-radius';

export default {
  component: BorderRadius,
  title: 'Forms/BorderRadius',
} as ComponentMeta<typeof BorderRadius>;

const Template: ComponentStory<typeof BorderRadius> = (args) => <BorderRadius {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onChange: (settings: BorderRadiusAllSettings) => {
    console.log(settings);
  },
};
