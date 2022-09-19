import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Icon } from './icon';

export default {
  component: Icon,
  title: 'Icon',
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: 'community-line',
};
