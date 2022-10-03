import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Shadow } from './shadow';

export default {
  component: Shadow,
  title: 'Forms/Shadow',
} as ComponentMeta<typeof Shadow>;

const Template: ComponentStory<typeof Shadow> = (args) => <Shadow {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
