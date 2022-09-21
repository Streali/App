import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BorderRadius, BorderRadiusSettings } from './border-radius';

export default {
  component: BorderRadius,
  title: 'Forms/BorderRadius',
} as ComponentMeta<typeof BorderRadius>;

const Template: ComponentStory<typeof BorderRadius> = (args) => <BorderRadius {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onChange: (settings: BorderRadiusSettings) => {
    console.log(settings);
  },
};
